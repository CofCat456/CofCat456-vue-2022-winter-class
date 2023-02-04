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
              <p><span class="fw-bold">商品描述 : </span>{{ description }}</p>
              <p><span class="fw-bold">商品內容 : </span>{{ content }}</p>
              <div>
                <span class="fw-bold">商品星級 : </span>
                <div class="d-inline-flex align-items-center gap-1 text-info">
                  <i v-for="num in Math.floor(evaluate)" :key="num" class="bi bi-star-fill"></i>
                  <i v-if="evaluate % 1" class="bi bi-star-half"></i>
                  <i v-for="num in 5 - Math.ceil(evaluate)" :key="num" class="bi bi-star"></i>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-auto">
                <div class="d-flex gap-3">
                  <p class="mb-0 text-decoration-line-through">{{ getOriginPrice }}</p>
                  <p>
                    <span class="text-danger">{{ getPrice }}</span> / {{ unit }}
                  </p>
                </div>
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
import ModalMixin from '@/mixins/ModalMixins';
import { currency } from '@/utlis/global.js';

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
    evaluate: {
      type: Number,
      default: 1
    },
    unit: {
      type: String,
      default: ''
    }
  },
  mixins: [ModalMixin],
  data() {
    return {
      modal: {},
      curImage: ''
    };
  },
  computed: {
    getOriginPrice() {
      return currency(this.origin_price, '$');
    },
    getPrice() {
      return currency(this.price, '$');
    },
    getImageUrl() {
      return this.curImage === '' ? this.imageUrl : this.curImage;
    }
  },
  methods: {
    changeImage(image) {
      this.curImage = image;
    }
  }
};
</script>

<style></style>
