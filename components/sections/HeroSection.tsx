'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaded(true)
      return
    }
    // Small delay to ensure paint has happened
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @hippocortex/sdk')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(0,229,204,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text content — left 5 cols */}
          <div className="lg:col-span-5 pt-16 md:pt-0">
            {/* Headline — staggered entrance */}
            <h1
              id="hero-heading"
              className="text-[32px] md:text-[44px] lg:text-[56px] font-bold text-text-primary leading-[1.08] tracking-[-0.025em] max-w-[560px]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms cubic-bezier(0.08, 0.82, 0.17, 1), transform 800ms cubic-bezier(0.08, 0.82, 0.17, 1)',
              }}
            >
              AI Agents That Learn From Experience
            </h1>

            {/* Subheadline */}
            <p
              className="mt-6 text-base md:text-[17px] text-text-secondary leading-relaxed max-w-[560px]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
              }}
            >
              Hippocortex is a deterministic memory layer that captures what your agents do,
              compiles patterns into reusable knowledge, and synthesizes context within token
              budgets. Three API calls. Zero LLM dependencies. Full provenance on every fact.
            </p>

            {/* Install command */}
            <div
              className="mt-8 relative"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 350ms',
              }}
            >
              <button
                onClick={handleCopy}
                className="w-full text-left bg-bg-surface border border-border-subtle rounded-[10px] px-5 py-3.5 font-mono text-[15px] cursor-pointer hover:border-border-medium transition-colors group"
                aria-label="Copy install command: npm install @hippocortex/sdk"
              >
                <span className="text-accent-cyan">$ </span>
                <span className="text-text-primary">npm install @hippocortex/sdk</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-accent-cyan transition-colors">
                  {copied ? '✓' : '⎘'}
                </span>
              </button>
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-accent-cyan bg-bg-surface border border-border-subtle rounded px-2 py-1">
                  Copied!
                </span>
              )}
            </div>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 500ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              }}
            >
              <Button href="#start" variant="primary">
                Get Started — Free
              </Button>
              <Button href="https://docs.hippocortex.dev" variant="ghost" external>
                Documentation
              </Button>
            </div>
          </div>

          {/* Right column spacer — brain lives in the sticky section below */}
          <div className="hidden lg:block lg:col-span-7" aria-hidden="true" />
        </div>
      </div>

      {/* Neural line divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="neural-line" />
      </div>
    </section>
  )
}
