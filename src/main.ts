import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import  { HttpClient } from './interceptors/http-interceptor';
import { createPinia } from 'pinia';
import './input.css';
const store = createPinia();

const app = createApp(App);

// Install HttpClient
HttpClient.install(app);

// Use router and store
app.use(router);
app.use(store);

// Mount the app
app.mount('#app');
