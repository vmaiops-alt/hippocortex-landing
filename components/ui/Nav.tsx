'use client'

import { useEffect, useState, useRef } from 'react'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './Button'

const docsLinks = [
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'SDK Reference', href: '/docs/sdk' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Architecture', href: '/docs/architecture' },
]

export function Nav() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [docsOpen, setDocsOpen] = useState(false)
  const docsRef = useRef<HTMLDivElement>(null)
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight - viewportHeight

      setVisible(scrollY > viewportHeight * 0.8)

      if (docHeight > 0) {
        setScrollProgress(Math.min(scrollY / docHeight, 1))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close docs dropdown on outside click
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

          {/* Center nav links */}
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

            {isLoaded && !isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <button className="hidden md:inline text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="primary" className="text-sm !px-5 !py-2">
                    Get Started &#8594;
                  </Button>
                </SignUpButton>
              </>
            )}
            {isLoaded && isSignedIn && (
              <>
                <Button href="https://dashboard.hippocortex.dev" variant="primary" className="text-sm !px-5 !py-2">
                  Dashboard &#8594;
                </Button>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
