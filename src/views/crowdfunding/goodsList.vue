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
          v-model="name"
          placeholder="请输入关键字"
          size="mini"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          v-model="cate"
          clearable
          placeholder="请选择所属分类"
          size="mini"
          style="margin:0 10px"
          @keyup.enter.native="search"
        >
          <el-option v-for="item in goodsCate" :key="item.id" :label="item.tag" :value="item.tag"></el-option>
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
        <el-radio-group
          v-model="status"
          size="mini"
          style="margin:0 10px"
          @keyup.enter.native="search"
        >
          <el-radio :label="1" @click.native.prevent="clickitem(1)">上架</el-radio>
          <el-radio :label="2" @click.native.prevent="clickitem(2)">下架</el-radio>
        </el-radio-group>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addEditCrowd('add')"
          style="margin:0 0 0 5px;"
        >添加</el-button>
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
        <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="goods_avatar" label="商品图片" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.goods_avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="tag" label="所属分类" align="center"></el-table-column>
        <el-table-column prop="price" label="原价(元)" align="center"></el-table-column>
        <el-table-column prop="current_price" label="现价(元)" align="center"></el-table-column>
        <!-- <el-table-column prop="num" label="库存" align="center"></el-table-column> -->
        <el-table-column prop="times" label="上架日期" align="center">
          <template slot-scope="scope">{{scope.row.times | formatTimeStamp}}</template>
        </el-table-column>
        <el-table-column prop="active_times" label="活动时间" align="center" width="250px">
          <template slot-scope="scope">
            <div style="color:#436EEE">开始时间：{{scope.row.active_times[0]}}</div>
            <div style="color:#CD2626">结束时间：{{scope.row.active_times[1]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="express_times" label="发货时间" align="center" width="180px;">
          <template slot-scope="scope">{{scope.row.express_times | formatTimeStamp(1)}}</template>
        </el-table-column>
        <el-table-column prop="join" label="参与人数" align="center"></el-table-column>
        <el-table-column prop="status" label="当前状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color:red">上架</span>
            <span v-else color="black" style="color:black">下架</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="button">
              <el-button
                class="mini-button"
                @click="addEditCrowd('edit',scope.row)"
                type="primary"
                icon="el-icon-edit"
                size="mini"
              >商品编辑</el-button>
            </div>
            <div class="button">
              <el-button
                class="mini-button"
                @click="upDown(scope.row.id,scope.row.status)"
                :type="scope.row.status==1?'danger':'success'"
                size="mini"
                :title="scope.row.status==2?'点击上架':'点击下架'"
              >{{scope.row.status==2?'上架':'下架'}}</el-button>
              <!-- <el-button type="danger" size="mini" @click="delGoods(scope.row.id)">删除</el-button> -->
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
    <!-- 商品编辑dialog -->
    <el-dialog
      :title="form.id ? '编辑' : '添加'"
      :visible.sync="editGoodsDialog"
      width="60%"
      top="50px"
      lock-scroll
    >
      <el-form
        label-width="100px"
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 基本信息（名称，价格，库存） -->
        <div class="goods_title">基本信息</div>
        <el-form-item prop="title" label="商品名称">
          <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="商品类型">
          <el-select v-model="form.tag" clearable placeholder="请选择">
            <el-option v-for="item in goodsCate" :key="item.id" :label="item.tag" :value="item.tag"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price" label="原价">
          <el-input v-model="form.price" placeholder="请输入商品原价">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="current_price" label="现价">
          <el-input v-model="form.current_price" placeholder="请输入商品现价">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="num" label="库存">
          <el-input v-model="form.num" placeholder="请输入商品库存"></el-input>
        </el-form-item>-->
        <el-form-item prop="active_times" label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="form.active_times"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <!-- <div class="block">
            <el-date-picker v-model="form.active_times" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>-->
        </el-form-item>
        <el-form-item prop="express_times" label="发货时间">
          <div class="block">
            <el-date-picker v-model="form.express_times" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="发货地址" prop="address">
          <el-cascader
            :options="cityData"
            v-model="form.address"
            change-on-select
            :placeholder="form.id?'如需修改请选择':'请选择城市'"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="express_pay" label="邮费">
          <el-input v-model="form.express_pay" placeholder="请输入邮费，默认为：0">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="citycode" label="服务城市">
          <el-input v-model="form.citycode" placeholder="默认为：全国" readonly></el-input>
        </el-form-item>-->
        <el-form-item prop="commission" label="返佣比例">
          <el-input v-model="form.commission" placeholder="请输入专引师返佣比例">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <div class="goods_title">厂家信息</div>
        <el-form-item label="厂家资质" prop="qualification">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/license_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp3"
            :show-file-list="false"
            :on-success="upSuc3"
          >
            <el-button
              class="mini-button"
              size="small"
              type="primary"
              :disabled="up3Loading"
            >{{up3Loading?'正在上传中...':'点击上传'}}</el-button>
          </el-upload>
          <img v-if="form.qualification" class="license_img" :src="form.qualification" />
        </el-form-item>
        <el-form-item prop="introduction" label="厂家简介">
          <el-input type="textarea" v-model="form.introduction" placeholder="请输入厂家简介"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="厂家电话">
          <el-input v-model="form.tel" placeholder="请输入厂家电话"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <div class="goods_title">商品图片</div>
        <el-form-item label style="width:100%" prop="pics">
          <el-upload
            :action="`${axios.defaults.baseURL}/common/upload/file/goods_upload_dir`"
            accept="image/jpeg, image/gif, image/png, image/bmp"
            :before-upload="beforeUp1"
            :show-file-list="false"
            :on-success="upSuc1"
            multiple
          >
            <el-button
              class="mini-button"
              size="small"
              type="primary"
              :disabled="up1Loading"
            >{{up1Loading?'正在上传中...':'点击上传'}}</el-button>
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
        <div class="goods_title">商品描述</div>
        <el-form-item label style="width:100%">
          <editor v-model="form.info" :isClear="isClear"></editor>
        </el-form-item>
      </el-form>
      <!-- 规格 -->

      <!-- 添加规格 -->
      <el-form label-width="80px" :model="form">
        <div class="goods_title">
          规格
          <span>(若商品无规格属性可不填)</span>
        </div>
        <el-form-item :label="'规格'+(index+1)" v-for="(item,index) in form.attr" :key="index">
          <el-input
            size="small"
            clearable
            v-model="item.attr"
            placeholder="请输入规格名，例如：颜色/尺寸/大小/单位"
            style="width:350px"
            :disabled="showAttr && showAttr1"
          ></el-input>
          <el-button
            v-if="!showAttr || !showAttr1"
            type="danger"
            size="small"
            @click="form.attr.splice(index,1)"
          >删除</el-button>
        </el-form-item>
        <el-button
          class="mini-button"
          v-if="!showAttr || !showAttr1"
          style="margin-bottom:20px"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addSpec"
        >自定义规格</el-button>

        <!-- 商品属性预览 -->
        <div class="preview" v-if="form.attr_val && form.attr_val.length">
          <div class="goods_title" style="color:red">请根据规格填写相应信息</div>
          <el-table :data="form.attr_val" stripe border>
            <el-table-column prop="price" label="添加" width="50px">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus-outline" @click="addMore(scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column v-for="(item,index) in form.attr" :key="index" :label="item.attr">
              <template slot-scope="scope">
                <el-input
                  :disabled="scope.row.id?true:false"
                  v-model="scope.row.attr_val[index]"
                  :placeholder="`请填写${item.attr}`"
                  clearable
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="attr_price" label="原价" align="center">
              <template slot-scope="scope">
                <el-input
                  :disabled="scope.row.id?true:false"
                  v-model="scope.row.attr_price"
                  placeholder="请填写原价"
                  clearable
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="attr_current_price" label="现价" align="center">
              <template slot-scope="scope">
                <el-input
                  :disabled="scope.row.id?true:false"
                  v-model="scope.row.attr_current_price"
                  placeholder="请填写现价"
                  clearable
                ></el-input>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="attr_num" label="库存" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.attr_num" placeholder="请填写库存" clearable></el-input>
              </template>
            </el-table-column>-->
            <el-table-column prop="imgurl" label="商品图片" align="center">
              <template slot-scope="scope">
                <el-upload
                  :action="`${axios.defaults.baseURL}/common/upload/file/goods_upload_dir`"
                  accept="image/jpeg, image/gif, image/png, image/bmp"
                  :before-upload="beforeUp2"
                  :show-file-list="false"
                  :on-success="upSuc2"
                >
                  <el-button
                    @click="setAttrImg(scope.$index)"
                    size="mini"
                    type="primary"
                    :disabled="up2Loading"
                  >{{up2Loading?'正在上传中...':'点击上传'}}</el-button>
                </el-upload>
                <img v-if="scope.row.imgurl" class="attr-img" :src="scope.row.imgurl" />
              </template>
            </el-table-column>
            <el-table-column prop label="操作" width="80px" v-if="!showAttr || !showAttr1">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div class="footer_btn">
        <el-button type="success" size="small" icon="el-icon-upload2" @click="addEditGoods">提交商品信息</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editor from "@/components/editor";
import citys from "../../utils/province.js";
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
      rules: {
        title: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        tag: [{ required: true, message: "商品类型必须选择", trigger: "blur" }],
        price: [
          { required: true, message: "商品原价必须填写", trigger: "blur" }
        ],
        current_price: [
          { required: true, message: "商品现价必须填写", trigger: "blur" }
        ],
        // num: [{ required: true, message: "商品库存不能为空", trigger: "blur" }],
        active_times: [
          { required: true, message: "活动时间必须填写", trigger: "blur" }
        ],
        express_times: [
          { required: true, message: "发货时间必须填写", trigger: "blur" }
        ],
        address: [
          { required: true, message: "发货地址必须填写", trigger: "blur" }
        ],
        commission: [
          { required: true, message: "返佣比例必须填写", trigger: "blur" }
        ],
        qualification: [
          { required: true, message: "厂家资质必须上传", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "厂家联系方式不能为空", trigger: "blur" }
        ],
        pics: [{ required: true, message: "商品图片必须上传", trigger: "blur" }]
      },
      up1Loading: false, //上传1状态
      up2Loading: false, //上传1状态
      up3Loading: false, //上传3状态
      showAttr: false,
      showAttr1: false,
      cityData: citys, //城市数据
      selectCity: [], //选择城市
      page: 1,
      limit: 10,
      name: "", //名称
      date: [], //时间
      status: "", //上下架状态查询
      cate: "", //分类查询
      dataList: [],

      content: "", //商品描述富文本
      isClear: false, //是否清空富文本
      goodsCate: "", //商品分类列表
      editGoodsDialog: false, //商品编辑dialog
      citysdata: [],
      province: [],
      form: {
        id: "",
        title: "",
        price: "", //原价
        current_price: "", //现价
        // num: "",
        // addnum: "", //增加的库存数量
        pics: [],
        info: "",
        video: "",
        active_times: "", //活动时间
        express_times: "", //发货时间
        express_pay: "", //邮费
        address: [], //发货地址
        // citycode: "", //服务城市
        tag: "", //商品分类
        commission: "", //返佣比例
        qualification: "", //厂家资质
        introduction: "", //厂家简介
        tel: "", //厂家电话
        attr: [], //规格名称
        attr_val: [] //属性值
      }, //商品信息
      show: false, //线上返回
      current_index: ""
    };
  },
  components: { editor },
  methods: {
    setAttrImg(i) {
      this.current_index = i;
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
      this.show = false;
      this.status = "";
      this.date = [];
      this.cate = "";
      this.name = "";
      this.getDataList();
    },

    //获取数据列表
    getDataList() {
      this.loading = true;
      this.$api
        .getCrowdList({
          page: this.page,
          limit: this.limit,
          status: this.status,
          date: this.date,
          tag: this.cate,
          title: this.name
        })
        .then(res => {
          this.dataList = res.data || [];
          this.height = 100;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 750;
          } else if (t != 0) {
            this.height = t * 120;
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
    },
    //商品上下架
    upDown(id, status) {
      this.$confirm(status == 1 ? "确定要下架吗?" : "确定要上架吗?")
        .then(_ => {
          this.$api
            .goodUpDown({
              id,
              status: status == 1 ? 2 : 1
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data.message);
              if (res.code) return;
              this.getDataList();
            });
        })
        .catch(_ => {
          this.$message("取消操作");
        });
    },

    //添加规格名称
    addSpec() {
      if (typeof this.form.attr == "string") {
        this.form.attr = [];
      }
      this.form.attr.push({ attr: "" });
      if (typeof this.form.attr_val == "string") {
        this.form.attr_val = [];
      }
      if (!this.form.attr_val.length) {
        this.form.attr_val.push({
          attr_val: [],
          attr_price: "",
          attr_current_price: "",
          imgurl: ""
        });
      }
    },
    //添加更多
    addMore(index) {
      this.form.attr_val.splice(index + 1, 0, {
        attr_val: [],
        attr_price: "",
        attr_current_price: "",
        imgurl: ""
      });
    },
    //删除指定元素
    del(index) {
      this.form.attr_val.splice(index, 1);
    },
    //上次图片前
    beforeUp1(file) {
      if (file.size > 1024 * 2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning("单张图片不能超过2MB");
        return false;
      }
    },
    //上传成功后
    upSuc1(res, file, fileList) {
      if (res.code) {
        return;
      } else {
        if (typeof this.form.pics == "string") {
          this.form.pics = [];
        }
        this.form.pics.push(res.data.host + res.data.name);
      }
    },

    //上次图片前
    beforeUp2(file, i) {
      if (file.size > 1024 * 2 * 1024) {
        // 超出2m  取消上传
        this.$message.warning("单张图片不能超过2MB");
        return false;
      }
    },
    //上传成功后
    upSuc2(res, file, fileList) {
      if (res.code) {
        return;
      } else {
        this.form.attr_val[this.current_index].imgurl =
          res.data.host + res.data.name;
      }
    },
    //上次图片前
    beforeUp3(file) {
      this.up3Loading = true;
    },
    //上传成功后
    upSuc3(res, file, fileList) {
      this.up3Loading = false;
      console.log(res);
      if (res.code) {
        this.$message.error("上传失败");
        return;
      } else {
        this.form.qualification = res.data.host + res.data.name;
      }
    },
    //获取商品分类
    getGoodsCate() {
      this.$api.getGoodsCate().then(res => {
        this.goodsCate = res.data || [];
      });
    },
    /**
     * 获取服务城市
     */
    getCitys() {
      this.$api.getCitys().then(res => {
        this.province = res.data.list || [];
      });
    },

    /**
     * 选中省
     */
    select() {
      this.$api
        .getCitys({
          province: this.form.province
        })
        .then(res => {
          this.citys = res.data.list || [];
        });
    },

    addEditCrowd(type, item) {
      this.editGoodsDialog = true;
      if (type == "add") {
        for (let i in this.form) {
          this.form[i] = "";
          this.form.address = [];
          this.form.pics = [];
          this.form.attr = [];
          this.form.attr_val = [];
        }
        this.showAttr = false;
      } else if (type == "edit") {
        this.form.id = item.id;
        this.form.title = item.title;
        this.form.price = item.price;
        this.form.current_price = item.current_price;
        this.form.num = item.num;
        this.form.pics = item.pics;
        this.form.info = item.info;
        this.form.active_times = item.active_times;
        this.form.express_times = item.express_times;
        this.form.express_pay = item.express_pay;
        this.form.address = item.city_code;
        this.form.tag = item.tag;
        this.form.commission = item.commission;
        this.form.qualification = item.material.qualification;
        this.form.introduction = item.material.introduction;
        this.form.tel = item.material.tel;
        this.form.attr = item.attr;
        this.form.attr_val = item.attr_val;
        this.editGoodsDialog = true;
        this.showAttr = true;
        if (this.form.attr_val.length) {
          this.showAttr1 = true;
        }
      }
    },
    //确认编辑商品
    addEditGoods() {
      let that = this;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$api[that.form.id ? "editCrowdGoods" : "addCrowdGoods"](
            that.form
          ).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            if (res.code) return;
            this.editGoodsDialog = false;
            this.getDataList();
          });
        }

        this.getDataList();
      });
    }
  },
  created() {
    this.getCitys();
    this.getGoodsCate();
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
  width: 30px;
  height: 30px;
}
.goods {
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
.el-form-item {
  width: 500px;
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
.footer_btn {
  padding: 20px 0;
  margin: 0 auto;
  text-align: center;
}
.attr-img {
  width: 75px;
  height: 75px;
  margin: 5px 0 0 0;
}
</style>
