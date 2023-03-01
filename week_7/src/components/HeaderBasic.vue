<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand m-0" :to="{ name: titleLink.pathName }">{{
        titleLink.title
      }}</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="{ title, pathName } in liLinks" :key="title" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: $route.name === pathName }"
              :to="{ name: pathName }"
              >{{ title }}</RouterLink
            >
          </li>
          <li v-if="logout" class="nav-item ms-3">
            <button type="button" class="btn btn-outline-secondary" @click="logout">登出</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    headerList: {
      type: Array,
      default: () => []
    },
    logout: {
      type: Function,
      default: null
    }
  },
  computed: {
    titleLink() {
      const { title, pathName } = this.headerList[0];
      return {
        title,
        pathName
      };
    },
    liLinks() {
      return this.headerList.slice(1, this.headerList.length);
    }
  }
};
</script>
