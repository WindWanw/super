(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sellers"],{"7eb9":function(e,t,i){},d4e3:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"sellerList"},[i("div",{staticClass:"table_title"},[i("div",[e.isShow?i("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.back()}}},[e._v("返回")]):e._e()],1),i("div",{staticClass:"search_wrap"},[i("el-input",{staticStyle:{width:"150px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入店铺名称",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),i("el-input",{staticStyle:{width:"150px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入审核人员姓名",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.checker,callback:function(t){e.checker=t},expression:"checker"}}),i("el-input",{staticStyle:{width:"150px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入商户姓名",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),i("el-input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入商户账号",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),i("el-select",{staticStyle:{margin:"0 10px"},attrs:{clearable:"",placeholder:"请选择商户账号状态",size:"mini"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[i("el-option",{attrs:{label:"正常",value:1}}),i("el-option",{attrs:{label:"禁用",value:-1}})],1),i("el-date-picker",{attrs:{size:"mini",type:"daterange",align:"right","unlink-panels":"","value-format":"timestamp","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.search}},[e._v("搜索")]),i("el-button",{attrs:{type:"success",size:"mini",icon:"iconfont daochu"},on:{click:e.beforeExport}},[e._v("导出")])],1)]),i("div",{staticClass:"content"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"seller-table",attrs:{data:e.dataList.list,stripe:"",border:""},on:{"cell-click":e.toGoodlist}},[i("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticClass:"expand_wrap"},[i("p",[i("span",[e._v("身份证号码:")]),e._v("\n              "+e._s(t.row.idcard)+"\n            ")]),i("p",[i("span",[e._v("身份证正反面:")]),i("img",{staticClass:"idcard_img viewBig",attrs:{src:t.row.picOn},on:{click:function(i){return e.viewBigImg(t.row.picOn)}}}),i("img",{staticClass:"idcard_img viewBig",attrs:{src:t.row.picOff},on:{click:function(i){return e.viewBigImg(t.row.picOff)}}})]),i("p",[i("span",[e._v("营业执照:")]),i("img",{staticClass:"license_img viewBig",attrs:{src:t.row.license},on:{click:function(i){return e.viewBigImg(t.row.license)}}})])])]}}])}),i("el-table-column",{attrs:{prop:"city",label:"城市",align:"center"}}),i("el-table-column",{attrs:{prop:"username",label:"账号",align:"center"}}),i("el-table-column",{attrs:{prop:"name",label:"商户姓名",align:"center"}}),i("el-table-column",{attrs:{prop:"tags",label:"店铺标签",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{size:"mini",type:t.row.tags?"primary":"danger"}},[e._v(e._s(t.row.tags?t.row.tags:"无"))])]}}])}),i("el-table-column",{attrs:{prop:"shopname",label:"店铺名称",align:"center"}}),i("el-table-column",{attrs:{prop:"address",label:"详细地址",align:"center"}}),i("el-table-column",{attrs:{prop:"commission",label:"托管模式",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tag",{attrs:{size:"mini",type:1==t.row.commission?"success":"warning"}},[e._v(e._s(1==t.row.commission?"平台托管":"自定义"))])]}}])}),i("el-table-column",{attrs:{prop:"discount",label:"折扣率(%)",align:"center"}}),i("el-table-column",{attrs:{prop:"tel",label:"手机号码",align:"center"}}),i("el-table-column",{attrs:{prop:"guide_num",label:"专引师数量",align:"center"}}),i("el-table-column",{attrs:{prop:"checker",label:"审核人",align:"center"}}),i("el-table-column",{attrs:{prop:"times",label:"入驻时间",align:"center"}}),i("el-table-column",{attrs:{prop:"",label:"账号状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{staticClass:"mini-button",attrs:{size:"mini",type:"1"==t.row.status?"success":"info"}},[e._v(e._s(e._f("userStatus")(t.row.status)))])]}}])}),e.isSetting?i("el-table-column",{attrs:{prop:"",label:"操作",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{staticClass:"mini-button",attrs:{type:"warning",size:"mini",icon:"el-icon-edit-outline"},on:{click:function(i){return e.openPunishDialog(t.row)}}},[e._v("处罚")]),i("el-button",{staticClass:"mini-button",attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(i){return e.openAddEditDialog("edit",t.row)}}},[e._v("编辑")]),i("el-button",{staticClass:"mini-button",attrs:{type:"danger",size:"mini",icon:"iconfont chexiao1"},on:{click:function(i){return e.cancel(t.row.id)}}},[e._v("撤销")])]}}],null,!1,3190487869)}):e._e()],1),i("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[10,20,50,100],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.dataList.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),i("el-dialog",{attrs:{top:"50px",title:"查看大图",visible:e.viewImg},on:{"update:visible":function(t){e.viewImg=t}}},[i("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.viewBigImage}})]),i("el-dialog",{attrs:{top:"20px",title:e.form.id?"修改":"添加",visible:e.AddEditDialog,width:"650px"},on:{"update:visible":function(t){e.AddEditDialog=t},close:function(t){return e.$refs["ruleForm"].resetFields()}}},[i("el-form",{ref:"ruleForm",attrs:{"status-icon":"",model:e.form,rules:e.rules,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"城市"}},[i("el-cascader",{attrs:{options:e.cityData,"change-on-select":"",placeholder:e.form.id?"如需修改请选择":"请选择城市"},on:{change:e.currentCity},model:{value:e.selectCity,callback:function(t){e.selectCity=t},expression:"selectCity"}}),e.form.id?i("span",{staticStyle:{"margin-left":"20px"}},[e._v("当前城市:"+e._s(e.city))]):e._e()],1),e.form.id?e._e():i("el-form-item",{attrs:{label:"账号",prop:e.form.id?"":"username"}},[i("el-input",{attrs:{type:"username",placeholder:"请输入账号"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),i("el-form-item",{attrs:{label:"密码",prop:e.form.id?"":"password"}},[i("el-input",{attrs:{type:"password",placeholder:e.form.id?"不填默认不修改":"请输入密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),i("el-form-item",{attrs:{label:"手机号码",prop:"tel"}},[i("el-input",{attrs:{placeholder:"请输入手机号码"},model:{value:e.form.tel,callback:function(t){e.$set(e.form,"tel",t)},expression:"form.tel"}})],1),i("el-form-item",{attrs:{label:"姓名",prop:"name"}},[i("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"店铺名",prop:"shopname"}},[i("el-input",{attrs:{placeholder:"请输入店铺名"},model:{value:e.form.shopname,callback:function(t){e.$set(e.form,"shopname",t)},expression:"form.shopname"}})],1),i("el-form-item",{attrs:{label:"商户类型",prop:"shop_type"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.shop_type,callback:function(t){e.$set(e.form,"shop_type",t)},expression:"form.shop_type"}},e._l(e.types,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),i("el-form-item",{attrs:{label:"谈判比例类型"}},[[i("el-radio",{attrs:{label:"1"},on:{change:e.explanation},model:{value:e.form.commission,callback:function(t){e.$set(e.form,"commission",t)},expression:"form.commission"}},[e._v("平台托管")]),i("el-radio",{attrs:{label:"2"},on:{change:e.explanation},model:{value:e.form.commission,callback:function(t){e.$set(e.form,"commission",t)},expression:"form.commission"}},[e._v("自定义")])],i("span",{staticClass:"iconfont BAI-heirenwenhao",staticStyle:{cursor:"pointer"},on:{click:function(t){return e.explanation()}}})],2),"1"==e.form.commission?i("el-form-item",{attrs:{label:"分成比例",prop:"discount"}},[i("el-input",{attrs:{placeholder:"请输入专引师的分成比例"},model:{value:e.form.discount,callback:function(t){e.$set(e.form,"discount",t)},expression:"form.discount"}},[i("template",{slot:"append"},[e._v("%")])],2)],1):e._e(),i("el-form-item",{attrs:{label:"商户描述"}},[i("el-input",{attrs:{placeholder:"请输入商户描述"},model:{value:e.form.shop_info,callback:function(t){e.$set(e.form,"shop_info",t)},expression:"form.shop_info"}})],1),i("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[i("el-input",{attrs:{placeholder:"请输入详细地址"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1),i("el-form-item",{attrs:{label:"营业时间",prop:"open_times"}},[i("el-input",{attrs:{placeholder:"请输入营业时间"},model:{value:e.form.open_times,callback:function(t){e.$set(e.form,"open_times",t)},expression:"form.open_times"}})],1),i("el-form-item",{attrs:{label:"店铺头像",prop:"shop_avatar"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp5,"show-file-list":!1,"on-success":e.upSuc5}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.shop_avatar?i("img",{staticClass:"license_img",attrs:{src:e.form.shop_avatar}}):e._e()],1),i("el-form-item",{attrs:{label:"身份证号码",prop:"idcard"}},[i("el-input",{attrs:{placeholder:"请输入身份证号码"},model:{value:e.form.idcard,callback:function(t){e.$set(e.form,"idcard",t)},expression:"form.idcard"}})],1),i("el-form-item",{attrs:{label:"身份证正面",prop:"picOn"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/sfz_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp1,"show-file-list":!1,"on-success":e.upSuc1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.picOn?i("img",{staticClass:"idcard_img",attrs:{src:e.form.picOn}}):e._e()],1),i("el-form-item",{attrs:{label:"身份证反面",prop:"picOff"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/sfz_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp2,"show-file-list":!1,"on-success":e.upSuc2}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.picOff?i("img",{staticClass:"idcard_img",attrs:{src:e.form.picOff}}):e._e()],1),i("el-form-item",{attrs:{label:"营业执照",prop:"license"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/license_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp3,"show-file-list":!1,"on-success":e.upSuc3}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.license?i("img",{staticClass:"license_img",attrs:{src:e.form.license}}):e._e()],1),i("el-form-item",{attrs:{label:"其他证明材料",prop:"other"}},[i("el-upload",{attrs:{action:e.axios.defaults.baseURL+"/common/upload/file/upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":e.beforeUp4,"show-file-list":!1,"on-success":e.upSuc4}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e.form.other?i("img",{staticClass:"license_img",attrs:{src:e.form.other}}):e._e()],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.AddEditDialog=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.addEdit}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"惩罚",visible:e.punishDialog,"label-width":"120px",width:"30%"},on:{"update:visible":function(t){e.punishDialog=t}}},[i("el-form",{attrs:{model:e.form}},[i("el-form-item",{attrs:{label:"处罚类型"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚类型"},on:{change:e.changePunishType},model:{value:e.punishType,callback:function(t){e.punishType=t},expression:"punishType"}},e._l(e.punishList,function(e){return i("el-option",{key:e.value,attrs:{label:e.title,value:e.val}})}),1)],1),e.punishType?i("el-form-item",{attrs:{label:"处罚内容"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择处罚内容"},model:{value:e.punishContent,callback:function(t){e.punishContent=t},expression:"punishContent"}},e._l(e.punishContentList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.ps}})}),1)],1):e._e()],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.punishDialog=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.punishSure}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"店铺详情",visible:e.previewDialog,width:"800px",top:"20px"},on:{"update:visible":function(t){e.previewDialog=t}}},[i("div",{domProps:{innerHTML:e._s(e.form.shop_info)}}),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.previewDialog=!1}}},[e._v("关闭")])],1)])],1)},s=[],o=(i("7f7f"),i("ac6a"),i("21a6")),n=i.n(o),r=i("1146"),l=i.n(r),c=i("2e8e"),p=(i("1c46"),{data:function(){return{loading:!1,isShow:!1,isSetting:!0,rules:{username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}],tel:[{validator:this.$rules.checkPhone,required:!0,trigger:"blur"}],name:[{required:!0,message:"姓名不能为空",trigger:"blur"}],address:[{required:!0,message:"详细地址不能为空",trigger:"blur"}],idcard:[{validator:this.$rules.checkId,required:!0,trigger:"blur"}],picOn:[{required:!0,message:"身份证正面不能为空",trigger:"blur"}],picOff:[{required:!0,message:"身份证反面不能为空",trigger:"blur"}],shopname:[{required:!0,message:"店铺名不能为空",trigger:"blur"}],open_times:[{required:!0,message:"营业时间不能为空",trigger:"blur"}],license:[{required:!0,message:"营业执照不能为空",trigger:"blur"}]},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]},username:"",checker:"",title:"",name:"",status:"",date:"",dataList:[],page:1,limit:10,AddEditDialog:!1,previewDialog:!1,cityData:c["a"],selectCity:[],city:"",viewImg:!1,viewBigImage:"",form:{username:"",password:"",name:"",shop_info:"",shop_type:"",commission:"",discount:"",address:"",tel:"",idcard:"",picOn:"",picOff:"",license:"",other:"",shop_avatar:"",shopname:"",open_times:""},autoChecke:{name:"",idcard:"",picOn:"",picOff:"",license:""},punishDialog:!1,punishList:"",punishContentList:"",punishId:"",punishType:"",punishContent:"",types:[{label:"线上非实体店",value:1},{label:"线下实体店",value:2}]}},watch:{punishType:function(e,t){var i=this;console.log(e),this.punishList.forEach(function(t){e==t.val&&(i.punishContentList=t.type)})}},components:{},methods:{beforeExport:function(){var e=this;this.isSetting=!1,this.$confirm("确定导出当前页数据吗？(选择100条/页试试)").then(function(t){e.exportExcel(),e.isSetting=!0}).catch(function(t){e.isSetting=!0})},exportExcel:function(){var e=l.a.utils.table_to_book(document.querySelector(".seller-table")),t=l.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{n.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"sellerList.xlsx")}catch(i){"undefined"!==typeof console&&console.log(i,t)}return t},viewBigImg:function(e){this.viewImg=!0,this.viewBigImage=e},explanation:function(){this.$message({showClose:!0,dangerouslyUseHTMLString:!0,message:"<strong>托管平台：托管正意平台，商户与专引师固定分成比例；<p>&nbsp;<p>自定义：商户与专引师沟通，自定义分成比例</strong>",duration:5e3})},handleSizeChange:function(e){this.limit=e,this.getDataList()},handleCurrentChange:function(e){this.page=e,this.getDataList()},getDataList:function(){var e=this;this.loading=!0,this.$api.getSellerList({page:this.page,limit:this.limit,status:this.status,times:this.date,name:this.name,username:this.username,checker:this.checker,title:this.title}).then(function(t){e.dataList=t.data||[],t.code&&e.$message[t.code?"warning":"success"](t.data),e.loading=!1})},currentCity:function(e){console.log(e)},search:function(){this.page=1,this.getDataList(),this.isShow=!0},back:function(){this.page=1,this.limit=10,this.status="",this.date="",this.name="",this.username="",this.checker="",this.title="",this.getDataList(),this.isShow=!1},userStop:function(e){var t=this;this.$confirm("确认进行该项操作吗?","提示",{type:"warning"}).then(function(){t.$api.userStop({uid:e,result:""}).then(function(e){t.$message[e.code?"warning":"success"](e.data),t.getDataList()})}).catch(function(){t.$message.info("已取消删除")})},openAddEditDialog:function(e,t){if("add"==e){for(var i in this.form)this.form[i]="";this.selectCity=[]}else this.form.username=t.username,this.form.password=t.password||"",this.city=t.city,this.selectCity=[],this.form.name=t.name,this.form.tel=t.tel,this.form.address=t.address,this.form.idcard=t.idcard,this.form.id=t.id,this.form.picOn=t.picOn,this.form.picOff=t.picOff,this.form.license=t.license,this.form.shop_info=t.shop_info,this.form.shop_type=t.shop_type,this.form.commission=t.commission,this.form.discount=t.discount,this.form.shopname=t.shopname,this.form.shop_avatar=t.shop_avatar,this.form.other=t.other,this.form.open_times=t.open_times||"";this.AddEditDialog=!0},beforeUp1:function(e){if(e.size>2097152)return this.$message.warning("图片不能超过2MB"),!1},upSuc1:function(e,t,i){console.log(e),e.code||(this.form.picOn=e.data.host+e.data.name)},beforeUp2:function(e){},upSuc2:function(e,t,i){console.log(e),e.code||(this.form.picOff=e.data.host+e.data.name)},beforeUp3:function(e){},upSuc3:function(e,t,i){console.log(e),e.code||(this.form.license=e.data.host+e.data.name)},beforeUp4:function(e){},upSuc4:function(e,t,i){console.log(e),e.code||(this.form.other=e.data.host+e.data.name)},beforeUp5:function(e){},upSuc5:function(e,t,i){console.log(e),e.code||(this.form.shop_avatar=e.data.host+e.data.name)},addEdit:function(){var e=this;if(!this.form.id&&(!e.selectCity||!e.selectCity.length))return this.$message.warning("请选择城市");this.autoChecke.name=this.form.name,this.autoChecke.idcard=this.form.idcard,this.autoChecke.picOn=this.form.picOn,this.autoChecke.picOff=this.form.picOff,this.autoChecke.license=this.form.license,e.$refs.ruleForm.validate(function(t){if(!t)return!1;e.$api[e.form.id?"editSeller":"addSeller"]({username:e.form.username,password:e.form.password,tel:e.form.tel,citycode:e.selectCity,id:e.form.id||"",shop_type:e.form.shop_type,discount:e.form.discount,commission:e.form.commission,shopname:e.form.shopname,shop_info:e.form.shop_info,address:e.form.address,shop_avatar:e.form.shop_avatar||"",autoChecke:e.autoChecke,name:e.form.name,open_times:e.form.open_times||"",material:{name:e.form.name,address:e.form.address,idcard:e.form.idcard,picOn:e.form.picOn,picOff:e.form.picOff,license:e.form.license,other:e.form.other}}).then(function(t){e.$message[t.code?"error":"success"](t.data.message),e.form.id||(e.page=1),e.getDataList(),e.AddEditDialog=!!t.code})})},cancel:function(e){var t=this;this.$confirm("确定要重新审核该用户吗？","提示",{type:"warning"}).then(function(){t.loading=!0,t.$api.cancelSeller({id:e}).then(function(e){t.$message[e.code?"warning":"success"](e.data.message),t.loading=!1,t.getDataList()})})},del:function(e){var t=this;this.$confirm("确认删除该项吗?","提示",{type:"warning"}).then(function(){t.$api.delSeller({id:e}).then(function(e){t.$message[e.code?"error":"success"](e.data.message),t.page=t.$options.filters.pagination(t.page,t.limit,t.dataList.total),t.getDataList()})}).catch(function(){t.$message.info("已取消删除")})},getPunishType:function(){var e=this;this.$api.getPunishType().then(function(t){e.punishList=t.data})},openPunishDialog:function(e){this.getPunishType(),this.punishId=e.id,this.punishDialog=!0},changePunishType:function(){this.punishContent=""},punishSure:function(){var e=this;if(!this.punishType||!this.punishContent)return this.$message.warning("请处罚类型和处罚内容");this.$api.addPunish({to_uid:this.punishId,types:this.punishType,values:this.punishContent}).then(function(t){e.$message[t.code?"warning":"success"](t.data.message),e.punishDialog=!!t.code})},toGoodlist:function(e,t,i,a){"商品数量"==t.label&&this.$router.push({path:"/goodList",query:{id:e.id}}),"专引师数量"==t.label&&this.$router.push({path:"/guidesList",query:{id:e.id}})}},created:function(){this.getDataList()}}),u=p,m=(i("e460"),i("2877")),d=Object(m["a"])(u,a,s,!1,null,"8b167be0",null);t["default"]=d.exports},e460:function(e,t,i){"use strict";var a=i("7eb9"),s=i.n(a);s.a}}]);
//# sourceMappingURL=sellers.c7ae0c5e.js.map