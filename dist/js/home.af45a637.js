(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"02f4":function(e,t,n){var r=n("4588"),i=n("be13");e.exports=function(e){return function(t,n){var a,o,c=String(i(t)),s=r(n),l=c.length;return s<0||s>=l?e?"":void 0:(a=c.charCodeAt(s),a<55296||a>56319||s+1===l||(o=c.charCodeAt(s+1))<56320||o>57343?e?c.charAt(s):a:e?c.slice(s,s+2):o-56320+(a-55296<<10)+65536)}}},"0390":function(e,t,n){"use strict";var r=n("02f4")(!0);e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"0546":function(e,t,n){},"06db":function(e,t,n){"use strict";var r=n("23c6"),i={};i[n("2b4c")("toStringTag")]="z",i+""!="[object z]"&&n("2aba")(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},"0bfb":function(e,t,n){"use strict";var r=n("cb7c");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"11e9":function(e,t,n){var r=n("52a7"),i=n("4630"),a=n("6821"),o=n("6a99"),c=n("69a8"),s=n("c69a"),l=Object.getOwnPropertyDescriptor;t.f=n("9e1e")?l:function(e,t){if(e=a(e),t=o(t,!0),s)try{return l(e,t)}catch(n){}if(c(e,t))return i(!r.f.call(e,t),e[t])}},"214f":function(e,t,n){"use strict";n("b0c5");var r=n("2aba"),i=n("32e9"),a=n("79e5"),o=n("be13"),c=n("2b4c"),s=n("520a"),l=c("species"),u=!a(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),p=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var f=c(e),d=!a(function(){var t={};return t[f]=function(){return 7},7!=""[e](t)}),h=d?!a(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[l]=function(){return n}),n[f](""),!t}):void 0;if(!d||!h||"replace"===e&&!u||"split"===e&&!p){var m=/./[f],b=n(o,f,""[e],function(e,t,n,r,i){return t.exec===s?d&&!i?{done:!0,value:m.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),g=b[0],v=b[1];r(String.prototype,e,g),i(RegExp.prototype,f,2==t?function(e,t){return v.call(e,this,t)}:function(e){return v.call(e,this)})}}},3004:function(e,t,n){"use strict";var r=n("0546"),i=n.n(r);i.a},3846:function(e,t,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},3898:function(e,t,n){"use strict";var r=n("f1ba"),i=n.n(r);i.a},"3b2b":function(e,t,n){var r=n("7726"),i=n("5dbc"),a=n("86cc").f,o=n("9093").f,c=n("aae3"),s=n("0bfb"),l=r.RegExp,u=l,p=l.prototype,f=/a/g,d=/a/g,h=new l(f)!==f;if(n("9e1e")&&(!h||n("79e5")(function(){return d[n("2b4c")("match")]=!1,l(f)!=f||l(d)==d||"/a/i"!=l(f,"i")}))){l=function(e,t){var n=this instanceof l,r=c(e),a=void 0===t;return!n&&r&&e.constructor===l&&a?e:i(h?new u(r&&!a?e.source:e,t):u((r=e instanceof l)?e.source:e,r&&a?s.call(e):t),n?this:p,l)};for(var m=function(e){e in l||a(l,e,{configurable:!0,get:function(){return u[e]},set:function(t){u[e]=t}})},b=o(u),g=0;b.length>g;)m(b[g++]);p.constructor=l,l.prototype=p,n("2aba")(r,"RegExp",l)}n("7a56")("RegExp")},"4c7e":function(e,t,n){"use strict";var r=n("93f3"),i=n.n(r);i.a},"520a":function(e,t,n){"use strict";var r=n("0bfb"),i=RegExp.prototype.exec,a=String.prototype.replace,o=i,c="lastIndex",s=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e[c]||0!==t[c]}(),l=void 0!==/()??/.exec("")[1],u=s||l;u&&(o=function(e){var t,n,o,u,p=this;return l&&(n=new RegExp("^"+p.source+"$(?!\\s)",r.call(p))),s&&(t=p[c]),o=i.call(p,e),s&&o&&(p[c]=p.global?o.index+o[0].length:t),l&&o&&o.length>1&&a.call(o[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)}),o}),e.exports=o},"5dbc":function(e,t,n){var r=n("d3f4"),i=n("8b97").set;e.exports=function(e,t,n){var a,o=t.constructor;return o!==n&&"function"==typeof o&&(a=o.prototype)!==n.prototype&&r(a)&&i&&i(e,a),e}},"5f1b":function(e,t,n){"use strict";var r=n("23c6"),i=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var a=n.call(e,t);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},6511:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("div",{attrs:{id:"header"}},[n("Header",{on:{changeCollapse:e.changeCollapse}})],1),n("div",{attrs:{id:"main"}},[n("div",{attrs:{id:"aside"}},[n("Aside",{attrs:{collapse:e.collapse}})],1),n("div",{attrs:{id:"content"}},[n("div",{attrs:{id:"content_menu"}},[n("Menu")],1),n("div",{attrs:{id:"content_main"}},[n("router-view")],1)])])])},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header theme-bg-blue"},[n("div",{staticClass:"left"},[n("div",{staticClass:"logo"},[e._v("正意总平台")]),n("i",{staticClass:"iconfont mulu",attrs:{title:"收起/展开"},on:{click:function(t){return e.$emit("changeCollapse")}}})]),n("div",{staticClass:"right"},[n("theme-picker"),n("i",{staticClass:"iconfont zhanghao"}),n("span",{staticClass:"username"},[e._v(e._s(e.username))]),n("i",{staticClass:"iconfont dengchu",attrs:{title:"注销登录"},on:{click:e.loginout}})],1)])},o=[],c=(n("a481"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-color-picker",{staticClass:"theme-picker",attrs:{title:"选择主题色",size:"small",predefine:e.predefineColors,"popper-class":"theme-picker-dropdown"},model:{value:e.theme,callback:function(t){e.theme=t},expression:"theme"}})}),s=[],l=(n("c5f6"),n("6b54"),n("06db"),n("e814")),u=n.n(l),p=(n("3b2b"),n("f6f8").version),f="#409EFF",d={data:function(){return{chalk:"",predefineColors:["#409EFF","#fa541c","#fa8c16","#faad14","#fadb14","#a0d911","#44B549","#13c2c2","#1890ff","#2f54eb","#722ed1","#eb2f96","#f5222d","#545c64"],theme:f}},watch:{theme:function(e,t){var n=this;if("string"===typeof e){var r=this.getThemeCluster(e.replace("#","")),i=this.getThemeCluster(t.replace("#","")),a=function(e,t){return function(){var i=n.getThemeCluster(f.replace("#","")),a=n.updateStyle(n[e],i,r),o=document.getElementById(t);o||(o=document.createElement("style"),o.setAttribute("id",t),document.head.appendChild(o)),o.innerText=a}},o=a("chalk","chalk-style");if(this.chalk)o();else{var c="https://unpkg.com/element-ui@".concat(p,"/lib/theme-chalk/index.css");this.getCSSString(c,o,"chalk")}var s=[].slice.call(document.querySelectorAll("style")).filter(function(e){var n=e.innerText;return new RegExp(t,"i").test(n)&&!/Chalk Variables/.test(n)});s.forEach(function(e){var t=e.innerText;"string"===typeof t&&(e.innerText=n.updateStyle(t,i,r))}),localStorage.setItem("user-theme",e)}}},methods:{updateStyle:function(e,t,n){var r=e;return t.forEach(function(e,t){r=r.replace(new RegExp(e,"ig"),n[t])}),r},getCSSString:function(e,t,n){var r=this,i=new XMLHttpRequest;i.onreadystatechange=function(){4===i.readyState&&200===i.status&&(r[n]=i.responseText.replace(/@font-face{[^}]+}/,""),t())},i.open("GET",e),i.send()},getThemeCluster:function(e){for(var t=function(e,t){var n=u()(e.slice(0,2),16),r=u()(e.slice(2,4),16),i=u()(e.slice(4,6),16);return 0===t?[n,r,i].join(","):(n+=Math.round(t*(255-n)),r+=Math.round(t*(255-r)),i+=Math.round(t*(255-i)),n=n.toString(16),r=r.toString(16),i=i.toString(16),"#".concat(n).concat(r).concat(i))},n=function(e,t){var n=u()(e.slice(0,2),16),r=u()(e.slice(2,4),16),i=u()(e.slice(4,6),16);return n=Math.round((1-t)*n),r=Math.round((1-t)*r),i=Math.round((1-t)*i),n=n.toString(16),r=r.toString(16),i=i.toString(16),"#".concat(n).concat(r).concat(i)},r=[e],i=0;i<=9;i++)r.push(t(e,Number((i/10).toFixed(2))));return r.push(n(e,.1)),r}},mounted:function(){var e=localStorage.getItem("user-theme")||f;this.theme=e}},h=d,m=(n("4c7e"),n("2877")),b=Object(m["a"])(h,c,s,!1,null,null,null),g=b.exports,v={data:function(){return{username:JSON.parse(localStorage.getItem("userinfo")).username||""}},computed:{},components:{ThemePicker:g},methods:{loginout:function(){this.$router.replace("/login"),localStorage.clear("token"),localStorage.clear("userinfo")}}},k=v,x=(n("3004"),Object(m["a"])(k,a,o,!1,null,null,null)),y=x.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.active,router:!0,"unique-opened":"",collapse:e.collapse}},[e._l(e.asideList,function(t){return[t.children&&t.children.length?n("el-submenu",{key:t.path,attrs:{index:t.path}},[n("template",{slot:"title"},[n("i",{class:t.meta.iconfont}),n("span",[e._v(e._s(t.meta.name))])]),e._l(t.children,function(t){return[t.children&&t.children.length?n("el-submenu",{key:t.path,attrs:{index:t.path}},[n("template",{slot:"title"},[n("i",{class:t.meta.iconfont}),n("span",[e._v(e._s(t.meta.name))])]),e._l(t.children,function(t){return n("el-menu-item",{key:t.path,attrs:{index:t.path}},[n("i",{class:t.meta.iconfont}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.meta.name))])])})],2):n("el-menu-item",{key:t.path,attrs:{index:t.path}},[n("i",{class:t.meta.iconfont}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.meta.name))])])]})],2):n("el-menu-item",{key:t.path,attrs:{index:t.path}},[n("i",{class:t.meta.iconfont}),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.meta.name))])])]})],2)},E=[],w={props:["collapse"],data:function(){return{active:this.$route.path}},computed:{asideList:function(){return this.$store.getters.asideList}},watch:{$route:function(e,t){this.active=this.$route.path}},components:{},created:function(){this.active=this.$route.path}},j=w,S=(n("3898"),Object(m["a"])(j,_,E,!1,null,null,null)),C=S.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu"},e._l(e.menuList,function(t,r){return n("router-link",{key:r,staticClass:"href",attrs:{to:t.path}},[n("el-button",{attrs:{type:t.path==e.$route.path?"primary":"",size:"mini"}},[e._v(e._s(t.name)+"\n          "),1!=e.menuList.length?n("span",{staticClass:"el-icon-close",on:{click:function(n){return n.preventDefault(),n.stopPropagation(),e.closeTags(t)}}}):e._e()])],1)}),1)},A=[],I={data:function(){return{}},computed:{menuList:function(){return this.$store.getters.menuList}},watch:{$route:function(e,t){this.$store.dispatch("addTab",e)}},methods:{closeTags:function(e){var t=this;this.$store.dispatch("delTab",e).then(function(n){e.path==t.$route.path&&t.$router.push(n[n.length-1].path)})}},created:function(){this.$store.dispatch("addTab",this.$route)}},$=I,T=(n("80b5"),Object(m["a"])($,N,A,!1,null,null,null)),O=T.exports,R={data:function(){return{collapse:!1}},components:{Header:y,Aside:C,Menu:O},methods:{changeCollapse:function(){this.collapse=!this.collapse}}},M=R,F=(n("ee90"),Object(m["a"])(M,r,i,!1,null,null,null));t["default"]=F.exports},6628:function(e,t,n){},"6b54":function(e,t,n){"use strict";n("3846");var r=n("cb7c"),i=n("0bfb"),a=n("9e1e"),o="toString",c=/./[o],s=function(e){n("2aba")(RegExp.prototype,o,e,!0)};n("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?s(function(){var e=r(this);return"/".concat(e.source,"/","flags"in e?e.flags:!a&&e instanceof RegExp?i.call(e):void 0)}):c.name!=o&&s(function(){return c.call(this)})},"80b5":function(e,t,n){"use strict";var r=n("6628"),i=n.n(r);i.a},"8b97":function(e,t,n){var r=n("d3f4"),i=n("cb7c"),a=function(e,t){if(i(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return a(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:a}},9093:function(e,t,n){var r=n("ce10"),i=n("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},"93f3":function(e,t,n){},a481:function(e,t,n){"use strict";var r=n("cb7c"),i=n("4bf8"),a=n("9def"),o=n("4588"),c=n("0390"),s=n("5f1b"),l=Math.max,u=Math.min,p=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,h=function(e){return void 0===e?e:String(e)};n("214f")("replace",2,function(e,t,n,m){return[function(r,i){var a=e(this),o=void 0==r?void 0:r[t];return void 0!==o?o.call(r,a,i):n.call(String(a),r,i)},function(e,t){var i=m(n,e,this,t);if(i.done)return i.value;var p=r(e),f=String(this),d="function"===typeof t;d||(t=String(t));var g=p.global;if(g){var v=p.unicode;p.lastIndex=0}var k=[];while(1){var x=s(p,f);if(null===x)break;if(k.push(x),!g)break;var y=String(x[0]);""===y&&(p.lastIndex=c(f,a(p.lastIndex),v))}for(var _="",E=0,w=0;w<k.length;w++){x=k[w];for(var j=String(x[0]),S=l(u(o(x.index),f.length),0),C=[],N=1;N<x.length;N++)C.push(h(x[N]));var A=x.groups;if(d){var I=[j].concat(C,S,f);void 0!==A&&I.push(A);var $=String(t.apply(void 0,I))}else $=b(j,f,S,C,A,t);S>=E&&(_+=f.slice(E,S)+$,E=S+j.length)}return _+f.slice(E)}];function b(e,t,r,a,o,c){var s=r+e.length,l=a.length,u=d;return void 0!==o&&(o=i(o),u=f),n.call(c,u,function(n,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,r);case"'":return t.slice(s);case"<":c=o[i.slice(1,-1)];break;default:var u=+i;if(0===u)return n;if(u>l){var f=p(u/10);return 0===f?n:f<=l?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):n}c=a[u-1]}return void 0===c?"":c})}})},aa77:function(e,t,n){var r=n("5ca1"),i=n("be13"),a=n("79e5"),o=n("fdef"),c="["+o+"]",s="​",l=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),p=function(e,t,n){var i={},c=a(function(){return!!o[e]()||s[e]()!=s}),l=i[e]=c?t(f):o[e];n&&(i[n]=l),r(r.P+r.F*c,"String",i)},f=p.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(u,"")),e};e.exports=p},ace0:function(e,t,n){},b0c5:function(e,t,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},c5f6:function(e,t,n){"use strict";var r=n("7726"),i=n("69a8"),a=n("2d95"),o=n("5dbc"),c=n("6a99"),s=n("79e5"),l=n("9093").f,u=n("11e9").f,p=n("86cc").f,f=n("aa77").trim,d="Number",h=r[d],m=h,b=h.prototype,g=a(n("2aeb")(b))==d,v="trim"in String.prototype,k=function(e){var t=c(e,!1);if("string"==typeof t&&t.length>2){t=v?t.trim():f(t,3);var n,r,i,a=t.charCodeAt(0);if(43===a||45===a){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===a){switch(t.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+t}for(var o,s=t.slice(2),l=0,u=s.length;l<u;l++)if(o=s.charCodeAt(l),o<48||o>i)return NaN;return parseInt(s,r)}}return+t};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof h&&(g?s(function(){b.valueOf.call(n)}):a(n)!=d)?o(new m(k(t)),n,h):k(t)};for(var x,y=n("9e1e")?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;y.length>_;_++)i(m,x=y[_])&&!i(h,x)&&p(h,x,u(m,x));h.prototype=b,b.constructor=h,n("2aba")(r,d,h)}},ee90:function(e,t,n){"use strict";var r=n("ace0"),i=n.n(r);i.a},f1ba:function(e,t,n){},f6f8:function(e){e.exports={_args:[["element-ui@2.6.3","D:\\php\\html5\\super"]],_from:"element-ui@2.6.3",_id:"element-ui@2.6.3",_inBundle:!1,_integrity:"sha512-vV2HfFkCH8KhxunSBFLnA+/jJY3UxMMbhBjiHoO3pZOX/8OQ8QbeatAnjBFDu6dRRGb0DGERUtY2WBeVYegs/A==",_location:"/element-ui",_phantomChildren:{},_requested:{type:"version",registry:!0,raw:"element-ui@2.6.3",name:"element-ui",escapedName:"element-ui",rawSpec:"2.6.3",saveSpec:null,fetchSpec:"2.6.3"},_requiredBy:["/"],_resolved:"https://registry.npmjs.org/element-ui/-/element-ui-2.6.3.tgz",_spec:"2.6.3",_where:"D:\\php\\html5\\super",bugs:{url:"https://github.com/ElemeFE/element/issues"},dependencies:{"async-validator":"~1.8.1","babel-helper-vue-jsx-merge-props":"^2.0.0",deepmerge:"^1.2.0","normalize-wheel":"^1.0.1","resize-observer-polyfill":"^1.5.0","throttle-debounce":"^1.0.1"},description:"A Component Library for Vue.js.",devDependencies:{"@vue/component-compiler-utils":"^2.6.0",algoliasearch:"^3.24.5","babel-cli":"^6.26.0","babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-istanbul":"^4.1.1","babel-plugin-module-resolver":"^2.2.0","babel-plugin-syntax-jsx":"^6.18.0","babel-plugin-transform-vue-jsx":"^3.7.0","babel-preset-env":"^1.7.0","babel-preset-stage-2":"^6.24.1","babel-regenerator-runtime":"^6.5.0",chai:"^4.2.0",chokidar:"^1.7.0","copy-webpack-plugin":"^5.0.0",coveralls:"^3.0.3","cp-cli":"^1.0.2","cross-env":"^3.1.3","css-loader":"^2.1.0","es6-promise":"^4.0.5",eslint:"4.14.0","eslint-config-elemefe":"0.1.1","eslint-loader":"^2.0.0","eslint-plugin-html":"^4.0.1","eslint-plugin-json":"^1.2.0","file-loader":"^1.1.11","file-save":"^0.2.0",gulp:"^4.0.0","gulp-autoprefixer":"^6.0.0","gulp-cssmin":"^0.2.0","gulp-sass":"^4.0.2","highlight.js":"^9.3.0","html-webpack-plugin":"^3.2.0","json-loader":"^0.5.7","json-templater":"^1.0.4",karma:"^4.0.1","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.2","karma-mocha":"^1.3.0","karma-sinon-chai":"^2.0.2","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"^0.0.32","karma-webpack":"^3.0.5","markdown-it":"^8.4.1","markdown-it-anchor":"^5.0.2","markdown-it-chain":"^1.3.0","markdown-it-container":"^2.0.0","mini-css-extract-plugin":"^0.4.1",mocha:"^6.0.2","node-sass":"^4.11.0","optimize-css-assets-webpack-plugin":"^5.0.1","perspective.js":"^1.0.0",postcss:"^7.0.14","progress-bar-webpack-plugin":"^1.11.0",rimraf:"^2.5.4","sass-loader":"^7.1.0","select-version-cli":"^0.0.2",sinon:"^7.2.7","sinon-chai":"^3.3.0","style-loader":"^0.23.1",transliteration:"^1.1.11","uglifyjs-webpack-plugin":"^2.1.1",uppercamelcase:"^1.1.0","url-loader":"^1.0.1",vue:"^2.5.16","vue-loader":"^15.2.4","vue-router":"^3.0.1","vue-template-compiler":"^2.5.16","vue-template-es2015-compiler":"^1.6.0",webpack:"^4.14.0","webpack-cli":"^3.0.8","webpack-dev-server":"^3.1.11","webpack-node-externals":"^1.7.2"},faas:[{domain:"element",public:"temp_web/element"},{domain:"element-theme",public:"examples/element-ui",build:["yarn","npm run deploy:build"]}],files:["lib","src","packages","types"],homepage:"http://element.eleme.io",keywords:["eleme","vue","components"],license:"MIT",main:"lib/element-ui.common.js",name:"element-ui",peerDependencies:{vue:"^2.5.16"},repository:{type:"git",url:"git+ssh://git@github.com/ElemeFE/element.git"},scripts:{bootstrap:"yarn || npm i","build:file":"node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js","build:theme":"node build/bin/gen-cssfile && gulp build --gulpfile packages/theme-chalk/gulpfile.js && cp-cli packages/theme-chalk/lib lib/theme-chalk","build:umd":"node build/bin/build-locale.js","build:utils":"cross-env BABEL_ENV=utils babel src --out-dir lib --ignore src/index.js",clean:"rimraf lib && rimraf packages/*/lib && rimraf test/**/coverage","deploy:build":"npm run build:file && cross-env NODE_ENV=production webpack --config build/webpack.demo.js && echo element.eleme.io>>examples/element-ui/CNAME",dev:"npm run bootstrap && npm run build:file && cross-env NODE_ENV=development webpack-dev-server --config build/webpack.demo.js & node build/bin/template.js","dev:play":"npm run build:file && cross-env NODE_ENV=development PLAY_ENV=true webpack-dev-server --config build/webpack.demo.js",dist:"npm run clean && npm run build:file && npm run lint && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js && npm run build:utils && npm run build:umd && npm run build:theme",i18n:"node build/bin/i18n.js",lint:"eslint src/**/* test/**/* packages/**/* build/**/* --quiet",pub:"npm run bootstrap && sh build/git-release.sh && sh build/release.sh && node build/bin/gen-indices.js && sh build/deploy-faas.sh",test:"npm run lint && npm run build:theme && cross-env CI_ENV=/dev/ BABEL_ENV=test karma start test/unit/karma.conf.js --single-run","test:watch":"npm run build:theme && cross-env BABEL_ENV=test karma start test/unit/karma.conf.js"},style:"lib/theme-chalk/index.css",typings:"types/index.d.ts",unpkg:"lib/index.js",version:"2.6.3"}},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=home.af45a637.js.map