<template>
  <div id="app">
    <router-view/> 
  </div>
</template>
<script>
export default {
}
</script>
<style>
*{margin: 0;padding: 0}
body,html,#app{
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.theme-bg-blue{
  background-color: #409eff;
}
/* 标题样式 */
.title{
   border-bottom: 1px solid #eee;
   line-height: 40px;
   padding: 0 20px;
   box-sizing: border-box;
   color: #009cf7;
}
/* 表格标题 */
.table_title{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
/* 分页样式 */
.el-pagination{
  text-align: center;
  margin-top: 20px;
}

/* dialog */
.el-dialog__body{
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
  .idcard_img{
    display: inline-block;
    width: 240px;
    height: 150px;
    border:1px dashed #ddd;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .license_img{
    display: inline-block;
    width: 200px;
    height: 300px;
    border:1px dashed #ddd;
    box-sizing: border-box;
  }
  .ad_img{
    display: inline-block;
    width: 200px;
    height: 100px;
    border:1px dashed #ddd;
    box-sizing: border-box;
  }
  .expand_wrap p{
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .expand_wrap p span{
    width: 120px;
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
    color: #99a9bf;
  }
</style>
