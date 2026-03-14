'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { HOTSPOTS, type HotspotDatum } from './hotspotData'

// ── Project 3D hotspot → 2D screen position ────────────────────────

function projectHotspotToScreen(
  worldPos: THREE.Vector3,
  camera: THREE.Camera,
  width: number,
  height: number,
  groupTransform: THREE.Matrix4,
): { x: number; y: number } | null {
  const pos = worldPos.clone().applyMatrix4(groupTransform)
  const ndc = pos.project(camera)

  // Behind camera
  if (ndc.z > 1) return null

  return {
    x: ((ndc.x + 1) / 2) * width,
    y: ((-ndc.y + 1) / 2) * height,
  }
}

// ── Single info card ───────────────────────────────────────────────

const CARD_WIDTH = 300
const CARD_GAP = 28

function Card({
  datum,
  visible,
  camera,
  containerSize,
  groupTransform,
}: {
  datum: HotspotDatum
  visible: boolean
  camera: THREE.Camera
  containerSize: { width: number; height: number }
  groupTransform: THREE.Matrix4
}) {
  const [screen, setScreen] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!visible) {
      setScreen(null)
      return
    }

    let raf: number
    const update = () => {
      const s = projectHotspotToScreen(
        datum.position,
        camera,
        containerSize.width,
        containerSize.height,
        groupTransform,
      )
      setScreen(s)
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [visible, camera, containerSize, datum, groupTransform])

  if (!screen) return null

  const preferLeft = datum.cardSide === 'left'
  const leftX = screen.x - CARD_GAP - CARD_WIDTH
  const rightX = screen.x + CARD_GAP

  let cardX: number
  if (preferLeft) {
    cardX = leftX >= 8 ? leftX : rightX
  } else {
    cardX = rightX + CARD_WIDTH <= containerSize.width - 8 ? rightX : leftX
  }

  const cardHeight = datum.codeSnippet ? 220 : 160
  let cardY = screen.y - cardHeight / 2
  cardY = Math.max(8, Math.min(containerSize.height - cardHeight - 8, cardY))

  const isLeft = cardX < screen.x
  const connectorX = isLeft ? cardX + CARD_WIDTH : cardX
  const connectorY = Math.min(Math.max(cardY + 20, screen.y), cardY + cardHeight - 20)

  return (
    <>
      {/* SVG callout line */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={containerSize.width}
        height={containerSize.height}
        style={{
          opacity: visible ? 0.4 : 0,
          transition: 'opacity 300ms ease-out',
        }}
      >
        <line
          x1={screen.x}
          y1={screen.y}
          x2={connectorX}
          y2={connectorY}
          stroke="#FFD700"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <circle cx={screen.x} cy={screen.y} r={2} fill="#FFD700" opacity={0.6} />
      </svg>

      {/* Card */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: cardX,
          top: cardY,
          width: CARD_WIDTH,
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateY(0px) scale(1)'
            : `translateY(${isLeft ? '-6px' : '6px'}) scale(0.97)`,
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        }}
      >
        <div
          className="rounded-lg border px-4 py-3"
          style={{
            background: 'rgba(9, 9, 11, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderColor: 'rgba(255, 215, 0, 0.15)',
            boxShadow: '0 0 24px rgba(255, 215, 0, 0.06), 0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Title + Architecture Role */}
          <div className="flex items-center justify-between mb-1">
            <div
              className="text-[10px] font-mono tracking-[0.15em]"
              style={{ color: '#FFD700' }}
            >
              {datum.label.toUpperCase()}
            </div>
            {datum.architectureRole && (
              <div className="text-[9px] font-mono text-text-ghost">
                {datum.architectureRole}
              </div>
            )}
          </div>

          {/* Tagline */}
          <div
            className="text-[13px] leading-snug mb-2"
            style={{ color: '#C8C8D0', fontFamily: 'var(--font-sans)' }}
          >
            {datum.tagline}
          </div>

          {/* Separator */}
          <div
            className="h-px mb-2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)',
            }}
          />

          {/* Code snippet */}
          {datum.codeSnippet && (
            <div className="mb-2 rounded bg-bg-void/80 px-2.5 py-2 overflow-x-auto">
              <pre className="text-[10px] font-mono leading-[1.5] text-accent-cyan whitespace-pre">
                {datum.codeSnippet}
              </pre>
            </div>
          )}

          {/* Bullets */}
          <ul className="space-y-1">
            {datum.bullets.map((b, i) => (
              <li
                key={i}
                className="text-[11px] flex items-start gap-1.5 leading-snug"
                style={{ color: '#8888A0' }}
              >
                <span className="mt-[3px]" style={{ color: '#FFD700', opacity: 0.4, fontSize: '8px' }}>●</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

// ── Exported overlay ───────────────────────────────────────────────

interface InfoCardsProps {
  activeId: string | null
  hoveredId: string | null
  camera: THREE.Camera | null
  containerRef: React.RefObject<HTMLDivElement | null>
  groupTransform: THREE.Matrix4
}

export function InfoCards({
  activeId,
  hoveredId,
  camera,
  containerRef,
  groupTransform,
}: InfoCardsProps) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef])

  if (size.width < 480 || !camera) return null

  const visibleId = activeId || hoveredId

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {HOTSPOTS.map((hs) => (
        <Card
          key={hs.id}
          datum={hs}
          visible={visibleId === hs.id}
          camera={camera}
          containerSize={size}
          groupTransform={groupTransform}
        />
      ))}
    </div>
  )
}
