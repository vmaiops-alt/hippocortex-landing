import { BrainState, useBrainStore } from '@/lib/store'

/**
 * RegionController maps scroll position to brain state.
 * Called by GSAP ScrollTrigger from the brain section.
 */
export function getStateForProgress(progress: number): BrainState {
  if (progress < 0.15) return 'EPISODIC'
  if (progress < 0.35) return 'SEMANTIC'
  if (progress < 0.55) return 'GRAPH'
  if (progress < 0.75) return 'COMPILER'
  if (progress < 1.0) return 'SYNTHESIS'
  return 'DORMANT'
}

export function updateBrainState(progress: number) {
  const newState = getStateForProgress(progress)
  const currentState = useBrainStore.getState().state
  if (newState !== currentState) {
    useBrainStore.getState().setState(newState)
  }
  useBrainStore.getState().setScrollProgress(progress)
}
