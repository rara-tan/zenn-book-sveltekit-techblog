<script>
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
</script>

<ul>
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
