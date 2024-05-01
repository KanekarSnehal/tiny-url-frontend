import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { HttpClient } from './interceptors/http-interceptor';
import { createPinia } from 'pinia';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import './input.css';
const store = createPinia();
import "vue3-toastify/dist/index.css";

const app = createApp(App);

// Install HttpClient
HttpClient.install(app);

// Use router and store
app.use(router);
app.use(store);
app.use(Vue3Toastify, {
    autoClose: 3000,
    clearOnUrlChange: false,
} as ToastContainerOptions);

// Mount the app
app.mount('#app');
