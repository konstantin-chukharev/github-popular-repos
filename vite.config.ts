/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    onConsoleLog(log) {
      // React logs errors that were caught by ErrorBoundary
      // https://github.com/facebook/react/issues/15069
      if (log.includes('Error: Uncaught [TypeError: Failed to fetch]'))
        return false;
    },
  },
});
