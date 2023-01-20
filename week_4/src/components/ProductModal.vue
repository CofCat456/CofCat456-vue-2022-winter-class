<template>
  <!-- Modal -->
  <div
    id="productModal"
    ref="modal"
    class="modal fade text-start"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ getTitle }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    id="imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model.lazy="tempImage"
                  />
                </div>
                <img v-if="tempImage" class="img-fluid" :src="tempImage" :alt="`${title} photo`" />
              </div>
              <div class="mb-3">
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  :disabled="!tempImage"
                  @click="addImage"
                >
                  新增圖片
                </button>
              </div>
              <div class="mb-5">
                <label for="formFile" class="form-label">或上傳圖片</label>
                <input class="form-control" type="file" id="formFile" @change="fileHandle" />
              </div>
              <div v-for="(image, index) in product.imagesUrl" :key="image" class="my-3">
                <input
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                  :value="product.imagesUrl[index]"
                />
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="deleteImage(index)"
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="product.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="product.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model.number="product.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="product.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="product.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="evaluate" class="form-label">商品評價星級</label>
                <input
                  id="evaluate"
                  type="range"
                  class="form-range"
                  min="1"
                  max="5"
                  step="1"
                  v-model="product.evaluate"
                />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="product.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="isEnabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="product.is_enabled"
                  />
                  <label class="form-check-label" for="isEnabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="confirmHandler">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixins';

import { uploadFileApi } from '@/utlis/api';

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
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
    },
    evaluate: {
      type: Number,
      default: 1
    },
    is_enabled: {
      type: Number,
      default: 0
    }
  },
  mixins: [ModalMixin],
  data() {
    return {
      modal: {},
      product: {},
      tempImage: ''
    };
  },
  computed: {
    getTitle() {
      return this.editMode ? '編輯產品' : '新增產品';
    }
  },
  methods: {
    initProduct() {
      this.product.id = this.id;
      this.product.title = this.title;
      this.product.imageUrl = this.imageUrl;
      this.product.imagesUrl = [...this.imagesUrl];
      this.product.description = this.description;
      this.product.category = this.category;
      this.product.content = this.content;
      this.product.origin_price = this.origin_price;
      this.product.price = this.price;
      this.product.unit = this.unit;
      this.product.num = this.num;
      this.product.evaluate = this.evaluate;
      this.product.is_enabled = this.is_enabled;
    },
    fileHandle(element) {
      const file = element.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      this.uploadFile(formData);
    },
    uploadFile(formData) {
      uploadFileApi(formData)
        .then((res) => {
          console.log(res);
          const {
            data: { imageUrl }
          } = res;

          this.product.imagesUrl.push(imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addImage() {
      this.product.imagesUrl.push(this.tempImage);
      this.tempImage = '';
    },
    deleteImage(index) {
      this.product.imagesUrl.splice(index, 1);
    },
    confirmHandler() {
      const { imagesUrl } = this.product;
      const [imageUrl] = imagesUrl;
      this.product.imageUrl = imageUrl;
      console.log(this.product);
      this.$emit(`${this.editMode ? 'edit' : 'add'}`, {
        data: this.product
      });
    },
    show() {
      this.modal.show();
      this.initProduct();
    }
  }
};
</script>

<style></style>
