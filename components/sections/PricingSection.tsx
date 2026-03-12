'use client'

import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  badge?: string
  features: string[]
  cta: string
  ctaVariant: 'primary' | 'ghost'
  highlighted?: boolean
}

const tiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'For prototyping and exploration',
    features: [
      '50K capture events/month',
      '1K synthesize calls/day',
      '5 agent sessions',
      'Community support',
      'Standard API access',
    ],
    cta: 'Start Free',
    ctaVariant: 'ghost',
  },
  {
    name: 'Developer',
    price: '$49',
    period: '/mo',
    description: 'For individual developers in production',
    badge: 'Most Popular',
    features: [
      '1M capture events/month',
      'Unlimited synthesize calls',
      'Unlimited agent sessions',
      'Priority support',
      'Advanced analytics dashboard',
      'Webhook integrations',
    ],
    cta: 'Start Free, Upgrade Later',
    ctaVariant: 'primary',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$299',
    period: '/mo',
    description: 'For production workloads at scale',
    features: [
      '10M capture events/month',
      'Unlimited synthesize calls',
      'Unlimited agent sessions',
      'Priority support with SLA',
      'Advanced analytics + custom dashboards',
      'Dedicated schema isolation',
      'SSO integration',
    ],
    cta: 'Get Started',
    ctaVariant: 'ghost',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For scale, compliance, and custom deployment',
    features: [
      'Unlimited events',
      'Unlimited everything',
      'Dedicated infrastructure',
      '99.9% uptime SLA',
      'Dedicated database isolation',
      'On-premise / self-hosted option',
      'Custom integrations',
      'Dedicated support engineer',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'ghost',
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative bg-bg-base"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <ScrollReveal className="text-center">
          <h2
            id="pricing-heading"
            className="text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Start Free. Scale When Ready.
          </h2>
          <p className="mt-4 text-[17px] max-md:text-base text-text-secondary max-w-[680px] mx-auto">
            No credit card required. Free tier is real — not a 7-day trial.
            Upgrade when your agents need more memory.
          </p>
        </ScrollReveal>

        {/* Pricing cards — all appear simultaneously per spec */}
        <ScrollReveal delay={200}>
          <div className="mt-8 md:mt-10 lg:mt-12">
            {/* Desktop: 4 column grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
            </div>

            {/* Tablet: 2x2 grid */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
              {tiers.map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
            </div>

            {/* Mobile: stacked, Developer first */}
            <div className="md:hidden flex flex-col gap-4">
              {[tiers[1], tiers[0], tiers[2], tiers[3]].map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="mt-8 text-sm text-text-muted text-center">
            Events = capture() calls. learn() and synthesize() included at every tier. No
            hidden fees.
          </p>
        </ScrollReveal>
      </div>

      {/* Neural line divider */}
      <div className="neural-line" />
    </section>
  )
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        tier.highlighted
          ? 'bg-white/[0.03] backdrop-blur-sm border border-accent-cyan/40 shadow-[0_0_40px_rgba(0,229,204,0.08)] -translate-y-2 animate-[cta-glow_4s_ease-in-out_infinite]'
          : 'bg-white/[0.03] backdrop-blur-sm border border-white/[0.08]'
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-8 px-3 py-1 text-xs font-medium text-bg-base bg-accent-cyan rounded-full uppercase tracking-wide">
          {tier.badge}
        </span>
      )}

      <h3 className="text-[28px] font-semibold text-text-primary">{tier.name}</h3>

      <div className="mt-4 flex items-baseline">
        <span
          className="text-[48px] md:text-[64px] lg:text-[96px] font-mono font-medium text-text-primary leading-none"
          style={{ fontFeatureSettings: '"tnum"' }}
          aria-label={tier.period ? `${tier.price} per month` : tier.price}
        >
          {tier.price}
        </span>
        {tier.period && (
          <span className="ml-1 text-sm text-text-tertiary">{tier.period}</span>
        )}
      </div>

      <p className="mt-4 text-sm text-text-tertiary">{tier.description}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
            <svg
              className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button href="#start" variant={tier.ctaVariant} className="w-full justify-center">
          {tier.cta}
        </Button>
      </div>
    </article>
  )
}
