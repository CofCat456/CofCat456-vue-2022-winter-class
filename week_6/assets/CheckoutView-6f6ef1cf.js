import{F as v,a as V,E as w,c as y,b as o}from"./object-21ffa5dc.js";import{S as p}from"./sweetalert2.all-42d947dd.js";import{L as E}from"./Loading-c670b5d3.js";import{p as S,d as k,f as x}from"./api-18922eb0.js";import{_ as C,r as c,o as m,c as h,b as e,a as s,w as F,n as d}from"./index-76b41b60.js";const $={components:{VForm:v,VField:V,VErrorMessage:w,Loading:E},data:()=>({loadingStatus:!1}),computed:{schema(){return y({email:o().email("請輸入正確的 Email 格式 ㅍ_ㅍ !!").required("Email 為必填!"),name:o().required("姓名 為必填!"),tel:o().matches(S,"請輸入正確的電話格式 -`д´- !!").required("電話 為必填!"),address:o().required("地址 為必填!"),message:o()})}},methods:{getCarts(){this.$refs.loading.show(),k().then(t=>{const{data:{data:{carts:l}}}=t;l.length===0&&(p.fire({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,icon:"error",title:"購物車目前是空的唷(*´д`)"}),this.$router.go(-1)),this.$refs.loading.hide()}).catch(t=>{console.log(t),this.$refs.loading.hide()})},handleSubmit(t){this.loadingStatus=!0;const{email:l,name:_,tel:u,address:f,message:i}=t;x({data:{user:{name:_,email:l,tel:u,address:f},message:i}}).then(()=>{this.loadingStatus=!1,p.fire({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,icon:"success",title:"建立訂單成功 (ﾉ>ω<)ﾉ !"}),this.$router.push({name:"ProductList"})}).catch(a=>{console.log(a),this.loadingStatus=!1})}},mounted(){this.getCarts()}},B={class:"container position-absolute top-50 start-50 translate-middle text-center"},L={class:"row justify-content-center"},q=e("h1",{class:"h3 mb-3"},"送出訂單",-1),M={class:"col-md-6"},P={class:"mb-3"},A=e("label",{for:"email",class:"form-label"},"Email",-1),N={class:"mb-3"},j=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),z={class:"mb-3"},R=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),D={class:"mb-3"},G=e("label",{for:"address",class:"form-label"},"收件人地址",-1),H={class:"mb-3"},I=e("label",{for:"message",class:"form-label"},"留言",-1),J={key:0,class:"btn btn-lg w-100 mt-3 btn-primary",type:"button",disabled:""},K=e("span",{class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},null,-1),O=[K],Q={key:1,class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"};function T(t,l,_,u,f,i){const a=c("VField"),n=c("VErrorMessage"),b=c("VForm"),g=c("Loading");return m(),h("section",B,[e("div",L,[q,e("div",M,[s(b,{class:"text-start fs-6","validation-schema":i.schema,onSubmit:i.handleSubmit},{default:F(({errors:r})=>[e("div",P,[A,s(a,{id:"email",name:"email",type:"email",class:d(["form-control",{"is-invalid":r.email}]),placeholder:"請輸入 Email"},null,8,["class"]),s(n,{name:"email",class:"invalid-feedback"})]),e("div",N,[j,s(a,{id:"name",name:"name",type:"text",class:d(["form-control",{"is-invalid":r.name}]),placeholder:"請輸入姓名"},null,8,["class"]),s(n,{name:"name",class:"invalid-feedback"})]),e("div",z,[R,s(a,{id:"tel",name:"tel",type:"tel",class:d(["form-control",{"is-invalid":r.tel}]),placeholder:"請輸入電話"},null,8,["class"]),s(n,{name:"tel",class:"invalid-feedback"})]),e("div",D,[G,s(a,{id:"address",name:"address",type:"text",class:d(["form-control",{"is-invalid":r.address}]),placeholder:"請輸入地址"},null,8,["class"]),s(n,{name:"address",class:"invalid-feedback"})]),e("div",H,[I,s(a,{as:"textarea",id:"message",name:"message",class:"form-control",cols:"30",rows:"10"})]),t.loadingStatus?(m(),h("button",J,O)):(m(),h("button",Q,"送出訂單"))]),_:1},8,["validation-schema","onSubmit"])])]),s(g,{ref:"loading"},null,512)])}const ee=C($,[["render",T]]);export{ee as default};