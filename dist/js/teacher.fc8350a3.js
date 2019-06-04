(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["teacher"],{1701:function(t,e,i){},1936:function(t,e,i){"use strict";var n=i("1701"),a=i.n(n);a.a},"491b":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"teacher"},[i("div",{staticClass:"table_title"},[i("div",{staticClass:"search_wrap"},[i("el-select",{attrs:{clearable:"",placeholder:"请选择用户类型",size:"small"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[i("el-option",{attrs:{label:"正常",value:1}}),i("el-option",{attrs:{label:"禁用",value:-1}})],1),i("el-date-picker",{staticStyle:{margin:"0 10px"},attrs:{"value-format":"timestamp",size:"small",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.times,callback:function(e){t.times=e},expression:"times"}}),i("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.search}},[t._v("搜索")])],1)]),i("div",{staticClass:"content"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList.info,stripe:"",border:""}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"expand_wrap"},[i("p",[i("span",[t._v("手机号码:")]),t._v(t._s(e.row.tel))]),i("p",[i("span",[t._v("身份证号码:")]),t._v(t._s(e.row.idcard))]),i("p",[i("span",[t._v("身份证正反面:")]),i("img",{staticClass:"idcard_img",attrs:{src:e.row.picOn}}),i("img",{staticClass:"idcard_img",attrs:{src:e.row.picOff}})])])]}}])}),i("el-table-column",{attrs:{prop:"username",label:"用户名"}}),i("el-table-column",{attrs:{prop:"city",label:"专引城市"}}),i("el-table-column",{attrs:{prop:"tag",label:"标签",width:"300px"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.tag,function(e,n){return n<4?i("el-tag",{key:e,staticStyle:{"margin-right":"10px"}},[t._v(t._s(e))]):t._e()})}}])}),i("el-table-column",{attrs:{prop:"shopname",label:"商店"}}),i("el-table-column",{attrs:{prop:"times",label:"注册时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("formatTimeStamp")(e.row.times))+"\n        ")]}}])}),i("el-table-column",{attrs:{prop:"",label:"账号状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{title:"1"==e.row.status?"点击禁用":"点击解除禁用",type:"1"==e.row.status?"success":"info",size:"mini"},on:{click:function(i){return t.userStop(e.row.id)}}},[t._v(t._s(t._f("userStatus")(e.row.status)))])]}}])}),i("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"cz_btn"},[i("el-button",{attrs:{type:"warning",size:"mini",icon:"el-icon-edit-outline"},on:{click:function(i){return t.openPunishDialog(e.row)}}},[t._v("处罚")])],1)]}}])})],1),i("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),i("el-dialog",{attrs:{title:"惩罚",visible:t.punishDialog,"label-width":"120px",width:"30%"},on:{"update:visible":function(e){t.punishDialog=e},close:function(t){}}},[i("el-form",[i("el-form-item",{attrs:{label:"处罚类型"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚类型"},model:{value:t.punishType,callback:function(e){t.punishType=e},expression:"punishType"}},t._l(t.punishList,function(t){return i("el-option",{key:t.value,attrs:{label:t.title,value:t.val}})}),1)],1),t.punishType?i("el-form-item",{attrs:{label:"处罚内容"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚内容"},model:{value:t.punishContent,callback:function(e){t.punishContent=e},expression:"punishContent"}},t._l(t.punishContentList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t}})}),1)],1):t._e()],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.punishDialog=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.punishSure}},[t._v("确 定")])],1)],1)],1)},a=[],s=i("f499"),l=i.n(s),o={data:function(){return{loading:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]},dataList:[],page:1,limit:10,times:"",shopname:"",status:1,punishDialog:!1,punishList:"",punishContentList:"",punishId:"",punishType:"",punishContent:""}},watch:{punishType:function(t,e){var i=this;console.log(t),this.punishList.forEach(function(e){t==e.val&&(i.punishContentList=e.type)})}},components:{},methods:{getDataList:function(){var t=this;this.loading=!0,this.$api.getGuideList({page:this.page,limit:this.limit,times:this.times,shopname:this.shopname,status:this.status}).then(function(e){t.dataList=e.data||[],t.loading=!1})},handleSizeChange:function(t){this.page=t,this.getDataList()},handleCurrentChange:function(t){this.limit=t,this.getDataList()},search:function(){this.page=1,this.getDataList()},userStop:function(t){var e=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){e.$api.guideStop({uid:t}).then(function(t){e.$message[t.code?"warning":"success"](t.data),e.getDataList()})}).catch(function(){e.$message.info("已取消操作")})},getPunishType:function(){var t=this;this.$api.getPunishType().then(function(e){t.punishList=e.data})},openPunishDialog:function(t){this.getPunishType(),this.punishId=t.id,this.punishDialog=!0},punishSure:function(){var t=this;if(!this.punishType||!this.punishContent)return this.$message.warning("请处罚类型和处罚内容");this.$api.addPunish({to_uid:this.punishId,types:this.punishType,values:l()(this.punishContent)}).then(function(e){t.$message[e.code?"warning":"success"](e.data.message),t.punishDialog=!!e.code})}},created:function(){this.getDataList()}},r=o,u=(i("1936"),i("2877")),c=Object(u["a"])(r,n,a,!1,null,"d6602f98",null);e["default"]=c.exports},a21f:function(t,e,i){var n=i("584a"),a=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}},f499:function(t,e,i){t.exports=i("a21f")}}]);
//# sourceMappingURL=teacher.fc8350a3.js.map