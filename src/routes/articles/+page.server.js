import { getArticleSlugs } from '../../lib/getArticleSlugs';

export async function load() {
	const slugs = getArticleSlugs();

	return {
		slugs
	};
}
