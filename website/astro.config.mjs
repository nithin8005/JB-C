// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site uses `/JB-C`, but local `astro dev` should use `/`.
// Keeping this command-aware avoids base-path router errors when running `npx astro dev`.
// @ts-ignore
export default defineConfig(({ command }) => ({
	site: 'https://nithin8005.github.io',
	base: command === 'dev' ? '/' : '/JB-C',
	vite: {
		plugins: [tailwindcss()],
	},
}));
