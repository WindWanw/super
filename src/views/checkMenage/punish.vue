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
      <el-button type="primary" icon="el-icon-search" size="small" @click="search" style="margin-left:10px">搜索</el-button>
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
          <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
            <el-table-column prop="to_name" label="被处罚对象"></el-table-column>
            <el-table-column prop="from_name" label="处罚申请人"></el-table-column>
            <el-table-column prop="types" label="处罚类型">
              <template slot-scope="scope">
                {{scope.row.types | punishTypes}}
              </template>
            </el-table-column>
            <el-table-column prop="values.label" label="处罚内容"></el-table-column>
            <el-table-column prop="times" label="处罚时间">
              <!-- <template slot-scope="scope">
                {{scope.row.times | formatTimeStamp}}
              </template> -->
            </el-table-column>
            <el-table-column prop="status" label="处罚状态">
              <template slot-scope="scope">
                <el-tag class="mini-button" type="warning" v-if="scope.row.status=='0'">审核中</el-tag>
                <el-tag class="mini-button" type="success" v-if="scope.row.status=='1'">已处罚</el-tag>
                <el-tag class="mini-button" type="danger" v-if="scope.row.status=='2'">处罚驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-if="status=='1'" prop="checker_name" label="审核人"></el-table-column>
            <el-table-column v-if="status=='1'" prop="check_times" label="审核时间">
              <template slot-scope="scope">
                {{scope.row.check_times | formatTimeStamp}}
              </template>
            </el-table-column>
            <el-table-column prop label="操作" width="200px">
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
        <el-input v-if="pass=='2'" style="margin-top:20px" type="textarea" :rows="2" placeholder="请输入备注信息" v-model="remark"></el-input>
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
      loading:false,
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
      pass:'',//通过/驳回
      remark:'',//备注消息
      types:'',//处罚类型
      to_uid:'',//处罚对象
      values:'',//处罚具体数值
      dialogVisible:false,
      id:'',//审核id
    };
  },
  watch:{
    pass(newVal,oldVal){
      if(newVal=='1'){
        this.remark='';
      }
    }
  },
  methods: {
    //审核
    openCheck(item){
      this.dialogVisible=true;
      this.id=item.id;
      this.types=item.types;
      this.to_uid=item.to_uid;
      this.values=item.values;
      this.remark='';
      this.pass='';
    },
    //获取数据列表
    getDataList() {
      this.loading=true;
      this.$api
        .getPunishList({
          page: this.page,
          limit: this.limit,
          status:this.status,
          times:this.times
        })
        .then(res => {
          this.dataList = res.data || [];
          if(res.code){
            this.$message[res.code ? "warning" : "success"](res.data);
         }
          this.loading=false;
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
                this.page=this.$options.filters.pagination(this.page,this.limit,this.dataList.total);
                this.getDataList();
            })
        })
        .catch(()=>{
            this.$message.info('已取消删除');
        })
    },
    //审核通过驳回
   
    sure(){
      if(!this.pass){
        this.$message.warning('请选择通过或者驳回');
      }else if(this.pass=='2' && !this.remark){
        this.$message.warning('请填写驳回原因');
      }else{
        this.loading=true;
        this.$api.editPunish({
          id:this.id,
          status:this.pass,
          fail:this.remark,
          types:this.types,
          to_uid:this.to_uid,
          values:this.values,
        })
        .then(res=>{
          this.loading=false;
            this.dialogVisible=res.code?true:false;
            this.$message[res.code?'warning':'success'](res.data.message);
            this.page=this.$options.filters.pagination(this.page,this.limit,this.dataList.total);
            this.getDataList();
        })
      }

    },
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
