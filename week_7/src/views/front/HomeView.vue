<template>
  <div
    class="position-absolute"
    style="
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url(https://images.unsplash.com/photo-1542062700-9b61ccbc1696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
      background-position: center center;
      opacity: 0.1;
      z-index: -100;
    "
  ></div>
  <div class="container d-flex flex-column" style="min-height: 100vh">
    <HeaderBasic light :headerList="getHeaderList" />
    <div class="row justify-content-center my-auto">
      <div class="col-md-4 text-center">
        <h2>全國最頂的選貨店</h2>
        <p class="text-muted mb-0">精選潮流選貨、想走在潮流前端的年輕人別錯過</p>
        <RouterLink :to="{ name: 'ProductList' }">
          <button class="btn btn-dark rounded-0 mt-5">立即選購</button>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            style="height: 237px"
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            class="card-img-top rounded-0"
            alt="..."
          />
          <div class="card-body text-center">
            <h4>熱鬧潮流，嗨翻全場</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                打造獨一無二的時尚風格，一起創造屬於你的潮流世界。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            style="height: 237px"
            src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            class="card-img-top rounded-0 object-fit-cover"
            alt="..."
          />
          <div class="card-body text-center">
            <h4>引領潮流，前沿設計</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                我們為您提供最新、最時尚的設計，讓您成為引領潮流的時尚達人。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            style="height: 237px"
            src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            class="card-img-top rounded-0"
            alt="..."
          />
          <div class="card-body text-center">
            <h4>潮流不等待，即刻擁有</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                快來選擇你的時尚品味，我們提供的產品將讓您在潮流中脫穎而出。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row">
      <div class="col-md-6">
        <img
          src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt=""
          class="img-fluid"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4">潮流無界限，青春無限可能</h4>
        <p class="text-muted">
          無論你來自哪裡，我們都相信你有自己的時尚態度，所以我們提供最優質、最具時尚感的產品，讓你展現自己。
        </p>
      </div>
    </div>
    <div class="row flex-row-reverse justify-content-between mt-4">
      <div class="col-md-6">
        <img
          src="https://images.unsplash.com/photo-1524282745852-a463fa495a7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt=""
          class="img-fluid"
        />
      </div>
      <div class="col-md-4 m-auto text-center">
        <h4 class="mt-4">追求卓越，超越自我</h4>
        <p class="text-muted">
          我們相信，只有不斷地追求卓越和超越自己，才能在潮流中立足。所以我們提供最好的產品和服務，讓您成為時尚界的翹楚。
        </p>
      </div>
    </div>
  </div>
  <div class="bg-dark py-3">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row justify-content-center align-items-md-end text-white"
      >
        <p class="mb-0">CofCat 2022 vue 冬季班作業</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBasic from '@/components/HeaderBasic.vue';

export default {
  components: {
    HeaderBasic
  },
  computed: {
    getHeaderList() {
      return [
        {
          title: '第七週主線任務',
          pathName: 'Home'
        },
        {
          title: '產品列表',
          pathName: 'ProductList'
        },
        {
          title: '購物車',
          pathName: 'Cart'
        },
        {
          title: '登入後台',
          pathName: 'Login'
        }
      ];
    }
  }
};
</script>
