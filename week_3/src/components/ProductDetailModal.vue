<template>
  <div class="modal fade text-start" tabindex="-1" ref="modal">
    <div class="modal-xl modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <span class="badge ms-3 rounded-pill bg-info text-dark">{{ category }}</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-3">
              <img :src="getImageUrl" class="img-fluid" :alt="`${title} photo`" />
            </div>
            <div class="col-md-9 d-flex flex-column p-3 fs-5">
              <p><span class="fw-bold">商品描述</span> : {{ description }}</p>
              <p><span class="fw-bold">商品內容</span> : {{ content }}</p>
              <div class="d-flex justify-content-between mt-auto">
                <div class="d-flex gap-3">
                  <p class="mb-0 text-decoration-line-through">${{ origin_price }}</p>
                  <p>
                    <span class="text-danger">${{ price }}</span> / {{ unit }}
                  </p>
                </div>
                <p>剩餘 : {{ num }} {{ unit }}</p>
              </div>
              <div class="mb-3 border-bottom border-bottom-1"></div>
              <div class="d-flex gap-3">
                <img
                  :src="image"
                  style="width: 100px; height: 100px; cursor: pointer"
                  class="img-thumbnail"
                  v-for="image in imagesUrl"
                  :key="image"
                  @click="changeImage(image)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imagesUrl: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    origin_price: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      modal: {},
      curImage: ''
    };
  },
  computed: {
    getImageUrl() {
      return this.curImage === '' ? this.imageUrl : this.curImage;
    }
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    changeImage(image) {
      this.curImage = image;
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  }
};
</script>

<style></style>
