<script>
	export let data;
</script>

<div class="py-8 px-4 mb-10 rounded-lg flex flex-col items-center bg-slate-100">
	<h1 class="text-3xl font-bold">{data.metadata.title}</h1>
	<div class="flex justify-center items-center w-full mt-4">
		<p
			class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm mr-2"
		>
			{data.metadata.category}
		</p>
		<p class="text-lg text-gray-600 ml-2 text-s">{data.metadata.date}</p>
	</div>
</div>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article class="markdown-body">{@html data.htmlContent}</article>
