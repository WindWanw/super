(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["needList"],{"0a88":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"userList"},[a("div",{staticClass:"table_title"},[a("div",[a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"iconfont refresh",size:"mini"},on:{click:t.returnHome}},[t._v("   刷新")])],1),a("div",{staticClass:"search_wrap"},[a("el-date-picker",{attrs:{size:"mini",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList.list,stripe:"",border:"",height:t.height}},[a("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"头像",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"avatar",attrs:{src:t.row.avatar}})]}}])}),a("el-table-column",{attrs:{prop:"info",label:"内容",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.info?a("span",[t._v(t._s(e.row.info))]):t._e(),e.row.audio?a("span",{staticStyle:{color:"green"}},[t._v("这是一条语音消息")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"times",label:"发布时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.times,1)))]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"mini-button",attrs:{type:"primary",icon:"iconfont qrcode-1-copy",size:"mini"},on:{click:function(a){return t.qrcode(e.row)}}},[t._v("点击联系")])]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{visible:t.qrcodeDialog,width:"300px",height:"300px"},on:{"update:visible":function(e){t.qrcodeDialog=e}}},[a("div",{staticClass:"view-img"},[a("img",{attrs:{src:t.qrcodeImg}})])])],1)},n=[],s={data:function(){return{loading:!1,height:100,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},date:"",dataList:[],page:1,limit:10,qrcodeImg:"",qrcodeDialog:!1}},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},qrcode:function(t){var e=this;this.qrcodeDialog=!0,this.$api.transWx({immuuid:t.immuuid}).then(function(t){e.qrcodeImg=t.data.img})},getDataList:function(){var t=this;this.loading=!0,this.$api.getNeedList({page:this.page,limit:this.limit,date:this.date}).then(function(e){t.dataList=e.data||[],t.height=100;var a=e.data.total;a>=10?t.height=750:0!=a&&(t.height=100*a),e.code&&t.$message[e.code?"warning":"success"](e.data),t.loading=!1})},search:function(){this.page=1,this.getDataList()},returnHome:function(){this.date=[],this.getDataList()}},created:function(){this.getDataList()}},r=s,o=(a("5443"),a("2877")),l=Object(o["a"])(r,i,n,!1,null,"6c44ecb8",null);e["default"]=l.exports},"300d":function(t,e,a){},5443:function(t,e,a){"use strict";var i=a("300d"),n=a.n(i);n.a}}]);
//# sourceMappingURL=needList.6d1ee29a.js.map