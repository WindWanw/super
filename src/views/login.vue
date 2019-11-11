<template>
  <div class="login">
    <div class="login_wrap">
      <div class="login_title">
        <span>正意后台</span>
      </div>
      <div v-if="!isShow">
        <el-input
          size="small"
          placeholder="请输入账号"
          prefix-icon="iconfont yonghu1"
          v-model="ruleForm.username"
        ></el-input>
        <el-input
          prefix-icon="iconfont mima"
          placeholder="请输入密码"
          v-model="ruleForm.password"
          size="small"
          show-password
        ></el-input>
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </div>
      <div v-else class="qrcode-img">
        <img class="image" :src="qrcode" alt="扫描二维码" title="扫描二维码验证信息登录" />
        <p>请使用正意小程序扫码</p>
      </div>
    </div>
    <div class="footer">
      <div class="text">版权所有@江西多淇信息科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;版本{{versions}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      versions: "", //版本号
      ruleForm: {
        username: "",
        password: "",
        character: 4, //角色，总部
        url: "",
        uuid: ""
      },
      isShow: true,
      qrcode: ""
    };
  },
  components: {},
  //页面加载调用获取cookie值
  mounted() {},
  methods: {
    getQRcode() {
      this.$api.supplierLoginQRcode().then(res => {
        this.qrcode = res.data.img;
        this.ruleForm.uuid = res.data.uuid;
      });
    },
    ancSuperLogin() {
      this.$api.ancSuperLogin({ uuid: this.ruleForm.uuid }).then(res => {
        if (res.code) {
          this.loopRequest();
        } else {
          this.isShow = false;
        }
      });
    },
    loopRequest() {
      setTimeout(this.ancSuperLogin, 3000);
    },
    login() {
      if (!this.ruleForm.username)
        return this.$message.error("“账号不能为空，请填写账号");
      if (!this.ruleForm.password)
        return this.$message.error("密码不能为空，请填写密码");
      this.$api.login(this.ruleForm).then(res => {
        if (!res.code) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userinfo", JSON.stringify(res.data.userinfo));
          localStorage.setItem("type", res.data.type);
          localStorage.setItem("path", res.data.path);
          // this.getMessageCount(res.data.userinfo.id);
          this.$router.replace(this.url);
          return this.$message.success({
            message: res.data.message,
            duration: 1500
          });
        } else {
          localStorage.setItem("username", null);
          localStorage.setItem("password", null);
          return this.$message.error(res.data.message);
        }
      });
    },
    getVersions() {
      this.$api.getVersions().then(res => {
        this.versions = res.data.versions;
      });
    },
    reset() {
      this.ruleForm = {};
    },
    //键盘事件获取焦点
    keyUp() {
      var _self = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          _self.login();
        }
      };
    }
  },
  destroyed() {
    document.onkeydown = null;
  },
  created() {
    this.getVersions();

    this.url = this.$route.query.redirect || "/home";
    if (localStorage.getItem("token")) {
      this.$router.replace(this.url);
    } else {
      this.getQRcode();
      this.loopRequest();
    }
    this.keyUp();
  }
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../assets/bgc.png") no-repeat;
  background-size: cover;
}
.login_wrap {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.3);
  padding: 10px 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 10px;
}
.login_title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  font-style: normal;
}
.login_title span {
  width: 80%;
  height: 100%;
  border-bottom: 2px solid #409eff;
}
.el-input {
  margin-bottom: 15px;
}
.el-button--small {
  width: 100%;
  border-radius: 20px;
  margin: 10px auto;
}
.footer {
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: #409eff;
  height: 50px;
}
.text {
  text-align: center;
  margin: 10px 0;
  color: white;
}
.qrcode-img {
  width: 150px;
  height: 150px;
  margin: 20px auto;
}
.image {
  width: 100%;
  height: 100%;
}
.qrcode-img p{
  width: 150px;
  font-size: 10px;
  text-align: center;
  color: grey;
}
</style>
