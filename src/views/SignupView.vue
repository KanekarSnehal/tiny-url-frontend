<template>
    <div class="flex items-center justify-center h-screen">
      <form @submit.prevent="handleSubmit">
        <div class="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 class="text-2xl font-bold mb-4">Create Your Account</h2>
          <div class="mb-4">
            <input
              id="user_name"
              name="name"
              type="text"
              v-model="name"
              placeholder="Full name"
              class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              placeholder="Email Address"
              class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <button
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
              name="commit"
              type="submit"
            >
              Create your account
            </button>
          </div>
          <div v-if="error" class="text-red-600">{{ error }}</div>
          <div class="text-center mt-4">
            <span>or sign up with</span>
          </div>
          <!-- <SocialSignUp /> -->
          <div class="text-center mt-4">
            <p>
              By signing up you agree to the
              <a href="#">Terms of Service</a>.
            </p>
          </div>
          <div class="text-center">
            <p>Already have an account? <RouterLink to="/login">Sign In</RouterLink></p>
          </div>
        </div>
      </form>
    </div>
  </template>
  

  

<script setup lang="ts">
// import SocialSignUp from '../components/SocialLogin.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref, inject } from 'vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const name = ref('');
const userStore = useAuthStore();
const error = ref('');

const handleSubmit = async () => {
    try {
        await userStore.register({ email: email.value, password: password.value, name: name.value });
        if (userStore.error.explanation) {
            error.value = userStore.error.explanation;
        } else {
            router.push('/login');
        }
    } catch (error) {
        // Handle error, such as displaying an error message
        console.log(error);
    }
};
</script>