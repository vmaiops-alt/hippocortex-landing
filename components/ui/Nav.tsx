'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from './Button'

const docsLinks = [
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'SDK Reference', href: '/docs/sdk' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Architecture', href: '/docs/architecture' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [docsOpen, setDocsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const docsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - viewportHeight

      setScrolled(scrollY > 40)

      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setDocsOpen(false)
      }
    }
    if (docsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [docsOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <div
        className="h-0.5 w-full transition-opacity duration-300"
        style={{ opacity: scrolled ? 1 : 0 }}
      >
        <div
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div
        className="transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(9, 9, 11, 0.85)'
            : 'rgba(9, 9, 11, 0.3)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-[15px] font-semibold text-text-primary hover:opacity-80 transition-opacity"
          >
            Hippocortex
          </a>

          {/* Center nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#capabilities" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              Capabilities
            </a>
            <a href="#architecture" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              Architecture
            </a>
            <a href="#integrations" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              Integrations
            </a>
            <a href="#pricing" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              Pricing
            </a>

            {/* Docs dropdown */}
            <div ref={docsRef} className="relative">
              <button
                onClick={() => setDocsOpen(!docsOpen)}
                className="text-sm text-text-tertiary hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer"
              >
                Docs
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-3 h-3 transition-transform ${docsOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="2 4 6 8 10 4" />
                </svg>
              </button>

              {docsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl overflow-hidden">
                  {docsLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-text-tertiary hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                      onClick={() => setDocsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hippocortex/hippocortex-os"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>

            <a
              href="https://dashboard.hippocortex.dev/sign-in"
              className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
            >
              Log in
            </a>

            <Button href="https://dashboard.hippocortex.dev/sign-up" variant="primary" className="text-sm !px-5 !py-2">
              Get Started
            </Button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden ml-1 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border-subtle">
            <div className="max-w-[1200px] mx-auto px-6 py-4 space-y-3">
              <a href="#capabilities" className="block text-sm text-text-tertiary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Capabilities</a>
              <a href="#architecture" className="block text-sm text-text-tertiary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Architecture</a>
              <a href="#integrations" className="block text-sm text-text-tertiary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Integrations</a>
              <a href="#pricing" className="block text-sm text-text-tertiary hover:text-text-primary" onClick={() => setMobileOpen(false)}>Pricing</a>
              <div className="border-t border-border-subtle pt-3 space-y-2">
                {docsLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm text-text-tertiary hover:text-text-primary" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                ))}
              </div>
              <a href="https://github.com/hippocortex/hippocortex-os" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-tertiary hover:text-text-primary">GitHub</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
