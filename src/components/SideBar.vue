<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
       <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
         <RouterLink to="/create" type="button" class="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create new
         </RouterLink>

          <ul class="space-y-2 font-medium">
             <li>
                <RouterLink to="/home" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                   <IconHome/>
                   <span class="ms-3">Home</span>
                </RouterLink>
             </li>
             <li>
                <RouterLink to="/links" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IconLink/>
                   <span class="flex-1 ms-3 whitespace-nowrap">Links</span>
                   <!-- <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> -->
                </RouterLink>
             </li>
             <li>
                <RouterLink to="/qrcodes" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                   <IconQR/>
                   <span class="flex-1 ms-3 whitespace-nowrap">QR Codes</span>
                   <!-- <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> -->
                </RouterLink>
             </li>
             <li>
                <RouterLink to="/profile" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                   <IconProfile/>
                   <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </RouterLink>
             </li>
          </ul>
       </div>
    </aside>
</template>

<script setup lang="ts">
import IconHome from '@/components/icons/IconHome.vue';
import IconLink from  '@/components/icons/IconLink.vue';
import IconQR from '@/components/icons/IconQR.vue';
import IconProfile from '@/components/icons/IconProfile.vue';

</script>

<style>
/* Add your Tailwind CSS styles here */
</style>
