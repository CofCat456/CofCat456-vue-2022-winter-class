import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import 'bootstrap-icons/font/bootstrap-icons.css';

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

createApp(App).use(router).use(LoadingPlugin).mount('#app');
