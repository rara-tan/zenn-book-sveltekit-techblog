<script>
	export let data;
</script>

<ul>
	{#each data.slugs as slug}
		<li>
			<a rel="prefetch" href="/articles/{slug}">{slug}</a>
		</li>
	{/each}
</ul>
