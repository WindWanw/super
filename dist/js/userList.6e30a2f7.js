(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userList"],{"0bfb":function(t,e,n){"use strict";var a=n("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"18f3":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"userList"},[n("div",{staticClass:"table_title"},[n("div",[t.isShow?n("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.returnHome()}}},[t._v("返回")]):t._e()],1),n("div",{staticClass:"search_wrap"},[n("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户名",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("el-input",{staticStyle:{width:"200px",margin:"0 10px"},attrs:{clearable:"",placeholder:"请输入城市名称",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}}),n("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户性别",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},[n("el-option",{attrs:{label:"男",value:1}}),n("el-option",{attrs:{label:"女",value:0}})],1),n("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户类型",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[n("el-option",{attrs:{label:"正常",value:1}}),n("el-option",{attrs:{label:"禁用",value:-1}})],1),n("el-date-picker",{attrs:{size:"mini",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")])],1)]),n("div",{staticClass:"content"},[n("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.tabClick},model:{value:t.utype,callback:function(e){t.utype=e},expression:"utype"}},t._l(t.tabList,function(e,a){return n("el-tab-pane",{key:a,attrs:{label:e.label,name:e.name}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",refInFor:!0,attrs:{data:t.dataList.list,stripe:"",border:"",height:t.height}},[n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.row.vestUser,stripe:"",border:""}},[n("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.username)+t._s(e.row.isGuide?"(专引师)":"(消费者)"))]}}],null,!0)}),n("el-table-column",{attrs:{prop:"",label:"头像",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}],null,!0)}),n("el-table-column",{attrs:{prop:"sex",label:"性别",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("sexStatus")(e.row.sex)))]}}],null,!0)}),n("el-table-column",{attrs:{prop:"city",label:"城市",align:"center"}}),n("el-table-column",{attrs:{prop:"",label:"账号状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"mini-button",attrs:{title:1==e.row.status?"点击禁用":"点击解除",type:1==e.row.status?"success":"info",size:"mini"},on:{click:function(n){return t.vestUserDel(e.row.id,e.row.status)}}},[t._v(t._s(e.row.status?"正常":"超出次数"))])]}}],null,!0)}),n("el-table-column",{attrs:{prop:"times",label:"注册日期",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times,1)))]}}],null,!0)}),n("el-table-column",{attrs:{prop:"use",label:"使用次数",align:"center"}}),n("el-table-column",{attrs:{prop:"needs",label:"发布需求数",align:"center"}}),n("el-table-column",{attrs:{prop:"reply",label:"回复需求数",align:"center"}}),n("el-table-column",{attrs:{prop:"nickname",label:"昵称",align:"center"}}),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"mini-button",attrs:{title:"删除马甲",type:"danger",size:"mini"},on:{click:function(n){return t.delVestUser(e.row)}}},[t._v("删除")])]}}],null,!0)})],1)]}}],null,!0)}),n("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.username)+"\n              "),n("div",[t._v(t._s(t._f("vestStatus")(e.row.isVest)))])]}}],null,!0)}),n("el-table-column",{attrs:{prop:"",label:"头像",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}],null,!0)}),n("el-table-column",{attrs:{prop:"sex",label:"性别",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("sexStatus")(e.row.sex)))]}}],null,!0)}),n("el-table-column",{attrs:{prop:"city",label:"城市",align:"center"}}),n("el-table-column",{attrs:{prop:"tel",label:"手机号",align:"center"}}),n("el-table-column",{attrs:{prop:"coin",label:"积分",align:"center"}}),n("el-table-column",{attrs:{prop:"exp",label:"经验",align:"center"}}),n("el-table-column",{attrs:{prop:"",label:"账号状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"mini-button",attrs:{title:"1"==e.row.status?"点击禁用":"点击解除禁用",type:"1"==e.row.status?"success":"info",size:"mini"},on:{click:function(n){return t.userStop(e.row.id)}}},[t._v(t._s(t._f("userStatus")(e.row.status)))])]}}],null,!0)}),n("el-table-column",{attrs:{prop:"times",label:"注册日期",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times,1)))]}}],null,!0)}),n("el-table-column",{attrs:{prop:"nickname",label:"昵称",align:"center"}}),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"mini-button",attrs:{title:"设置马甲",type:"primary",size:"mini"},on:{click:function(n){return t.openSetVestUser(e.row)}}},[t._v("设置马甲")]),n("el-button",{staticClass:"mini-button",staticStyle:{margin:"10px 0 0 0"},attrs:{title:"查看马甲用户",type:"success",size:"mini"},on:{click:function(n){return t.toogleExpand(e.row)}}},[t._v("查看马甲")])]}}],null,!0)})],1)],1)}),1),n("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),n("el-dialog",{attrs:{title:"设置马甲用户",width:"750px",visible:t.openSetVestUserDialog,"append-to-body":""},on:{"update:visible":function(e){t.openSetVestUserDialog=e},close:function(e){t.form.uids=""}}},[n("el-form",{ref:"form",attrs:{"label-width":"150px",model:t.form}},[t.vestIdTag?n("el-form-item",{attrs:{label:"已存在的马甲id"}},[t._l(t.vestIdTag,function(e){return[n("el-tag",{key:e,staticStyle:{"margin-right":"10px"},attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return t.handleClose(e)}}},[t._v(t._s(e))])]})],2):t._e(),n("el-form-item",{attrs:{label:"马甲用户"}},[n("el-input",{attrs:{type:"textarea",placeholder:"请输入马甲用户id，多个用户id用“,”隔开"},model:{value:t.form.uids,callback:function(e){t.$set(t.form,"uids",e)},expression:"form.uids"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.openSetVestUserDialog=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.setVestUser()}}},[t._v("确 定")])],1)],1)],1)},i=[],s=(n("7f7f"),n("386d"),{data:function(){return{loading:!1,isShow:!1,height:100,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},tabList:[{label:"全部",name:"0"},{label:"马甲主号",name:"1"}],utype:"0",username:"",status:"",date:"",sex:"",city:"",dataList:[],page:1,limit:10,openSetVestUserDialog:!1,vestIdTag:[],form:{id:"",uids:""}}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.getUserlist({page:this.page,limit:this.limit,utype:this.utype,status:this.status,times:this.date,gender:this.sex,city:this.city,username:this.username}).then(function(e){t.dataList=e.data||[],t.height=100;var n=e.data.total;n>=10?t.height=750:0!=n&&(t.height=130*n),e.code&&t.$message[e.code?"warning":"success"](e.data),t.loading=!1})},search:function(){this.page=1,this.getDataList(),this.isShow=!0},toogleExpand:function(t){var e=this.$refs.table,n=e[this.utype];console.log(n),this.dataList.list.map(function(e){t.id!=e.id&&n.toggleRowExpansion(e,!1)}),n.toggleRowExpansion(t)},handleClose:function(t){var e=this;this.$api.delVestUsers({mainId:this.form.id,id:t}).then(function(n){n.code||(e.search(),e.openSetVestUserDialog=!0,e.vestIdTag.splice(e.vestIdTag.indexOf(t),1))})},delVestUser:function(t){var e=this;this.$api.delVestUsers({id:t.id,mainId:t.mainId}).then(function(t){e.$message[t.code?"warning":"success"](t.data.message),t.code||e.search()})},userStop:function(t){var e=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){e.$api.userStop({uid:t,result:"1"}).then(function(t){e.$message[t.code?"warning":"success"](t.data),e.getDataList()})}).catch(function(){e.$message.info("已取消操作")})},openSetVestUser:function(t){this.openSetVestUserDialog=!0,this.form.id=t.id,this.vestIdTag=t.vestId},setVestUser:function(){var t=this;this.$api.setVestUser(this.form).then(function(e){t.$message[e.code?"warning":"success"](e.data.message),e.code||(t.openSetVestUserDialog=!1,t.getDataList())})},vestUserDel:function(t,e){var n=this;this.$api.vestUserDel({id:t,status:e}).then(function(t){n.$message[t.code?"warning":"success"](t.data.message),n.search()})},tabClick:function(t){this.utype=t.name,this.page=1,this.getDataList()},returnHome:function(){this.page=1,this.limit=10,this.status="",this.times="",this.username="",this.city="",this.gender="",this.getDataList(),this.isShow=!1}},created:function(){this.getDataList()}}),l=s,r=(n("6ed5"),n("2877")),o=Object(r["a"])(l,a,i,!1,null,"6ab38dd9",null);e["default"]=o.exports},"214f":function(t,e,n){"use strict";n("b0c5");var a=n("2aba"),i=n("32e9"),s=n("79e5"),l=n("be13"),r=n("2b4c"),o=n("520a"),c=r("species"),u=!s(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var d=r(t),f=!s(function(){var e={};return e[d]=function(){return 7},7!=""[t](e)}),m=f?!s(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[c]=function(){return n}),n[d](""),!e}):void 0;if(!f||!m||"replace"===t&&!u||"split"===t&&!p){var g=/./[d],h=n(l,d,""[t],function(t,e,n,a,i){return e.exec===o?f&&!i?{done:!0,value:g.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}}),b=h[0],v=h[1];a(String.prototype,t,b),i(RegExp.prototype,d,2==e?function(t,e){return v.call(t,this,e)}:function(t){return v.call(t,this)})}}},"386d":function(t,e,n){"use strict";var a=n("cb7c"),i=n("83a1"),s=n("5f1b");n("214f")("search",1,function(t,e,n,l){return[function(n){var a=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a):new RegExp(n)[e](String(a))},function(t){var e=l(n,t,this);if(e.done)return e.value;var r=a(t),o=String(this),c=r.lastIndex;i(c,0)||(r.lastIndex=0);var u=s(r,o);return i(r.lastIndex,c)||(r.lastIndex=c),null===u?-1:u.index}]})},"520a":function(t,e,n){"use strict";var a=n("0bfb"),i=RegExp.prototype.exec,s=String.prototype.replace,l=i,r="lastIndex",o=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[r]||0!==e[r]}(),c=void 0!==/()??/.exec("")[1],u=o||c;u&&(l=function(t){var e,n,l,u,p=this;return c&&(n=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),o&&(e=p[r]),l=i.call(p,t),o&&l&&(p[r]=p.global?l.index+l[0].length:e),c&&l&&l.length>1&&s.call(l[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(l[u]=void 0)}),l}),t.exports=l},"5f1b":function(t,e,n){"use strict";var a=n("23c6"),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var s=n.call(t,e);if("object"!==typeof s)throw new TypeError("RegExp exec method returned something other than an Object or null");return s}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"6ed5":function(t,e,n){"use strict";var a=n("c023"),i=n.n(a);i.a},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},b0c5:function(t,e,n){"use strict";var a=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},c023:function(t,e,n){}}]);
//# sourceMappingURL=userList.6e30a2f7.js.map