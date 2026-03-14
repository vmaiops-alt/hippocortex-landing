'use client'

import { Nav } from '@/components/ui/Nav'
import { HeroSection } from '@/components/sections/HeroSection'
import { BrainExplainerSection } from '@/components/sections/BrainExplainerSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SystemDiagramSection } from '@/components/sections/SystemDiagramSection'
import { ArchitectureSection } from '@/components/sections/ArchitectureSection'
import { CodeIntegrationsSection } from '@/components/sections/CodeIntegrationsSection'
import { PerformanceSection } from '@/components/sections/PerformanceSection'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { ComparisonSection } from '@/components/sections/ComparisonSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { DocumentationSection } from '@/components/sections/DocumentationSection'
import { CTASection } from '@/components/sections/CTASection'

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
        <BrainExplainerSection />
        <ProblemSection />
        <SystemDiagramSection />
        <ArchitectureSection />
        <CodeIntegrationsSection />
        <PerformanceSection />
        <SecuritySection />
        <ComparisonSection />
        <PricingSection />
        <DocumentationSection />
        <CTASection />
      </main>
    </>
  )
}
