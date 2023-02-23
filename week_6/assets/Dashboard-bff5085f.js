import{H as d}from"./HeaderBasic-d2d0fbd6.js";import{L as u}from"./Loading-0b8a9f63.js";import{S as i}from"./sweetalert2.all-fb945901.js";import{f as h,h as p,i as l}from"./api-38f04727.js";import{t as n}from"./global-69792a57.js";import{_ as f,r as e,o as g,c as L,a as t,F as _}from"./index-e39cbb8a.js";const $={components:{HeaderBasic:d,Loading:u},computed:{getHeaderList(){return[{title:"第六週主線任務",pathName:"AdminHome"},{title:"產品管理",pathName:"AdminProductList"},{title:"訂單管理",pathName:"AdminOrders"}]}},methods:{logout(){h().then(()=>{i.fire({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,icon:"success",title:"登出成功 ฅ●ω●ฅ"}),this.$router.push({name:"Login"})})},expiredToken(){i.fire({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,icon:"error",title:"token 已過期 (′゜ω。‵)"}),this.$router.push({name:"Login"})},checkLogin(){this.$refs.loading.show(),p.defaults.headers.common.Authorization=`${n}`,l().then(o=>{const{data:{success:r}}=o;this.$refs.loading.hide(),r||this.$router.push({name:"Login"})}).catch(()=>{this.$refs.loading.hide(),this.$router.push({name:"Login"})})}},mounted(){if(!n){this.expiredToken();return}this.checkLogin()}};function k(o,r,B,H,w,s){const a=e("HeaderBasic"),c=e("RouterView"),m=e("Loading");return g(),L(_,null,[t(a,{headerList:s.getHeaderList,logout:s.logout},null,8,["headerList","logout"]),t(c),t(m,{ref:"loading"},null,512)],64)}const F=f($,[["render",k]]);export{F as default};
