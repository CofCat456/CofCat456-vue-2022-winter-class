<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade text-start"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span v-if="shopCart">移出購物車</span>
            <span v-else>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="shopCart" class="modal-body">
          是否移除
          <strong class="text-danger">{{ title }}</strong> 產品(移除後需至產品頁面重新加入)。
        </div>
        <div v-else class="modal-body">
          是否刪除
          <strong class="text-danger">{{ title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteHandler">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixins';

export default {
  props: {
    shopCart: {
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
    }
  },
  mixins: [ModalMixin],
  data() {
    return {
      modal: {}
    };
  },
  methods: {
    deleteHandler() {
      if (this.id.length === 0) {
        this.$emit('deleteAll');
      } else {
        this.$emit('delete', this.id);
      }
      this.hide();
    }
  }
};
</script>

<style></style>
