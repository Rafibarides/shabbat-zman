import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://<USERNAME>.github.io/<REPO>/ <- this is what we need to match
export default defineConfig({
  base: '',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: true,
    minify: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        // Ensure the built files use .js extension
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
  },
  server: {
    open: true,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // Force .js extensions
    extensions: ['.js', '.jsx', '.json']
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
