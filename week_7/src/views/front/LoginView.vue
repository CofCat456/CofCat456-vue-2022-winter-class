<template>
  <section class="container position-absolute top-50 start-50 translate-middle text-center">
    <div class="row justify-content-center">
      <h1 class="h3 mb-4 font-weight-normal">請先登入</h1>
      <div class="col-md-4">
        <VForm
          class="text-start fs-6"
          :validation-schema="schema"
          @submit="handleSubmit"
          v-slot="{ errors }"
        >
          <div class="form-floating mb-3">
            <VField
              id="account"
              name="account"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['account'] }"
              placeholder="請輸入帳號"
            />
            <label for="username">帳號</label>
            <VErrorMessage name="account" class="invalid-feedback" />
          </div>

          <div class="form-floating mb-3">
            <VField
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              placeholder="請輸入密碼"
            />
            <label for="password">密碼</label>
            <VErrorMessage name="password" class="invalid-feedback" />
          </div>

          <button
            v-if="loadingStatus"
            class="btn btn-lg w-100 mt-3 btn-primary"
            type="button"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
          <button v-else class="btn btn-lg btn-primary w-100 mt-3" type="submit">登入</button>
        </VForm>
      </div>
    </div>
  </section>
</template>

<script>
import { Form as VForm, Field as VField, ErrorMessage as VErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { loginApi } from '@/utlis/api';
import { errorMsg, successMsg } from '@/utlis/global';

export default {
  components: {
    VForm,
    VField,
    VErrorMessage
  },
  data: () => ({
    loadingStatus: false
  }),
  computed: {
    schema() {
      return yup.object({
        account: yup.string().email('請輸入正確的 Email 格式 ㅍ_ㅍ!!').required('請輸入 Email !!'),
        password: yup.string('').min(6, '密碼長度不得小於 6').required('請輸入密碼!!')
      });
    }
  },
  methods: {
    handleSubmit(values) {
      this.loadingStatus = true;

      const { account, password } = values;

      loginApi({
        username: account,
        password
      })
        .then((res) => {
          this.loadingStatus = false;

          const {
            data: { success, token, expired }
          } = res;

          if (success) {
            successMsg('登入成功 (*‘ v`*)');

            document.cookie = `token=${token};expires=${new Date(expired)};`;
            this.$router.push({ name: 'AdminProductList' });
          }
        })
        .catch((err) => {
          this.loadingStatus = false;

          const { response } = err;

          errorMsg('登入失敗', response);
        });
    }
  }
};
</script>
