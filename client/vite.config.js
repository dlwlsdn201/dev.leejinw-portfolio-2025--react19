import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), tsConfigPaths()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env': process.env, // optional, legacy 호환
  },
});
