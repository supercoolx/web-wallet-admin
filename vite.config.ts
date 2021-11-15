/* eslint import/no-extraneous-dependencies: ['error', {devDependencies: true}] */
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { KEYCLOAK_API } from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'tailwind.config.js': resolve(__dirname, 'tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: ['tailwind.config.js'],
  },
  server: {
    proxy: {
      '/api/keycloak': {
        target: KEYCLOAK_API,
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: path => path.replace(/\/api\/keyloak/, ''),
      },
    },
  },
});
