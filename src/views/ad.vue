<template>
   <div class='ad'>
       <div class="table_title">
         <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddEditDialog('add')">添加广告</el-button>
       </div>
       <div class="content">
         <el-table :data="dataList.list" stripe border>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="ads" label="广告内容" width="250px">
            <template slot-scope="scope">
              <div><span>标题:</span>{{scope.row.ads.title}}</div>
              <div><span>链接:</span>{{scope.row.ads.url}}</div>
              <img class="ad_img" v-if="scope.row.ads.pic" :src="scope.row.ads.pic">
            </template>
          </el-table-column>
          <el-table-column prop="page" label="页面"></el-table-column>
          <el-table-column prop="adder" label="添加人"></el-table-column>
          <el-table-column prop="checker" label="审核人"></el-table-column>
          <el-table-column prop="begin" label="上架时间" width="100px">
            <template slot-scope="scope">{{scope.row.begin | formatTimeStamp}}</template>
          </el-table-column>
          <el-table-column prop="timeout" label="下架时间" width="100px">
            <template slot-scope="scope">{{scope.row.timeout | formatTimeStamp}}</template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="180px">
              <template slot-scope="scope">
              <div class="cz_btn">
                <el-button @click="openAddEditDialog('edit',scope.row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button @click="del(scope.row.id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.total">
        </el-pagination>
       </div>

           <!-- 添加dialog -->
         <el-dialog top="20px" :title="form.id?'修改':'添加'" :visible.sync="AddEditDialog" width="650px" @close="$refs['ruleForm'].resetFields()">
          <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="广告页" prop="page">
              <el-input v-model="form.page"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-cascader :options="cityData" v-model="selectCity" change-on-select :placeholder="form.id?'如需修改请选择':''"></el-cascader>
              <span v-if="form.id" style="margin-left:20px">当前城市:{{city}}</span>
            </el-form-item>
            <el-form-item label="广告链接">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="广告标题" :prop="form.pic?'':'title'">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="广告图片" :prop="form.title?'':'pic'">
                <el-upload
                  :action="`${axios.defaults.baseURL}/common/upload/file/adv_upload_dir`"
                  accept="image/jpeg, image/gif, image/png, image/bmp"
                  :before-upload="beforeUp1"
                  :show-file-list="false"
                  :on-success="upSuc1"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <img v-if="form.pic" class="ad_img" :src="form.pic">
            </el-form-item>
            <el-form-item label="上下架时间" prop="times">
              <el-date-picker
                value-format="timestamp"
                size="small"
                v-model="form.times"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AddEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="addEdit">确 定</el-button>
          </div>
        </el-dialog>
   </div>
</template>

<script>
import citys from '../utils/city.js';
import upload from '../components/upload';
   export default {
     data () {
       return {
          dataList:[],//数据源
          page:1,//页
          limit:10,//条
          AddEditDialog:false,
          cityData:citys,//城市数据
          selectCity:[],//选择城市
          city:'',
          form:{
              page:'',
              title:'',
              url:'',
              pic:'',
              id:'',
              times:''
          },
          rules:{
            page:[
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ],
            
            title:[
              { required: true, message: '广告标题不能为空', trigger: 'blur' }
            ],
            pic:[
              { required: true, message: '广告图片不能为空', trigger: 'blur' }
            ],
            times:[
              { required: true, message: '上下架时间不能为空', trigger: 'blur' }
            ],
          }
     }
   },
   components: {
     upload
   },
   methods:{
     // 切换limit
     handleSizeChange(val){
       this.limit=val;
       this.getDataList();
     },
    //  切换page
     handleCurrentChange(val){
       this.page=val;
       this.getDataList();
     },
     //获取数据列表
     getDataList(){
       this.$api.getAdList({
         page:this.page,
         limit:this.limit,
       })
       .then(res=>{
         this.dataList=res.data || [];
       })
     },
     //打开添加修改dialog
     openAddEditDialog(type,item){
       if(type=='add'){
         for(let i in this.form){
             this.form[i]="";
         }
         this.selectCity=[];
       }else{
         this.form.page=item.page;
         this.city=item.city;
         this.selectCity = [];
         this.form.title=item.ads.title;
         this.form.url=item.ads.url;
         this.form.pic=item.ads.pic;
         this.form.id=item.id;
         let date=item.begin?[item.begin*1000,item.timeout*1000]:'';
         this.form.times=date;
       }
       this.AddEditDialog=true;
     },
     //上次图片前
    beforeUp1(file) {
      if (file.size > 1024*2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning('图片不能超过2MB')
        return false
      }
    },
    //上传成功后
    upSuc1(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.pic = res.data.host + res.data.name;
      }
    },
     //确认添加或修改
     addEdit(){
       let that=this;
       if(!this.form.id){
        if(!that.selectCity || !that.selectCity.length)return this.$message.warning('请选择城市');
       }
       that.$refs.ruleForm.validate(valid=>{
         if(valid){
          let ads={'title':that.form.title,'pic':that.form.pic,'url':that.form.url};
           that.$api[that.form.id?'editAd':'addAd']({
             page:that.form.page,
             city:that.selectCity,
             times:that.form.times,
             ads,
             id:that.form.id
           })
           .then(res=>{
             that.AddEditDialog=res.code?true:false;
             that.$message[res.code?'error':'success'](res.data.message);
             if(!that.form.id){
               this.page=1;
             }
             that.getDataList();
           })
         }else{
           return false;
         }
       })
     },
     //删除
     del(id){
       this.$confirm('确认删除该项吗?','提示',{type:'warning'})
       .then(()=>{
         this.$api.delAd({id})
         .then(res=>{
           this.$message[res.code?'error':'success'](res.data.message);
           this.page=this.$options.filters.pagination(this.page,this.limit,this.dataList.total);
           this.getDataList();
         })
       })
       .catch(()=>{
         this.$message.info('已取消删除');
       })
     }
   },
   
   created(){
     this.getDataList();
   }
  }
</script>

<style scoped>
  .content{
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
  }
  .avatar{
    width: 30px;
    height: 30px;
  }
</style>
