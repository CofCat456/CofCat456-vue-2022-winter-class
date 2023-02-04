import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import ProductList from '@/components/ProductList.vue';

const path = process.env.NODE_ENV === 'production' ? '/vue-2022-winter-class/week_5/' : '';
const history = createWebHistory(path);
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: 'productList',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'shopCart',
        name: 'ShopCart',
        component: ProductList
      }
    ]
  }
];

export default createRouter({ history, routes, base: '/vue-2022-winter-class/week_5/' });
