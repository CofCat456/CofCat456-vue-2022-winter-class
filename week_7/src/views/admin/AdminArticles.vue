<template>
  <div class="container">
    <div class="row justify-content-center py-5">
      <div class="col">
        <div class="text-end mt-4">
          <button class="btn btn-primary" type="button" @click="openModal('new')">
            建立新的頁面
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th style="width: 200px">標題</th>
              <th style="width: 200px">作者</th>
              <th>描述</th>
              <th style="width: 100px">建立時間</th>
              <th style="width: 100px">是否公開</th>
              <th style="width: 120px">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>{{ article.title }}</td>
              <td>{{ article.author }}</td>
              <td>{{ article.description }}</td>
              <td>{{ $filters.date(article.create_at) }}</td>
              <td>
                <span v-if="article.isPublic">已上架</span>
                <span v-else>未上架</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="getArticle(article.id)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="openModal('delete', article)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination v-bind="pagination" @emit-pages="getArticles" />
      </div>
    </div>
    <ArticleModal
      ref="articleModal"
      :isNew="isNew"
      :article="tempArticle"
      @add-article="addArticle"
      @update-article="updateArticle"
    />
    <DeleteModal
      ref="articleDeleteModal"
      :id="tempArticle.id"
      :title="tempArticle.title"
      @delete="delArticle"
      >文章</DeleteModal
    >
    <Loading ref="loading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/PaginationBasic.vue';
import ArticleModal from '@/components/Modal/ArticleModal.vue';
import DeleteModal from '@/components/Modal/DeleteModal.vue';

import {
  getAdminArticlesApi,
  addAdminArticleApi,
  updateAdminArticleApi,
  deleteAdminArticleApi,
  getAdminArticleApi
} from '@/utlis/api';
import { errorMsg, responseMsg } from '@/utlis/global';

export default {
  components: {
    Loading,
    Pagination,
    ArticleModal,
    DeleteModal
  },
  data() {
    return {
      articles: [],
      pagination: {},
      isNew: false,
      tempArticle: {}
    };
  },
  methods: {
    openModal(type, article) {
      if (type === 'new') {
        this.isNew = true;
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        };
        this.$refs.articleModal.show();
      } else if (type === 'edit') {
        this.isNew = false;
        this.tempArticle = { ...article };
        this.$refs.articleModal.show();
      } else if (type === 'delete') {
        this.tempArticle = { ...article };
        this.$refs.articleDeleteModal.show();
      }
    },
    getArticles(page = 1) {
      this.$refs.loading.show();

      getAdminArticlesApi(page)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, articles, pagination }
          } = res;

          if (success) {
            this.articles = articles;
            this.pagination = pagination;
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    getArticle(id) {
      this.$refs.loading.show();

      getAdminArticleApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, article }
          } = res;

          if (success) {
            this.openModal('edit', article);
          }
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    addArticle(article) {
      this.$refs.loading.show();

      addAdminArticleApi(article)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.articleModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getArticles();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg('新增文章失敗', response);
        });
    },
    updateArticle(article) {
      this.$refs.loading.show();

      const {
        data: { id }
      } = article;

      updateAdminArticleApi(id, article)
        .then((res) => {
          this.$refs.loading.hide();
          this.$refs.articleModal.hide();

          const {
            data: { success, message = ' ' }
          } = res;

          responseMsg(success, message);

          this.getArticles();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    },
    delArticle(id) {
      this.$refs.loading.show();

      deleteAdminArticleApi(id)
        .then((res) => {
          this.$refs.loading.hide();

          const {
            data: { success, message }
          } = res;

          responseMsg(success, message);

          this.getArticles();
        })
        .catch((err) => {
          this.$refs.loading.hide();

          const { response } = err;

          errorMsg(response);
        });
    }
  },
  mounted() {
    this.getArticles();
  }
};
</script>
