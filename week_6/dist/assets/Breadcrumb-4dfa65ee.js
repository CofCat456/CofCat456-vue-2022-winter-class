import{_ as u,r as d,o as e,c as r,b as _,F as s,e as l,g as m,w as p,d as o,t as c}from"./index-9b35a631.js";const v=new Map().set("鞋子","primary").set("褲子","info").set("衣服","success").set("帽子","warning"),b={props:{breadcrumbList:{type:Array,default:()=>[{title:"Home"}]}}},f={"aria-label":"breadcrumb"},k={class:"breadcrumb"},y=["aria-current"];function g(B,x,n,L,w,h){const i=d("RouterLink");return e(),r("nav",f,[_("ol",k,[(e(!0),r(s,null,l(n.breadcrumbList,({title:t,pathName:a})=>(e(),r("li",{key:t,class:"breadcrumb-item","aria-current":a?null:"page"},[a?(e(),m(i,{key:0,to:{name:a}},{default:p(()=>[o(c(t),1)]),_:2},1032,["to"])):(e(),r(s,{key:1},[o(c(t),1)],64))],8,y))),128))])])}const C=u(b,[["render",g]]);export{C as B,v as c};
