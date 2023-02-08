<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <h2>訂單</h2>
        <!-- <div class="text-end mt-4"> -->
        <!--   <button -->
        <!--     class="btn btn-outline-danger" -->
        <!--     :disabled="cartsExist" -->
        <!--     @click="openModal('deleteAll')" -->
        <!--   > -->
        <!--     清空購物車 -->
        <!--   </button> -->
        <!-- </div> -->
        <table class="table align-middle mt-4 table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">訂單編號</th>
              <th scope="col">顧客姓名</th>
              <th scope="col">狀態</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="orders">
              <tr v-for="(order, index) in orders" :key="order.id">
                <td>{{ index + 1 }}</td>
                <td>{{ order.create_at }}</td>
                <td>{{ order?.user?.name }}</td>
                <td>
                  <span
                    :class="[
                      'badge rounded-pill px-3 py-1',
                      `bg-${order.is_paid ? 'success' : 'secondary'}`
                    ]"
                    >{{ order.is_paid ? '已付款' : '未付款' }}</span
                  >
                </td>
                <td>{{ order.message }}</td>
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
    openModal(type = 'delete', cart) {
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
