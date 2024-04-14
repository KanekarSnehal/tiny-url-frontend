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
            <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
         </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
const authStore = useAuthStore();

interface User {
    name: string;
    email: string;
    profile_image?: string;
}

const user = ref<User>({
    name: '',
    email: '',
    profile_image: ''
});

onMounted(async () => {
    const response = await authStore.getUser();
    if(response.status == 'success') {
        user.value = response.data;
    }
});

async function logout() {
    const response = await authStore.logout();
    // if (response.status == 'success') {
    //     // localStorage.removeItem('user');
    //     // localStorage.removeItem('access_token');
    //     // router.push('/login');
    // }
}

</script>