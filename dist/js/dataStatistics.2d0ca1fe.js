(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dataStatistics"],{"11e9":function(t,e,s){var a=s("52a7"),i=s("4630"),r=s("6821"),n=s("6a99"),c=s("69a8"),o=s("c69a"),p=Object.getOwnPropertyDescriptor;e.f=s("9e1e")?p:function(t,e){if(t=r(t),e=n(e,!0),o)try{return p(t,e)}catch(s){}if(c(t,e))return i(!a.f.call(t,e),t[e])}},"5dbc":function(t,e,s){var a=s("d3f4"),i=s("8b97").set;t.exports=function(t,e,s){var r,n=e.constructor;return n!==s&&"function"==typeof n&&(r=n.prototype)!==s.prototype&&a(r)&&i&&i(t,r),t}},"63da":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return""!=t.total?s("div",{staticClass:"dataStatistics"},[s("div",{staticClass:"total_wrap"},[s("div",{staticClass:"title"},[t._v("总计")]),s("div",{staticClass:"total"},[s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont yonghu3"}),s("div",{staticClass:"item_right"},[s("p",[t._v("总用户数")]),s("p",[t._v("\n            "+t._s(t.total.userCount)+"\n            "),s("span",[t._v("个")])])])]),s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont yonghu5"}),s("div",{staticClass:"item_right"},[s("p",[t._v("总专引师数")]),s("p",[t._v("\n            "+t._s(t.total.guideCount)+"\n            "),s("span",[t._v("个")])])])]),s("div",{staticClass:"item",on:{click:t.toCitySupplier}},[s("i",{staticClass:"iconfont dailishang"}),s("div",{staticClass:"item_right"},[s("p",[t._v("代理商数")]),s("p",[t._v("\n            "+t._s(t.total.agentCount)+"\n            "),s("span",[t._v("个")])])])]),s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont dianpu1"}),s("div",{staticClass:"item_right"},[s("p",[t._v("商家数")]),s("p",[t._v("\n            "+t._s(t.total.supplierCount)+"\n            "),s("span",[t._v("个")])])])]),s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont shouru2"}),s("div",{staticClass:"item_right"},[s("p",[t._v("总收入金额")]),s("p",[t._v("￥"+t._s(t.total.amount))])])]),s("div",{staticClass:"item"},[s("i",{staticClass:"iconfont porders"}),s("div",{staticClass:"item_right"},[s("p",[t._v("进账")]),s("p",[t._v("￥"+t._s(t.pallTotal))])])])]),s("div",[s("div",{staticClass:"progress-box"},[s("div",{staticClass:"time"},[s("el-tag",[t._v("昨天进账(￥"+t._s(t.ptotal.yestoday)+")")]),s("div")],1),s("div",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentDay}})],1)]),s("div",{staticClass:"progress-box"},[s("div",{staticClass:"time"},[s("el-tag",[t._v("上周进账(￥"+t._s(t.ptotal.lastWk)+")")])],1),s("div",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentWk}})],1)])]),s("el-card",{staticClass:"box-card"},[s("div",[t._v("\n        优惠券送出总额: "),s("b",[t._v("￥"+t._s(t.total.cards.total))])])]),s("div",[s("div",{staticClass:"progress-box"},[s("div",{staticClass:"time"},[s("el-tag",[t._v("已使用(￥"+t._s(t.total.cards.isPay)+")")]),s("div")],1),s("div",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentPay}})],1)]),s("div",{staticClass:"progress-box"},[s("div",{staticClass:"time"},[s("el-tag",[t._v("未使用(￥"+t._s(t.total.cards.unUse)+")")])],1),s("div",{staticClass:"progress"},[s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentUnUse}})],1)])])],1)]):t._e()},i=[],r=(s("c5f6"),{data:function(){return{total:"",messageList:[],ptotal:"",pallTotal:"",percentDay:0,percentWk:0,percentPay:0,percentUnUse:0}},components:{},methods:{getTotal:function(){var t=this;this.$api.getCount().then(function(e){t.total=e.data,t.ptotal=e.data.pOrder,t.pallTotal=e.data.pOrder.total,t.percentDay=Number(e.data.pOrder.percentDay),t.percentWk=Number(e.data.pOrder.percentWk),t.percentPay=Number(e.data.cards.percentPay),t.percentUnUse=Number(e.data.cards.percentUnUse)})},getMessageList:function(){var t=this;this.$api.getMessageList().then(function(e){t.messageList=e.data||[]})},toCitySupplier:function(){this.$router.push({path:"/citySupplier"})}},created:function(){this.getTotal(),this.getMessageList()}}),n=r,c=(s("9eee"),s("2877")),o=Object(c["a"])(n,a,i,!1,null,"40f5bc4c",null);e["default"]=o.exports},"8b97":function(t,e,s){var a=s("d3f4"),i=s("cb7c"),r=function(t,e){if(i(t),!a(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,a){try{a=s("9b43")(Function.call,s("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,s){return r(t,s),e?t.__proto__=s:a(t,s),t}}({},!1):void 0),check:r}},9093:function(t,e,s){var a=s("ce10"),i=s("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return a(t,i)}},"9eee":function(t,e,s){"use strict";var a=s("a9f7"),i=s.n(a);i.a},a9f7:function(t,e,s){},aa77:function(t,e,s){var a=s("5ca1"),i=s("be13"),r=s("79e5"),n=s("fdef"),c="["+n+"]",o="​",p=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),u=function(t,e,s){var i={},c=r(function(){return!!n[t]()||o[t]()!=o}),p=i[t]=c?e(d):n[t];s&&(i[s]=p),a(a.P+a.F*c,"String",i)},d=u.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(p,"")),2&e&&(t=t.replace(l,"")),t};t.exports=u},c5f6:function(t,e,s){"use strict";var a=s("7726"),i=s("69a8"),r=s("2d95"),n=s("5dbc"),c=s("6a99"),o=s("79e5"),p=s("9093").f,l=s("11e9").f,u=s("86cc").f,d=s("aa77").trim,f="Number",v=a[f],_=v,g=v.prototype,C=r(s("2aeb")(g))==f,h="trim"in String.prototype,y=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){e=h?e.trim():d(e,3);var s,a,i,r=e.charCodeAt(0);if(43===r||45===r){if(s=e.charCodeAt(2),88===s||120===s)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+e}for(var n,o=e.slice(2),p=0,l=o.length;p<l;p++)if(n=o.charCodeAt(p),n<48||n>i)return NaN;return parseInt(o,a)}}return+e};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof v&&(C?o(function(){g.valueOf.call(s)}):r(s)!=f)?n(new _(y(e)),s,v):y(e)};for(var m,b=s("9e1e")?p(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;b.length>N;N++)i(_,m=b[N])&&!i(v,m)&&u(v,m,l(_,m));v.prototype=g,g.constructor=v,s("2aba")(a,f,v)}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=dataStatistics.2d0ca1fe.js.map