import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import markdown from 'markdown-it'; // 外部ライブラリである markdown-it を使用してマークダウンをHTMLに変換

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

	const mdParser = new markdown();
	const htmlContent = mdParser.render(fileContent || ''); // マークダウンをHTMLに変換

	// 枠組みに提供するデータを返す
	return {
		params,
		htmlContent // 各マークダウンの中身
	};
}
