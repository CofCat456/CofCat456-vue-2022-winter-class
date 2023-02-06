import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import Checkout from '@/views/CheckoutPage.vue';
import ProductListPage from '@/views/ProductListPage.vue';
import ShopCartPage from '@/views/ShopCartPage.vue';

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
        component: ProductListPage
      },
      {
        path: 'shopCart',
        name: 'ShopCart',
        component: ShopCartPage
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      }
    ]
  }
];

export default createRouter({ history, routes, base: '/vue-2022-winter-class/week_5/' });
