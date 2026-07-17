import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // Relative base: the same docs/ build works served from the droplet's domain
  // root (Caddy) and from the GitHub Pages /burrec-mos-u-zemero/ subpath.
  base: './',
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
