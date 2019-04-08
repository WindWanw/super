<template>
  <div class="card">
    <div class="table_title">
      <!-- <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openAddEditDialog('add')"
      >添加代金券</el-button> -->
      <div class="search_wrap">
        <!-- <el-input clearable v-model="username" placeholder="" size="small" style="width:200px"></el-input> -->
        <el-select clearable v-model="type" placeholder="请选择代金券来源" size="small">
          <el-option label="全平台" value="common"></el-option>
          <el-option label="商铺" value="shop"></el-option>
        </el-select>
        <el-select clearable v-model="used_time" placeholder="代金券是否使用" size="small">
          <el-option label="已使用" value="!1"></el-option>
          <el-option label="未使用" value="1"></el-option>
        </el-select>
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border style="width:100%">
        <el-table-column prop="title" label="规则名称"></el-table-column>
        <el-table-column prop="price" label="金额"></el-table-column>
        <el-table-column prop="guidename" label="买券人"></el-table-column>
        <el-table-column prop="username" label="用户">
          <template slot-scope="scope">
            {{scope.row.username?scope.row.username:'未领取'}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="有效期限">
          <template slot-scope="scope">
            {{scope.row.create_times | formatTimeStamp}} -- {{scope.row.time_out | formatTimeStamp}}
          </template>
        </el-table-column>
        <el-table-column prop="types" label="来源">
          <template slot-scope="scope">
            <el-button :type="scope.row.types=='common'?'primary':'success'" size="mini">{{scope.row.types=='common'?'全平台':'商铺'}}</el-button>
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
      dataList: [],
      page: 1,
      limit: 10,
      times: "",
      type:"",
      used_time:''
    };
  },
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.$api
        .getCardList({
          page: this.page,
          limit: this.limit,
          types:this.type,
          used_time:this.used_time
        })
        .then(res => {
          this.dataList = res.data || [];
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
    // 查询
    search() {
      this.page = 1;
      this.getDataList();
    },
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
