(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userList"],{"76c7":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList"},[a("div",{staticClass:"table_title"},[a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户名",size:"small"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户类型",size:"small"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("el-option",{attrs:{label:"正常",value:1}}),a("el-option",{attrs:{label:"禁用",value:-1}})],1),a("el-date-picker",{attrs:{size:"small",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList.list,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}])}),a("el-table-column",{attrs:{prop:"sex",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("sexStatus")(e.row.sex))+"\n        ")]}}])}),a("el-table-column",{attrs:{prop:"city",label:"城市"}}),a("el-table-column",{attrs:{prop:"tel",label:"手机号"}}),a("el-table-column",{attrs:{prop:"coin",label:"积分"}}),a("el-table-column",{attrs:{prop:"exp",label:"经验"}}),a("el-table-column",{attrs:{prop:"",label:"账号状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{title:"1"==e.row.status?"点击禁用":"点击解除禁用",type:"1"==e.row.status?"success":"info",size:"mini"},on:{click:function(a){return t.userStop(e.row.id)}}},[t._v(t._s(t._f("userStatus")(e.row.status)))])]}}])}),a("el-table-column",{attrs:{prop:"times",label:"注册日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times,1)))]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},i=[],n={data:function(){return{loading:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},username:"",status:"",date:"",dataList:[],page:1,limit:10}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.getUserlist({page:this.page,limit:this.limit,status:this.status,times:this.date,username:this.username}).then(function(e){t.dataList=e.data||[],t.loading=!1})},search:function(){this.page=1,this.getDataList()},userStop:function(t){var e=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){e.$api.userStop({uid:t,result:"1"}).then(function(t){e.$message[t.code?"warning":"success"](t.data),e.getDataList()})}).catch(function(){e.$message.info("已取消操作")})}},created:function(){this.getDataList()}},l=n,r=(a("c836"),a("2877")),o=Object(r["a"])(l,s,i,!1,null,"2896dde7",null);e["default"]=o.exports},"8c99":function(t,e,a){},c836:function(t,e,a){"use strict";var s=a("8c99"),i=a.n(s);i.a}}]);
//# sourceMappingURL=userList.b3b5a034.js.map