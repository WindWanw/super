<template>
  <div class="punish">
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
        <el-date-picker
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
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="search"
          style="margin-left:10px"
        >搜索</el-button>
      </div>
    </div>
    <div class="content">
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
            style="width:100%"
            v-loading="loading"
            :key="Math.random()"
          >
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="user_name" label="投诉人" align="center"></el-table-column>
            <el-table-column prop="object_name" label="投诉对象" align="center"></el-table-column>
            <el-table-column prop="type" label="投诉类型" align="center"></el-table-column>
            <el-table-column prop="reason" label="投诉原因" align="center"></el-table-column>
            <el-table-column prop="info" label="备注" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="getInfo(scope.row.info,'info')">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="reply" label="官方回复" align="center" v-if="status=='1'">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="getInfo(scope.row.reply,'reply')">点击查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="times" label="投诉时间" align="center"></el-table-column>
            <el-table-column v-if="status=='1'" prop="reply_name" label="回复人" align="center"></el-table-column>
            <el-table-column v-if="status=='1'" prop="reply_time" label="回复时间" align="center"></el-table-column>
            <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <div class="cz_btn">
                  <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
                  <el-button
                    v-if="status!=1"
                    @click="openCheck(scope.row)"
                    type="primary"
                    size="mini"
                    icon="el-icon-edit-outline"
                    title="点我对该条信息进行审核认证"
                    class="mini-button"
                  >点击审核</el-button>
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

    <!-- 查看内容 -->
    <el-dialog
      :title="type=='info' ? '查看备注' : '查看回复'"
      :visible.sync="infoDialog"
      width="800px"
      top="20px"
    >
      <div v-html="info"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoDialog = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      @close="pass='';remark=''"
      width="30%"
      v-loading="loading"
    >
      <el-radio-group v-model="pass">
        <el-radio :label="1">通过</el-radio>
        <el-radio :label="2">驳回</el-radio>
      </el-radio-group>
      <el-input
        v-if="pass=='2'"
        style="margin-top:20px"
        type="textarea"
        :rows="2"
        placeholder="请输入备注信息"
        v-model="remark"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      dataList: [],
      page: 1,
      limit: 10,
      times: "",
      tabList: [{ label: "未回复", name: "0" }, { label: "已回复", name: "1" }],
      status: "0",
      pass: "", //通过/驳回
      remark: "", //备注消息
      types: "", //处罚类型
      to_uid: "", //处罚对象
      values: "", //处罚具体数值
      dialogVisible: false,
      id: "", //审核id
      infoDialog: false, //内容dialog
      info: "", //内容
      type: ""
    };
  },
  watch: {
    pass(newVal, oldVal) {
      if (newVal == "1") {
        this.remark = "";
      }
    }
  },
  methods: {
    getInfo(item, type) {
      this.info = item;
      this.type = type;
      this.infoDialog = true;
    },
    //审核
    openCheck(item) {
      this.dialogVisible = true;
      this.id = item.id;
      this.types = item.types;
      this.to_uid = item.to_uid;
      this.values = item.values;
      this.remark = "";
      this.pass = "";
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getReportsList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.times
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
      this.page = val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val) {
      this.limit = val;
      this.getDataList();
    },
    // tab切换
    tabClick(val) {
      this.status = val.name;
      this.page = 1;
      this.getDataList();
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
      this.status = "0";
      this.times = "";
      this.getDataList();
      this.isShow = false;
    },
    //删除(成功提示并关闭，错误提示)
    del(id) {
      this.$confirm("是否确认删除该项", "提示", { type: "warning" })
        .then(() => {
          this.$api.delPunish({ id }).then(res => {
            this.addEditDialog = res.code ? true : false;
            this.$message[res.code ? "danger" : "success"](res.data.message);
            this.page = this.$options.filters.pagination(
              this.page,
              this.limit,
              this.dataList.total
            );
            this.getDataList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //审核通过驳回

    sure() {
      if (!this.pass) {
        this.$message.warning("请选择通过或者驳回");
      } else if (this.pass == "2" && !this.remark) {
        this.$message.warning("请填写驳回原因");
      } else {
        this.loading = true;
        this.$api
          .editPunish({
            id: this.id,
            status: this.pass,
            fail: this.remark,
            types: this.types,
            to_uid: this.to_uid,
            values: this.values
          })
          .then(res => {
            this.loading = false;
            this.$message[res.code ? "warning" : "success"](res.data.message);
            this.page = this.$options.filters.pagination(
              this.page,
              this.limit,
              this.dataList.total
            );
            this.dialogVisible = false;
            this.getDataList();
          });
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
</style>
