<template>
  <div class="container">
    <div class="row jsutify-content-center py-5">
      <div class="col">
        <div class="text-end mt-4">
          <button class="btn btn-primary" type="button" @click="openModal('new')">
            建立新的優惠券
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">名稱</th>
              <th scope="col">折扣百分比</th>
              <th scope="col">到期日</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coupon, index) in coupons" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.percent }}%</td>
              <td>{{ $filters.date(coupon.due_date) }}</td>
              <td>
                <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
                <span v-else class="text-muted">未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', coupon)">
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', coupon)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pagination" @emit-pages="getCoupons" />
      </div>
    </div>
    <CouponModal
      ref="couponModal"
      :isNew="isNew"
      :coupon="tempCoupon"
      @add-coupon="addCoupon"
      @update-coupon="updateCoupon"
    />
    <DeleteModal
      ref="couponDeleteModal"
      :id="tempCoupon.id"
      :title="tempCoupon.title"
      @delete="delCoupon"
      >優惠卷</DeleteModal
    >
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/PaginationBasic.vue';
import CouponModal from '@/components/Modal/CouponModal.vue';
import DeleteModal from '@/components/Modal/DeleteModal.vue';

import {
  getAdminCouponsApi,
  addAdminCouponApi,
  updateAdminCouponApi,
  deleteAdminCouponApi
} from '@/utlis/api';
import { errorMsg, responseMsg } from '@/utlis/global';

export default {
  components: {
    Loading,
    Pagination,
    CouponModal,
    DeleteModal
  },
  props: {
    config: Object
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false
    };
  },
  methods: {
    openModal(type, coupon) {
      if (type === 'new') {
        this.isNew = true;
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        };
        this.$refs.couponModal.show();
      } else if (type === 'edit') {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
        this.$refs.couponModal.show();
      } else if (type === 'delete') {
        this.tempCoupon = { ...coupon };
        this.$refs.couponDeleteModal.show();
      }
    },
    getCoupons(page = 1) {
      this.$refs.loading.show();

      getAdminCouponsApi(page)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, coupons, pagination }
          } = res;

          if (success) {
            this.coupons = coupons;
            this.pagination = pagination;
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    addCoupon(coupon) {
      this.$refs.loading.show();

      addAdminCouponApi(coupon)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.couponModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getCoupons();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    updateCoupon(coupon) {
      this.$refs.loading.show();

      const { id } = coupon;

      updateAdminCouponApi(id, coupon)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.couponModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getCoupons();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    delCoupon(id) {
      this.$refs.loading.show();

      deleteAdminCouponApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, message }
          } = res;

          responseMsg(success, message);

          this.getCoupons();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    }
  },
  mounted() {
    this.getCoupons();
  }
};
</script>
