// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bdhhjxjx67-ux.github.io',
  base: '/bestinfobooks-8687info/',

  vite: {
    plugins: [tailwindcss()]
  }
});
