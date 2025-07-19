import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'styled-components'],
        },
      },
    },
  },
  server: {
    port: 12000,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})