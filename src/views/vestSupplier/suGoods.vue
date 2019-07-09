<template>
  <div class="teacher">
    <div class="table_title">
      <div class="search_wrap">
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-tabs type="border-card" v-model="types" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border style="width:100%" v-loading="loading">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                  :data="scope.row.good"
                  stripe
                  border
                  style="width:100%"
                  v-if="scope.row.types=='1'"
                >
                  <el-table-column prop="id" label="ID" align="center"></el-table-column>
                  <el-table-column prop label="商品图片" align="center">
                    <template slot-scope="scope">
                      <img class="avatar" :src="scope.row.pic" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
                  <el-table-column prop="price" label="商品价格（元）" align="center"></el-table-column>
                  <el-table-column prop="num" label="商品库存" align="center"></el-table-column>
                </el-table>
                <div v-if="scope.row.types=='2'">
                  <h4>推荐商品</h4>
                  <div class="tj_box" v-if="scope.row.goods && scope.row.goods.length">
                    <div class="tj" v-for="(item,index) in scope.row.goods" :key="index">
                      <img :src="item.pics" />
                      <span>{{item.text}}</span>
                    </div>
                  </div>
                  <span v-else>该商户还没有添加推荐商品</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop label="商户头像" align="center">
              <template slot-scope="scope">
                <img class="avatar" :src="scope.row.shop_avatar" />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="商户名称" align="center"></el-table-column>
            <el-table-column prop="username" label="商户账号" align="center"></el-table-column>
            <el-table-column prop="citys" label="所在城市" align="center"></el-table-column>
            <el-table-column prop="open_times" label="营业时间" align="center" v-if="types=='2'"></el-table-column>
            <el-table-column prop="price" label="人均价格(元)" align="center" v-if="types=='2'"></el-table-column>
            <el-table-column prop="tel" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="times" label="申请时间" align="center"></el-table-column>
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
      tabList: [
        { label: "线上商户", name: "1" },
        { label: "线下商户", name: "2" }
      ],
      types: "1",
      dataList: [],
      page: 1,
      limit: 10,
      times: "",
      shopname: "",
      status: 1
    };
  },
  components: {},
  methods: {
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .vestSuGoods({
          page: this.page,
          limit: this.limit,
          times: this.times,
          types: this.types
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
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
    },
    tabClick(val) {
      this.status = val.name;
      this.page = 1;
      this.getDataList();
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
.tj_img {
  border: 1px dashed #ddd;
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.tj_box {
  display: flex;
}
.tj {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.tj img {
  width: 100%;
  height: 100%;
}
.tj span {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 5px 0;
  box-sizing: border-box;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 2;
}
</style>