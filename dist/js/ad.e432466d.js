(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ad"],{2529:function(l,e,a){"use strict";a.r(e);var u=function(){var l=this,e=l.$createElement,a=l._self._c||e;return a("div",{staticClass:"ad"},[a("div",{staticClass:"table_title"},[a("div",[l.isShow?a("el-button",{staticClass:"el-icon-d-arrow-left",attrs:{type:"primary",size:"mini"},on:{click:function(e){return l.back()}}},[l._v("返回")]):l._e()],1),a("div",{staticClass:"search_wrap"},[a("el-select",{staticClass:"selectOrder",attrs:{size:"mini",clearable:"",placeholder:"请选择广告所属页面"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&l._k(e.keyCode,"enter",13,e.key,"Enter")?null:l.search(e)}},model:{value:l.type,callback:function(e){l.type=e},expression:"type"}},l._l(l.adsType.list,function(l){return a("el-option",{key:l.page,attrs:{label:l.title,value:l.page}})}),1),a("el-cascader",{attrs:{size:"mini",options:l.cityData,"change-on-select":"",placeholder:"请选择城市搜索"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&l._k(e.keyCode,"enter",13,e.key,"Enter")?null:l.search(e)}},model:{value:l.citycode,callback:function(e){l.citycode=e},expression:"citycode"}}),a("el-button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:l.search}},[l._v("搜索")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:function(e){return l.openAddEditDialog("add")}}},[l._v("添加广告")])],1)]),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:l.loading,expression:"loading"}],attrs:{data:l.dataList.list,stripe:"",border:""}},[a("el-table-column",{attrs:{prop:"city",label:"城市",align:"center"}}),a("el-table-column",{attrs:{prop:"ads",label:"广告图",align:"center"},scopedSlots:l._u([{key:"default",fn:function(e){return[e.row.pic?a("img",{staticClass:"ads-image",attrs:{src:e.row.pic}}):l._e()]}}])}),a("el-table-column",{attrs:{prop:"title",label:"广告标题",align:"center"}}),a("el-table-column",{attrs:{prop:"url",label:"链接地址",align:"center"}}),a("el-table-column",{attrs:{prop:"position",label:"所属页面",align:"center"}}),a("el-table-column",{attrs:{prop:"begin",label:"上架时间",align:"center"},scopedSlots:l._u([{key:"default",fn:function(e){return[l._v(l._s(l._f("formatTimeStamp")(e.row.begin)))]}}])}),a("el-table-column",{attrs:{prop:"timeout",label:"下架时间",align:"center"},scopedSlots:l._u([{key:"default",fn:function(e){return[l._v(l._s(l._f("formatTimeStamp")(e.row.timeout)))]}}])}),a("el-table-column",{attrs:{prop:"adder",label:"添加人",align:"center"}}),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:l._u([{key:"default",fn:function(e){return[a("div",{staticClass:"cz_btn"},[a("el-button",{staticClass:"mini-button",attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return l.openAddEditDialog("edit",e.row)}}},[l._v("编辑")]),a("el-button",{staticClass:"mini-button",attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(a){return l.del(e.row.id)}}},[l._v("删除")])],1)]}}])})],1),a("el-pagination",{attrs:{background:"","current-page":l.page,"page-sizes":[10,20,50,100],"page-size":l.limit,layout:"total, sizes, prev, pager, next, jumper",total:l.dataList.total},on:{"size-change":l.handleSizeChange,"current-change":l.handleCurrentChange}})],1),a("el-dialog",{attrs:{top:"20px",title:l.form.id?"修改":"添加",visible:l.AddEditDialog,width:"650px"},on:{"update:visible":function(e){l.AddEditDialog=e},close:function(e){return l.$refs["ruleForm"].resetFields()}}},[a("el-form",{ref:"ruleForm",attrs:{"status-icon":"",model:l.form,rules:l.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"广告位置",prop:"page"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择广告页",size:"small"},model:{value:l.form.page,callback:function(e){l.$set(l.form,"page",e)},expression:"form.page"}},l._l(l.adsType.list,function(l){return a("el-option",{key:l.page,attrs:{label:l.title,value:l.page}})}),1)],1),a("el-form-item",{attrs:{label:"城市"}},[a("el-cascader",{attrs:{options:l.cityData,"change-on-select":"",placeholder:l.form.id?"如需修改请选择":"请选择城市"},model:{value:l.selectCity,callback:function(e){l.selectCity=e},expression:"selectCity"}}),l.form.id?a("span",{staticStyle:{"margin-left":"20px"}},[l._v("当前城市:"+l._s(l.city))]):l._e()],1),a("el-form-item",{attrs:{label:"广告链接"}},[a("el-input",{attrs:{placeholder:"请输入广告链接"},model:{value:l.form.url,callback:function(e){l.$set(l.form,"url",e)},expression:"form.url"}})],1),a("el-form-item",{attrs:{label:"广告标题",prop:l.form.title?"":"title"}},[a("el-input",{attrs:{placeholder:"请输入广告标题"},model:{value:l.form.title,callback:function(e){l.$set(l.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"广告图片",prop:l.form.pic?"":"pic"}},[a("el-upload",{attrs:{action:l.axios.defaults.baseURL+"/common/upload/file/adv_upload_dir",accept:"image/jpeg, image/gif, image/png, image/bmp","before-upload":l.beforeUp1,"show-file-list":!1,"on-success":l.upSuc1}},[a("el-button",{attrs:{size:"small",type:"primary"}},[l._v("点击上传")])],1),l.form.pic?a("img",{staticClass:"ad_img",attrs:{src:l.form.pic}}):l._e()],1),a("el-form-item",{attrs:{label:"上下架时间",prop:"times"}},[a("el-date-picker",{attrs:{"value-format":"timestamp",size:"small",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:l.form.times,callback:function(e){l.$set(l.form,"times",e)},expression:"form.times"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){l.AddEditDialog=!1}}},[l._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:l.addEdit}},[l._v("确 定")])],1)],1)],1)},t=[],b=(a("7f7f"),a("62dc")),v=a("9dac"),i={data:function(){return{loading:!1,isShow:!1,dataList:[],page:1,limit:10,AddEditDialog:!1,cityData:b["a"],selectCity:[],adsType:[],type:"",citycode:[],keywords:"",date:[],city:"",form:{page:"",title:"",url:"",pic:"",id:"",times:""},rules:{page:[{required:!0,message:"广告页不能为空",trigger:"blur"}],title:[{required:!0,message:"广告标题不能为空",trigger:"blur"}],pic:[{required:!0,message:"广告图片不能为空",trigger:"blur"}],times:[{required:!0,message:"上下架时间不能为空",trigger:"blur"}]}}},components:{upload:v["a"]},methods:{handleSizeChange:function(l){this.limit=l,this.getDataList()},handleCurrentChange:function(l){this.page=l,this.getDataList()},getDataList:function(){var l=this;this.loading=!0,this.$api.getAdList({page:this.page,limit:this.limit,type:this.type,keywords:this.keywords,citycode:this.citycode}).then(function(e){l.dataList=e.data||[],e.code&&l.$message[e.code?"warning":"success"](e.data),l.loading=!1})},getAdsType:function(){var l=this;this.$api.adsType().then(function(e){l.adsType=e.data||[]})},openAddEditDialog:function(l,e){if("add"==l){for(var a in this.form)this.form[a]="";this.selectCity=[]}else{this.form.page=e.page,this.city=e.city,this.selectCity=[],this.form.title=e.title,this.form.url=e.url,this.form.pic=e.pic,this.form.id=e.id;var u=e.begin?[1e3*e.begin,1e3*e.timeout]:"";this.form.times=u}this.AddEditDialog=!0},beforeUp1:function(l){if(l.size>2097152)return this.$message.warning("图片不能超过2MB"),!1},upSuc1:function(l,e,a){console.log(l),l.code||(this.form.pic=l.data.host+l.data.name)},addEdit:function(){var l=this,e=this;if(!this.form.id&&(!e.selectCity||!e.selectCity.length))return this.$message.warning("请选择城市");e.$refs.ruleForm.validate(function(a){if(!a)return!1;e.$api[e.form.id?"editAd":"addAd"]({page:e.form.page,citycode:e.selectCity,times:e.form.times,title:e.form.title,pic:e.form.pic,url:e.form.url,id:e.form.id}).then(function(a){e.$message[a.code?"error":"success"](a.data.message),e.AddEditDialog=!!a.code,e.form.id||(l.page=1),e.getDataList()})})},del:function(l){var e=this;this.$confirm("确认删除该项吗?","提示",{type:"warning"}).then(function(){e.$api.delAd({id:l}).then(function(l){e.$message[l.code?"error":"success"](l.data.message),e.page=e.$options.filters.pagination(e.page,e.limit,e.dataList.total),e.getDataList()})}).catch(function(){e.$message.info("已取消删除")})},search:function(){this.page=1,this.getDataList(),this.isShow=!0},back:function(){this.keywords="",this.type="",this.citycode=[],this.getDataList(),this.isShow=!1}},created:function(){this.getDataList(),this.getAdsType()}},r=i,n=(a("af7a"),a("2877")),s=Object(n["a"])(r,u,t,!1,null,"2b6df7fd",null);e["default"]=s.exports},"62dc":function(l,e,a){"use strict";var u=[{value:"110000",label:"北京市",children:[{value:"110100",label:"北京城区"}]},{value:"120000",label:"天津市",children:[{value:"120100",label:"天津城区"}]},{value:"310000",label:"上海市",children:[{value:"310100",label:"上海城区"}]},{value:"500000",label:"重庆市",children:[{value:"500200",label:"重庆郊县"},{value:"500100",label:"重庆城区"}]},{value:"130000",label:"河北省",children:[{value:"130200",label:"唐山市"},{value:"130800",label:"承德市"},{value:"131000",label:"廊坊市"},{value:"130300",label:"秦皇岛市"},{value:"130600",label:"保定市"},{value:"130100",label:"石家庄市"},{value:"130400",label:"邯郸市"},{value:"130500",label:"邢台市"},{value:"130700",label:"张家口市"},{value:"130900",label:"沧州市"},{value:"131100",label:"衡水市"}]},{value:"140000",label:"山西省",children:[{value:"140300",label:"阳泉市"},{value:"140400",label:"长治市"},{value:"141000",label:"临汾市"},{value:"140100",label:"太原市"},{value:"140800",label:"运城市"},{value:"140900",label:"忻州市"},{value:"140600",label:"朔州市"},{value:"140500",label:"晋城市"},{value:"140700",label:"晋中市"},{value:"141100",label:"吕梁市"},{value:"140200",label:"大同市"}]},{value:"210000",label:"辽宁省",children:[{value:"211400",label:"葫芦岛市"},{value:"210200",label:"大连市"},{value:"210600",label:"丹东市"},{value:"210700",label:"锦州市"},{value:"210400",label:"抚顺市"},{value:"210100",label:"沈阳市"},{value:"211200",label:"铁岭市"},{value:"211300",label:"朝阳市"},{value:"211000",label:"辽阳市"},{value:"210300",label:"鞍山市"},{value:"210800",label:"营口市"},{value:"210900",label:"阜新市"},{value:"211100",label:"盘锦市"},{value:"210500",label:"本溪市"}]},{value:"220000",label:"吉林省",children:[{value:"220200",label:"吉林市"},{value:"220100",label:"长春市"},{value:"220800",label:"白城市"},{value:"220700",label:"松原市"},{value:"220400",label:"辽源市"},{value:"220300",label:"四平市"},{value:"222400",label:"延边朝鲜族自治州"},{value:"220600",label:"白山市"},{value:"220500",label:"通化市"}]},{value:"230000",label:"黑龙江省",children:[{value:"232700",label:"大兴安岭地区"},{value:"230900",label:"七台河市"},{value:"230400",label:"鹤岗市"},{value:"230700",label:"伊春市"},{value:"231200",label:"绥化市"},{value:"230100",label:"哈尔滨市"},{value:"231100",label:"黑河市"},{value:"230200",label:"齐齐哈尔市"},{value:"231000",label:"牡丹江市"},{value:"230300",label:"鸡西市"},{value:"230600",label:"大庆市"},{value:"230500",label:"双鸭山市"},{value:"230800",label:"佳木斯市"}]},{value:"320000",label:"江苏省",children:[{value:"320700",label:"连云港市"},{value:"321300",label:"宿迁市"},{value:"320100",label:"南京市"},{value:"321100",label:"镇江市"},{value:"320600",label:"南通市"},{value:"320800",label:"淮安市"},{value:"320300",label:"徐州市"},{value:"320900",label:"盐城市"},{value:"321200",label:"泰州市"},{value:"321000",label:"扬州市"},{value:"320200",label:"无锡市"},{value:"320400",label:"常州市"},{value:"320500",label:"苏州市"}]},{value:"330000",label:"浙江省",children:[{value:"330900",label:"舟山市"},{value:"330200",label:"宁波市"},{value:"330400",label:"嘉兴市"},{value:"331000",label:"台州市"},{value:"330300",label:"温州市"},{value:"331100",label:"丽水市"},{value:"330100",label:"杭州市"},{value:"330600",label:"绍兴市"},{value:"330500",label:"湖州市"},{value:"330800",label:"衢州市"},{value:"330700",label:"金华市"}]},{value:"340000",label:"安徽省",children:[{value:"340600",label:"淮北市"},{value:"341200",label:"阜阳市"},{value:"340500",label:"马鞍山市"},{value:"341700",label:"池州市"},{value:"340700",label:"铜陵市"},{value:"341600",label:"亳州市"},{value:"340300",label:"蚌埠市"},{value:"341100",label:"滁州市"},{value:"340800",label:"安庆市"},{value:"341800",label:"宣城市"},{value:"341500",label:"六安市"},{value:"341000",label:"黄山市"},{value:"340400",label:"淮南市"},{value:"340100",label:"合肥市"},{value:"341300",label:"宿州市"},{value:"340200",label:"芜湖市"}]},{value:"350000",label:"福建省",children:[{value:"350900",label:"宁德市"},{value:"350100",label:"福州市"},{value:"350800",label:"龙岩市"},{value:"350300",label:"莆田市"},{value:"350500",label:"泉州市"},{value:"350200",label:"厦门市"},{value:"350600",label:"漳州市"},{value:"350700",label:"南平市"},{value:"350400",label:"三明市"}]},{value:"360000",label:"江西省",children:[{value:"360400",label:"九江市"},{value:"360500",label:"新余市"},{value:"361000",label:"抚州市"},{value:"360600",label:"鹰潭市"},{value:"360700",label:"赣州市"},{value:"360100",label:"南昌市"},{value:"360900",label:"宜春市"},{value:"360800",label:"吉安市"},{value:"360300",label:"萍乡市"},{value:"360200",label:"景德镇市"},{value:"361100",label:"上饶市"}]},{value:"370000",label:"山东省",children:[{value:"370600",label:"烟台市"},{value:"371000",label:"威海市"},{value:"370200",label:"青岛市"},{value:"370300",label:"淄博市"},{value:"371500",label:"聊城市"},{value:"371300",label:"临沂市"},{value:"370700",label:"潍坊市"},{value:"370500",label:"东营市"},{value:"371600",label:"滨州市"},{value:"370400",label:"枣庄市"},{value:"371100",label:"日照市"},{value:"370800",label:"济宁市"},{value:"370900",label:"泰安市"},{value:"371400",label:"德州市"},{value:"370100",label:"济南市"},{value:"371700",label:"菏泽市"}]},{value:"410000",label:"河南省",children:[{value:"410900",label:"濮阳市"},{value:"411100",label:"漯河市"},{value:"411200",label:"三门峡市"},{value:"410300",label:"洛阳市"},{value:"411300",label:"南阳市"},{value:"411000",label:"许昌市"},{value:"411500",label:"信阳市"},{value:"411700",label:"驻马店市"},{value:"419001",label:"济源市"},{value:"410500",label:"安阳市"},{value:"410800",label:"焦作市"},{value:"410600",label:"鹤壁市"},{value:"410700",label:"新乡市"},{value:"410200",label:"开封市"},{value:"410400",label:"平顶山市"},{value:"410100",label:"郑州市"},{value:"411600",label:"周口市"},{value:"411400",label:"商丘市"}]},{value:"420000",label:"湖北省",children:[{value:"420300",label:"十堰市"},{value:"420600",label:"襄阳市"},{value:"420800",label:"荆门市"},{value:"420500",label:"宜昌市"},{value:"420100",label:"武汉市"},{value:"421100",label:"黄冈市"},{value:"429006",label:"天门市"},{value:"420900",label:"孝感市"},{value:"429005",label:"潜江市"},{value:"422800",label:"恩施土家族苗族自治州"},{value:"429004",label:"仙桃市"},{value:"421000",label:"荆州市"},{value:"421200",label:"咸宁市"},{value:"429021",label:"神农架林区"},{value:"421300",label:"随州市"},{value:"420700",label:"鄂州市"},{value:"420200",label:"黄石市"}]},{value:"430000",label:"湖南省",children:[{value:"430600",label:"岳阳市"},{value:"430900",label:"益阳市"},{value:"430400",label:"衡阳市"},{value:"431300",label:"娄底市"},{value:"430100",label:"长沙市"},{value:"430800",label:"张家界市"},{value:"431200",label:"怀化市"},{value:"433100",label:"湘西土家族苗族自治州"},{value:"430700",label:"常德市"},{value:"430200",label:"株洲市"},{value:"430500",label:"邵阳市"},{value:"430300",label:"湘潭市"},{value:"431100",label:"永州市"},{value:"431000",label:"郴州市"}]},{value:"440000",label:"广东省",children:[{value:"440500",label:"汕头市"},{value:"440600",label:"佛山市"},{value:"441200",label:"肇庆市"},{value:"441300",label:"惠州市"},{value:"440300",label:"深圳市"},{value:"440800",label:"湛江市"},{value:"440400",label:"珠海市"},{value:"441700",label:"阳江市"},{value:"440700",label:"江门市"},{value:"442100",label:"东沙群岛"},{value:"440900",label:"茂名市"},{value:"445100",label:"潮州市"},{value:"441500",label:"汕尾市"},{value:"445300",label:"云浮市"},{value:"441600",label:"河源市"},{value:"441400",label:"梅州市"},{value:"440100",label:"广州市"},{value:"440200",label:"韶关市"},{value:"441900",label:"东莞市"},{value:"445200",label:"揭阳市"},{value:"441800",label:"清远市"},{value:"442000",label:"中山市"}]},{value:"460000",label:"海南省",children:[{value:"469024",label:"临高县"},{value:"469021",label:"定安县"},{value:"469025",label:"白沙黎族自治县"},{value:"469026",label:"昌江黎族自治县"},{value:"469006",label:"万宁市"},{value:"469022",label:"屯昌县"},{value:"469030",label:"琼中黎族苗族自治县"},{value:"469002",label:"琼海市"},{value:"469007",label:"东方市"},{value:"469027",label:"乐东黎族自治县"},{value:"469001",label:"五指山市"},{value:"469029",label:"保亭黎族苗族自治县"},{value:"460400",label:"儋州市"},{value:"469005",label:"文昌市"},{value:"469028",label:"陵水黎族自治县"},{value:"460300",label:"三沙市"},{value:"460200",label:"三亚市"},{value:"469023",label:"澄迈县"},{value:"460100",label:"海口市"}]},{value:"510000",label:"四川省",children:[{value:"510800",label:"广元市"},{value:"511300",label:"南充市"},{value:"511900",label:"巴中市"},{value:"510600",label:"德阳市"},{value:"510700",label:"绵阳市"},{value:"510100",label:"成都市"},{value:"511600",label:"广安市"},{value:"511700",label:"达州市"},{value:"510900",label:"遂宁市"},{value:"512000",label:"资阳市"},{value:"511400",label:"眉山市"},{value:"511000",label:"内江市"},{value:"510300",label:"自贡市"},{value:"511100",label:"乐山市"},{value:"510500",label:"泸州市"},{value:"513400",label:"凉山彝族自治州"},{value:"511500",label:"宜宾市"},{value:"510400",label:"攀枝花市"},{value:"513200",label:"阿坝藏族羌族自治州"},{value:"511800",label:"雅安市"},{value:"513300",label:"甘孜藏族自治州"}]},{value:"520000",label:"贵州省",children:[{value:"520300",label:"遵义市"},{value:"522600",label:"黔东南苗族侗族自治州"},{value:"520200",label:"六盘水市"},{value:"520600",label:"铜仁市"},{value:"522700",label:"黔南布依族苗族自治州"},{value:"522300",label:"黔西南布依族苗族自治州"},{value:"520400",label:"安顺市"},{value:"520500",label:"毕节市"},{value:"520100",label:"贵阳市"}]},{value:"530000",label:"云南省",children:[{value:"530600",label:"昭通市"},{value:"530300",label:"曲靖市"},{value:"532500",label:"红河哈尼族彝族自治州"},{value:"533300",label:"怒江傈僳族自治州"},{value:"532800",label:"西双版纳傣族自治州"},{value:"530400",label:"玉溪市"},{value:"532900",label:"大理白族自治州"},{value:"530700",label:"丽江市"},{value:"533400",label:"迪庆藏族自治州"},{value:"532600",label:"文山壮族苗族自治州"},{value:"530500",label:"保山市"},{value:"530800",label:"普洱市"},{value:"530100",label:"昆明市"},{value:"532300",label:"楚雄彝族自治州"},{value:"530900",label:"临沧市"},{value:"533100",label:"德宏傣族景颇族自治州"}]},{value:"610000",label:"陕西省",children:[{value:"611000",label:"商洛市"},{value:"610100",label:"西安市"},{value:"610700",label:"汉中市"},{value:"610200",label:"铜川市"},{value:"610900",label:"安康市"},{value:"610800",label:"榆林市"},{value:"610600",label:"延安市"},{value:"610300",label:"宝鸡市"},{value:"610400",label:"咸阳市"},{value:"610500",label:"渭南市"}]},{value:"620000",label:"甘肃省",children:[{value:"620200",label:"嘉峪关市"},{value:"620900",label:"酒泉市"},{value:"620300",label:"金昌市"},{value:"620100",label:"兰州市"},{value:"620800",label:"平凉市"},{value:"620400",label:"白银市"},{value:"620500",label:"天水市"},{value:"620600",label:"武威市"},{value:"621200",label:"陇南市"},{value:"623000",label:"甘南藏族自治州"},{value:"622900",label:"临夏回族自治州"},{value:"620700",label:"张掖市"},{value:"621000",label:"庆阳市"},{value:"621100",label:"定西市"}]},{value:"630000",label:"青海省",children:[{value:"630200",label:"海东市"},{value:"632500",label:"海南藏族自治州"},{value:"632800",label:"海西蒙古族藏族自治州"},{value:"632700",label:"玉树藏族自治州"},{value:"632300",label:"黄南藏族自治州"},{value:"632600",label:"果洛藏族自治州"},{value:"630100",label:"西宁市"},{value:"632200",label:"海北藏族自治州"}]},{value:"150000",label:"内蒙古自治区",children:[{value:"150300",label:"乌海市"},{value:"150800",label:"巴彦淖尔市"},{value:"150200",label:"包头市"},{value:"150700",label:"呼伦贝尔市"},{value:"150600",label:"鄂尔多斯市"},{value:"152900",label:"阿拉善盟"},{value:"150400",label:"赤峰市"},{value:"150500",label:"通辽市"},{value:"152200",label:"兴安盟"},{value:"150900",label:"乌兰察布市"},{value:"152500",label:"锡林郭勒盟"},{value:"150100",label:"呼和浩特市"}]},{value:"450000",label:"广西壮族自治区",children:[{value:"451000",label:"百色市"},{value:"450700",label:"钦州市"},{value:"450500",label:"北海市"},{value:"450300",label:"桂林市"},{value:"451200",label:"河池市"},{value:"450200",label:"柳州市"},{value:"451300",label:"来宾市"},{value:"450100",label:"南宁市"},{value:"451400",label:"崇左市"},{value:"450600",label:"防城港市"},{value:"450400",label:"梧州市"},{value:"451100",label:"贺州市"},{value:"450900",label:"玉林市"},{value:"450800",label:"贵港市"}]},{value:"540000",label:"西藏自治区",children:[{value:"540300",label:"昌都市"},{value:"540600",label:"那曲市"},{value:"540100",label:"拉萨市"},{value:"540200",label:"日喀则市"},{value:"540500",label:"山南市"},{value:"540400",label:"林芝市"},{value:"542500",label:"阿里地区"}]},{value:"640000",label:"宁夏回族自治区",children:[{value:"640400",label:"固原市"},{value:"640100",label:"银川市"},{value:"640500",label:"中卫市"},{value:"640200",label:"石嘴山市"},{value:"640300",label:"吴忠市"}]},{value:"650000",label:"新疆维吾尔自治区",children:[{value:"659005",label:"北屯市"},{value:"659006",label:"铁门关市"},{value:"659007",label:"双河市"},{value:"652700",label:"博尔塔拉蒙古自治州"},{value:"659008",label:"可克达拉市"},{value:"654200",label:"塔城地区"},{value:"653200",label:"和田地区"},{value:"659009",label:"昆玉市"},{value:"654300",label:"阿勒泰地区"},{value:"650200",label:"克拉玛依市"},{value:"659001",label:"石河子市"},{value:"652300",label:"昌吉回族自治州"},{value:"659004",label:"五家渠市"},{value:"652800",label:"巴音郭楞蒙古自治州"},{value:"650100",label:"乌鲁木齐市"},{value:"654000",label:"伊犁哈萨克自治州"},{value:"652900",label:"阿克苏地区"},{value:"659002",label:"阿拉尔市"},{value:"653100",label:"喀什地区"},{value:"659003",label:"图木舒克市"},{value:"653000",label:"克孜勒苏柯尔克孜自治州"},{value:"650500",label:"哈密市"},{value:"650400",label:"吐鲁番市"}]},{value:"810000",label:"香港特别行政区",children:[{value:"810013",label:"北区"},{value:"810014",label:"大埔区"},{value:"810015",label:"西贡区"},{value:"810016",label:"沙田区"},{value:"810011",label:"屯门区"},{value:"810008",label:"黄大仙区"},{value:"810007",label:"九龙城区"},{value:"810006",label:"深水埗区"},{value:"810009",label:"观塘区"},{value:"810005",label:"油尖旺区"},{value:"810018",label:"离岛区"},{value:"810003",label:"东区"},{value:"810001",label:"中西区"},{value:"810002",label:"湾仔区"},{value:"810004",label:"南区"},{value:"810012",label:"元朗区"},{value:"810010",label:"荃湾区"},{value:"810017",label:"葵青区"}]},{value:"820000",label:"澳门特别行政区",children:[{value:"820004",label:"大堂区"},{value:"820003",label:"望德堂区"},{value:"820008",label:"圣方济各堂区"},{value:"820006",label:"嘉模堂区"},{value:"820005",label:"风顺堂区"},{value:"820002",label:"花王堂区"},{value:"820001",label:"花地玛堂区"},{value:"820007",label:"路凼填海区"}]}];e["a"]=u},af7a:function(l,e,a){"use strict";var u=a("cd92"),t=a.n(u);t.a},cd92:function(l,e,a){}}]);
//# sourceMappingURL=ad.e432466d.js.map