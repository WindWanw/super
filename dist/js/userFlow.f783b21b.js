(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userFlow"],{"0183":function(t,e,a){},"0fde":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList"},[a("div",{staticClass:"table_title"},[a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户名",size:"small"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("el-date-picker",{attrs:{size:"small",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"amount",label:"金额"}}),a("el-table-column",{attrs:{prop:"pay_amount",label:"支付金额"}}),a("el-table-column",{attrs:{prop:"super",label:"红包"}}),a("el-table-column",{attrs:{prop:"shop",label:"店铺优惠券"}}),a("el-table-column",{attrs:{prop:"common",label:"通用优惠券"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},n=[],s={data:function(){return{loading:!1,is_search:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},username:"",date:"",dataList:[],page:1,limit:10,total:0}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.userFlow({page:this.page,limit:this.limit,times:this.date,username:this.username}).then(function(e){console.log(e),t.dataList=e.data.list||[],t.total=e.data.total,t.loading=!1})},search:function(){this.page=1,this.getDataList()}},created:function(){this.getDataList()}},l=s,r=(a("b0b5"),a("2877")),o=Object(r["a"])(l,i,n,!1,null,"713d1534",null);e["default"]=o.exports},"3c4e9":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList"},[a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"nickname",label:"昵称"}}),a("el-table-column",{attrs:{prop:"",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}])}),a("el-table-column",{attrs:{prop:"tel",label:"电话"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},n=[],s={data:function(){return{loading:!1,dataList:[],page:1,limit:10,total:0}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.guidesList({supplier_id:this.$route.query.id,page:this.page,limit:this.limit,times:this.date}).then(function(e){console.log(e),t.dataList=e.data.list||[],t.total=e.data.total,t.loading=!1})},search:function(){this.page=1,this.getDataList()}},created:function(){this.getDataList()}},l=s,r=(a("5b89"),a("2877")),o=Object(r["a"])(l,i,n,!1,null,"1a63fec2",null);e["default"]=o.exports},"5b89":function(t,e,a){"use strict";var i=a("d6ff"),n=a.n(i);n.a},b0b5:function(t,e,a){"use strict";var i=a("0183"),n=a.n(i);n.a},d6ff:function(t,e,a){}}]);
//# sourceMappingURL=userFlow.f783b21b.js.map