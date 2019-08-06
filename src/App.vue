<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      // num: 0,
      // new_num: 0,
      // token: localStorage.getItem("token")
    };
  },
  methods: {
    // getOrderNotify() {
    //   let that = this;
    //   this.$api.getNotify().then(res => {
    //     if (res.data.num > that.num) {
    //       that.new_num = res.data.num - that.num;
    //       that.setNotify(); //弹窗提醒
    //     }
    //     that.num = res.data.num;
    //   });

    //   setTimeout(res => {
    //     that.getOrderNotify();
    //   }, 2000);
    // },

    // setNotify() {
    //   let that = this;
    //   that.$notify({
    //     title: "新的订单",
    //     message: "您有" + that.new_num + "条订单等待处理，请注意查收",
    //     iconClass: "iconfont ic_wait",
    //     offset: 50,
    //     duration: 10000
    //   });
    // },

    checkLogin() {
      this.$api.checkLogin().then(res => {
        if (res.code == 114) {
          Message.error("您的登录已失效，请重新登录");
          router.push("/login");
          localStorage.clear("token");
          localStorage.clear("userinfo");
        } else {
          console.log("欢迎");
        }
      });
    }
  },
  // mounted() {
  //   if (this.token != null) {
  //     this.$api.getNotify().then(res => {
  //       this.num = res.data.num;
  //     });
      
  //   }
  //   this.getOrderNotify();
  // },
  created() {
    this.checkLogin();
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.theme-bg-blue {
  background-color: #409eff;
}
/* 导航菜单 */
.el-menu-item {
  border-left: 4px solid transparent;
}
.el-menu-item.is-active {
  border-left: 4px solid #409eff;
  font-size: 16px;
}
/* 选择主题按钮 */
.el-color-picker__color {
  border: none !important;
}
/* 标题样式 */
.title {
  border-bottom: 1px solid #eee;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #409eff;
}
/* 表格标题 */
.table_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
/* 分页样式 */
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

/* dialog */
.el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
/* 表格展开 */
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
/* 图片大小定义 */
.idcard_img {
  display: inline-block;
  width: 240px;
  height: 150px;
  border: 1px dashed #ddd;
  box-sizing: border-box;
  margin-right: 20px;
}
.license_img {
  display: inline-block;
  width: 200px;
  height: 300px;
  border: 1px dashed #ddd;
  box-sizing: border-box;
}
.ad_img {
  display: inline-block;
  width: 200px;
  height: 100px;
  border: 1px dashed #ddd;
  box-sizing: border-box;
}
.expand_wrap p {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.expand_wrap p span {
  width: 120px;
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;
  color: #99a9bf;
}
.mini-button {
  font-size: 12px;
  border-radius: 3px;
  padding: 3px 6px !important;
}
.el-menu-item i {
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
</style>
