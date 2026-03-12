'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'outlined' | 'glass' | 'solid' | 'accent'
  accentColor?: string
  glowColor?: string
  highlighted?: boolean
  className?: string
}

export function Card({
  children,
  variant = 'glass',
  accentColor,
  glowColor,
  highlighted,
  className = '',
}: CardProps) {
  const variants = {
    outlined: `
      bg-transparent border border-border-subtle rounded-xl p-7
      hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      transition-all duration-300
    `,
    glass: `
      bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8
      hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/[0.12]
      hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)]
      transition-all duration-300
      ${highlighted ? '-translate-y-1 border-accent-cyan/30 shadow-[0_0_24px_rgba(0,229,204,0.06)]' : ''}
    `,
    solid: `
      bg-bg-surface border border-border-subtle rounded-2xl p-8
      hover:-translate-y-1 hover:bg-bg-surface-hover hover:border-border-medium
      hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)]
      transition-all duration-300
    `,
    accent: `
      bg-bg-surface border border-border-subtle rounded-2xl p-8
      hover:-translate-y-1 hover:bg-bg-surface-hover hover:border-border-medium
      hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)]
      transition-all duration-300
    `,
  }

  const styles: React.CSSProperties = {}
  if (variant === 'accent' && accentColor) {
    styles.borderLeft = `4px solid ${accentColor}`
    styles.borderRadius = '4px 16px 16px 4px'
  }
  if (glowColor) {
    styles.boxShadow = `0 0 40px ${glowColor}`
  }

  return (
    <div className={`${variants[variant]} ${className}`} style={styles}>
      {children}
    </div>
  )
}
