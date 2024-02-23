<script>
	export let data;
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<div class="pb-12 px-0 md:pt-3 md:px-6 flex flex-col items-center">
	<div>
		<img
			class="h-96 w-full object-cover rounded-lg"
			src={`/thumbnails/${data.metadata.thumbnail}`}
		/>
	</div>
	<h1 class="text-3xl font-semibold mt-8">{data.metadata.title}</h1>
	<div class="flex justify-center items-center w-full mt-4">
		<p class="inline-flex items-center px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs mr-2">
			{data.metadata.category}
		</p>
		<p class="text-md text-gray-700 ml-2">{data.metadata.date}</p>
	</div>
</div>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article class="markdown-body">{@html data.htmlContent}</article>
