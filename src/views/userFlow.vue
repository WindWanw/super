<template>
  <div class="userList">
    <!-- 头部（搜索条件） -->
    <div class="table_title">
        <div>
        <el-button size="small" @click="returnHome()">返回列表首页</el-button>
      </div>
      <div class="search_wrap">
        <el-input clearable v-model="username" placeholder="请输入用户名" size="small" style="width:200px"></el-input>

        <el-date-picker size="small" v-model="date" type="daterange" align="right" unlink-panels value-format="timestamp" range-separator="至" start-placeholder="开始日期" 
           end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="search" type="primary" icon="el-icon-search" size="small" style="margin-left:10px">搜索</el-button>
      </div>
    </div>
    <!-- 内容（表单，分页） -->
    <div class="content">
      <el-table :data="dataList" stripe border v-loading="loading">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="pay_amount" label="支付金额"></el-table-column>
        <el-table-column prop="super" label="红包"></el-table-column>
        <el-table-column prop="shop" label="店铺优惠券"></el-table-column>
        <el-table-column prop="common" label="通用优惠券"></el-table-column>

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
      loading:false,
      is_search:false,
      pickerOptions: {
        //快捷键
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      username: "", //用户名
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10 //条
    };
  },
  methods: {
    // 切换limit
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //  切换page
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //获取用户列表
    getDataList() {
      this.loading=true;
      this.$api
        .userFlow({
          page: this.page,
          limit: this.limit,
          times: this.date,
          username: this.username
        })
        .then(res => {
          console.log(res);
          this.dataList = res.data.list || [];

          this.loading=false;
        });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
    },

    returnHome() {
      this.page = 1;
      this.limit = 10;
      this.times = "";
      this.username = "";
      this.getDataList();
    },
  },
  
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}
.avatar {
  width: 30px;
  height: 30px;
}
</style>
