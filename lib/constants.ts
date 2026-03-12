// Brain region colors from W3/W4
export const REGION_COLORS = {
  capture: '#00E5CC',
  episodic: '#06B6D4',
  semantic: '#8B5CF6',
  graph: '#A78BFA',
  compiler: '#F59E0B',
  synthesizer: '#E8E8F0',
} as const

// Region positions (normalized, from W4 §3)
export const REGION_POSITIONS = {
  capture: [0, -0.8, 0] as [number, number, number],
  episodic: [0.2, -0.3, 0.3] as [number, number, number],
  semantic: [0.5, 0.0, 0.2] as [number, number, number],
  graph: [0.3, 0.6, 0.5] as [number, number, number],
  compiler: [0, -0.1, 0] as [number, number, number],
  synthesizer: [0, 0.5, 0] as [number, number, number],
} as const

// Easing tokens from W8
export const EASE = {
  reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  dramatic: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

// Colors from W3
export const COLORS = {
  bgVoid: '#050507',
  bgBase: '#09090B',
  bgRaised: '#0F0F14',
  bgSurface: '#111118',
  borderSubtle: '#1A1A24',
  borderMedium: '#2A2A3A',
  borderStrong: '#3A3A4A',
  textPrimary: '#F5F5F7',
  textSecondary: '#C8C8D0',
  textTertiary: '#8888A0',
  textMuted: '#6B6B80',
  textGhost: '#4A4A5A',
  accentCyan: '#00E5CC',
  accentCyanBright: '#33FFE5',
  accentViolet: '#8B5CF6',
  accentVioletBright: '#A78BFA',
  accentTeal: '#06B6D4',
  accentAmber: '#F59E0B',
  accentRose: '#F43F5E',
  accentWhite: '#E8E8F0',
} as const
