<script>
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
</script>

<svelte:head>
	<title>My Awesome Articles</title>
	<meta name="description" content="There are lots of great articles" />
</svelte:head>

<ul>
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
