<template>
  <div
    class="min-h-screen bg-[url('/bg4.jpg')] bg-repeat bg-center bg-fixed bg-[length:500px_500px] text-gray-900"
  >
    <header class="bg-white/70 backdrop-blur-sm shadow-md">
      <div class="flex items-center gap-4 p-4 max-w-5xl mx-auto">
        <img
          src="/logo2.webp"
          alt="Logo"
          class="w-20 h-20 object-contain"
        />
        <h1 class="text-xl sm:text-2xl font-bold tracking-wide">
          RPG Monster Manager
        </h1>
      </div>
    </header>

    <main class="p-4">
      <div class="bg-white/70 backdrop-blur-sm p-6 rounded-lg ml-auto mr-auto max-w-5xl shadow-lg">
        <RouterView />
      </div>
    </main>
  </div>
</template>
