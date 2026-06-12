import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
  build: {
    // Inline assets petits (<8 KB) com a base64 per evitar peticions extra
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        // Separa react i react-dom en un chunk vendor independent
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
