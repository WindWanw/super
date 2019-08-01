<template>
   <div class='header theme-bg-blue'>
     <div class="left">
        <div class="logo">正意总平台</div>
        <i class="iconfont mulu" title="收起/展开" @click="$emit('changeCollapse')"></i>
     </div>
     
     <div class="right">
       <!-- <theme-picker></theme-picker> -->
       <i class="iconfont zhanghao"></i>
       <span class="username">{{username}}</span>
       <el-dropdown>
        <span class="el-dropdown-link">
          <i class="iconfont dengchu"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="openEditPassword">
              <i class="iconfont mima"></i>修改密码
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="loginout">
              <i class="iconfont daochu1"></i>退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     </div>
   </div>
</template>

<script>
import ThemePicker from "@/components/themePicker";
   export default {
     data () {
       return {
         username:JSON.parse(localStorage.getItem('userinfo')).username || ''
     }
   },
   computed:{
     
   },
   components: {
     ThemePicker 
   },
   methods:{
     loginout(){
       this.$confirm('确定要退出当前登录吗？')
          .then(_ => {
            this.$router.replace('/login');
            localStorage.clear('token');
            localStorage.clear('userinfo');
          })
          .catch(_ => {
            
          });
     },
     openEditPassword(){
       this.$router.replace('/userSetting');
     }
   }
  }
</script>

<style>

.header{
  /* border-bottom: 1px solid #e8e9ed; */
  min-height: 60px;
  /* background-color: #009DFB; */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.left{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iconfont.mulu{
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-left: 20px;
  cursor: pointer;
}
.logo{
  font-size: 28px;
}
.iconfont.zhanghao{
  margin-left: 10px;
}
.right .username{
  margin: 0 10px;
}
.iconfont.dengchu{
  font-size: 18px;
  cursor: pointer;
}
.dengchu {
  font-size: 12px;
  color: #fff;
}
</style>
