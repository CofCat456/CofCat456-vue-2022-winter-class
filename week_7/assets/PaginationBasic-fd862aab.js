import{_ as g,o as i,c as n,e as t,n as l,V as o,F as u,g as p,t as _}from"./index-f8b38f01.js";const m={props:{current_page:{type:Number,default:1},has_next:{type:Boolean,default:!0},has_pre:{type:Boolean,default:!0},total_pages:{type:Number,default:1}},methods:{goPre(){this.has_pre&&this.$emit("emit-pages",this.current_page-1)},goNext(){this.has_next&&this.$emit("emit-pages",this.current_page+1)}}},d={"aria-label":"Page navigation example"},h={class:"pagination justify-content-center"},f=["onClick"];function k(c,a,s,x,v,r){return i(),n("nav",d,[t("ul",h,[t("li",{class:l(["page-item",{disabled:!s.has_pre}])},[t("a",{class:"page-link",href:"#",onClick:a[0]||(a[0]=o((...e)=>r.goPre&&r.goPre(...e),["prevent"]))},"Previous")],2),(i(!0),n(u,null,p(s.total_pages,e=>(i(),n("li",{class:"page-item",key:e},[t("a",{class:l(["page-link",{active:s.current_page===e}]),href:"#",onClick:o(P=>c.$emit("emitPages",e),["prevent"])},_(e),11,f)]))),128)),t("li",{class:l(["page-item",{disabled:!s.has_next}])},[t("a",{class:"page-link",href:"#",onClick:a[1]||(a[1]=o((...e)=>r.goNext&&r.goNext(...e),["prevent"]))},"Next")],2)])])}const N=g(m,[["render",k]]);export{N as P};