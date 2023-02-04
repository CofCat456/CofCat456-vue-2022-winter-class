<template>
  <Loading
    v-model:active="isLoading"
    loader="dots"
    :width="128"
    :height="128"
    color="#38bdf8"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    show() {
      this.isLoading = true;
    },
    hide() {
      this.isLoading = false;
    }
  }
};
</script>
