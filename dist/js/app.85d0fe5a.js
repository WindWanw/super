(function(e){function n(n){for(var r,a,c=n[0],s=n[1],u=n[2],l=0,d=[];l<c.length;l++)a=c[l],i[a]&&d.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(n);while(d.length)d.shift()();return o.push.apply(o,u||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==i[c]&&(r=!1)}r&&(o.splice(n--,1),e=s(s.s=t[0]))}return e}var r={},a={app:0},i={app:0},o=[];function c(e){return s.p+"js/"+({404:"404","ad~agent~seller":"ad~agent~seller",ad:"ad",agent:"agent","order~seller":"order~seller",seller:"seller",agentMenage:"agentMenage",agentSh:"agentSh",card:"card",checkMenage:"checkMenage",dataStatistics:"dataStatistics",home:"home",login:"login",order:"order",punish:"punish",sellerMenage:"sellerMenage",sellerSh:"sellerSh",systenArticle:"systenArticle",teacher:"teacher",teacherSh:"teacherSh",userList:"userList"}[e]||e)+"."+{404:"5a0fa0eb","ad~agent~seller":"4e86c92e",ad:"140a2988",agent:"2599ccf6","order~seller":"4b6b87b4",seller:"52ed0e87",agentMenage:"69aff6e5",agentSh:"c45f1af6",card:"e6fa9d07",checkMenage:"36505990",dataStatistics:"a29017a2",home:"63310ae5",login:"6239caf9",order:"c1a8a772",punish:"5c1c33f1",sellerMenage:"7ab8cbae",sellerSh:"e7a54f75",systenArticle:"055d36fd",teacher:"efd874b4",teacherSh:"0a0b2b9c",userList:"c6cf5b95"}[e]+".js"}function s(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={ad:1,agent:1,seller:1,agentSh:1,card:1,dataStatistics:1,home:1,login:1,order:1,punish:1,sellerSh:1,systenArticle:1,teacher:1,teacherSh:1,userList:1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise(function(n,t){for(var r="css/"+({404:"404","ad~agent~seller":"ad~agent~seller",ad:"ad",agent:"agent","order~seller":"order~seller",seller:"seller",agentMenage:"agentMenage",agentSh:"agentSh",card:"card",checkMenage:"checkMenage",dataStatistics:"dataStatistics",home:"home",login:"login",order:"order",punish:"punish",sellerMenage:"sellerMenage",sellerSh:"sellerSh",systenArticle:"systenArticle",teacher:"teacher",teacherSh:"teacherSh",userList:"userList"}[e]||e)+"."+{404:"31d6cfe0","ad~agent~seller":"31d6cfe0",ad:"b357d096",agent:"587c2650","order~seller":"31d6cfe0",seller:"0b7d570c",agentMenage:"31d6cfe0",agentSh:"50f52b65",card:"59bfbc23",checkMenage:"31d6cfe0",dataStatistics:"734de662",home:"f1860364",login:"dd726a82",order:"1cc4b7c4",punish:"6344e3c5",sellerMenage:"31d6cfe0",sellerSh:"df8a4784",systenArticle:"864869f6",teacher:"a38c04f2",teacherSh:"b26066d7",userList:"fd6c7dc1"}[e]+".css",i=s.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var u=o[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===i))return n()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===r||l===i)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),t(o)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)}).then(function(){a[e]=0}));var r=i[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(function(n,t){r=i[e]=[n,t]});n.push(r[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e),u=function(n){l.onerror=l.onload=null,clearTimeout(d);var t=i[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src,o=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");o.type=r,o.request=a,t[1](o)}i[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(n)},s.m=e,s.c=r,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)s.d(t,r,function(n){return e[n]}.bind(null,r));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=n,u=u.slice();for(var d=0;d<u.length;d++)n(u[d]);var f=l;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("64a9"),a=t.n(r);a.a},"0a29":function(e,n,t){},"3bda":function(e,n,t){"use strict";var r=t("0a29"),a=t.n(r);a.a},"56d7":function(e,n,t){"use strict";t.r(n);t("456d"),t("ac6a"),t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],o={},c=o,s=(t("034f"),t("2877")),u=Object(s["a"])(c,a,i,!1,null,null,null),l=u.exports,d=t("8c4f"),f=function(){return t.e("login").then(t.bind(null,"dd7b"))},h=function(){return t.e("404").then(t.bind(null,"8cdb"))},g=function(){return t.e("home").then(t.bind(null,"6511"))},m=function(){return t.e("dataStatistics").then(t.bind(null,"63da"))},p=function(){return t.e("userList").then(t.bind(null,"76c7"))},b=function(){return t.e("userList").then(t.bind(null,"e817"))},S=function(){return t.e("agentMenage").then(t.bind(null,"d2a7"))},L=function(){return Promise.all([t.e("ad~agent~seller"),t.e("agent")]).then(t.bind(null,"7f4e"))},y=function(){return t.e("sellerMenage").then(t.bind(null,"afc3"))},v=function(){return Promise.all([t.e("ad~agent~seller"),t.e("order~seller"),t.e("seller")]).then(t.bind(null,"05a9"))},A=function(){return t.e("checkMenage").then(t.bind(null,"69fe"))},w=function(){return t.e("agentSh").then(t.bind(null,"4e1b"))},M=function(){return t.e("sellerSh").then(t.bind(null,"8399"))},k=function(){return t.e("punish").then(t.bind(null,"c49a"))},T=function(){return t.e("teacherSh").then(t.bind(null,"f9a7"))},_=function(){return Promise.all([t.e("order~seller"),t.e("order")]).then(t.bind(null,"dbf5"))},E=function(){return t.e("teacher").then(t.bind(null,"491b"))},P=function(){return Promise.all([t.e("ad~agent~seller"),t.e("ad")]).then(t.bind(null,"42f6"))},O=function(){return t.e("systenArticle").then(t.bind(null,"a5f2"))},D=function(){return t.e("card").then(t.bind(null,"337f"))};r["default"].use(d["a"]);var j=[{path:"/dataStatistics",name:"dataStatistics",component:m,meta:{name:"数据统计",iconfont:"el-icon-loading",needLogin:!0}},{path:"/userList",name:"userList",component:p,meta:{name:"用户管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/finance",name:"finance",component:b,meta:{name:"财务中心",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage",name:"checkMenage",component:A,meta:{name:"审核管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/checkMenage/agent",children:[{path:"/checkMenage/agentSh",name:"agentSh",component:w,meta:{name:"代理商审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/sellerSh",name:"sellerSh",component:M,meta:{name:"商户审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/teacherSh",name:"teacherSh",component:T,meta:{name:"专引师审核",iconfont:"el-icon-loading",needLogin:!0}},{path:"/checkMenage/punish",name:"punish",component:k,meta:{name:"处罚单",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/agentMenage",name:"agentMenage",component:S,meta:{name:"代理商管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/agentMenage/agent",children:[{path:"/agentMenage/agent",name:"agent",component:L,meta:{name:"代理商列表",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/sellerMenage",name:"sellerMenage",component:y,meta:{name:"商户管理",iconfont:"el-icon-loading",needLogin:!0},redirect:"/sellerMenage/seller",children:[{path:"/sellerMenage/seller",name:"seller",component:v,meta:{name:"商户列表",iconfont:"el-icon-loading",needLogin:!0}}]},{path:"/order",name:"order",component:_,meta:{name:"订单管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/ad",name:"ad",component:P,meta:{name:"广告位管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/teacher",name:"teacher",component:E,meta:{name:"专引师管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/systemArticle",name:"systemArticle",component:O,meta:{name:"系统文章管理",iconfont:"el-icon-loading",needLogin:!0}},{path:"/card",name:"card",component:D,meta:{name:"代金券设置",iconfont:"el-icon-loading",needLogin:!0}}],x=new d["a"]({routes:[{path:"/",redirect:"/login"},{path:"/login",name:"登录",component:f},{path:"/home",name:"home",component:g,redirect:"/dataStatistics",children:[].concat(j)},{path:"*",component:h}]});x.beforeEach(function(e,n,t){var r=localStorage.getItem("token");e.meta.needLogin?r?t():t({path:"/login",query:{redirect:e.fullPath}}):t()});var C=x,W=(t("7f7f"),t("2f62"));r["default"].use(W["a"]);var $=new W["a"].Store({state:{menuList:[],asideList:j},getters:{menuList:function(e){return e.menuList},asideList:function(e){return e.asideList}},mutations:{ADD_TAB:function(e,n){e.menuList.some(function(e){return e.path===n.path})||e.menuList.push({name:n.meta.name,path:n.path})},DEL_TAB:function(e,n){e.menuList.forEach(function(t){t.path===n.path&&e.menuList.splice(e.menuList.indexOf(t),1)})},SET_ASIDE_LIST:function(e,n){}},actions:{addTab:function(e,n){e.commit("ADD_TAB",n)},delTab:function(e,n){return new Promise(function(t,r){e.commit("DEL_TAB",n),t(e.state.menuList)})}}}),I=t("5c96"),q=t.n(I),B=(t("0fae"),t("6762"),t("2fdb"),t("bc3a")),U=t.n(B);function N(e,n,t){return new Promise(function(r,a){U.a.post(e,n,t).then(function(e){r(e)}).catch(function(e){a(e)})})}r["default"].prototype.axios=U.a,U.a.defaults.timeout=1e4,U.a.defaults.baseURL="http://dev.admin.api.zhengyi100.cn",U.a.interceptors.request.use(function(e){var n=localStorage.getItem("token");return n&&(e.headers.Authorization=n),e},function(e){return I["Message"].error("请求错误，请重试"),Promise.reject(e)}),U.a.interceptors.response.use(function(e){var n=e.config.headers.Authorization;return n&&localStorage.setItem("token",n),e.data},function(e){return e.message.includes("timeout")?I["Message"].error("网络超时，请刷新页面重试"):I["Message"].error("服务器响应错误，请重试"),Promise.reject(e)});var z={login:function(e){return N("/admin/login",e)},getCount:function(e){return N("/admin/adminCount",e)},getMessageList:function(e){return N("/admin/messageAudit",e)},getUserlist:function(e){return N("/Client/userList",e)},userStop:function(e){return N("/admin/userStop",e)},getAgentList:function(e){return N("/Agent/agentList",e)},addAgent:function(e){return N("/Agent/registAgent",e)},editAgent:function(e){return N("/Agent/agentUpdate",e)},getAdList:function(e){return N("/ads/AdsList",e)},addAd:function(e){return N("/ads/AdsAdd",e,{headers:{"Content-Type":"multipart/form-data"}})},editAd:function(e){return N("/ads/AdsEdit",e)},delAd:function(e){return N("/ads/AdsDelete",e)},getArticleList:function(e){return N("/sys_articles/SysArticlesList",e)},addArticle:function(e){return N("/sys_articles/SysArticlesAdd",e)},editArticle:function(e){return N("/sys_articles/SysArticlesEdit",e)},delArticle:function(e){return N("/sys_articles/SysArticlesDelete",e)},getDataTypeList:function(e){return N("/sys_articles/SysArticleType",e)},getSellerList:function(e){return N("/supplier/supplierAdminList",e)},addSeller:function(e){return N("/supplier/supplierAdminAdd",e)},editSeller:function(e){return N("/supplier/supplierAdminUpdate",e)},delSeller:function(e){return N("/supplier/supplierAdminDel",e)},getOrderList:function(e){return N("/orders/OrdersList",e)},delOrder:function(e){return N("/orders/OrdersDelete",e)},getGuideList:function(e){return N("/guide/showGuideList",e)},getCardList:function(e){return N("/card/cardList",e)},getPunishType:function(e){return N("/ticket/Ticket_Type",e)},getPunishList:function(e){return N("/ticket/TicketList",e)},delPunish:function(e){return N("/ticket/TicketDelete",e)},addPunish:function(e){return N("/ticket/TicketAdd",e)},editPunish:function(e){return N("/ticket/TicketEdit",e)},getWithdrawList:function(e){return N("/finance/withdrawList",e)},passWithdraw:function(e){return N("/finance/passWithdraw",e)},blowWithdraw:function(e){return N("/finance/blowWithdraw",e)},payWithdraw:function(e){return N("/finance/payWithdraw",e)},unquaWithdraw:function(e){return N("/finance/unquaWithdraw",e)}},F=function(e,n,t){if(!n)return t(new Error("手机号不能为空"));var r=/^1[3|4|5|7|8][0-9]\d{8}$/;if(!r.test(n))return t(new Error("请输入正确的手机号"));t()},G=function(e,n,t){if(!n)return t(new Error("身份证号码不能为空"));var r=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;if(!r.test(n))return t(new Error("请输入正确的身份证号码"));t()},H={checkPhone:F,checkId:G};function J(e,n){if(!e)return"";var t=new Date((e+"").length<13?1e3*e:e),r=t.getFullYear(),a=t.getMonth()+1,i=t.getDate(),o=t.getHours(),c=t.getMinutes(),s=t.getSeconds();return n?r+"-"+K(a)+"-"+K(i)+" "+K(o)+":"+K(c)+":"+K(s):r+"-"+K(a)+"-"+K(i)}function K(e){return e<10?"0"+e:e}function R(e){return 0==e?"未注册完全":1==e?"正常":-1==e?"禁用":void 0}function X(e){return 0==e?"女":1==e?"男":"未知"}function Y(e){switch(e){case"1":return"待付款";case"2":return"待发货";case"3":return"已发货";case"4":return"退单";case"5":return"交易成功"}}function Q(e){switch(e){case"1":return"info";case"2":return"primary";case"3":return"warning";case"4":return"danger";case"5":return"success"}}function V(e,n){e=e||[],n=n||[];for(var t=0;t<e.length;t++)e[t]instanceof Array?(n[t]=[],V(e[t],n[t])):n[t]=e[t];return n}function Z(e,n,t){if(console.log(e),t%n===1&&1!=e){var r=parseInt(t/n)+1;return e>=r?e-1:e}return e}function ee(e){switch(e){case"0":return"warning";case"1":return"primary";case"2":return"success";case"3":return"danger";case"4":return"danger"}}function ne(e){switch(e){case"0":return"待审核";case"1 ":return"已审核";case"2":return"已打款";case"3":return"审核未通过";case"4":return"打款失败"}}var te={formatTimeStamp:J,userStatus:R,sexStatus:X,copyArray:V,orderStatus:Y,payStatus:Q,pagination:Z,withdrawStatus:ee,withdrawText:ne},re=t("9dac"),ae={install:function(e){e.component("upload",re["a"])}},ie=ae;r["default"].use(q.a),r["default"].prototype.$api=z,r["default"].prototype.$rules=H,r["default"].config.productionTip=!1,Object.keys(te).forEach(function(e){return r["default"].filter(e,te[e])}),r["default"].use(ie),new r["default"]({router:C,store:$,render:function(e){return e(l)}}).$mount("#app")},"64a9":function(e,n,t){},"9dac":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"upload"},[t("el-upload",{attrs:{action:e.action,accept:"image/jpeg,image/gif,image/png,image/bmp",multiple:1!=e.num,"before-upload":e.beforeAvatarUpload,limit:e.num,"show-file-list":!1,"on-success":e.handleAvatarSuccess}},[t("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),t("div",{staticClass:"preview"},e._l(e.imgList,function(n,r){return t("div",{key:r,staticClass:"box",style:"width:"+e.width+"px;height:"+e.height+"px"},[t("img",{attrs:{src:n}}),t("div",{staticClass:"model"},[t("i",{staticClass:"el-icon-delete",attrs:{title:"删除"},on:{click:function(n){return e.del(r)}}})])])}),0)],1)},a=[],i=(t("7f7f"),{name:"upload",props:{imgList:{required:!0},width:{default:50},height:{default:50},action:{default:"http://47.110.67.134:9002/common/upload"},num:{default:9}},data:function(){return{}},components:{},methods:{beforeAvatarUpload:function(e){},handleAvatarSuccess:function(e,n,t){console.log(e),e.code?this.$message.info("已为你自动过滤不符合要求的图片"):1==this.num?this.imgList=e.data.host+e.data.name:this.imgList.push(e.data.host+e.data.name)},del:function(e){1==this.num?this.imgList="":this.imgList.splice(e,1)}}}),o=i,c=(t("3bda"),t("2877")),s=Object(c["a"])(o,r,a,!1,null,"f186b6da",null);n["a"]=s.exports}});
//# sourceMappingURL=app.85d0fe5a.js.map