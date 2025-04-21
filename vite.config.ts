import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // We're removing the additionalData import since we'll use @use in each file
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
});