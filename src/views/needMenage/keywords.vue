<template>
  <div class="userList">
    <!-- 头部（搜索条件） -->
    <div class="table_title">
      <!-- <div>
        <el-button @click="returnHome" type="primary" icon="iconfont refresh" size="mini" style="margin-left:10px">   刷新</el-button>
      </div>
      <div class="search_wrap">
        <el-date-picker size="mini" v-model="date" type="daterange" align="right" unlink-panels value-format="timestamp" range-separator="至" start-placeholder="开始日期" 
           end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="search" type="primary" icon="el-icon-search" size="mini" style="margin-left:10px">搜索</el-button>
      </div>-->
    </div>
    <!-- 内容（表单，分页） -->
    <div class="content">
      <el-tabs type="border-card" v-model="status" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border v-loading="loading">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="text" label="内容" align="center"></el-table-column>
            <el-table-column prop="system_tip" label="系统标签" align="center" v-if="status=='2'">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  type="primary"
                  v-for="item in scope.row.system_tip"
                  :key="item"
                  style="margin-left:10px;"
                >{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="keywords" label="需求关键词" align="center" v-if="status=='2'">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  type="success"
                  v-for="item in scope.row.keywords"
                  :key="item"
                  style="margin-left:10px;"
                >{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="status=='1'"
                  @click="openSetKeywords(scope.row)"
                  type="primary"
                  icon="iconfont"
                  size="mini"
                  class="mini-button"
                >点击设置</el-button>
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
      title="设置需求关键字"
      :visible.sync="openKeywordsDialog"
      width="60%"
      v-loading="loading"
      @close="closeKeywordsDialog()"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="需求内容">
          <el-input v-model="text" type="textarea" readonly></el-input>
        </el-form-item>
        <el-form-item label="系统标签">
          <el-select v-model="form.system_tip" placeholder="请选择系统标签" multiple style="width:99%">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item" :label="item" :value="item"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="内容标签" v-if="words">
          <template v-for="item in words">
            <el-tag
              v-if="temp.indexOf(item)!==-1"
              style="margin-right:10px;cursor:pointer;"
              :key="item"
              type="danger"
            >{{item}}</el-tag>
            <el-tag
              v-else
              style="margin-right:10px;cursor:pointer;"
              :key="item"
              type="primary"
              @click="selectTip(item)"
            >{{item}}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="选中关键字">
          <el-input
            v-model="form.keywords"
            type="textarea"
            placeholder="多个关键词用逗号隔开"
            @change="changeKeywords()"
            @blur="changeKeywords()"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="openKeywordsDialog = false">取 消</el-button>
        <el-button type="primary" @click="setKeywords()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      tabList: [{ label: "未设置", name: "1" }, { label: "已设置", name: "2" }],
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
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      status: "1",
      form: {
        id: "",
        system_tip: "",
        keywords: ""
      },
      text: "",
      words: [],
      temp: [],
      temp1: [],
      openKeywordsDialog: false
    };
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
      this.loading = true;
      this.$api
        .needsKeywordsList({
          page: this.page,
          limit: this.limit,
          status: this.status
        })
        .then(res => {
          this.dataList = res.data || [];
          this.loading = false;
        });
    },

    //系统标签
    getSystemTip() {
      this.$api.getSystemTip().then(res => {
        this.options = res.data.list;
      });
    },

    //词法分析
    getLexical(item) {
      this.$api.getLexical({ id: item.id, text: item.text }).then(res => {
        this.words = res.data.list;
      });
    },
    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
    },
    tabClick(val) {
      this.status = val.name;
      this.page = 1;
      this.getDataList();
    },
    returnHome() {
      this.status = "1";
      this.getDataList();
    },
    openSetKeywords(item) {
      this.openKeywordsDialog = true;
      this.form.id = item.id;
      this.text = item.text;
      this.getLexical(item);
      this.getSystemTip();
    },
    closeKeywordsDialog() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.text = "";
      this.words = [];
      this.temp = [];
    },
    setKeywords() {
      if (this.form.system_tip == "") {
        return this.$message.warning("系统标签必须选择");
      }
      if (this.form.keywords == "") {
        return this.$message.warning("关键词必须选择");
      }
      this.$api.addNeedKeywords(this.form).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.openKeywordsDialog = false;
        this.getDataList();
      });
    },
    selectTip(tip) {
      if (this.form.keywords == "") {
        this.form.keywords = tip;
      } else {
        this.form.keywords = this.form.keywords + "," + tip;
      }
      this.temp.push(tip);
    },
    changeKeywords() {
      if (this.form.keywords.indexOf("，") != -1) {
        this.form.keywords = this.form.keywords.replace(/，/g, ",");
      }

      let test = this.form.keywords.split(",");
      let temp1 = [];
      for (let i in test) {
        if (this.temp.indexOf(test[i]) !== -1) {
          temp1.push(test[i]);
        }
      }
      this.temp = temp1;
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
  width: 30px;
  height: 30px;
}
.view-img {
  width: 100%;
  height: 100%;
}
</style>
