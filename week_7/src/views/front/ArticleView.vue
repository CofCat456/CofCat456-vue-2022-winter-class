<template>
  <div class="container py-5">
    <div v-if="article" class="row">
      <div class="col-12 mb-3">
        <Breadcrumb :breadcrumbList="getBreadcrumb" />
      </div>
      <div class="col-12 d-flex my-2">
        <span v-for="tag in article.tag" :key="tag" class="badge bg-dark me-2">{{ tag }}</span>
      </div>
      <h1 class="text-center my-3">{{ article.title }}</h1>
      <p>
        <small class="fw-bold me-2">{{ article.author }}</small>
        <small class="text-muted">
          {{ $filters.date(article.create_at) }}
        </small>
      </p>
      <div class="col-md-8 mx-auto mb-5">
        <div class="ratio ratio-4x3">
          <img
            :src="article.imageUrl"
            class="img-fluid object-fit-cover rounded"
            :alt="article.title"
          />
        </div>
      </div>
      <div class="col-md-12 d-flex flex-column align-items-start ps-md-3">
        <p class="flex-fill lh-lg" v-html="article.content" />
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

import { errorMsg } from '@/utlis/global';
import { getArticleApi } from '@/utlis/api';

export default {
  components: {
    Loading,
    Breadcrumb
  },
  data() {
    return {
      article: null
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
          title: '潮流專欄',
          pathName: 'ArticleList'
        },
        {
          title: this.article.title
        }
      ];
    }
  },
  methods: {
    getArticle(id) {
      this.$refs.loading.show();

      getArticleApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, article }
          } = res;

          if (success) {
            this.article = article;
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);

          this.$router.go(-1);
        });
    }
  },
  mounted() {
    const { id } = this.$route.params;

    this.getArticle(id);
  }
};
</script>
