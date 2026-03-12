'use client'

import { Button } from '@/components/ui/Button'
import { BrainStickySection } from '@/components/brain/BrainStickySection'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="relative bg-bg-void"
      aria-labelledby="architecture-heading"
    >
      {/* Section header */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-16 md:pt-20 lg:pt-24">
        <ScrollReveal className="text-center">
          <span className="text-xs font-medium text-accent-cyan tracking-[0.12em] uppercase">
            THE ARCHITECTURE
          </span>
          <h2
            id="architecture-heading"
            className="mt-4 text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-text-primary"
          >
            Six Layers of Intelligence
          </h2>
          <p className="mt-6 text-[17px] max-md:text-base text-text-secondary leading-relaxed max-w-[720px] mx-auto">
            Not a flat store. A living memory system where each layer builds on the one
            below it. Episodic traces promote to semantic knowledge. Semantic facts link
            into graph structures. Graph patterns feed the compiler. Full provenance
            at every level.
          </p>
        </ScrollReveal>
      </div>

      {/* Sticky brain + scroll panels */}
      <div className="mt-8 md:mt-12">
        <BrainStickySection />
      </div>

      {/* CTA */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16 md:pb-20 lg:pb-24 text-center">
        <Button href="https://docs.hippocortex.dev/architecture" variant="text" external>
          Explore the architecture guide →
        </Button>
      </div>
    </section>
  )
}
