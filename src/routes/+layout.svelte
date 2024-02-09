<script>
  import "../app.css";
</script>

<header class="flex items-center justify-between px-6 py-4 bg-black">
  <h1 class="text-2xl font-bold text-white">Tech Blog</h1>
  <nav class="flex gap-4">
    <a href="/" class="text-white hover:text-gray-400">home</a>
    <a href="/profiles" class="text-white hover:text-gray-400">Profile</a>
  </nav>
</header>

<slot />

<footer class="bg-black py-2 text-center text-white">
  <p>My Awesome Website!</p>
</footer>
