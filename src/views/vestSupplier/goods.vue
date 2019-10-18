<template>
  <div class="goodsList">
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
        <el-input
          clearable
          v-model="goodsname"
          placeholder="请输入商品名称"
          size="small"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          v-model="su_id"
          clearable
          placeholder="请选择商户"
          size="small"
          @keyup.enter.native="search"
        >
          <el-option
            v-for="item in suList"
            :key="item.supplier_id"
            :label="item.title"
            :value="item.supplier_id"
          ></el-option>
        </el-select>上架时间：
        <el-date-picker
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
        <el-radio-group v-model="status" size="mini" style="margin:0 10px" @keyup.enter.native="search">
          <el-radio :label="1" @click.native.prevent="clickitem(1)">上架</el-radio>
          <el-radio :label="2" @click.native.prevent="clickitem(2)">下架</el-radio>
        </el-radio-group>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content" style="width:100%;">
      <el-table
        :data="dataList.list"
        border
        style="width: 100%;"
        v-loading="loading"
        stripe
        :height="height"
      >
        <el-table-column prop="gid" label="ID" align="center"></el-table-column>
        <el-table-column prop label="商品图片" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.pics" />
          </template>
        </el-table-column>
        <el-table-column prop="goodname" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="price" label="价格(元)" align="center"></el-table-column>
        <el-table-column prop="num" label="库存" align="center"></el-table-column>
        <el-table-column prop="status" label="当前状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color:red">上架</span>
            <span v-else color="black" style="color:black">下架</span>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="上架日期" align="center">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop label="商户头像" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.shop_avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="shopname" label="所属商户" align="center"></el-table-column>
        <el-table-column prop="username" label="商户账号" align="center"></el-table-column>
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
import editor from "@/components/editor";
import { promises } from "fs";
export default {
  data() {
    return {
      loading: false,
      height: 100,
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
      page: 1,
      limit: 10,
      su_id: "", //商户id
      goodsname: "", //商品名称
      date: [], //时间
      status: "", //上下架状态查询
      dataList: [],
      suList: [],
      show: false //线上返回
    };
  },
  components: { editor },
  methods: {
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
      this.show = false;
      this.su_id = "";
      this.date = [];
      this.status = "";
      this.goodsname = "";
      this.getDataList();
    },
    getVestSu() {
      this.$api.getVestSu().then(res => {
        this.suList = res.data.list || [];
      });
    },

    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getVestGoods({
          page: this.page,
          limit: this.limit,
          su_id: this.su_id,
          times: this.date,
          status: this.status,
          goodsname: this.goodsname
        })
        .then(res => {
          this.dataList = res.data || [];
          this.height = 100;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 750;
          } else if (t != 0) {
            this.height = t * 130;
          }
          this.loading = false;
        });
    },
    clickitem(e) {
      e === this.status ? (this.status = "") : (this.status = e);
    },
    //搜索
    search() {
      this.page = 1;
      this.show = true;
      this.getDataList();
    }
  },
  created() {
    this.getVestSu();
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
.goods_title {
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  border-top: 1px solid #eee;
  margin-bottom: 20px;
  padding-left: 10px;
  box-sizing: border-box;
}
.goods_title:nth-child(1) {
  border-top: none;
}
.goods_title span {
  font-weight: normal;
  color: #666;
  padding-left: 10px;
  box-sizing: border-box;
}
.imgPreview {
  display: flex;
  flex-wrap: wrap;
}
.imgPreview img {
  width: 100%;
  height: 100%;
}
.img_box {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 20px 10px 0;
  border: 1px dashed #ccc;
}
.model {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 150px;
  color: #fff;
  top: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  text-align: center;
}
.img_box:hover .model {
  display: block;
}
.model i {
  cursor: pointer;
  font-size: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.button {
  margin: 10px 0;
}
.el-button + .el-button {
  margin-left: 0;
}
.avatar {
  width: 50px;
  height: 50px;
}
</style>
