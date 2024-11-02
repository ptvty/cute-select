import { defineConfig, coverageConfigDefaults } from 'vitest/config'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        './src/App.tsx',
        './src/main.tsx',
        '**/*.stories.tsx',
        './storybook-static/**'
      ],
    },
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  base: '',
})
