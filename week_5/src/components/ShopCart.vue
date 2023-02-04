<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>購物車</h2>
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
              <tr v-for="item in carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group">
                      <input
                        v-model.number="item.qty"
                        @blur="updateCart(item)"
                        min="1"
                        type="number"
                        class="form-control"
                      />
                      <span class="input-group-text" id="basic-addon2">{{
                        item.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="final_total !== total" class="text-success">折扣價：</small>
                  {{ item.final_total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ total }}</td>
            </tr>
            <tr v-if="final_total !== total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from './Loading.vue';
import Swal from 'sweetalert2';

import { currency } from '@/utlis/global.js';
import {
  setDefaultAuth,
  checkLoginApi,
  getShopCartApi,
  removeShopCartApi,
  removeAllShopCartApi
} from '@/utlis/api';

export default {
  components: {
    Loading
  },
  data() {
    return {
      carts: [],
      total: 0,
      final_total: 0
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
          this.getShopCart();
        })
        .catch(() => {
          this.$router.push({ name: 'Login' });
          this.$refs.loading.hide();
        });
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
