import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Display - Hero section large text
 * Uses DM Serif Display font for premium feel
 */
const displayVariants = cva(
  'font-serif font-bold tracking-tighter leading-tight animate-smooth',
  {
    variants: {
      size: {
        default: 'text-6xl md:text-7xl', // 60px / 72px
        lg: 'text-7xl md:text-8xl', // 72px / 96px
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface DisplayProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof displayVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, size, as: Component = 'h1', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(displayVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Display.displayName = 'Display';

/**
 * Heading components with consistent hierarchy
 */
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        'text-4xl md:text-5xl font-bold tracking-tight leading-tight animate-smooth',
        className
      )}
      {...props}
    />
  );
});
H1.displayName = 'H1';

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        'text-3xl md:text-4xl font-semibold tracking-tight leading-snug animate-smooth',
        className
      )}
      {...props}
    />
  );
});
H2.displayName = 'H2';

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-2xl md:text-3xl font-semibold tracking-tight leading-snug animate-smooth',
        className
      )}
      {...props}
    />
  );
});
H3.displayName = 'H3';

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        'text-xl md:text-2xl font-semibold leading-normal animate-smooth',
        className
      )}
      {...props}
    />
  );
});
H4.displayName = 'H4';

/**
 * Body text components
 */
const bodyVariants = cva('leading-relaxed animate-smooth', {
  variants: {
    size: {
      lg: 'text-lg', // 18px
      default: 'text-base', // 16px
      sm: 'text-sm', // 14px
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'default',
    weight: 'normal',
  },
});

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {
  as?: 'p' | 'span' | 'div';
}

export const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, size, weight, as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(bodyVariants({ size, weight }), className)}
        {...props}
      />
    );
  }
);
Body.displayName = 'Body';

/**
 * Caption - Small descriptive text
 */
export const Caption = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-xs font-medium leading-snug text-muted-foreground animate-smooth',
        className
      )}
      {...props}
    />
  );
});
Caption.displayName = 'Caption';

/**
 * Lead - Larger intro paragraph
 */
export const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-xl leading-relaxed text-muted-foreground animate-smooth',
        className
      )}
      {...props}
    />
  );
});
Lead.displayName = 'Lead';

/**
 * Muted text
 */
export const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground animate-smooth', className)}
      {...props}
    />
  );
});
Muted.displayName = 'Muted';

/**
 * Blockquote
 */
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      ref={ref}
      className={cn(
        'mt-6 border-l-4 border-navy-600 pl-6 italic text-muted-foreground animate-smooth',
        className
      )}
      {...props}
    />
  );
});
Blockquote.displayName = 'Blockquote';

/**
 * Inline code
 */
export const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        'relative rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100',
        className
      )}
      {...props}
    />
  );
});
InlineCode.displayName = 'InlineCode';
