<template>
   <div class='sellerList'>
       <div class="table_title">
           <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddEditDialog('add')">添加商户</el-button>
         <div class="search_wrap">
          <el-input clearable v-model="username" placeholder="请输入名称" size="small" style="width:200px"></el-input>
          <el-date-picker
            size="small"
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-button @click="search" type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </div>
       </div>
       <div class="content">
         <el-table :data="dataList.list" stripe border>
           <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="username" label="商户名"></el-table-column>
          <el-table-column prop="tel" label="类别"></el-table-column>
          <el-table-column prop="city" label="详细地址"></el-table-column>
          <el-table-column prop="tel" label="营业时间"></el-table-column>
          <el-table-column prop="city" label="附件信息">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="look">点击查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="商户描述"></el-table-column>
          <el-table-column prop="tel" label="手机号码"></el-table-column>
          <el-table-column prop="times" label="申请时间">
            <template slot-scope="scope">
              {{scope.row.times | formatTimeStamp}}
            </template>
          </el-table-column>
          <el-table-column prop="" label="账号状态">
            <template slot-scope="scope">
              <el-button :title="scope.row.status=='0'?'激活':scope.row.status=='1'?'点击禁用':'点击解除禁用'" @click="userStop(scope.row.id)" :type="scope.row.status=='2'?'warning':scope.row.status=='1'?'success':'info'" size="mini">
                {{scope.row.status | userStatus}}
              </el-button>
            </template>
          </el-table-column>
          
          <el-table-column prop="" label="操作" width="200px">
            <template slot-scope="scope">
                 <el-button @click="openAddEditDialog('edit',scope.row)" type="warning" size="mini" icon="el-icon-edit">修改</el-button>
                <el-button @click="del(scope.row.id)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
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
         <el-dialog top="20px" :title="form.id?'修改代理商信息':'添加代理商信息'" :visible.sync="AddEditDialog" width="650px" @close="$refs['ruleForm'].resetFields()">
          <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" :prop="form.id?'':'password'">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="city">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
                <el-radio :label="2">未知</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input type="number" v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="id">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="pictrue">
                <el-upload
                  accept="image/jpeg,image/gif,image/png,image/bmp" 
                  class="upload-demo"
                  action="aaa"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleChange">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">图片大小不超过2MB</div>
                </el-upload>
                <img class="img" v-if="img" :src="img" alt="">
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
   export default {
     data () {
       return {
         rules:{
            username:[
              { required: true, message: '账号不能为空', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ],
            tel:[
              { validator:this.$rules.checkPhone,required: true, trigger: 'blur' }
            ],
            city:[
              { required: true, message: '地址不能为空', trigger: 'blur' }
            ],
            name:[
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            sex:[
              { required: true, message: '性别不能为空', trigger: 'blur' }
            ],
            age:[
              { required: true, message: '年龄不能为空', trigger: 'blur' }
            ],
            id:[
              { validator: this.$rules.checkId,required: true, trigger: 'blur' }
            ],
            native_place:[
              { required: true, message: '名族不能为空', trigger: 'blur' }
            ],
            pictrue:[
              { required: true, message: '头像不能为空', trigger: 'blur' }
            ],
          },
            pickerOptions: {//快捷键
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
           username:'',//名称
           status:'',//用户状态
           date:'',//日期
           dataList:[],//数据源
          page:1,//页
          limit:10,//条
          AddEditDialog:false,
          form:{
              username:'',
              password:'',
                tel:"",
                city:"",
                name: "",
                sex: '',
                age: '',
                phone: '',
                id: '',
                native_place: "",
                pictrue: ""
          },
          img:'',
     }
   },
   components: {

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
     //获取列表
     getDataList(){
       this.$api.getSellerList({
         page:this.page,
         limit:this.limit,
         status:this.status,
          times:this.date,
          username:this.username
       })
       .then(res=>{
         console.log(res)
         this.dataList=res.data;
       })
     },
    //查询用户
    search(){
      this.page=1;
      this.getDataList();
    },
    // 停用
    userStop(id){
      this.$confirm('确认进行该项操作吗?','提示',{type:'warning'})
      .then(()=>{
        this.$api.userStop({
        uid:id
        })
        .then(res=>{
            this.$message[res.code?'warning':'success'](res.data);
            this.getDataList();
        })
      })
      .catch(()=>{
        this.$message.info('已取消删除');
      })
    },
    //打开dialog
    openAddEditDialog(type,item){
        if(type=='add'){
            for(let i in this.form){
                this.form[i]=''
            }
        }else{
            this.form.username=item.username,
              this.form.password=item.password,
               this.form.tel=item.tel,
                this.form.city=item.city,
                this.form.name= item.name,
                this.form.sex= item.sex,
                this.form.age= item.age,
                this.form.phone=item.phone,
                this.form.id= item.id,
                this.form.native_place= item.native_place,
                this.form.pictrue= item.pictrue
        }
        this.AddEditDialog=true;
    },
    //上传图片
    handleChange(file, fileList) {
      if(fileList.length>1){
        fileList.shift();
      }
      let that=this;
      let size = file.size / 1024 / 1024;
      if (size < 2) {
        that.form.pictrue=file.raw;
         let reader = new FileReader();
        reader.readAsDataURL(file.raw); //调用自带方法进行转换
        reader.onload = function(e) {
          //将转换后的编码存入src完成预览
          that.img = this.result;
        };
      }else{
        this.$message.error('上传图片大小不能超过 2MB!');
      }
     },
    //确认添加/修改
    addEdit(){
      tis.$refs.ruleForm.validator(valid=>{
        if(valid){
          this.$api[this.form.id?'addSeller':'editSeller']({
            username:this.form.username,
            password:this.form.password,
            tel:this.form.tel,
            city:this.form.city,
            sex:this.form.sex,
            age:this.form.age,
            phone:this.form.phone,
            id:this.form.id,
            native_place:this.form.native_place,
            pictrue:this.form.pictrue,
          })
          .then(res=>{
            this.$message[res.code?'error':'success'](res.data.message);
            if(!this.form.id){
              this.page=1;
            }
            this.getDataList();
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
