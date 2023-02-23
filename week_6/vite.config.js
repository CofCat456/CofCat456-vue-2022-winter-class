import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue-2022-winter-class/week_5/' : '',
  plugins: [
    vue(),
    eslintPlugin({
      fix: true,
      cache: false,
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vorms': path.resolve(__dirname, 'node_modules/@vorms')
    }
  }
});
