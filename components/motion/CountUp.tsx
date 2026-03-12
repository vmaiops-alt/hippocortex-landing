'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  separator?: boolean
}

/**
 * Count-up animation for stat numbers.
 * Triggers on scroll intersection. 1.5-2s duration, ease-out.
 * Respects prefers-reduced-motion.
 */
export function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
  separator = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const startedRef = useRef(false)
  const reducedMotion = useRef(false)

  const formatNumber = useCallback(
    (n: number) => {
      if (separator) {
        return n.toLocaleString('en-US')
      }
      return n.toString()
    },
    [separator]
  )

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion.current) {
      setDisplayValue(end)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          observer.disconnect()

          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.round(eased * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(end)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontFeatureSettings: '"tnum"' }}
      data-value={`${prefix}${end}${suffix}`}
    >
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}
