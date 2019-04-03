<template>
   <div class='upload'>
       <el-upload
        action="http://47.110.67.134:9002/common/upload"
        accept="image/jpeg,image/gif,image/png,image/bmp"
        multiple
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <!-- 预览 -->
      <div class="preview">
          <div class="box" :style="`width:${width}px;height:${height}px`" v-for="(item,index) in imgList" :key="index">
              <img :src="item">
              <div class="model"><i title="删除" class="el-icon-delete" @click="del(index)"></i></div>
          </div>
      </div>
   </div>
</template>

<script>
   export default {
       props:['imgList','width','height'],
       name:'upload',
     data () {
       return {

     }
   },
   components: {

   },
   methods:{
       //图片上传前
       beforeAvatarUpload(file){

       },
       //上传成功回调
       handleAvatarSuccess(res,file,fileList){
           console.log(res);
           if(res.code){
               this.$message.info('已为你自动过滤不符合要求的图片');
           }else{
               this.imgList.push(res.data.host+res.data.name);
           }
       },
       del(index){
           this.imgList.splice(index,1);
       }
   },
   
  }
</script>

<style scoped>
.preview{
    display: flex;
    flex-wrap: wrap;
}
.preview img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.box{
    position: relative;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
}
.box:hover .model{
    display: block;
}
.model{
    border-radius: 10px;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5)
    
}
.el-icon-delete{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    cursor: pointer;
}
</style>
