<template>
  <div class="order">
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
        <el-select
          v-model="is_online"
          size="mini"
          class="selectOrder"
          clearable
          placeholder="请选择订单类型"
          @keyup.enter.native="search"
        >
          <el-option
            v-for="item in order_typeList"
            :key="item.value"
            :label="item.label"
            :value="item.val"
          ></el-option>
        </el-select>
        <el-input
          clearable
          v-model="pay_sn"
          placeholder="请输入支付订单编号"
          size="mini"
          style="width:200px;margin-right:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="name"
          placeholder="请输入订单编号"
          size="mini"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-date-picker
          style="margin:0 10px"
          value-format="timestamp"
          size="mini"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content" style="width:100%">
      <el-tabs type="border-card" v-model="status" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border v-loading="loading">
            <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
            <!-- <el-table-column prop="tel" label="联系方式"></el-table-column> -->
            <el-table-column prop="amount" label="订单金额(元)" width="60px" align="center"></el-table-column>
            <el-table-column prop="admin_commission" label="平台获得(元)" width="60px" align="center"></el-table-column>
            <el-table-column prop="ag_commission" label="代理商获得(元)" width="60px" align="center"></el-table-column>
            <el-table-column prop="su_commission" label="商户获得(元)" width="60px" align="center"></el-table-column>
            <el-table-column prop="gu_commission" label="专引师获得(元)" width="60px" align="center"></el-table-column>
            <!-- <el-table-column prop="admin_commission" label="佣金(元)" width="120px"></el-table-column> -->
            <el-table-column prop="outlet" label="折扣减免金额" width="60px" align="center"></el-table-column>
            <el-table-column prop="card_id" label="卡券编号" width="60px" align="center"></el-table-column>
            <el-table-column prop="guide_name" label="所属专引师" align="center"></el-table-column>
            <el-table-column prop="times" label="下单时间" width="100px" align="center">
              <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <el-button
                  class="mini-button"
                  :type="scope.row.status | payStatus"
                  size="mini"
                >{{scope.row.status | orderStatus}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              v-if="['2','3','5'].indexOf(status) !==-1 && uid==1"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="refund(scope.row.id)"
                  type="danger"
                  size="mini"
                  icon="iconfont qian"
                  class="mini-button"
                >退款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

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
import { constants } from "crypto";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      height: 100,
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
      tabList: [
        { label: "全部", name: "0" },
        { label: "待付款", name: "1" },
        { label: "待发货", name: "2" },
        { label: "已发货", name: "3" },
        { label: "退单", name: "4" },
        { label: "交易成功", name: "5" }
      ],
      name: "",
      pay_sn: "",
      date: [],
      status: "0",
      dataList: [],
      page: 1,
      limit: 10,
      is_online: "", // 订单类型
      order_typeList: [
        { label: "线上订单", val: 1 },
        { label: "线下订单", val: 2 },
        { label: "技术服务费", val: 3 }
      ],
      uid: JSON.parse(localStorage.getItem("userinfo")).id
    };
  },
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
    //获取数据
    getDataList() {
      this.loading = true;
      this.$api
        .getOrderList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.date,
          order_sn: this.name,
          pay_sn: this.pay_sn,
          is_online: this.is_online
        })
        .then(res => {
          this.dataList = res.data || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    // tab切换
    tabClick(val) {
      this.status = val.name;
      this.page = 1;
      this.getDataList();
    },
    //查询
    search() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
    },
    back() {
      this.page = 1;
      this.limit = 10;
      this.status = "0";
      this.date = [];
      this.name = "";
      this.pay_sn = "";
      this.is_online = "";
      this.getDataList();
      this.isShow = false;
    },
    //订单类型查询
    searchTypeList(val) {
      console.log(val);
    },
    refund(val) {
      if (JSON.parse(localStorage.getItem("userinfo")).id != 1) {
        return this.$message.error("当前登录用户没有权限退款");
      }
      this.$confirm("确定要给该用户退款吗？")
        .then(_ => {
          this.$api.setRefund({ order_id: val, type: "GOODS" }).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            this.getDataList();
          });
        })
        .catch(_ => {});
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
.el-tag {
  margin-right: 10px;
}
.selectOrder {
  margin-right: 20px;
}
</style>
