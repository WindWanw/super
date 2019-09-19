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
        <!-- <el-input clearable v-model="name" placeholder="请输入关键字" size="small" style="width:200px"></el-input> -->
        <el-radio-group v-model="is_online" style="margin:0 10px" @keyup.enter.native="search">
          <el-radio label="1">线上订单</el-radio>
          <el-radio label="2">线下订单</el-radio>
        </el-radio-group>
        <el-input
          clearable
          v-model="order_num"
          placeholder="请输入订单编号进行核销"
          size="small"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          v-model="title"
          clearable
          placeholder="请选择商户"
          size="small"
          @keyup.enter.native="search"
        >
          <el-option
            v-for="item in suList"
            :key="item.supplier_id"
            :label="item.title"
            :value="item.supplier_id"
          ></el-option>
        </el-select>下单时间：
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
        <el-button type="success" size="mini" @click="beforeExport" icon="iconfont daochu">导出</el-button>
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
          <el-table
            :data="dataList.list"
            stripe
            border
            v-loading="loading"
            class="order-table"
          >
            <el-table-column prop="order_sn" label="订单编号" align="center"></el-table-column>
            <el-table-column prop="order_type" label="订单类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.order_type=='1'" style="color:red">线上订单</span>
                <span v-if="scope.row.order_type=='2'">线下订单</span>
              </template>
            </el-table-column>
            <el-table-column prop="supplier_name" label="商户姓名" align="center"></el-table-column>

            <el-table-column prop="amount" label="订单金额(元)" align="center"></el-table-column>
            <el-table-column prop="actual" label="实际金额(元)" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.order_type==2 && scope.row.status!='5'">0</span>
                <span v-else>{{scope.row.actual}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="su_commission" label="佣金(元)" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.order_type==2 && scope.row.status!='5'">0</span>
                <span v-else>{{scope.row.su_commission}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="outlet" label="折扣减免金额(元)" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.order_type==2 && scope.row.status!='5'">0</span>
                <span v-else>{{scope.row.outlet}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="guide_name" label="所属专引师" align="center">
              <template slot-scope="scope">{{scope.row.guide_name}}</template>
            </el-table-column>
            <el-table-column prop="times" label="下单时间" align="center"></el-table-column>
            <el-table-column prop="status" label="订单状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status | payStatus"
                  size="mini"
                >{{scope.row.status | orderStatus}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="消费者姓名" align="center"></el-table-column>
            <el-table-column prop="order_goods" label="订单商品" align="center">
              <template slot-scope="scope">
                <el-button
                  title="点击查看订单商品"
                  class="mini-button"
                  type="success"
                  size="mini"
                  icon="el-icon-view"
                  @click="openOrderGoods(scope.row.order_goods)"
                >订单商品</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
            <el-table-column label="操作" v-if="(status=='2' || status=='3' || status=='5')">
              <template slot-scope="scope">
                <el-button
                  class="mini-button"
                  v-if="status=='2' && scope.row.order_type=='1'"
                  type="success"
                  size="mini"
                  @click="orderId=scope.row.id;guideId=scope.row.guide_id;dialog=true;address=scope.row.address;orderNumber='';orderCompany=''"
                  icon="el-icon-goods"
                >点击发货</el-button>
                <el-button
                  class="mini-button"
                  v-if="status !='2' && scope.row.order_type=='1'"
                  type="success"
                  size="mini"
                  @click="address=scope.row.address;express_number=scope.row.express_number;express_company=scope.row.company;exdialog=true"
                  icon="el-icon-goods"
                >查看物流</el-button>
                <el-button
                  v-if="['2','3','5'].indexOf(status) !==-1 && uid==1"
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
        :page-sizes="[10, 20, 50, 100,200,500]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
      ></el-pagination>
    </div>

    <!-- 订单商品 -->
    <el-dialog title="订单商品" :visible.sync="openOrderGoodsDialog">
      <el-table :data="order_goods" stripe border v-loading="loading">
        <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
        <el-table-column prop label="商品图片" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.pics" />
          </template>
        </el-table-column>
        <el-table-column prop="attr" label="商品属性" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.goods_attr.attr_val}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 发货dialog -->
    <el-dialog
      title="发货"
      :visible.sync="dialog"
      @close="orderNumber='';orderCompany='';QTshow=false"
    >
      <el-form label-width="100px">
        <el-form-item label="目的地">
          <el-input v-model="address" readonly></el-input>
        </el-form-item>
        <el-form-item label="物流公司">
          <el-select v-model="orderCompany" placeholder="请选择物流公司" @change="getExpressCompany()">
            <el-option
              v-for="item in expressList"
              :key="item.val"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="QTshow">
          <el-input v-model="QTCompany" placeholder="请输入物流公司名称"></el-input>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="orderNumber" placeholder="请输入物流单号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="sendGoods">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看物流dialog -->
    <el-dialog title="查看物流" :visible.sync="exdialog">
      <el-form label-width="100px">
        <el-form-item label="目的地">
          <el-input v-model="address" readonly></el-input>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="express_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="物流公司">
          <el-input v-model="express_company" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
      title: "",
      is_online: "",
      dataList: [],
      suList: [],
      page: 1,
      limit: 10,
      dialog: false, //发货物流dialog
      exdialog: false, //查看物流
      orderId: "", //订单id
      guideId: "", //专引师id
      orderNumber: "", //物流单号
      orderCompany: "", //物流公司
      QTCompany: "", //其他物流公司
      express_number: "",
      express_company: "",
      address: "",
      order_num: "", //订单编号
      show: false, //线上返回
      openOrderGoodsDialog: false, //订单商品
      order_goods: [], //订单商品列表
      expressList: [], //快递公司列表
      QTshow: false,
      uid:JSON.parse(localStorage.getItem("userinfo")).id
    };
  },
  mounted: function() {},
  methods: {
    //导出之前
    beforeExport() {
      this.$confirm("确定导出当前页数据吗？(选择100条/页试试)")
        .then(_ => {
          this.exportExcel();
        })
        .catch(_ => {});
    },
    //导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector(".order-table"));

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "orderList.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
      this.show = false;
      this.status = "0";
      this.date = [];
      this.name = "";
      this.title = "";
      this.order_num = "";
      this.is_online = "";
      this.getDataList();
    },

    //获取数据
    getDataList() {
      this.loading = true;
      this.$api
        .vestOrderList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.date,
          title: this.title,
          keywords: this.name,
          is_online: this.is_online,
          order_sn: this.order_num
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },

    //订单商品
    openOrderGoods(item) {
      this.openOrderGoodsDialog = true;
      this.order_goods = item;
    },

    getVestSu() {
      this.$api.getVestSu().then(res => {
        this.suList = res.data.list || [];
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
    //确认发货
    sendGoods() {
      if (!this.orderNumber) return this.$message.warning("请输入物流单号");
      if (!this.orderCompany)
        return this.$message.warning("请输入物物公司名称");
      this.$api
        .sendGoods({
          id: this.orderId,
          guide_id: this.guideId,
          express_number: this.orderNumber,
          company: this.orderCompany,
          qtcompany: this.QTCompany
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);

          if (res.code) return;
          this.dialog = false;
          this.getDataList();
        });
    },
    getExpress() {
      this.$api.getExpress().then(res => {
        this.expressList = res.data.list || [];
      });
    },
    getExpressCompany() {
      console.log(this.orderCompany);

      if (this.orderCompany == "其他") {
        this.QTshow = true;
      } else {
        this.QTshow = false;
        this.QTCompany = "";
      }
    },
    clickitem(e) {
      e === this.is_online ? (this.is_online = "") : (this.is_online = e);
    },

    //退款
    refund(val) {
      if(JSON.parse(localStorage.getItem("userinfo")).id!=1){
        return this.$message.error("当前登录用户没有权限退款");
      }
      this.$confirm("确定要给该用户退款吗？")
        .then(_ => {
          this.$api.setRefund({ order_id: val,type:"VEST" }).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            this.getDataList();
          });
        })
        .catch(_ => {});
    }
  },
  created() {
    var param = this.$route.query;
    console.log(param);
    if (JSON.stringify(param) != "{}") {
      this.status = param.status;
    }
    this.getVestSu();
    this.getDataList();
    this.getExpress();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.avatar {
  width: 50px;
  height: 50px;
}
.el-button+.el-button {
    margin: 10px 0;
}
</style>
