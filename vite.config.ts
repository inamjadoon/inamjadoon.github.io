import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import contentPlugin from './scripts/content-plugin.ts'

// Served at the root of https://inamjadoon.github.io, so base is "/".
export default defineConfig({
  base: '/',
  plugins: [contentPlugin(), react(), tailwindcss()],
})
