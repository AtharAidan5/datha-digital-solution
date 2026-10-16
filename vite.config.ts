import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Multi-page: /privacy/ and /terms/ are real static pages (no SPA rewrites needed on the host).
    rollupOptions: {
      input: { main: 'index.html', privacy: 'privacy/index.html', terms: 'terms/index.html' },
    },
  },
})
