<template>
  <div class="teacher">
    <div class="table_title">
      <div>
        <el-button
          v-if="isShow"
          type="primary"
          size="mini"
          class="el-icon-d-arrow-left"
          @click="back()"
        >返回</el-button>
      </div>
      <div class="search_wrap">
        <el-select v-model="team" placeholder="请选择所属团队" size="mini">
          <el-option-group v-for="group in options" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </el-select>
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
        <el-radio-group v-model="day" size="mini" @change="getVestJobs">
          <el-radio-button label="today">今天</el-radio-button>
          <el-radio-button label="yesterday">昨天</el-radio-button>
          <el-radio-button label="threedays">近三天</el-radio-button>
          <el-radio-button label="week">近一周</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          icon="el-icon-search"
          size="mini"
          @click="search"
          style="margin:0 0 0 10px;"
        >搜索</el-button>
        <el-button type="success" size="mini" @click="beforeExport" icon="iconfont daochu">导出</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="dataList.list"
        stripe
        border
        style="width:100%"
        v-loading="loading"
        class="need-table"
      >
        <el-table-column prop="id" label="用户id" align="center"></el-table-column>
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
        <el-table-column prop="need" label="发布需求数" align="center"></el-table-column>
        <el-table-column prop="unum" label="马甲消费者数量" align="center"></el-table-column>
        <el-table-column prop="reply" label="回复需求数" align="center"></el-table-column>
        <el-table-column prop="gnum" label="马甲专引师数量" align="center"></el-table-column>
        <!-- <el-table-column prop="team" label="所属" align="center">
          <template slot-scope="scope">
            <el-select v-model="team" placeholder="请选择所属团队" style="width:99%">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="删除"
              @click="delVest(scope.row.id)"
              type="danger"
              size="mini"
              class="mini-button"
              style="margin : 10px 0 0 0;"
            >删除</el-button>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
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
      team: "",
      options: [],
      dataList: [],
      page: 1,
      limit: 10,
      times: "",
      day: "today",
      shopname: ""
    };
  },
  watch: {},
  components: {},
  methods: {
    //导出之前
    beforeExport() {
      this.$confirm("确定导出当前页数据吗？(选择100条/页试试)")
        .then(_ => {
          this.exportExcel();
        })
        .catch(_ => {});
    },
    //导出
    exportExcel() {
      console.log("下载");
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector(".need-table"));
      console.log(wb);
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "statistics.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getVestInfo({
          page: this.page,
          limit: this.limit,
          date: this.times,
          day: this.day,
          team:this.team
        })
        .then(res => {
          this.dataList = res.data || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    delVest(id) {
      this.$confirm("确定要删除吗？")
        .then(_ => {
          this.$api.delVestUser({ id: id }).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            this.getDataList();
          });
        })
        .catch(_ => {});
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
      this.isShow = true;
    },

    back() {
      this.page = 1;
      this.limit = 10;
      this.times = "";
      this.day = "today";
      this.team="";
      this.getDataList();
      this.isShow = false;
    },

    getVestJobs() {
      this.page = 1;
      this.times = "";
      this.getDataList();
    },
    getTeam() {
      this.$api.getTeam().then(res => {
        this.options = res.data.list;
      });
    }
  },
  created() {
    this.getTeam();
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