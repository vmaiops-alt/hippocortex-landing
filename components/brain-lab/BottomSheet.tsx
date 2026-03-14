'use client'

import { useEffect, useRef } from 'react'
import { HOTSPOTS, type HotspotDatum } from './hotspotData'

interface BottomSheetProps {
  activeId: string | null
  onClose: () => void
}

export function BottomSheet({ activeId, onClose }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const datum = activeId ? HOTSPOTS.find((h) => h.id === activeId) ?? null : null

  // Close on outside tap
  useEffect(() => {
    if (!datum) return
    const handler = (e: PointerEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Slight delay to avoid the same tap that opened it from closing
    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handler)
    }, 100)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointerdown', handler)
    }
  }, [datum, onClose])

  const isOpen = datum !== null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: 'rgba(5, 5, 7, 0.5)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease-out',
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="rounded-t-2xl border-t border-x px-5 pt-4 pb-8"
          style={{
            background: 'rgba(9, 9, 11, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'rgba(255, 215, 0, 0.12)',
            boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center mb-4">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            />
          </div>

          {datum && (
            <>
              {/* Title */}
              <div
                className="text-xs font-mono tracking-widest mb-1.5"
                style={{ color: '#FFD700' }}
              >
                {datum.label.toUpperCase()}
              </div>

              {/* Tagline */}
              <div
                className="text-sm leading-snug mb-3"
                style={{ color: '#C8C8D0' }}
              >
                {datum.tagline}
              </div>

              {/* Separator */}
              <div
                className="h-px mb-3"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)',
                }}
              />

              {/* Bullets */}
              <ul className="space-y-2">
                {datum.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-xs flex items-start gap-2"
                    style={{ color: '#8888A0' }}
                  >
                    <span
                      className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: '#FFD700', opacity: 0.5 }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}
