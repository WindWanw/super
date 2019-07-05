<template>
<div class="content" style="width:100%">
  <el-table style="width: 99.9%" :data="dataList.list">
    <el-table-column prop="city" label="城市" align="center"></el-table-column>
    <el-table-column prop="num" label="商户数量" align="center"></el-table-column>
    <el-table-column prop="on_num" label="线上商户" align="center"></el-table-column>
    <el-table-column prop="off_num" label="线下商户" align="center"></el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      page: 1,
      limit: 10,
    };
  },
  methods: {
      //分页
    handleSizeChange(val){
      this.limit=val;
      this.getDataList();
    },
    //分条
    handleCurrentChange(val){
      this.page=val;
      this.getDataList();
    },
    // tab切换
    tabClick(val){
      this.status=val.name;
      this.page=1;
      this.getDataList();
    },
    //查询
    search() {
      this.page = 1;
      this.getDataList();
    },
    getDataList() {
      this.$api.citySupplier({
          page:this.page,
          limit:this.limit
      }).then(res => {
        this.dataList = res.data || [];
        console.log(res.data);
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
}
</style>