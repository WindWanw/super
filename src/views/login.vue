<template>
   <div class='login'>
       <div class="login_wrap">
         <div class="login_title">正意总平台</div>
             <el-input v-model="ruleForm.username" placeholder="请输入账号" size="small"></el-input>
             <el-input placeholder="请输入密码" v-model="ruleForm.password" size="small" show-password></el-input>
         <div class="btn">
           <el-button type="primary" size="small" @click="login">登录</el-button>
           <el-button type="warning" size="small" @click="reset">重置</el-button>
         </div>
       </div>
   </div>
</template>

<script>
   export default {
     data () {
       return {
         ruleForm:{
           username:'',
           password:''
         },
     }
   },
   components: {

   },
   methods:{
     login(){
       if(!this.ruleForm.username) return this.$message.error('账号不能为空');
       if(!this.ruleForm.password) return this.$message.error('密码不能为空');
       this.$api.login(this.ruleForm)
       .then(res=>{
         if(!res.code){
           localStorage.setItem('token',res.data.token);
           localStorage.setItem('userinfo',JSON.stringify(res.data.userinfo));
           this.$router.replace('/home');
           return this.$message.success(res.data.message);
         }else{
           return this.$message.error(res.data.message);
         }
       })
     },
     reset(){
       this.ruleForm={};
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
    },
   },
   destroyed(){
     document.onkeydown=null;
  },
   created(){
     localStorage.clear();
     this.keyUp();
   }
  }
</script>

<style scoped>
.login{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: cover;
}
  .login_wrap{
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 18px rgba(0,0,0,0.3);
    padding: 20px 30px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .login_title{
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 30px;
  }
 .el-input{
   margin-bottom: 15px;
 }
 .btn{
   display: flex;
   justify-content: space-between;
 }
.el-button--small{
   padding: 9px 30px;
 }
</style>
