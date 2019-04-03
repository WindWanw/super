<template>
   <div class='systemArticle'>
       <div class="table_title">
         <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddEditDialog('add')">添加文章</el-button>
       </div>
       <div class="content">
         <el-table :data="dataList.list" stripe border>
          <el-table-column prop="code" label="文章类型"></el-table-column>
          <el-table-column prop="title" label="文章标题"></el-table-column>
          <el-table-column prop="body" label="文章内容">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="form.body=scope.row.body;previewDialog=true">预览</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="times" label="发布时间">
            <template slot-scope="scope">
              {{scope.row.times | formatTimeStamp(1)}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
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
         <el-dialog :title="form.id?'修改':'添加'" :visible.sync="AddEditDialog" width="800px" top="20px">
          <el-form status-icon label-width="70px">
            <el-form-item label="文章类型">
              <el-select v-model="form.code" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
              <editor-bar v-model="form.body" :isClear="isClear" @change="change"></editor-bar>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AddEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="addEdit">确 定</el-button>
          </div>
        </el-dialog>
          <!-- 预览dialog -->
        <el-dialog title="预览文章" :visible.sync="previewDialog" width="800px" top="20px">
          <div v-html="form.body"></div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="previewDialog = false">关闭</el-button>
          </div>
        </el-dialog>




   </div>
</template>

<script>
import EditorBar from '../components/editor'
   export default {
     data () {
       return {
           test:'',
           isClear:false,
          dataList:[],//数据源
          page:1,//页
          limit:10,//条
          AddEditDialog:false,
          options: [{
            value: '100',
            label: '黄金糕'
          }, {
            value: '200',
            label: '双皮奶'
          }, {
            value: '300',
            label: '蚵仔煎'
          }, {
            value: '400',
            label: '龙须面'
          }, {
            value: '500',
            label: '北京烤鸭'
          }],
          form:{
              code:'',
              title:'',
              body:'',
              id:''
          },
          previewDialog:false,//预览文章内容
     }
   },
   components: {
EditorBar 
   },
   methods:{
       change(val){
           console.log(val);
           this.test = val
       },
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
       this.$api.getArticleList({
         page:this.page,
         limit:this.limit,
       })
       .then(res=>{
         console.log(res)
         this.dataList=res.data;
       })
     },
     //删除文章
     del(id){
         let that=this;
         that.$confirm('此操作将永久删除该文件, 是否继续?','提示')
         .then(()=>{
             that.$api.delArticle({id})
             .then(res=>{
                 console.log(res)
                 that.$message.success('删除成功');
                 that.getDataList();
             })
         })
         .catch(()=>{
             that.$message.info('已取消删除')
         })
     },
      //打开dialog
      openAddEditDialog(type,item){
          if(type=='add'){
            for(let i in this.form){
              this.form[i]='';
            }
          }else{
            this.form.title=item.title;
            this.form.code=item.code;
            this.form.body=item.body;
            this.form.id=item.id;
          }
          this.AddEditDialog=true;
      },
      //确认添加或修改
      addEdit(){
        let id=this.form.id;
        this.$api[id?'editArticle':'addArticle'](this.form)
        .then(res=>{
          console.log(res);
          if(id){this.page=1};
          this.getDataList();
          this.AddEditDialog=false;
        })
      },
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
