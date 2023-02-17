<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !has_pre }">
        <a class="page-link" href="#" @click.prevent="goPre">Previous</a>
      </li>
      <li class="page-item" v-for="page in total_pages" :key="page">
        <a
          class="page-link"
          :class="{ active: current_page === page }"
          href="#"
          @click.prevent="$emit('emitPages', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !has_next }">
        <a class="page-link" href="#" @click.prevent="goNext">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    current_page: {
      type: Number,
      default: 1
    },
    has_next: {
      type: Boolean,
      default: true
    },
    has_pre: {
      type: Boolean,
      default: true
    },
    total_pages: {
      type: Number,
      default: 1
    }
  },
  methods: {
    goPre() {
      if (!this.has_pre) return;
      this.$emit('emit-pages', this.current_page - 1);
    },
    goNext() {
      if (!this.has_next) return;
      this.$emit('emit-pages', this.current_page + 1);
    }
  }
};
</script>

<style></style>
