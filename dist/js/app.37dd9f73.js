(function(e){function t(t){for(var r,a,c=t[0],u=t[1],s=t[2],l=0,d=[];l<c.length;l++)a=c[l],i[a]&&d.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},i={app:0},o=[];function c(e){return u.p+"js/"+({404:"404","ad~agent~seller":"ad~agent~seller",ad:"ad",agent:"agent",seller:"seller",agentMenage:"agentMenage",agentSh:"agentSh",card:"card",checkMenage:"checkMenage",dataStatistics:"dataStatistics",home:"home",login:"login",order:"order",punish:"punish",sellerMenage:"sellerMenage",sellerSh:"sellerSh",systenArticle:"systenArticle",teacher:"teacher",teacherSh:"teacherSh",userList:"userList"}[e]||e)+"."+{404:"01d015df","ad~agent~seller":"e64dc7de",ad:"d01c096f",agent:"4a39303b",seller:"be50ad6c",agentMenage:"f605bef2",agentSh:"38294b0d",card:"416a7850",checkMenage:"b0cddcb4",dataStatistics:"b650f4c1",home:"feffccd3",login:"0356e01a",order:"2fbaf2ba",punish:"1c2a20aa",sellerMenage:"cce0a4d6",sellerSh:"34a5e758",systenArticle:"1a9d8f25",teacher:"200e48b6",teacherSh:"bd949059",userList:"20e68484"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={ad:1,agent:1,seller:1,agentSh:1,card:1,dataStatistics:1,home:1,login:1,order:1,punish:1,sellerSh:1,systenArticle:1,teacher:1,teacherSh:1,userList:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise(function(t,n){for(var r="css/"+({404:"404","ad~agent~seller":"ad~agent~seller",ad:"ad",agent:"agent",seller:"seller",agentMenage:"agentMenage",agentSh:"agentSh",card:"card",checkMenage:"checkMenage",dataStatistics:"dataStatistics",home:"home",login:"login",order:"order",punish:"punish",sellerMenage:"sellerMenage",sellerSh:"sellerSh",systenArticle:"systenArticle",teacher:"teacher",teacherSh:"teacherSh",userList:"userList"}[e]||e)+"."+{404:"31d6cfe0","ad~agent~seller":"31d6cfe0",ad:"cb06b9f3",agent:"587c2650",seller:"5c90da99",agentMenage:"31d6cfe0",agentSh:"50f52b65",card:"59bfbc23",checkMenage:"31d6cfe0",dataStatistics:"734de662",home:"faa0e03c",login:"dd726a82",order:"fa125cce",punish:"6344e3c5",sellerMenage:"31d6cfe0",sellerSh:"df8a4784",systenArticle:"dccf893a",teacher:"0e192929",teacherSh:"b26066d7",userList:"ea4c2c9c"}[e]+".css",i=u.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=o[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===i))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],l=s.getAttribute("data-href");if(l===r||l===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)}).then(function(){a[e]=0}));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise(function(t,n){r=i[e]=[t,n]});t.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e),s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");o.type=r,o.request=a,n[1](o)}i[e]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),a=n.n(r);a.a},"0a29":function(e,t,n){},"3bda":function(e,t,n){"use strict";var r=n("0a29"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("a4bb"),a=n.n(r),i=(n("cadf"),n("551c"),n("f751"),n("097d"),n("2b0e")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],u={},s=u,l=(n("034f"),n("2877")),d=Object(l["a"])(s,o,c,!1,null,null,null),f=d.exports,h=n("8c4f"),g=function(){return n.e("login").then(n.bind(null,"dd7b"))},m=function(){return n.e("404").then(n.bind(null,"8cdb"))},p=function(){return n.e("home").then(n.bind(null,"6511"))},b=function(){return n.e("dataStatistics").then(n.bind(null,"63da"))},S=function(){return n.e("userList").then(n.bind(null,"76c7"))},L=function(){return n.e("agentMenage").then(n.bind(null,"d2a7"))},v=function(){return Promise.all([n.e("ad~agent~seller"),n.e("agent")]).then(n.bind(null,"7f4e"))},y=function(){return n.e("sellerMenage").then(n.bind(null,"afc3"))},A=function(){return Promise.all([n.e("ad~agent~seller"),n.e("seller")]).then(n.bind(null,"05a9"))},M=function(){return n.e("checkMenage").then(n.bind(null,"69fe"))},k=function(){return n.e("agentSh").then(n.bind(null,"4e1b"))},w=function(){return n.e("sellerSh").then(n.bind(null,"8399"))},_=function(){return n.e("punish").then(n.bind(null,"c49a"))},T=function(){return n.e("teacherSh").then(n.bind(null,"f9a7"))},E=function(){return n.e("order").then(n.bind(null,"dbf5"))},P=function(){return n.e("teacher").then(n.bind(null,"491b"))},O=function(){return Promise.all([n.e("ad~agent~seller"),n.e("ad")]).then(n.bind(null,"42f6"))},C=function(){return n.e("systenArticle").then(n.bind(null,"a5f2"))},D=function(){return n.e("card").then(n.bind(null,"337f"))};i["default"].use(h["a"]);var j=[{path:"/dataStatistics",name:"dataStatistics",component:b,meta:{name:"数据统计",iconfont:"el-icon-loading",needLogin:!0}},{path:"/userList",name:"userList",component:S,meta:{name:"用户管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage",name:"checkMenage",component:M,meta:{name:"审核管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/checkMenage/agent",children:[{path:"/checkMenage/agentSh",name:"agentSh",component:k,meta:{name:"代理商审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/sellerSh",name:"sellerSh",component:w,meta:{name:"商户审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/teacherSh",name:"teacherSh",component:T,meta:{name:"专引师审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/punish",name:"punish",component:_,meta:{name:"处罚单",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/agentMenage",name:"agentMenage",component:L,meta:{name:"代理商管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/agentMenage/agent",children:[{path:"/agentMenage/agent",name:"agent",component:v,meta:{name:"代理商列表",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/sellerMenage",name:"sellerMenage",component:y,meta:{name:"商户管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/sellerMenage/seller",children:[{path:"/sellerMenage/seller",name:"seller",component:A,meta:{name:"商户列表",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/order",name:"order",component:E,meta:{name:"订单管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/ad",name:"ad",component:O,meta:{name:"广告位管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/teacher",name:"teacher",component:P,meta:{name:"专引师管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/systemArticle",name:"systemArticle",component:C,meta:{name:"系统文章管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/card",name:"card",component:D,meta:{name:"代金券设置",iconfont:"el-icon-loading",needLogin:!0}}],x=new h["a"]({routes:[{path:"/",redirect:"/login"},{path:"/login",name:"登录",component:g},{path:"/home",name:"home",component:p,redirect:"/dataStatistics",children:[].concat(j)},{path:"*",component:m}]});x.beforeEach(function(e,t,n){var r=localStorage.getItem("token");e.meta.needLogin?r?n():n({path:"/login",query:{redirect:e.fullPath}}):n()});var $=x,B=n("795b"),I=n.n(B),U=(n("7f7f"),n("2f62"));i["default"].use(U["a"]);var q=new U["a"].Store({state:{menuList:[],asideList:j},getters:{menuList:function(e){return e.menuList},asideList:function(e){return e.asideList}},mutations:{ADD_TAB:function(e,t){e.menuList.some(function(e){return e.path===t.path})||e.menuList.push({name:t.meta.name,path:t.path})},DEL_TAB:function(e,t){e.menuList.forEach(function(n){n.path===t.path&&e.menuList.splice(e.menuList.indexOf(n),1)})},SET_ASIDE_LIST:function(e,t){}},actions:{addTab:function(e,t){e.commit("ADD_TAB",t)},delTab:function(e,t){return new I.a(function(n,r){e.commit("DEL_TAB",t),n(e.state.menuList)})}}}),N=n("5c96"),z=n.n(N),F=(n("0fae"),n("6762"),n("2fdb"),n("bc3a")),G=n.n(F);function H(e,t,n){return new I.a(function(r,a){G.a.post(e,t,n).then(function(e){r(e)}).catch(function(e){a(e)})})}i["default"].prototype.axios=G.a,G.a.defaults.timeout=1e4,G.a.defaults.baseURL="http://dev.admin.api.zhengyi100.cn",G.a.interceptors.request.use(function(e){var t=localStorage.getItem("token");return t&&(e.headers.Authorization=t),e},function(e){return N["Message"].error("请求错误，请重试"),I.a.reject(e)}),G.a.interceptors.response.use(function(e){var t=e.config.headers.Authorization;return t&&localStorage.setItem("token",t),e.data},function(e){return e.message.includes("timeout")?N["Message"].error("网络超时，请刷新页面重试"):N["Message"].error("服务器响应错误，请重试"),I.a.reject(e)});var J={login:function(e){return H("/admin/login",e)},getCount:function(e){return H("/admin/adminCount",e)},getMessageList:function(e){return H("/admin/messageAudit",e)},getUserlist:function(e){return H("/Client/userList",e)},userStop:function(e){return H("/admin/userStop",e)},getAgentList:function(e){return H("/Agent/agentList",e)},addAgent:function(e){return H("/Agent/registAgent",e)},editAgent:function(e){return H("/Agent/agentUpdate",e)},getAdList:function(e){return H("/ads/AdsList",e)},addAd:function(e){return H("/ads/AdsAdd",e,{headers:{"Content-Type":"multipart/form-data"}})},editAd:function(e){return H("/ads/AdsEdit",e)},delAd:function(e){return H("/ads/AdsDelete",e)},getArticleList:function(e){return H("/sys_articles/SysArticlesList",e)},addArticle:function(e){return H("/sys_articles/SysArticlesAdd",e)},editArticle:function(e){return H("/sys_articles/SysArticlesEdit",e)},delArticle:function(e){return H("/sys_articles/SysArticlesDelete",e)},getSellerList:function(e){return H("/supplier/supplierList",e)},addSeller:function(e){return H("/supplier/supplierAdd",e)},editSeller:function(e){return H("/supplier/suplierUpdate",e)},delSeller:function(e){return H("/supplier/suplierDel",e)},getOrderList:function(e){return H("/orders/OrdersList",e)},delOrder:function(e){return H("/orders/OrdersDelete",e)},getGuideList:function(e){return H("/guide/showGuideList",e)},getCardList:function(e){return H("/card/cardList",e)},getPunishType:function(e){return H("/ticket/Ticket_Type",e)},getPunishList:function(e){return H("/ticket/TicketList",e)},delPunish:function(e){return H("/ticket/TicketDelete",e)},addPunish:function(e){return H("/ticket/TicketAdd",e)},editPunish:function(e){return H("/ticket/TicketEdit",e)}},K=function(e,t,n){if(!t)return n(new Error("手机号不能为空"));var r=/^1[3|4|5|7|8][0-9]\d{8}$/;if(!r.test(t))return n(new Error("请输入正确的手机号"));n()},R=function(e,t,n){if(!t)return n(new Error("身份证号码不能为空"));var r=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;if(!r.test(t))return n(new Error("请输入正确的身份证号码"));n()},X={checkPhone:K,checkId:R},Y=n("e814"),Q=n.n(Y);function V(e,t){if(!e)return"";var n=new Date((e+"").length<13?1e3*e:e),r=n.getFullYear(),a=n.getMonth()+1,i=n.getDate(),o=n.getHours(),c=n.getMinutes(),u=n.getSeconds();return t?r+"-"+W(a)+"-"+W(i)+" "+W(o)+":"+W(c)+":"+W(u):r+"-"+W(a)+"-"+W(i)}function W(e){return e<10?"0"+e:e}function Z(e){return 0==e?"未注册完全":1==e?"正常":-1==e?"禁用":void 0}function ee(e){return 0==e?"女":1==e?"男":"未知"}function te(e){switch(e){case"1":return"代付款";case"2":return"代发货";case"3":return"已发货";case"4":return"退单";case"5":return"交易成功"}}function ne(e){switch(e){case"1":return"info";case"2":return"primary";case"3":return"warning";case"4":return"danger";case"5":return"success"}}function re(e,t){e=e||[],t=t||[];for(var n=0;n<e.length;n++)e[n]instanceof Array?(t[n]=[],re(e[n],t[n])):t[n]=e[n];return t}function ae(e,t,n){if(console.log(e),n%t===1&&1!=e){var r=Q()(n/t)+1;return e>=r?e-1:e}return e}var ie={formatTimeStamp:V,userStatus:Z,sexStatus:ee,copyArray:re,orderStatus:te,payStatus:ne,pagination:ae},oe=n("9dac"),ce={install:function(e){e.component("upload",oe["a"])}},ue=ce;i["default"].use(z.a),i["default"].prototype.$api=J,i["default"].prototype.$rules=X,i["default"].config.productionTip=!1,a()(ie).forEach(function(e){return i["default"].filter(e,ie[e])}),i["default"].use(ue),new i["default"]({router:$,store:q,render:function(e){return e(f)}}).$mount("#app")},"64a9":function(e,t,n){},"9dac":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload"},[n("el-upload",{attrs:{action:e.action,accept:"image/jpeg,image/gif,image/png,image/bmp",multiple:1!=e.num,"before-upload":e.beforeAvatarUpload,limit:e.num,"show-file-list":!1,"on-success":e.handleAvatarSuccess}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),n("div",{staticClass:"preview"},e._l(e.imgList,function(t,r){return n("div",{key:r,staticClass:"box",style:"width:"+e.width+"px;height:"+e.height+"px"},[n("img",{attrs:{src:t}}),n("div",{staticClass:"model"},[n("i",{staticClass:"el-icon-delete",attrs:{title:"删除"},on:{click:function(t){return e.del(r)}}})])])}),0)],1)},a=[],i=(n("7f7f"),{name:"upload",props:{imgList:{required:!0},width:{default:50},height:{default:50},action:{default:"http://47.110.67.134:9002/common/upload"},num:{default:9}},data:function(){return{}},components:{},methods:{beforeAvatarUpload:function(e){},handleAvatarSuccess:function(e,t,n){console.log(e),e.code?this.$message.info("已为你自动过滤不符合要求的图片"):1==this.num?this.imgList=e.data.host+e.data.name:this.imgList.push(e.data.host+e.data.name)},del:function(e){1==this.num?this.imgList="":this.imgList.splice(e,1)}}}),o=i,c=(n("3bda"),n("2877")),u=Object(c["a"])(o,r,a,!1,null,"f186b6da",null);t["a"]=u.exports}});
//# sourceMappingURL=app.37dd9f73.js.map