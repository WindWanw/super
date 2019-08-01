<template>
  <div class="systemArticle">
    <div class="table_title">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openAddEditDialog('add')"
      >添加资讯</el-button>
      <div class="searchText">
        <el-select clearable v-model="type" placeholder="请选择资讯类型搜索" size="small">
          <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading" :height="height">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop label="资讯封面" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="资讯类型" align="center"></el-table-column>

        <el-table-column prop="title" label="资讯标题" align="center"></el-table-column>
        <el-table-column prop="body" label="资讯内容" align="center">
          <template slot-scope="scope">
            <el-button
             class="mini-button"
              size="mini"
              type="success"
              @click="form.body=scope.row.body;previewDialog=true"
            >预览</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="发布时间" align="center">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center"></el-table-column>
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
      <el-form status-icon label-width="100px">
        <el-form-item label="资讯类型">
          <el-select v-model="form.code" placeholder="请选择资讯类型">
            <el-option
              v-for="item in options"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯封面图" style="width:100%">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/goods_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp1"
            :show-file-list="false"
            :on-success="upSuc1"
            multiple
          >
            <el-button
              icon="el-icon-upload"
              size="small"
              type="primary"
              :disabled="upLoading"
            >{{upLoading?'正在上传中...':'点击上传'}}</el-button>
            <div class="el-upload__tip" slot="tip">单张图片大小不超过2MB</div>
          </el-upload>
          <div class="imgPreview" v-if="form.pics && form.pics.length">
            <div class="img_box" v-for="(item,index) in form.pics" :key="index">
              <img :src="item" />
              <div class="model">
                <i class="el-icon-delete" @click="form.pics.splice(index,1)" title="删除"></i>
              </div>
            </div>
          </div>
          <div v-else>
            <i class="el-icon-picture" style="font-size:100px;color:#ccc"></i>
          </div>
        </el-form-item>
        <el-form-item label="资讯排序">
          <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <div class="block">
            <el-date-picker v-model="form.times" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="资讯标题">
          <el-input v-model="form.title" placeholder="请输入资讯标题"></el-input>
        </el-form-item>
        <el-form-item label="资讯内容">
          <editor-bar v-model="form.body" :isClear="isClear" @change="change"></editor-bar>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 预览dialog -->
    <el-dialog title="预览资讯" :visible.sync="previewDialog" width="800px" top="20px">
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
      test: "",
      isClear: false,
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      AddEditDialog: false,
      options: [],
      type: "",
      height:false,
      form: {
        code: "",
        pics: [], //资讯封面图
        title: "",
        body: "",
        id: "",
        sort: "",
        times:'',
      },
      previewDialog: false, //预览资讯内容
      upLoading: false
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
        .getCmsList({
          page: this.page,
          limit: this.limit,
          type: this.type
        })
        .then(res => {
          this.dataList = res.data || [];
          if(res.data.total>=8){
            this.height=600
          }
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    //删除资讯
    del(id) {
      let that = this;
      that
        .$confirm("确认删除该项吗?", "提示")
        .then(() => {
          that.$api.delCms({ id: id }).then(res => {
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
        this.form.pics = item.pics;
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
      this.$api[id ? "editCms" : "addCms"](this.form).then(res => {
        if (id) {
          this.page = 1;
        }
        this.$message[res.code ? "error" : "success"](res.data.message);
        this.AddEditDialog = res.code ? true : false;
        this.getDataList();
      });
    },
    //获取系统资讯类型
    getDataTypeList() {
      let that = this;
      this.$api.geCmsType().then(res => {
        that.options = res.data.list || [];
      });
    },
    // 查询
    search() {
      this.page = 1;
      this.getDataList();
    },
    //上次图片前
    beforeUp1(file) {
      this.upLoading = true;
      if (file.size > 1024 * 2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning("单张图片不能超过2MB");
        return false;
      }
    },
    //上传成功后
    upSuc1(res, file, fileList, i) {
      this.upLoading = false;
      console.log(res);
      if (res.code) {
        this.$message.error("上传失败");
        return;
      } else {
        if (typeof this.form.pics == "string") {
          this.form.pics = [];
        }

        this.form.pics.push(res.data.host + res.data.name);
      }
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
.el-button + .el-button {
  margin-left: 0;
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
.img_box:hover .model {
  display: block;
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
.avatar {
  width: 100px;
  height: 80px;
}
</style>
