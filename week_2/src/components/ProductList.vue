<template>
  <div class="container-fruid">
    <div class="row justify-content-center py-5">
      <div class="col-md-8">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4 align-middle text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">查看細節</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <td>{{ index + 1 }}</td>
              <td>{{ product.title }}</td>
              <td>
                {{ product.origin_price }}
              </td>
              <td>
                {{ product.price }}
              </td>
              <td>
                <span :class="`text-${product.is_enabled ? 'success' : 'muted'}`">{{
                  product.is_enabled ? '啟用' : '未啟用'
                }}</span>
              </td>
              <td>
                <button type="button" class="btn btn-primary" @click="watchProductDetail(product)">
                  查看細節
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          目前有 <span>{{ products.length }}</span> 項產品
        </p>
      </div>
    </div>
    <button type="button" class="btn btn-outline-secondary logoutBtn" @click="logout">登出</button>
    <ProductModal ref="productModal" v-bind="tempProduct" />
  </div>
</template>

<script>
import ProductModal from './ProductModal.vue';
import Swal from 'sweetalert2';

import { setDefaultAuth, getProductApi, checkLoginApi, logoutApi } from '../api';

export default {
  components: {
    ProductModal
  },
  data() {
    return {
      products: [],
      tempProduct: {}
    };
  },
  methods: {
    expiredToken() {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'error',
        title: 'token 已過期 (′゜ω。‵)'
      });
      this.$router.push({ name: 'Login' });
    },
    checkLogin() {
      checkLoginApi()
        .then(() => {
          this.getProduct();
        })
        .catch(() => {
          this.$router.push({ name: 'Login' });
        });
    },
    logout() {
      logoutApi().then(() => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: 'success',
          title: '登出成功 ฅ●ω●ฅ'
        });
        this.$router.push({ name: 'Login' });
      });
    },
    getProduct() {
      getProductApi()
        .then((res) => {
          const {
            data: { products }
          } = res;
          this.products = Object.values(products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    watchProductDetail(item) {
      this.tempProduct = item;
      this.$refs.productModal.showModal();
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    if (!token) {
      this.expiredToken();
      return;
    }

    setDefaultAuth(token);
    this.checkLogin();
  }
};
</script>

<style>
.logoutBtn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
