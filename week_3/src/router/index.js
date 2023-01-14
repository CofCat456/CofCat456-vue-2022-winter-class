import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import ProductList from '../components/ProductList.vue';

const history = createWebHistory();
const routes = [
  {
    path: '/vue-2022-winter-class/week_3/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/vue-2022-winter-class/week_3/productList',
    name: 'ProductList',
    component: ProductList
  }
];

export default createRouter({ history, routes });
