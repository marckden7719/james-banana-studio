import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
            return 'vendor-react';
          }
          if (id.includes('@tanstack/')) {
            return 'vendor-tanstack';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-framer';
          }
          if (id.includes('@rainbow-me/') || id.includes('wagmi') || id.includes('viem') || id.includes('@reown/')) {
            return 'vendor-wagmi';
          }
          if (id.includes('@radix-ui/')) {
            return 'vendor-radix';
          }
          return undefined;
        },
      },
    },
  },
  publicDir: 'public',
});
