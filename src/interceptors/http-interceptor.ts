import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError, AxiosHeaders } from 'axios';
import { type InternalAxiosRequestConfig } from 'axios';
import { ref, type App } from 'vue';
import router from '@/router';
import type { Router } from 'vue-router';

class HttpClient {
    private axiosInstance: AxiosInstance;
    private accessToken = ref<string | null>(localStorage.getItem('access_token'));

    constructor(private router: Router) {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            timeout: 10000,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // Add a request interceptor
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (this.accessToken.value && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/signup')) {
                    config.headers.Authorization = `Bearer ${this.accessToken.value}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                //  if status code is 403 then logout and redirect to login
                if (error.response?.status === 403) {
                    this.router.push({ name: 'login' });
                    localStorage.removeItem('access_token');
                    this.accessToken.value = null;
                }
                return error.response;
            }
        );
    }

    // Helper function to set the access token
    public setAccessToken(accessToken: string): void {
        localStorage.setItem('access_token', accessToken);
        this.accessToken.value = accessToken;
    }

    // Helper function to get the access token
    public getAccessToken(): string | null {
        return this.accessToken.value;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig) {
        const response = await this.axiosInstance.get<{ message?: string, data: T, status: "success" | "error", statusCode: number}>(url, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<{ message?: string, data: T, status: "success" | "error", statusCode: number}> {
        const response = await this.axiosInstance.delete<{ message?: string, data: T, status: "success" | "error", statusCode: number}>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ message?: string, data: T, status: "success" | "error", statusCode: number}> {
        const response = await this.axiosInstance.post<{ message?: string, data: T, status: "success" | "error", statusCode: number}>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ message?: string, data: T, status: "success" | "error", statusCode: number}> {
        const response = await this.axiosInstance.put<{ message?: string, data: T, status: "success" | "error", statusCode: number}>(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ message?: string, data: T, status: "success" | "error", statusCode: number}> {
        const response = await this.axiosInstance.patch<{ message?: string, data: T, status: "success" | "error", statusCode: number}>(url, data, config);
        return response.data;
    }

    public static install(app: App) {
        app.provide('$http', new HttpClient(router));
        return this;
    }

}

export { HttpClient }; 