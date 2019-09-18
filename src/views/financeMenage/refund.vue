<template>
  <div class="order">
    <div class="table_title">
      <el-button
        v-if="show"
        type="primary"
        icon="el-icon-d-arrow-left"
        size="mini"
        @click="getBack"
      >返回</el-button>
      <span v-if="!show"></span>
      <div class="search_wrap">
        <el-input
          clearable
          v-model="order_sn"
          placeholder="请输入订单编号"
          size="small"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>申请时间：
        <el-date-picker
          style="margin:0 10px"
          value-format="timestamp"
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="起始时间"
          end-placeholder="终止时间"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content" style="width:100%">
      <el-table :data="dataList.list" stripe border v-loading="loading">
        <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="create_times" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="username" label="申请人" align="center"></el-table-column>
        <el-table-column prop="goods_name" label="售后商品" align="center"></el-table-column>
        <el-table-column prop="amount" label="售后金额(元)" align="center"></el-table-column>
        <el-table-column prop="supplier" label="所属商户" align="center"></el-table-column>
        <el-table-column prop="types" label="售后类型" align="center">
          <template slot-scope="scope">
            <span
              :style="scope.row.types=='1' ? 'color:red' : ''"
            >{{scope.row.types=='1' ? '退款':'退货退款'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="处理平台" align="center">
          <template slot-scope="scope">
            <span
              :style="scope.row.status=='3' ? 'color:red' : ''"
            >{{scope.row.status=='3' ? '商户':'正意'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="handler" label="处理人" align="center"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="mini-button"
              type="primary"
              size="mini"
              @click="handle(scope.row)"
              icon="iconfont qian"
            >退款处理</el-button>
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
      loading: false,

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
      date: [],
      dataList: [],
      page: 1,
      limit: 10,
      order_sn: "", //订单编号
      show: false //线上返回
    };
  },
  mounted: function() {},
  methods: {
    //分页
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },

    getBack() {
      this.loading = true;
      this.$api
        .getSaleList({
          page: 1,
          limit: 10
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
          this.show = false;
          this.date = [];
          this.order_sn = "";
        });
    },

    //获取数据
    getDataList() {
      this.loading = true;
      this.$api
        .getSaleList({
          page: this.page,
          limit: this.limit,
          times: this.date,
          order_sn: this.order_sn,
          refund: true
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },
    //查询
    search() {
      this.show = true;
      this.page = 1;
      this.getDataList();
    },

    //处理
    handle(item) {
      this.$confirm("确定要退款吗？").then(_ => {
        this.$api
          .financeRefund({
            id: item.id,
            order_id: item.order_id
          })
          .then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            this.getDataList();
          });
      });
    }
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
}
.certificate-img {
  width: 200px;
  height: 200px;
  margin: 10px;
}
.certificate-img img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.view-img {
  width: 80%;
  height: 500px;
  margin: 10px auto;
}
.view-img img {
  width: 100%;
  height: 100%;
}
</style>
