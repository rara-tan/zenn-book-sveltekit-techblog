<script>
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
</script>

<svelte:head>
	<title>技術記事一覧 | Yossy's Tech Blog</title>
	<meta
		name="description"
		content="Platformに関する記事を中心にソフトウェアエンジニアに役立つ技術記事を投稿しています。"
	/>
</svelte:head>

<h2 class="text-2xl font-bold mb-4">Latest Articles</h2>
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
