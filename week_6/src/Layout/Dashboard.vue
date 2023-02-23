<template>
  <HeaderBasic :headerList="getHeaderList" :logout="logout" />
  <RouterView />
  <Loading ref="loading" />
</template>

<script>
import HeaderBasic from '@/components/HeaderBasic.vue';
import Loading from '@/components/Loading.vue';
import Swal from 'sweetalert2';

import axios from 'axios';

import { checkLoginApi, logoutApi } from '@/utlis/api';
import { token } from '@/utlis/global';

export default {
  components: {
    HeaderBasic,
    Loading
  },
  computed: {
    getHeaderList() {
      return [
        {
          title: '第六週主線任務',
          pathName: 'AdminHome'
        },
        {
          title: '產品管理',
          pathName: 'AdminProductList'
        },
        {
          title: '訂單管理',
          pathName: 'AdminOrders'
        }
      ];
    }
  },
  methods: {
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
      axios.defaults.headers.common.Authorization = `${token}`;

      checkLoginApi()
        .then((res) => {
          const {
            data: { success }
          } = res;

          this.$refs.loading.hide();

          if (!success) {
            this.$router.push({ name: 'Login' });
          }
        })
        .catch(() => {
          this.$refs.loading.hide();
          this.$router.push({ name: 'Login' });
        });
    }
  },
  mounted() {
    if (!token) {
      this.expiredToken();
      return;
    }

    this.checkLogin();
  }
};
</script>
