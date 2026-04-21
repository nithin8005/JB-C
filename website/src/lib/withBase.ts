/**
 * Prefix `astro.config` `base` for root-relative URLs so `public/` assets and internal
 * routes work on GitHub Pages project sites (e.g. `/JB-C/...`).
 */
function normalizedBase(): string {
	let b = import.meta.env.BASE_URL ?? '/';
	if (!b || b === '/') return '/';
	return b.endsWith('/') ? b : `${b}/`;
}

export function withBase(path: string): string {
	const p = (path ?? '').trim();
	if (!p) return p;
	if (/^(https?:|mailto:|tel:)/i.test(p)) return p;
	if (p.startsWith('data:') || p.startsWith('//')) return p;
	if (p.startsWith('#')) return p;

	const base = normalizedBase();
	if (base === '/') return p.startsWith('/') ? p : `/${p}`;

	const baseNoSlash = base.slice(0, -1);
	if (p.startsWith(base) || p.startsWith(`${baseNoSlash}/`) || p === baseNoSlash) return p;

	const clean = p.startsWith('/') ? p : `/${p}`;
	return `${baseNoSlash}${clean}`;
}

/** Strip deploy base from `Astro.url.pathname` for route comparisons (e.g. `/JB-C/portfolio` → `/portfolio`). */
export function sitePathname(pathname: string): string {
	const p = pathname || '/';
	const base = normalizedBase();
	if (base === '/') return p;
	if (p.startsWith(base)) {
		const rest = p.slice(base.length);
		return rest ? `/${rest.replace(/^\/+/, '')}` : '/';
	}
	const baseNoSlash = base.slice(0, -1);
	if (p === baseNoSlash) return '/';
	return p;
}
