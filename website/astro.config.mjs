// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site uses `/JB-C`. For local dev, `npm run dev` sets `ASTRO_DEV_BASE=1`
// so `http://localhost:4321/careers` works without the `/JB-C` prefix (see package.json).
const base = process.env.ASTRO_DEV_BASE === '1' ? '/' : '/JB-C';

// https://astro.build/config
export default defineConfig({
	site: 'https://nithin8005.github.io',
	base,
	vite: {
		plugins: [tailwindcss()],
	},
});
