/**
 * GSAP (GreenSock Animation Platform) Configuration
 * Based on DESIGN-SYSTEM.md specifications
 *
 * GSAP is used for:
 * - Scroll-driven animations (ScrollTrigger)
 * - Complex timeline animations
 * - Canvas sequence animations (Apple-style)
 * - Number counter animations
 * - Advanced parallax effects
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ======================
// Global GSAP Defaults
// ======================

gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

// ======================
// ScrollTrigger Configuration
// ======================

// Configure ScrollTrigger defaults
if (typeof window !== 'undefined') {
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
  });
}

// ======================
// Utility Functions
// ======================

/**
 * Create a fade-in animation on scroll
 */
export function createScrollFadeIn(
  element: string | HTMLElement,
  options: Partial<ScrollTrigger.Vars> = {}
) {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      ...options,
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out',
  });
}

/**
 * Create a parallax effect
 */
export function createParallax(
  element: string | HTMLElement,
  speed: number = 0.5,
  options: Partial<ScrollTrigger.Vars> = {}
) {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options,
    },
    y: (i, target) => {
      // Move at specified speed relative to scroll
      return -ScrollTrigger.maxScroll(window) * speed;
    },
    ease: 'none',
  });
}

/**
 * Animate a number counter
 */
export function animateCounter(options: {
  element: string | HTMLElement;
  start: number;
  end: number;
  duration?: number;
  format?: 'number' | 'currency' | 'percentage';
  decimals?: number;
}) {
  const {
    element,
    start,
    end,
    duration = 2,
    format = 'number',
    decimals = 0,
  } = options;

  const obj = { value: start };
  const targetElement =
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!targetElement) return;

  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      let formatted = obj.value.toFixed(decimals);

      if (format === 'currency') {
        formatted = `$${parseFloat(formatted).toLocaleString()}`;
      } else if (format === 'percentage') {
        formatted = `${formatted}%`;
      } else {
        formatted = parseFloat(formatted).toLocaleString();
      }

      targetElement.textContent = formatted;
    },
  });
}

/**
 * Create a stagger animation
 */
export function createStagger(
  elements: string | NodeList | HTMLElement[],
  options: gsap.TweenVars = {}
) {
  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
    ...options,
  });
}

/**
 * Create a canvas sequence animation (Apple-style)
 */
export function createCanvasSequence(options: {
  canvasSelector: string;
  totalFrames: number;
  imagePattern: string; // e.g., '/images/frame-{number}.webp'
  scrollTriggerOptions?: Partial<ScrollTrigger.Vars>;
}) {
  const { canvasSelector, totalFrames, imagePattern, scrollTriggerOptions } =
    options;

  const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  // Preload images
  const images: HTMLImageElement[] = [];
  const imageSeq = { frame: 0 };

  for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = imagePattern.replace('{number}', String(i).padStart(4, '0'));
    images.push(img);
  }

  // Render frame
  function render() {
    const frameIndex = Math.floor(imageSeq.frame);
    const img = images[frameIndex];

    if (img && img.complete && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  // Animate frames on scroll
  return gsap.to(imageSeq, {
    frame: totalFrames - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: canvas,
      start: 'top top',
      end: `+=${scrollTriggerOptions?.end || 3000}`,
      pin: true,
      scrub: 1,
      ...scrollTriggerOptions,
    },
    onUpdate: render,
  });
}

/**
 * Kill all scroll triggers (useful for cleanup)
 */
export function killScrollTriggers() {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

/**
 * Refresh ScrollTrigger (useful after DOM changes)
 */
export function refreshScrollTrigger() {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

// ======================
// Timeline Utilities
// ======================

/**
 * Create a timeline for complex animations
 */
export function createTimeline(options: gsap.TimelineVars = {}) {
  return gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: 0.6,
    },
    ...options,
  });
}

/**
 * Create a repeating timeline (for looping animations)
 */
export function createLoopTimeline(options: gsap.TimelineVars = {}) {
  return gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: {
      ease: 'sine.inOut',
      duration: 1,
    },
    ...options,
  });
}

// ======================
// Performance Utilities
// ======================

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Create animation that respects reduced motion preference
 */
export function createAccessibleAnimation(
  element: string | HTMLElement,
  animation: gsap.TweenVars
) {
  if (prefersReducedMotion()) {
    // Instantly set end state without animation
    return gsap.set(element, animation);
  }

  return gsap.to(element, animation);
}

// ======================
// Export GSAP and ScrollTrigger
// ======================

export { gsap, ScrollTrigger };
