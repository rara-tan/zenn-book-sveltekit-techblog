<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-B15JLW0LWG"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-B15JLW0LWG');
	</script>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<header
		class="relative flex items-center justify-between px-1 md:px-3 md:py-1 bg-white shadow-sm"
	>
		<div>
			<a href="/">
				<img src="/images/logo.png" alt="Logo" class="h-14 w-auto" />
			</a>
		</div>
		<nav class="flex justify-between items-center md:text-lg text-sm font-bold font-serif">
			<a href="/profiles" class="text-black md:px-3 px-1 hover:text-gray-400">Profile</a>
			<a href="/articles" class="text-black md:px-3 px-1 hover:text-gray-400">Article</a>
			<a href="/books" class="text-black md:px-3 px-1 hover:text-gray-400">Book</a>
		</nav>
	</header>

	<div class="flex-grow px-4 py-6">
		<slot />
	</div>

	<footer class="bg-black py-2 text-center text-white">
		<p>My Awesome Website!</p>
	</footer>
</div>
