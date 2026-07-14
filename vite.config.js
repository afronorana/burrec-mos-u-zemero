import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/burrec-mos-u-zemero/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        // Big, rarely-updated vendors get their own chunks so app-code
        // deploys don't invalidate them in browser caches.
        manualChunks: {
          three: ['three'],
          physics: ['cannon-es'],
          nakama: ['@heroiclabs/nakama-js'],
        },
      },
    },
  },
});
