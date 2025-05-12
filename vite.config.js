import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/resources/assets/js',
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'public',
  },
});
