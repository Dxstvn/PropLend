import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS 4.x Configuration
 *
 * Most theme configuration has been moved to CSS using the @theme directive in globals.css
 * This config file now only contains:
 * - Content paths for scanning
 * - Dark mode strategy
 * - Container customization
 * - Plugin imports
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [
    // Note: Animations are now defined in globals.css @theme directive
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
