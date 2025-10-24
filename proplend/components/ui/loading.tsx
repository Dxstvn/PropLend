import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Spinner - Circular loading indicator
 */
const spinnerVariants = cva('animate-spin rounded-full border-2 border-current', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      default: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'border-gray-300 border-t-navy-600 dark:border-gray-600 dark:border-t-navy-400',
      gold: 'border-gold-300 border-t-gold-600 dark:border-gold-700 dark:border-t-gold-400',
      white: 'border-white/30 border-t-white',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Label for screen readers
   */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);
Spinner.displayName = 'Spinner';

/**
 * Skeleton - Loading placeholder for content
 */
const skeletonVariants = cva('animate-pulse rounded-md bg-gray-200 dark:bg-gray-800', {
  variants: {
    variant: {
      default: '',
      shimmer:
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

/**
 * SkeletonText - Multi-line text placeholder
 */
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of lines to show
   */
  lines?: number;
  /**
   * Whether last line should be shorter (more natural look)
   */
  lastLineShort?: boolean;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lastLineShort = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              'h-4',
              i === lines - 1 && lastLineShort ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = 'SkeletonText';

/**
 * SkeletonCard - Card placeholder
 */
export const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('rounded-xl border bg-card p-6 shadow-md', className)}
      {...props}
    >
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={3} />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
});
SkeletonCard.displayName = 'SkeletonCard';

/**
 * PageLoader - Full-page loading state
 */
export interface PageLoaderProps {
  /**
   * Loading message
   */
  message?: string;
  /**
   * Show PropertyLend branding
   */
  showBrand?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Loading...',
  showBrand = true,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {showBrand && (
          <div className="text-4xl font-bold">
            <span className="text-navy-600 dark:text-navy-400">Prop</span>
            <span className="text-gold-600 dark:text-gold-400">Lend</span>
          </div>
        )}
        <Spinner size="xl" variant="gold" />
        {message && (
          <p className="text-sm font-medium text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
};
PageLoader.displayName = 'PageLoader';

/**
 * LoadingButton - Button with integrated loading state
 */
export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Loading text (replaces children when loading)
   */
  loadingText?: string;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, children, isLoading, loadingText, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn('inline-flex items-center gap-2', className)}
        {...props}
      >
        {isLoading && <Spinner size="sm" variant="white" />}
        {isLoading && loadingText ? loadingText : children}
      </button>
    );
  }
);
LoadingButton.displayName = 'LoadingButton';

/**
 * LoadingOverlay - Semi-transparent overlay with spinner
 */
export interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isLoading: boolean;
  /**
   * Loading message
   */
  message?: string;
  /**
   * Opacity of the overlay (0-100)
   */
  opacity?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message,
  opacity = 80,
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm"
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity / 100})` }}
    >
      <Spinner size="lg" />
      {message && <p className="mt-2 text-sm font-medium text-gray-700">{message}</p>}
    </div>
  );
};
LoadingOverlay.displayName = 'LoadingOverlay';

/**
 * Progress - Linear progress bar
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress value (0-100)
   */
  value: number;
  /**
   * Visual variant
   */
  variant?: 'default' | 'gold' | 'navy' | 'success';
  /**
   * Show percentage label
   */
  showLabel?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, variant = 'default', showLabel = false, ...props }, ref) => {
    const percentage = Math.min(Math.max(value, 0), 100);

    const variantStyles = {
      default: 'bg-navy-600',
      gold: 'bg-gradient-to-r from-gold-400 to-gold-600',
      navy: 'bg-gradient-to-r from-navy-500 to-navy-700',
      success: 'bg-success-600',
    };

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className={cn(
              'h-full transition-all duration-300 ease-out',
              variantStyles[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="mt-1 text-xs font-medium text-muted-foreground">
            {percentage}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

/**
 * Dots - Three-dot loading animation
 */
export const LoadingDots: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: '0ms' }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: '150ms' }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
};
LoadingDots.displayName = 'LoadingDots';
