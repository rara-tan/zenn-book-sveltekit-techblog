<script>
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header class="flex items-center justify-between px-6 py-4 bg-black">
		<h1>
			<a href="/" class="text-white font-bold text-2xl">Tech Blog</a>
		</h1>
		<nav class="flex gap-4">
			<a href="/" class="text-white hover:text-gray-400">Top</a>
			<a href="/profiles" class="text-white hover:text-gray-400">Profile</a>
			<a href="/articles" class="text-white hover:text-gray-400">Article</a>
		</nav>
	</header>

	<div class="flex-grow px-4 py-6">
		<slot />
	</div>

	<footer class="bg-black py-2 text-center text-white">
		<p>My Awesome Website!</p>
	</footer>
</div>
