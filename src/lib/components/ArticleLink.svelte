<script>
	export let article;
</script>

<a
	rel="prefetch"
	href="/articles/{article.slug}"
	class="m-4 p-4 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 flex items-center space-x-4 transition-colors duration-200 ease-in-out hover:bg-gray-100"
>
	<div>
		<div class="text-xl font-medium text-black mb-3">{article.metadata.title}</div>
		<div class="mt-2 flex items-center justify-start">
			<p
				class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm mr-2"
			>
				{article.metadata.category}
			</p>
			<p class="text-gray-500 text-xs">{article.metadata.date}</p>
		</div>
	</div>
</a>
