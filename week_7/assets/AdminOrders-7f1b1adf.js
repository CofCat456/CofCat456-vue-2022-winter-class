import{L}from"./Loading-7a76afc0.js";import{P as V}from"./PaginationBasic-72631d5b.js";import{m as N,D as U}from"./DeleteModal-ab9e1090.js";import{_ as v,o as d,c as i,e,t as n,b as M,F as b,g,m as $,T as x,j as u,l as f,r as p,d as m,U as j,w as E,n as T,f as B}from"./index-f9a2aef5.js";import{s as S,t as q,v as F,w as z}from"./api-fb50adcd.js";const G={props:{order:{type:Object,default(){return{}}}},data(){return{status:{},modal:"",tempOrder:{},isPaid:!1}},mixins:[N],watch:{order(){this.tempOrder=this.order}}},H={id:"orderModal",ref:"modal",class:"modal fade",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},I={class:"modal-dialog modal-xl modal-dialog-centered"},J={class:"modal-content border-0"},K=e("div",{class:"modal-header bg-dark text-white"},[e("h5",{class:"modal-title",id:"exampleModalLabel"},[e("span",null,"訂單細節")]),e("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Q={class:"modal-body"},R={class:"row"},W={class:"col-md-4"},X=e("h3",null,"用戶資料",-1),Y={class:"table"},Z={key:0},ee=e("th",{style:{width:"100px"}},"姓名",-1),te=e("th",null,"Email",-1),se=e("th",null,"電話",-1),le=e("th",null,"地址",-1),oe={class:"col-md-8"},ne=e("h3",null,"訂單細節",-1),de={class:"table"},ie=e("th",{style:{width:"100px"}},"訂單編號",-1),ae=e("th",null,"下單時間",-1),re=e("th",null,"付款時間",-1),ce={key:0},he={key:1},_e=e("th",null,"付款狀態",-1),ue={key:0,class:"text-success"},pe={key:1,class:"text-muted"},me=e("th",null,"總金額",-1),fe=e("h3",null,"選購商品",-1),be={class:"table"},ge=e("thead",null,[e("tr")],-1),Oe={class:"text-end"},ye={class:"d-flex justify-content-end"},ke={class:"form-check"},ve={class:"form-check-label",for:"flexCheckDefault"},Me={key:0},$e={key:1},xe={class:"modal-footer"},we=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Ae(l,s,a,h,t,r){return d(),i("div",H,[e("div",I,[e("div",J,[K,e("div",Q,[e("div",R,[e("div",W,[X,e("table",Y,[t.tempOrder.user?(d(),i("tbody",Z,[e("tr",null,[ee,e("td",null,n(t.tempOrder.user.name),1)]),e("tr",null,[te,e("td",null,n(t.tempOrder.user.email),1)]),e("tr",null,[se,e("td",null,n(t.tempOrder.user.tel),1)]),e("tr",null,[le,e("td",null,n(t.tempOrder.user.address),1)])])):M("",!0)])]),e("div",oe,[ne,e("table",de,[e("tbody",null,[e("tr",null,[ie,e("td",null,n(t.tempOrder.id),1)]),e("tr",null,[ae,e("td",null,n(l.$filters.date(t.tempOrder.create_at)),1)]),e("tr",null,[re,e("td",null,[t.tempOrder.paid_date?(d(),i("span",ce,n(l.$filters.date(t.tempOrder.paid_date)),1)):(d(),i("span",he,"時間不正確"))])]),e("tr",null,[_e,e("td",null,[t.tempOrder.is_paid?(d(),i("strong",ue,"已付款")):(d(),i("span",pe,"尚未付款"))])]),e("tr",null,[me,e("td",null,n(l.$filters.currency(t.tempOrder.total,"NT ")),1)])])]),fe,e("table",be,[ge,e("tbody",null,[(d(!0),i(b,null,g(t.tempOrder.products,c=>(d(),i("tr",{key:c.id},[e("th",null,n(c.product.title),1),e("td",null,n(c.qty)+" / "+n(c.product.unit),1),e("td",Oe,n(l.$filters.currency(c.final_total,"NT ")),1)]))),128))])]),e("div",ye,[e("div",ke,[$(e("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":s[0]||(s[0]=c=>t.tempOrder.is_paid=c)},null,512),[[x,t.tempOrder.is_paid]]),e("label",ve,[t.tempOrder.is_paid?(d(),i("span",Me,"已付款")):(d(),i("span",$e,"未付款"))])])])])])]),e("div",xe,[we,e("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=c=>l.$emit("update-paid",t.tempOrder))}," 修改付款狀態 ")])])])],512)}const Ce=v(G,[["render",Ae]]),De={components:{Loading:L,Pagination:V,DeleteModal:U,OrderModal:Ce},data(){return{tempOrder:{},orders:[],pagination:{}}},methods:{openModal(l,s){l==="delete"?(this.tempOrder={...s},this.$refs.orderDeleteModal.show()):l==="detail"?(this.tempOrder={...s},this.$refs.orderModal.show()):l==="deleteAll"&&(this.tempOrder={user:{name:"所有訂單"}},this.$refs.orderDeleteModal.show())},getOrders(l=1){this.$refs.loading.show(),S(l).then(s=>{this.$refs.loading.hide();const{data:{success:a,orders:h,pagination:t}}=s;a&&(this.orders=h,this.pagination=t)}).catch(s=>{this.$refs.loading.hide();const{response:a}=s;u(a)})},updatePaid(l){this.$refs.loading.show();const{id:s}=l,a={is_paid:l.is_paid};q(s,{data:a}).then(h=>{this.$refs.loading.hide();const{data:{success:t,message:r}}=h;f(t,r)}).catch(h=>{this.$refs.loading.hide();const{response:t}=h;u(t)})},delOrder(l){this.$refs.loading.show(),F(l).then(s=>{this.$refs.loading.hide();const{data:{success:a,message:h}}=s;a&&this.getOrders(),f(a,h)}).catch(s=>{this.$refs.loading.hide();const{response:a}=s;u(a)})},delAllOrder(){z().then(l=>{this.$refs.loading.hide();const{data:{success:s,message:a}}=l;s&&this.getOrders(),f(s,a)}).catch(l=>{this.$refs.loading.hide();const{response:s}=l;u(s)})}},mounted(){this.getOrders()}},Pe={class:"container"},Le={class:"row justify-content-center py-5"},Ve={class:"col"},Ne=e("h2",null,"訂單",-1),Ue={class:"table mt-4 table-hover"},je=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"購買款項"),e("th",{scope:"col"},"顧客姓名"),e("th",{scope:"col"},"應付金額"),e("th",{scope:"col"},"狀態"),e("th",{scope:"col"},"編輯")])],-1),Ee={class:"list-unstyled"},Te={class:"form-check form-switch"},Be=["id","onUpdate:modelValue","onChange"],Se=["for"],qe={key:0},Fe={key:1},ze={class:"btn-group"},Ge=["onClick"],He=["onClick"],Ie={class:"text-end mt-4"};function Je(l,s,a,h,t,r){var O,y;const c=p("Pagination"),w=p("OrderModal"),A=p("DeleteModal"),C=p("Loading");return d(),i("div",Pe,[e("div",Le,[e("div",Ve,[Ne,e("table",Ue,[je,e("tbody",null,[t.orders?(d(!0),i(b,{key:0},g(t.orders,(o,D)=>{var k;return d(),i("tr",{key:o.id,class:T({"text-secondary":!o.is_paid})},[e("td",null,n(D+1),1),e("td",null,[e("ul",Ee,[(d(!0),i(b,null,g(o.products,(_,P)=>(d(),i("li",{key:P},n(_.product.title)+" 數量："+n(_.qty)+" "+n(_.product.unit),1))),128))])]),e("td",null,n((k=o==null?void 0:o.user)==null?void 0:k.name),1),e("td",null,n(o==null?void 0:o.total),1),e("td",null,[e("div",Te,[$(e("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${o.id}`,"onUpdate:modelValue":_=>o.is_paid=_,onChange:_=>r.updatePaid(o)},null,40,Be),[[x,o.is_paid]]),e("label",{class:"form-check-label",for:`paidSwitch${o.id}`},[o.is_paid?(d(),i("span",qe,"已付款")):(d(),i("span",Fe,"未付款"))],8,Se)])]),e("td",null,[e("div",ze,[e("button",{class:"btn btn-outline-primary btn-sm",onClick:_=>r.openModal("detail",o)}," 查看 ",8,Ge),e("button",{class:"btn btn-outline-danger btn-sm",onClick:_=>r.openModal("delete",o)}," 刪除 ",8,He)])])],2)}),128)):M("",!0)])]),e("div",Ie,[e("button",{class:"btn btn-danger",onClick:s[0]||(s[0]=o=>r.openModal("deleteAll"))},"刪除所有訂單")]),m(c,j(t.pagination,{onEmitPages:r.getOrders}),null,16,["onEmitPages"])])]),m(w,{ref:"orderModal",order:t.tempOrder,onUpdatePaid:r.updatePaid},null,8,["order","onUpdatePaid"]),m(A,{ref:"orderDeleteModal",id:t.tempOrder.id,title:(y=(O=t.tempOrder)==null?void 0:O.user)==null?void 0:y.name,onDelete:r.delOrder,onDeleteAll:r.delAllOrder},{default:E(()=>[B("訂單")]),_:1},8,["id","title","onDelete","onDeleteAll"]),m(C,{ref:"loading"},null,512)])}const Ye=v(De,[["render",Je]]);export{Ye as default};