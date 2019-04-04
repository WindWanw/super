<template>
  <div class="order">
    <div class="table_title">
      <div class="search_wrap">
        <el-input clearable v-model="name" placeholder="请输入订单" size="small" style="width:200px"></el-input>
        <el-date-picker
          value-format="timestamp"
          size="small"
          v-model="date"
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
    <div class="content" style="width:100%">
      <el-tabs type="border-card" v-model="status" @tab-click=tabClick>
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border>
            <el-table-column prop="order_sn" label="订单编号"></el-table-column>
            <el-table-column prop="uid" label="用户名"></el-table-column>
            <el-table-column prop="tel" label="联系方式"></el-table-column>
            <el-table-column prop="pay_amount" label="金额"></el-table-column>
            <el-table-column prop="outlet" label="折扣减免金额"></el-table-column>
            <el-table-column prop="card_id" label="卡券编号"></el-table-column>
            <el-table-column prop="guide_id" label="所属专引师"></el-table-column>
            <el-table-column prop="pay_times" label="下单时间" width="100px">
              <template slot-scope="scope">{{scope.row.pay_times | formatTimeStamp}}</template>
            </el-table-column>
            <el-table-column prop="status" label="订单状态" width="100px">
              <template slot-scope="scope">
                <el-button :type="scope.row.status | payStatus" size="mini">
                  {{scope.row.status | orderStatus}}
                </el-button>
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
export default {
  data() {
    return {
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
      date: [],
      status: "0",
      dataList: [],
      page: 1,
      limit: 10
    };
  },
  methods: {
    //分页
    handleSizeChange(val){
      this.page=val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val){
      this.limit=val;
      this.getDataList();
    },
    //获取数据
    getDataList() {
      this.$api
        .getOrderList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times:this.date,
          order_sn:this.name
        })
        .then(res => {
          this.dataList = res.data || [];
        });
    },
    // tab切换
    tabClick(val){
      console.log(val)
      this.status=val.name;
      this.page=1;
      this.getDataList();
    },
    //查询
    search() {
      this.page = 1;
      this.getDataList();
    }
  },
  created() {
    this.getDataList()
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>
