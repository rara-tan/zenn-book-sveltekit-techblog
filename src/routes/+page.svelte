<script>
	import { onMount } from 'svelte';
	export let data;
	import ArticleLink from '$lib/components/ArticleLink.svelte';
	let typingString = '';
	onMount(async () => {
		function startTypingAnimation() {
			const text = "Welcome to Yossy's Tech Blog!";
			let i = 0;
			typingString = '';
			function typeWriter() {
				if (i < text.length) {
					typingString += text.charAt(i);
					i++;
					setTimeout(typeWriter, 75);
				} else {
					setTimeout(startTypingAnimation, 3500);
				}
			}
			typeWriter();
		}
		startTypingAnimation();
	});
</script>

<svelte:head>
	<title>Yossy's Tech Blog</title>
	<meta
		name="description"
		content="Platformエンジニアとして働くYossyのテックブログです。技術記事・おすすめ本・おすすめガジェットなどを紹介していきます。"
	/>
	<meta property="og:title" content="Yossy's Tech Blog" />
	<meta
		property="og:description"
		content="Platformエンジニアとして働くYossyのテックブログです。技術記事・おすすめ本・おすすめガジェットなどを紹介していきます。"
	/>
	<meta property="og:site_name" content="Yossy's Tech Blog" />
	<meta property="og:url" content="https://yssy.io" />
	<meta property="og:image" content="https://yssy.io/og.png" />
</svelte:head>

<div class="py-6 mb-4 rounded-lg flex flex-col items-center">
	<div class="h-16 flex items-center justify-center">
		<h1 class="text-3xl font-bold">{typingString}</h1>
	</div>
	<div class="mt-4">
		<p class="text-lg text-gray-600 text-s">
			Hi! I'm Yossy, a Platform Engineer.<br />I started this blog to share my thoughts on
			technology.<br />I hope you enjoy it!
		</p>
	</div>
</div>

<h2 class="text-2xl font-bold mb-4">Latest Articles</h2>
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each data.articles as article}
		<li>
			<ArticleLink {article} />
		</li>
	{/each}
</ul>
