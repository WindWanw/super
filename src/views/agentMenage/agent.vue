<template>
  <div class="agent">
    <div class="table_title">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openAddEditDialog('add')"
      >添加代理商</el-button>
      <div class="search_wrap">
        <el-input clearable v-model="username" placeholder="请输入账号" size="small" style="width:200px"></el-input>
        <el-select clearable v-model="status" placeholder="请选择用户类型" size="small" style="margin: 0 10px">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
          value-format="timestamp"
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search" style="margin-left:10px">搜索</el-button>
      </div>
    </div>
    <div class="content" style="width:100%">
      <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
       <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
                <p><span>身份证号码:</span>{{props.row.idcard}}</p>
                <p><span>身份证正反面:</span><img class="idcard_img" :src="props.row.picOn"><img class="idcard_img" :src="props.row.picOff"></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="代理城市"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="name" label="联系人姓名"></el-table-column>
        <!-- <el-table-column prop="address" label="联系人地址"></el-table-column> -->
        <el-table-column prop="tel" label="手机号码"></el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
            <el-button size="mini" :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'" @click="userStop(scope.row.id)" :type="scope.row.status=='1'?'success':'info'">{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="代理时间">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button
                @click="openAddEditDialog('edit',scope.row)" 
                type="primary"
                size="mini"
                icon="el-icon-edit"
              >编辑</el-button>
            </div>
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
      :title="form.id?'编辑':'添加'"
      :visible.sync="AddEditDialog"
      width="650px"
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="城市">
          <el-cascader :options="cityData" v-model="selectCity" change-on-select :placeholder="form.id?'如需修改请选择':'请选择代理城市'"></el-cascader>
          <span v-if="form.id" style="margin-left:20px">当前城市:{{city}}</span>
        </el-form-item>
        <el-form-item label="账号" v-if="!form.id" :prop="form.id?'':'username'">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :prop="form.id?'':'password'">
          <el-input type="password" v-model="form.password" :placeholder="form.id?'不填默认不修改':'请输入密码'"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="form.idcard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="picOn">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir/front`"
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
          <el-upload :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir/front`" accept="image/jpeg,image/gif,image/png,image/bmp" :before-upload="beforeUp2" :show-file-list="false" :on-success="upSuc2">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.picOff" class="idcard_img" :src="form.picOff">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import citys from '../../utils/city.js';
export default {
  data() {
    return {
      loading:false,
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
      fileList: [],
      username: "", //名称
      date: "", //日期
      status: "", //状态
      page: 1, //页
      limit: 10, //条
      dataList: [], //数据源
      AddEditDialog: false,
      cityData:citys,//城市数据
      selectCity:[],//选择城市
      city:'',
      form: {
        username: "",
        password:'',
        city: "",
        tel: "",
        id: "",
        name: "",
        address: "",
        idcard: "",
        picOn: '',
        picOff: '',
      },
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
        name: [
          { required: true, message: "联系人姓名不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "联系地址不能为空", trigger: "blur" }
        ],
        idcard: [
          { validator: this.$rules.checkId, required: true, trigger: "blur" }
        ],
        picOn: [
          { required: true, message: "身份证正面不能为空", trigger: "blur" }
        ],
        picOff: [
          { required: true, message: "身份证反面不能为空", trigger: "blur" }
        ]
      }
    }
  },
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
    //获取代理商列表
    getDataList() {
      this.loading=true;
      this.$api
        .getAgentList({
          page: this.page,
          limit: this.limit,
          times: this.date,
          status: this.status,
          username: this.username
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading=false;
        });
    },
    //查询
    search() {
      this.page = 1;
      this.getDataList();
    },
    // 打开添加或修改
    openAddEditDialog(type, item) {
      let that = this;
      if (type == "add") {
        for (let i in this.form) {
            this.form[i] = "";
        }
        this.selectCity=[];
      } else {
        that.form.id = item.id;
        that.form.username=item.username;
        that.form.password=item.password;
        this.city=item.city;
        this.selectCity = [];
        that.form.tel = item.tel;
        that.form.address = item.address;
        that.form.name = item.name;
        that.form.idcard = item.idcard;
        that.form.picOn = item.picOn;
        that.form.picOff = item.picOff;
      }

      that.AddEditDialog = true;
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
    // 添加修改
    addEdit(type, item) {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$api[that.form.id?'editAgent':'addAgent']({
              citycode: that.selectCity,
              idcard: that.form.idcard,
              name: that.form.name,
              password:that.form.password || '',
              picOff: that.form.picOff,
              picOn: that.form.picOn,
              tel: that.form.tel,
              username:that.form.username,
              id: that.form.id,
            })
            .then(res => {
              that.$message[res.code?'warning':'success'](res.data.message);
              that.AddEditDialog=res.code?true:false;
              if(!that.form.id){
                that.page=1;
              }
              that.getDataList();
            });
        } else {
          return false;
        }
      });
    },
    // 停用用户
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id
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
}
.idcardImg{
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
