<template>
  <div class="list-group">
    <button
      v-for="category in getCategoryList"
      :key="category"
      type="button"
      class="list-group-item list-group-item-action"
      :class="{ active: currentCategory === category }"
      @click="goCategory(category)"
    >
      {{ category }}
    </button>
  </div>
</template>
<script>
import { categoryMap } from '../utlis/context';

export default {
  props: {
    currentCategory: {
      type: String,
      default: '全部'
    }
  },
  methods: {
    goCategory(category) {
      this.$emit('updateCategory', category);
    }
  },
  computed: {
    getCategoryList() {
      return ['全部', ...categoryMap.keys()];
    }
  }
};
</script>
