<template>
  <div class="goodsList">
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
        <span style="font-size:12px;">退款时间：</span>
        <el-date-picker
          value-format="timestamp"
          size="mini"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="起始时间"
          end-placeholder="终止时间"
          :picker-options="pickerOptions"
          style="margin-right:10px;"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content" style="width:100%;">
      <el-table :data="dataList.list" border style="width: 100%;" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>

        <el-table-column label="订单信息" align="center">
          <el-table-column prop="order_id" label="订单ID" align="center"></el-table-column>
          <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="order_type" label="订单类型" align="center">
            <template slot-scope="scope">
              <el-tag
                size="mini"
                :type="scope.row.order_type | payType"
              >{{scope.row.order_type | orderType}}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="amount" label="退款金额(元)" align="center"></el-table-column>
        <el-table-column prop="times" label="退款时间" align="center"></el-table-column>
        <el-table-column prop="tips" label="退款类型" align="center">
          <template slot-scope="scope">
            <el-tag type="primary" size="mini">{{scope.row.tips}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate_name" label="操作人" align="center"></el-table-column>
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
import { promises } from "fs";
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
      page: 1,
      limit: 10,
      dataList: [],
      date: [], //时间
      show: false //线上返回
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

    getBack() {
      this.loading = true;
      this.show = false;
      this.date = [];
      this.getDataList();
    },

    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getRefundLogs({
          page: this.page,
          limit: this.limit,
          times: this.date
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },

    //搜索
    search() {
      this.page = 1;
      this.show = true;
      this.getDataList();
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
.goods_title {
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  border-top: 1px solid #eee;
  margin-bottom: 20px;
  padding-left: 10px;
  box-sizing: border-box;
}
.goods_title:nth-child(1) {
  border-top: none;
}
.goods_title span {
  font-weight: normal;
  color: #666;
  padding-left: 10px;
  box-sizing: border-box;
}
.imgPreview {
  display: flex;
  flex-wrap: wrap;
}
.imgPreview img {
  width: 100%;
  height: 100%;
}
.img_box {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 20px 10px 0;
  border: 1px dashed #ccc;
}
.model {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 150px;
  color: #fff;
  top: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  text-align: center;
}
.img_box:hover .model {
  display: block;
}
.model i {
  cursor: pointer;
  font-size: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.button {
  margin: 10px 0;
}
.el-button + .el-button {
  margin-left: 0;
}
.avatar {
  width: 30px;
  height: 30px;
}
.goods {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.goods_title {
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  border-top: 1px solid #eee;
  margin-bottom: 20px;
  padding-left: 10px;
  box-sizing: border-box;
}
.goods_title:nth-child(1) {
  border-top: none;
}
.goods_title span {
  font-weight: normal;
  color: #666;
  padding-left: 10px;
  box-sizing: border-box;
}
.el-form-item {
  width: 500px;
}
.imgPreview {
  display: flex;
  flex-wrap: wrap;
}
.imgPreview img {
  width: 100%;
  height: 100%;
}
.img_box {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 20px 10px 0;
  border: 1px dashed #ccc;
}
.model {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 150px;
  color: #fff;
  top: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  text-align: center;
}
.img_box:hover .model {
  display: block;
}
.model i {
  cursor: pointer;
  font-size: 20px;
}
.footer_btn {
  padding: 20px 0;
  margin: 0 auto;
  text-align: center;
}
.attr-img {
  width: 75px;
  height: 75px;
  margin: 5px 0 0 0;
}
</style>
