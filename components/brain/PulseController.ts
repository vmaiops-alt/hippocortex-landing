/**
 * PulseController manages traveling emissive pulses on pathways.
 * Enforces max 2-3 simultaneous pulses (SYNTHESIS exception: up to 10).
 * 
 * This is integrated into SignalPathways.tsx useFrame loop.
 * Exported types for reference.
 */

export interface Pulse {
  pathwayIndex: number
  progress: number     // 0→1 along pathway
  speed: number        // units per second
  width: number        // fraction of pathway length
  intensity: number    // emissive multiplier
  active: boolean
}

export const MAX_PULSES_DEFAULT = 3
export const MAX_PULSES_SYNTHESIS = 10

export function createPulse(pathwayIndex: number, speed = 0.8): Pulse {
  return {
    pathwayIndex,
    progress: 0,
    speed,
    width: 0.08,
    intensity: 4.0,
    active: true,
  }
}

export function updatePulse(pulse: Pulse, delta: number): void {
  if (!pulse.active) return
  pulse.progress += delta * pulse.speed
  if (pulse.progress >= 1) {
    pulse.active = false
  }
}

export function countActivePulses(pulses: Pulse[]): number {
  return pulses.filter(p => p.active).length
}
