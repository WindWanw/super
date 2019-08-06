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
            v-model="order_sn"
            placeholder="请输入订单号"
            size="mini"
            style="width:200px"
            @keyup.enter.native="search"
          ></el-input>
          <el-date-picker
            v-model="times"
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="timestamp"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="primary" size="mini" @click="search" icon="el-icon-search" style="margin:0 5px 0 5px;">搜索</el-button>
          <el-button
            type="success"
            size="mini"
            @click="daochu"
            icon="iconfont daochu"
          >导出</el-button>
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
      height: 150,
      tableData: [],
      page: 1,
      limit: 10,
      order_sn: "",
      total: 0,
      times: "",
      isShow:false,
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
      this.bill();
    },
    //分条
    handleCurrentChange(val) {
      this.page = val;
      this.bill();
    },
    search() {
      this.page=1;
      this.bill();
      this.isShow=true;
    },
    back(){
      this.page=1;
      this.limit=10;
      this.order_sn="";
      this.bill();
      this.isShow=false;
    },
    daochu() {
      window.location.href =
        "http://dev.admin.api.zhengyi100.cn/getorders/exportAdmin?times=" +
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

</style>
