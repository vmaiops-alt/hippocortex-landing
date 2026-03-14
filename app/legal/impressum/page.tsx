import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Hippocortex',
  description: 'Impressum (Legal Notice) for Hippocortex, as required by German law.',
}

export default function ImpressumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-2">Impressum</h1>
        <p className="text-sm text-text-muted">Angaben gemäß § 5 TMG / Information pursuant to § 5 TMG</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Anbieter / Provider</h2>
        <div className="text-text-secondary leading-relaxed space-y-1">
          <p>Hippocortex</p>
          <p>Berlin, Germany</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Kontakt / Contact</h2>
        <div className="text-text-secondary leading-relaxed space-y-1">
          <p>
            E-Mail:{' '}
            <a href="mailto:contact@hippocortex.dev" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
              contact@hippocortex.dev
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
        <h2 className="text-xl font-semibold text-text-primary">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Hippocortex<br />
          Berlin, Germany
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Haftungsausschluss / Disclaimer</h2>

        <h3 className="text-lg font-medium text-text-primary">Haftung für Inhalte</h3>
        <p className="text-text-secondary leading-relaxed">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Haftung für Links</h3>
        <p className="text-text-secondary leading-relaxed">
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar.
        </p>

        <h3 className="text-lg font-medium text-text-primary">Urheberrecht</h3>
        <p className="text-text-secondary leading-relaxed">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
          nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Datenschutz / Data Protection</h2>
        <p className="text-text-secondary leading-relaxed">
          Informationen zum Datenschutz finden Sie in unserer{' '}
          <a href="/legal/privacy" className="text-accent-cyan hover:text-accent-cyan-bright transition-colors">
            Datenschutzerklärung (Privacy Policy)
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">
          Streitschlichtung / Dispute Resolution
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:text-accent-cyan-bright transition-colors"
          >
            https://ec.europa.eu/consumers/odr
          </a>.
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  )
}
