<template>
  <div class="sellerList">
    <div class="table_title">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openAddEditDialog('add')"
      >添加商户</el-button>
      <div class="search_wrap">
        <el-input clearable v-model="username" placeholder="请输入账号" size="small" style="width:200px"></el-input>
        <el-select clearable v-model="status" placeholder="请选择用户类型" size="small" style="margin:0 10px">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="search" type="primary" icon="el-icon-search" size="small" style="margin-left:10px">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
                <p><span>身份证号码:</span>{{props.row.idcard}}</p>
                <p><span>身份证正反面:</span><img class="idcard_img" :src="props.row.picOn"><img class="idcard_img" :src="props.row.picOff"></p>
                <p><span>营业执照:</span><img class="license_img" :src="props.row.license"></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="详细地址"></el-table-column>
        <el-table-column prop="message" label="商户描述">
          <template slot-scope="scope">
            {{scope.row.message || '无'}}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="手机号码"></el-table-column>
        <el-table-column prop="times" label="入驻时间">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
             <!-- :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
              @click="userStop(scope.row.id)" -->
            <el-button
              size="mini"
              :type="scope.row.status=='1'?'success':'info'"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop label="操作" width="300px">
          <template slot-scope="scope">
            <el-button @click="openPunishDialog(scope.row)" type="warning" size="mini" icon="el-icon-edit-outline">处罚</el-button>
            <el-button @click="openAddEditDialog('edit',scope.row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button @click="del(scope.row.id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
      ></el-pagination>
    </div>

    <!-- 添加dialog -->
    <el-dialog
      top="20px"
      :title="form.id?'修改':'添加'"
      :visible.sync="AddEditDialog"
      width="650px"
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="城市">
          <el-cascader :options="cityData" v-model="selectCity" change-on-select :placeholder="form.id?'如需修改请选择':'请选择城市'"></el-cascader>
          <span v-if="form.id" style="margin-left:20px">当前城市:{{city}}</span>
        </el-form-item>
        <el-form-item v-if="!form.id" label="账号" :prop="form.id?'':'username'">
          <el-input type="username" v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :prop="form.id?'':'password'">
          <el-input type="password" v-model="form.password" :placeholder="form.id?'不填默认不修改':'请输入密码'"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="商户描述">
          <el-input v-model="form.message" placeholder="请输入商户描述"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="form.idcard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="picOn">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp1"
            :show-file-list="false"
            :on-success="upSuc1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
            <img v-if="form.picOn" class="idcard_img" :src="form.picOn">
        </el-form-item>
        <el-form-item label="身份证反面" prop="picOff">
          <el-upload :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir`" accept="image/jpeg,image/gif,image/png,image/bmp" :before-upload="beforeUp2" :show-file-list="false" :on-success="upSuc2">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.picOff" class="idcard_img" :src="form.picOff">
        </el-form-item>
        <el-form-item label="营业执照" prop="license">
          <el-upload :action="`${axios.defaults.baseURL}/common/upload/file/license_upload_dir`" accept="image/jpeg,image/gif,image/png,image/bmp" :before-upload="beforeUp3" :show-file-list="false" :on-success="upSuc3">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.license" class="license_img" :src="form.license">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 惩罚dialog -->
    <el-dialog
      title="惩罚"
      :visible.sync="punishDialog"
      label-width="120px"
      width="30%">
      <el-form :model="form">
        <el-form-item label="处罚类型">
          <el-select v-model="punishType" clearable placeholder="请选择处罚类型">
            <el-option v-for="item in punishList" :key="item.value" :label="item.title" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚内容" v-if="punishType">
          <el-select v-model="punishContent" clearable placeholder="请选择处罚内容">
            <el-option v-for="item in punishContentList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="punishDialog = false">取 消</el-button>
        <el-button type="primary" @click="punishSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import citys from '../../utils/city.js';
export default {
  data() {
    return {
      loading:false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        tel: [
          { validator: this.$rules.checkPhone, required: true, trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        idcard: [
          { validator: this.$rules.checkId, required: true, trigger: "blur" }
        ],
        picOn: [
          { required: true, message: "身份证正面不能为空", trigger: "blur" }
        ],
        picOff: [
          { required: true, message: "身份证反面不能为空", trigger: "blur" }
        ],
        license: [
          { required: true, message: "营业执照不能为空", trigger: "blur" }
        ]
      },
      pickerOptions: {
        //快捷键
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      username: "", //名称
      status: "", //用户状态
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      AddEditDialog: false,
      cityData:citys,//城市数据
      selectCity:[],//选择城市
      city:'',
      form: {
        username: '',
        password: "",
        tel: "",
        name: "",
        message: "",
        address: "",
        tel: "",
        idcard: "",
        picOn: "",
        picOff: "",
        license: ""
      },
      punishDialog:false,//处罚dialog
      punishList:'',
      punishContentList:'',
      punishId:'',//处罚id
      punishType:'',
      punishContent:''

    };
  },
  watch:{
    punishType(newVal,oldVal){
      console.log(newVal);
      this.punishList.forEach(item=>{
        if(newVal==item.val){
          this.punishContentList=item.type
        }
      })
    },
  },
  components: {},
  methods: {
    // 切换limit
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //  切换page
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //获取列表
    getDataList() {
      this.loading=true;
      this.$api
        .getSellerList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.date,
          username: this.username
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading=false;
        });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
    },
    // 停用
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id,
              result: ""
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //打开dialog
    openAddEditDialog(type, item) {
      if (type == "add") {
        for (let i in this.form) {
            this.form[i] = "";
        }
        this.selectCity=[];
      } else {
        this.form.username = item.username;
        this.form.password = item.password || '';
        this.city=item.city;
        this.selectCity = [];
        this.form.name = item.name;
        this.form.tel = item.tel;
        this.form.address = item.address;
        this.form.idcard = item.idcard;
        this.form.id = item.id;
        this.form.picOn = item.picOn;
        this.form.picOff = item.picOff;
        this.form.license = item.license;
      }
      this.AddEditDialog = true;
    },
    //上次图片前
    beforeUp1(file) {
      if (file.size > 1024*2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning('图片不能超过2MB')
        return false
      }
    },
    //上传成功后
    upSuc1(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.picOn = res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp2(file) {},
    //上传成功后
    upSuc2(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.picOff = res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp3(file) {},
    //上传成功后
    upSuc3(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.license = res.data.host + res.data.name;
      }
    },
    //确认添加/修改
    addEdit() {
      let that=this;
      if(!this.form.id){
        if(!that.selectCity || !that.selectCity.length)return this.$message.warning('请选择城市');
      }
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$api[that.form.id ? "editSeller" : "addSeller"]({
            username: that.form.username,
            password: that.form.password,
            tel: that.form.tel,
            citycode: that.selectCity,
            id: that.form.id || '',
            material:{
              name: that.form.name,
              address: that.form.address,
              idcard: that.form.idcard,
              picOn: that.form.picOn,
              picOff: that.form.picOff,
              license: that.form.license
            },
            
          }).then(res => {
            that.$message[res.code ? "error" : "success"](res.data.message);
            if (!that.form.id) {
              that.page = 1;
            }
            that.getDataList();
            that.AddEditDialog = res.code ? true : false;
          });
        } else {
          return false;
        }
      });
    },
    //删除
    del(id) {
      this.$confirm("确认删除该项吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api.delSeller({
            id:id
          })
          .then(res=>{
            this.$message[res.code?'error':'success'](res.data.message);
            this.page=this.$options.filters.pagination(this.page,this.limit,this.dataList.total);
            this.getDataList();
          })
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    
    //获取处罚类型
    getPunishType(){
      this.$api.getPunishType()
      .then(res=>{
        this.punishList=res.data;
      })
    },
    //打开处罚dialoig
    openPunishDialog(item){
      this.getPunishType();
      this.punishId=item.id;
      this.punishDialog=true;
    },
    
    //确认处罚
    punishSure(){
      if(!this.punishType || !this.punishContent) return this.$message.warning('请处罚类型和处罚内容');
      this.$api.addPunish({
        to_uid:this.punishId,
        types:this.punishType,
        values:JSON.stringify(this.punishContent)
      })
      .then(res=>{
        this.$message[res.code?'warning':'success'](res.data.message);
        this.punishDialog=res.code?true:false;
      })
    },
    
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}
.license {
  width: 200px;
  height: 300px;
}
.idcard_box {
  padding: 20px;
  box-sizing: border-box;
}
</style>
