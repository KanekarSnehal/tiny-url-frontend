<template>
  <div class="flex items-center justify-center h-screen">
      <form @submit.prevent="onSubmit">
        <div class="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 class="text-2xl font-bold mb-4">Create Your Account</h2>
          <div class="mb-4">
            <input
              id="user_name"
              name="name"
              type="text"
              v-model="name"
              v-bind="nameProps"
              placeholder="Full name"
              class="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p class="text-red-600">{{ errors.name }}</p>
          </div>
          <div class="mb-4">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              v-bind="emailProps"
              placeholder="Email Address"
              class="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p class="text-red-600">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              v-bind="passwordProps"
              placeholder="Password"
              class="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p class="text-red-600">{{ errors.password }}</p>
          </div>
          <div class="mb-4">
            <button
              class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
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
          </div>
          <div class="text-center">
            <p>Already have an account? <RouterLink to="/auth/login">Sign In</RouterLink></p>
          </div>
        </div>
      </form>
    </div>
  </template>
  

  

<script setup lang="ts">
// import SocialSignUp from '../components/SocialLogin.vue';
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
    name: '',
  },
  validationSchema: {
    email: validateField('email'),
    password: validateField('password'),
    name: validateField('name'),
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
    case 'name':
      return (value: string) => {
        if (value && value.length >= 3) {
          return true;
        }
        return 'This field must be at least 3 characters long';
      };
    default:
      return true;
  }
}

// define fields
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [name, nameProps] = defineField('name');

const onSubmit = handleSubmit(async () => {
  try {
    await userStore.register({ email: email.value, password: password.value, name: name.value });
    if (userStore.error.explanation) {
      error.value = userStore.error.explanation;
    } else {
      router.push('/auth/login');
    }
  } catch (error) {
    // Handle error, such as displaying an error message
    console.log(error);
  }
});
</script>