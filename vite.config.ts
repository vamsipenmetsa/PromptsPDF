import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/PromptsPDF/' // Set the base path for GitHub Pages
});
