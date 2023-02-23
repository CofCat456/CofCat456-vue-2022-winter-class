import{L as B}from"./Loading-0b8a9f63.js";import{c as f,B as P}from"./Breadcrumb-90c2eee3.js";import{_ as y,o,c as r,F as b,e as C,n as v,t as a,r as n,b as e,a as d}from"./index-e39cbb8a.js";import{c as N}from"./global-69792a57.js";import{g as V}from"./api-38f04727.js";const D={props:{currentCategory:{type:String,default:"全部"}},methods:{goCategory(t){this.$router.push(`/productList/${t}`)}},computed:{getCategoryList(){return["全部",...f.keys()]}}},j={class:"list-group"},F=["onClick"];function S(t,c,l,L,u,s){return o(),r("div",j,[(o(!0),r(b,null,C(s.getCategoryList,i=>(o(),r("button",{key:i,type:"button",class:v(["list-group-item list-group-item-action",{active:l.currentCategory===i}]),onClick:_=>s.goCategory(i)},a(i),11,F))),128))])}const z=y(D,[["render",S]]);const A={components:{Loading:B,CategoryList:z,Breadcrumb:P},data(){return{products:[],currentCategory:"全部"}},computed:{getBreadcrumb(){return[{title:"首頁",pathName:"Home"},{title:this.currentCategory==="全部"?"產品列表":`產品列表(${this.currentCategory})`}]},filterProductsList(){return this.currentCategory==="全部"?this.products:this.products.filter(({category:t})=>this.currentCategory===t)}},methods:{getBadgeColor(t){return`text-bg-${f.get(t)||"secondary"}`},getPrice(t){return N(t,"NT ")},getProductList(){this.$refs.loading.show(),V().then(t=>{const{data:{products:c}}=t;if(c===null){this.products=[];return}this.products=Object.values(c),this.$refs.loading.hide()}).catch(t=>{console.log(t),this.$refs.loading.hide()})},goDetail(t){this.$router.push(`/product/${t}`)}},mounted(){this.getProductList(),this.$watch(()=>this.$route.params,t=>{const{category:c="全部"}=t;this.currentCategory=c})}},E={class:"container py-5"},H={class:"row"},M={class:"col-10 offset-md-2"},O={class:"col-md-2 col-12 mb-md-0 mb-3"},T={class:"col"},q={class:"row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"},G=["onClick"],I={class:"card__image rounded overflow-hidden"},J={class:"ratio ratio-16x9"},K=["alt","src"],Q={class:"card-body d-flex flex-column align-items-start pt-2"},R={class:"card-title"},U={class:"d-inline-flex align-items-center gap-1 mb-2"},W=e("i",{class:"bi bi-star-fill text-info"},null,-1),X={class:"mb-0 text-secondary"},Y={key:0},Z={key:1},tt={class:"mt-auto mb-0 lh-1 fs-7 text-muted text-decoration-line-through"},et={class:"mb-0 fw-bold"};function st(t,c,l,L,u,s){const i=n("Breadcrumb"),_=n("CategoryList"),$=n("Loading");return o(),r("div",E,[e("div",H,[e("div",M,[d(i,{breadcrumbList:s.getBreadcrumb},null,8,["breadcrumbList"])]),e("div",O,[d(_,{currentCategory:u.currentCategory},null,8,["currentCategory"])]),e("div",T,[e("div",q,[(o(!0),r(b,null,C(s.filterProductsList,({id:g,title:m,category:h,evaluate:p,price:x,origin_price:k,imageUrl:w})=>(o(),r("div",{key:g,class:"col"},[e("div",{style:{cursor:"pointer"},class:"card h-100 border-0",onClick:ot=>s.goDetail(g)},[e("div",I,[e("div",J,[e("img",{class:"card-img-top object-fit-cover",alt:m,src:w},null,8,K)])]),e("div",Q,[e("span",{class:v(["badge rounded-pill mb-2",s.getBadgeColor(h)])},a(h),3),e("h5",R,a(m),1),e("div",U,[W,e("p",X,[p?(o(),r("small",Y,a(p),1)):(o(),r("small",Z,"0"))])]),e("p",tt,a(s.getPrice(k)),1),e("p",et,a(s.getPrice(x)),1)])],8,G)]))),128))])])]),d($,{ref:"loading"},null,512)])}const dt=y(A,[["render",st]]);export{dt as default};
