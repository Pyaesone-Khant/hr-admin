import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths()
  ],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0'
  },
  base: "./",
  resolve: {
    alias: {
      "@/*": "src/*",
    },
  },
})
