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
      <el-tabs type="border-card" v-model="status" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border v-loading="loading" :height="height">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="expand_wrap">
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
            <el-table-column prop="goods_img" label="商品图片" align="center">
              <template slot-scope="scope">
                <img style="width:75px;height:75px;" :src="scope.row.goods_img" />
              </template>
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="attr_val" label="产品型号" align="center"></el-table-column>
            <el-table-column prop="amount" label="售后金额(元)" align="center"></el-table-column>
            <el-table-column prop="types" label="售后类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.types=='1'" style="color:red">退款</span>
                <span v-else>退货退款</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="good_status" label="货物状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.types=='1'" style="color:red">未到货</span>
                <span v-else>到货</span>
              </template>
            </el-table-column>-->
            <!-- <el-table-column prop="reason" label="售后原因" align="center"></el-table-column> -->
            <!-- <el-table-column prop="explain" label="售后说明" align="center"></el-table-column> -->
            <el-table-column prop="create_times" label="申请时间" align="center" v-if="status != '5'"></el-table-column>
            <el-table-column prop="times" label="退款时间" align="center" v-if="status=='5'"></el-table-column>
            <el-table-column label="操作" v-if="status=='2' || status=='3'">
              <template slot-scope="scope">
                <el-button
                  class="mini-button"
                  v-if="status=='2'"
                  type="success"
                  size="mini"
                  @click="handleDialog=true;form.id=scope.row.id"
                  icon="iconfont daichuli"
                >处理</el-button>
                <el-button
                  class="mini-button"
                  v-if="status=='3'"
                  type="primary"
                  size="mini"
                  @click="handle"
                  icon="iconfont qian"
                >退款处理</el-button>
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

    <!-- 商户处理售后信息 -->
    <el-dialog title="处理售后" :visible.sync="handleDialog" @close="form.status=''">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="售后处理">
          <el-radio-group v-model="form.status">
            <el-radio label="3">同意</el-radio>
            <el-radio label="4">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="拒绝原因" v-if="form.status=='4'">
          <el-input type="textarea" v-model="form.result"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle">确定</el-button>
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
      height: 150,
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
        { label: "等待处理", name: "2" },
        { label: "已同意", name: "3" },
        { label: "已拒绝", name: "4" },
        { label: "售后申请", name: "0" },
        { label: "商户同意", name: "1" },
        { label: "完成售后", name: "5" }
      ],
      date: [],
      status: "2",
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
      }
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
          status: "2"
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
          this.show = false;
          this.status = "2";
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
          order_sn: this.order_sn
        })
        .then(res => {
          this.dataList = res.data || [];
          this.height = 150;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 750;
          } else if (t != 0) {
            this.height = t * 150;
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
      this.show = true;
      this.page = 1;
      this.getDataList();
    },

    //处理
    handle() {
      if ((this.form.status = "3")) {
        this.form.result = "";
      }
      if (this.form.status == "4" && this.form.result == "") {
        this.$notify({
          title: "警告",
          message: "请填写拒绝原因",
          type: "warning"
        });
        return;
      }
      this.$api.suProcess(this.form).then(res => {
        this.$message(res.data.message);
        this.handleDialog = false;
        this.getDataList();
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
