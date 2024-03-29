import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';
import { type InternalAxiosRequestConfig } from 'axios';
import { ref, type App } from 'vue';

class HttpClient {
    private axiosInstance: AxiosInstance;
    private accessToken = ref<string | null>(null);

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            timeout: 1000,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // Add a request interceptor
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
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
                return error.response;
            }
        );
    }

    // Helper function to set the access token
    public setAccessToken(accessToken: string | null): void {
        this.accessToken.value = accessToken;
    }

    // Helper function to get the access token
    public getAccessToken(): string | null {
        return this.accessToken.value;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data, config);
        return response.data;
    }

    public static install(app: App) {
        app.provide('$http', new HttpClient());
        return this;
    }

}

export { HttpClient }; 