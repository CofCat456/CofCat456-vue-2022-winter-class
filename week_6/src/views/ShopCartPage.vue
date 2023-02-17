<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>購物車</h2>
        <div class="text-end mt-4">
          <button
            class="btn btn-outline-danger"
            :disabled="cartsExist"
            @click="openModal('deleteAll')"
          >
            清空購物車
          </button>
        </div>
        <table class="table align-middle mt-4 table-hover">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts">
              <tr v-for="cart in carts" :key="cart.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="openModal('delete', cart)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <div class="text-success" v-if="cart.coupon">已套用優惠券</div>
                </td>
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
                <td class="text-end">
                  <small v-if="final_total !== total" class="text-success">折扣價：</small>
                  {{ getPrice(cart.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ getPrice(total) }}</td>
            </tr>
            <tr v-if="final_total !== total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ getPrice(final_total) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-grid gap-2 mt-4 d-md-flex justify-content-md-between">
          <button
            class="btn btn-outline-info me-md-2"
            type="button"
            @click="routerToPage('ProductList')"
          >
            繼續購物
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            :disabled="cartsExist"
            @click="routerToPage()"
          >
            送出訂單
          </button>
        </div>
      </div>
    </div>
    <Loading ref="loading" />
    <ProductDeleteModal
      ref="productDeleteModal"
      :shopCart="true"
      :id="tempProduct.cart_id"
      :title="tempProduct.title"
      @delete="removeCartItem"
      @deleteAll="removeAllCart"
    />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ProductDeleteModal from '@/components/ProductDeleteModal.vue';
import Swal from 'sweetalert2';

import { currency } from '@/utlis/global.js';
import {
  getShopCartApi,
  updateShopCartApi,
  removeShopCartApi,
  removeAllShopCartApi
} from '@/utlis/api';

export default {
  components: {
    Loading,
    ProductDeleteModal
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
    openModal(type = 'delete', cart) {
      if (type === 'delete') {
        const { id, product } = cart;
        this.tempProduct = { ...product, cart_id: id };
        this.$refs.productDeleteModal.show();
      } else if (type === 'deleteAll') {
        this.tempProduct = { title: '全部購物車' };
        this.$refs.productDeleteModal.show();
      }
    },
    getPrice(price) {
      return currency(price, '$ ');
    },
    getShopCart() {
      getShopCartApi()
        .then((res) => {
          const {
            data: {
              data: { carts, total, final_total: finalTotal }
            }
          } = res;
          this.carts = carts;
          this.total = total;
          this.final_total = finalTotal;
          this.$refs.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$refs.loading.hide();
        });
    },
    updateCart(data) {
      this.$refs.loading.show();
      const { id, qty } = data;
      updateShopCartApi(id, {
        data: {
          product_id: id,
          qty
        }
      })
        .then((res) => {
          const {
            data: { message = ' ' }
          } = res;

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

          this.getShopCart();
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
            title: '更新失敗',
            text: message
          });
        });
    },
    removeCartItem(id) {
      this.$refs.loading.show();
      removeShopCartApi(id)
        .then(() => {
          this.$refs.loading.hide();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: '移除成功(･8･)！'
          });
          this.getShopCart();
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
            title: '移除失敗',
            text: message
          });
        });
    },
    removeAllCart() {
      this.$refs.loading.show();
      removeAllShopCartApi()
        .then(() => {
          this.$refs.loading.hide();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: 'success',
            title: '移除成功(′゜ω。‵)！'
          });
          this.getShopCart();
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
            title: '移除失敗',
            text: message
          });
        });
    },
    routerToPage(name = 'Checkout') {
      this.$router.push({ name });
    }
  },
  mounted() {
    this.getShopCart();
  }
};
</script>
