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
              <th scope="col">顧客信箱</th>
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
                <td>{{ order?.user?.email }}</td>
                <td>{{ order?.user?.name }}</td>
                <td>{{ order?.total }}</td>
                <td>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`paidSwitch${order.id}`"
                      v-model="order.is_paid"
                    />
                    <label class="form-check-label" :for="`paidSwitch${order.id}`">
                      <span v-if="order.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm">編輯</button>
                    <button class="btn btn-outline-danger btn-sm">刪除</button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

import { getOrdersApi } from '@/utlis/api';

export default {
  components: {
    Loading
  },
  data() {
    return {
      tempProduct: {},
      orders: []
    };
  },
  methods: {
    openModal(type, cart) {
      if (type === 'delete') {
        const { id, product } = cart;
        this.tempProduct = { ...product, cart_id: id };
        this.$refs.productDeleteModal.show();
      } else if (type === 'deleteAll') {
        this.tempProduct = { title: '全部購物車' };
        this.$refs.productDeleteModal.show();
      }
    },
    getOrders() {
      this.$refs.loading.show();
      getOrdersApi()
        .then((res) => {
          this.$refs.loading.hide();
          const {
            data: { orders }
          } = res;
          this.orders = orders;

          console.log(this.orders);
          this.$refs.loading.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$refs.loading.hide();
        });
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>
