<template>
  <div class="teacherSh">
    <div class="table_title">
    <div class="search_wrap">
      <el-date-picker
        value-format="timestamp"
        size="small"
        v-model="times"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
    </div>
    </div>
    <div class="content">
       <el-table :data="dataList.info" stripe border style="width:100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
                <p><span>手机号码:</span>{{props.row.tel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="city" label="专引城市"></el-table-column>
        <el-table-column prop="tag" label="标签" width="300px">
          <template slot-scope="scope">
            <el-tag style="margin-right:10px" v-for="item in scope.row.tag" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shopname" label="商店"></el-table-column>
        <el-table-column prop="times" label="注册时间">
          <template slot-scope="scope">
            {{scope.row.times | formatTimeStamp}}
          </template>
        </el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
            <el-button type="warning" size="mini">待审核</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="200px">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button
              @click="dialogVisible=true;id=scope.row.id;pass='';remark=''"
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                title="点我对该条信息进行审核认证"
              >点击审核</el-button>
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
        :total="dataList.total"
      ></el-pagination>
    </div>
    <!-- 审核dialog -->
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      @close="pass='';remark=''"
      width="30%">
       <el-radio-group v-model="pass">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">驳回</el-radio>
        </el-radio-group>
        <el-input v-if="pass==0" style="margin-top:20px" type="textarea" :rows="2" placeholder="请输入备注信息" v-model="remark"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      dataList: [],
      page: 1,
      limit: 10,
      status: 2,
      times: "",
      username: "",
      pass:'',//通过/驳回
      remark:'',//备注消息
      dialogVisible:false,
      id:'',//审核id
      
    };
  },
  components: {},
  watch:{
    pass(newVal,oldVal){
      if(newVal==1){
        this.remark='';
      }
    }
  },
  methods: {
    //获取数据列表
    getDataList() {
      this.$api
        .getGuideList({
          page: this.page,
          limit: this.limit,
          status:this.status,
          times:this.times,
        })
        .then(res => {
          this.dataList = res.data || [];
        });
    },
    //分页
    handleSizeChange(val) {
      this.page = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.limit = val;
      this.getDataList();
    },
    // 查询
    search(){
      this.page=1;
      this.getDataList();
    },
    //审核通过驳回
   
    sure(){
      if(this.pass===''){
        this.$message.warning('请选择通过或者驳回');
      }else if(!this.pass && !this.remark){
        this.$message.warning('请填写驳回原因');
      }else{
        this.$api.userStop({
          uid:this.id,
          result:this.pass,
          remark:this.remark
        })
        .then(res=>{
            this.dialogVisible=res.code?true:false;
            this.$message[res.code?'error':'success'](res.data.message);
            this.getDataList();
        })
      }

    },
    // 展开
    // toogleExpand(row){
    //   let $table = this.$refs.table;
    //   this.dataList.list.map((item) => {
    //     if (row.id != item.id) {
    //       $table.toggleRowExpansion(item, false)
    //     }
    //   })
    //   $table.toggleRowExpansion(row);
    // }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content{
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .idcardImg{
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
