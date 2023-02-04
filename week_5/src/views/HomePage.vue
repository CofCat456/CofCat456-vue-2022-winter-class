<template>
  <HeaderBasic />
  <RouterView />
</template>

<script>
import HeaderBasic from '../components/HeaderBasic.vue';

export default {
  components: {
    HeaderBasic
  }
};
</script>
