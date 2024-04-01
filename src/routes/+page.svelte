<script>
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
</script>

<svelte:head>
	<title>Yossy's Tech Blog</title>
	<meta
		name="description"
		content="Platformエンジニアとして働くYossyのテックブログです。技術記事・おすすめ本・おすすめガジェットなどを紹介していきます。"
	/>
</svelte:head>

<div class="py-8 px-4 mb-10 rounded-lg flex flex-col items-center bg-slate-100">
	<h1 class="text-3xl font-bold">Yossy's Tech Blog!</h1>
	<div class="mt-4">
		<p class="text-lg text-gray-600 text-s">
			This is my tech blog. Packed with tech articles that serve as handy references for software
			engineers. Feel free to bookmark if you like what you see!
		</p>
	</div>
</div>

<ul>
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
