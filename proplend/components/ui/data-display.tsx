import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Format currency value
 */
function formatCurrency(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    notation?: 'standard' | 'compact';
  }
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    notation: options?.notation ?? 'standard',
  }).format(value);
}

/**
 * Currency Display Component
 * Uses tabular numbers for alignment
 */
const currencyVariants = cva(
  'font-mono font-semibold tabular-nums animate-smooth',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
      },
      color: {
        default: 'text-foreground',
        positive: 'text-success-600 dark:text-success-400',
        negative: 'text-danger-600 dark:text-danger-400',
        muted: 'text-muted-foreground',
        gold: 'text-gold-600 dark:text-gold-400',
        navy: 'text-navy-600 dark:text-navy-400',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
);

export interface CurrencyProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof currencyVariants> {
  /**
   * The numeric value to display
   */
  value: number;
  /**
   * Show compact notation (e.g., $1.2M instead of $1,200,000)
   */
  compact?: boolean;
  /**
   * Minimum decimal places
   */
  minimumFractionDigits?: number;
  /**
   * Maximum decimal places
   */
  maximumFractionDigits?: number;
  /**
   * Show prefix indicator (+ for positive, - for negative)
   */
  showSign?: boolean;
}

export const Currency = React.forwardRef<HTMLSpanElement, CurrencyProps>(
  (
    {
      className,
      value,
      size,
      color,
      compact = false,
      minimumFractionDigits,
      maximumFractionDigits,
      showSign = false,
      ...props
    },
    ref
  ) => {
    const formatted = formatCurrency(value, {
      minimumFractionDigits,
      maximumFractionDigits,
      notation: compact ? 'compact' : 'standard',
    });

    const sign = showSign && value > 0 ? '+' : '';

    return (
      <span
        ref={ref}
        className={cn(currencyVariants({ size, color }), className)}
        {...props}
      >
        {sign}
        {formatted}
      </span>
    );
  }
);
Currency.displayName = 'Currency';

/**
 * Percentage Display Component
 */
const percentageVariants = cva(
  'font-mono font-semibold tabular-nums animate-smooth',
  {
    variants: {
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      color: {
        default: 'text-foreground',
        positive: 'text-success-600 dark:text-success-400',
        negative: 'text-danger-600 dark:text-danger-400',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'default',
    },
  }
);

export interface PercentageProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof percentageVariants> {
  /**
   * The percentage value (e.g., 8.5 for 8.5%)
   */
  value: number;
  /**
   * Show prefix indicator (+ for positive, - for negative)
   */
  showSign?: boolean;
  /**
   * Decimal places to show
   */
  decimals?: number;
}

export const Percentage = React.forwardRef<HTMLSpanElement, PercentageProps>(
  ({ className, value, size, color, showSign = false, decimals = 2, ...props }, ref) => {
    const sign = showSign && value > 0 ? '+' : '';
    const formatted = value.toFixed(decimals);

    return (
      <span
        ref={ref}
        className={cn(percentageVariants({ size, color }), className)}
        {...props}
      >
        {sign}
        {formatted}%
      </span>
    );
  }
);
Percentage.displayName = 'Percentage';

/**
 * Wallet Address Display Component
 * Truncates long addresses with copy functionality
 */
export interface WalletAddressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The wallet address to display
   */
  address: string;
  /**
   * Number of characters to show at start
   */
  prefixLength?: number;
  /**
   * Number of characters to show at end
   */
  suffixLength?: number;
  /**
   * Show full address (no truncation)
   */
  showFull?: boolean;
  /**
   * Enable copy to clipboard on click
   */
  copyable?: boolean;
}

export const WalletAddress = React.forwardRef<HTMLDivElement, WalletAddressProps>(
  (
    {
      className,
      address,
      prefixLength = 6,
      suffixLength = 4,
      showFull = false,
      copyable = true,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);

    const displayAddress = showFull
      ? address
      : `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;

    const handleCopy = async () => {
      if (!copyable) return;

      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 font-mono text-sm',
          copyable && 'cursor-pointer hover:text-navy-600 dark:hover:text-navy-400',
          'animate-smooth',
          className
        )}
        onClick={handleCopy}
        role={copyable ? 'button' : undefined}
        tabIndex={copyable ? 0 : undefined}
        {...props}
      >
        <span>{displayAddress}</span>
        {copyable && (
          <span className="text-xs">
            {copied ? (
              <span className="text-success-600">✓ Copied</span>
            ) : (
              <span className="text-muted-foreground hover:text-foreground">
                📋 Copy
              </span>
            )}
          </span>
        )}
      </div>
    );
  }
);
WalletAddress.displayName = 'WalletAddress';

/**
 * Large Data Display - For hero stats and dashboards
 */
const dataLargeVariants = cva('font-bold tabular-nums animate-smooth', {
  variants: {
    size: {
      default: 'text-4xl md:text-5xl',
      lg: 'text-5xl md:text-6xl',
      xl: 'text-6xl md:text-7xl',
    },
    color: {
      default: 'text-foreground',
      gold: 'text-gold-600 dark:text-gold-400',
      navy: 'text-navy-600 dark:text-navy-400',
      gradient:
        'bg-gradient-to-r from-navy-600 to-gold-600 bg-clip-text text-transparent dark:from-navy-400 dark:to-gold-400',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
});

export interface DataLargeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof dataLargeVariants> {
  /**
   * The value to display
   */
  value: string | number;
  /**
   * Label text below the value
   */
  label?: string;
  /**
   * Small caption above the value
   */
  caption?: string;
}

export const DataLarge = React.forwardRef<HTMLDivElement, DataLargeProps>(
  ({ className, value, label, caption, size, color, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
        {caption && (
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {caption}
          </span>
        )}
        <div className={cn(dataLargeVariants({ size, color }))}>{value}</div>
        {label && (
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        )}
      </div>
    );
  }
);
DataLarge.displayName = 'DataLarge';

/**
 * APY Badge - Special display for yields
 */
export interface APYBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The APY percentage value
   */
  value: number;
  /**
   * Variant style
   */
  variant?: 'senior' | 'junior' | 'gold';
}

export const APYBadge = React.forwardRef<HTMLDivElement, APYBadgeProps>(
  ({ className, value, variant = 'senior', ...props }, ref) => {
    const variantStyles = {
      senior: 'bg-navy-100 text-navy-900 border-navy-300 dark:bg-navy-900/30 dark:text-navy-100 dark:border-navy-700',
      junior: 'bg-junior-100 text-junior-900 border-junior-300 dark:bg-junior-900/30 dark:text-junior-100 dark:border-junior-700',
      gold: 'bg-gold-100 text-gold-900 border-gold-300 dark:bg-gold-900/30 dark:text-gold-100 dark:border-gold-700',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex flex-col items-center gap-0.5 rounded-lg border-2 px-4 py-2',
          variantStyles[variant],
          'animate-smooth',
          className
        )}
        {...props}
      >
        <span className="text-xs font-medium uppercase tracking-wider opacity-75">
          APY
        </span>
        <span className="font-mono text-2xl font-bold tabular-nums">
          {value.toFixed(1)}%
        </span>
      </div>
    );
  }
);
APYBadge.displayName = 'APYBadge';

/**
 * Stat Card - Compact metric display
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The metric label
   */
  label: string;
  /**
   * The metric value
   */
  value: string | number;
  /**
   * Optional change indicator
   */
  change?: number;
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, change, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1 rounded-lg border bg-card p-4 shadow-sm animate-smooth',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        {change !== undefined && (
          <div
            className={cn(
              'text-sm font-medium',
              change >= 0
                ? 'text-success-600 dark:text-success-400'
                : 'text-danger-600 dark:text-danger-400'
            )}
          >
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
          </div>
        )}
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';
