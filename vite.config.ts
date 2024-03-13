import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build', // Specify the directory for the production build
  },
  plugins: [react()],
})
