import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import ProductList from '../components/ProductList.vue';

const path = process.env.NODE_ENV === 'production' ? '/vue-2022-winter-class/week_3/' : '';
const history = createWebHashHistory(path);
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/productList',
    name: 'ProductList',
    component: ProductList
  }
];

export default createRouter({ history, routes, base: '/vue-2022-winter-class/week_3/' });
