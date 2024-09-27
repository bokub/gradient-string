import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: ['./examples', ...coverageConfigDefaults.exclude],
    },
  },
});
