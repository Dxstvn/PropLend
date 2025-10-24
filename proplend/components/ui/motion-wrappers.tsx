'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  fadeIn,
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
} from '@/lib/animations/variants';

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * FadeIn - Fade in animation wrapper
 */
export interface FadeInProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ className, delay = 0, duration = 0.4, children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeIn}
        transition={{ delay, duration }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
FadeIn.displayName = 'FadeIn';

/**
 * SlideIn - Slide in animation wrapper
 */
export interface SlideInProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
  className?: string;
}

export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  (
    { className, direction = 'up', delay = 0, duration = 0.5, distance = 40, children },
    ref
  ) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const variants: Record<string, Variants> = {
      up: slideInUp,
      down: slideInDown,
      left: slideInLeft,
      right: slideInRight,
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={variants[direction]}
        transition={{ delay, duration, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
SlideIn.displayName = 'SlideIn';

/**
 * ScaleIn - Scale in animation wrapper
 */
export interface ScaleInProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const ScaleIn = React.forwardRef<HTMLDivElement, ScaleInProps>(
  ({ className, delay = 0, duration = 0.3, children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={scaleIn}
        transition={{ delay, duration }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
ScaleIn.displayName = 'ScaleIn';

/**
 * StaggerContainer - Container that staggers children animations
 */
export interface StaggerContainerProps {
  staggerDelay?: number;
  delayChildren?: number;
  children: React.ReactNode;
  className?: string;
}

export const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ className, staggerDelay = 0.1, delayChildren = 0, children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const customVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={customVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerContainer.displayName = 'StaggerContainer';

/**
 * StaggerItem - Individual item in a stagger container
 */
export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem = React.forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ className, children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        variants={slideInUp}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerItem.displayName = 'StaggerItem';

/**
 * AnimatedCard - Card with hover animations
 */
export interface AnimatedCardProps {
  hoverLift?: boolean;
  glow?: 'navy' | 'gold' | 'none';
  children: React.ReactNode;
  className?: string;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverLift = true, glow = 'none', children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverLift
            ? {
                y: -8,
                boxShadow:
                  glow === 'navy'
                    ? '0 20px 40px -10px rgba(46, 108, 185, 0.4)'
                    : glow === 'gold'
                      ? '0 20px 40px -10px rgba(212, 175, 55, 0.4)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
              }
            : undefined
        }
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={cn('cursor-pointer', className)}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedCard.displayName = 'AnimatedCard';

/**
 * PulseGlow - Pulsing glow effect
 */
export interface PulseGlowProps {
  color?: 'navy' | 'gold' | 'success' | 'danger';
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const PulseGlow = React.forwardRef<HTMLDivElement, PulseGlowProps>(
  ({ className, color = 'gold', duration = 2, children }, ref) => {
    if (prefersReducedMotion()) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const glowColors = {
      navy: 'rgba(46, 108, 185, 0.5)',
      gold: 'rgba(212, 175, 55, 0.5)',
      success: 'rgba(16, 185, 129, 0.5)',
      danger: 'rgba(239, 68, 68, 0.5)',
    };

    return (
      <motion.div
        ref={ref}
        animate={{
          boxShadow: [
            `0 0 0 0 ${glowColors[color]}`,
            `0 0 20px 10px ${glowColors[color]}`,
            `0 0 0 0 ${glowColors[color]}`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);
PulseGlow.displayName = 'PulseGlow';

/**
 * Reveal - Text reveal animation (for headings)
 */
export interface RevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ text, delay = 0, className }) => {
  if (prefersReducedMotion()) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="mr-2 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
Reveal.displayName = 'Reveal';
