<script>
	export let data;
</script>

<h1>{data.params.articleId}</h1>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="content">{@html data.htmlContent}</div>
