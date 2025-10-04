import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external connections
    port: 5173,
    strictPort: true,
    allowedHosts: ["38a8c32620bf.ngrok-free.app", "localhost", "127.0.0.1"],
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          spline: ["@splinetool/runtime", "@splinetool/react-spline"],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: ["@splinetool/runtime", "@splinetool/react-spline"],
  },
  assetsInclude: ["**/*.glb"],
});
