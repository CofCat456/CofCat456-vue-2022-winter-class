import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import ProductListPage from '@/views/ProductListPage.vue';
import Checkout from '@/views/CheckoutPage.vue';
import ShopCartPage from '@/views/ShopCartPage.vue';
import Order from '@/views/OrderPage.vue';

const path = process.env.NODE_ENV === 'production' ? '/vue-2022-winter-class/week_5/' : '';
const history = createWebHashHistory(path);
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
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      }
    ]
  }
];

export default createRouter({ history, routes, base: '/vue-2022-winter-class/week_5/' });
