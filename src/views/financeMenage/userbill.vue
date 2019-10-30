<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 15:07:30
 * @LastEditTime: 2019-10-18 14:25:50
 * @LastEditors: Please set LastEditors
 -->
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
        <el-button
          type="primary"
          size="mini"
          @click="search"
          icon="el-icon-search"
          style="margin:0 5px 0 5px;"
        >搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" border :height="height">
        <el-table-column prop="uid" label="UID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="truename" label="真实姓名"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="card_count" label="未使用优惠券金额"></el-table-column>
        <el-table-column prop="money" label="账户金额"></el-table-column>
        <el-table-column prop="xiaofei" label="消费金额"></el-table-column>
        <el-table-column prop="tixian" label="提现金额"></el-table-column>
        <el-table-column prop="bill" label="收益金额"></el-table-column>
        <el-table-column prop label="查看流水">
          <template slot-scope="scope">
            <el-button
              @click="lookDetail(scope.row.uid)"
              type="success"
              size="mini"
              icon="el-icon-view"
            >查看</el-button>
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
        :total="this.total"
      ></el-pagination>
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-select v-model="value" @change="selectlookDetail(user_id,value)" placeholder="默认支出">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-table :data="gridData">
          <el-table-column property="id" label="订单id" width="150"></el-table-column>
          <el-table-column property="order_sn" label="订单编号" width="200"></el-table-column>
          <el-table-column property="pay_amount" label="金额"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="page2"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total2"
        ></el-pagination>
      </el-dialog>
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
      page2: 1,
      limit: 10,
      username: "",
      uid: "",
      total: 0,
      total2: 0,
      time: "",
      type: 1,
      user_id: "",
      isShow: false,
      dialogTableVisible: false,
      gridData: [],
      options: [
        {
          value: "1",
          label: "支出"
        },
        {
          value: "2",
          label: "退款"
        },
        {
          value: "3",
          label: "收入"
        }
      ],
      value: ""
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
    //分页
    handleSizeChange2(val) {
      this.limit = val;
      this.selectlookDetail(this.user_id, this.value);
    },
    //分条
    handleCurrentChange2(val) {
      this.page2 = val;
      this.selectlookDetail(this.user_id, this.value);
    },
    search() {
      this.page = 1;
      this.userLiuShui();
      this.isShow = true;
    },
    back() {
      this.page = 1;
      this.limit = 10;
      this.order_sn = "";
      this.userLiuShui();
      this.isShow = false;
    },
    lookDetail(uid) {
      this.$api
        .oneLiuShui({
          page: 1,
          limit: this.limit,
          time: this.time,
          uid: uid,
          type: this.type
        })
        .then(res => {
          this.gridData = res.data.list || [];
          this.total2 = res.data.total || 0;
          this.height = 150;
          this.user_id = uid;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 600;
          } else if (t != 0) {
            this.height = t * 120;
          }
          this.dialogTableVisible = true;
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
        });
    },
    selectlookDetail(uid, type) {
      this.$api
        .oneLiuShui({
          page: this.page2,
          limit: this.limit,
          time: this.time,
          uid: uid,
          type: type
        })
        .then(res => {
          this.gridData = res.data.list || [];
          this.total2 = res.data.total || 0;
          this.height = 150;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 600;
          } else if (t != 0) {
            this.height = t * 120;
          }
          this.dialogTableVisible = true;
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
        });
    }
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
