'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  scale?: number
  once?: boolean
}

/**
 * Scroll-triggered reveal with translateY + opacity.
 * Default: 24px up, 700ms, ease-reveal. Trigger once at 20% visible.
 * Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  y = 24,
  scale,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    // Set initial hidden state
    el.style.opacity = '0'
    el.style.transform = `translateY(${y}px)${scale ? ` scale(${scale})` : ''}`
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // Trigger animation via transition
          el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) scale(1)'

          // Clean up will-change after animation
          const cleanup = setTimeout(() => {
            el.style.willChange = 'auto'
          }, duration + delay + 100)

          if (once) observer.disconnect()

          return () => clearTimeout(cleanup)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, duration, y, scale, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/**
 * StaggerReveal: wraps multiple children with incremental delays.
 */
interface StaggerRevealProps {
  children: ReactNode[]
  className?: string
  stagger?: number
  duration?: number
  y?: number
  scale?: number
  itemClassName?: string
}

export function StaggerReveal({
  children,
  className = '',
  stagger = 100,
  duration = 700,
  y = 24,
  scale,
  itemClassName = '',
}: StaggerRevealProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          delay={i * stagger}
          duration={duration}
          y={y}
          scale={scale}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}
