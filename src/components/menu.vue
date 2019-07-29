<template>
   <div class='menu'>
       <router-link class="href" :to="item.path" v-for="(item,index) in menuList" :key="index">
          <el-button :type="item.path==$route.path?'primary':''" size="mini">
            {{item.name}}
             <span v-if="menuList.length!=1" class='el-icon-close' @click.prevent.stop="closeTags(item)"></span>
          </el-button>
       </router-link>
   </div>
</template>

<script>
   export default {
     data () {
       return {
         
     }
   },
   computed:{
     menuList(){
       return this.$store.getters.menuList;
     }
   },
   watch:{
    //  添加标签页
     '$route'(to,from){
       this.$store.dispatch('addTab',to);
     }
   },
   methods:{
    //  删除标签页，当标签页是当前页删除跳转到上一个页面
     closeTags(item){
       this.$store.dispatch('delTab',item).then(res=>{
         if(item.path==this.$route.path){
           this.$router.push(res[res.length-1].path);
         }
       })
     },

   },
   created(){
     this.$store.dispatch('addTab',this.$route);
   }
  }
</script>

<style>
.menu{
 border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.href{
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
