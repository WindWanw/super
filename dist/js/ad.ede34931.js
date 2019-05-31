(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ad"],{"42f6":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ad"},[i("div",{staticClass:"table_title"},[i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(e){return t.openAddEditDialog("add")}}},[t._v("添加广告")])],1),i("div",{staticClass:"content"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dataList.list,stripe:"",border:""}},[i("el-table-column",{attrs:{prop:"city",label:"城市"}}),i("el-table-column",{attrs:{prop:"ads",label:"广告内容",width:"250px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[i("span",[t._v("标题:")]),t._v(t._s(e.row.ads.title))]),i("div",[i("span",[t._v("链接:")]),t._v(t._s(e.row.ads.url))]),e.row.ads.pic?i("img",{staticClass:"ad_img",attrs:{src:e.row.ads.pic}}):t._e()]}}])}),i("el-table-column",{attrs:{prop:"page",label:"页面"}}),i("el-table-column",{attrs:{prop:"adder",label:"添加人"}}),i("el-table-column",{attrs:{prop:"checker",label:"审核人"}}),i("el-table-column",{attrs:{prop:"begin",label:"上架时间",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.begin)))]}}])}),i("el-table-column",{attrs:{prop:"timeout",label:"下架时间",width:"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTimeStamp")(e.row.timeout)))]}}])}),i("el-table-column",{attrs:{prop:"",label:"操作",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"cz_btn"},[i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(i){return t.openAddEditDialog("edit",e.row)}}},[t._v("编辑")]),i("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(i){return t.del(e.row.id)}}},[t._v("删除")])],1)]}}])})],1),i("el-pagination",{attrs:{background:"","current-page":t.page,"page-sizes":[10,20,50,100],"page-size":t.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.dataList.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),i("el-dialog",{attrs:{top:"20px",title:t.form.id?"修改":"添加",visible:t.AddEditDialog,width:"650px"},on:{"update:visible":function(e){t.AddEditDialog=e},close:function(e){return t.$refs["ruleForm"].resetFields()}}},[i("el-form",{ref:"ruleForm",attrs:{"status-icon":"",model:t.form,rules:t.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"广告页",prop:"page"}},[i("el-input",{attrs:{placeholder:"请输入广告页"},model:{value:t.form.page,callback:function(e){t.$set(t.form,"page",e)},expression:"form.page"}})],1),i("el-form-item",{attrs:{label:"城市"}},[i("el-cascader",{attrs:{options:t.cityData,"change-on-select":"",placeholder:t.form.id?"如需修改请选择":"请选择城市"},model:{value:t.selectCity,callback:function(e){t.selectCity=e},expression:"selectCity"}}),t.form.id?i("span",{staticStyle:{"margin-left":"20px"}},[t._v("当前城市:"+t._s(t.city))]):t._e()],1),i("el-form-item",{attrs:{label:"广告链接"}},[i("el-input",{attrs:{placeholder:"请输入广告链接"},model:{value:t.form.url,callback:function(e){t.$set(t.form,"url",e)},expression:"form.url"}})],1),i("el-form-item",{attrs:{label:"广告标题",prop:t.form.pic?"":"title"}},[i("el-input",{attrs:{placeholder:"请输入广告标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"广告图片",prop:t.form.title?"":"pic"}},[i("el-upload",{attrs:{action:t.axios.defaults.baseURL+"/common/upload/file/adv_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":t.beforeUp1,"show-file-list":!1,"on-success":t.upSuc1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),t.form.pic?i("img",{staticClass:"ad_img",attrs:{src:t.form.pic}}):t._e()],1),i("el-form-item",{attrs:{label:"上下架时间",prop:"times"}},[i("el-date-picker",{attrs:{"value-format":"timestamp",size:"small",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.form.times,callback:function(e){t.$set(t.form,"times",e)},expression:"form.times"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.AddEditDialog=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.addEdit}},[t._v("确 定")])],1)],1)],1)},l=[],r=(i("7f7f"),i("2e8e")),s=i("9dac"),o={data:function(){return{loading:!1,dataList:[],page:1,limit:10,AddEditDialog:!1,cityData:r["a"],selectCity:[],city:"",form:{page:"",title:"",url:"",pic:"",id:"",times:""},rules:{page:[{required:!0,message:"账号不能为空",trigger:"blur"}],title:[{required:!0,message:"广告标题不能为空",trigger:"blur"}],pic:[{required:!0,message:"广告图片不能为空",trigger:"blur"}],times:[{required:!0,message:"上下架时间不能为空",trigger:"blur"}]}}},components:{upload:s["a"]},methods:{handleSizeChange:function(t){this.limit=t,this.getDataList()},handleCurrentChange:function(t){this.page=t,this.getDataList()},getDataList:function(){var t=this;this.loading=!0,this.$api.getAdList({page:this.page,limit:this.limit}).then(function(e){t.dataList=e.data||[],t.loading=!1})},openAddEditDialog:function(t,e){if("add"==t){for(var i in this.form)this.form[i]="";this.selectCity=[]}else{this.form.page=e.page,this.city=e.city,this.selectCity=[],this.form.title=e.ads.title,this.form.url=e.ads.url,this.form.pic=e.ads.pic,this.form.id=e.id;var a=e.begin?[1e3*e.begin,1e3*e.timeout]:"";this.form.times=a}this.AddEditDialog=!0},beforeUp1:function(t){if(t.size>2097152)return this.$message.warning("图片不能超过2MB"),!1},upSuc1:function(t,e,i){console.log(t),t.code||(this.form.pic=t.data.host+t.data.name)},addEdit:function(){var t=this,e=this;if(!this.form.id&&(!e.selectCity||!e.selectCity.length))return this.$message.warning("请选择城市");e.$refs.ruleForm.validate(function(i){if(!i)return!1;var a={title:e.form.title,pic:e.form.pic,url:e.form.url};e.$api[e.form.id?"editAd":"addAd"]({page:e.form.page,city:e.selectCity,times:e.form.times,ads:a,id:e.form.id}).then(function(i){e.AddEditDialog=!!i.code,e.$message[i.code?"error":"success"](i.data.message),e.form.id||(t.page=1),e.getDataList()})})},del:function(t){var e=this;this.$confirm("确认删除该项吗?","提示",{type:"warning"}).then(function(){e.$api.delAd({id:t}).then(function(t){e.$message[t.code?"error":"success"](t.data.message),e.page=e.$options.filters.pagination(e.page,e.limit,e.dataList.total),e.getDataList()})}).catch(function(){e.$message.info("已取消删除")})}},created:function(){this.getDataList()}},n=o,d=(i("7e05"),i("2877")),c=Object(d["a"])(n,a,l,!1,null,"a0abe956",null);e["default"]=c.exports},"7e05":function(t,e,i){"use strict";var a=i("d60b"),l=i.n(a);l.a},d60b:function(t,e,i){}}]);
//# sourceMappingURL=ad.ede34931.js.map