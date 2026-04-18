import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    // Keep chunks lean — warn at 400 kB gzipped
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        // Split animation + icon vendors from the critical path
        manualChunks: {
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
        // Stable, content-hashed filenames for long-lived cache headers
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
