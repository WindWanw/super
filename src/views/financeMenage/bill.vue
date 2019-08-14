<template>
  <div class="bill">
    <div class="table_title">
      <div class="search_wrap">
        <div>
          <el-input
            clearable
            v-model="order_sn"
            placeholder="请输入订单号"
            size="small"
            style="width:200px;margin:0 10px"
          ></el-input>
          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="times"
            size="small"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="timestamp"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" size="small" style="margin-left:10px;" @click="daochu" icon="el-icon-search">导出</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" :height="height">
        <el-table-column prop="order_sn" label="订单号" width="180"></el-table-column>
        <el-table-column prop="bill_time" label="交易时间" width="180"></el-table-column>
        <el-table-column prop="amount" label="总金额" width="180"></el-table-column>
        <el-table-column prop="guide_earnings" label="专引师分成"></el-table-column>
        <el-table-column prop="SUPPLIER_earnings" label="商户分成"></el-table-column>
        <el-table-column prop="AGENT_earnings" label="代理商分成"></el-table-column>
        <el-table-column prop="ZY_earnings" label="平台分成"></el-table-column>
        <el-table-column prop="GUIDE_FATHER_earnings" label="一级专引师分成"></el-table-column>
        <el-table-column prop="GUIDE_GRANDPA_earnings" label="二级专引师分成"></el-table-column>
        <el-table-column prop="SUPPLIER_FATHER_earnings" label="一级商户分成"></el-table-column>
        <el-table-column prop="INVITE_earnings" label="邀请专引师一级"></el-table-column>
        <el-table-column prop="INVITE_2_earnings" label="邀请专引师二级"></el-table-column>
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
      height:100,
      tableData: [],
      page: 1,
      limit: 10,
      order_sn: "",
      total: 0,
      times: ""
    };
  },
  methods: {
    bill() {
      this.$api
        .billList({
          page: this.page,
          limit: this.limit,
          order_sn: this.order_sn
        })
        .then(res => {
          this.tableData = res.data.list || [];
          this.total = res.data.total || 0;
          this.height=100;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 600;
          } else if (t != 0) {
            this.height = t * 70;
          }
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
        });
    },
    //分页
    handleSizeChange(val) {
      this.limit = val;
      this.bill();
    },
    //分条
    handleCurrentChange(val) {
      this.page = val;
      this.bill();
    },
    search() {
      this.bill();
    },
    daochu() {
      
      window.location.href =
        "https://admin.api.zhengyi100.cn/getorders/exportAdmin?times=" +
        this.times[0] / 1000 +
        "," +
        this.times[1] / 1000;
      // this.$api.exportAdmin({
      //   times: this.times[0] / 1000+','+this.times[1] / 1000
      // });
    }
  },
  created() {
    this.bill();
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
.search_wrap{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

</style>
