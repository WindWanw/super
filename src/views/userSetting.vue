<template>
   <div class='userSetting'>
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
     }
   },
   components: {

   },
   methods:{
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
