<script setup>
import { useForm } from '@vorms/core';
import { yupResolver } from '@vorms/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  account: yup.string().email('請輸入正確的 Email 格式 ㅍ_ㅍ!!').required('請輸入 Email !!'),
  password: yup.string('').min(6, '密碼長度不得小於 6').required('請輸入密碼!!'),
});

const { errors, drity, register, handleSubmit, handleReset } = useForm({
  initialValues: {
    account: '',
    password: 30,
  },
  validate: yupResolver(schema),
  onSubmit(values) {
    console.log(values);
  },
});

// Basic usage
// The `attrs` need to be bind on <input> to support `validateMode`
// and `reValidateMode`.
const { value: account, attrs: accountFieldAttrs } = register('account');

// Add field level validation.
const { value: password, attrs: passwordFieldAttrs } = register('password', {
  validate(value) {
    return value > 100 ? 'This max number is 100' : undefined;
  },
});
</script>

<template>
  <section class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form class="form-signin" novalidate @submit="handleSubmit" @reset="handleReset">
          <div class="form-floating mb-3">
            <input
              id="username"
              type="email"
              class="form-control"
              placeholder="name@example.com"
              v-bind="accountFieldAttrs"
              v-model="account"
            />
            <label for="username">Email address</label>
            <div class="feedback">{{ errors.account }}</div>
          </div>
          <div class="form-floating">
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
              v-bind="passwordFieldAttrs"
              v-model="password"
            />
            <label for="password">Password</label>
            <div class="feedback">{{ errors.password }}</div>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">登入</button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </section>
</template>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
