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
          <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="expand_wrap">
                  <p v-if="props.row.data.name">
                    <span>{{props.row.type=='truename' ? '姓名' : '公司名称'}}:</span>
                    {{props.row.data.name.value}}
                  </p>
                  <p v-if="props.row.data.ids">
                    <span>身份证号码:</span>
                    {{props.row.data.ids.value}}
                  </p>
                  <p v-if="props.row.data.companyId">
                    <span>企业信用代码:</span>
                    {{props.row.data.companyId.value}}
                  </p>
                  <p v-if="props.row.data.idcard1 || props.row.data.idcard2">
                    <span>身份证正反面:</span>
                    <img
                      class="idcard_img viewBig"
                      :src="props.row.data.idcard1.value"
                      @click="viewBigImg(props.row.data.idcard1.value)"
                    />
                    <img
                      class="idcard_img viewBig"
                      :src="props.row.data.idcard2.value"
                      @click="viewBigImg(props.row.data.idcard2.value)"
                    />
                  </p>
                  <p v-if="props.row.data.license">
                    <span>营业执照:</span>
                    <img
                      class="license_img viewBig"
                      :src="props.row.data.license.value"
                      @click="viewBigImg(props.row.data.license.value)"
                    />
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="username" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="typeinfo" label="认证类型" align="center"></el-table-column>
            <el-table-column prop="times" label="认证申请时间" align="center"></el-table-column>
            <el-table-column v-if="status!='0'" prop="checker" label="审核人" align="center"></el-table-column>
            <el-table-column v-if="status!='0'" prop="check_time" label="审核时间" align="center"></el-table-column>
            <el-table-column v-if="status!='0'" prop="reason" label="审核结果" align="center"></el-table-column>
            <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <div class="cz_btn">
                  <!-- <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button> -->
                  <el-button
                    v-if="status=='0'"
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

    <el-dialog class="big-img" top="50px" title="查看大图" :visible.sync="viewImg" width="800px">
      <img style="width:100%;height:100%" :src="viewBigImage" />
    </el-dialog>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      @close="pass='';remark=''"
      width="30%"
      v-loading="loading"
    >
      <el-radio-group v-model="form.status">
        <el-radio :label="1">通过</el-radio>
        <el-radio :label="3">驳回</el-radio>
      </el-radio-group>
      <el-input
        v-if="form.status=='3'"
        style="margin-top:20px"
        type="textarea"
        :rows="2"
        placeholder="请输入备注信息"
        v-model="form.reason"
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
      tabList: [
        { label: "待审核", name: "0" },
        { label: "审核通过", name: "1" },
        { label: "自动审核失败", name: "2" },
        { label: "人工审核失败", name: "3" }
      ],
      status: "0",
      form: {
        id: "",
        status: "",
        reason: ""
      },
      types: "", //处罚类型
      to_uid: "", //处罚对象
      values: "", //处罚具体数值
      dialogVisible: false,
      viewImg: false, //查看大图dialog
      viewBigImage: "" //查看大图
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
    viewBigImg(img) {
      this.viewImg = true;
      this.viewBigImage = img;
    },
    //审核
    openCheck(item) {
      this.dialogVisible = true;
      this.form.id = item.id;
      this.form.status = "";
      this.form.reason = "";
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getIdentifyList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.times
        })
        .then(res => {
          this.dataList = res.data || [];
          this.$store.commit("UPDATE_IDENTIFY_CHECK_NUM", res.data.total);
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
      if (!this.form.status) {
        this.$message.warning("请选择通过或者驳回");
      } else if (this.form.status == "3" && !this.form.reason) {
        this.$message.warning("请填写驳回原因");
      } else {
        this.loading = true;
        this.$api.checkIdentify(this.form).then(res => {
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
.viewBig {
  cursor: pointer;
}
</style>
