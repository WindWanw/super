(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dataStatistics"],{"11e9":function(t,s,e){var a=e("52a7"),i=e("4630"),r=e("6821"),n=e("6a99"),c=e("69a8"),o=e("c69a"),l=Object.getOwnPropertyDescriptor;s.f=e("9e1e")?l:function(t,s){if(t=r(t),s=n(s,!0),o)try{return l(t,s)}catch(e){}if(c(t,s))return i(!a.f.call(t,s),t[s])}},"2dec":function(t,s,e){"use strict";var a=e("f461"),i=e.n(a);i.a},"5dbc":function(t,s,e){var a=e("d3f4"),i=e("8b97").set;t.exports=function(t,s,e){var r,n=s.constructor;return n!==e&&"function"==typeof n&&(r=n.prototype)!==e.prototype&&a(r)&&i&&i(t,r),t}},"63da":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return""!=t.total?e("div",{staticClass:"dataStatistics"},[e("div",{staticClass:"total_wrap"},[e("div",{staticClass:"title"},[t._v("总计")]),e("div",{staticClass:"total"},[e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont yonghu3"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总用户数")]),e("p",[t._v("\n            "+t._s(t.total.userCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont yonghu5"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总专引师数")]),e("p",[t._v("\n            "+t._s(t.total.guideCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item",on:{click:t.toCitySupplier}},[e("i",{staticClass:"iconfont dailishang"}),e("div",{staticClass:"item_right"},[e("p",[t._v("代理商数")]),e("p",[t._v("\n            "+t._s(t.total.agentCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont dianpu1"}),e("div",{staticClass:"item_right"},[e("p",[t._v("商家数")]),e("p",[t._v("\n            "+t._s(t.total.supplierCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont shouru2"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总金额")]),e("p",[t._v("￥"+t._s(t.total.amount))])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont porders"}),e("div",{staticClass:"item_right"},[e("p",[t._v("进账")]),e("p",[t._v("￥"+t._s(t.pallTotal))])])])]),e("div",[e("div",{staticClass:"progress-box"},[e("div",{staticClass:"time"},[e("el-tag",[t._v("昨天进账(￥"+t._s(t.ptotal.yestoday)+")")]),e("div")],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentDay}})],1)]),e("div",{staticClass:"progress-box"},[e("div",{staticClass:"time"},[e("el-tag",[t._v("上周进账(￥"+t._s(t.ptotal.lastWk)+")")])],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentWk}})],1)])]),e("el-card",{staticClass:"box-card"},[e("div",[t._v("\n        优惠券送出总额: "),e("b",[t._v("￥"+t._s(t.total.cards.total))])])]),e("div",[e("div",{staticClass:"progress-box"},[e("div",{staticClass:"time"},[e("el-tag",[t._v("已使用(￥"+t._s(t.total.cards.isPay)+")")]),e("div")],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentPay}})],1)]),e("div",{staticClass:"progress-box"},[e("div",{staticClass:"time"},[e("el-tag",[t._v("未使用(￥"+t._s(t.total.cards.unUse)+")")])],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.percentUnUse}})],1)])])],1),e("div",{staticClass:"message_info"},[e("div",{staticClass:"title"},[t._v("消息中心")]),t._l(t.messageList,function(s,a){return e("div",{key:a,staticClass:"info"},[e("div",{staticClass:"info_text"},[t._v(t._s(a+1)+"."+t._s(s.title))]),e("div",{staticClass:"info_date"},[t._v(t._s(t._f("formatTimeStamp")(s.times)))]),e("el-badge",{staticClass:"mark",attrs:{value:s.count}})],1)})],2)]):t._e()},i=[],r=(e("c5f6"),{data:function(){return{total:"",messageList:[],ptotal:"",pallTotal:"",percentDay:0,percentWk:0,percentPay:0,percentUnUse:0}},components:{},methods:{getTotal:function(){var t=this;this.$api.getCount().then(function(s){t.total=s.data,t.ptotal=s.data.pOrder,t.pallTotal=s.data.pOrder.total,t.percentDay=Number(s.data.pOrder.percentDay),t.percentWk=Number(s.data.pOrder.percentWk),t.percentPay=Number(s.data.cards.percentPay),t.percentUnUse=Number(s.data.cards.percentUnUse)})},getMessageList:function(){var t=this;this.$api.getMessageList().then(function(s){t.messageList=s.data||[]})},toCitySupplier:function(){this.$router.push({path:"/citySupplier"})}},created:function(){this.getTotal(),this.getMessageList()}}),n=r,c=(e("2dec"),e("2877")),o=Object(c["a"])(n,a,i,!1,null,"d39d5584",null);s["default"]=o.exports},"8b97":function(t,s,e){var a=e("d3f4"),i=e("cb7c"),r=function(t,s){if(i(t),!a(s)&&null!==s)throw TypeError(s+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,s,a){try{a=e("9b43")(Function.call,e("11e9").f(Object.prototype,"__proto__").set,2),a(t,[]),s=!(t instanceof Array)}catch(i){s=!0}return function(t,e){return r(t,e),s?t.__proto__=e:a(t,e),t}}({},!1):void 0),check:r}},9093:function(t,s,e){var a=e("ce10"),i=e("e11e").concat("length","prototype");s.f=Object.getOwnPropertyNames||function(t){return a(t,i)}},aa77:function(t,s,e){var a=e("5ca1"),i=e("be13"),r=e("79e5"),n=e("fdef"),c="["+n+"]",o="​",l=RegExp("^"+c+c+"*"),p=RegExp(c+c+"*$"),d=function(t,s,e){var i={},c=r(function(){return!!n[t]()||o[t]()!=o}),l=i[t]=c?s(u):n[t];e&&(i[e]=l),a(a.P+a.F*c,"String",i)},u=d.trim=function(t,s){return t=String(i(t)),1&s&&(t=t.replace(l,"")),2&s&&(t=t.replace(p,"")),t};t.exports=d},c5f6:function(t,s,e){"use strict";var a=e("7726"),i=e("69a8"),r=e("2d95"),n=e("5dbc"),c=e("6a99"),o=e("79e5"),l=e("9093").f,p=e("11e9").f,d=e("86cc").f,u=e("aa77").trim,f="Number",v=a[f],_=v,g=v.prototype,C=r(e("2aeb")(g))==f,h="trim"in String.prototype,m=function(t){var s=c(t,!1);if("string"==typeof s&&s.length>2){s=h?s.trim():u(s,3);var e,a,i,r=s.charCodeAt(0);if(43===r||45===r){if(e=s.charCodeAt(2),88===e||120===e)return NaN}else if(48===r){switch(s.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+s}for(var n,o=s.slice(2),l=0,p=o.length;l<p;l++)if(n=o.charCodeAt(l),n<48||n>i)return NaN;return parseInt(o,a)}}return+s};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var s=arguments.length<1?0:t,e=this;return e instanceof v&&(C?o(function(){g.valueOf.call(e)}):r(e)!=f)?n(new _(m(s)),e,v):m(s)};for(var y,b=e("9e1e")?l(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;b.length>N;N++)i(_,y=b[N])&&!i(v,y)&&d(v,y,p(_,y));v.prototype=g,g.constructor=v,e("2aba")(a,f,v)}},f461:function(t,s,e){},fdef:function(t,s){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=dataStatistics.e67831df.js.map