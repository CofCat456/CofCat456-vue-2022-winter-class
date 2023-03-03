<template>
  <section class="container position-absolute top-50 start-50 translate-middle text-center">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3">送出訂單</h1>
      <div class="col-md-6">
        <VForm
          class="text-start fs-6"
          :validation-schema="schema"
          @submit="handleSubmit"
          v-slot="{ errors }"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
            />
            <VErrorMessage name="email" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
              id="name"
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入姓名"
            />
            <VErrorMessage name="name" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
              id="tel"
              name="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話"
            />
            <VErrorMessage name="tel" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField
              id="address"
              name="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地址"
            />
            <VErrorMessage name="address" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <VField
              as="textarea"
              id="message"
              name="message"
              class="form-control"
              cols="30"
              rows="10"
            ></VField>
          </div>

          <button
            v-if="loadingStatus"
            class="btn btn-lg w-100 mt-3 btn-primary"
            type="button"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          <button v-else class="btn btn-lg btn-primary w-100 mt-3" type="submit">送出訂單</button>
        </VForm>
      </div>
    </div>
    <Loading ref="loading" />
  </section>
</template>

<script>
import { Form as VForm, Field as VField, ErrorMessage as VErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Loading from '@/components/Loading.vue';

import { getCartApi, checkoutApi } from '@/utlis/api';
import { phoneRegExp, errorMsg, successMsg } from '@/utlis/global';

export default {
  components: {
    VForm,
    VField,
    VErrorMessage,
    Loading
  },
  data: () => ({
    loadingStatus: false
  }),
  computed: {
    schema() {
      return yup.object({
        email: yup.string().email('請輸入正確的 Email 格式 ㅍ_ㅍ !!').required('Email 為必填!'),
        name: yup.string().required('姓名 為必填!'),
        tel: yup
          .string()
          .matches(phoneRegExp, '請輸入正確的電話格式 -`д´- !!')
          .required('電話 為必填!'),
        address: yup.string().required('地址 為必填!'),
        message: yup.string()
      });
    }
  },
  methods: {
    getCarts() {
      this.$refs.loading.show();

      getCartApi()
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: {
              data: { carts }
            }
          } = res;

          if (carts.length === 0) {
            successMsg('購物車目前是空的唷(*´д`)');

            this.$router.go(-1);
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('加入購物車失敗', response);
        });
    },
    handleSubmit(values) {
      this.loadingStatus = true;

      const { email, name, tel, address, message } = values;

      checkoutApi({
        data: {
          user: {
            name,
            email,
            tel,
            address
          },
          message
        }
      })
        .then(() => {
          this.loadingStatus = false;

          successMsg('建立訂單成功 (ﾉ>ω<)ﾉ !');

          this.$router.push({ name: 'ProductList' });
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('建立訂單失敗', response);
        });
    }
  },
  mounted() {
    this.getCarts();
  }
};
</script>
