(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["goods"],{"3e8f":function(t,e){},a9ae:function(t,e,a){},ad22:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"goodsList"},[a("div",{staticClass:"table_title"},[t.show?a("el-button",{attrs:{type:"primary",icon:"el-icon-d-arrow-left",size:"mini"},on:{click:t.getBack}},[t._v("返回")]):t._e(),t.show?t._e():a("span"),a("div",{staticClass:"search_wrap"},[a("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入商品名称",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.goodsname,callback:function(e){t.goodsname=e},expression:"goodsname"}}),a("el-select",{attrs:{clearable:"",placeholder:"请选择商户",size:"small"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.su_id,callback:function(e){t.su_id=e},expression:"su_id"}},t._l(t.suList,function(t){return a("el-option",{key:t.supplier_id,attrs:{label:t.title,value:t.supplier_id}})}),1),t._v("上架时间：\n      "),a("el-date-picker",{attrs:{"value-format":"timestamp",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"起始时间","end-placeholder":"终止时间","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-radio-group",{staticStyle:{margin:"0 10px"},attrs:{size:"mini"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("el-radio",{attrs:{label:1},nativeOn:{click:function(e){return e.preventDefault(),t.clickitem(1)}}},[t._v("上架")]),a("el-radio",{attrs:{label:2},nativeOn:{click:function(e){return e.preventDefault(),t.clickitem(2)}}},[t._v("下架")])],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")])],1)],1),a("div",{staticClass:"content",staticStyle:{width:"100%"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList.list,border:"",stripe:"",height:t.height}},[a("el-table-column",{attrs:{prop:"gid",label:"ID",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"商品图片",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.pics}})]}}])}),a("el-table-column",{attrs:{prop:"goodname",label:"商品名称",align:"center"}}),a("el-table-column",{attrs:{prop:"price",label:"价格(元)",align:"center"}}),a("el-table-column",{attrs:{prop:"num",label:"库存",align:"center"}}),a("el-table-column",{attrs:{prop:"status",label:"当前状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",{staticStyle:{color:"red"}},[t._v("上架")]):a("span",{staticStyle:{color:"black"},attrs:{color:"black"}},[t._v("下架")])]}}])}),a("el-table-column",{attrs:{prop:"times",label:"上架日期",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times)))]}}])}),a("el-table-column",{attrs:{prop:"",label:"商户头像",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.shop_avatar}})]}}])}),a("el-table-column",{attrs:{prop:"shopname",label:"所属商户",align:"center"}}),a("el-table-column",{attrs:{prop:"username",label:"商户账号",align:"center"}})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},n=[],s=a("a897"),l=(a("3e8f"),{data:function(){return{loading:!1,height:100,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},page:1,limit:10,su_id:"",goodsname:"",date:[],status:"",dataList:[],suList:[],show:!1}},components:{editor:s["a"]},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getBack:function(){this.loading=!0,this.show=!1,this.su_id="",this.date=[],this.status="",this.goodsname="",this.getDataList()},getVestSu:function(){var t=this;this.$api.getVestSu().then(function(e){t.suList=e.data.list||[]})},getDataList:function(){var t=this;this.loading=!0,this.$api.getVestGoods({page:this.page,limit:this.limit,su_id:this.su_id,times:this.date,status:this.status,goodsname:this.goodsname}).then(function(e){t.dataList=e.data||[],t.height=100;var a=e.data.total;a>=10?t.height=750:0!=a&&(t.height=130*a),t.loading=!1})},clickitem:function(t){t===this.status?this.status="":this.status=t},search:function(){this.page=1,this.show=!0,this.getDataList()}},created:function(){this.getVestSu(),this.getDataList()}}),o=l,r=(a("e5f6"),a("2877")),c=Object(r["a"])(o,i,n,!1,null,"47db230e",null);e["default"]=c.exports},e5f6:function(t,e,a){"use strict";var i=a("a9ae"),n=a.n(i);n.a}}]);
//# sourceMappingURL=goods.832c6c89.js.map