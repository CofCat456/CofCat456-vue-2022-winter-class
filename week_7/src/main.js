import { createApp } from 'vue';

import './style.css';
import './assets/all.scss';

// eslint-disable-next-line import/order
import { LoadingPlugin } from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap/dist/js/bootstrap';

import App from './App.vue';
import router from './router';

import { currency, date } from './utlis/global';

const app = createApp(App);

app.config.globalProperties.$filters = {
  currency,
  date
};

app.use(router);
app.use(LoadingPlugin);
app.mount('#app');
