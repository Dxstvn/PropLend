import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold animate-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-navy-600 text-white shadow-md hover:bg-navy-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
        destructive: 'bg-danger-500 text-white shadow-sm hover:bg-danger-600 hover:-translate-y-0.5',
        outline:
          'border-2 border-navy-600 bg-transparent text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900',
        secondary: 'bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        ghost: 'hover:bg-navy-50 hover:text-navy-900 dark:hover:bg-navy-900 dark:hover:text-navy-100',
        link: 'text-navy-600 underline-offset-4 hover:underline dark:text-navy-400',
        // PropertyLend custom variants
        gold: 'gradient-gold text-white shadow-gold hover:-translate-y-0.5 hover:shadow-gold-glow',
        navy: 'gradient-primary text-white shadow-navy hover:-translate-y-0.5 hover:shadow-navy-glow',
        success: 'bg-success-500 text-white shadow-sm hover:bg-success-600 hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-md px-4 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
