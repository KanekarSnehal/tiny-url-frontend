<template>
  <div class="flex items-center h-screen">
      <div class="w-7/12 p-8 flex flex-col items-center justify-center">
          <div className="text-center text-white bg-indigo-600 rounded-full p-6 mr-2 w-24 h-24 flex items-center justify-center mb-2">
              <IconLogo />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4 text-indigo-900">
              Shorten Your Links, Expand Your Reach
          </h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">Our URL shortener helps you create custom, branded links that are easy to share and track.</p>
      </div>

      <RouterView />
  </div>
</template>
<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';

</script>