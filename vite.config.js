import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'vue3-carousel': 'vue3-carousel/dist/carousel.esm.js'
    }
  }
  // ... resto da configuração
}) 