<template>
  <div class="card">
    <div class="table_title">
      <div>
        <el-button type="primary" size="small" @click="userSettingDialog=true" v-if="admin==1">设置商户密码</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="authList.list" style="width: 100%">
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <el-tag>{{scope.row.role | authGenre}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="联系方式"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="openEditPassword(scope.row)" type="primary" size="small">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 超级管理员设置商户密码 -->
    <el-dialog title="设置商户密码" width="750px" :visible.sync="userSettingDialog" append-to-body @close="su.tels='';su.password=''">
      <el-form label-width="120px" :model="su" ref="su">
        <el-form-item label="手机号" prop="tels">
          <el-input v-model="su.tels" placeholder="请输入手机号，多个手机号用空格或者“,”隔开"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="su.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSettingDialog = false">取 消</el-button>
        <el-button type="primary" @click="userSetting()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      width="750px"
      :visible.sync="retrieveDialog"
      append-to-body
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form label-width="120px" :model="retrieve" :rules="rules" ref="retrieve">
        <el-form-item label="注册手机号" prop="tel">
          <el-input v-model="retrieve.tel" disabled></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="retrieve.code"
            placeholder="请填写短信验证码"
            style="width:200px;margin:0 20px 0 0;"
          ></el-input>
          <el-button type="success" v-if="btn_show1" @click="sendsms()">点击发送</el-button>
          <el-button v-if="btn_show2" @click="sendsms()">重新发送</el-button>
        </el-form-item>
        <el-form-item label="原密码" prop="oldpassword">
          <el-input placeholder="请填写原密码" v-model="retrieve.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请填写新的密码" v-model="retrieve.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input placeholder="请确认密码" v-model="retrieve.repassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="retrieveDialog = false">取 消</el-button>
        <el-button type="primary" @click="editPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      btn_show1: true, //发送验证码
      btn_show2: false, //重新发送
      retrieveDialog: false,
      userSettingDialog: false, //超级管理员设置商户密码
      admin:JSON.parse(localStorage.getItem('userinfo')).id || '',
      retrieve: {
        id: "",
        tel: "",
        code: "",
        oldpassword: "",
        password: "",
        repassword: ""
      },
      su: {
        tels: "",
        password:'',
      },
      authList: "",
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        // tel: [
        //   { validator: this.$rules.checkPhone, required: true, trigger: "blur" }
        // ],
        code: [
          { required: true, message: "请填写短信验证码", trigger: "blur" }
        ],
        oldpassword: [
          { required: true, message: "请填写原密码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写新密码", trigger: "blur" }
        ],
        repassword: [{ required: true, message: "请确认密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    sendsms() {
      if (!this.retrieve.tel) {
        this.$message("请先填写手机号");
      } else {
        this.btn_show1 = false;
        this.btn_show2 = true;
        this.$api
          .sendSms({
            tel: this.retrieve.tel
          })
          .then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
          });
      }
    },
    //角色列表
    getAuthList() {
      this.$api.getAdminInfo().then(res => {
        this.authList = res.data || [];
      });
    },
    //修改密码
    openEditPassword(item) {
      this.retrieveDialog = true;
      for (let i in this.retrieve) {
        this.retrieve[i] = "";
      }
      this.retrieve.tel = item.tel;
    },

    //修改密码
    editPassword() {
      this.$refs.retrieve.validate(valid => {
        if (valid) {
          this.$api.editAdminPassword(this.retrieve).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            if (res.code) return;
            this.retrieve = "";
            this.retrieveDialog = false;
          });
        }
      });
    },

    userSetting() {
      if(!this.su.password){
        this.$notify({
          title: '注意',
          message: '密码不能为空，请填写',
          type: 'warning'
        });
        return ;
      }
      this.$api.adminUpdateSu(this.su).then(res=>{
        this.$message[res.code ? 'warning':'success'](res.data.message);
        if(!res.code) this.userSettingDialog=false;
      });
    }
  },
  created() {
    this.getAuthList();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
