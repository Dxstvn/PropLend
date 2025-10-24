// Animation Easing Functions from DESIGN-SYSTEM.md

// Standard easings
export const EASINGS = {
  // CSS cubic-bezier values
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  // Spring physics (for Framer Motion)
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },

  // Tween values (for Framer Motion)
  smooth: { ease: [0.4, 0, 0.2, 1], duration: 0.3 },
  quick: { ease: [0.4, 0, 0.6, 1], duration: 0.15 },
  slow: { ease: [0.4, 0, 0.2, 1], duration: 0.5 },
} as const;

// GSAP Easings (for complex animations)
export const GSAP_EASINGS = {
  power1: 'power1.inOut',
  power2: 'power2.inOut',
  power3: 'power3.inOut',
  power4: 'power4.inOut',
  back: 'back.inOut',
  elastic: 'elastic.inOut',
  bounce: 'bounce.out',
  expo: 'expo.inOut',
  circ: 'circ.inOut',
} as const;

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInFromBottom: {
    hidden: { y: '100%' },
    visible: { y: 0 },
  },
  slideInFromTop: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
  },
} as const;
