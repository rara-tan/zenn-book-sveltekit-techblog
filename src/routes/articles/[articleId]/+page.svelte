<script>
	export let data;
</script>

<h1>{data.metadata.title}</h1>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article class="markdown-body">{@html data.htmlContent}</article>
