(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["seller"],{"05a9":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"sellerList"},[i("div",{staticClass:"table_title"},[i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(t){return e.openAddEditDialog("add")}}},[e._v("添加商户")]),i("div",{staticClass:"search_wrap"},[i("el-input",{staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入账号",size:"small"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),i("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择用户类型",size:"small"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[i("el-option",{attrs:{label:"正常",value:1}}),i("el-option",{attrs:{label:"禁用",value:-1}})],1),i("el-date-picker",{attrs:{size:"small",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:e.search}},[e._v("搜索")])],1)],1),i("div",{staticClass:"content"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.dataList.list,stripe:"",border:""}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"expand_wrap"},[i("p",[i("span",[e._v("身份证号码:")]),e._v(e._s(t.row.idcard))]),i("p",[i("span",[e._v("身份证正反面:")]),i("img",{staticClass:"idcard_img",attrs:{src:t.row.picOn}}),i("img",{staticClass:"idcard_img",attrs:{src:t.row.picOff}})]),i("p",[i("span",[e._v("营业执照:")]),i("img",{staticClass:"license_img",attrs:{src:t.row.license}})])])]}}])}),i("el-table-column",{attrs:{prop:"city",label:"城市"}}),i("el-table-column",{attrs:{prop:"username",label:"账号"}}),i("el-table-column",{attrs:{prop:"name",label:"姓名"}}),i("el-table-column",{attrs:{prop:"address",label:"详细地址"}}),i("el-table-column",{attrs:{prop:"message",label:"商户描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.message||"无")+"\n        ")]}}])}),i("el-table-column",{attrs:{prop:"tel",label:"手机号码"}}),i("el-table-column",{attrs:{prop:"times",label:"入驻时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("formatTimeStamp")(t.row.times)))]}}])}),i("el-table-column",{attrs:{prop:"",label:"账号状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"1"==t.row.status?"success":"info"}},[e._v(e._s(e._f("userStatus")(t.row.status)))])]}}])}),i("el-table-column",{attrs:{prop:"",label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"warning",size:"mini",icon:"el-icon-edit-outline"},on:{click:function(i){return e.openPunishDialog(t.row)}}},[e._v("处罚")]),i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(i){return e.openAddEditDialog("edit",t.row)}}},[e._v("编辑")]),i("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(i){return e.del(t.row.id)}}},[e._v("删除")])]}}])})],1),i("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[10,20,50,100],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.dataList.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),i("el-dialog",{attrs:{top:"20px",title:e.form.id?"修改":"添加",visible:e.AddEditDialog,width:"650px"},on:{"update:visible":function(t){e.AddEditDialog=t},close:function(t){return e.$refs["ruleForm"].resetFields()}}},[i("el-form",{ref:"ruleForm",attrs:{"status-icon":"",model:e.form,rules:e.rules,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"城市"}},[i("el-cascader",{attrs:{options:e.cityData,"change-on-select":"",placeholder:e.form.id?"如需修改请选择":"请选择城市"},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}}),e.form.id?i("span",{staticStyle:{"margin-left":"20px"}},[e._v("当前城市:"+e._s(e.city))]):e._e()],1),e.form.id?e._e():i("el-form-item",{attrs:{label:"账号",prop:e.form.id?"":"username"}},[i("el-input",{attrs:{type:"username",placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),i("el-form-item",{attrs:{label:"密码",prop:e.form.id?"":"password"}},[i("el-input",{attrs:{type:"password",placeholder:e.form.id?"不填默认不修改":"请输入密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),i("el-form-item",{attrs:{label:"手机号码",prop:"tel"}},[i("el-input",{attrs:{placeholder:"请输入手机号码"},model:{value:e.form.tel,callback:function(t){e.$set(e.form,"tel",t)},expression:"form.tel"}})],1),i("el-form-item",{attrs:{label:"姓名",prop:"name"}},[i("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"商户描述"}},[i("el-input",{attrs:{placeholder:"请输入商户描述"},model:{value:e.form.message,callback:function(t){e.$set(e.form,"message",t)},expression:"form.message"}})],1),i("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[i("el-input",{attrs:{placeholder:"请输入详细地址"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1),i("el-form-item",{attrs:{label:"身份证号码",prop:"idcard"}},[i("el-input",{attrs:{placeholder:"请输入身份证号码"},model:{value:e.form.idcard,callback:function(t){e.$set(e.form,"idcard",t)},expression:"form.idcard"}})],1),i("el-form-item",{attrs:{label:"身份证正面",prop:"picOn"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/sfz_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp1,"show-file-list":!1,"on-success":e.upSuc1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.picOn?i("img",{staticClass:"idcard_img",attrs:{src:e.form.picOn}}):e._e()],1),i("el-form-item",{attrs:{label:"身份证反面",prop:"picOff"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/sfz_upload_dir",accept:"image/jpeg,image/gif,image/png,image/bmp","before-upload":e.beforeUp2,"show-file-list":!1,"on-success":e.upSuc2}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.picOff?i("img",{staticClass:"idcard_img",attrs:{src:e.form.picOff}}):e._e()],1),i("el-form-item",{attrs:{label:"营业执照",prop:"license"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/license_upload_dir",accept:"image/jpeg,image/gif,image/png,image/bmp","before-upload":e.beforeUp3,"show-file-list":!1,"on-success":e.upSuc3}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.license?i("img",{staticClass:"license_img",attrs:{src:e.form.license}}):e._e()],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.AddEditDialog=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.addEdit}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"惩罚",visible:e.punishDialog,"label-width":"120px",width:"30%"},on:{"update:visible":function(t){e.punishDialog=t}}},[i("el-form",{attrs:{model:e.form}},[i("el-form-item",{attrs:{label:"处罚类型"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚类型"},model:{value:e.punishType,callback:function(t){e.punishType=t},expression:"punishType"}},e._l(e.punishList,function(e){return i("el-option",{key:e.value,attrs:{label:e.title,value:e.val}})}),1)],1),e.punishType?i("el-form-item",{attrs:{label:"处罚内容"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚内容"},model:{value:e.punishContent,callback:function(t){e.punishContent=t},expression:"punishContent"}},e._l(e.punishContentList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e}})}),1)],1):e._e()],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.punishDialog=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.punishSure}},[e._v("确 定")])],1)],1)],1)},s=[],r=i("f499"),n=i.n(r),l=(i("7f7f"),i("85f2")),o=i.n(l);function c(e,t,i){return t in e?o()(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var u=i("2e8e"),p={data:function(){var e;return{loading:!1,rules:{username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}],tel:[{validator:this.$rules.checkPhone,required:!0,trigger:"blur"}],name:[{required:!0,message:"姓名不能为空",trigger:"blur"}],address:[{required:!0,message:"详细地址不能为空",trigger:"blur"}],idcard:[{validator:this.$rules.checkId,required:!0,trigger:"blur"}],picOn:[{required:!0,message:"身份证正面不能为空",trigger:"blur"}],picOff:[{required:!0,message:"身份证反面不能为空",trigger:"blur"}],license:[{required:!0,message:"营业执照不能为空",trigger:"blur"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]},username:"",status:"",date:"",dataList:[],page:1,limit:10,AddEditDialog:!1,cityData:u["a"],selectCity:[],city:"",form:(e={username:"",password:"",tel:"",name:"",message:"",address:""},c(e,"tel",""),c(e,"idcard",""),c(e,"picOn",""),c(e,"picOff",""),c(e,"license",""),e),punishDialog:!1,punishList:"",punishContentList:"",punishId:"",punishType:"",punishContent:""}},watch:{punishType:function(e,t){var i=this;console.log(e),this.punishList.forEach(function(t){e==t.val&&(i.punishContentList=t.type)})}},components:{},methods:{handleSizeChange:function(e){this.limit=e,this.getDataList()},handleCurrentChange:function(e){this.page=e,this.getDataList()},getDataList:function(){var e=this;this.loading=!0,this.$api.getSellerList({page:this.page,limit:this.limit,status:this.status,times:this.date,username:this.username}).then(function(t){e.dataList=t.data||[],e.loading=!1})},search:function(){this.page=1,this.getDataList()},userStop:function(e){var t=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){t.$api.userStop({uid:e,result:""}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})}).catch(function(){t.$message.info("已取消删除")})},openAddEditDialog:function(e,t){if("add"==e){for(var i in this.form)this.form[i]="";this.selectCity=[]}else this.form.username=t.username,this.form.password=t.password||"",this.city=t.city,this.selectCity=[],this.form.name=t.name,this.form.tel=t.tel,this.form.address=t.address,this.form.idcard=t.idcard,this.form.id=t.id,this.form.picOn=t.picOn,this.form.picOff=t.picOff,this.form.license=t.license;this.AddEditDialog=!0},beforeUp1:function(e){if(e.size>2097152)return this.$message.warning("图片不能超过2MB"),!1},upSuc1:function(e,t,i){console.log(e),e.code||(this.form.picOn=e.data.host+e.data.name)},beforeUp2:function(e){},upSuc2:function(e,t,i){console.log(e),e.code||(this.form.picOff=e.data.host+e.data.name)},beforeUp3:function(e){},upSuc3:function(e,t,i){console.log(e),e.code||(this.form.license=e.data.host+e.data.name)},addEdit:function(){var e=this;if(!this.form.id&&(!e.selectCity||!e.selectCity.length))return this.$message.warning("请选择城市");e.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$api[e.form.id?"editSeller":"addSeller"]({username:e.form.username,password:e.form.password,tel:e.form.tel,citycode:e.selectCity,id:e.form.id||"",material:{name:e.form.name,address:e.form.address,idcard:e.form.idcard,picOn:e.form.picOn,picOff:e.form.picOff,license:e.form.license}}).then(function(t){e.$message[t.code?"error":"success"](t.data.message),e.form.id||(e.page=1),e.getDataList(),e.AddEditDialog=!!t.code})})},del:function(e){var t=this;this.$confirm("确认删除该项吗?","提示",{type:"warning"}).then(function(){t.$api.delSeller({id:e}).then(function(e){t.$message[e.code?"error":"success"](e.data.message),t.page=t.$options.filters.pagination(t.page,t.limit,t.dataList.total),t.getDataList()})}).catch(function(){t.$message.info("已取消删除")})},getPunishType:function(){var e=this;this.$api.getPunishType().then(function(t){e.punishList=t.data})},openPunishDialog:function(e){this.getPunishType(),this.punishId=e.id,this.punishDialog=!0},punishSure:function(){var e=this;if(!this.punishType||!this.punishContent)return this.$message.warning("请处罚类型和处罚内容");this.$api.addPunish({to_uid:this.punishId,types:this.punishType,values:n()(this.punishContent)}).then(function(t){e.$message[t.code?"warning":"success"](t.data.message),e.punishDialog=!!t.code})}},created:function(){this.getDataList()}},d=p,m=(i("e106"),i("2877")),f=Object(m["a"])(d,a,s,!1,null,"421214b2",null);t["default"]=f.exports},"454f":function(e,t,i){i("46a7");var a=i("584a").Object;e.exports=function(e,t,i){return a.defineProperty(e,t,i)}},"46a7":function(e,t,i){var a=i("63b6");a(a.S+a.F*!i("8e60"),"Object",{defineProperty:i("d9f6").f})},"85f2":function(e,t,i){e.exports=i("454f")},"8db3":function(e,t,i){},a21f:function(e,t,i){var a=i("584a"),s=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},e106:function(e,t,i){"use strict";var a=i("8db3"),s=i.n(a);s.a},f499:function(e,t,i){e.exports=i("a21f")}}]);
//# sourceMappingURL=seller.0c43bc82.js.map