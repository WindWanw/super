<template>
   <div class='userSetting'>

      <el-upload
        action="http://47.110.67.134/common/upload"
        accept="image/jpeg,image/gif,image/png,image/bmp"
        multiple
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <div class="preview_img">
        <div class="box" v-if="pic.length">
          <img class="img" :src="item" v-for="(item,index) in pic" :key="index" alt="">
          <div class="zz" @click="del"><i class="el-icon-delete"></i></div>
        </div>
      </div>




      
      <el-button type="primary" @click="tj">提交</el-button>



      <el-cascader
        :options="options"
        v-model="selectedOptions"
        @change="change"
      ></el-cascader>

   </div>
</template>

<script>
import citys from '../utils/country-data.js';
import { setTimeout } from 'timers';
   export default {
     data () {
       return {
         options:'',
         selectedOptions:[],

         pic:[]
     }
   },
   components: {

   },
   methods:{

      beforeAvatarUpload(file){
        // console.log(file)
      },

      handleAvatarSuccess(res, file, fileList){
        console.log(res)
        if(res.code){
          this.$message.info('已为你自动移除不符合条件的图片')
        }else{
          this.pic.push(res.data.name);
        }
      },

      del(index){
        this.img.splice(index,1)
      },

     change(){
       console.log(this.selectedOptions)
     },
     
     tj(){
       console.log(this.pic);
     }
    
   },
   created(){
     citys.forEach(item=>{
       item.children.forEach(i=>{
         delete i.children;
       })
     })
     this.options=citys;
   }
  }
</script>

<style scoped>

.preview_img{
  width: 100%;
  border: 1px solid red;
  padding: 20px;
  display: flex;
}
.box{
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.img{
  width: 100%;
  height: 100%;
}
.box:hover .zz{
  display: block;
}
.zz{
  width: 100%;
  height: 100%;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}
</style>
