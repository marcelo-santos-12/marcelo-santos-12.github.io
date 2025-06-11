import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/marcelo-santos-12.github.io/', // <- substitua pelo nome do seu repositório
  plugins: [react()],
})
