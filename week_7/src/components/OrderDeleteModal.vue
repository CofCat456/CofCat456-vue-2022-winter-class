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
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ title }}</strong> 的訂單(刪除後將無法恢復)。
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
import ModalMixin from '@/mixins/modalMixin';

export default {
  props: {
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
      if (this.id) {
        this.$emit('delete-order', this.id);
      } else {
        this.$emit('delete-all-order');
      }
      this.hide();
    }
  }
};
</script>
