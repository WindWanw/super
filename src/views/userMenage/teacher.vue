<template>
  <div class="teacher">
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
          :disabled="username !=''"
          clearable
          v-model="guide_id"
          placeholder="请输入专引师id"
          size="mini"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          clearable
          v-model="status"
          placeholder="请选择用户类型"
          size="mini"
          style="margin-left:10px;"
          @keyup.enter.native="search"
        >
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-input
          :disabled="guide_id !=''"
          clearable
          v-model="username"
          placeholder="请输入专引师用户名"
          size="mini"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-cascader
          size="mini"
          :options="cityData"
          v-model="city"
          change-on-select
          placeholder="请输入专引师所在城市名称"
          style="width:250px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-cascader>
        <!-- <el-input
          clearable
          v-model="city"
          placeholder="请输入专引师所在城市名称"
          size="mini"
          style="width:250px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>-->
        <el-date-picker
          style=";margin-left:10px;"
          value-format="timestamp"
          size="small"
          v-model="times"
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
    <div class="content">
      <el-tabs type="border-card" v-model="gtype" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="expand_wrap" v-if="props.row.idcard!=''">
                  <!-- <p>
                <span>手机号码:</span>
                {{props.row.tel}}
                  </p>-->
                  <p>
                    <span>身份证号码:</span>
                    {{props.row.idcard}}
                  </p>
                  <p>
                    <span>身份证正反面:</span>
                    <img class="idcard_img" :src="props.row.picOn" />
                    <img class="idcard_img" :src="props.row.picOff" />
                  </p>
                </div>
                <div v-else>
                  <span>无实名信息</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="UID" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>
            <el-table-column prop="city" label="专引城市" align="center"></el-table-column>
            <el-table-column prop="tel" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="tag" label="标签" align="center">
              <template slot-scope="scope">
                <template v-for="(item,index) in scope.row.tag">
                  <el-tag type="mini" v-if="index<3" :key="item">{{item}}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="times" label="注册时间" align="center"></el-table-column>
            <el-table-column prop="timeout" label="到期时间" align="center"></el-table-column>
            <el-table-column prop="needs" label="抢单数" align="center"></el-table-column>
            <el-table-column prop="needs_reply" label="回复需求数" align="center"></el-table-column>
            <el-table-column prop="posterity" label="发展专引师数" align="center">
              <template slot-scope="scope">
                <div
                  @click="getPosterity(scope.row.posterity,scope.row.id,'user')"
                  class="posterity"
                >{{scope.row.posterity}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="账号类型" align="center">
              <template slot-scope="scope">
                <el-tag
                  :hit="true"
                  size="mini"
                  v-if="scope.row.status=='1'"
                  :type="scope.row.type ? 'success' : 'primary'"
                >{{scope.row.type ? '已付费' : '体验'}}</el-tag>
                <el-tag size="mini" v-else type="danger">无</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop label="账号状态" align="center">
              <template slot-scope="scope">
                <el-button
                  :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
                  @click="userStop(scope.row.id)"
                  :type="scope.row.status=='1'?'success':'info'"
                  size="mini"
                  class="mini-button"
                >{{scope.row.status | userStatus}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="scope">
                <div class="cz_btn">
                  <el-button
                    @click="openPunishDialog(scope.row)"
                    type="warning"
                    size="mini"
                    icon="el-icon-edit-outline"
                    class="mini-button"
                  >处罚</el-button>
                  <el-button
                    v-if="uid==1"
                    @click="refund(scope.row.order_id)"
                    type="danger"
                    size="mini"
                    icon="iconfont qian"
                    class="mini-button"
                  >退款</el-button>
                  <el-button
                    :title="scope.row.posterity ? '点击查看发展的专引师信息' : '该专引师未发展专引师'"
                    :disabled="scope.row.posterity ? false : true"
                    size="mini"
                    icon="iconfont yonghu5"
                    class="mini-button"
                    type="success"
                    @click="getPosterity(scope.row.posterity,scope.row.id,'user')"
                  >查看分销</el-button>
                </div>
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
    <!-- 惩罚dialog -->
    <el-dialog title="惩罚" :visible.sync="punishDialog" label-width="120px" width="30%">
      <el-form>
        <el-form-item label="处罚类型">
          <el-select v-model="punishType" clearable placeholder="请选择处罚类型">
            <el-option
              v-for="item in punishList"
              :key="item.value"
              :label="item.title"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚内容" v-if="punishType">
          <el-select v-model="punishContent" clearable placeholder="请选择处罚内容">
            <el-option
              v-for="item in punishContentList"
              :key="item.value"
              :label="item.label"
              :value="item.ps"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="punishDialog = false">取 消</el-button>
        <el-button type="primary" @click="punishSure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 惩罚dialog -->
    <el-dialog title="分销信息" :visible.sync="posterityDialog" width="80%">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="专引师姓名：:">
          <el-input v-model="usernames" readonly size="mini"></el-input>
        </el-form-item>
        <el-form-item label="付费专引师数:">
          <el-input v-model="pay" readonly size="mini"></el-input>
        </el-form-item>
        <el-form-item label="未付费专引师数:">
          <el-input v-model="no_pay" readonly size="mini"></el-input>
        </el-form-item>
        
      </el-form>
      <el-table :data="dataList1.list" stripe border style="width:100%" v-loading="loading">
        <el-table-column prop="id" label="UID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="times" label="注册时间" align="center"></el-table-column>
        <el-table-column prop="timeout" label="到期时间" align="center"></el-table-column>
        <el-table-column prop="posterity" label="发展专引师数" align="center">
          <template slot-scope="scope">
            <div
              @click="getPosterity(scope.row.posterity,scope.row.id,'user')"
              class="posterity"
            >{{scope.row.posterity}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="账号类型" align="center">
          <template slot-scope="scope">
            <el-tag
              :hit="true"
              size="mini"
              v-if="scope.row.status=='1'"
              :type="scope.row.type ? 'success' : 'primary'"
            >{{scope.row.type ? '已付费' : '体验'}}</el-tag>
            <el-tag size="mini" v-else type="danger">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop label="账号状态" align="center">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.status | checkStatus"
              size="mini"
              class="mini-button"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button
                :title="scope.row.posterity ? '点击查看发展的专引师信息' : '该专引师未发展专引师'"
                :disabled="scope.row.posterity ? false : true"
                size="mini"
                icon="iconfont yonghu5"
                class="mini-button"
                type="success"
                @click="getPosterity(scope.row.posterity,scope.row.id,'user')"
              >查看分销</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="page1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList1.total"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import citys from "../../utils/province.js";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
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
        { label: "专引师", name: "0" },
        { label: "马甲专引师", name: "1" }
      ],
      cityData: citys, //城市数据
      dataList: [],
      dataList1: [],
      page: 1,
      limit: 10,
      gtype: "0",
      times: "",
      guide_id: "", //专引师id
      shopname: "",
      status: 1,
      username: "", //用户名
      city: [],
      punishDialog: false, //处罚dialog
      punishList: "",
      punishContentList: "",
      punishId: "", //处罚id
      punishType: "",
      punishContent: "",
      uid: JSON.parse(localStorage.getItem("userinfo")).id,
      posterityDialog: false, //专引师分销信息弹窗
      page1: 1,
      limit1: 10,
      uid: "0",
      pay:0,
      no_pay:0,
      usernames:"",//分销专引师姓名
    };
  },
  watch: {
    punishType(newVal, oldVal) {
      console.log(newVal);
      this.punishList.forEach(item => {
        if (newVal == item.val) {
          this.punishContentList = item.type;
        }
      });
    }
  },
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getGuideList({
          page: this.page,
          limit: this.limit,
          times: this.times,
          guide_id: this.guide_id,
          shopname: this.shopname,
          status: this.status,
          gtype: this.gtype,
          username: this.username,
          city: this.city
        })
        .then(res => {
          this.dataList = res.data || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
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
    //分页
    handleSizeChange1(val) {
      this.limit1 = val;
      this.getPosterityInfo();
    },
    //分条
    handleCurrentChange1(val) {
      this.page1 = val;
      this.getPosterityInfo();
    },
    // 查询
    search() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
    },

    back() {
      this.page = 1;
      this.limit = 10;
      this.times = "";
      this.guide_id = "";
      this.shopname = "";
      this.status = 1;
      this.gtype = "0";
      this.username = "";
      this.city = [];
      this.getDataList();
      this.isShow = false;
    },

    //禁用
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .guideStop({
              uid: id
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    //获取处罚类型
    getPunishType() {
      this.$api.getPunishType().then(res => {
        this.punishList = res.data;
      });
    },
    //打开处罚dialoig
    openPunishDialog(item) {
      this.getPunishType();
      this.punishId = item.id;
      this.punishDialog = true;
    },

    //确认处罚
    punishSure() {
      if (!this.punishType || !this.punishContent)
        return this.$message.warning("请处罚类型和处罚内容");
      this.$api
        .addPunish({
          to_uid: this.punishId,
          types: this.punishType,
          values: this.punishContent
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          this.punishDialog = res.code ? true : false;
        });
    },
    tabClick(val) {
      this.utype = val.name;
      this.page = 1;
      this.getDataList();
    },
    refund(val) {
      if (val == null) {
        return this.$message.error(
          "无法给该专引师退款，order_id为空，不存在专引师支付订单"
        );
      }
      if (JSON.parse(localStorage.getItem("userinfo")).id != 1) {
        return this.$message.error("当前登录用户没有权限退款");
      }
      this.$confirm("确定要给该用户退款吗？")
        .then(_ => {
          this.$api.setRefund({ order_id: val, type: "GUIDE" }).then(res => {
            this.message[res.code ? "warning" : "success"](res.data.message);
          });
        })
        .catch(_ => {});
    },
    getPosterity(num, uid, type) {
      if (num != undefined && num == 0) {
        return this.$message.warning("该用户未发展专引师！");
      }
      this.posterityDialog = true;
      this.uid = uid;
      if (type == "user") {
        this.page1 = 1;
        this.limit1 = 10;
      }

      this.getPosterityInfo();
    },
    getPosterityInfo() {
      this.$api
        .getGuideList({
          page: this.page1,
          limit: this.limit1,
          post_uid: this.uid,
          gtype: this.gtype
        })
        .then(res => {
          this.dataList1 = res.data || [];
          this.pay=res.data.pay;
          this.no_pay=res.data.no_pay;
          this.usernames=res.data.username;
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
.idcardImg {
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 10px;
  margin-top: 10px;
}
.el-button + .el-button {
  margin: 10px 0 0 0;
}
.posterity {
  cursor: pointer;
}
</style>