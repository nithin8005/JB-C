// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Default to `/` for local dev and Cloudflare.
// GitHub Pages uses project-site base `/JB-C` via DEPLOY_TARGET=github-pages in workflow.
// @ts-ignore
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
const base = isGitHubPages ? '/JB-C' : '/';

// https://astro.build/config
export default defineConfig({
	site: 'https://nithin8005.github.io',
	base,
	vite: {
		plugins: [tailwindcss()],
	},
});
