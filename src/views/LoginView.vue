<template>
    <div class="main-container flex items-center justify-center h-screen">
      <form class="box-container p-8 bg-white rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-4">Sign In</h2>
        <form @submit.prevent="onSubmit">
          <div class="form-fields mb-4">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              placeholder="Email Address"
              class="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p class="error text-red-600">{{ errors.email }}</p>
          </div>
          <div class="form-fields mb-4">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p class="error text-red-600">{{ errors.password }}</p>
          </div>
          <div class="form-fields">
            <button
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
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
          <p>Don't have an account? <RouterLink to="/auth/signup">Create one now</RouterLink></p>
        </div>
      </form>
    </div>
  </template>
  
  
  
  <script setup lang="ts">
//   import SocialLogin from '../components/SocialLogin.vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import { ref } from 'vue';
import { useForm } from 'vee-validate';
  
  const router = useRouter();
  const userStore = useAuthStore();
  const error = ref('');

  // create form
const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: {
    email: validateField('email'),
    password: validateField('password'),
  },
});

function validateField(field: string) {
  switch (field) {
    case 'email':
      return (value: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value && emailPattern.test(value)) {
          return true;
        }
        return 'This field must be a valid email address';
      };
    case 'password':
      return (value: string) => {
        if (value && value.length >= 6) {
          return true;
        }
        return 'This field must be at least 6 characters long';
      };
    default:
      return true;
  }
}

// define fields
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
  
  const onSubmit = handleSubmit(async () => {
    try {
      await userStore.login({ email: email.value, password: password.value });
      if(userStore.error.explanation) {
        error.value = userStore.error.explanation;
        return;
      }
      router.push('/home');
      // userStore.user.role == 1 ? router.push('/admin') : router.push('/home');
      
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
    }
  });
  </script>