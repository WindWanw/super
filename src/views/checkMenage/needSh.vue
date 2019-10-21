<!--
 * @Author: your name
 * @Date: 2019-10-21 14:28:30
 * @LastEditTime: 2019-10-21 16:17:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\zy\super\src\views\checkMenage\needSh.vue
 -->
<template>
  <div class="punish">
 <div class="table_title">

  </div>
  <div class="content">
      <el-tabs type="border-card">
  <el-tab-pane label="待审核需求">
        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="uid"
      label="uid"
      width="180">
    </el-table-column>
    <el-table-column
      prop="info"
      label="需求内容">
    </el-table-column>
        <el-table-column
        width="180"
      label="审核">
        <template slot-scope="scope">
     <el-button type="success" @click="needshenhe(scope.row.id,1)" icon="el-icon-check" circle></el-button>
    <el-button type="danger" @click="needshenhe(scope.row.id,3)" icon="el-icon-delete" circle></el-button>
          </template>
    </el-table-column>
  </el-table>
  </el-tab-pane>
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
</el-tabs>
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
              page:1,
              limit:10,
              status:0,
              tableData: [],
              total:0,
        }
    },
    methods:{
        needListsh(){
            this.loading = true;
            this.$api
                .needListsh({
                    page: this.page,
                    limit: this.limit,
                    status: this.status,
                })
                .then(res=>{
                    this.tableData = res.data.list || [];
                    this.total = res.data.total;

                    if (res.code) {
                        this.$message[res.code ? "warning" : "success"](res.data);
                    }
                    this.loading = false;
                });
        },
        needshenhe(id,status){
            this.loading = true;
            this.$api
                .needShRuslt({
                    id: id,
                    status: status,
                })
                .then(res=>{
                        this.$message[res.code ? "warning" : "success"](res.data.message);
                        this.needListsh();
                });       
        },
        //分页
        handleSizeChange(val) {
            this.limit = val;
            this.needListsh();
        },
        //分条
        handleCurrentChange(val) {
            this.page = val;
            this.needListsh();
        },
    },
    created(){
        this.needListsh();
    },
}
</script>

<style>
.content {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>