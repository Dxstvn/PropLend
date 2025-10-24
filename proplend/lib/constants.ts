// Design System Constants from DESIGN-SYSTEM.md

// Color Palette
export const COLORS = {
  navy: {
    50: '#E8EEF5',
    100: '#C1D3E8',
    200: '#97B5DA',
    300: '#6D98CD',
    400: '#4D82C3',
    500: '#2E6CB9',
    600: '#2960AB',
    700: '#234F98',
    800: '#1D3F85',
    900: '#0A2540',
  },
  gold: {
    50: '#FEF9E7',
    100: '#FCF0C8',
    200: '#FAE7A5',
    300: '#F8DD82',
    400: '#F6D669',
    500: '#F4CE50',
    600: '#D4AF37',
    700: '#B8860B',
    800: '#9A7208',
    900: '#7C5E06',
  },
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
    600: '#059669',
    900: '#064E3B',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    900: '#78350F',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    900: '#7F1D1D',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    900: '#1E3A8A',
  },
  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    500: '#A855F7',
    600: '#9333EA',
    900: '#581C87',
  },
} as const;

// Typography Scale
export const FONT_SIZES = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', // 72px
} as const;

export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const LINE_HEIGHTS = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Spacing Scale (4px base unit)
export const SPACING = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
} as const;

// Border Radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Z-Index Layers
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation Durations
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

// Platform Constants
export const PLATFORM = {
  minDeposit: 100,
  seniorAPY: { min: 8, max: 10 },
  juniorAPY: { min: 20, max: 30 },
  seniorRatio: 80,
  juniorRatio: 20,
  maxLTV: 65,
  interestRange: { min: 18, max: 24 },
  loanTermRange: { min: 6, max: 12 }, // months
} as const;
