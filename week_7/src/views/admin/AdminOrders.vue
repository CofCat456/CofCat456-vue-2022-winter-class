<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>訂單</h2>
        <table class="table mt-4 table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">購買款項</th>
              <th scope="col">顧客姓名</th>
              <th scope="col">應付金額</th>
              <th scope="col">狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="orders">
              <tr
                v-for="(order, index) in orders"
                :key="order.id"
                :class="{ 'text-secondary': !order.is_paid }"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in order.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td>{{ order?.user?.name }}</td>
                <td>{{ order?.total }}</td>
                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`paidSwitch${order.id}`"
                      v-model="order.is_paid"
                      @change="updatePaid(order)"
                    />
                    <label class="form-check-label" :for="`paidSwitch${order.id}`">
                      <span v-if="order.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="openModal('detail', order)"
                    >
                      查看
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      @click="openModal('delete', order)"
                    >
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="text-end mt-4">
          <button class="btn btn-danger" @click="openModal('deleteAll')">刪除所有訂單</button>
        </div>
        <Pagination v-bind="pagination" @emit-pages="getOrders" />
      </div>
    </div>
    <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid"></OrderModal>
    <DeleteModal
      ref="orderDeleteModal"
      :id="tempOrder.id"
      :title="tempOrder?.user?.name"
      @delete="delOrder"
      @deleteAll="delAllOrder"
      >訂單</DeleteModal
    >
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/PaginationBasic.vue';
import OrderModal from '@/components/OrderModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

import {
  getAdminOrdersApi,
  updateAdminOrderApi,
  deleteAdminOrderApi,
  deleteAllAdminOrderApi
} from '@/utlis/api';
import { errorMsg, successMsg } from '@/utlis/global';

export default {
  components: {
    Loading,
    Pagination,
    DeleteModal,
    OrderModal
  },
  data() {
    return {
      tempOrder: {},
      orders: [],
      pagination: {}
    };
  },
  methods: {
    openModal(type, order) {
      if (type === 'delete') {
        this.tempOrder = { ...order };
        this.$refs.orderDeleteModal.show();
      } else if (type === 'detail') {
        this.tempOrder = { ...order };
        this.$refs.orderModal.show();
      } else if (type === 'deleteAll') {
        this.tempOrder = {
          user: {
            name: '所有訂單'
          }
        };
        this.$refs.orderDeleteModal.show();
      }
    },
    getOrders(page = 1) {
      this.$refs.loading.show();

      getAdminOrdersApi(page)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { orders, pagination }
          } = res;

          this.orders = orders;
          this.pagination = pagination;
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('獲取訂單列表失敗', response);
        });
    },
    updatePaid(order) {
      this.$refs.loading.show();

      const { id } = order;

      const paid = {
        is_paid: order.is_paid
      };

      updateAdminOrderApi(id, { data: paid })
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { message }
          } = res;

          successMsg(message);
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('更新訂單資訊失敗', response);
        });
    },
    delOrder(id) {
      this.$refs.loading.show();

      deleteAdminOrderApi(id)
        .then(() => {
          this.$refs.loading.hide();

          successMsg('刪除訂單成功(*’ｰ’*)！');

          this.getOrders();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('刪除訂單失敗', response);
        });
    },
    delAllOrder() {
      deleteAllAdminOrderApi()
        .then(() => {
          this.$refs.loading.hide();

          successMsg('刪除所有訂單成功(ﾟω´)！');

          this.getOrders();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('刪除所有訂單失敗', response);
        });
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>
