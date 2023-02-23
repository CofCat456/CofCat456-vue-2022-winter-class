import { createApp } from 'vue';

import './style.css';
import './assets/all.scss';

// eslint-disable-next-line import/order
import { LoadingPlugin } from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap/dist/js/bootstrap';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(LoadingPlugin);
app.mount('#app');
