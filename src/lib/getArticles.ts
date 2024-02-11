import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Metadata {
	title: string;
}

interface ArticleInfo {
	slug: string;
	metadata: Metadata;
}

export function getArticles(): ArticleInfo[] {
	const articlesDirectory = path.resolve(process.cwd(), 'articles');
	const filenames = fs.readdirSync(articlesDirectory);

	const articles: ArticleInfo[] = filenames.map((filename) => {
		const slug = filename.replace(/\.[^.]+$/, '');
		const fullPath = path.join(articlesDirectory, filename);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return { slug, metadata: data as Metadata };
	});

	return articles;
}
