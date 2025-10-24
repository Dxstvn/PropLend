'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-lg group-[.toaster]:backdrop-blur-sm',
          description: 'group-[.toast]:text-muted-foreground group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-navy-600 group-[.toast]:text-white group-[.toast]:hover:bg-navy-700 group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:font-semibold',
          cancelButton:
            'group-[.toast]:bg-gray-200 group-[.toast]:text-gray-900 group-[.toast]:hover:bg-gray-300 group-[.toast]:dark:bg-gray-700 group-[.toast]:dark:text-gray-100 group-[.toast]:rounded-md group-[.toast]:px-3',
          success:
            'group-[.toaster]:border-success-200 group-[.toaster]:bg-success-50 group-[.toaster]:text-success-900 dark:group-[.toaster]:bg-success-900/20 dark:group-[.toaster]:text-success-100',
          error:
            'group-[.toaster]:border-danger-200 group-[.toaster]:bg-danger-50 group-[.toaster]:text-danger-900 dark:group-[.toaster]:bg-danger-900/20 dark:group-[.toaster]:text-danger-100',
          warning:
            'group-[.toaster]:border-warning-200 group-[.toaster]:bg-warning-50 group-[.toaster]:text-warning-900 dark:group-[.toaster]:bg-warning-900/20 dark:group-[.toaster]:text-warning-100',
          info:
            'group-[.toaster]:border-info-200 group-[.toaster]:bg-info-50 group-[.toaster]:text-info-900 dark:group-[.toaster]:bg-info-900/20 dark:group-[.toaster]:text-info-100',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
