import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://k52-week6.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/emp-api')
      }
    }
  }
})