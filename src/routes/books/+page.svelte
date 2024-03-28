<script>
	export let data;
	import BookCard from '$lib/components/BookCard.svelte';
</script>

<svelte:head>
	<title>おすすめ書籍紹介: PlatformエンジニアのYossyのおすすめ書籍一覧</title>
	<meta
		name="description"
		content="Platformエンジニアとして働くYossyが実際に読んでみておすすめできる技術書を紹介します。"
	/>
</svelte:head>

<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each data.books as book}
		<li>
			<BookCard {book} />
		</li>
	{/each}
</ul>
