export default {
  // Type check TypeScript files
  '**/*.ts?(x)': () => 'pnpm type-check',

  // Lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `pnpm eslint --fix ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],

  // Format JSON and Markdown files
  '**/*.(json|md)': (filenames) => `pnpm prettier --write ${filenames.join(' ')}`,
};
