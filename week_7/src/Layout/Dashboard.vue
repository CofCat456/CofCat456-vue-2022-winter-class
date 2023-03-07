<template>
  <HeaderBasic :headerList="getHeaderList" :logout="logout" />
  <RouterView />
</template>

<script>
import HeaderBasic from '@/components/HeaderBasic.vue';

import { checkLoginApi, logoutApi } from '@/utlis/api';
import { errorMsg, successMsg } from '@/utlis/global';

export default {
  components: {
    HeaderBasic
  },
  computed: {
    getHeaderList() {
      return [
        {
          title: '第七週主線任務'
        },
        {
          title: '產品管理',
          pathName: 'AdminProductList'
        },
        {
          title: '訂單管理',
          pathName: 'AdminOrders'
        },
        {
          title: '優惠卷管理',
          pathName: 'AdminCoupons'
        },
        {
          title: '文章管理',
          pathName: 'AdminArticles'
        }
      ];
    }
  },
  methods: {
    logout() {
      logoutApi().then(() => {
        successMsg('登出成功 ฅ●ω●ฅ');

        this.$router.push({ name: 'Login' });
      });
    },
    checkLogin() {
      checkLoginApi()
        .then((res) => {
          const {
            data: { success }
          } = res;

          if (!success) {
            this.$router.push({ name: 'Login' });
          }
        })
        .catch((err) => {
          const { response } = err;

          errorMsg(response);

          this.$router.push({ name: 'Login' });
        });
    }
  },
  mounted() {
    this.checkLogin();
  }
};
</script>
