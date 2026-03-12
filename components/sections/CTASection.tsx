'use client'

import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

export function CTASection() {
  return (
    <>
      {/* Final Emotional Close */}
      <section
        id="start"
        className="relative bg-bg-base overflow-hidden"
        aria-labelledby="start-heading"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 40%, rgba(0,229,204,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 60%)',
          }}
        >
          <div className="w-full h-full animate-[breathe_6s_ease-in-out_infinite]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-32 relative z-10">
          <div className="text-center">
            {/* Dramatic entrance: scale + fade */}
            <ScrollReveal duration={900} scale={0.97}>
              <h2
                id="start-heading"
                className="text-[40px] md:text-[56px] lg:text-[72px] font-bold text-text-primary leading-[1.05] tracking-[-0.03em]"
              >
                Give Your Agents Memory
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-6 text-[17px] max-md:text-base text-text-secondary max-w-[480px] mx-auto">
                Free tier. No credit card. Start in 5 minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-10">
                <Button href="#" variant="primary" size="large">
                  Get Started — Free
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Neural line divider */}
        <div className="neural-line" />
      </section>

      {/* Footer */}
      <footer className="bg-bg-base border-t border-border-subtle/50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16">
          <ScrollReveal y={0} duration={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Logo column */}
              <div className="col-span-2 md:col-span-1">
                <span className="text-[15px] font-semibold text-text-primary">
                  Hippocortex
                </span>
                <p className="mt-3 text-sm text-text-muted">
                  Persistent memory for AI agents.
                </p>
                {/* Social icons */}
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://github.com/hippocortex/hippocortex-os"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text-secondary transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/hippocortex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text-secondary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product */}
              <nav aria-label="Product links">
                <h4 className="text-xs font-medium text-text-muted tracking-[0.08em] uppercase">
                  Product
                </h4>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: 'Documentation', href: 'https://docs.hippocortex.dev' },
                    { label: 'API Reference', href: 'https://docs.hippocortex.dev/api' },
                    { label: 'GitHub', href: 'https://github.com/hippocortex/hippocortex-os' },
                    { label: 'Changelog', href: 'https://docs.hippocortex.dev/changelog' },
                    { label: 'Status', href: 'https://status.hippocortex.dev' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Company */}
              <nav aria-label="Company links">
                <h4 className="text-xs font-medium text-text-muted tracking-[0.08em] uppercase">
                  Company
                </h4>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: 'About', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Contact', href: '/contact' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal */}
              <nav aria-label="Legal links">
                <h4 className="text-xs font-medium text-text-muted tracking-[0.08em] uppercase">
                  Legal
                </h4>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: 'Privacy', href: '/privacy' },
                    { label: 'Terms', href: '/terms' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Separator + copyright */}
            <div className="mt-12 pt-6 border-t border-border-subtle">
              <p className="text-xs text-text-muted">© 2026 Hippocortex. All rights reserved.</p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </>
  )
}
