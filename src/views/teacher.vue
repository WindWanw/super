<template>
  <div class="teacher">
    <div class="table_title">
    <div class="search_wrap">

      <el-select clearable v-model="status" placeholder="请选择用户类型" size="small">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
      <el-date-picker
      style="margin:0 10px"
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
      <el-table :data="dataList.info" stripe border style="width:100%" v-loading="loading">
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
            <!-- @click="userStop(scope.row.id)"
            :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'" -->
            <el-button
              :type="scope.row.status=='1'?'success':'info'"
              size="mini"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button @click="openPunishDialog(scope.row)" type="warning" size="mini" icon="el-icon-edit-outline">处罚</el-button>
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
    <!-- 惩罚dialog -->
    <el-dialog
      title="惩罚"
      :visible.sync="punishDialog"
      @close="1"
      label-width="120px"
      width="30%">
      <el-form>
        <el-form-item label="处罚类型">
          <el-select v-model="punishType" clearable placeholder="请选择处罚类型">
            <el-option v-for="item in punishList" :key="item.value" :label="item.title" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚内容" v-if="punishType">
          <el-select v-model="punishContent" clearable placeholder="请选择处罚内容">
            <el-option v-for="item in punishContentList" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="punishDialog = false">取 消</el-button>
        <el-button type="primary" @click="punishSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
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
      times: "",
      shopname: "",
      status:'',
      punishDialog:false,//处罚dialog
      punishList:'',
      punishContentList:'',
      punishId:'',//处罚id
      punishType:'',
      punishContent:''
    };
  },
   watch:{
    punishType(newVal,oldVal){
      console.log(newVal);
      this.punishList.forEach(item=>{
        if(newVal==item.val){
          this.punishContentList=item.type
        }
      })
    },
  },
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.loading=true;
      this.$api
        .getGuideList({
          page: this.page,
          limit: this.limit,
          times:this.times,
          shopname:this.shopname,
          status:this.status
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading=false;
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
    //禁用
    userStop(id){
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id,
              result:'1',
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    //获取处罚类型
    getPunishType(){
      this.$api.getPunishType()
      .then(res=>{
        this.punishList=res.data;
      })
    },
    //打开处罚dialoig
    openPunishDialog(item){
      this.getPunishType();
      this.punishId=item.id;
      this.punishDialog=true;
    },
    
    //确认处罚
    punishSure(){
      if(!this.punishType || !this.punishContent) return this.$message.warning('请处罚类型和处罚内容');
      this.$api.addPunish({
        to_uid:this.punishId,
        types:this.punishType,
        values:JSON.stringify(this.punishContent)
      })
      .then(res=>{
        this.$message[res.code?'warning':'success'](res.data.message);
        this.punishDialog=res.code?true:false;
      })
    }
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
