<template>
  <div class="teacher">
    <div class="table_title">
    <div class="search_wrap">
      <el-input clearable v-model="username" placeholder="请输入名称" size="small" style="width:200px"></el-input>
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
      <el-table :data="dataList.list" stripe border style="width:100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
                <p><span>手机号码:</span>{{props.row.tel}}</p>
                <p><span>身份证号码:</span>{{props.row.idcard}}</p>
                <p><span>身份证正反面:</span><img class="idcard_img" :src="props.row.picOn"><img class="idcard_img" :src="props.row.picOff"></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="avata'r" label="头像"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="city" label="专引城市"></el-table-column>
        <el-table-column prop="city" label="标签"></el-table-column>
        <el-table-column prop="city" label="积分"></el-table-column>
        <el-table-column prop="city" label="经验值"></el-table-column>
        <el-table-column prop="city" label="近30天收入"></el-table-column>
        <el-table-column prop="city" label="总收入"></el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
            <template slot-scope="scope">
            <el-button
              :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
              @click="userStop(scope.row.id)"
              :type="scope.row.status=='1'?'success':'info'"
              size="mini"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="申请日期">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button type="warning">惩罚</el-button>
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
  methods: {
    //获取数据列表
    getDataList() {
      this.$api
        .getGuideList({
          page: this.page,
          limit: this.limit,
          // status:this.status,
          // times:this.times,
          // username:this.username
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
