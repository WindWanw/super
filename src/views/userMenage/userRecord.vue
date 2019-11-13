<template>
  <div class="userRecord">
    <div class="table_title">
      <div>
        <el-button type="primary" size="mini">返回</el-button>
      </div>
      <div class="cearch_wrap">
        <el-input
          v-model="uid"
          size="mini"
          style="width:200px;margin-left:10px;"
          placeholder="uid"
        ></el-input>
        <el-input
          v-model="citycode"
          size="mini"
          style="width:200px;margin-left:10px;"
          placeholder="城市编号"
        ></el-input>
        <el-input
          v-model="code"
          size="mini"
          style="width:200px;margin-left:10px;"
          placeholder="请求code"
        ></el-input>
        <el-input
          v-model="ip"
          size="mini"
          style="width:200px;margin-left:10px;"
          placeholder="请求ip"
        ></el-input>
        <el-button
          @click="userRecord"
          type="primary"
          icon="el-icon-search"
          size="mini"
          style="margin-left:10px"
        >搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="uid" label="uid" width="180"></el-table-column>
        <el-table-column prop="http_code" label="http_code" width="180"></el-table-column>
        <el-table-column prop="remote_ip" label="ip"></el-table-column>

        <el-table-column prop="times" label="请求时间">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.times | formatTimeStamp(1)}}
                    </div>
                    </template>
        </el-table-column>
        <el-table-column prop="city" label="城市编号"></el-table-column>
        <el-table-column prop="uri" label="uri"></el-table-column>
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
      tableData: [],
      uid: "",
      citycode: "",
      code: "",
      ip:"",
      page: 1,
      limit: 10,
      total:0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.userRecord();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.userRecord();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    userRecord() {
      this.$api
        .userRecord({
          page: this.page,
          limit: this.limit,
          uid: this.uid,
          city: this.citycode,
          http_code: this.code,
          remote_ip:this.ip
        })
        .then(res => {
          this.tableData = res.data.data || [];
          this.total = res.data.count || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
        });
    }
  },
  created() {
    this.userRecord ();
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>