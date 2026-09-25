import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using relative base path './' by default ensures assets load correctly
  // whether deployed at root (https://username.github.io/) or subpath (https://username.github.io/repository/).
  // Can be overridden via VITE_BASE_PATH environment variable if needed.
  base: process.env.VITE_BASE_PATH || './',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-xyflow': ['@xyflow/react'],
        },
      },
    },
  },
});
