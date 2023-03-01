<template>
  <nav>
    <div class="nav nav-tabs mb-3 d-flex" id="nav-tab" role="tablist">
      <button
        class="nav-link w-25 active"
        id="nav-images-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-images"
        type="button"
        role="tab"
        aria-controls="nav-images"
        aria-selected="true"
      >
        產品照片
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-images"
      role="tabpanel"
      aria-labelledby="nav-images-tab"
      tabindex="0"
    >
      <div v-for="image in imagesUrl" :key="image" class="ratio ratio-4x3 mb-4">
        <img :src="image" class="img-fluid object-fit-cover" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagesUrl: {
      type: Array,
      default: () => []
    }
  }
};
</script>
