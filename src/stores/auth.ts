import type { HttpClient } from '@/interceptors/http-interceptor';
import type { AxiosInstance, AxiosStatic } from 'axios';
import { defineStore } from 'pinia';
import { ref, inject } from 'vue';

interface LoginParams {
    email: string;
    password: string;
}

interface SignUpParams {
    email: string;
    password: string;
    name: string;
}

export const useAuthStore = defineStore('auth', () => {
    const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const user = ref({
        email: userDetails ? userDetails.email : '',
        name: userDetails ? userDetails.name : '',
        profile_image: userDetails ? userDetails.profile_image : '',
    });
    const $http = inject<any>('$http')!;
    const error = ref({
        explanation: '',
        name: '',
        message: ''
    });

    async function login({ email, password }: LoginParams) {
        const response = await $http.post('/auth/login', { email, password });
        if(response.status == 'success') {
            user.value = { email: response.data.email, name: response.data.name, profile_image: response.data.profile_image };
            localStorage.setItem('user', JSON.stringify(user.value));
            localStorage.setItem('access_token', response.data.access_token);
            $http.setAccessToken(response.data.access_token);
        } else {
            error.value = response;
        }
    }

    async function register({ email, password, name }: SignUpParams) {
        const response = await $http.post('/auth/signup', { email, password, name });
        console.log(response);
        if (response.status == 'success') {
            return response;
          } else {
            error.value = response;
            return error;
          }
    }

    return {
        user,
        error,
        login,
        register
    }
});
