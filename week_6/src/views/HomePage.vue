<template>
  <HeaderBasic @logout="logout" />
  <RouterView />
  <Loading ref="loading" />
</template>

<script>
import axios from 'axios';
import HeaderBasic from '../components/HeaderBasic.vue';
import Swal from 'sweetalert2';

import { checkLoginApi, logoutApi } from '@/utlis/api';
import Loading from '../components/Loading.vue';

export default {
  components: {
    HeaderBasic,
    Loading
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
          this.$router.push({ name: 'ProductList' });
        })
        .catch(() => {
          this.$refs.loading.hide();
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
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    if (!token) {
      this.expiredToken();
      return;
    }

    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  }
};
</script>
