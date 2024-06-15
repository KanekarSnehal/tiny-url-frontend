<template>
     <div class="p-4 sm:ml-64">
     <div class="p-4 mt-14">
         <div class="flex flex-col items-center justify-center h-full space-y-4">
             <h1 class="text-2xl font-bold">Profile</h1>
             <div class="flex flex-col items-center space-y-4">
                 <img src="https://avatars.githubusercontent.com/u/56169832?v=4" alt="avatar" class="w-24 h-24 rounded-full"/>
                 <h2 class="text-lg font-semibold">{{ user.name }}</h2>
                 <h2 class="text-lg font-semibold">{{ user.email }}</h2>
                 <p class="text-gray-500"></p>
             </div>
            <button @click="doLogout" class="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
         </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const { user, logout } = useAuthStore();
const router = useRouter();

async function doLogout() {
    const response = await logout();
    if (response.status == 'success') {
        router.push({ name: 'login' });
    }
}

</script>