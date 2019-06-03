(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userList"],{"0838":function(t,e,a){},"403b":function(t,e,a){},"76c7":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList"},[a("div",{staticClass:"table_title"},[a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(e){return t.returnHome()}}},[t._v("返回列表首页")])],1),a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入用户名",size:"small"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),a("el-input",{staticStyle:{width:"200px",margin:"0 10px"},attrs:{clearable:"",placeholder:"请输入城市名称",size:"small"},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}}),a("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户性别",size:"small"},model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},[a("el-option",{attrs:{label:"男",value:1}}),a("el-option",{attrs:{label:"女",value:0}})],1),a("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户类型",size:"small"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("el-option",{attrs:{label:"正常",value:1}}),a("el-option",{attrs:{label:"禁用",value:-1}})],1),a("el-date-picker",{attrs:{size:"small",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList.list,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}])}),a("el-table-column",{attrs:{prop:"sex",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("sexStatus")(e.row.sex))+"\n        ")]}}])}),a("el-table-column",{attrs:{prop:"city",label:"城市"}}),a("el-table-column",{attrs:{prop:"tel",label:"手机号"}}),a("el-table-column",{attrs:{prop:"coin",label:"积分"}}),a("el-table-column",{attrs:{prop:"exp",label:"经验"}}),a("el-table-column",{attrs:{prop:"",label:"账号状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{title:"1"==e.row.status?"点击禁用":"点击解除禁用",type:"1"==e.row.status?"success":"info",size:"mini"},on:{click:function(a){return t.userStop(e.row.id)}}},[t._v(t._s(t._f("userStatus")(e.row.status)))])]}}])}),a("el-table-column",{attrs:{prop:"times",label:"注册日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times,1)))]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},s=[],l={data:function(){return{loading:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},username:"",status:"",date:"",sex:"",city:"",dataList:[],page:1,limit:10}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.getUserlist({page:this.page,limit:this.limit,status:this.status,times:this.date,gender:this.sex,city:this.city,username:this.username}).then(function(e){t.dataList=e.data||[],t.loading=!1})},search:function(){this.page=1,this.getDataList()},userStop:function(t){var e=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){e.$api.userStop({uid:t,result:"1"}).then(function(t){e.$message[t.code?"warning":"success"](t.data),e.getDataList()})}).catch(function(){e.$message.info("已取消操作")})},returnHome:function(){this.page=1,this.limit=10,this.status="",this.times="",this.username="",this.city="",this.gender="",this.getDataList()}},created:function(){this.getDataList()}},n=l,o=(a("999b"),a("2877")),r=Object(o["a"])(n,i,s,!1,null,"bf7cfd0c",null);e["default"]=r.exports},"80e2":function(t,e,a){"use strict";var i=a("403b"),s=a.n(i);s.a},"999b":function(t,e,a){"use strict";var i=a("0838"),s=a.n(i);s.a},e817:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"finance"},[a("div",{staticClass:"table_title"},[a("div",{staticClass:"search_wrap"},[a("el-select",{staticStyle:{margin:"0 10px"},attrs:{size:"small",filterable:"",placeholder:"类型"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),a("el-input",{staticStyle:{width:"200px",margin:"0 10px"},attrs:{clearable:"",placeholder:"请输入持卡人姓名",size:"small"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList.list}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"ID"}},[a("span",[t._v(t._s(e.row.id))])]),a("el-form-item",{attrs:{label:"UID"}},[a("span",[t._v(t._s(e.row.uid))])]),a("el-form-item",{attrs:{label:"提现金额"}},[a("span",[t._v(t._s(e.row.amount))])]),a("el-form-item",{attrs:{label:"持卡人"}},[a("span",[t._v(t._s(e.row.name))])]),a("el-form-item",{attrs:{label:"银行"}},[a("span",[t._v(t._s(e.row.bank))])]),a("el-form-item",{attrs:{label:"银行卡号"}},[a("span",[t._v(t._s(e.row.bank_account))])]),a("el-form-item",{attrs:{label:"申请时间"}},[a("span",[t._v(t._s(e.row.create_times))])]),a("el-form-item",{attrs:{label:"反馈信息"}},[a("span",[t._v(t._s(e.row.info))])]),a("el-form-item",{attrs:{label:"审核人"}},[a("span",[t._v(t._s(e.row.checker))])]),a("el-form-item",{attrs:{label:"付款人"}},[a("span",[t._v(t._s(e.row.payer))])]),a("el-form-item",{attrs:{label:"个人所得税"}},[a("span",[t._v(t._s(e.row.tax))])]),a("el-form-item",{attrs:{label:"实际打款"}},[a("span",[t._v(t._s(e.row.pay_amount))])]),a("el-form-item",{attrs:{label:"审核时间"}},[a("span",[t._v(t._s(e.row.check_times))])]),a("el-form-item",{attrs:{label:"付款时间"}},[a("span",[t._v(t._s(e.row.pay_times))])])],1)]}}])}),a("el-table-column",{attrs:{label:"ID",prop:"id"}}),a("el-table-column",{attrs:{label:"持卡人姓名",prop:"name"}}),a("el-table-column",{attrs:{label:"提现金额",prop:"amount"}}),a("el-table-column",{attrs:{label:"银行",prop:"bank"}}),a("el-table-column",{attrs:{label:"申请时间",prop:"create_times"}}),a("el-table-column",{attrs:{label:"状态",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:t._f("withdrawStatus")(e.row.status),size:"mini"}},[t._v(t._s(t._f("withdrawText")(e.row.status)))])]}}])}),a("el-table-column",{attrs:{label:"操作",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.centerDialogVisible=!0,t.id=e.row.id}}},[t._v("审核通过")]):t._e(),0==e.row.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.centerDialogVisible2=!0,t.id=e.row.id}}},[t._v("驳回申请")]):t._e(),1==e.row.status?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.centerDialogVisible3=!0,t.id=e.row.id}}},[t._v("确认打款")]):t._e(),1==e.row.status?a("el-button",{attrs:{type:"danger",size:"mini"}},[t._v("打款失败")]):t._e()]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[a("el-input",{attrs:{placeholder:"个人所得税"},model:{value:t.tax,callback:function(e){t.tax=e},expression:"tax"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.passWithdraw}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{visible:t.centerDialogVisible2,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible2=e}}},[a("el-input",{attrs:{type:"textarea",placeholder:"反馈信息"},model:{value:t.info,callback:function(e){t.info=e},expression:"info"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible2=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.blowWithdraw}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{visible:t.centerDialogVisible3,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible3=e}}},[a("el-input",{attrs:{placeholder:"打款金额"},model:{value:t.pay_amount,callback:function(e){t.pay_amount=e},expression:"pay_amount"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.centerDialogVisible3=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.payWithdraw}},[t._v("确 定")])],1)],1)],1)},s=[],l=(a("7f7f"),{data:function(){return{options:[{value:0,label:"待审核"},{value:1,label:"已审核"},{value:2,label:"已打款"},{value:3,label:"未通过审核"},{value:4,label:"打款失败"}],loading:!1,dataList:[],page:1,limit:10,status:0,name:"",tax:"",info:"",pay_amount:"",centerDialogVisible:!1,centerDialogVisible2:!1,centerDialogVisible3:!1}},watch:{},components:{},methods:{getDataList:function(){var t=this;this.loading=!0,this.$api.getWithdrawList({page:this.page,LIMIT:this.limit,status:this.status,name:this.name}).then(function(e){t.dataList=e.data||[],t.loading=!1})},handleSizeChange:function(t){this.page=t,this.getDataList()},handleCurrentChange:function(t){this.limit=t,this.getDataList()},search:function(){this.page=1,this.getDataList()},passWithdraw:function(){var t=this;this.centerDialogVisible=!1,this.$api.passWithdraw({id:this.id,tax:this.tax}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})},blowWithdraw:function(){var t=this;this.centerDialogVisible2=!1,this.$api.blowWithdraw({id:this.id,info:this.info}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})},payWithdraw:function(){var t=this;this.centerDialogVisible3=!1,this.$api.payWithdraw({id:this.id,pay_amount:this.pay_amount}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})},unquaWithdraw:function(){var t=this;this.centerDialogVisible=!1,this.$api.unquaWithdraw({id:this.id,info:this.info}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})}},created:function(){this.getDataList()}}),n=l,o=(a("80e2"),a("2877")),r=Object(o["a"])(n,i,s,!1,null,"13dd2378",null);e["default"]=r.exports}}]);
//# sourceMappingURL=userList.c6cf5b95.js.map