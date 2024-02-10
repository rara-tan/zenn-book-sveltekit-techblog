<script>
	export let data;
</script>

<h1>{data.params.articleId}</h1>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article class="markdown-body">{@html data.htmlContent}</article>
