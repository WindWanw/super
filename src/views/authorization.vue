<template>
  <div class="card">
    <div class="table_title">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="openAddEditDialog()">添加角色</el-button>
    </div>
    <div class="content">
      <el-table :data="authList.list" style="width: 100%">
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <el-tag class="mini-button">{{scope.row.role | authGenre}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click="openEditPassword(scope.row.id)"
              type="primary"
              size="small"
              v-if="scope.row.show"
            >修改密码</el-button> -->
            <el-button
             class="mini-button"
              @click="del(scope.row.id)"
              type="danger"
              size="small"
              v-if="scope.row.role!='ADMIN' && login_id != scope.row.id"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加dialog -->
    <el-dialog
      title="添加"
      :visible.sync="AddEditDialog"
      width="850px"
      top="20px"
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="角色账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入角色账号"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入电话号码，便于后期修改密码"></el-input>
        </el-form-item>
        <el-form-item label="角色密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入角色密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="genre">
          <el-select v-model="ruleForm.genre" placeholder="请选择角色类型">
            <el-option
              v-for="item in genreList.list"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" width="750px" :visible.sync="retrieveDialog" append-to-body @close="$refs['ruleForm'].resetFields()">
      <el-form label-width="120px" :model="retrieve" :rules="rules" ref="retrieve">
        <el-form-item label="注册手机号" prop="tel">
          <el-input v-model="retrieve.tel" placeholder="请填写您注册时手机号"></el-input>
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
      AddEditDialog: false, //添加角色dialog
      btn_show1: true, //发送验证码
      btn_show2: false, //重新发送
      retrieveDialog: false,
      genreList: [], //角色类型
      login_id: JSON.parse(localStorage.getItem("userinfo")).id,
      ruleForm: {
        username: "", //角色账号
        password: "", //角色密码
        tel: "", //角色电话号码
        genre: "" //角色类型
      },
      retrieve: {
        id: "",
        tel: "",
        code: "",
        oldpassword: "",
        password: "",
        repassword: ""
      },
      authList: "",
      rules: {
        username: [
          { required: true, message: "账号必须填写", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        tel: [
          { validator: this.$rules.checkPhone, required: true, trigger: "blur" }
        ],
        genre: [{ required: true, message: "请选择角色类型", trigger: "blur" }],
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
    //添加角色
    openAddEditDialog() {
      this.AddEditDialog = true;
      for (let i in this.ruleForm) {
        this.ruleForm[i] = "";
      }
      this.getAuthGenre();
    },

    //角色类型
    getAuthGenre() {
      this.$api.getAuthGenre().then(res => {
        this.genreList = res.data || [];
      });
    },

    //角色列表
    getAuthList() {
      this.$api.getAuthList().then(res => {
        this.authList = res.data || [];
        if(res.code){
            this.$message[res.code ? "warning" : "success"](res.data);
         }
      });
    },

    //添加
    addEdit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$api.authAdd(this.ruleForm).then(res => {
            this.$message[res.code ? "error" : "success"](res.data.message);
            if (res.code) return;
            this.getAuthList();
            this.AddEditDialog = false;
          });
        }
      });
    },

//修改密码
    openEditPassword(item) {
      this.retrieveDialog = true;
      for (let i in this.retrieve) {
        this.retrieve[i] = "";
      }
      this.retrieve.id = item;
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
    //删除
    del(item) {
      this.$confirm("确认删除吗？", "提示", { type: "warning" })
        .then(() => {
          this.$api.delAdmin({ id: item }).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            if (res.code) return;
            this.getAuthList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
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
