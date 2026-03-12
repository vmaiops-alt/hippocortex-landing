'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'text'
  size?: 'default' | 'large'
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  external,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer'
  
  const variants = {
    primary: `
      bg-accent-cyan text-bg-base rounded-lg
      hover:-translate-y-px hover:shadow-[0_0_32px_rgba(0,229,204,0.25)]
      active:translate-y-0 active:shadow-[0_0_16px_rgba(0,229,204,0.2)]
      focus-visible:outline-2 focus-visible:outline-accent-cyan/60 focus-visible:outline-offset-2
      ${size === 'large' ? 'px-10 py-4 text-[17px] min-h-[56px] rounded-xl shadow-[0_0_40px_rgba(0,229,204,0.15)] animate-[cta-glow_4s_ease-in-out_infinite]' : 'px-7 py-3 text-[15px]'}
    `,
    ghost: `
      bg-transparent text-text-secondary border border-border-strong rounded-lg
      hover:border-text-secondary hover:text-text-primary hover:bg-white/[0.03]
      active:bg-white/[0.06]
      ${size === 'large' ? 'px-10 py-4 text-[17px]' : 'px-7 py-3 text-[15px]'}
    `,
    text: `
      text-accent-cyan bg-transparent gap-1.5
      hover:text-accent-cyan-bright
      text-[15px] font-medium
    `,
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
      >
        {children}
        {variant === 'text' && (
          <span className="inline-block transition-all duration-200 group-hover:translate-x-1">→</span>
        )}
      </a>
    )
  }

  return (
    <button className={combinedClassName} onClick={onClick}>
      {children}
      {variant === 'text' && (
        <span className="inline-block transition-all duration-200">→</span>
      )}
    </button>
  )
}
