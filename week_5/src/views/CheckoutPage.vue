<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from '@vorms/core';
import { yupResolver } from '@vorms/resolvers/yup';
import * as yup from 'yup';

import Swal from 'sweetalert2';

import { checkoutApi } from '@/utlis/api.js';
import { phoneRegExp } from '@/utlis/global.js';

const router = useRouter();
const loadingStatus = ref(false);

const schema = yup.object().shape({
  email: yup.string().email('請輸入正確的 Email 格式 ㅍ_ㅍ !!').required('Email 為必填!'),
  name: yup.string().required('姓名 為必填!'),
  tel: yup.string().matches(phoneRegExp, '請輸入正確的電話格式 -`д´- !!').required('電話 為必填!'),
  address: yup.string().required('地址 為必填!')
});

const { errors, register, handleSubmit } = useForm({
  initialValues: {
    email: ''
  },
  validate: yupResolver(schema),
  onSubmit(values) {
    loadingStatus.value = true;
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
        loadingStatus.value = false;

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: 'success',
          title: '建立訂單成功 (ﾉ>ω<)ﾉ !'
        });

        router.push({ name: 'ProductList' });
      })
      .catch((err) => {
        console.log(err);

        loadingStatus.value = false;
      });
  }
});

const { value: email, attrs: emailFieldAttrs } = register('email');
const { value: name, attrs: nameFieldAttrs } = register('name');
const { value: tel, attrs: telFieldAttrs } = register('tel');
const { value: address, attrs: addressFieldAttrs } = register('address');
const { value: message } = register('message');
</script>

<template>
  <section class="container position-absolute top-50 start-50 translate-middle text-center">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3">送出訂單</h1>
      <div class="col-md-6">
        <form class="text-start fs-6" novalidate @submit="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              v-bind="emailFieldAttrs"
              v-model="email"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入姓名"
              v-bind="nameFieldAttrs"
              v-model="name"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <input
              id="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話"
              v-bind="telFieldAttrs"
              v-model="tel"
            />
            <div class="invalid-feedback">{{ errors.tel }}</div>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <input
              id="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地址"
              v-bind="addressFieldAttrs"
              v-model="address"
            />
            <div class="invalid-feedback">{{ errors.address }}</div>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name="message"
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="message"
            ></textarea>
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
        </form>
      </div>
    </div>
  </section>
</template>
