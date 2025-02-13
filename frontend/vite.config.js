import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: './',  // Ensures correct asset paths
  build: {
    outDir: 'dist',  // Ensures build output is in "dist/"
    assetsDir: 'assets',  // Ensures static assets are correctly placed
  },
});
