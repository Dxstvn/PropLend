import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      // General ESLint rules
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      // The Next.js config already includes good defaults for TypeScript
      // and React hooks from eslint-config-next/core-web-vitals
    },
  },
]);

export default eslintConfig;
