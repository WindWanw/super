<template>
  <div class="card">
    <div class="content">
      <el-table :data="authList.list" style="width: 100%">
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <el-tag class="mini-button">{{scope.row.role | authGenre}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="联系方式"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              class="mini-button"
              @click="openEditPassword(scope.row)"
              type="primary"
              size="small"
            >修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="diy-content" v-if="admin==1">
      <div>
        <span>设置商户密码</span>
      </div>
      <div>
        <el-button
          class="mini-button"
          type="primary"
          size="small"
          @click="userSettingDialog=true"
        >点击设置</el-button>
      </div>
    </div>
    <div class="diy-content">
      <div>
        <span>设置马甲用户</span>
      </div>
      <div>
        <el-button class="mini-button" type="primary" size="small" @click="openVestDialog=true">点击生成</el-button>
      </div>
    </div>
    <div class="diy-content" v-if="admin==1">
      <div>
        <span>设置用户权限</span>
      </div>
      <div>
        <el-button class="mini-button" type="primary" size="small" @click="openRoutDialog=true">点击设置</el-button>
      </div>
    </div>
    <div class="diy-content" v-if="admin==1">
      <div>
        <span>设置版本号</span>
      </div>
      <div>
        <el-input v-model="version" size="mini"></el-input>
      </div>
      <div>
        <el-button class="mini-button" type="primary" size="mini" @click="setVersion">点击保存</el-button>
      </div>
    </div>
    <div class="diy-content">
      <div>
        <span>设置可修改银行卡日期（号）</span>
        <span class="iconfont BAI-heirenwenhao" @click="explanation()" style="cursor:pointer"></span>
      </div>
      <el-select
        v-model="card.start"
        placeholder="请选择允许修改的开始日期"
        @change="changeCardOne()"
        size="mini"
      >
        <el-option
          v-for="item in dateCardOne"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>至</span>
      <el-select v-model="card.end" placeholder="请选择允许修改的结束日期" size="mini">
        <el-option
          v-for="item in dateCardTwo"
          :key="item.value"
          :label="item.value"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <div>
        <el-button class="mini-button" type="primary" size="mini" @click="setModifyCardDate">点击保存</el-button>
      </div>
    </div>
    <div class="diy-content" v-if="admin==1">
      <div>
        <span>清除已领取礼包状态</span>
      </div>
      <div>
        <!-- <el-button class="mini-button" type="primary" size="small" @click="delGuideGift">设置用户</el-button> -->
        <el-button class="mini-button" type="primary" size="small" @click="delAllGidft">一键清除</el-button>
      </div>
    </div>
    <!--设置权限 -->
    <el-dialog
      title="设置用户权限"
      width="750px"
      :visible.sync="openRoutDialog"
      append-to-body
      @close="closeRoutDialog()"
    >
      <el-form label-width="120px" :model="rout" ref="rout" :rules="rules">
        <el-form-item label="角色类型" prop="genre">
          <el-select v-model="rout.genre" placeholder="请选择角色类型" @change="getGenreType()">
            <el-option
              v-for="item in genreList.list"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限模块" prop="routing">
          <el-tree
            :data="routingList"
            show-checkbox
            node-key="path"
            ref="tree"
            highlight-current
            :default-checked-keys="selected"
            :default-expanded-keys="[]"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openRoutDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRouting()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="750px" :visible.sync="openVestUidDialog" append-to-body>
      <el-form>
        <el-form-item>
          <el-input type="textarea" v-model="vestuid"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button
          type="primary"
          v-clipboard:copy="vestuid"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复 制</button>
      </div>
    </el-dialog>

    <!-- 马甲用户 -->
    <el-dialog
      title="设置条件"
      width="750px"
      :visible.sync="openVestDialog"
      append-to-body
      @close="vest.num='';vest.pics=[];vest.citycode=[];"
    >
      <el-tabs type="border-card" v-model="vest.vtype" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-form label-width="120px" :model="vest" :rules="rules" ref="vest">
            <el-form-item label="生成个数" prop="num" v-if="vest.vtype==1">
              <el-input v-model="vest.num" placeholder="请输入生成用户个数">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="type" v-if="vest.vtype==1">
              <template>
                <el-radio v-model="vest.type" label="_U">消费者</el-radio>
                <el-radio v-model="vest.type" label="_G">专引师</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="用户头像" style="width:100%" prop="pics">
              <el-upload
                :action="`${axios.defaults.baseURL}/common/upload/file/upload_dir`"
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
                <div
                  class="el-upload__tip"
                  slot="tip"
                  v-if="vest.num && vest.num >0"
                >请上传{{vest.num}}张用户头像</div>
              </el-upload>
              <div class="imgPreview" v-if="vest.pics && vest.pics.length">
                <div class="img_box" v-for="(item,index) in vest.pics" :key="index">
                  <img :src="item" />
                  <div class="model">
                    <i class="el-icon-delete" @click="vest.pics.splice(index,1)" title="删除"></i>
                  </div>
                </div>
              </div>
              <div v-else>
                <i class="el-icon-picture" style="font-size:100px;color:#ccc"></i>
              </div>
            </el-form-item>
            <el-form-item label="所在城市">
              <el-cascader
                :options="cityData"
                v-model="vest.citycode"
                change-on-select
                placeholder="请选择城市"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="到期时间" v-if="vest.type=='_G'" prop="timeout">
              <el-date-picker v-model="vest.timeout" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openVestDialog = false">取 消</el-button>
        <el-button type="primary" @click="setVestUserInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 超级管理员设置商户密码 -->
    <el-dialog
      title="设置商户密码"
      width="750px"
      :visible.sync="userSettingDialog"
      append-to-body
      @close="su.tels='';su.password=''"
    >
      <el-form label-width="120px" :model="su" ref="su">
        <el-form-item label="手机号" prop="tels">
          <el-input v-model="su.tels" placeholder="请输入手机号，多个手机号用空格或者“,”隔开"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="su.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSettingDialog = false">取 消</el-button>
        <el-button type="primary" @click="userSetting()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      width="750px"
      :visible.sync="retrieveDialog"
      append-to-body
      @close="$refs['ruleForm'].resetFields()"
    >
      <el-form label-width="120px" :model="retrieve" :rules="rules" ref="retrieve">
        <el-form-item label="注册手机号" prop="tel">
          <el-input v-model="retrieve.tel" disabled></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="retrieve.code"
            placeholder="请填写短信验证码"
            style="width:200px;margin:0 20px 0 0;"
          ></el-input>
          <el-button type="success" v-if="btn_show1" @click="sendsms()">点击发送</el-button>
          <el-button v-if="btn_show2" @click="sendsms()">重新发送</el-button>
        </el-form-item>
        <el-form-item label="原密码" prop="oldpassword">
          <el-input placeholder="请填写原密码" v-model="retrieve.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请填写新的密码" v-model="retrieve.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input placeholder="请确认密码" v-model="retrieve.repassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="retrieveDialog = false">取 消</el-button>
        <el-button type="primary" @click="editPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import citys from "../utils/province.js";
export default {
  data() {
    return {
      dateCard: [],
      dateCardOne: [],
      dateCardTwo: [],
      selected: [], //选中
      tabList: [
        { label: "单个设置", name: "0" },
        { label: "批量设置", name: "1" }
      ],
      loading: false,
      btn_show1: true, //发送验证码
      btn_show2: false, //重新发送
      retrieveDialog: false,
      userSettingDialog: false, //超级管理员设置商户密码
      openVestDialog: false, //马甲用户
      openVestUidDialog: false, //马甲用户id
      openRoutDialog: false, //权限
      up1Loading: false, //上传1状态
      isIndeterminate: true,
      checkAll: false,
      admin: JSON.parse(localStorage.getItem("userinfo")).id || "",
      vestuid: "", //马甲用户id
      cityData: citys, //城市数据
      routingList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      genreList: [],
      version: "", //版本
      card: {
        start: "",
        end: ""
      },
      retrieve: {
        id: "",
        tel: "",
        code: "",
        oldpassword: "",
        password: "",
        repassword: ""
      },
      su: {
        tels: "",
        password: ""
      },
      vest: {
        num: "",
        pics: [],
        citycode: [], //选择城市
        type: "_U", //用户类型
        vtype: "0",
        timeout: ""
      },
      rout: {
        genre: "",
        routing: []
      },
      authList: "",
      rules: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        // tel: [
        //   { validator: this.$rules.checkPhone, required: true, trigger: "blur" }
        // ],
        code: [
          { required: true, message: "请填写短信验证码", trigger: "blur" }
        ],
        oldpassword: [
          { required: true, message: "请填写原密码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写新密码", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" }
        ],
        num: [
          {
            required: true,
            message: "请输入生成马甲用户的数量",
            trigger: "blur"
          }
        ],
        pics: [
          { required: true, message: "请上传至少一张图片", trigger: "blur" }
        ],
        genre: [{ required: true, message: "角色必须选择", trigger: "blur" }],
        routing: [
          { required: true, message: "功能模块必须选择", trigger: "blur" }
        ],
        timeout: [
          { required: true, message: "专引师到期时间必须选择", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    sendsms() {
      if (!this.retrieve.tel) {
        this.$message("请先填写手机号");
      } else {
        this.btn_show1 = false;
        this.btn_show2 = true;
        this.$api
          .sendSms({
            tel: this.retrieve.tel
          })
          .then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
          });
      }
    },
    //角色列表
    getAuthList() {
      this.$api.getAdminInfo().then(res => {
        this.authList = res.data || [];
      });
    },

    getGenreType() {
      console.log(this.rout.genre);
      this.$refs.tree.setCheckedKeys([]);
      this.$api.getUserRouting({ type: this.rout.genre }).then(res => {
        if (!res.code) this.selected = res.data.list;
        console.log(this.selected);
      });
    },

    closeRoutDialog() {
      this.rout.genre = "";
      this.$refs.tree.setCheckedKeys([]);
    },

    //修改密码
    openEditPassword(item) {
      this.retrieveDialog = true;
      for (let i in this.retrieve) {
        this.retrieve[i] = "";
      }
      this.retrieve.tel = item.tel;
    },

    //修改密码
    editPassword() {
      this.$refs.retrieve.validate(valid => {
        if (valid) {
          this.$api.editAdminPassword(this.retrieve).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            if (res.code) return;
            this.retrieve = "";
            this.retrieveDialog = false;
          });
        }
      });
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
        if (typeof this.vest.pics == "string") {
          this.vest.pics = [];
        }
        this.vest.pics.push(res.data.host + res.data.name);
      }
    },

    tabClick(val) {
      this.vest.vtype = val.name;
      this.vest.num = "";
    },

    //设置马甲用户信息
    setVestUserInfo() {
      if (this.vest.vtype == "0") {
        this.vest.num = 2;
      }
      if (this.vest.num < 1) {
        this.$message("请正确填写用户数");
        return;
      }
      if (this.vest.pics.length == 0) {
        this.$message("请上传至少一张头像图");
        return;
      }
      if(this.vest.type=='_G' && this.vest.timeout==''){
        this.$message("专引师到期时间必须选择");
        return;
      }

      this.$api.setVestUserInfo(this.vest).then(res => {
        if (res.code) return;
        this.vestuid = res.data.list;
        this.openVestDialog = false;
        this.openVestUidDialog = true;
      });
    },

    onCopy(e) {
      this.$message("复制成功！");
    },
    onError(e) {
      this.$message("复制失败！");
    },

    userSetting() {
      if (!this.su.password) {
        this.$notify({
          title: "注意",
          message: "密码不能为空，请填写",
          type: "warning"
        });
        return;
      }
      this.$api.adminUpdateSu(this.su).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        if (!res.code) this.userSettingDialog = false;
      });
    },

    //获取路由
    getRouting() {
      this.$api.getRouting().then(res => {
        this.routingList = res.data.list;
      });
    },

    //设置权限
    setRouting() {
      console.log(this.$refs.tree.getCheckedNodes());
      console.log(this.$refs.tree.getCheckedKeys());

      this.rout.routing = this.$refs.tree.getCheckedNodes();

      this.$refs.rout.validate(valid => {
        if (valid) {
          this.$api.setUserRouting(this.rout).then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
            if (!res.code) this.openRoutDialog = false;
          });
        }
      });
    },
    //角色类型
    getAuthGenre() {
      this.$api.getAuthGenre().then(res => {
        this.genreList = res.data || [];
      });
    },

    //设置版本号
    setVersion() {
      this.$api.setVersion({ version: this.version }).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.getVersion();
      });
    },

    //获取版本
    getVersion() {
      this.$api.getVersion().then(res => {
        if (!res.code) this.version = res.data.version;
      });
    },

    getCardDate() {
      this.$api.getCardDate().then(res => {
        if (res.data.list != null) {
          this.card.start = res.data.list.start;
          this.card.end = res.data.list.end;
          this.getTwoDateDay();
        }
      });
    },

    setModifyCardDate() {
      this.$api.setCardDate(this.card).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        this.getCardDate();
      });
    },

    //开始日期改变事件
    changeCardOne() {
      this.getTwoDateDay();
    },
    //获取开始日期
    getOneDateDay() {
      for (let i = 1; i <= 31; i++) {
        this.dateCardOne.push({ value: i });
      }
    },
    //获取结束日期
    getTwoDateDay() {
      let one = this.card.start;
      if (one != "" || one != undefined) {
        this.dateCardOne.forEach(item => {
          if (one >= item.value) {
            this.dateCardTwo.push({ value: item.value, disabled: true });
          } else {
            this.dateCardTwo.push({ value: item.value, disabled: false });
          }
        });
      }
    },
    explanation() {
      this.$message.info("设置用户修改银行卡的日期，每月的日期范围");
    },
    //清除个别
    delGuideGift() {},

    //一键清除所有已领取大礼包的专引师记录
    delAllGidft() {
      this.$confirm("确定要清除吗？")
        .then(_ => {
          this.$api.setClear().then(res => {
            this.$message[res.code ? "warning" : "success"](res.data.message);
          });
        })
        .catch(_ => {});
    }
  },
  created() {
    this.getAuthList();
    this.getRouting();
    this.getAuthGenre();
    this.getVersion();
    this.getCardDate();
    this.getOneDateDay();
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  box-sizing: border-box;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.diy-content {
  background-color: #fff;
  width: 70%;
  padding: 20px 100px;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.diy-content span {
  font-size: 12px;
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
</style>
