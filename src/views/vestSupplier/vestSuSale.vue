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
          size="mini"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>申请时间：
        <el-date-picker
          style="margin:0 10px"
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
          <el-table :data="dataList.list" stripe border v-loading="loading" :key="Math.random()">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="expand_wrap">
                  <p>
                    商品图片：
                    <img style="width:75px;height:75px;" :src="props.row.goods_img" />
                  </p>
                  <p>商品名称：{{props.row.goods_name}}</p>
                  <p>产品型号：{{props.row.attr_val ? props.row.attr_val:'无'}}</p>
                  <p>售后原因：{{props.row.reason}}</p>
                  <p>售后说明：{{props.row.explain}}</p>
                  <p v-if="props.row.certificate.length">
                    <span
                      v-for="(item,index) in props.row.certificate"
                      :key="index"
                      class="certificate-img"
                    >
                      <img :src="item" @click="viewImg(item)" />
                    </span>
                  </p>
                  <p v-else>凭证：无</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="username" label="申请人" align="center"></el-table-column>
            <el-table-column prop="amount" label="售后金额(元)" align="center"></el-table-column>
            <el-table-column prop="types" label="售后类型" align="center">
              <template slot-scope="scope">
                <span
                  :style="scope.row.types=='1' ? 'color:red' : ''"
                >{{scope.row.types=='1' ? '退款':'退货退款'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="退货物流" align="center" v-if="status=='1'">
              <template slot-scope="scope">
                <el-button
                  v-if="['2','5'].indexOf(scope.row.status) !=-1"
                  size="mini"
                  type="primary"
                  @click="openExpressDialog(scope.row)"
                >查看物流</el-button>
                <span
                  v-else
                  :style="scope.row.types !='2' ? '' : scope.row.status !='6' ? 'color:red' : ''"
                >{{scope.row.types !='2' ? '不存在物流信息' : scope.row.status !='6' ? '未填写退货物流' : ''}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_times" label="申请时间" align="center" v-if="status != '5'"></el-table-column>
            <el-table-column prop="times" label="退款时间" align="center" v-if="status=='5'"></el-table-column>
            <el-table-column label="操作" v-if="status=='0' || status=='1'">
              <template slot-scope="scope">
                <el-button
                  class="mini-button"
                  v-if="status=='0'"
                  type="success"
                  size="mini"
                  @click="openHandleDialog(scope.row)"
                  icon="iconfont daichuli"
                >处理</el-button>
                <el-button
                  class="mini-button"
                  v-if="status=='1'"
                  type="success"
                  size="mini"
                  @click="applyRefund(scope.row)"
                  icon="iconfont daichuli"
                >申请退款</el-button>
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

    <el-dialog title="退货物流信息" :visible.sync="expressDialog">
      <el-form label-width="80px">
        <el-form-item label="物流公司">
          <el-input v-model="express_company" readonly></el-input>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="express_num" readonly></el-input>
        </el-form-item>
        <el-form-item label="发起时间">
          <el-input v-model="express_time" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 商户处理售后信息 -->
    <el-dialog title="处理售后" :visible.sync="handleDialog" @close="form.status=''">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="售后处理">
          <el-radio-group v-model="form.status" @change="clear">
            <el-radio :label="1">同意</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle()">确定</el-button>
        <el-button @click="handleDialog=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 查看大图 -->
    <el-dialog :visible.sync="viewImgDialog">
      <div class="view-img">
        <img :src="image" />
      </div>
    </el-dialog>
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
      tabList: [
        { label: "等待处理", name: "0" },
        { label: "已同意", name: "1" },
        { label: "平台介入", name: "2" },
        { label: "平台同意", name: "3" },
        { label: "平台拒绝", name: "4" },
        { label: "等待退款", name: "7" },
        { label: "完成售后", name: "5" }
      ],
      date: [],
      status: "0",
      dataList: [],
      page: 1,
      limit: 10,
      order_sn: "", //订单编号
      show: false, //线上返回
      viewImgDialog: false, //查看大图
      handleDialog: false, //处理dialog
      image: "",
      form: {
        id: "",
        status: "",
        result: ""
      },
      uid: JSON.parse(localStorage.getItem("userinfo")).id,
      express_company: "",
      express_num: "",
      express_time: "",
      expressDialog: false
    };
  },
  mounted: function() {},
  methods: {
    viewImg(item) {
      this.viewImgDialog = true;
      this.image = item;
    },
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
          limit: 10,
          status: "0"
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
          this.show = false;
          this.status = "0";
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
          status: this.status,
          times: this.date,
          order_sn: this.order_sn,
          vest:true,
        })
        .then(res => {
          this.dataList = res.data || [];
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
      this.show = true;
      this.page = 1;
      this.getDataList();
    },
    openHandleDialog(item) {
      this.form.id = item.id;
      this.clear();
      this.handleDialog = true;
    },
    clear() {
      this.form.result = "";
      console.log(this.form);
    },

    //处理
    handle() {
      this.$api.suProcess(this.form).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.handleDialog = false;
        this.getDataList();
      });
    },
    openExpressDialog(item) {
      this.express_company = item.company;
      this.express_num = item.express_num;
      this.express_time = item.express_time;
      this.expressDialog = true;
    },
    applyRefund(item) {
      this.form.id = item.id;
      this.form.status = "7";
      if (item.types == "2" && item.status != "6") {
        this.$confirm("该用户未填写退货物流信息，确定申请退款吗？").then(_ => {
          this.handle();
        });
      } else {
        this.handle();
      }
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
.el-button + .el-button {
  margin-left: 0;
  margin-top: 5px;
}
</style>
