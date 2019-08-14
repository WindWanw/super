<template>
  <div class="systemArticle">
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
      <div class="searchText">
        <el-select
          clearable
          v-model="type"
          placeholder="请选择文章类型搜索默认全部"
          size="mini"
          @keyup.enter.native="search"
        >
          <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search" style="margin: 0 0 0 5px;">搜索</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="openAddEditDialog('add')"
          style="margin: 0 0 0 5px;"
        >添加文章</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading" :height="height">
        <el-table-column prop="type" label="文章类型"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="title" label="文章标题"></el-table-column>
        <el-table-column prop="body" label="文章内容">
          <template slot-scope="scope">
            <el-button
              class="mini-button"
              size="mini"
              type="success"
              @click="form.body=scope.row.body;previewDialog=true"
            >预览</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="发布时间">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button
                class="mini-button"
                @click="openAddEditDialog('edit',scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button
                class="mini-button"
                @click="del(scope.row.id)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              >删除</el-button>
            </div>
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

    <!-- 添加dialog -->
    <el-dialog :title="form.id?'修改':'添加'" :visible.sync="AddEditDialog" width="850px" top="20px">
      <el-form status-icon label-width="70px">
        <el-form-item label="文章类型">
          <el-select v-model="form.code" placeholder="请选择文章类型">
            <el-option
              v-for="item in options"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章排序">
          <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <editor-bar v-model="form.body" :isClear="isClear" @change="change"></editor-bar>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 预览dialog -->
    <el-dialog title="预览文章" :visible.sync="previewDialog" width="800px" top="20px">
      <div v-html="form.body"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EditorBar from "../../components/editor";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      test: "",
      isClear: false,
      height: 100,
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      AddEditDialog: false,
      options: [],
      type: "",
      form: {
        code: "",
        title: "",
        body: "",
        id: "",
        sort: ""
      },
      previewDialog: false //预览文章内容
    };
  },
  components: { EditorBar },
  methods: {
    change(val) {
      //  this.test = val
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getArticleList({
          page: this.page,
          limit: this.limit,
          type: this.type
        })
        .then(res => {
          this.dataList = res.data || [];
          this.height = 100;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 600;
          } else if (t != 0) {
            this.height = t * 70;
          }
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    //删除文章
    del(id) {
      let that = this;
      that
        .$confirm("确认删除该项吗?", "提示")
        .then(() => {
          that.$api.delArticle({ id }).then(res => {
            this.$message[res.code ? "error" : "success"](res.data.message);
            this.page = this.$options.filters.pagination(
              this.page,
              this.limit,
              this.dataList.total
            );
            that.getDataList();
          });
        })
        .catch(() => {
          that.$message.info("已取消删除");
        });
    },
    //打开dialog
    openAddEditDialog(type, item) {
      if (type == "add") {
        for (let i in this.form) {
          this.form[i] = "";
        }
      } else {
        this.form.title = item.title;
        this.form.code = item.code;
        this.form.body = item.body;
        this.form.sort = item.sort;
        this.form.id = item.id;
      }
      this.AddEditDialog = true;
    },
    //确认添加或修改
    addEdit() {
      let id = this.form.id;
      this.$api[id ? "editArticle" : "addArticle"](this.form).then(res => {
        if (id) {
          this.page = 1;
        }
        this.$message[res.code ? "error" : "success"](res.data.message);
        this.AddEditDialog = res.code ? true : false;
        this.getDataList();
      });
    },
    //获取系统文章类型
    getDataTypeList() {
      let that = this;
      this.$api.getDataTypeList().then(res => {
        that.options = res.data.list || [];
      });
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
      this.type = "";
      this.getDataList();
      this.isShow = false;
    }
  },

  created() {
    this.getDataList();
    this.getDataTypeList();
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
.searchText {
  text-align: left;
  /* margin-left: 50px; */
}
.table_title {
  /* justify-content: flex-start; */
}
</style>
