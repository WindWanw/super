<template>
  <div class="punish">
    <div class="table_title">
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
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
    </div>
    </div>
    <div class="content">
       <el-tabs type="border-card" v-model="status" @tab-click=tabClick>
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border style="width:100%">
            <el-table-column prop="to_uid" label="被处罚人"></el-table-column>
            <el-table-column prop="from_uid" label="处罚人"></el-table-column>
            <el-table-column prop="types" label="处罚类型"></el-table-column>
            <el-table-column prop="values" label="处罚内容"></el-table-column>
            <el-table-column prop="times" label="处罚时间">
              <template slot-scope="scope">
                {{scope.row.times | formatTimeStamp}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="处罚状态">
              <template slot-scope="scope">
                <el-button :type="scope.row.status=='1'?'success':'warning'" size="mini">{{scope.row.status=='1'?'已审核':'未审核'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="status=='1'" prop="checker" label="审核人"></el-table-column>
            <el-table-column v-if="status=='1'" prop="check_times" label="审核时间">
              <template slot-scope="scope">
                {{scope.row.check_times | formatTimeStamp}}
              </template>
            </el-table-column>
            <el-table-column prop label="操作">
              <template slot-scope="scope">
                <div class="cz_btn">
                  <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
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
      times: "",
      tabList: [
        { label: "待审核", name: "0" },
        { label: "已审核", name: "1" },
      ],
      status:'0',
    };
  },
  methods: {
    //获取数据列表
    getDataList() {
      this.$api
        .getPunishList({
          page: this.page,
          limit: this.limit,
          status:this.status,
          times:this.times
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
    // tab切换
    tabClick(val){
      console.log(val)
      this.status=val.name;
      this.page=1;
      this.getDataList();
    },
    // 查询
    search(){
      this.page=1;
      this.getDataList();
    },
    //删除(成功提示并关闭，错误提示)
    del(id){
        this.$confirm('是否确认删除该项','提示',{type:'warning'})
        .then(()=>{
            this.$api.delPunish({id})
            .then(res=>{
                this.addEditDialog=res.code?true:false;
                this.$message[res.code?'danger':'success'](res.data.message);
                this.getDataList();
            })
        })
        .catch(()=>{
            this.$message.info('已取消删除');
        })
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
</style>
