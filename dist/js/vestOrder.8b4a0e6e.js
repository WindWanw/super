(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["vestOrder"],{"027a":function(e,t,a){"use strict";var n=a("dc55"),s=a.n(n);s.a},b002:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"order"},[a("div",{staticClass:"table_title"},[e.show?a("el-button",{attrs:{type:"primary",icon:"el-icon-d-arrow-left",size:"mini"},on:{click:e.getBack}},[e._v("返回")]):e._e(),e.show?e._e():a("span"),a("div",{staticClass:"search_wrap"},[a("el-radio-group",{staticStyle:{margin:"0 10px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.is_online,callback:function(t){e.is_online=t},expression:"is_online"}},[a("el-radio",{attrs:{label:"1"}},[e._v("线上订单")]),a("el-radio",{attrs:{label:"2"}},[e._v("线下订单")])],1),a("el-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入支付订单编号",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.pay_sn,callback:function(t){e.pay_sn=t},expression:"pay_sn"}}),a("el-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入订单编号",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.order_num,callback:function(t){e.order_num=t},expression:"order_num"}}),a("el-select",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请选择商户",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}},e._l(e.suList,function(e){return a("el-option",{key:e.supplier_id,attrs:{label:e.title,value:e.supplier_id}})}),1),e._v("下单时间：\n      "),a("el-date-picker",{staticStyle:{"margin-right":"10px"},attrs:{"value-format":"timestamp",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"起始时间","end-placeholder":"终止时间","picker-options":e.pickerOptions},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.search}},[e._v("搜索")]),a("el-button",{attrs:{type:"success",size:"mini",icon:"iconfont daochu"},on:{click:e.beforeExport}},[e._v("导出")])],1)],1),a("div",{staticClass:"content",staticStyle:{width:"100%"}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.tabClick},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},e._l(e.tabList,function(t,n){return a("el-tab-pane",{key:n,attrs:{label:t.label,name:t.name}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"order-table",attrs:{data:e.dataList.list,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"order_sn",label:"订单编号",align:"center"}}),a("el-table-column",{attrs:{prop:"order_type",label:"订单类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.order_type?a("span",{staticStyle:{color:"red"}},[e._v("线上订单")]):e._e(),"2"==t.row.order_type?a("span",[e._v("线下订单")]):e._e()]}}],null,!0)}),a("el-table-column",{attrs:{prop:"supplier_name",label:"商户姓名",align:"center"}}),a("el-table-column",{attrs:{prop:"amount",label:"订单金额(元)",align:"center"}}),a("el-table-column",{attrs:{prop:"actual",label:"实际金额(元)",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.order_type&&"5"!=t.row.status?a("span",[e._v("0")]):a("span",[e._v(e._s(t.row.actual))])]}}],null,!0)}),a("el-table-column",{attrs:{prop:"su_commission",label:"佣金(元)",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.order_type&&"5"!=t.row.status?a("span",[e._v("0")]):a("span",[e._v(e._s(t.row.su_commission))])]}}],null,!0)}),a("el-table-column",{attrs:{prop:"outlet",label:"折扣减免金额(元)",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.order_type&&"5"!=t.row.status?a("span",[e._v("0")]):a("span",[e._v(e._s(t.row.outlet))])]}}],null,!0)}),a("el-table-column",{attrs:{prop:"guide_name",label:"所属专引师",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.guide_name))]}}],null,!0)}),a("el-table-column",{attrs:{prop:"times",label:"下单时间",align:"center"}}),a("el-table-column",{attrs:{prop:"status",label:"订单状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e._f("payStatus")(t.row.status),size:"mini"}},[e._v(e._s(e._f("orderStatus")(t.row.status)))])]}}],null,!0)}),a("el-table-column",{attrs:{prop:"user_name",label:"消费者姓名",align:"center"}}),a("el-table-column",{attrs:{prop:"order_goods",label:"订单商品",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"mini-button",attrs:{title:"点击查看订单商品",type:"success",size:"mini",icon:"el-icon-view"},on:{click:function(a){return e.openOrderGoods(t.row.order_goods)}}},[e._v("订单商品")])]}}],null,!0)}),a("el-table-column",{attrs:{prop:"tel",label:"联系方式",align:"center"}}),a("el-table-column",{attrs:{prop:"address",label:"收货地址",align:"center"}}),"2"==e.status||"3"==e.status||"5"==e.status?a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return["2"==e.status&&"1"==t.row.order_type?a("el-button",{staticClass:"mini-button",attrs:{type:"success",size:"mini",icon:"el-icon-goods"},on:{click:function(a){e.orderId=t.row.id,e.guideId=t.row.guide_id,e.dialog=!0,e.address=t.row.address,e.uname=t.row.name,e.tel=t.row.tel,e.orderNumber="",e.orderCompany=""}}},[e._v("点击发货")]):e._e(),"2"!=e.status&&"1"==t.row.order_type?a("el-button",{staticClass:"mini-button",attrs:{type:"success",size:"mini",icon:"el-icon-goods"},on:{click:function(a){e.address=t.row.address,e.express_number=t.row.express_number,e.express_company=t.row.company,e.uname=t.row.name,e.tel=t.row.tel,e.exdialog=!0}}},[e._v("查看物流")]):e._e(),-1!==["2","3","5"].indexOf(e.status)&&1==e.uid?a("el-button",{staticClass:"mini-button",attrs:{type:"danger",size:"mini",icon:"iconfont qian"},on:{click:function(a){return e.refund(t.row.id)}}},[e._v("退款")]):e._e()]}}],null,!0)}):e._e()],1)],1)}),1),a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[10,20,50,100,200,500],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.dataList.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"订单商品",visible:e.openOrderGoodsDialog},on:{"update:visible":function(t){e.openOrderGoodsDialog=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.order_goods,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"title",label:"商品名称",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"商品图片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticClass:"avatar",attrs:{src:e.row.pics}})]}}])}),a("el-table-column",{attrs:{prop:"attr",label:"商品属性",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.goods_attr.attr_val))])]}}])})],1)],1),a("el-dialog",{attrs:{title:"发货",visible:e.dialog},on:{"update:visible":function(t){e.dialog=t},close:function(t){e.orderNumber="",e.orderCompany="",e.QTshow=!1}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户姓名"}},[a("el-input",{attrs:{readonly:""},model:{value:e.uname,callback:function(t){e.uname=t},expression:"uname"}})],1),a("el-form-item",{attrs:{label:"联系方式"}},[a("el-input",{attrs:{readonly:""},model:{value:e.tel,callback:function(t){e.tel=t},expression:"tel"}})],1),a("el-form-item",{attrs:{label:"目的地"}},[a("el-input",{attrs:{readonly:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1),a("el-form-item",{attrs:{label:"物流公司"}},[a("el-select",{attrs:{placeholder:"请选择物流公司"},on:{change:function(t){return e.getExpressCompany()}},model:{value:e.orderCompany,callback:function(t){e.orderCompany=t},expression:"orderCompany"}},e._l(e.expressList,function(e){return a("el-option",{key:e.val,attrs:{label:e.label,value:e.label}})}),1)],1),e.QTshow?a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入物流公司名称"},model:{value:e.QTCompany,callback:function(t){e.QTCompany=t},expression:"QTCompany"}})],1):e._e(),a("el-form-item",{attrs:{label:"物流单号"}},[a("el-input",{attrs:{placeholder:"请输入物流单号"},model:{value:e.orderNumber,callback:function(t){e.orderNumber=t},expression:"orderNumber"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.sendGoods}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"查看物流",visible:e.exdialog},on:{"update:visible":function(t){e.exdialog=t}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户姓名"}},[a("el-input",{attrs:{readonly:""},model:{value:e.uname,callback:function(t){e.uname=t},expression:"uname"}})],1),a("el-form-item",{attrs:{label:"联系方式"}},[a("el-input",{attrs:{readonly:""},model:{value:e.tel,callback:function(t){e.tel=t},expression:"tel"}})],1),a("el-form-item",{attrs:{label:"目的地"}},[a("el-input",{attrs:{readonly:""},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1),a("el-form-item",{attrs:{label:"物流单号"}},[a("el-input",{attrs:{readonly:""},model:{value:e.express_number,callback:function(t){e.express_number=t},expression:"express_number"}})],1),a("el-form-item",{attrs:{label:"物流公司"}},[a("el-input",{attrs:{readonly:""},model:{value:e.express_company,callback:function(t){e.express_company=t},expression:"express_company"}})],1)],1)],1)],1)},s=[],i=(a("7f7f"),a("21a6")),o=a.n(i),l=a("1146"),r=a.n(l),u={data:function(){return{loading:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},tabList:[{label:"全部",name:"0"},{label:"待付款",name:"1"},{label:"待发货",name:"2"},{label:"已发货",name:"3"},{label:"退单",name:"4"},{label:"交易成功",name:"5"}],name:"",date:[],status:"0",title:"",is_online:"",dataList:[],suList:[],page:1,limit:10,dialog:!1,exdialog:!1,orderId:"",guideId:"",orderNumber:"",orderCompany:"",QTCompany:"",express_number:"",express_company:"",address:"",order_num:"",pay_sn:"",uname:"",tel:"",show:!1,openOrderGoodsDialog:!1,order_goods:[],expressList:[],QTshow:!1,uid:JSON.parse(localStorage.getItem("userinfo")).id}},mounted:function(){},methods:{beforeExport:function(){var e=this;this.$confirm("确定导出当前页数据吗？(选择100条/页试试)").then(function(t){e.exportExcel()}).catch(function(e){})},exportExcel:function(){var e=r.a.utils.table_to_book(document.querySelector(".order-table")),t=r.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{o.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"orderList.xlsx")}catch(a){"undefined"!==typeof console&&console.log(a,t)}return t},handleSizeChange:function(e){this.limit=e,this.getDataList()},handleCurrentChange:function(e){this.page=e,this.getDataList()},getBack:function(){this.loading=!0,this.show=!1,this.status="0",this.date=[],this.name="",this.title="",this.order_num="",this.pay_sn="",this.is_online="",this.getDataList()},getDataList:function(){var e=this;this.loading=!0,this.$api.vestOrderList({page:this.page,limit:this.limit,status:this.status,times:this.date,title:this.title,keywords:this.name,is_online:this.is_online,order_sn:this.order_num,pay_sn:this.pay_sn}).then(function(t){e.dataList=t.data||[],e.loading=!1})},openOrderGoods:function(e){this.openOrderGoodsDialog=!0,this.order_goods=e},getVestSu:function(){var e=this;this.$api.getVestSu().then(function(t){e.suList=t.data.list||[]})},tabClick:function(e){this.status=e.name,this.page=1,this.getDataList()},search:function(){this.show=!0,this.page=1,this.getDataList()},sendGoods:function(){var e=this;return this.orderNumber?this.orderCompany?void this.$api.sendGoods({id:this.orderId,guide_id:this.guideId,express_number:this.orderNumber,company:this.orderCompany,qtcompany:this.QTCompany}).then(function(t){e.$message[t.code?"warning":"success"](t.data.message),t.code||(e.dialog=!1,e.getDataList())}):this.$message.warning("请输入物物公司名称"):this.$message.warning("请输入物流单号")},getExpress:function(){var e=this;this.$api.getExpress().then(function(t){e.expressList=t.data.list||[]})},getExpressCompany:function(){console.log(this.orderCompany),"其他"==this.orderCompany?this.QTshow=!0:(this.QTshow=!1,this.QTCompany="")},clickitem:function(e){e===this.is_online?this.is_online="":this.is_online=e},refund:function(e){var t=this;if(1!=JSON.parse(localStorage.getItem("userinfo")).id)return this.$message.error("当前登录用户没有权限退款");this.$confirm("确定要给该用户退款吗？").then(function(a){t.$api.setRefund({order_id:e,type:"VEST"}).then(function(e){t.$message[e.code?"warning":"success"](e.data.message),t.getDataList()})}).catch(function(e){})}},created:function(){var e=this.$route.query;console.log(e),"{}"!=JSON.stringify(e)&&(this.status=e.status),this.getVestSu(),this.getDataList(),this.getExpress()}},c=u,d=(a("027a"),a("2877")),p=Object(d["a"])(c,n,s,!1,null,"ec32c156",null);t["default"]=p.exports},dc55:function(e,t,a){}}]);
//# sourceMappingURL=vestOrder.8b4a0e6e.js.map