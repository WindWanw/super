<template>
  <div class="userList">
    <!-- 头部（搜索条件） -->
    <div class="table_title">

      <div class="search_wrap">
        <el-input clearable v-model="title" placeholder="请输入关键词" size="small" style="width:200px"></el-input>
        <el-button @click="search" type="primary" icon="el-icon-search" size="small" style="margin-left:10px">搜索</el-button>
      </div>
    </div>
    <!-- 内容（表单，分页） -->
    <div class="content">
      <el-table :data="dataList" stripe border v-loading="loading">
        <el-table-column prop="title" label="商品标题"></el-table-column>
        <el-table-column prop="num" label="库存"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="attr" label="属性"></el-table-column>

      </el-table>
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
      is_search:false,
      title: "", //商品标题
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      total:0,
      supplier_id: ''
    };
  },
  mounted(){
    this.supplier_id = this.$route.query.id;
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
    //获取用户列表
    getDataList() {
      this.loading=true;
      this.$api
        .goodList({
          supplier_id:this.$route.query.id,
          page: this.page,
          limit: this.limit,
          keywords: this.title
        })
        .then(res => {
          this.dataList = res.data.list || [];
          this.total = res.data.total;
          this.loading=false;
        });
    },
    //查询用户
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
  width: 100%;
  overflow: auto;
}
.avatar {
  width: 30px;
  height: 30px;
}
</style>
