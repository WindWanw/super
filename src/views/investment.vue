<template>
  <div class="order">
    <div class="table_title">
      <el-button
        v-if="show"
        type="primary"
        icon="el-icon-d-arrow-left"
        size="mini"
        @click="getBack"
      >返回</el-button>

      <span v-if="!show"></span>
      <div class="search_wrap">
        <el-input clearable v-model="name" placeholder="请输入招商者姓名" size="mini" style="width:200px"></el-input>
        <el-cascader
          size="mini"
          :options="cityData"
          v-model="citycode"
          change-on-select
          placeholder="请选择城市搜索"
        ></el-cascader>
        <el-date-picker
          style="margin:0 10px"
          value-format="timestamp"
          size="mini"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="起始时间"
          end-placeholder="终止时间"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
        <el-button type="success" size="mini" @click="beforeExport" icon="iconfont daochu">导出</el-button>
      </div>
    </div>
    <div class="content" style="width:100%">
      <el-table :data="dataList.list" stripe border v-loading="loading" class="order-table">
        <el-table-column prop="name" label="招商者姓名" align="center"></el-table-column>

        <el-table-column prop="tel" label="联系电话" align="center"></el-table-column>

        <el-table-column prop="f2" label="意向城市" align="center"></el-table-column>

        <el-table-column prop="f1" label="职业名称" align="center"></el-table-column>

        <el-table-column prop="times" label="提交时间" align="center">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <!-- <el-table-column label="操作">
             
        </el-table-column>-->
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100,200,500]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataList.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import citys from "../utils/province.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      loading: false,
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
      name: "",
      cityData: citys, //城市数据
      selectCity: [], //选择城市
      citycode:'',//城市
      date: [],
      dataList: [],
      suList: [],
      page: 1,
      limit: 10,
      show: false //线上返回
    };
  },
  mounted: function() {},
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
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector(".order-table"));

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "investmentList.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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

    getBack() {
      this.loading = true;
      this.name='';
      this.times='';
      this.citycode='';
      this.getDataList();
    },

    //获取数据
    getDataList() {
      this.loading = true;
      this.$api
        .getInvest({
          page: this.page,
          limit: this.limit,
          times: this.date,
          name:this.name,
          citycode:this.citycode
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },
    // tab切换
    tabClick(val) {
      this.status = val.name;
      this.page = 1;
      this.getDataList();
    },
    //查询
    search() {
      this.show = true;
      this.page = 1;
      this.getDataList();
    },

    clickitem(e) {
      e === this.is_online ? (this.is_online = "") : (this.is_online = e);
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
