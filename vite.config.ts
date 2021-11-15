/* eslint import/no-extraneous-dependencies: ['error', {devDependencies: true}] */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import { API_URL } from './src/config';

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
      // Use Postman Mock API for now
      // '/api/auth/': {
      //   target: 'https://equs.develop.bc-labs.dev/',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/\/auth\/signup/, '/pds/register'),
      // },
      '/genubank/': {
        target: `${API_URL}/`,
        changeOrigin: true,
        // rewrite: path => path.replace(/\/api\/auth/, ''),
      },
    },
  },
});
