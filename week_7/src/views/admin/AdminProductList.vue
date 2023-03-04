<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>產品列表</h2>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new')">建立新的產品</button>
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
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="product.id"
              :class="{ 'text-secondary': !product.is_enabled }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ product.title }}</td>
              <td>
                <span class="badge rounded-pill px-2" :class="getBadgeColor(product.category)">{{
                  product.category
                }}</span>
              </td>
              <td>
                {{ $filters.currency(product.origin_price, 'NT ') }}
              </td>
              <td>
                {{ $filters.currency(product.price, 'NT ') }}
              </td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`paidSwitch${product.id}`"
                    :true-value="1"
                    :false-value="0"
                    v-model="product.is_enabled"
                    @change="updateEnabled(product)"
                  />
                  <label class="form-check-label" :for="`paidSwitch${product.id}`">
                    <span v-if="product.is_enabled">已啟用</span>
                    <span v-else>未啟用</span>
                  </label>
                </div>
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
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pagination" @emit-pages="getProduct" />
      </div>
    </div>
    <ProductModal
      ref="productModal"
      :isNew="isNew"
      :product="tempProduct"
      @add-product="addProduct"
      @update-product="updateProduct"
    />
    <DeleteModal
      ref="productDeleteModal"
      :id="tempProduct.id"
      :title="tempProduct.title"
      @delete="delProduct"
      >產品</DeleteModal
    >
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/PaginationBasic.vue';
import ProductModal from '@/components/Modal/ProductModal.vue';
import DeleteModal from '@/components/Modal/DeleteModal.vue';

import { categoryMap, errorMsg, responseMsg } from '@/utlis/global';
import {
  getAdminProductsApi,
  addAdminProductApi,
  updateAdminProductApi,
  deleteAdminProductApi
} from '@/utlis/api';

export default {
  components: {
    Loading,
    Pagination,
    ProductModal,
    DeleteModal
  },
  data() {
    return {
      isNew: false,
      products: [],
      tempProduct: {},
      pagination: {}
    };
  },
  methods: {
    getBadgeColor(category) {
      return `text-bg-${categoryMap.get(category) || 'secondary'}`;
    },
    openModal(type, product) {
      if (type === 'new') {
        this.isNew = true;
        this.tempProduct = {};
        this.$refs.productModal.show();
      } else if (type === 'edit') {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.productModal.show();
      } else if (type === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.productDeleteModal.show();
      }
    },
    getProduct(page = 1) {
      getAdminProductsApi(page)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, products, pagination }
          } = res;

          if (products === null) {
            this.products = [];
            return;
          }

          if (success) {
            this.products = Object.values(products);
            this.pagination = pagination;
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    addProduct(product) {
      this.$refs.loading.show();

      addAdminProductApi(product)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.productModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    updateEnabled(product) {
      this.$refs.loading.show();

      const { id } = product;

      updateAdminProductApi(id, { data: product })
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    updateProduct(product) {
      this.$refs.loading.show();

      const {
        data: { id }
      } = product;

      updateAdminProductApi(id, product)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.productModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    delProduct(id) {
      this.$refs.loading.show();

      deleteAdminProductApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, message }
          } = res;

          responseMsg(success, message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
