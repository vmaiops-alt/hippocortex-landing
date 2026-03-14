'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const docLinks = [
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'SDK Reference', href: '/docs/sdk' },
  { label: 'API Reference', href: '/docs/api' },
  { label: 'Architecture', href: '/docs/architecture' },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="border-b border-border-subtle sticky top-0 z-40 bg-bg-base/85 backdrop-blur-xl">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[15px] font-semibold text-text-primary hover:opacity-80 transition-opacity">
              Hippocortex
            </Link>
            <span className="text-border-medium">/</span>
            <span className="text-xs font-mono text-accent-cyan tracking-wider uppercase">Docs</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hippocortex/hippocortex-os"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://dashboard.hippocortex.dev"
              className="text-sm font-medium text-bg-base bg-accent-cyan hover:bg-accent-cyan-bright px-4 py-1.5 rounded-lg transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="hidden lg:block" aria-label="Documentation">
            <div className="sticky top-24">
              <h3 className="text-xs font-medium text-text-muted tracking-wider uppercase mb-4">Documentation</h3>
              <ul className="space-y-1">
                {docLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-sm block py-1.5 px-3 rounded-md transition-colors ${
                          isActive
                            ? 'text-accent-cyan bg-accent-cyan/[0.08] font-medium'
                            : 'text-text-tertiary hover:text-text-primary hover:bg-white/[0.02]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-8 pt-6 border-t border-border-subtle">
                <h3 className="text-xs font-medium text-text-muted tracking-wider uppercase mb-4">Resources</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="https://github.com/hippocortex/hippocortex-os"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-tertiary hover:text-text-primary transition-colors block py-1.5 px-3"
                    >
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.npmjs.com/package/@hippocortex/sdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-tertiary hover:text-text-primary transition-colors block py-1.5 px-3"
                    >
                      npm Package
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pypi.org/project/hippocortex/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-tertiary hover:text-text-primary transition-colors block py-1.5 px-3"
                    >
                      PyPI Package
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Content */}
          <article className="prose prose-invert max-w-none min-w-0">
            {children}

            {/* Mobile nav */}
            <nav className="lg:hidden mt-12 pt-8 border-t border-border-subtle not-prose" aria-label="Documentation pages">
              <h3 className="text-xs font-medium text-text-muted tracking-wider uppercase mb-4">Documentation</h3>
              <div className="flex flex-wrap gap-2">
                {docLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors px-3 py-1.5 bg-bg-surface rounded-lg border border-border-subtle"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </article>
        </div>
      </div>
    </div>
  )
}
