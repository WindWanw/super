<template>
   <div class='ad'>
       <div class="table_title">
         <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddEditDialog('add')">添加广告</el-button>
       </div>
       <div class="content">
         <el-table :data="dataList.list" stripe border>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="ads" label="广告内容"></el-table-column>
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
                <el-button @click="openAddEditDialog('edit',scope.row)" type="warning" size="mini" icon="el-icon-edit" plain>修改</el-button>
                <el-button @click="del(scope.row.id)" type="danger" size="mini" icon="el-icon-delete" plain>删除</el-button>
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
            <el-form-item label="城市" prop="city">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="广告链接">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="广告标题" :prop="form.pic?'':'title'">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="广告图片" :prop="form.title?'':'pic'">
                <upload :imgList="form.pic" @getPic="getPic"></upload>
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
import upload from '../components/upload';
   export default {
     data () {
       return {
          dataList:[],//数据源
          page:1,//页
          limit:10,//条
          AddEditDialog:false,
          form:{
              page:'',
              city:'',
              title:'',
              url:'',
              pic:[],
              id:''
          },
          rules:{
            page:[
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ],
            city:[
              { required: true, message: '城市不能为空', trigger: 'blur' }
            ],
            title:[
              { required: true, message: '广告标题不能为空', trigger: 'blur' }
            ],
            pic:[
              { required: true, message: '广告图片不能为空', trigger: 'blur' }
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
           if(i=='pic'){
             this.form[i]=[];
           }else{
             this.form[i]="";
           }
         }
       }else{
         this.form.page=item.page;
         this.form.city=item.city;
         this.form.title=item.ads.title || '';
         this.form.url=item.ads.url || '';
         this.form.pic=that.$options.filters.copyArray(item.ads.pic);
         this.form.id=item.id;
       }
       this.AddEditDialog=true;
     },
     
     //确认添加或修改
     addEdit(){
       console.log(this.form.pic);
       let that=this;
       that.$refs.ruleForm.validate(valid=>{
         if(valid){
          let ads=JSON.stringify([{'title':that.form.title},{'pic':that.form.pic},{'url':that.form.url}]);
           that.$api[that.form.id?'editAd':'addAd']({
             page:that.form.page,
             city:that.form.city,
             ads,
             id:that.form.id
           })
           .then(res=>{
             this.$message[res.code?'error':'success'](res.data.message);
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
         this.$api.delAd(id)
         .then(res=>{
           this.$message[res.code?'error':'success'](res.data.message);
           that.getDataList();
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
