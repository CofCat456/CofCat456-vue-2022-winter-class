<template>
  <RouterView />
</template>

<script>
import ProductList from './components/ProductList.vue';
import Login from './components/Login.vue';

export default {
  components: {
    ProductList,
    Login,
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
</style>
