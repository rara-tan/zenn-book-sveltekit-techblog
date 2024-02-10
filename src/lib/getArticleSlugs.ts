import fs from 'fs';
import path from 'path';

export function getArticleSlugs(): string[] {
	const articlesDirectory = path.resolve(process.cwd(), 'articles');
	const filenames = fs.readdirSync(articlesDirectory);
	const slugs = filenames.map((filename) => filename.replace(/\.[^.]+$/, ''));
	return slugs;
}
