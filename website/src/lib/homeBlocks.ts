import { getCollection, type CollectionEntry } from 'astro:content';

type HomeBlock = CollectionEntry<'homeBlocks'>;
type HomeBlockKind = HomeBlock['data']['kind'];

export async function requireHomeBlock<K extends HomeBlockKind>(kind: K): Promise<HomeBlock & { data: Extract<HomeBlock['data'], { kind: K }> }> {
	const blocks = await getCollection('homeBlocks');
	const entry = blocks.find((b) => b.data.kind === kind);
	if (!entry) {
		throw new Error(`Missing src/content/homeBlocks/*.md with kind: "${kind}"`);
	}
	if (entry.data.kind !== kind) {
		throw new Error(`Home block "${entry.id}" is kind "${entry.data.kind}", expected "${kind}"`);
	}
	return entry as HomeBlock & { data: Extract<HomeBlock['data'], { kind: K }> };
}
