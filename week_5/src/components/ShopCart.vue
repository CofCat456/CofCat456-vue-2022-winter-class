<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>購物車</h2>
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal()">建立新的產品</button>
        </div>
        <!-- <table class="table align-middle"> -->
        <!--   <thead> -->
        <!--     <tr> -->
        <!--       <th></th> -->
        <!--       <th>品名</th> -->
        <!--       <th style="width: 150px">數量/單位</th> -->
        <!--       <th>單價</th> -->
        <!--     </tr> -->
        <!--   </thead> -->
        <!--   <tbody> -->
        <!--     <template v-if="cart.carts"> -->
        <!--       <tr v-for="item in cart.carts" :key="item.id"> -->
        <!--         <td> -->
        <!--           <button -->
        <!--             type="button" -->
        <!--             class="btn btn-outline-danger btn-sm" -->
        <!--             @click="removeCartItem(item.id)" -->
        <!--             :disabled="loadingStatus.loadingItem === item.id" -->
        <!--           > -->
        <!--             <i -->
        <!--               class="fas fa-spinner fa-pulse" -->
        <!--               v-if="loadingStatus.loadingItem === item.id" -->
        <!--             ></i> -->
        <!--             x -->
        <!--           </button> -->
        <!--         </td> -->
        <!--         <td> -->
        <!--           {{ item.product.title }} -->
        <!--           <div class="text-success" v-if="item.coupon">已套用優惠券</div> -->
        <!--         </td> -->
        <!--         <td> -->
        <!--           <div class="input-group input-group-sm"> -->
        <!--             <div class="input-group mb-3"> -->
        <!--               <input -->
        <!--                 v-model.number="item.qty" -->
        <!--                 @blur="updateCart(item)" -->
        <!--                 :disabled="loadingStatus.loadingItem === item.id" -->
        <!--                 min="1" -->
        <!--                 type="number" -->
        <!--                 class="form-control" -->
        <!--               /> -->
        <!--               <span class="input-group-text" id="basic-addon2">{{ -->
        <!--                 item.product.unit -->
        <!--               }}</span> -->
        <!--             </div> -->
        <!--           </div> -->
        <!--         </td> -->
        <!--         <td class="text-end"> -->
        <!--           <small v-if="cart.final_total !== cart.total" class="text-success" -->
        <!--             >折扣價：</small -->
        <!--           > -->
        <!--           {{ item.final_total }} -->
        <!--         </td> -->
        <!--       </tr> -->
        <!--     </template> -->
        <!--   </tbody> -->
        <!--   <tfoot> -->
        <!--     <tr> -->
        <!--       <td colspan="3" class="text-end">總計</td> -->
        <!--       <td class="text-end">{{ cart.total }}</td> -->
        <!--     </tr> -->
        <!--     <tr v-if="cart.final_total !== cart.total"> -->
        <!--       <td colspan="3" class="text-end text-success">折扣價</td> -->
        <!--       <td class="text-end text-success">{{ cart.final_total }}</td> -->
        <!--     </tr> -->
        <!--   </tfoot> -->
        <!-- </table> -->
        <p>
          <!-- 目前有 <span class="text-info">{{ products.length }}</span> 項產品 -->
        </p>
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from './Loading.vue';
import Swal from 'sweetalert2';

import { currency } from '@/utlis/global.js';
import { setDefaultAuth, checkLoginApi, getShopCartUrl } from '@/utlis/api';

export default {
  components: {
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
          this.$refs.loading.hide();
        })
        .catch(() => {
          this.$router.push({ name: 'Login' });
          this.$refs.loading.hide();
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
