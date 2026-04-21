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
	let p = pathname || '/';
	const base = normalizedBase();
	if (base !== '/') {
		if (p.startsWith(base)) {
			const rest = p.slice(base.length);
			p = rest ? `/${rest.replace(/^\/+/, '')}` : '/';
		} else {
			const baseNoSlash = base.slice(0, -1);
			if (p === baseNoSlash) p = '/';
		}
	}
	// Astro static output often uses trailing slashes (`/portfolio/`); normalize for Set/href checks.
	if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
	return p;
}
