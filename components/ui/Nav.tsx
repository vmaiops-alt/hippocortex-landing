'use client'

import { useEffect, useState } from 'react'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from './Button'

export function Nav() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
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
            <a
              href="https://docs.hippocortex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              Docs
            </a>
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
                    Get Started →
                  </Button>
                </SignUpButton>
              </>
            )}
            {isLoaded && isSignedIn && (
              <>
                <Button href="https://dashboard.hippocortex.dev" variant="primary" className="text-sm !px-5 !py-2">
                  Dashboard →
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
