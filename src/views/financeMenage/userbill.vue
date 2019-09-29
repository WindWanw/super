<template>
  <div class="bill">
    <div class="table_title">
      <div>
        <el-button
          v-if="isShow"
          type="primary"
          size="mini"
          class="el-icon-d-arrow-left"
          @click="back()"
        >返回</el-button>
      </div>
      <div class="search_wrap">
          <el-input
            clearable
            v-model="username"
            placeholder="输入用户名查询"
            size="mini"
            style="width:200px"
            @keyup.enter.native="search"
          ></el-input>
          <el-input
            clearable
            v-model="uid"
            placeholder="输入UID"
            size="mini"
            style="width:200px"
            @keyup.enter.native="search"
          ></el-input>
          <el-button type="primary" size="mini" @click="search" icon="el-icon-search" style="margin:0 5px 0 5px;">搜索</el-button>
        </div>
    </div>
    <div class="content">
      <el-table :data="tableData" border  :height="height">
        <el-table-column prop="uid" label="UID" ></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="truename" label="真实姓名" ></el-table-column>
        <el-table-column prop="tel" label="电话" ></el-table-column>
        <el-table-column prop="card_count" label="未使用优惠券金额"></el-table-column>
        <el-table-column prop="money" label="账户金额"></el-table-column>
        <el-table-column prop="xiaofei" label="消费金额"></el-table-column>
        <el-table-column prop="tixian" label="提现金额"></el-table-column>
        <el-table-column prop="bill" label="收益金额"></el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 150,
      tableData: [],
      page: 1,
      limit: 10,
      username: "",
      uid:"",
       total: 0,
      isShow:false,
    };
  },
  methods: {
    userLiuShui() {
      this.$api
        .userLiuShui({
          page: this.page,
          limit: this.limit,
          username: this.username,
          uid: this.uid
        })
        .then(res => {
          this.tableData = res.data.list || [];
          this.total = res.data.total || 0;
          this.height = 150;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 600;
          } else if (t != 0) {
            this.height = t * 120;
          }
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
        });
    },
    //分页
    handleSizeChange(val) {
      this.limit = val;
      this.userLiuShui();
    },
    //分条
    handleCurrentChange(val) {
      this.page = val;
      this.userLiuShui();
    },
    search() {
      this.page=1;
      this.userLiuShui();
      this.isShow=true;
    },
    back(){
      this.page=1;
      this.limit=10;
      this.order_sn="";
      this.userLiuShui();
      this.isShow=false;
    },
  },
  created() {
    this.userLiuShui();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.el-button + .el-button {
  margin-left: 0;
}

</style>
