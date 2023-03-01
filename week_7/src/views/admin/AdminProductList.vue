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
                <span
                  class="badge rounded-pill px-2 text-dark"
                  :class="getBadgeColor(product.category)"
                  >{{ product.category }}</span
                >
              </td>
              <td>
                {{ getPrice(product.origin_price) }}
              </td>
              <td>
                {{ getPrice(product.price) }}
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
              <ProductModal
                editMode
                :ref="`productModal-${product.id}`"
                v-bind="product"
                @edit="updateProduct"
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
import ProductModal from '@/components/ProductModal.vue';
import ProudctDeleteModal from '@/components/ProductDeleteModal.vue';
import Pagination from '@/components/PaginationBasic.vue';
import Loading from '@/components/Loading.vue';

import { currency, categoryMap, errorMsg, successMsg } from '@/utlis/global';
import {
  getAdminProductsApi,
  addAdminProductApi,
  updateAdminProductApi,
  deleteAdminProductApi
} from '@/utlis/api';

export default {
  components: {
    ProductModal,
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
    getBadgeColor(category) {
      return `text-bg-${categoryMap.get(category) || 'secondary'}`;
    },
    getPrice(price) {
      return currency(price, '$ ');
    },
    openModal(type, product) {
      if (type === 'new') {
        this.$refs.productModal.show();
      } else if (type === 'edit') {
        const { id } = product;
        this.$refs[`productModal-${id}`][0].show();
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
            data: { products, pagination }
          } = res;

          if (products === null) {
            this.products = [];
            return;
          }

          this.products = Object.values(products);
          this.pagination = pagination;
        })
        .catch(() => {
          this.$refs.loading.hide();
        });
    },
    addProduct(product) {
      this.$refs.loading.show();

      addAdminProductApi(product)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.productModal.hide();

          const {
            data: { message = ' ' }
          } = res;

          successMsg(message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const {
            response: {
              data: { message = [] }
            }
          } = err;

          errorMsg('新增失敗', message);
        });
    },
    updateEnabled(product) {
      this.$refs.loading.show();

      const { id } = product;

      updateAdminProductApi(id, { data: product })
        .then(() => {
          this.$refs.loading.hide();

          successMsg('更新啟用狀態成功(つ´ω`)つ');

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const {
            response: {
              data: { message }
            }
          } = err;

          errorMsg('更新啟用狀態失敗', message);
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
          this.$refs[`productModal-${id}`][0].hide();

          const {
            data: { message = ' ' }
          } = res;

          successMsg(message);

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const {
            response: {
              data: { message }
            }
          } = err;

          errorMsg('更新失敗', message);
        });
    },
    deleteProduct(id) {
      this.$refs.loading.show();

      deleteAdminProductApi(id)
        .then(() => {
          this.$refs.loading.hide();

          successMsg('刪除成功(*’ｰ’*)！');

          this.getProduct();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const {
            response: {
              data: { message }
            }
          } = err;

          errorMsg('刪除失敗', message);
        });
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
