<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>產品列表</h2>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal()">建立新的產品</button>
        </div>
        <table class="table table-hover mt-4 align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">產品名稱</th>
              <th scope="col">分類</th>
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
                <span class="badge rounded-pill px-2 bg-info text-dark">{{
                  product.category
                }}</span>
              </td>
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
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', product)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', product)"
                  >
                    刪除
                  </button>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-primary" @click="openModal('detail', product)">
                  查看細節
                </button>
              </td>
              <ProductModal
                editMode
                :ref="`productModal-${product.id}`"
                v-bind="product"
                @edit="editProduct"
              />
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pagination" @emit-pages="getProduct" />
        <p>
          目前有 <span class="text-info">{{ products.length }}</span> 項產品
        </p>
      </div>
    </div>
    <ProductDetailModal ref="productDetailModal" v-bind="tempProduct" />
    <ProudctDeleteModal
      ref="productDeleteModal"
      :id="tempProduct.id"
      :title="tempProduct.title"
      @delete="deleteProduct"
    />
  </div>
  <ProductModal ref="productModal" @add="addProduct" />
  <Loading ref="loading" />
</template>

<script>
import ProductModal from './ProductModal.vue';
import ProductDetailModal from './ProductDetailModal.vue';
import ProudctDeleteModal from './ProductDeleteModal.vue';
import Pagination from './PaginationBasic.vue';
import Loading from './Loading.vue';
import Swal from 'sweetalert2';

import { currency } from '@/utlis/global.js';
import {
  setDefaultAuth,
  getProductApi,
  checkLoginApi,
  addProductApi,
  editProductApi,
  deleteProductApi
} from '@/utlis/api';

export default {
  components: {
    ProductModal,
    ProductDetailModal,
    ProudctDeleteModal,
    Pagination,
    Loading
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {}
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
      this.$refs.loading.show();
      checkLoginApi()
        .then(() => {
          this.getProduct();
        })
        .catch(() => {
          this.$router.push({ name: 'Login' });
          this.$refs.loading.hide();
        });
    },
    getOriginPrice(originPrice) {
      return currency(originPrice, '$ ');
    },
    getPrice(price) {
      return currency(price, '$ ');
    },
    getProduct(page = 1) {
      getProductApi(page)
        .then((res) => {
          const {
            data: { products, pagination }
          } = res;

          if (products === null) {
            this.products = [];
            return;
          }

          this.products = Object.values(products);
          this.pagination = pagination;

          this.$refs.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$refs.loading.hide();
        });
    },
    openModal(type = 'new', product) {
      if (type === 'new') {
        this.$refs.productModal.show();
      } else if (type === 'edit') {
        const { id } = product;
        this.$refs[`productModal-${id}`][0].show();
      } else if (type === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.productDeleteModal.show();
      } else if (type === 'detail') {
        this.tempProduct = { ...product };
        this.$refs.productDetailModal.show();
      }
    },
    addProduct(product) {
      this.$refs.loading.show();
      addProductApi(product)
        .then((res) => {
          const {
            data: { message = ' ' }
          } = res;
          this.$refs.productModal.hide();
          this.$refs.loading.hide();

          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: message
          });

          this.getProduct();
        })
        .catch((err) => {
          const {
            response: {
              data: { message = [] }
            }
          } = err;
          this.$refs.loading.hide();

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
      this.$refs.loading.show();
      const {
        data: { id }
      } = product;
      editProductApi(id, product)
        .then((res) => {
          const {
            data: { message = ' ' }
          } = res;
          this.$refs[`productModal-${id}`][0].hide();
          this.$refs.loading.hide();

          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: message
          });

          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
          const {
            response: {
              data: { message }
            }
          } = err;
          this.$refs.loading.hide();

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
      this.$refs.loading.show();
      deleteProductApi(id)
        .then(() => {
          this.$refs.loading.hide();
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
          this.$refs.loading.hide();
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
