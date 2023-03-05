<template>
  <div class="container py-5">
    <div class="row">
      <Breadcrumb :breadcrumbList="getBreadcrumb" />
      <div class="col">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="{ title, description, imageUrl, id } in filterArtices" :key="id" class="col">
            <div class="card h-100 border-0">
              <div class="card__image rounded overflow-hidden">
                <div class="ratio ratio-16x9">
                  <img class="card-img-top object-fit-cover" :alt="title" :src="imageUrl" />
                </div>
              </div>
              <div class="card-body d-flex flex-column align-items-start pt-2">
                <h5 class="card-title mt-2">{{ title }}</h5>
                <p class="multiline-ellipsis">{{ description }}</p>
                <div class="d-inline-flex align-items-center gap-1 mb-2">
                  <RouterLink :to="`/article/${id}`">閱讀更多...</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

import { errorMsg } from '@/utlis/global';
import { getArticlesApi } from '@/utlis/api';

export default {
  components: {
    Loading,
    Breadcrumb
  },
  data() {
    return {
      articles: []
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
          title: '潮流專欄'
        }
      ];
    },
    filterArtices() {
      return this.articles.filter(({ isPublic }) => isPublic);
    }
  },
  methods: {
    getArticleList() {
      this.$refs.loading.show();

      getArticlesApi()
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, articles }
          } = res;

          if (success) {
            if (articles === null) {
              this.articles = [];
              return;
            }

            this.articles = Object.values(articles);
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    }
  },
  mounted() {
    this.getArticleList();
  }
};
</script>

<style>
.card__image img {
  transition: transform 0.8s ease 0s;
}

.card__image img:hover {
  transform: scale(1.2);
}

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
