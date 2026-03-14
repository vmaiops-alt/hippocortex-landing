import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Hippocortex',
  description: 'Legal notice and company information for Hippocortex.',
}

export default function ImpressumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Impressum</h1>
        <p className="text-sm text-text-muted">Legal Notice</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Company Information</h2>
        <div className="text-text-secondary leading-relaxed space-y-1">
          <p className="font-medium text-text-primary">OPENGATE TECHNOLOGY LTD.</p>
          <p>15 Jamieson House, 4 Edgar Road</p>
          <p>Whitton, Hounslow</p>
          <p>England, TW4 5QQ</p>
          <p>United Kingdom</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Registration Details</h2>
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-5 space-y-3">
          <div>
            <span className="text-sm font-medium text-text-primary">Company Number:</span>
            <span className="text-sm text-text-secondary ml-2">16645990</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Company Type:</span>
            <span className="text-sm text-text-secondary ml-2">Private Limited Company</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Incorporated:</span>
            <span className="text-sm text-text-secondary ml-2">12 August 2025</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Jurisdiction:</span>
            <span className="text-sm text-text-secondary ml-2">England and Wales</span>
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Registered Office:</span>
            <span className="text-sm text-text-secondary ml-2">15 Jamieson House, 4 Edgar Road, Whitton, Hounslow, England, TW4 5QQ</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Contact</h2>
        <div className="text-text-secondary leading-relaxed space-y-1">
          <p>
            Email:{' '}
            <a href="mailto:support@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              support@hippocortex.dev
            </a>
          </p>
          <p>
            Website:{' '}
            <a href="https://hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              https://hippocortex.dev
            </a>
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Responsible for Content</h2>
        <p className="text-text-secondary leading-relaxed">
          OPENGATE TECHNOLOGY LTD.<br />
          15 Jamieson House, 4 Edgar Road<br />
          Whitton, Hounslow, England, TW4 5QQ
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Disclaimer</h2>

        <h3 className="text-lg font-medium text-text-primary">Liability for Content</h3>
        <p className="text-text-secondary leading-relaxed">
          The contents of our pages have been created with the utmost care. However, we cannot
          guarantee the accuracy, completeness, or timeliness of the content. As a service provider,
          we are responsible for our own content on these pages under general law. We are not obligated
          to monitor transmitted or stored third-party information, nor to investigate circumstances
          that indicate illegal activity.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Liability for Links</h3>
        <p className="text-text-secondary leading-relaxed">
          Our website contains links to external third-party websites over whose content we have no
          control. We therefore cannot accept any liability for this external content. The respective
          provider or operator of the linked pages is always responsible for the content of those pages.
          The linked pages were checked for possible legal violations at the time of linking. Illegal
          content was not apparent at the time of linking.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Copyright</h3>
        <p className="text-text-secondary leading-relaxed">
          The content and works on these pages created by the site operators are subject to copyright
          law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright
          law require the written consent of the respective author or creator. Downloads and copies of
          this site are only permitted for private, non-commercial use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Data Protection</h2>
        <p className="text-text-secondary leading-relaxed">
          Information about data protection can be found in our{' '}
          <a href="/legal/privacy" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Privacy Policy
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Dispute Resolution</h2>
        <p className="text-text-secondary leading-relaxed">
          We are neither willing nor obliged to participate in dispute resolution proceedings
          before a consumer arbitration board.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Governing Law</h2>
        <p className="text-text-secondary leading-relaxed">
          This legal notice and any disputes arising from it are governed by the laws of England and Wales.
          OPENGATE TECHNOLOGY LTD. is registered with Companies House under company number 16645990.
        </p>
      </section>
    </div>
  )
}
