// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://nithin8005.github.io',
	base: '/JB-C',
	vite: {
		plugins: [tailwindcss()],
	},
	redirects: {
		'/team': '/careers',
	},
});
