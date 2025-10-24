/**
 * Framer Motion Animation Variants
 * Based on DESIGN-SYSTEM.md specifications
 */

import { Variants } from 'framer-motion';

// ======================
// Page Transitions
// ======================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

// ======================
// Fade Animations
// ======================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// ======================
// Slide Animations
// ======================

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

// ======================
// Scale Animations
// ======================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// ======================
// Stagger Container
// ======================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// ======================
// Special Effects
// ======================

export const bounce: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

export const glow: Variants = {
  initial: { boxShadow: '0 0 0px rgba(212, 175, 55, 0)' },
  pulse: {
    boxShadow: [
      '0 0 0px rgba(212, 175, 55, 0)',
      '0 0 30px rgba(212, 175, 55, 0.6)',
      '0 0 0px rgba(212, 175, 55, 0)',
    ],
    transition: {
      duration: 2,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
};

// ======================
// Card Hover Effects
// ======================

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

// ======================
// Number Counter Animation
// ======================

export const counterVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'backOut',
    },
  },
};

// ======================
// Badge Unlock Animation
// ======================

export const badgeUnlock: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6,
    },
  },
};

// ======================
// Toast Notification
// ======================

export const toastVariant: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// ======================
// Modal/Dialog
// ======================

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// ======================
// Utility Functions
// ======================

/**
 * Create a stagger container with custom delay
 */
export function createStaggerContainer(staggerDelay: number = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

/**
 * Create a slide variant with custom distance
 */
export function createSlideVariant(
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 20
): Variants {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const multiplier =
    direction === 'down' || direction === 'right' ? 1 : -1;

  return {
    hidden: { opacity: 0, [axis]: distance * multiplier },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  } as Variants;
}
