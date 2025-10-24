/**
 * Animation Easing Functions
 * Based on DESIGN-SYSTEM.md specifications
 */

// ======================
// CSS Cubic Bezier Easings
// ======================

export const easings = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Custom easings (from Apple, Stripe)
  smooth: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// ======================
// Framer Motion Easings (Array format)
// ======================

export const framerEasings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: [0.175, 0.885, 0.32, 1.275],
} as const;

// ======================
// Framer Motion Spring Configs
// ======================

export const springConfigs = {
  // Default spring
  default: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },

  // Bouncy spring (for playful interactions)
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },

  // Gentle spring (for smooth transitions)
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },

  // Stiff spring (for quick, snappy animations)
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
  },

  // Slow spring (for dramatic effects)
  slow: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  },
} as const;

// ======================
// Framer Motion Tween Configs
// ======================

export const tweenConfigs = {
  // Fast interactions
  fast: {
    ease: framerEasings.easeOut,
    duration: 0.15,
  },

  // Normal transitions
  normal: {
    ease: framerEasings.smooth,
    duration: 0.3,
  },

  // Slow, dramatic transitions
  slow: {
    ease: framerEasings.easeInOut,
    duration: 0.5,
  },

  // Very slow (for page transitions)
  slower: {
    ease: framerEasings.smooth,
    duration: 0.7,
  },

  // Slowest (for hero animations)
  slowest: {
    ease: framerEasings.easeInOut,
    duration: 1.0,
  },
} as const;

// ======================
// GSAP Easings
// ======================

export const gsapEasings = {
  // Power easings
  power1: 'power1.inOut',
  power2: 'power2.inOut',
  power3: 'power3.inOut',
  power4: 'power4.inOut',

  // Special easings
  back: 'back.inOut',
  elastic: 'elastic.inOut',
  bounce: 'bounce.out',
  expo: 'expo.inOut',
  circ: 'circ.inOut',
  sine: 'sine.inOut',
} as const;

// ======================
// Animation Durations (ms)
// ======================

export const durations = {
  fast: 150,        // Micro-interactions, hovers
  normal: 300,      // Standard transitions
  slow: 500,        // Complex animations
  slower: 700,      // Page transitions
  slowest: 1000,    // Hero animations, celebrations
} as const;

// ======================
// When to Use Each Easing
// ======================

/**
 * Easing Usage Guidelines:
 *
 * - linear: Progress bars, loaders
 * - easeOut: Elements entering (modals, toasts)
 * - easeIn: Elements exiting (close animations)
 * - easeInOut: State changes, toggles
 * - smooth: Hover effects, button interactions (recommended for most UI)
 * - bounce: Success celebrations, badge unlocks
 * - spring: Playful micro-interactions
 */

// ======================
// Utility Functions
// ======================

/**
 * Get a spring config for Framer Motion
 */
export function getSpringConfig(type: keyof typeof springConfigs = 'default') {
  return springConfigs[type];
}

/**
 * Get a tween config for Framer Motion
 */
export function getTweenConfig(speed: keyof typeof tweenConfigs = 'normal') {
  return tweenConfigs[speed];
}

/**
 * Get a GSAP easing string
 */
export function getGsapEasing(type: keyof typeof gsapEasings = 'power2') {
  return gsapEasings[type];
}

/**
 * Create a custom cubic bezier easing
 */
export function createCubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}
