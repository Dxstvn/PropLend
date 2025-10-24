'use client';

import * as React from 'react';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';

/**
 * AnimatedCounter - Number counter with smooth animations
 */
export interface AnimatedCounterProps {
  /**
   * The target value to count to
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Number of decimal places
   */
  decimals?: number;
  /**
   * Decimal separator character
   */
  decimalSeparator?: string;
  /**
   * Thousands separator character
   */
  thousandsSeparator?: string;
  /**
   * Prefix (e.g., "$" for currency)
   */
  prefix?: string;
  /**
   * Suffix (e.g., "%" for percentages)
   */
  suffix?: string;
  /**
   * Whether to use easing
   */
  useEasing?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
  /**
   * Whether to start immediately or wait for viewport intersection
   */
  enableScrollSpy?: boolean;
  /**
   * Delay before starting (in seconds)
   */
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  start = 0,
  duration = 2,
  decimals = 0,
  decimalSeparator = '.',
  thousandsSeparator = ',',
  prefix = '',
  suffix = '',
  useEasing = true,
  className,
  onComplete,
  enableScrollSpy = true,
  delay = 0,
}) => {
  return (
    <CountUp
      start={start}
      end={value}
      duration={duration}
      decimals={decimals}
      decimal={decimalSeparator}
      separator={thousandsSeparator}
      prefix={prefix}
      suffix={suffix}
      useEasing={useEasing}
      onEnd={onComplete}
      enableScrollSpy={enableScrollSpy}
      scrollSpyOnce
      scrollSpyDelay={delay * 1000}
      className={cn('tabular-nums', className)}
    />
  );
};
AnimatedCounter.displayName = 'AnimatedCounter';

/**
 * CurrencyCounter - Animated currency display
 */
export interface CurrencyCounterProps {
  /**
   * The currency value to count to
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Number of decimal places
   */
  decimals?: number;
  /**
   * Currency symbol
   */
  symbol?: string;
  /**
   * Whether to use compact notation (e.g., $1.2M)
   */
  compact?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
}

export const CurrencyCounter: React.FC<CurrencyCounterProps> = ({
  value,
  start = 0,
  duration = 2.5,
  decimals = 2,
  symbol = '$',
  compact = false,
  className,
  onComplete,
}) => {
  // Format for compact notation (K, M, B)
  const formatCompact = (val: number): { value: number; suffix: string } => {
    if (val >= 1_000_000_000) {
      return { value: val / 1_000_000_000, suffix: 'B' };
    }
    if (val >= 1_000_000) {
      return { value: val / 1_000_000, suffix: 'M' };
    }
    if (val >= 1_000) {
      return { value: val / 1_000, suffix: 'K' };
    }
    return { value: val, suffix: '' };
  };

  if (compact) {
    const formatted = formatCompact(value);
    return (
      <AnimatedCounter
        value={formatted.value}
        start={0}
        duration={duration}
        decimals={formatted.value < 10 ? 2 : 1}
        prefix={symbol}
        suffix={formatted.suffix}
        className={cn('font-mono font-bold', className)}
        onComplete={onComplete}
      />
    );
  }

  return (
    <AnimatedCounter
      value={value}
      start={start}
      duration={duration}
      decimals={decimals}
      prefix={symbol}
      className={cn('font-mono font-bold', className)}
      onComplete={onComplete}
    />
  );
};
CurrencyCounter.displayName = 'CurrencyCounter';

/**
 * PercentageCounter - Animated percentage display
 */
export interface PercentageCounterProps {
  /**
   * The percentage value to count to
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Number of decimal places
   */
  decimals?: number;
  /**
   * Show + sign for positive values
   */
  showSign?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
}

export const PercentageCounter: React.FC<PercentageCounterProps> = ({
  value,
  start = 0,
  duration = 2,
  decimals = 1,
  showSign = false,
  className,
  onComplete,
}) => {
  const prefix = showSign && value > 0 ? '+' : '';

  return (
    <AnimatedCounter
      value={value}
      start={start}
      duration={duration}
      decimals={decimals}
      prefix={prefix}
      suffix="%"
      className={cn('font-mono font-bold', className)}
      onComplete={onComplete}
    />
  );
};
PercentageCounter.displayName = 'PercentageCounter';

/**
 * StatCounter - Animated stat display with label
 */
export interface StatCounterProps {
  /**
   * The label for the stat
   */
  label: string;
  /**
   * The value to count to
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Number format type
   */
  format?: 'number' | 'currency' | 'percentage';
  /**
   * Number of decimal places
   */
  decimals?: number;
  /**
   * Prefix (e.g., "$")
   */
  prefix?: string;
  /**
   * Suffix (e.g., "%", "K", "M")
   */
  suffix?: string;
  /**
   * Caption below the value
   */
  caption?: string;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

export const StatCounter: React.FC<StatCounterProps> = ({
  label,
  value,
  start = 0,
  duration = 2,
  format = 'number',
  decimals,
  prefix,
  suffix,
  caption,
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl md:text-6xl',
  };

  // Auto-configure based on format
  const config = React.useMemo(() => {
    switch (format) {
      case 'currency':
        return {
          prefix: prefix ?? '$',
          suffix: suffix ?? '',
          decimals: decimals ?? 2,
        };
      case 'percentage':
        return {
          prefix: prefix ?? '',
          suffix: suffix ?? '%',
          decimals: decimals ?? 1,
        };
      default:
        return {
          prefix: prefix ?? '',
          suffix: suffix ?? '',
          decimals: decimals ?? 0,
        };
    }
  }, [format, prefix, suffix, decimals]);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className={cn('font-mono font-bold tabular-nums', sizeClasses[size])}>
        <AnimatedCounter
          value={value}
          start={start}
          duration={duration}
          decimals={config.decimals}
          prefix={config.prefix}
          suffix={config.suffix}
        />
      </div>
      {caption && <span className="text-sm text-muted-foreground">{caption}</span>}
    </div>
  );
};
StatCounter.displayName = 'StatCounter';

/**
 * EarningsCounter - Special counter for earnings display with celebration
 */
export interface EarningsCounterProps {
  /**
   * The earnings value to count to
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Whether to show confetti on completion
   */
  celebrate?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
}

export const EarningsCounter: React.FC<EarningsCounterProps> = ({
  value,
  start = 0,
  duration = 3,
  celebrate = false,
  className,
  onComplete,
}) => {
  const handleComplete = React.useCallback(() => {
    if (celebrate) {
      // Trigger confetti (would need to import confetti library)
      console.log('🎉 Earnings milestone reached!');
    }
    onComplete?.();
  }, [celebrate, onComplete]);

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Total Earnings
      </div>
      <div className="text-5xl font-bold md:text-6xl">
        <CurrencyCounter
          value={value}
          start={start}
          duration={duration}
          decimals={2}
          className="bg-gradient-to-r from-gold-600 to-gold-400 bg-clip-text text-transparent"
          onComplete={handleComplete}
        />
      </div>
      <div className="text-xs text-muted-foreground">Since inception</div>
    </div>
  );
};
EarningsCounter.displayName = 'EarningsCounter';
