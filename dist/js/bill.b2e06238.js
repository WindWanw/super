(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bill"],{"5a63":function(t,e,a){"use strict";var l=a("9846"),i=a.n(l);i.a},9846:function(t,e,a){},adfa:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bill"},[a("div",{staticClass:"table_title"},[a("div",{staticClass:"search_wrap"},[a("div",[a("el-input",{staticStyle:{width:"200px",margin:"0 10px"},attrs:{clearable:"",placeholder:"请输入订单号",size:"small"},model:{value:t.order_sn,callback:function(e){t.order_sn=e},expression:"order_sn"}}),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1),a("div",[a("el-date-picker",{attrs:{size:"small",type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","value-format":"timestamp","end-placeholder":"结束日期"},model:{value:t.times,callback:function(e){t.times=e},expression:"times"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:t.daochu}},[t._v("导出")])],1)])]),a("div",{staticClass:"content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",height:t.height}},[a("el-table-column",{attrs:{prop:"order_sn",label:"订单号",width:"180"}}),a("el-table-column",{attrs:{prop:"bill_time",label:"交易时间",width:"180"}}),a("el-table-column",{attrs:{prop:"amount",label:"总金额",width:"180"}}),a("el-table-column",{attrs:{prop:"guide_earnings",label:"专引师分成"}}),a("el-table-column",{attrs:{prop:"SUPPLIER_earnings",label:"商户分成"}}),a("el-table-column",{attrs:{prop:"AGENT_earnings",label:"代理商分成"}}),a("el-table-column",{attrs:{prop:"ZY_earnings",label:"平台分成"}}),a("el-table-column",{attrs:{prop:"GUIDE_FATHER_earnings",label:"一级专引师分成"}}),a("el-table-column",{attrs:{prop:"GUIDE_GRANDPA_earnings",label:"二级专引师分成"}}),a("el-table-column",{attrs:{prop:"SUPPLIER_FATHER_earnings",label:"一级商户分成"}}),a("el-table-column",{attrs:{prop:"INVITE_earnings",label:"邀请专引师一级"}}),a("el-table-column",{attrs:{prop:"INVITE_2_earnings",label:"邀请专引师二级"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},i=[],n={data:function(){return{height:100,tableData:[],page:1,limit:10,order_sn:"",total:0,times:""}},methods:{bill:function(){var t=this;this.$api.billList({page:this.page,limit:this.limit,order_sn:this.order_sn}).then(function(e){t.tableData=e.data.list||[],t.total=e.data.total||0,t.height=100;var a=e.data.total;a>=10?t.height=600:0!=a&&(t.height=70*a),e.code&&t.$message[e.code?"warning":"success"](e.data)})},handleSizeChange:function(t){this.limit=t,this.bill()},handleCurrentChange:function(t){this.page=t,this.bill()},search:function(){this.bill()},daochu:function(){window.location.href="http://dev.admin.api.zhengyi100.cn/getorders/exportAdmin?times="+this.times[0]/1e3+","+this.times[1]/1e3}},created:function(){this.bill()}},s=n,r=(a("5a63"),a("2877")),o=Object(r["a"])(s,l,i,!1,null,"71095468",null);e["default"]=o.exports}}]);
//# sourceMappingURL=bill.b2e06238.js.map