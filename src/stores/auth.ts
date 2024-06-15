import type { HttpClient } from '@/interceptors/http-interceptor';
import { defineStore } from 'pinia';
import { ref, inject, readonly } from 'vue';

interface LoginParams {
    email: string;
    password: string;
}

interface SignUpParams {
    email: string;
    password: string;
    name: string;
}

interface User {
    email: string;
    name: string;
    profile_image: string;
    access_token: string;
}

export const useAuthStore = defineStore('auth', () => {
    const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    const user = ref({
        email: userDetails ? userDetails.email : '',
        name: userDetails ? userDetails.name : '',
        profile_image: userDetails ? userDetails.profile_image : '',
    });
    const $http = inject<HttpClient>('$http')!;

    async function login({ email, password }: LoginParams) {
        const response = await $http.post<User>('/auth/login', { email, password });
        if(response.status == 'success') {
            user.value = { email: response.data.email, name: response.data.name, profile_image: response.data.profile_image };
            localStorage.setItem('user', JSON.stringify(user.value));
            localStorage.setItem('access_token', response.data.access_token);
            $http.setAccessToken(response.data.access_token);
        }
        return response;
    }

    async function register({ email, password, name }: SignUpParams) {
        const response = await $http.post('/auth/signup', { email, password, name });
        return response;
    }

    async function logout() {
        const response = await $http.post('/auth/logout', {});
        if(response.status == 'success') {
            user.value = { email: '', name: '', profile_image: '' };
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            $http.setAccessToken('');
        }
        return response;
    }
    
    async function getUser() {
        const response = await $http.get<User>('/user');
        if(response.status == 'success') {
            user.value = { email: response.data.email, name: response.data.name, profile_image: response.data.profile_image };
        }
        return response;
    }

    return {
        user: readonly(user),
        login,
        register,
        logout,
        getUser
    }
});
