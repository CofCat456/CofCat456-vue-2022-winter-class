import{H as c}from"./HeaderBasic-5ba97e01.js";import{j as u,k as m}from"./api-fb50adcd.js";import{_ as p,S as d,j as s,k as h,r,o as l,c as g,d as n,F as _}from"./index-f9a2aef5.js";const L={components:{HeaderBasic:c},computed:{getHeaderList(){return[{title:"第七週主線任務"},{title:"產品管理",pathName:"AdminProductList"},{title:"訂單管理",pathName:"AdminOrders"},{title:"優惠卷管理",pathName:"AdminCoupons"},{title:"文章管理",pathName:"AdminArticles"}]}},methods:{logout(){u().then(()=>{d("登出成功 ฅ●ω●ฅ"),this.$router.push({name:"Login"})})},expiredToken(){s("token 已過期 (′゜ω。‵)"),this.$router.push({name:"Login"})},checkLogin(){m().then(e=>{const{data:{success:t}}=e;t||this.$router.push({name:"Login"})}).catch(e=>{const{response:t}=e;s(t),this.$router.push({name:"Login"})})}},mounted(){if(!h){this.expiredToken();return}this.checkLogin()}};function k(e,t,f,A,H,o){const a=r("HeaderBasic"),i=r("RouterView");return l(),g(_,null,[n(a,{headerList:o.getHeaderList,logout:o.logout},null,8,["headerList","logout"]),n(i)],64)}const N=p(L,[["render",k]]);export{N as default};