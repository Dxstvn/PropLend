// Component Variant Utilities from DESIGN-SYSTEM.md
import { type VariantProps } from 'class-variance-authority';

// Button size variants
export const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  xl: 'h-14 px-8 text-xl',
} as const;

// Card variants
export const cardVariants = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
  elevated:
    'bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300',
  senior: 'bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-900 dark:to-navy-800',
  junior:
    'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800',
  success: 'bg-success-50 border-success-200 dark:bg-success-900 dark:border-success-700',
  warning: 'bg-warning-50 border-warning-200 dark:bg-warning-900 dark:border-warning-700',
  danger: 'bg-danger-50 border-danger-200 dark:bg-danger-900 dark:border-danger-700',
} as const;

// Badge variants
export const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
  senior: 'bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-navy-100',
  junior: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
  success: 'bg-success-100 text-success-800 dark:bg-success-800 dark:text-success-100',
  warning: 'bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100',
  danger: 'bg-danger-100 text-danger-800 dark:bg-danger-800 dark:text-danger-100',
  gold: 'bg-gold-100 text-gold-800 dark:bg-gold-800 dark:text-gold-100',
} as const;

// Text variants
export const textVariants = {
  h1: 'text-5xl md:text-6xl font-bold tracking-tight',
  h2: 'text-4xl md:text-5xl font-bold',
  h3: 'text-3xl md:text-4xl font-semibold',
  h4: 'text-2xl md:text-3xl font-semibold',
  h5: 'text-xl md:text-2xl font-medium',
  h6: 'text-lg md:text-xl font-medium',
  'body-lg': 'text-lg leading-relaxed',
  body: 'text-base leading-normal',
  'body-sm': 'text-sm leading-snug',
  caption: 'text-xs text-gray-500 dark:text-gray-400',
} as const;

// Status indicator variants
export const statusVariants = {
  active: 'bg-success-500 text-white',
  pending: 'bg-warning-500 text-white',
  completed: 'bg-navy-500 text-white',
  failed: 'bg-danger-500 text-white',
  default: 'bg-gray-500 text-white',
} as const;

// Container max widths
export const containerSizes = {
  sm: 'max-w-screen-sm', // 640px
  md: 'max-w-screen-md', // 768px
  lg: 'max-w-screen-lg', // 1024px
  xl: 'max-w-screen-xl', // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full',
} as const;
