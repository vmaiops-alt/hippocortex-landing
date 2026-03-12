'use client'

import dynamic from 'next/dynamic'
import { Nav } from '@/components/ui/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { DeveloperSection } from '@/components/sections/DeveloperSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { CTASection } from '@/components/sections/CTASection'

// Dynamic import for brain sticky section (client-only, no SSR)
const BrainStickySection = dynamic(
  () => import('@/components/brain/BrainStickySection').then(mod => ({ default: mod.BrainStickySection })),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      {/* Skip to content link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent-cyan focus:text-bg-base focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />

        {/* Architecture header → brain sticky section → rest of page */}
        <ArchitectureSection />
        <BrainStickySection />

        {/* z-20 + bg ensures post-sticky sections fully cover the brain canvas */}
        <div className="relative z-20 bg-bg-base">
          <ComparisonSection />
          <ProofSection />
          <DeveloperSection />
          <PricingSection />
          <CTASection />
        </div>
      </main>
    </>
  )
}
