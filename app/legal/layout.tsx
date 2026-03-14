import Link from 'next/link'

const legalLinks = [
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Security Policy', href: '/legal/security' },
  { label: 'Acceptable Use', href: '/legal/acceptable-use' },
  { label: 'Data Processing Agreement', href: '/legal/dpa' },
  { label: 'Impressum', href: '/legal/impressum' },
]

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-[15px] font-semibold text-text-primary hover:opacity-80 transition-opacity">
            ← Hippocortex
          </Link>
          <span className="text-xs font-mono text-text-muted tracking-wider uppercase">Legal</span>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="hidden lg:block" aria-label="Legal pages">
            <ul className="space-y-2 sticky top-24">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-invert max-w-none">
            {children}
          </article>
        </div>

        {/* Mobile nav */}
        <nav className="lg:hidden mt-12 pt-8 border-t border-border-subtle" aria-label="Legal pages">
          <h3 className="text-xs font-medium text-text-muted tracking-wider uppercase mb-4">Other Legal Pages</h3>
          <div className="flex flex-wrap gap-2">
            {legalLinks.map((link) => (
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
      </div>
    </div>
  )
}
