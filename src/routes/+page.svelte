<script>
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
</script>

<svelte:head>
	<title>My Awesome Tech Blog</title>
	<meta name="description" content="This tech blog features many wonderful articles." />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>テスト</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<ul>
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
