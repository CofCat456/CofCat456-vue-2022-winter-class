<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link">Previous</a>
      </li>
      <li class="page-item" v-for="page in pages" :key="page">
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      modal: {}
    };
  },
  methods: {}
};
</script>

<style></style>
