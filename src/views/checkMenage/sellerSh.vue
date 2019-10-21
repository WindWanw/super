<template>
  <div class="sellerSh">
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
        <el-input
          clearable
          v-model="name"
          placeholder="请输入商户姓名"
          size="mini"
          style="width:200px;margin-right:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="username"
          placeholder="请输入账号"
          size="mini"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-date-picker
          style="margin:0 10px"
          value-format="timestamp"
          size="mini"
          v-model="times"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="dataList.list" stripe border v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
              <p>
                <span>用户姓名:</span>
                {{props.row.name}}
              </p>
              <p>
                <span>身份证号码:</span>
                {{props.row.idcard}}
              </p>
              <p>
                <span>身份证正反面:</span>
                <img
                  class="idcard_img viewBig"
                  :src="props.row.picOn"
                  @click="viewBigImg(props.row.picOn)"
                />
                <img
                  class="idcard_img viewBig"
                  :src="props.row.picOff"
                  @click="viewBigImg(props.row.picOff)"
                />
              </p>
              <p>
                <span>店铺名称:</span>
                {{props.row.shopname}}
              </p>
              <p>
                <span>店铺地址:</span>
                {{props.row.address}}
              </p>
              <p>
                <span>营业执照:</span>
                <img
                  class="license_img viewBig"
                  :src="props.row.license"
                  @click="viewBigImg(props.row.license)"
                />
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="城市" align="center"></el-table-column>
        <el-table-column prop="username" label="商户账号" align="center"></el-table-column>
        <el-table-column prop="tel" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="tags" label="店铺标签" align="center">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.tags ? 'primary' : 'danger'"
            >{{scope.row.tags ? scope.row.tags : '无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="commission" label="签约模式" align="center">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.commission=='1' ? 'success' : 'warning'"
            >{{scope.row.commission==1 ? '平台托管' :'自定义'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="discount" label="折扣率(%)" align="center"></el-table-column>
        <el-table-column prop="times" label="入驻时间" align="center"></el-table-column>
        <el-table-column prop label="账号状态" align="center">
          <el-button class="mini-button" type="warning" size="mini">待审核</el-button>
        </el-table-column>

        <el-table-column prop label="操作" align="center">
          <template slot-scope="scope">
            <div class="cz_btn">
              <el-button
                class="mini-button"
                @click="openCheckDialog(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                title="点我对该条信息进行审核认证"
              >点击审核</el-button>
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

    <el-dialog top="50px" title="查看大图" :visible.sync="viewImg">
      <img style="width:100%;height:100%;" :src="viewBigImage" />
    </el-dialog>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      @close="check.result='';check.remark=''"
      width="30%"
    >
      <el-radio-group v-model="check.result">
        <el-radio :label="1">通过</el-radio>
        <el-radio :label="0">驳回</el-radio>
      </el-radio-group>
      <el-input
        v-if="check.result==0"
        style="margin-top:20px"
        type="textarea"
        :rows="2"
        placeholder="请输入备注信息"
        v-model="check.remark"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      dataList: [],
      page: 1,
      limit: 10,
      check: 1, //是否是审核商户数据
      times: "",
      username: "",
      name: "",
      pass: "",
      remark: "",
      dialogVisible: false,
      viewImg: false, //查看大图dialog
      viewBigImage: "", //查看大图
      check: {
        id: "",
        tel: "",
        name: "",
        result: 1,
        remark: ""
      },
    };
  },
  watch: {
    pass(newVal, oldVal) {
      if (newVal == 1) {
        this.remark = "";
      }
    }
  },
  components: {},
  methods: {
    //查看大图
    viewBigImg(img) {
      // this.getImageData(img);
      this.viewImg = true;
      this.viewBigImage = img;
    },
    openCheckDialog(item) {
      this.dialogVisible = true;
      this.check.id = item.id;
      this.check.name = item.name;
      this.check.tel = item.tel;
    },
    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getSellerList({
          page: this.page,
          limit: this.limit,
          check: this.check,
          times: this.times,
          username: this.username,
          name: this.name
        })
        .then(res => {
          this.dataList = res.data || [];

          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    // getImageData(url) {
    //   var img = new Image();

    //   img.src = url;
    //   console.log(this.width);
    //   console.log(this.height);

    //   img.onload = function() {
    //     console.log(img.width);
    //     console.log(img.height);
    //     this.width = img.width;
    //     this.height = img.height;
    //   };
    // },

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
      this.check = 1;
      this.times = "";
      this.username = "";
      this.name = "";
      this.getDataList();
      this.isShow = false;
    },

    //审核
    sure() {
      if (this.check.result === "") {
        this.$message.warning("请选择通过或者驳回");
      } else if (!this.check.result && !this.check.remark) {
        this.$message.warning("请填写驳回原因");
      } else {
        if (this.check.result == "1") {
          this.check.remark = "";
        }
        this.$api.checkSupplier(this.check).then(res => {
          console.log(res.code);
          this.$message[res.code ? "error" : "success"](res.data.message);
          this.dialogVisible = res.code ? true : false;
          this.getDataList();
        });
      }
    }
    // 展开
    // toogleExpand(row){
    //   let $table = this.$refs.table;
    //   this.dataList.list.map((item) => {
    //     if (row.id != item.id) {
    //       $table.toggleRowExpansion(item, false)
    //     }
    //   })
    //   $table.toggleRowExpansion(row);
    // }
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
.avatar {
  width: 30px;
  height: 30px;
}

.img {
  width: 80px;
  height: 80px;
  padding: 10px;
  border: 1px dashed #ddd;
  box-sizing: border-box;
}
.viewBig {
  cursor: pointer;
}
.el-dialog__body {
    max-height: 100%;
    overflow: auto;
}
</style>
