(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["punish"],{"95e6":function(t,e,a){"use strict";var i=a("ea35"),s=a.n(i);s.a},c49a:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"punish"},[a("div",{staticClass:"table_title"},[a("div",{staticClass:"search_wrap"},[a("el-date-picker",{attrs:{"value-format":"timestamp",size:"small",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.times,callback:function(e){t.times=e},expression:"times"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.tabClick},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.tabList,function(e,i){return a("el-tab-pane",{key:i,attrs:{label:e.label,name:e.name}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList.list,stripe:"",border:"",height:t.height}},[a("el-table-column",{attrs:{prop:"to_name",label:"被处罚对象"}}),a("el-table-column",{attrs:{prop:"from_name",label:"处罚申请人"}}),a("el-table-column",{attrs:{prop:"types",label:"处罚类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(t._f("punishTypes")(e.row.types))+"\n            ")]}}],null,!0)}),a("el-table-column",{attrs:{prop:"values.label",label:"处罚内容"}}),a("el-table-column",{attrs:{prop:"times",label:"处罚时间"}}),a("el-table-column",{attrs:{prop:"status",label:"处罚状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"==e.row.status?a("el-tag",{staticClass:"mini-button",attrs:{type:"warning"}},[t._v("审核中")]):t._e(),"1"==e.row.status?a("el-tag",{staticClass:"mini-button",attrs:{type:"success"}},[t._v("已处罚")]):t._e(),"2"==e.row.status?a("el-tag",{staticClass:"mini-button",attrs:{type:"danger"}},[t._v("处罚驳回")]):t._e()]}}],null,!0)}),"1"==t.status?a("el-table-column",{attrs:{prop:"checker_name",label:"审核人"}}):t._e(),"1"==t.status?a("el-table-column",{attrs:{prop:"check_times",label:"审核时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(t._f("formatTimeStamp")(e.row.check_times))+"\n            ")]}}],null,!0)}):t._e(),a("el-table-column",{attrs:{prop:"",label:"操作",width:"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"cz_btn"},[1!=t.status?a("el-button",{staticClass:"mini-button",attrs:{type:"primary",size:"mini",icon:"el-icon-edit-outline",title:"点我对该条信息进行审核认证"},on:{click:function(a){return t.openCheck(e.row)}}},[t._v("点击审核")]):t._e()],1)]}}],null,!0)})],1)],1)}),1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:"审核",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e},close:function(e){t.pass="",t.remark=""}}},[a("el-radio-group",{model:{value:t.pass,callback:function(e){t.pass=e},expression:"pass"}},[a("el-radio",{attrs:{label:1}},[t._v("通过")]),a("el-radio",{attrs:{label:2}},[t._v("驳回")])],1),"2"==t.pass?a("el-input",{staticStyle:{"margin-top":"20px"},attrs:{type:"textarea",rows:2,placeholder:"请输入备注信息"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}}):t._e(),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.sure}},[t._v("确 定")])],1)],1)],1)},s=[],n=(a("7f7f"),a("ac6a"),{data:function(){return{loading:!1,height:100,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},dataList:[],page:1,limit:10,times:"",tabList:[{label:"待审核",name:"0"},{label:"已审核",name:"1"}],status:"0",pass:"",remark:"",types:"",to_uid:"",values:"",dialogVisible:!1,id:""}},watch:{pass:function(t,e){"1"==t&&(this.remark="")}},methods:{openCheck:function(t){this.dialogVisible=!0,this.id=t.id,this.types=t.types,this.to_uid=t.to_uid,this.values=t.values,this.remark="",this.pass=""},getDataList:function(){var t=this;this.loading=!0,this.$api.getPunishList({page:this.page,limit:this.limit,status:this.status,times:this.times}).then(function(e){t.dataList=e.data||[],t.height=100;var a=e.data.total;a>=10?t.height=600:0!=a&&(t.height=70*a),e.code&&t.$message[e.code?"warning":"success"](e.data),t.loading=!1})},handleSizeChange:function(t){this.page=t,this.getDataList()},handleCurrentChange:function(t){this.limit=t,this.getDataList()},tabClick:function(t){this.status=t.name,this.page=1,this.getDataList()},search:function(){this.page=1,this.getDataList()},del:function(t){var e=this;this.$confirm("是否确认删除该项","提示",{type:"warning"}).then(function(){e.$api.delPunish({id:t}).then(function(t){e.addEditDialog=!!t.code,e.$message[t.code?"danger":"success"](t.data.message),e.page=e.$options.filters.pagination(e.page,e.limit,e.dataList.total),e.getDataList()})}).catch(function(){e.$message.info("已取消删除")})},sure:function(){var t=this;this.pass?"2"!=this.pass||this.remark?(this.loading=!0,this.$api.editPunish({id:this.id,status:this.pass,fail:this.remark,types:this.types,to_uid:this.to_uid,values:this.values}).then(function(e){t.loading=!1,t.dialogVisible=!!e.code,t.$message[e.code?"warning":"success"](e.data.message),t.page=t.$options.filters.pagination(t.page,t.limit,t.dataList.total),t.getDataList()})):this.$message.warning("请填写驳回原因"):this.$message.warning("请选择通过或者驳回")}},created:function(){this.getDataList()}}),l=n,o=(a("95e6"),a("2877")),r=Object(o["a"])(l,i,s,!1,null,"26b85152",null);e["default"]=r.exports},ea35:function(t,e,a){}}]);
//# sourceMappingURL=punish.f9de3f85.js.map