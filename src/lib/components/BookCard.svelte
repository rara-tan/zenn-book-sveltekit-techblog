<script>
	import { Fa } from 'svelte-fa';
	import { faStar } from '@fortawesome/free-solid-svg-icons';
	export let book;
</script>

<div
	class="flex flex-col bg-white shadow-md rounded-lg overflow-hidden m-4 max-w-md mx-auto h-full"
>
	<div class="flex justify-center mt-4">
		<img class="w-1/3 object-cover" src={book.image} alt={book.title} />
	</div>
	<div class="m-4 flex flex-col justify-between flex-grow">
		<div>
			<h2 class="text-lg font-bold mb-2">{book.title}</h2>
			<p class="text-base text-gray-800 mb-2">{book.description}</p>
			<div class="flex items-center mb-2">
				<p class="font-bold text-gray-500 mr-2">Review:</p>
				<div class="flex text-yellow-500 space-x-1">
					{#each Array(book.rating).fill() as _, i (i)}<!-- eslint-disable-line -->
						<Fa icon={faStar} class="w-4 h-4"></Fa>
					{/each}
				</div>
			</div>
			<div class="flex text-sm flex-wrap">
				{#each book.category as category, i}<!-- eslint-disable-line -->
					<span class="px-2 py-1 bg-blue-200 text-blue-800 rounded-full mr-2 mb-2">{category}</span>
				{/each}
			</div>
		</div>
		<a
			href={book.link}
			class="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-center"
			>Link</a
		>
	</div>
</div>
