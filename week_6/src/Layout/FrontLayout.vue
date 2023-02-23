<template>
  <HeaderBasic :headerList="getHeaderList" />
  <RouterView />
</template>

<script>
import HeaderBasic from '@/components/HeaderBasic.vue';

export default {
  components: {
    HeaderBasic
  },
  computed: {
    getHeaderList() {
      return [
        {
          title: '第六週主線任務',
          pathName: 'Home'
        },
        {
          title: '產品列表',
          pathName: 'ProductList'
        },
        {
          title: '購物車',
          pathName: 'Cart'
        },
        {
          title: '登入後台',
          pathName: 'Login'
        }
      ];
    }
  }
};
</script>
