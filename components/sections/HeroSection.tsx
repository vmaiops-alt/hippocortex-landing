'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { HOTSPOTS } from '@/components/brain-lab/hotspotData'

const BrainLabScene = dynamic(
  () => import('@/components/brain-lab/BrainLabScene').then(mod => ({ default: mod.BrainLabScene })),
  { ssr: false }
)

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaded(true)
      return
    }
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleActiveChange = useCallback((id: string | null) => {
    setActiveHotspotId(id)
  }, [])

  const activeDatum = activeHotspotId
    ? HOTSPOTS.find(h => h.id === activeHotspotId) ?? null
    : null

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
          {/* Text content - left 5 cols */}
          <div className="lg:col-span-5 pt-16 md:pt-0">
            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-[32px] md:text-[44px] lg:text-[56px] font-bold text-text-primary leading-[1.08] tracking-[-0.025em] max-w-[560px]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms cubic-bezier(0.08, 0.82, 0.17, 1), transform 800ms cubic-bezier(0.08, 0.82, 0.17, 1)',
              }}
            >
              Memory infrastructure for AI agents
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
              Capture events → compile knowledge → return compressed reasoning context.
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

            {/* Code example */}
            <div
              className="mt-5 bg-bg-void border border-border-subtle rounded-xl p-4 overflow-x-auto"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 450ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 450ms',
              }}
            >
              <pre className="text-[13px] font-mono leading-[1.65] text-text-secondary">
                <code>
                  <span className="code-keyword">import</span>{' '}
                  <span className="text-text-primary">{'{ AgentMemory }'}</span>{' '}
                  <span className="code-keyword">from</span>{' '}
                  <span className="code-string">&quot;@hippocortex/sdk&quot;</span>
                  {'\n\n'}
                  <span className="code-keyword">const</span>{' '}
                  <span className="text-text-primary">memory</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">new</span>{' '}
                  <span className="code-type">AgentMemory</span>
                  <span className="code-punctuation">()</span>
                  {'\n'}
                  <span className="text-text-primary">memory</span>
                  <span className="code-punctuation">.</span>
                  <span className="code-function">capture</span>
                  <span className="code-punctuation">(</span>
                  <span className="text-text-primary">event</span>
                  <span className="code-punctuation">)</span>
                  {'\n'}
                  <span className="code-keyword">const</span>{' '}
                  <span className="text-text-primary">context</span>{' '}
                  <span className="code-operator">=</span>{' '}
                  <span className="code-keyword">await</span>{' '}
                  <span className="text-text-primary">memory</span>
                  <span className="code-punctuation">.</span>
                  <span className="code-function">synthesize</span>
                  <span className="code-punctuation">(</span>
                  <span className="text-text-primary">query</span>
                  <span className="code-punctuation">)</span>
                  {'\n'}
                  <span className="text-text-primary">agent</span>
                  <span className="code-punctuation">.</span>
                  <span className="code-function">run</span>
                  <span className="code-punctuation">(</span>
                  <span className="text-text-primary">context</span>
                  <span className="code-punctuation">)</span>
                </code>
              </pre>
            </div>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 550ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 550ms',
              }}
            >
              <Button href="https://dashboard.hippocortex.dev" variant="primary">
                Get Started - Free
              </Button>
              <Button href="https://docs.hippocortex.dev" variant="ghost" external>
                Documentation
              </Button>
            </div>
          </div>

          {/* Right column - brain visualization */}
          <div
            className="lg:col-span-7 relative"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 900ms cubic-bezier(0.08, 0.82, 0.17, 1) 300ms, transform 900ms cubic-bezier(0.08, 0.82, 0.17, 1) 300ms',
            }}
          >
            <div className="w-full h-[420px] sm:h-[500px] lg:h-[640px] relative">
              <BrainLabScene onActiveChange={handleActiveChange} />
            </div>

            {/* Mobile: hotspot info strip below brain */}
            {!isLargeScreen && (
              <div className="mt-2 flex items-center justify-center text-center px-4 min-h-[56px]">
                <div
                  className="transition-all duration-300 ease-out"
                  style={{
                    opacity: activeDatum ? 1 : 0,
                    transform: activeDatum ? 'translateY(0)' : 'translateY(4px)',
                  }}
                >
                  <div
                    className="text-[10px] font-mono tracking-[0.15em]"
                    style={{ color: '#FFD700' }}
                  >
                    {activeDatum?.label.toUpperCase()}
                  </div>
                  <div className="text-[13px] text-text-secondary mt-0.5 leading-snug max-w-[320px] mx-auto">
                    {activeDatum?.tagline}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Neural line divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="neural-line" />
      </div>
    </section>
  )
}
