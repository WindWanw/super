<template>
  <div class="sellerList">
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
      <!-- <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="openAddEditDialog('add')"
      >添加商户</el-button>-->
      <div class="search_wrap">
        <el-input
          clearable
          v-model="title"
          placeholder="请输入店铺名称"
          size="mini"
          style="width:150px;margin-right:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="checker"
          placeholder="请输入审核人员姓名"
          size="mini"
          style="width:150px;margin-right:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="name"
          placeholder="请输入商户姓名"
          size="mini"
          style="width:150px;margin-right:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="username"
          placeholder="请输入商户账号"
          size="mini"
          style="width:150px"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          clearable
          v-model="status"
          placeholder="请选择商户账号状态"
          size="mini"
          style="margin:0 10px"
          @keyup.enter.native="search"
        >
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
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
        <el-button type="success" size="mini" @click="beforeExport" icon="iconfont daochu">导出</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="dataList.list"
        stripe
        border
        v-loading="loading"
        @cell-click="toGoodlist"
        class="seller-table"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_wrap">
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
        <el-table-column prop="username" label="账号" align="center"></el-table-column>
        <el-table-column prop="name" label="商户姓名" align="center"></el-table-column>
        <el-table-column prop="tags" label="店铺标签" align="center">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.tags ? 'primary' : 'danger'"
            >{{scope.row.tags ? scope.row.tags : '无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shopname" label="店铺名称" align="center"></el-table-column>
        <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
        <el-table-column prop="commission" label="托管模式" align="center">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.commission==1? 'success' : 'warning'"
            >{{scope.row.commission==1?'平台托管':'自定义'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="discount" label="折扣率(%)" align="center"></el-table-column>
        <el-table-column prop="tel" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="guide_num" label="专引师数量" align="center"></el-table-column>
        <el-table-column prop="checker" label="审核人" align="center"></el-table-column>
        <el-table-column prop="times" label="入驻时间" align="center"></el-table-column>
        <el-table-column prop label="账号状态" align="center">
          <template slot-scope="scope">
            <!-- :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
            @click="userStop(scope.row.id)"-->
            <el-button
              class="mini-button"
              size="mini"
              :type="scope.row.status=='1'?'success':'info'"
            >{{scope.row.status | userStatus}}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop label="操作" width="300px" v-if="isSetting">
          <template slot-scope="scope">
            <el-button
              class="mini-button"
              @click="openPunishDialog(scope.row)"
              type="warning"
              size="mini"
              icon="el-icon-edit-outline"
            >处罚</el-button>
            <el-button
              class="mini-button"
              @click="openAddEditDialog('edit',scope.row)"
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              @click="cancel(scope.row.id)"
              class="mini-button"
              type="danger"
              size="mini"
              icon="iconfont chexiao1"
            >撤销</el-button>
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

    <!-- 添加dialog -->
    <el-dialog
      top="20px"
      :title="form.id?'修改':'添加'"
      :visible.sync="AddEditDialog"
      width="650px"
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form status-icon :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="城市">
          <el-cascader
            :options="cityData"
            @change="currentCity"
            v-model="selectCity"
            change-on-select
            :placeholder="form.id?'如需修改请选择':'请选择城市'"
          ></el-cascader>
          <span v-if="form.id" style="margin-left:20px">当前城市:{{city}}</span>
        </el-form-item>
        <el-form-item v-if="!form.id" label="账号" :prop="form.id?'':'username'">
          <el-input type="username" v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :prop="form.id?'':'password'">
          <el-input
            type="password"
            v-model="form.password"
            :placeholder="form.id?'不填默认不修改':'请输入密码'"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="form.tel" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="店铺名" prop="shopname">
          <el-input v-model="form.shopname" placeholder="请输入店铺名"></el-input>
        </el-form-item>
        <el-form-item label="商户类型" prop="shop_type">
          <el-select v-model="form.shop_type" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="谈判比例类型">
          <template>
            <el-radio v-model="form.commission" label="1" @change="explanation">平台托管</el-radio>
            <el-radio v-model="form.commission" label="2" @change="explanation">自定义</el-radio>
          </template>
          <span class="iconfont BAI-heirenwenhao" @click="explanation()" style="cursor:pointer"></span>
        </el-form-item>
        <el-form-item label="分成比例" prop="discount" v-if="form.commission=='1'">
          <el-input v-model="form.discount" placeholder="请输入专引师的分成比例">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商户描述">
          <el-input v-model="form.shop_info" placeholder="请输入商户描述"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="open_times">
          <el-input v-model="form.open_times" placeholder="请输入营业时间"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" prop="shop_avatar">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp5"
            :show-file-list="false"
            :on-success="upSuc5"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.shop_avatar" class="license_img" :src="form.shop_avatar" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="form.idcard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="picOn">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp1"
            :show-file-list="false"
            :on-success="upSuc1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.picOn" class="idcard_img" :src="form.picOn" />
        </el-form-item>
        <el-form-item label="身份证反面" prop="picOff">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/sfz_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp2"
            :show-file-list="false"
            :on-success="upSuc2"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.picOff" class="idcard_img" :src="form.picOff" />
        </el-form-item>
        <el-form-item label="营业执照" prop="license">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/license_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp3"
            :show-file-list="false"
            :on-success="upSuc3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.license" class="license_img" :src="form.license" />
        </el-form-item>
        <el-form-item label="其他证明材料" prop="other">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp4"
            :show-file-list="false"
            :on-success="upSuc4"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <img v-if="form.other" class="license_img" :src="form.other" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 惩罚dialog -->
    <el-dialog title="惩罚" :visible.sync="punishDialog" label-width="120px" width="30%">
      <el-form :model="form">
        <el-form-item label="处罚类型">
          <el-select
            v-model="punishType"
            clearable
            placeholder="请选择处罚类型"
            @change="changePunishType"
          >
            <el-option
              v-for="item in punishList"
              :key="item.value"
              :label="item.title"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚内容" v-if="punishType">
          <el-select v-model="punishContent" clearable placeholder="请选择处罚内容">
            <el-option
              v-for="item in punishContentList"
              :key="item.value"
              :label="item.label"
              :value="item.ps"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="punishDialog = false">取 消</el-button>
        <el-button type="primary" @click="punishSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览dialog -->
    <el-dialog title="店铺详情" :visible.sync="previewDialog" width="800px" top="20px">
      <div v-html="form.shop_info"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import citys from "../../utils/city.js";
import { constants } from "crypto";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      isSetting: true,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        tel: [
          { validator: this.$rules.checkPhone, required: true, trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        idcard: [
          { validator: this.$rules.checkId, required: true, trigger: "blur" }
        ],
        picOn: [
          { required: true, message: "身份证正面不能为空", trigger: "blur" }
        ],
        picOff: [
          { required: true, message: "身份证反面不能为空", trigger: "blur" }
        ],
        shopname: [
          { required: true, message: "店铺名不能为空", trigger: "blur" }
        ],
        open_times: [
          { required: true, message: "营业时间不能为空", trigger: "blur" }
        ],
        license: [
          { required: true, message: "营业执照不能为空", trigger: "blur" }
        ]
      },
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
      username: "", //名称
      checker: "", //审核人员
      title: "", //店铺名称
      name: "",
      status: "", //用户状态
      date: "", //日期
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      AddEditDialog: false,
      previewDialog: false, //预览文章内容
      cityData: citys, //城市数据
      selectCity: [], //选择城市
      city: "",
      viewImg: false, //查看大图dialog
      viewBigImage: "", //查看大图
      form: {
        username: "",
        password: "",
        name: "",
        shop_info: "", //商铺描述
        shop_type: "", //商铺类型
        commission: "", //分成比例  1为托管  2为自定义
        discount: "", //折扣分成
        address: "",
        tel: "",
        idcard: "",
        picOn: "",
        picOff: "",
        license: "",
        other: "",
        shop_avatar: "",
        shopname: "",
        open_times: ""
      },
      autoChecke: {
        //用户自动审核的相关信息
        name: "",
        idcard: "",
        picOn: "",
        picOff: "",
        license: ""
      },
      punishDialog: false, //处罚dialog
      punishList: "",
      punishContentList: "",
      punishId: "", //处罚id
      punishType: "",
      punishContent: "",
      types: [
        { label: "线上非实体店", value: 1 },
        { label: "线下实体店", value: 2 }
      ] //商铺类型
    };
  },
  watch: {
    punishType(newVal, oldVal) {
      console.log(newVal);
      this.punishList.forEach(item => {
        if (newVal == item.val) {
          this.punishContentList = item.type;
        }
      });
    }
  },
  components: {},
  methods: {
    //导出之前
    beforeExport() {
      this.isSetting = false;
      this.$confirm("确定导出当前页数据吗？(选择100条/页试试)")
        .then(_ => {
          this.exportExcel();
          this.isSetting = true;
        })
        .catch(_ => {
          this.isSetting = true;
        });
    },
    //导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(
        document.querySelector(".seller-table")
      );

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sellerList.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    //查看大图
    viewBigImg(img) {
      // this.getImageData(img);
      this.viewImg = true;
      this.viewBigImage = img;
    },
    explanation() {
      this.$message({
        showClose: true,
        dangerouslyUseHTMLString: true,
        message:
          "<strong>托管平台：托管正意平台，商户与专引师固定分成比例；<p>&nbsp;<p>自定义：商户与专引师沟通，自定义分成比例</strong>",
        duration: 5000
      });
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
    //获取列表
    getDataList() {
      this.loading = true;
      this.$api
        .getSellerList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          times: this.date,
          name: this.name,
          username: this.username,
          checker: this.checker,
          title: this.title
        })
        .then(res => {
          this.dataList = res.data || [];
          if (res.code) {
            this.$message[res.code ? "warning" : "success"](res.data);
          }
          this.loading = false;
        });
    },
    currentCity(e) {
      console.log(e);
    },

    //查询用户
    search() {
      this.page = 1;
      this.getDataList();
      this.isShow = true;
    },

    back() {
      this.page = 1;
      this.limit = 10;
      this.status = "";
      this.date = "";
      this.name = "";
      this.username = "";
      this.checker = "";
      this.title = "";
      this.getDataList();
      this.isShow = false;
    },
    // 停用
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id,
              result: ""
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    //打开dialog
    openAddEditDialog(type, item) {
      if (type == "add") {
        for (let i in this.form) {
          this.form[i] = "";
        }
        this.selectCity = [];
      } else {
        this.form.username = item.username;
        this.form.password = item.password || "";
        this.city = item.city;
        this.selectCity = [];
        this.form.name = item.name;
        this.form.tel = item.tel;
        this.form.address = item.address;
        this.form.idcard = item.idcard;
        this.form.id = item.id;
        this.form.picOn = item.picOn;
        this.form.picOff = item.picOff;
        this.form.license = item.license;
        this.form.shop_info = item.shop_info;
        this.form.shop_type = item.shop_type;
        this.form.commission = item.commission;
        this.form.discount = item.discount;
        this.form.shopname = item.shopname;
        this.form.shop_avatar = item.shop_avatar;
        this.form.other = item.other;
        this.form.open_times = item.open_times || "";
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
        this.form.picOn = res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp2(file) {},
    //上传成功后
    upSuc2(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.picOff = res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp3(file) {},
    //上传成功后
    upSuc3(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.license = res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp4(file) {},
    //上传成功后
    upSuc4(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.other = res.data.host + res.data.name;
      }
    },
    beforeUp5(file) {},
    //上传成功后
    upSuc5(res, file, fileList) {
      console.log(res);
      if (res.code) {
        return;
      } else {
        this.form.shop_avatar = res.data.host + res.data.name;
      }
    },
    //确认添加/修改
    addEdit() {
      let that = this;
      if (!this.form.id) {
        if (!that.selectCity || !that.selectCity.length)
          return this.$message.warning("请选择城市");
      }
      this.autoChecke.name = this.form.name;
      this.autoChecke.idcard = this.form.idcard;
      this.autoChecke.picOn = this.form.picOn;
      this.autoChecke.picOff = this.form.picOff;
      this.autoChecke.license = this.form.license;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$api[that.form.id ? "editSeller" : "addSeller"]({
            username: that.form.username,
            password: that.form.password,
            tel: that.form.tel,
            citycode: that.selectCity,
            id: that.form.id || "",
            shop_type: that.form.shop_type,
            discount: that.form.discount,
            commission: that.form.commission,
            shopname: that.form.shopname,
            shop_info: that.form.shop_info,
            address: that.form.address,
            shop_avatar: that.form.shop_avatar || "",
            autoChecke: that.autoChecke,
            name: that.form.name,
            open_times: that.form.open_times || "",
            material: {
              name: that.form.name,
              address: that.form.address,
              idcard: that.form.idcard,
              picOn: that.form.picOn,
              picOff: that.form.picOff,
              license: that.form.license,
              other: that.form.other
            }
          }).then(res => {
            that.$message[res.code ? "error" : "success"](res.data.message);
            if (!that.form.id) {
              that.page = 1;
            }
            that.getDataList();
            that.AddEditDialog = res.code ? true : false;
          });
        } else {
          return false;
        }
      });
    },

    //撤销审核
    cancel(id) {
      this.$confirm("确定要重新审核该用户吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        this.$api.cancelSeller({ id: id }).then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          this.loading = false;
          this.getDataList();
        });
      });
    },

    //删除
    del(id) {
      this.$confirm("确认删除该项吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .delSeller({
              id: id
            })
            .then(res => {
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

    //获取处罚类型
    getPunishType() {
      this.$api.getPunishType().then(res => {
        this.punishList = res.data;
      });
    },
    //打开处罚dialoig
    openPunishDialog(item) {
      this.getPunishType();
      this.punishId = item.id;
      this.punishDialog = true;
    },

    //类型转变，清空子类型
    changePunishType() {
      this.punishContent = "";
    },

    //确认处罚
    punishSure() {
      if (!this.punishType || !this.punishContent)
        return this.$message.warning("请处罚类型和处罚内容");
      this.$api
        .addPunish({
          to_uid: this.punishId,
          types: this.punishType,
          values: this.punishContent
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          this.punishDialog = res.code ? true : false;
        });
    },
    toGoodlist(row, column, cell, event) {
      if (column.label == "商品数量") {
        this.$router.push({ path: "/goodList", query: { id: row.id } });
      }
      if (column.label == "专引师数量") {
        this.$router.push({ path: "/guidesList", query: { id: row.id } });
      }
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
.license {
  width: 200px;
  height: 300px;
}
.idcard_box {
  padding: 20px;
  box-sizing: border-box;
}
.el-button [class*="el-icon-"] + span {
  margin-left: 5px;
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
