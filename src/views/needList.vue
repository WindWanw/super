<template>
  <div class="userList">
    <!-- 头部（搜索条件） -->
    <div class="table_title">
        <div>
        <el-button @click="returnHome" type="primary" icon="iconfont refresh" size="mini" style="margin-left:10px">   刷新</el-button>
      </div>
      <div class="search_wrap">
        <el-date-picker size="mini" v-model="date" type="daterange" align="right" unlink-panels value-format="timestamp" range-separator="至" start-placeholder="开始日期" 
           end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="search" type="primary" icon="el-icon-search" size="mini" style="margin-left:10px">搜索</el-button>
      </div>
    </div>
    <!-- 内容（表单，分页） -->
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading">
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop label="头像" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatar">
          </template>
        </el-table-column>
        <el-table-column prop="info" label="内容" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.info">{{scope.row.info}}</span>
            <span v-if="scope.row.audio" style="color:green">这是一条语音消息</span>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="发布时间" align="center">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button @click="qrcode(scope.row)" type="primary" icon="iconfont qrcode-1-copy" size="mini">点击联系</el-button>
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

    <el-dialog :visible.sync="qrcodeDialog" width="300px" height="300px">
      <div class="view-img">
        <img :src="qrcodeImg" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
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
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10 ,//条
      qrcodeImg:'',
      qrcodeDialog:false,
    };
  },
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

    qrcode(item){
      this.qrcodeDialog=true;
      this.$api.transWx({immuuid:item.immuuid}).then(res=>{
        this.qrcodeImg=res.data.img;
      });
    },
    //获取用户列表
    getDataList() {
      this.loading=true;
      this.$api
        .getNeedList({
          page: this.page,
          limit: this.limit,
          date: this.date,
        })
        .then(res => {
          this.dataList = res.data || [];
         if(res.code){
            this.$message[res.code ? "warning" : "success"](res.data);
         }
          this.loading=false;
        });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
    },
    returnHome() {
      this.date=[];
      this.getDataList()
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
  width: 100%;
  overflow: auto;
}
.avatar {
  width: 30px;
  height: 30px;
}
.view-img{
  width: 100%;
  height: 100%;
}
</style>
