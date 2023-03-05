import{F as v,a as V,E as y,c as E,b as n}from"./object-4056c4fd.js";import{L as k}from"./Loading-7a76afc0.js";import{e as x,i as F}from"./api-fb50adcd.js";import{_ as $,s as w,j as m,l as S,r as h,o as f,c as p,e as s,d as e,w as C,n as _}from"./index-f9a2aef5.js";const M={components:{VForm:v,VField:V,VErrorMessage:y,Loading:k},data:()=>({loadingStatus:!1}),computed:{schema(){return E({email:n().email("請輸入正確的 Email 格式 ㅍ_ㅍ !!").required("Email 為必填!"),name:n().required("姓名 為必填!"),tel:n().matches(w,"請輸入正確的電話格式 -`д´- !!").required("電話 為必填!"),address:n().required("地址 為必填!"),message:n()})}},methods:{getCarts(){this.$refs.loading.show(),x().then(o=>{this.$refs.loading.hide();const{data:{success:l,message:i,data:{carts:c}}}=o;l&&c.length===0&&(m("購物車目前是空的唷(*´д`)"),this.$router.go(-1)),l===!1&&m(i)}).catch(o=>{this.$refs.loading.hide();const{response:l}=o;m(l)})},handleSubmit(o){this.loadingStatus=!0;const{email:l,name:i,tel:c,address:b,message:r}=o;F({data:{user:{name:i,email:l,tel:c,address:b},message:r}}).then(a=>{this.loadingStatus=!1;const{data:{success:t,message:u}}=a;S(t,u),this.$router.push({name:"ProductList"})}).catch(a=>{this.$refs.loading.hide();const{response:t}=a;m(t)})}},mounted(){this.getCarts()}},L={class:"container position-absolute top-50 start-50 translate-middle text-center"},q={class:"row justify-content-center"},B=s("h1",{class:"h3 mb-3"},"送出訂單",-1),j={class:"col-md-6"},A={class:"mb-3"},N=s("label",{for:"email",class:"form-label"},"Email",-1),z={class:"mb-3"},P=s("label",{for:"name",class:"form-label"},"收件人姓名",-1),R={class:"mb-3"},D=s("label",{for:"tel",class:"form-label"},"收件人電話",-1),G={class:"mb-3"},H=s("label",{for:"address",class:"form-label"},"收件人地址",-1),I={class:"mb-3"},J=s("label",{for:"message",class:"form-label"},"留言",-1),K={key:0,class:"btn btn-lg w-100 mt-3 btn-primary",type:"button",disabled:""},O=s("span",{class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},null,-1),Q=[O],T={key:1,class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"};function U(o,l,i,c,b,r){const a=h("VField"),t=h("VErrorMessage"),u=h("VForm"),g=h("Loading");return f(),p("section",L,[s("div",q,[B,s("div",j,[e(u,{class:"text-start fs-6","validation-schema":r.schema,onSubmit:r.handleSubmit},{default:C(({errors:d})=>[s("div",A,[N,e(a,{id:"email",name:"email",type:"email",class:_(["form-control",{"is-invalid":d.email}]),placeholder:"請輸入 Email"},null,8,["class"]),e(t,{name:"email",class:"invalid-feedback"})]),s("div",z,[P,e(a,{id:"name",name:"name",type:"text",class:_(["form-control",{"is-invalid":d.name}]),placeholder:"請輸入姓名"},null,8,["class"]),e(t,{name:"name",class:"invalid-feedback"})]),s("div",R,[D,e(a,{id:"tel",name:"tel",type:"tel",class:_(["form-control",{"is-invalid":d.tel}]),placeholder:"請輸入電話"},null,8,["class"]),e(t,{name:"tel",class:"invalid-feedback"})]),s("div",G,[H,e(a,{id:"address",name:"address",type:"text",class:_(["form-control",{"is-invalid":d.address}]),placeholder:"請輸入地址"},null,8,["class"]),e(t,{name:"address",class:"invalid-feedback"})]),s("div",I,[J,e(a,{as:"textarea",id:"message",name:"message",class:"form-control",cols:"30",rows:"10"})]),o.loadingStatus?(f(),p("button",K,Q)):(f(),p("button",T,"送出訂單"))]),_:1},8,["validation-schema","onSubmit"])])]),e(g,{ref:"loading"},null,512)])}const ss=$(M,[["render",U]]);export{ss as default};