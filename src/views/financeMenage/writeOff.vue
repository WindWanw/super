<template>
  <div class="userList">
    <!-- 头部（搜索条件） -->
    <div class="table_title">
      <div>
        <el-button
          v-if="isShow"
          type="primary"
          size="mini"
          class="el-icon-d-arrow-left"
          @click="returnHome()"
        >返回</el-button>
      </div>
      <div class="search_wrap">
        <el-input
          clearable
          v-model="user_id"
          placeholder="请输入用户id"
          size="mini"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="username"
          placeholder="请输入用户名"
          size="mini"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-cascader
          size="mini"
          :options="cityData"
          v-model="city"
          change-on-select
          placeholder="请输入专引师所在城市名称"
          style="width:250px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-cascader>
        <el-select
          clearable
          v-model="status"
          placeholder="请选择用户类型"
          size="mini"
          style="margin-left:10px;"
          @keyup.enter.native="search"
        >
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
          style="margin-left:10px;"
          size="mini"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button
          @click="search"
          type="primary"
          icon="el-icon-search"
          size="mini"
          style="margin-left:10px"
        >搜索</el-button>
      </div>
    </div>
    <!-- 内容（表单，分页） -->
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading" ref="table">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
          <template slot-scope="scope">
            <p>
              <img class="avatar" :src="scope.row.avatar" />
            </p>
            <p>{{scope.row.username}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="城市" align="center"></el-table-column>
        <el-table-column prop="tel" label="手机号" align="center"></el-table-column>
        <el-table-column prop="card_price" label="卡卷金额（元）" align="center"></el-table-column>
        <el-table-column prop="card_num" label="卡卷数" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              title="点击核销"
              @click="openWrite(scope.row.card_info)"
              type="primary"
              size="mini"
              class="mini-button"
              icon="iconfont mendianzitidaihexiaosvg"
            >点击核销</el-button>
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
      <el-dialog title="核销" :visible.sync="openWriteDialog" width="56%" @close="closeW">
        <div>
          <p>超级券：</p>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="card" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="(item,index) in cards"
              :label="item.id"
              :key="index"
            >{{item.title}}({{getCardExplantion(item.types)}})</el-checkbox>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="openWriteDialog = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import citys from "../../utils/province.js";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      checkAll: false,
      isIndeterminate: true,

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
      cityData: citys, //城市数据
      user_id: "", //用户id
      username: "", //用户名
      status: "", //用户状态
      date: "", //日期
      city: [],
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      openWriteDialog: false,
      uid: JSON.parse(localStorage.getItem("userinfo")).id,
      cards: [],
      card: []
    };
  },
  methods: {
    getCardExplantion(types) {
      switch (types) {
        case "super":
          return "超级券";
          break;
        case "common":
          return "通用券";
          break;
        case "shop":
          return "专用券";
          break;
      }
    },
    closeW() {
      this.checkAll = false;
      this.isIndeterminate = true;
      this.card = [];
    },
    handleCheckAllChange(val) {
      if (val) {
        this.cards.forEach(item => {
          this.card.push(item.id);
        });
      } else {
        this.card = [];
      }
      // this.card = val ? this.cards : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cards.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cards.length;
    },
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
      this.loading = true;
      this.$api
        .writeOffList({
          page: this.page,
          limit: this.limit,
          utype: this.utype,
          status: this.status,
          times: this.date,
          city: this.city,
          username: this.username,
          user_id: this.user_id
        })
        .then(res => {
          if (this.isShow) {
            this.dataList = res.data || [];
          } else {
            this.dataList = [];
            this.dataList.total = 0;
          }

          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
    },
    returnHome() {
      this.page = 1;
      this.limit = 10;
      this.status = "";
      this.times = "";
      this.username = "";
      this.user_id = "";
      this.city = [];
      this.getDataList();
      this.isShow = false;
    },
    openWrite(info) {
      this.openWriteDialog = true;
      this.cards = info;
    },
    sure() {
      this.$api.setWriteOffCard({ card: this.card }).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.openWriteDialog = false;
        this.getDataList();
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
  width: 100%;
  overflow: auto;
}
.avatar {
  width: 50px;
  height: 50px;
}
.el-button + .el-button {
  margin: 0;
}
</style>
