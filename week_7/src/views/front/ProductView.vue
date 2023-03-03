<template>
  <div class="container py-5">
    <div v-if="product" class="row">
      <div class="col-12">
        <Breadcrumb :breadcrumbList="getBreadcrumb" />
      </div>
      <div class="col-md-6">
        <div class="ratio ratio-4x3">
          <img
            :src="product.imageUrl"
            class="img-fluid object-fit-cover rounded"
            :alt="product.title"
          />
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column align-items-start ps-md-3">
        <span class="badge mb-3" :class="getBadgeColor(product.category)">{{
          product.category
        }}</span>
        <h2 class="mb-3 fw-bold">{{ product.title }}</h2>
        <p class="flex-fill">{{ product.description }}</p>
        <h2 class="mb-3 fw-bold">{{ $filters.currency(product.price, 'NT ') }}</h2>
        <div class="input-group w-50 mb-3">
          <button class="btn btn-outline-secondary" type="button" @click="dash">
            <i class="bi bi-dash"></i>
          </button>
          <input
            type="text"
            class="form-control"
            min="1"
            aria-label="商品購買數量"
            readonly
            v-model="qty"
          />
          <span class="input-group-text">{{ product.unit }}</span>
          <button class="btn btn-outline-secondary" type="button" @click="plus">
            <i class="bi bi-plus"></i>
          </button>
        </div>
        <div class="w-100 d-flex mb-3">
          <button type="button" class="btn btn-primary w-50 py-2" @click="addToCart">
            <i class="bi bi-cart-plus"></i>
            加入購物車
          </button>
        </div>
      </div>
      <div class="col mt-5">
        <ProductContent :imagesUrl="product.imagesUrl" />
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ProductContent from '@/components/ProductContent.vue';

import { successMsg, errorMsg } from '@/utlis/global';
import { getProductApi, addToCartApi } from '@/utlis/api';
import { categoryMap } from '@/utlis/context';

export default {
  components: {
    Loading,
    Breadcrumb,
    ProductContent
  },
  data() {
    return {
      product: null,
      qty: 1
    };
  },
  computed: {
    getBreadcrumb() {
      return [
        {
          title: '首頁',
          pathName: 'Home'
        },
        {
          title: '產品列表',
          pathName: 'ProductList'
        },
        {
          title: this.product.title
        }
      ];
    }
  },
  methods: {
    getBadgeColor(category) {
      return `text-bg-${categoryMap.get(category) || 'secondary'}`;
    },
    getProduct(id) {
      this.$refs.loading.show();

      getProductApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { product }
          } = res;

          this.product = product;
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('商品不存在', response);

          this.$router.push({ name: 'ProductList' });
        });
    },
    plus() {
      this.qty += 1;
    },
    dash() {
      this.qty -= 1;
    },
    addToCart() {
      this.$refs.loading.show();

      const data = {
        product_id: this.product.id,
        qty: this.qty
      };

      addToCartApi({ data })
        .then(() => {
          this.$refs.loading.hide();

          successMsg('增加購物車成功(๑•́ ₃ •̀๑)!');
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('增加購物車失敗', response);
        });
    }
  },
  mounted() {
    const { id } = this.$route.params;
    this.getProduct(id);
  }
};
</script>
