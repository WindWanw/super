<template>
  <div class="agentSh">
    <div class="table_title">
    <div class="search_wrap">
      <el-input clearable v-model="username" placeholder="请输入名称" size="small" style="width:200px"></el-input>
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
      <el-table ref="table" :data="dataList.list" stripe border>
        <el-table-column width="1" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="姓名">
                <p>{{ props.row.name }}</p>
              </el-form-item>
              <el-form-item label="身份证">
                <p>{{ props.row.idCard }}</p>
              </el-form-item>
              <el-form-item label="民族">
                <span>{{ props.row.native_place }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex==0?'男':props.row.sex==1?'女':'未知' }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <span>{{ props.row.pictrue }}</span>
              </el-form-item>
              <el-form-item label="审核">
                <el-button type="primary" size="mini">通过</el-button>
                <el-button type="danger" size="mini">驳回</el-button>
              </el-form-item>
            </el-form>
            
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop label="头像">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatar">
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="手机号"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop label="账号状态">
          <template slot-scope="scope">
            <el-button type="warning" size="mini">待审核</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="注册日期">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toogleExpand(scope.row)"
              type="primary"
              size="mini"
            >查看详情</el-button>
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
      pickerOptions: {//快捷键
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
      dataList: [],
      page: 1,
      limit: 10,
      status: 2,
      times: "",
      username: ""
    };
  },
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.$api
        .getAgentList({
          page: this.page,
          limit: this.limit,
          status:this.status,
          times:this.times,
          username:this.username
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
    search(){
      this.page=1;
      this.getDataList();
    },
    // 展开
    toogleExpand(row){
      let $table = this.$refs.table;
      this.dataList.list.map((item) => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row);
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style scoped>
.content{
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .avatar{
    width: 30px;
    height: 30px;
  }
  
  .img{
    width: 80px;
    height: 80px;
    padding: 10px;
    border: 1px dashed #ddd;
    box-sizing: border-box;
  }
  
</style>
