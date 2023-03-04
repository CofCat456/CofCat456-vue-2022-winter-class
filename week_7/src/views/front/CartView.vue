<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2 class="text-center fw-bold">購物車</h2>
        <p>
          總共有<span class="fw-bold mx-1">{{ carts.length }}</span
          >件商品
        </p>
        <table class="table align-middle mt-4 table-hover">
          <thead>
            <tr class="text-center">
              <th width="200">商品圖片</th>
              <th width="250">商品名稱</th>
              <th>單位</th>
              <th style="width: 150px">數量/單位</th>
              <th>售價</th>
              <th>小計</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts">
              <tr v-for="cart in carts" :key="cart.id" class="text-center">
                <td>
                  <div class="ratio ratio-16x9">
                    <img
                      :src="cart.product.imageUrl"
                      class="img-fluid object-fit-cover rounded"
                      :alt="cart.product.title"
                    />
                  </div>
                </td>
                <td>
                  {{ cart.product.title }}
                </td>
                <td>1 / {{ cart.product.unit }}</td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group">
                      <input
                        v-model.number="cart.qty"
                        @blur="updateCart(cart)"
                        min="1"
                        type="number"
                        class="form-control"
                      />
                      <span class="input-group-text" id="basic-addon2">{{
                        cart.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  {{ $filters.currency(cart.total, 'NT ') }}
                </td>
                <td>{{ $filters.currency(cart.final_total, 'NT ') }}</td>
                <td>
                  <button type="button" class="btn" @click="openModal('delete', cart)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(total, 'NT ') }}</td>
            </tr>
            <tr v-if="final_total !== total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(final_total, 'NT ') }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-grid gap-2 mt-4 d-md-flex justify-content-md-between">
          <RouterLink class="btn btn-outline-info" :to="{ name: 'ProductList' }">
            繼續購物
          </RouterLink>
          <button
            class="btn btn-outline-danger"
            :disabled="cartsExist"
            @click="openModal('deleteAll')"
          >
            清空購物車
          </button>
          <RouterLink
            class="btn btn-outline-success"
            :class="{ disabled: carts.length === 0 }"
            :to="{ name: 'Checkout' }"
            >送出訂單</RouterLink
          >
        </div>
      </div>
    </div>
    <Loading ref="loading" />
    <DeleteModal
      ref="productDeleteModal"
      :id="tempProduct.cart_id"
      :title="tempProduct.title"
      @delete="removeCartItem"
      @deleteAll="removeAllCart"
    >
      購物車
    </DeleteModal>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import DeleteModal from '@/components/DeleteModal.vue';

import { successMsg, errorMsg } from '@/utlis/global';
import { getCartApi, updateCartApi, removeCartApi, removeAllCartApi } from '@/utlis/api';

export default {
  components: {
    Loading,
    DeleteModal
  },
  data() {
    return {
      tempProduct: {},
      carts: [],
      total: 0,
      final_total: 0
    };
  },
  computed: {
    cartsExist() {
      return this.carts && this.carts.length === 0;
    }
  },
  methods: {
    openModal(type, cart) {
      if (type === 'delete') {
        const { id, product } = cart;
        this.tempProduct = { ...product, cart_id: id };
        this.$refs.productDeleteModal.show();
      } else if (type === 'deleteAll') {
        this.tempProduct = { title: '全部購物車' };
        this.$refs.productDeleteModal.show();
      }
    },
    getCarts() {
      this.$refs.loading.show();

      getCartApi()
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: {
              data: { carts, total, final_total: finalTotal }
            }
          } = res;

          this.carts = carts;
          this.total = total;
          this.final_total = finalTotal;
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('獲取購物車失敗', response);
        });
    },
    updateCart(data) {
      this.$refs.loading.show();

      const { id, qty } = data;

      updateCartApi(id, {
        data: {
          product_id: id,
          qty
        }
      })
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { message = ' ' }
          } = res;

          successMsg(message);

          this.getCarts();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('更新失敗', response);
        });
    },
    removeCartItem(id) {
      this.$refs.loading.show();

      removeCartApi(id)
        .then(() => {
          this.$refs.loading.hide();

          successMsg('移除成功(･8･)！');

          this.getCarts();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('移除失敗', response);
        });
    },
    removeAllCart() {
      this.$refs.loading.show();

      removeAllCartApi()
        .then(() => {
          this.$refs.loading.hide();

          successMsg('移除成功(′゜ω。‵)！');

          this.getCarts();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('移除失敗', response);
        });
    }
  },
  mounted() {
    this.getCarts();
  }
};
</script>
