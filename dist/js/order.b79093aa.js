(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["order"],{"8a21":function(t,e,a){"use strict";var i=a("fe0b"),n=a.n(i);n.a},dbf5:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order"},[a("div",{staticClass:"table_title"},[a("div",[t.isShow?a("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.back()}}},[t._v("返回")]):t._e()],1),a("div",{staticClass:"search_wrap"},[a("el-select",{staticClass:"selectOrder",attrs:{size:"mini",clearable:"",placeholder:"请选择订单类型"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.is_online,callback:function(e){t.is_online=e},expression:"is_online"}},t._l(t.order_typeList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.val}})}),1),a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入订单",size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("el-date-picker",{staticStyle:{margin:"0 10px"},attrs:{"value-format":"timestamp",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content",staticStyle:{width:"100%"}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.tabClick},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.tabList,function(e,i){return a("el-tab-pane",{key:i,attrs:{label:e.label,name:e.name}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList.list,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"order_sn",label:"订单编号",align:"center"}}),a("el-table-column",{attrs:{prop:"user_name",label:"用户名",align:"center"}}),a("el-table-column",{attrs:{prop:"amount",label:"订单金额(元)",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"admin_commission",label:"平台获得(元)",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"ag_commission",label:"代理商获得(元)",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"su_commission",label:"商户获得(元)",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"gu_commission",label:"专引师获得(元)",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"outlet",label:"折扣减免金额",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"card_id",label:"卡券编号",width:"60px",align:"center"}}),a("el-table-column",{attrs:{prop:"guide_name",label:"所属专引师",align:"center"}}),a("el-table-column",{attrs:{prop:"times",label:"下单时间",width:"100px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times)))]}}],null,!0)}),a("el-table-column",{attrs:{prop:"status",label:"订单状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"mini-button",attrs:{type:t._f("payStatus")(e.row.status),size:"mini"}},[t._v(t._s(t._f("orderStatus")(e.row.status)))])]}}],null,!0)}),-1!==["2","3","5"].indexOf(t.status)&&1==t.uid?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"mini-button",attrs:{type:"danger",size:"mini",icon:"iconfont qian"},on:{click:function(a){return t.refund(e.row.id)}}},[t._v("退款")])]}}],null,!0)}):t._e()],1)],1)}),1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},n=[],l=(a("7f7f"),a("1c46"),{data:function(){return{loading:!1,isShow:!1,height:100,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},tabList:[{label:"全部",name:"0"},{label:"待付款",name:"1"},{label:"待发货",name:"2"},{label:"已发货",name:"3"},{label:"退单",name:"4"},{label:"交易成功",name:"5"}],name:"",date:[],status:"0",dataList:[],page:1,limit:10,is_online:"",order_typeList:[{label:"线上订单",val:1},{label:"线下订单",val:2},{label:"技术服务费",val:3}],uid:JSON.parse(localStorage.getItem("userinfo")).id}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.getOrderList({page:this.page,limit:this.limit,status:this.status,times:this.date,order_sn:this.name,is_online:this.is_online}).then(function(e){t.dataList=e.data||[],e.code&&t.$message[e.code?"warning":"success"](e.data),t.loading=!1})},tabClick:function(t){this.status=t.name,this.page=1,this.getDataList()},search:function(){this.page=1,this.getDataList(),this.isShow=!0},back:function(){this.page=1,this.limit=10,this.status="0",this.date=[],this.name="",this.is_online="",this.getDataList(),this.isShow=!1},searchTypeList:function(t){console.log(t)},refund:function(t){var e=this;if(1!=JSON.parse(localStorage.getItem("userinfo")).id)return this.$message.error("当前登录用户没有权限退款");this.$confirm("确定要给该用户退款吗？").then(function(a){e.$api.setRefund({order_id:t,type:"GOODS"}).then(function(t){e.$message[t.code?"warning":"success"](t.data.message),e.getDataList()})}).catch(function(t){})}},created:function(){this.getDataList()}}),s=l,r=(a("8a21"),a("2877")),o=Object(r["a"])(s,i,n,!1,null,"b0c475c0",null);e["default"]=o.exports},fe0b:function(t,e,a){}}]);
//# sourceMappingURL=order.b79093aa.js.map