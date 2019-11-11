<template>
  <div class="ad">
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
        <el-select
          size="mini"
          v-model="type"
          class="selectOrder"
          clearable
          placeholder="请选择广告所属页面"
          @keyup.enter.native="search"
        >
          <el-option
            v-for="item in adsType.list"
            :key="item.page"
            :label="item.title"
            :value="item.page"
          ></el-option>
        </el-select>
        <el-cascader
          size="mini"
          :options="cityData"
          v-model="citycode"
          change-on-select
          placeholder="请选择城市搜索"
          @keyup.enter.native="search"
        ></el-cascader>
        <!-- <el-input clearable v-model="keywords" placeholder="请输入关键字" size="small" style="width:200px"></el-input> -->
        <el-button
          style="margin:0 10px"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search"
        >搜索</el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="openAddEditDialog('add')"
        >添加广告</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading">
        <el-table-column prop="city" label="城市" align="center"></el-table-column>
        <el-table-column prop="ads" label="广告图" align="center">
          <template slot-scope="scope">
            <img class="ads-image" v-if="scope.row.pic" :src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="广告标题" align="center"></el-table-column>
        <el-table-column prop="url" label="链接地址" align="center"></el-table-column>
        <el-table-column prop="position" label="所属页面" align="center"></el-table-column>

        <!-- <el-table-column prop="checker" label="审核人" align="center"></el-table-column> -->
        <el-table-column prop="begin" label="上架时间" align="center">
          <template slot-scope="scope">{{scope.row.begin | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop="timeout" label="下架时间" align="center">
          <template slot-scope="scope">{{scope.row.timeout | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop="adder" label="添加人" align="center"></el-table-column>
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
    <el-dialog
      top="20px"
      :title="form.id?'修改':'添加'"
      :visible.sync="AddEditDialog"
      width="650px"
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="广告位置" prop="page">
          <el-select v-model="form.page" clearable placeholder="请选择广告页" size="small">
            <el-option
              v-for="item in adsType.list"
              :key="item.page"
              :label="item.title"
              :value="item.page"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.page" placeholder="请输入广告页"></el-input> -->
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            :options="cityData"
            v-model="selectCity"
            change-on-select
            :placeholder="form.id?'如需修改请选择':'请选择城市'"
          ></el-cascader>
          <span v-if="form.id" style="margin-left:20px">当前城市:{{city}}</span>
        </el-form-item>
        <el-form-item label="广告链接">
          <el-input v-model="form.url" placeholder="请输入广告链接"></el-input>
        </el-form-item>
        <el-form-item label="广告标题" :prop="form.title?'':'title'">
          <el-input v-model="form.title" placeholder="请输入广告标题"></el-input>
        </el-form-item>
        <el-form-item label="广告图片" :prop="form.pic?'':'pic'">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/adv_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp1"
            :show-file-list="false"
            :on-success="upSuc1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.pic" class="ad_img" :src="form.pic" />
        </el-form-item>
        <el-form-item label="上下架时间" prop="times">
          <el-date-picker
            value-format="timestamp"
            size="small"
            v-model="form.times"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import citys from "../utils/city.js";
import citys from "../../utils/province.js";
import upload from "../../components/upload";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      AddEditDialog: false,
      cityData: citys, //城市数据
      selectCity: [], //选择城市
      adsType: [], //广告类型
      type: "",
      citycode: [],
      keywords: "",
      date: [],
      city: "",
      form: {
        page: "",
        title: "",
        url: "",
        pic: "",
        id: "",
        times: ""
      },
      rules: {
        page: [{ required: true, message: "广告页不能为空", trigger: "blur" }],

        title: [
          { required: true, message: "广告标题不能为空", trigger: "blur" }
        ],
        pic: [{ required: true, message: "广告图片不能为空", trigger: "blur" }],
        times: [
          { required: true, message: "上下架时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    upload
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
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getAdList({
          page: this.page,
          limit: this.limit,
          type: this.type,
          keywords: this.keywords,
          citycode: this.citycode
        })
        .then(res => {
          this.dataList = res.data || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },

    //获得广告类型
    getAdsType() {
      this.$api.adsType().then(res => {
        this.adsType = res.data || [];
      });
    },
    //打开添加修改dialog
    openAddEditDialog(type, item) {
      if (type == "add") {
        for (let i in this.form) {
          this.form[i] = "";
        }
        this.selectCity = [];
      } else {
        this.form.page = item.page;
        this.city = item.city;
        this.selectCity = [];
        this.form.title = item.title;
        this.form.url = item.url;
        this.form.pic = item.pic;
        this.form.id = item.id;
        let date = item.begin ? [item.begin * 1000, item.timeout * 1000] : "";
        this.form.times = date;
      }
      this.AddEditDialog = true;
    },
    //上次图片前
    beforeUp1(file) {
      if (file.size > 1024 * 2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning("图片不能超过2MB");
        return false;
      }
    },
    //上传成功后
    upSuc1(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.pic = res.data.host + res.data.name;
      }
    },
    //确认添加或修改
    addEdit() {
      let that = this;
      if (!this.form.id) {
        if (!that.selectCity || !that.selectCity.length)
          return this.$message.warning("请选择城市");
      }
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$api[that.form.id ? "editAd" : "addAd"]({
            page: that.form.page,
            citycode: that.selectCity,
            times: that.form.times,
            title: that.form.title,
            pic: that.form.pic,
            url: that.form.url,
            id: that.form.id
          }).then(res => {
            that.$message[res.code ? "error" : "success"](res.data.message);
            that.AddEditDialog = res.code ? true : false;
            if (!that.form.id) {
              this.page = 1;
            }
            that.getDataList();
          });
        } else {
          return false;
        }
      });
    },
    //删除
    del(id) {
      this.$confirm("确认删除该项吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api.delAd({ id }).then(res => {
            this.$message[res.code ? "error" : "success"](res.data.message);
            this.page = this.$options.filters.pagination(
              this.page,
              this.limit,
              this.dataList.total
            );
            this.getDataList();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //查询
    search() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
    },
    back() {
      this.keywords = "";
      this.type = "";
      this.citycode = [];
      this.getDataList();
      this.isShow = false;
    }
  },

  created() {
    this.getDataList();
    this.getAdsType();
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
.ads-image {
  width: 120px;
  height: 70px;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
