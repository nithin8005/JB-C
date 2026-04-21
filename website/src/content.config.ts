import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const marketing = defineCollection({
	loader: glob({ base: './src/content/marketing', pattern: '**/*.md' }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
		aboutHeading: z.string().optional(),
		/** Hero-style image for the About section (`public/` path from site root, e.g. `/images/about.jpg`). */
		aboutImage: z.string().optional(),
		aboutImageAlt: z.string().optional(),
		/** Optional bullet list under the About column on the homepage. */
		aboutPoints: z.array(z.string()).optional(),
		/** Homepage About: name + primary title + role bullets (photo is the main column image only). */
		aboutProfile: z
			.object({
				name: z.string(),
				title: z.string(),
				roles: z.array(z.string()),
			})
			.optional(),
	}),
});

const homeBlocks = defineCollection({
	loader: glob({ base: './src/content/homeBlocks', pattern: '**/*.md' }),
	schema: z.discriminatedUnion('kind', [
		z.object({
			kind: z.literal('hero'),
			title: z.string(),
			description: z.string(),
			ctaLabel: z.string(),
			ctaHref: z.string(),
			/** Optional looping background video (path under `public/`, e.g. `/videos/hero.webm`). */
			videoWebm: z.string().optional(),
			/** Optional MP4 fallback for Safari and older browsers. */
			videoMp4: z.string().optional(),
			/** Poster image shown before playback and when video is unavailable. */
			videoPoster: z.string().optional(),
			/** Full-bleed hero background when no video (`public/` path, e.g. `/images/home-hero-bg.png`). */
			backgroundImage: z.string().optional(),
			/** Short description of the background art (empty string if decorative only). */
			backgroundImageAlt: z.string().optional(),
		}),
		z.object({
			kind: z.literal('portfolio'),
			title: z.string(),
			intro: z.string(),
			/** Full-width hero image at top of portfolio page (`public/` path). */
			heroBackground: z.string().optional(),
			/** Hero headline when `heroBackground` is set (defaults to `title`). */
			heroHeadline: z.string().optional(),
			/** Hero subline when `heroBackground` is set (defaults to `intro`). */
			heroTagline: z.string().optional(),
			companies: z.array(
				z.object({
					name: z.string(),
					industry: z.string(),
					description: z.string(),
					/** Path under `public/` (e.g. `/logos/company.svg`). */
					logo: z.string().optional(),
					/** Company or case-study URL (`https://…` or `/path`); whole card links when set. */
					href: z.string().optional(),
				}),
			),
		}),
		z.object({
			kind: z.literal('sustainability'),
			title: z.string(),
			intro: z.string(),
			/** Optional wide image under intro (`/images/...` or `https://…`). */
			heroImage: z.string().optional(),
			heroImageAlt: z.string().optional(),
			initiatives: z.array(
				z.object({
					title: z.string(),
					body: z.string(),
					/** Card image (`/images/...` or `https://…`). */
					image: z.string().optional(),
					imageAlt: z.string().optional(),
				}),
			),
			commitmentTitle: z.string(),
			commitmentParagraphs: z.tuple([z.string(), z.string()]),
			/** Image beside “Our Commitment” text (`/images/...` or `https://…`). */
			commitmentImage: z.string().optional(),
			commitmentImageAlt: z.string().optional(),
			metrics: z.array(
				z.object({
					value: z.string(),
					label: z.string(),
				}),
			),
		}),
		z.object({
			kind: z.literal('locations'),
			title: z.string(),
			/** Optional line under the heading (e.g. global presence). */
			intro: z.string().optional(),
			locations: z.array(
				z.object({
					name: z.string(),
					/**
					 * Image URL: path from site root for files in `public/` (e.g. `/images/locations/bengaluru.png`)
					 * or an absolute URL (`https://…`).
					 */
					image: z.string().optional(),
					imageAlt: z.string().optional(),
				}),
			),
		}),
		z.object({
			kind: z.literal('contact'),
			title: z.string(),
			intro: z.string(),
			email: z.string(),
		}),
	]),
});

const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(['Investment', 'Portfolio', 'ESG', 'Award', 'Partnership']),
		publishedAt: z.coerce.date(),
		readMoreHref: z.string().optional(),
		draft: z.boolean().optional(),
	}),
});

const careers = defineCollection({
	loader: glob({ base: './src/content/careers', pattern: '**/*.md' }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
		headline: z.string(),
		subhead: z.string(),
		whyTitle: z.string(),
		whyBody: z.string(),
		benefits: z.array(z.string()),
		testimonialPhotoAlt: z.string().optional(),
		testimonialQuote: z.string(),
		testimonialAttribution: z.string(),
		positionsSectionTitle: z.string(),
		positions: z.array(
			z.object({
				title: z.string(),
				department: z.string(),
				location: z.string(),
				employmentType: z.string(),
				applyHref: z.string().optional(),
				applyLabel: z.string().optional(),
			}),
		),
		generalTitle: z.string(),
		generalBody: z.string(),
		generalButtonLabel: z.string(),
		generalButtonHref: z.string(),
	}),
});

const site = defineCollection({
	loader: glob({ base: './src/content/site', pattern: '**/*.md' }),
	schema: z.discriminatedUnion('doc', [
		z.object({
			doc: z.literal('branding'),
			siteNameDisplay: z.string(),
			footerTagline: z.string(),
			footerLegalName: z.string(),
			copyrightEntity: z.string(),
			/** Shown in footer “Start here” column (mailto link). */
			footerContactEmail: z.string().optional(),
		}),
		z.object({
			doc: z.literal('news-page'),
			seo: z.object({
				title: z.string(),
				description: z.string(),
			}),
			pageHeading: z.string(),
			pageIntro: z.string(),
			readMoreLabel: z.string(),
			viewAllLabel: z.string(),
			viewAllHref: z.string(),
		}),
		z.object({
			doc: z.literal('real-assets'),
			seo: z.object({
				title: z.string(),
				description: z.string(),
			}),
			heroHeadline: z.string(),
			heroSubline: z.string(),
			/** Path under `public/` (e.g. `/images/real-assets/hero.jpg`) or absolute image URL. */
			heroImage: z.string(),
			heroImageAlt: z.string(),
			pillars: z.array(
				z.object({
					title: z.string(),
					tagline: z.string(),
					body: z.string(),
					image: z.string(),
					imageAlt: z.string(),
					ctaLabel: z.string().optional(),
					ctaHref: z.string().optional(),
				}),
			),
			closingHeadline: z.string(),
			closingBody: z.string(),
		}),
	]),
});

export const collections = { marketing, homeBlocks, news, careers, site };
