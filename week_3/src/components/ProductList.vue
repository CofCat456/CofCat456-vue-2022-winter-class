<template>
  <div class="container-fruid">
    <div class="row justify-content-center py-5">
      <div class="col-md-8">
        <h2>產品列表</h2>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openAddModel">建立新的產品</button>
        </div>
        <table class="table table-hover mt-4 align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
              <th scope="col">查看細節</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="product.id">
              <td>{{ index + 1 }}</td>
              <td>{{ product.title }}</td>
              <td>
                {{ getOriginPrice(product.origin_price) }}
              </td>
              <td>
                {{ getPrice(product.price) }}
              </td>
              <td>
                <span
                  :class="[
                    'badge rounded-pill px-3 py-1',
                    `bg-${product.is_enabled ? 'success' : 'secondary'}`
                  ]"
                  >{{ product.is_enabled ? '啟用' : '未啟用' }}</span
                >
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openEditModel(product.id)">
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openDeleteModel(product.id)"
                  >
                    刪除
                  </button>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-primary" @click="watchDetail(product.id)">
                  查看細節
                </button>
              </td>
              <ProductModal
                editMode
                :ref="`productModal-${product.id}`"
                v-bind="product"
                @edit="editProduct"
              />
              <ProudctDeleteModal
                :ref="`productDeleteModal-${product.id}`"
                :id="product.id"
                :title="product.title"
                @delete="deleteProduct"
              />
              <ProductDetailModal :ref="`productDetailModal-${product.id}`" v-bind="product" />
            </tr>
          </tbody>
        </table>
        <p>
          目前有 <span class="text-info">{{ products.length }}</span> 項產品
        </p>
      </div>
    </div>
    <button type="button" class="btn btn-outline-secondary logoutBtn" @click="logout">登出</button>
    <ProductModal ref="newProductModal" @add="addProduct" />
  </div>
</template>

<script>
import ProductModal from './ProductModal.vue';
import ProductDetailModal from './ProductDetailModal.vue';
import ProudctDeleteModal from './ProductDeleteModal.vue';
import Swal from 'sweetalert2';
import { currency } from '../global';

import {
  setDefaultAuth,
  getProductApi,
  checkLoginApi,
  logoutApi,
  addProductApi,
  editProductApi,
  deleteProductApi
} from '../api';

export default {
  components: {
    ProductModal,
    ProductDetailModal,
    ProudctDeleteModal
  },
  data() {
    return {
      products: []
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
    getOriginPrice(originPrice) {
      return currency(originPrice, '$ ');
    },
    getPrice(price) {
      return currency(price, '$ ');
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
    openAddModel() {
      this.$refs.newProductModal.showModal();
    },
    openEditModel(id) {
      this.$refs[`productModal-${id}`][0].showModal();
    },
    openDeleteModel(id) {
      this.$refs[`productDeleteModal-${id}`][0].showModal();
    },
    watchDetail(id) {
      this.$refs[`productDetailModal-${id}`][0].showModal();
    },
    addProduct(product) {
      addProductApi(product)
        .then((res) => {
          const {
            data: { message = ' ' }
          } = res;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: message
          });
          this.$refs.newProductModal.hideModal();
          this.getProduct();
        })
        .catch((err) => {
          const {
            response: {
              data: { message = [] }
            }
          } = err;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'error',
            title: '新增失敗',
            text: message
          });
        });
    },
    editProduct(product) {
      const {
        data: { id }
      } = product;
      editProductApi(id, product)
        .then((res) => {
          const {
            data: { message = ' ' }
          } = res;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: message
          });
          this.$refs[`productModal-${id}`][0].hideModal();
          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
          const {
            response: {
              data: { message }
            }
          } = err;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'error',
            title: '編輯失敗',
            text: message
          });
        });
    },
    deleteProduct(id) {
      deleteProductApi(id)
        .then(() => {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: '刪除成功(*’ｰ’*)！'
          });
          this.getProduct();
        })
        .catch((err) => {
          const {
            response: {
              data: { message }
            }
          } = err;
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'error',
            title: '刪除失敗',
            text: message
          });
        });
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
