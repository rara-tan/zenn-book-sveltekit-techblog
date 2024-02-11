<script>
	export let data;
</script>

<h1>{data.metadata.title}</h1>
<p>{data.metadata.category}</p>
<p>{data.metadata.date}</p>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article class="markdown-body">{@html data.htmlContent}</article>
