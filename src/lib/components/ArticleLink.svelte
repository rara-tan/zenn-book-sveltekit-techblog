<script>
	import { format } from 'date-fns';
	export let article;
</script>

<a
	rel="prefetch"
	href="/articles/{article.slug}"
	class="m-4 pb-4 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 flex flex-col items-start transition-colors duration-200 ease-in-out hover:bg-gray-100 overflow-hidden"
>
	<div>
		<img
			class="w-full object-cover"
			src={`/thumbnails/${article.metadata.thumbnail}`}
			alt={article.metadata.title}
		/>
	</div>
	<h1 class="text-lg font-bold px-3 text-black pt-4">{article.metadata.title}</h1>
	<div class="pt-3 px-3 flex items-center justify-start">
		<p
			class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-xs mr-2"
		>
			{article.metadata.category}
		</p>
		<p class="text-gray-500 text-xs">{format(new Date(article.metadata.date), 'yyyy-MM-dd')}</p>
	</div>
</a>
