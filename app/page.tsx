'use client'

import dynamic from 'next/dynamic'
import { Nav } from '@/components/ui/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { MechanismsSection } from '@/components/sections/MechanismsSection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { DeveloperSection } from '@/components/sections/DeveloperSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { CTASection } from '@/components/sections/CTASection'

// Dynamic import for Brain scene (Three.js - client-only, no SSR)
const BrainScene = dynamic(
  () => import('@/components/brain/BrainScene').then(mod => ({ default: mod.BrainScene })),
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
        {/* Hero with inline brain canvas */}
        <div className="relative">
          <HeroSection />
          {/* Brain canvas overlaid in the hero right column */}
          <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full pointer-events-none z-0">
            <BrainScene />
          </div>
        </div>

        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <MechanismsSection />
        <ComparisonSection />
        <ProofSection />
        <DeveloperSection />
        <PricingSection />
        <CTASection />
      </main>
    </>
  )
}
