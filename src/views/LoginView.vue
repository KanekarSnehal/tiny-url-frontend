<template>
    <div class="main-container flex items-center justify-center h-screen">
      <form class="box-container p-8 bg-white rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4">Sign In</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-fields mb-4">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              placeholder="Email Address"
              class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="form-fields mb-4">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="form-fields">
            <button
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
              name="commit"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div v-if="error" class="error text-red-600">{{ error }}</div>
        </form>
        <div class="login-choice mt-4 text-center">
          <span>or Sign In with</span>
        </div>
        <!-- <SocialLogin /> -->
        <div class="mt-4 text-center">
          <p>Don't have an account? <RouterLink to="/">Create one now</RouterLink></p>
        </div>
      </form>
    </div>
  </template>
  
  
  
  <script setup lang="ts">
//   import SocialLogin from '../components/SocialLogin.vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import { ref } from 'vue';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const userStore = useAuthStore();
  const error = ref('');
  
  const handleSubmit = async () => {
    try {
      await userStore.login({ email: email.value, password: password.value });
      if(userStore.error.explanation) {
        error.value = userStore.error.explanation;
        return;
      }
      userStore.user.role == 1 ? router.push('/admin') : router.push('/home');
      
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
    }
  };
  </script>