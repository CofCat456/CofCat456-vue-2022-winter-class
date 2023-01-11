import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ProductList from '../components/ProductList.vue';

const history = createWebHistory();
const routes = [
  {
    path: '/vue-2022-winter-class/week_2/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/vue-2022-winter-class/week_2/ProductList',
    name: 'ProductList',
    component: ProductList,
  },
];

export default createRouter({ history, routes });
