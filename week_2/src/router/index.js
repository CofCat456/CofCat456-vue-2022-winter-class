import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ProductList from '../components/ProductList.vue';

const path = process.env.NODE_ENV === 'production' ? '/vue-2022-winter-class/week_2/' : '';

const history = createWebHashHistory(path);
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/productList',
    name: 'ProductList',
    component: ProductList
  }
];

export default createRouter({ history, routes });
