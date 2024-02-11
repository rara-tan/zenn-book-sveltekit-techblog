<script>
	export let data;
</script>

<ul>
	{#each data.articles as article}
		<li>
			<a rel="prefetch" href="/articles/{article.slug}">{article.metadata.title}</a>
		</li>
	{/each}
</ul>
