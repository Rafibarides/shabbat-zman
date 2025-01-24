import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/shabbat-zman/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,  // Clean the output directory before build
    assetsDir: 'assets',
    sourcemap: true,
    minify: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')  // Add source directory alias
    }
  }
})
