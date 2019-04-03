<template>
  <div id="home">
    <div id="header">
      <Header @changeCollapse="changeCollapse"></Header>
    </div>
    <div id="main">
      <div id="aside">
        <Aside :collapse="collapse"></Aside>
      </div>
      <div id="content">
        <div id="content_menu">
          <Menu></Menu>
        </div>
        <div id="content_main"><router-view/></div>
      </div>
    </div>
    
  </div>
</template>
<script>
import Header from '@/components/header';
import Aside from '@/components/aside';
import Menu from '@/components/menu';
   export default {
     data () {
       return {
         collapse:false,//侧边栏展开收起状态
     }
   },
   components: {Header,Aside,Menu},
   methods:{
     //由子组件触发
     changeCollapse(){
       this.collapse=!this.collapse;
     }
   }
  }
</script>
<style>
#home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1024px;
}
#main{
  flex: 1;
  display: flex;
}
#content{
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f1f2f7;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
#content_menu{
  position: absolute;
  width: 100%;
}
#content_main{
  top: 60px;
  position:absolute;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
}
</style>
