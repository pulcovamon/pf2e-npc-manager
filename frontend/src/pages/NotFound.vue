<template>
    <div class="p-8 text-center text-gray-800">
      <img
        src="/404.webp"
        alt="404 Dragon"
        class="mx-auto mb-6 w-64 h-auto"
      />
      <h1 class="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p class="mb-6">The creature you're looking for doesn't exist.</p>
      <RouterLink
        to="/creatures"
        class="text-violet-600 hover:underline text-lg"
      >
        Go back to Creatures
      </RouterLink>
    </div>
  </template>
  