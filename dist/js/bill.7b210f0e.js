(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bill"],{"2f37":function(t,e,a){"use strict";var i=a("3087"),l=a.n(i);l.a},3087:function(t,e,a){},"57d8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bill"},[a("div",{staticClass:"table_title"},[a("div",[t.isShow?a("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.back()}}},[t._v("返回")]):t._e()],1),a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入用户名查询",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"输入UID",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.uid,callback:function(e){t.uid=e},expression:"uid"}}),a("el-button",{staticStyle:{margin:"0 5px 0 5px"},attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{attrs:{data:t.tableData,border:"",height:t.height}},[a("el-table-column",{attrs:{prop:"uid",label:"UID"}}),a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"truename",label:"真实姓名"}}),a("el-table-column",{attrs:{prop:"tel",label:"电话"}}),a("el-table-column",{attrs:{prop:"card_count",label:"未使用优惠券金额"}}),a("el-table-column",{attrs:{prop:"money",label:"账户金额"}}),a("el-table-column",{attrs:{prop:"xiaofei",label:"消费金额"}}),a("el-table-column",{attrs:{prop:"tixian",label:"提现金额"}}),a("el-table-column",{attrs:{prop:"bill",label:"收益金额"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},l=[],n={data:function(){return{height:150,tableData:[],page:1,limit:10,username:"",uid:"",total:0,isShow:!1}},methods:{userLiuShui:function(){var t=this;this.$api.userLiuShui({page:this.page,limit:this.limit,username:this.username,uid:this.uid}).then(function(e){t.tableData=e.data.list||[],t.total=e.data.total||0,t.height=150;var a=e.data.total;a>=10?t.height=600:0!=a&&(t.height=120*a),e.code&&t.$message[e.code?"warning":"success"](e.data)})},handleSizeChange:function(t){this.limit=t,this.userLiuShui()},handleCurrentChange:function(t){this.page=t,this.userLiuShui()},search:function(){this.page=1,this.userLiuShui(),this.isShow=!0},back:function(){this.page=1,this.limit=10,this.order_sn="",this.userLiuShui(),this.isShow=!1}},created:function(){this.userLiuShui()}},s=n,r=(a("2f37"),a("2877")),o=Object(r["a"])(s,i,l,!1,null,"005d73b6",null);e["default"]=o.exports},"6ec4":function(t,e,a){"use strict";var i=a("ded9"),l=a.n(i);l.a},adfa:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bill"},[a("div",{staticClass:"table_title"},[a("div",[t.isShow?a("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.back()}}},[t._v("返回")]):t._e()],1),a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入订单号",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.order_sn,callback:function(e){t.order_sn=e},expression:"order_sn"}}),a("el-date-picker",{attrs:{size:"mini",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","value-format":"timestamp","end-placeholder":"结束日期"},model:{value:t.times,callback:function(e){t.times=e},expression:"times"}}),a("el-button",{staticStyle:{margin:"0 5px 0 5px"},attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{type:"success",size:"mini",icon:"iconfont daochu"},on:{click:t.daochu}},[t._v("导出")])],1)]),a("div",{staticClass:"content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",height:t.height}},[a("el-table-column",{attrs:{prop:"order_sn",label:"订单号",width:"180"}}),a("el-table-column",{attrs:{prop:"bill_time",label:"交易时间",width:"180"}}),a("el-table-column",{attrs:{prop:"amount",label:"总金额",width:"180"}}),a("el-table-column",{attrs:{prop:"guide_earnings",label:"专引师分成"}}),a("el-table-column",{attrs:{prop:"SUPPLIER_earnings",label:"商户分成"}}),a("el-table-column",{attrs:{prop:"AGENT_earnings",label:"代理商分成"}}),a("el-table-column",{attrs:{prop:"ZY_earnings",label:"平台分成"}}),a("el-table-column",{attrs:{prop:"GUIDE_FATHER_earnings",label:"一级专引师分成"}}),a("el-table-column",{attrs:{prop:"GUIDE_GRANDPA_earnings",label:"二级专引师分成"}}),a("el-table-column",{attrs:{prop:"SUPPLIER_FATHER_earnings",label:"一级商户分成"}}),a("el-table-column",{attrs:{prop:"INVITE_earnings",label:"邀请专引师一级"}}),a("el-table-column",{attrs:{prop:"INVITE_2_earnings",label:"邀请专引师二级"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},l=[],n={data:function(){return{height:150,tableData:[],page:1,limit:10,order_sn:"",total:0,times:"",isShow:!1}},methods:{bill:function(){var t=this;this.$api.billList({page:this.page,limit:this.limit,order_sn:this.order_sn}).then(function(e){t.tableData=e.data.list||[],t.total=e.data.total||0,t.height=150;var a=e.data.total;a>=10?t.height=600:0!=a&&(t.height=120*a),e.code&&t.$message[e.code?"warning":"success"](e.data)})},handleSizeChange:function(t){this.limit=t,this.bill()},handleCurrentChange:function(t){this.page=t,this.bill()},search:function(){this.page=1,this.bill(),this.isShow=!0},back:function(){this.page=1,this.limit=10,this.order_sn="",this.bill(),this.isShow=!1},daochu:function(){window.location.href="https://admin.api.zhengyi100.cn/getorders/exportAdmin?times="+this.times[0]/1e3+","+this.times[1]/1e3}},created:function(){this.bill()}},s=n,r=(a("6ec4"),a("2877")),o=Object(r["a"])(s,i,l,!1,null,"58d0df67",null);e["default"]=o.exports},ded9:function(t,e,a){}}]);
//# sourceMappingURL=bill.7b210f0e.js.map