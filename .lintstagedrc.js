const path = require('path');

module.exports = {
  '**/*.{ts,tsx}': () => 'pnpm tsc --noEmit',
  '**/*.{js,jsx,ts,tsx}': [
    filenames =>
      `pnpm lint:fix --file ${filenames
        .map(f => path.relative(process.cwd(), f))
        .join(' --file ')}`,
  ],
  '**/*.{js,jsx,ts,tsx,md,json}': filenames =>
    `pnpm prettier --write ${filenames.join(' ')}`,
};
