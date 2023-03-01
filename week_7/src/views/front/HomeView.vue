<template>
  <div class="container-fruid">
    <div style="height: calc(100vh - 56px)" class="row justify-content-center align-items-center">
      <div class="text-center">
        <h1 class="mb-3">第六週作業</h1>
        <RouterLink :to="{ name: 'ProductList' }">
          <button type="button" class="btn btn-outline-info">前往產品列表</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
