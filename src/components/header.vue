<template>
   <div class='header'>
     <div class="left">
        <div class="logo">vue后台管理系统</div>
        <i class="iconfont mulu" title="收起/展开" @click="$emit('changeCollapse')"></i>
     </div>
     <div class="right">
       <i class="iconfont zhanghao"></i>
       <span>{{username}}</span>
       <i class="iconfont dengchu" title="注销登录" @click="loginout"></i>
     </div>
   </div>
</template>

<script>
   export default {
     data () {
       return {
         username:JSON.parse(localStorage.getItem('userinfo')).username || ''
     }
   },
   computed:{
     
   },
   components: {

   },
   methods:{
     loginout(){
       this.$router.replace('/login');
       localStorage.clear();
     }
   }
  }
</script>

<style>

.header{
  /* border-bottom: 1px solid #e8e9ed; */
  min-height: 60px;
  background-color: #009DFB;
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
.right span{
  margin: 0 10px;
}
.iconfont.dengchu{
  font-size: 18px;
  cursor: pointer;
}
</style>
