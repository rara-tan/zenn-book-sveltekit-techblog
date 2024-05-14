import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import markdown from 'markdown-it'; // 外部ライブラリである markdown-it を使用してマークダウンをHTMLに変換
import matter from 'gray-matter';
import { format } from 'date-fns';
import { getArticles } from '$lib/getArticles';
import markdownItHighlightJs from 'markdown-it-highlightjs';

const readFile = promisify(fs.readFile);

export async function load({ params }) {
	// パラメータからファイル名を取得
	const { articleId } = params;
	// ファイルパスを作成
	const filePath = path.resolve('articles', `${articleId}.md`);

	// ファイルを読み込む
	let fileContent;
	try {
		fileContent = await readFile(filePath, 'utf-8');
	} catch (err) {
		console.error('Error reading file:', err);
	}

	// gray-matterを使ってMarkdownとFront Matterを分離
	const parsedMatter = matter(fileContent);
	const mdParser = new markdown({ linkify: true });
	mdParser.use(markdownItHighlightJs);
	const htmlContent = mdParser.render(parsedMatter.content);

	let metadata = parsedMatter.data;
	if (metadata.date instanceof Date) {
		metadata.date = format(metadata.date, 'yyyy-MM-dd');
	}

	const slug = path.basename(filePath, '.md');
	const articles = getArticles();
	// 枠組みに提供するデータを返す
	return {
		slug,
		articles,
		params,
		htmlContent, // マークダウンをHTMLに変換したもの
		metadata // メタデータ
	};
}
