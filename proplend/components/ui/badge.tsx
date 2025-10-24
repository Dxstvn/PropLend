import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border font-semibold animate-smooth focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-navy-600 text-white shadow-sm',
        secondary: 'border-transparent bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
        outline: 'border-gray-300 bg-transparent text-gray-700 dark:border-gray-600 dark:text-gray-300',

        // Semantic variants
        success: 'border-transparent bg-success-500 text-white shadow-sm',
        warning: 'border-transparent bg-warning-500 text-white shadow-sm',
        danger: 'border-transparent bg-danger-500 text-white shadow-sm',
        info: 'border-transparent bg-info-500 text-white shadow-sm',

        // PropertyLend brand variants
        gold: 'border-gold-200 bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-gold dark:border-gold-700',
        navy: 'border-navy-200 bg-gradient-to-r from-navy-500 to-navy-700 text-white shadow-navy dark:border-navy-700',

        // Status variant with pulse animation support
        status: 'border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',

        // Achievement variant with gold glow
        achievement: 'glass-white border-gold-300 text-gold-900 shadow-lg shadow-gold-glow dark:border-gold-600 dark:text-gold-100',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Show animated pulse indicator (for live status)
   */
  pulse?: boolean;
  /**
   * Color of pulse indicator (defaults to variant color)
   */
  pulseColor?: 'success' | 'warning' | 'danger' | 'info' | 'gold';
}

function Badge({ className, variant, size, pulse, pulseColor = 'success', ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              pulseColor === 'success' && 'bg-success-400',
              pulseColor === 'warning' && 'bg-warning-400',
              pulseColor === 'danger' && 'bg-danger-400',
              pulseColor === 'info' && 'bg-info-400',
              pulseColor === 'gold' && 'bg-gold-400'
            )}
          />
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              pulseColor === 'success' && 'bg-success-500',
              pulseColor === 'warning' && 'bg-warning-500',
              pulseColor === 'danger' && 'bg-danger-500',
              pulseColor === 'info' && 'bg-info-500',
              pulseColor === 'gold' && 'bg-gold-500'
            )}
          />
        </span>
      )}
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants };
