<template>
   <div class='header theme-bg-blue'>
     <div class="left">
        <div class="logo">正意总平台</div>
        <i class="iconfont mulu" title="收起/展开" @click="$emit('changeCollapse')"></i>
     </div>
     
     <div class="right">
       <theme-picker></theme-picker>
       <i class="iconfont zhanghao"></i>
       <span class="username">{{username}}</span>
       <i class="iconfont dengchu" title="注销登录" @click="loginout"></i>
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
       this.$router.replace('/login');
       localStorage.clear('token');
       localStorage.clear('userinfo');
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
</style>
