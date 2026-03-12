'use client'

import { useEffect, useState } from 'react'
import { Button } from './Button'

export function Nav() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - viewportHeight

      // Show nav after scrolling past hero
      setVisible(scrollY > viewportHeight * 0.8)

      // Update scroll progress
      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <div className="h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="bg-bg-base/85 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-[15px] font-semibold text-text-primary hover:opacity-80 transition-opacity"
          >
            Hippocortex
          </a>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <a
              href="https://docs.hippocortex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/hippocortex/hippocortex-os"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            <Button href="#start" variant="primary" className="text-sm !px-5 !py-2">
              Get Started →
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
