(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dataStatistics"],{"11e9":function(t,a,e){var s=e("52a7"),i=e("4630"),n=e("6821"),r=e("6a99"),o=e("69a8"),c=e("c69a"),l=Object.getOwnPropertyDescriptor;a.f=e("9e1e")?l:function(t,a){if(t=n(t),a=r(a,!0),c)try{return l(t,a)}catch(e){}if(o(t,a))return i(!s.f.call(t,a),t[a])}},3848:function(t,a,e){"use strict";var s=e("7073"),i=e.n(s);i.a},"5dbc":function(t,a,e){var s=e("d3f4"),i=e("8b97").set;t.exports=function(t,a,e){var n,r=a.constructor;return r!==e&&"function"==typeof r&&(n=r.prototype)!==e.prototype&&s(n)&&i&&i(t,n),t}},"63da":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return""!=t.total?e("div",{staticClass:"dataStatistics"},[e("div",{staticClass:"total_wrap"},[e("div",{staticClass:"title"},[t._v("总计")]),e("div",{staticClass:"total"},[e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont yonghu3"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总用户数")]),e("p",[t._v("\n            "+t._s(t.total.userCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont yonghu5"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总专引师数")]),e("p",[t._v("\n            "+t._s(t.total.guideCount)+"("+t._s(t.total.vestGuide)+")\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item",on:{click:t.toCitySupplier}},[e("i",{staticClass:"iconfont dailishang"}),e("div",{staticClass:"item_right"},[e("p",[t._v("代理商数")]),e("p",[t._v("\n            "+t._s(t.total.agentCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont dianpu1"}),e("div",{staticClass:"item_right"},[e("p",[t._v("商家数")]),e("p",[t._v("\n            "+t._s(t.total.supplierCount)+"\n            "),e("span",[t._v("个")])])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont shouru2"}),e("div",{staticClass:"item_right"},[e("p",[t._v("总收入金额")]),e("p",[t._v("￥"+t._s(t.total.amount))])])]),e("div",{staticClass:"item"},[e("i",{staticClass:"iconfont qian"}),e("div",{staticClass:"item_right"},[e("p",[t._v("进账")]),e("p",[t._v("￥"+t._s(t.pallTotal))])])])]),e("div",{staticClass:"title",staticStyle:{"margin-top":"20px"},attrs:{id:"title2"}},[e("div",{staticStyle:{color:"#F59E66"}},[t._v("\n        优惠券送出总额:\n        "),e("b",[t._v("￥"+t._s(t.total.cards.total))])]),e("div",{staticClass:"countTable"},[e("span",[t._v("交易额统计")]),e("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"7天"},on:{change:t.selectTable},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}},t._l(t.options,function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)]),e("div",{attrs:{id:"count"}},[e("div",{staticClass:"progress-box"},[e("div",{staticClass:"time"},[e("el-tag",{attrs:{type:"success"}},[t._v("已使用(￥"+t._s(t.total.cards.isPay)+")")])],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{type:"circle",width:t.width,color:"#67C23A",percentage:t.percentPay}})],1),e("div",{staticClass:"time"},[e("el-tag",{attrs:{type:"warning"}},[t._v("未使用(￥"+t._s(t.total.cards.unUse)+")")])],1),e("div",{staticClass:"progress"},[e("el-progress",{attrs:{type:"circle",width:t.width,color:"#F59E66",percentage:t.percentUnUse}})],1)]),e("div",[e("ve-line",{attrs:{data:t.chartData}})],1)])])]):t._e()},i=[],n=(e("c5f6"),{data:function(){return{total:"",messageList:[],ptotal:"",pallTotal:"",percentDay:0,percentWk:0,percentPay:0,percentUnUse:0,width:200,chartData:{columns:["name","交易额"],rows:[]},num:7,options:[{value:"12",label:"12个月"},{value:"6",label:"6个月"},{value:"30",label:"30天"},{value:"7",label:"7天"}],value:""}},components:{},methods:{getTotal:function(){var t=this;this.$api.getCount().then(function(a){t.total=a.data,t.ptotal=a.data.pOrder,t.pallTotal=a.data.pOrder.total,t.percentDay=Number(a.data.pOrder.percentDay),t.percentWk=Number(a.data.pOrder.percentWk),t.percentPay=Number(a.data.cards.percentPay),t.percentUnUse=Number(a.data.cards.percentUnUse)})},getMessageList:function(){var t=this;this.$api.getMessageList().then(function(a){a.code||(t.$notify({title:"注意",message:a.data.message,iconClass:"iconfont ic_wait",onClick:t.toVestOrder(),onClose:t.toVestOrder(),duration:0}),t.$notify.close(),t.toVestOrder())})},toVestOrder:function(){console.log(12)},toCitySupplier:function(){this.$router.push({path:"/citySupplier"})},countDatas:function(){var t=this;this.$api.countDatas({num:this.num}).then(function(a){t.chartData.rows=a.data||[]})},selectTable:function(t){var a=this;this.$api.countDatas({num:t}).then(function(t){a.chartData.rows=t.data||[]})}},created:function(){this.getTotal(),this.getMessageList(),this.countDatas()}}),r=n,o=(e("3848"),e("2877")),c=Object(o["a"])(r,s,i,!1,null,"77ada069",null);a["default"]=c.exports},7073:function(t,a,e){},"8b97":function(t,a,e){var s=e("d3f4"),i=e("cb7c"),n=function(t,a){if(i(t),!s(a)&&null!==a)throw TypeError(a+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,a,s){try{s=e("9b43")(Function.call,e("11e9").f(Object.prototype,"__proto__").set,2),s(t,[]),a=!(t instanceof Array)}catch(i){a=!0}return function(t,e){return n(t,e),a?t.__proto__=e:s(t,e),t}}({},!1):void 0),check:n}},9093:function(t,a,e){var s=e("ce10"),i=e("e11e").concat("length","prototype");a.f=Object.getOwnPropertyNames||function(t){return s(t,i)}},aa77:function(t,a,e){var s=e("5ca1"),i=e("be13"),n=e("79e5"),r=e("fdef"),o="["+r+"]",c="​",l=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),p=function(t,a,e){var i={},o=n(function(){return!!r[t]()||c[t]()!=c}),l=i[t]=o?a(d):r[t];e&&(i[e]=l),s(s.P+s.F*o,"String",i)},d=p.trim=function(t,a){return t=String(i(t)),1&a&&(t=t.replace(l,"")),2&a&&(t=t.replace(u,"")),t};t.exports=p},c5f6:function(t,a,e){"use strict";var s=e("7726"),i=e("69a8"),n=e("2d95"),r=e("5dbc"),o=e("6a99"),c=e("79e5"),l=e("9093").f,u=e("11e9").f,p=e("86cc").f,d=e("aa77").trim,f="Number",v=s[f],_=v,h=v.prototype,g=n(e("2aeb")(h))==f,C="trim"in String.prototype,m=function(t){var a=o(t,!1);if("string"==typeof a&&a.length>2){a=C?a.trim():d(a,3);var e,s,i,n=a.charCodeAt(0);if(43===n||45===n){if(e=a.charCodeAt(2),88===e||120===e)return NaN}else if(48===n){switch(a.charCodeAt(1)){case 66:case 98:s=2,i=49;break;case 79:case 111:s=8,i=55;break;default:return+a}for(var r,c=a.slice(2),l=0,u=c.length;l<u;l++)if(r=c.charCodeAt(l),r<48||r>i)return NaN;return parseInt(c,s)}}return+a};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var a=arguments.length<1?0:t,e=this;return e instanceof v&&(g?c(function(){h.valueOf.call(e)}):n(e)!=f)?r(new _(m(a)),e,v):m(a)};for(var y,b=e("9e1e")?l(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;b.length>N;N++)i(_,y=b[N])&&!i(v,y)&&p(v,y,u(_,y));v.prototype=h,h.constructor=v,e("2aba")(s,f,v)}},fdef:function(t,a){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=dataStatistics.2e6e658c.js.map