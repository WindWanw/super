(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"02f4":function(e,t,r){var n=r("4588"),o=r("be13");e.exports=function(e){return function(t,r){var i,a,s=String(o(t)),c=n(r),u=s.length;return c<0||c>=u?e?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?e?s.charAt(c):i:e?s.slice(c,c+2):a-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,r){"use strict";var n=r("02f4")(!0);e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},"0bfb":function(e,t,r){"use strict";var n=r("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,r){"use strict";r("b0c5");var n=r("2aba"),o=r("32e9"),i=r("79e5"),a=r("be13"),s=r("2b4c"),c=r("520a"),u=s("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var d=s(e),p=!i(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),v=p?!i(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[u]=function(){return r}),r[d](""),!t}):void 0;if(!p||!v||"replace"===e&&!l||"split"===e&&!f){var h=/./[d],g=r(a,d,""[e],function(e,t,r,n,o){return t.exec===c?p&&!o?{done:!0,value:h.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),m=g[0],x=g[1];n(String.prototype,e,m),o(RegExp.prototype,d,2==t?function(e,t){return x.call(e,this,t)}:function(e){return x.call(e,this)})}}},"520a":function(e,t,r){"use strict";var n=r("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,a=o,s="lastIndex",c=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e[s]||0!==t[s]}(),u=void 0!==/()??/.exec("")[1],l=c||u;l&&(a=function(e){var t,r,a,l,f=this;return u&&(r=new RegExp("^"+f.source+"$(?!\\s)",n.call(f))),c&&(t=f[s]),a=o.call(f,e),c&&a&&(f[s]=f.global?a.index+a[0].length:t),u&&a&&a.length>1&&i.call(a[0],r,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(a[l]=void 0)}),a}),e.exports=a},"5f1b":function(e,t,r){"use strict";var n=r("23c6"),o=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var i=r.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(e,t)}},8869:function(e,t,r){"use strict";var n=r("a3c2"),o=r.n(n);o.a},a3c2:function(e,t,r){},a481:function(e,t,r){"use strict";var n=r("cb7c"),o=r("4bf8"),i=r("9def"),a=r("4588"),s=r("0390"),c=r("5f1b"),u=Math.max,l=Math.min,f=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,v=function(e){return void 0===e?e:String(e)};r("214f")("replace",2,function(e,t,r,h){return[function(n,o){var i=e(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,i,o):r.call(String(i),n,o)},function(e,t){var o=h(r,e,this,t);if(o.done)return o.value;var f=n(e),d=String(this),p="function"===typeof t;p||(t=String(t));var m=f.global;if(m){var x=f.unicode;f.lastIndex=0}var b=[];while(1){var w=c(f,d);if(null===w)break;if(b.push(w),!m)break;var y=String(w[0]);""===y&&(f.lastIndex=s(d,i(f.lastIndex),x))}for(var S="",$=0,k=0;k<b.length;k++){w=b[k];for(var R=String(w[0]),F=u(l(a(w.index),d.length),0),E=[],C=1;C<w.length;C++)E.push(v(w[C]));var I=w.groups;if(p){var _=[R].concat(E,F,d);void 0!==I&&_.push(I);var q=String(t.apply(void 0,_))}else q=g(R,d,F,E,I,t);F>=$&&(S+=d.slice($,F)+q,$=F+R.length)}return S+d.slice($)}];function g(e,t,n,i,a,s){var c=n+e.length,u=i.length,l=p;return void 0!==a&&(a=o(a),l=d),r.call(s,l,function(r,o){var s;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(c);case"<":s=a[o.slice(1,-1)];break;default:var l=+o;if(0===l)return r;if(l>u){var d=f(l/10);return 0===d?r:d<=u?void 0===i[d-1]?o.charAt(1):i[d-1]+o.charAt(1):r}s=i[l-1]}return void 0===s?"":s})}})},b0c5:function(e,t,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},dd7b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[r("div",{staticClass:"login_wrap"},[e._m(0),e.isShow?r("div",{staticClass:"qrcode-img"},[r("img",{staticClass:"image",attrs:{src:e.qrcode,alt:"扫描二维码",title:"扫描二维码验证信息登录"}})]):r("div",[r("el-input",{attrs:{size:"small",placeholder:"请输入账号","prefix-icon":"iconfont yonghu1"},model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}}),r("el-input",{attrs:{"prefix-icon":"iconfont mima",placeholder:"请输入密码",size:"small","show-password":""},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}}),r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.login}},[e._v("登录")])],1)]),r("div",{staticClass:"footer"},[r("div",{staticClass:"text"},[e._v("版权所有@江西多淇信息科技有限公司    版本"+e._s(e.versions))])])])},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login_title"},[r("span",[e._v("正意后台")])])}],i=(r("a481"),{data:function(){return{versions:"",ruleForm:{username:"",password:"",character:4,url:"",uuid:""},isShow:!0,qrcode:""}},components:{},mounted:function(){},methods:{getQRcode:function(){var e=this;this.$api.supplierLoginQRcode().then(function(t){e.qrcode=t.data.img,e.ruleForm.uuid=t.data.uuid})},ancSuperLogin:function(){var e=this;this.$api.ancSuperLogin({uuid:this.ruleForm.uuid}).then(function(t){t.code?e.loopRequest():e.isShow=!1})},loopRequest:function(){setTimeout(this.ancSuperLogin,3e3)},login:function(){var e=this;return this.ruleForm.username?this.ruleForm.password?void this.$api.login(this.ruleForm).then(function(t){return t.code?(localStorage.setItem("username",null),localStorage.setItem("password",null),e.$message.error(t.data.message)):(localStorage.setItem("token",t.data.token),localStorage.setItem("userinfo",JSON.stringify(t.data.userinfo)),localStorage.setItem("type",t.data.type),localStorage.setItem("path",t.data.path),e.$router.replace(e.url),e.$message.success({message:t.data.message,duration:1500}))}):this.$message.error("密码不能为空，请填写密码"):this.$message.error("“账号不能为空，请填写账号")},getVersions:function(){var e=this;this.$api.getVersions().then(function(t){e.versions=t.data.versions})},reset:function(){this.ruleForm={}},keyUp:function(){var e=this;document.onkeydown=function(t){var r=window.event.keyCode;13==r&&e.login()}}},destroyed:function(){document.onkeydown=null},created:function(){this.getVersions(),this.url=this.$route.query.redirect||"/home",localStorage.getItem("token")?this.$router.replace(this.url):(this.getQRcode(),this.loopRequest()),this.keyUp()}}),a=i,s=(r("8869"),r("2877")),c=Object(s["a"])(a,n,o,!1,null,"f74be45a",null);t["default"]=c.exports}}]);
//# sourceMappingURL=login.9486e65b.js.map