<template>
  <div class="teacher">
    <div class="table_title">
      <div class="search_wrap">
        <el-date-picker
          style="margin:0 10px"
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
      <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
        <el-table-column prop label="头像" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.username}}{{scope.row.nickname ?"("+scope.row.nickname+")": ''}}</template>
        </el-table-column>
        <el-table-column prop="gnum" label="马甲专引师数量" align="center"></el-table-column>
        <el-table-column prop="reply" label="回复需求数" align="center"></el-table-column>
        <el-table-column prop="unum" label="马甲消费者数量" align="center"></el-table-column>
        <el-table-column prop="need" label="发布需求数" align="center"></el-table-column>
        
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
      dataList: [],
      page: 1,
      limit: 10,
      times: "",
      shopname: "",
    };
  },
  watch: {},
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getVestInfo({
          page: this.page,
          limit: this.limit,
          times: this.times,
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
    // 查询
    search() {
      this.page = 1;
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
.idcardImg {
  width: 300px;
  height: 150px;
  border: 1px dashed #ccc;
  margin-right: 10px;
  margin-top: 10px;
}
.avatar {
  width: 50px;
  height: 50px;
}
</style>