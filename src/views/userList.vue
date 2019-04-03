<template>
  <div class="userList">
    <div class="table_title">
      <div class="search_wrap">
        <el-input clearable v-model="username" placeholder="请输入名称" size="small" style="width:200px"></el-input>
        <el-select clearable v-model="status" placeholder="请选择用户类型" size="small">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="search" type="primary" icon="el-icon-search" size="small">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop label="头像">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatar">
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{scope.row.sex | sexStatus}}
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="手机号"></el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
            <el-button
              :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
              @click="userStop(scope.row.id)"
              :type="scope.row.status=='1'?'success':'info'"
              size="mini"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="注册日期">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
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
      username: "", //名称
      status: "", //用户状态
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10 //条
    };
  },
  components: {},
  methods: {
    // 切换limit
    handleSizeChange(val) {
      this.limit = val;
      this.getDataList();
    },
    //  切换page
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //获取用户列表
    getDataList() {
      this.$api
        .getUserlist({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.date,
          username: this.username
        })
        .then(res => {
          console.log(res);
          this.dataList = res.data;
        });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
    },
    // 停用用户
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
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
  width: 100%;
  overflow: auto;
}
.avatar {
  width: 30px;
  height: 30px;
}
</style>
