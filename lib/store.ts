import { create } from 'zustand'

export type BrainState = 'IDLE' | 'EPISODIC' | 'SEMANTIC' | 'GRAPH' | 'COMPILER' | 'SYNTHESIS' | 'DORMANT'

interface BrainStore {
  state: BrainState
  scrollProgress: number
  isMobile: boolean
  reducedMotion: boolean
  setState: (state: BrainState) => void
  setScrollProgress: (progress: number) => void
  setIsMobile: (isMobile: boolean) => void
  setReducedMotion: (reduced: boolean) => void
}

export const useBrainStore = create<BrainStore>((set) => ({
  state: 'IDLE',
  scrollProgress: 0,
  isMobile: false,
  reducedMotion: false,
  setState: (state) => set({ state }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}))
