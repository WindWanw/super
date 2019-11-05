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
          :disabled="username !=''"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="username"
          placeholder="请输入用户名"
          size="mini"
          :disabled="user_id !=''"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="tel"
          placeholder="请输入手机号"
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
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        ></el-cascader>
        <!-- <el-input
          clearable
          v-model="city"
          placeholder="请输入城市名称"
          size="mini"
          style="width:200px;margin:0 10px"
          @keyup.enter.native="search"
        ></el-input>-->
        <!-- <el-select
          clearable
          v-model="sex"
          placeholder="请选择用户性别"
          size="mini"
          style="margin:0 10px"
          @keyup.enter.native="search"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>-->
        <el-select
          clearable
          v-model="status"
          placeholder="请选择用户类型"
          size="mini"
          style="width:200px;margin-left:10px;"
          @keyup.enter.native="search"
        >
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="-1"></el-option>
        </el-select>
        <el-date-picker
          style="width:200px;margin-left:10px;"
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
      <el-tabs type="border-card" v-model="utype" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="dataList.list" stripe border v-loading="loading" ref="table">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.vestUser" stripe border style="width:100%">
                  <el-table-column prop="username" label="用户名" align="center">
                    <template
                      slot-scope="scope"
                    >{{scope.row.username}}{{scope.row.isGuide ? '(专引师)' : '(消费者)'}}</template>
                  </el-table-column>
                  <el-table-column prop label="头像" align="center">
                    <template slot-scope="scope">
                      <img class="avatar" :src="scope.row.avatar" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" align="center">
                    <template slot-scope="scope">{{scope.row.sex | sexStatus}}</template>
                  </el-table-column>
                  <el-table-column prop="city" label="城市" align="center"></el-table-column>
                  <el-table-column prop label="账号状态" align="center">
                    <template slot-scope="scope">
                      <el-button
                        :title="scope.row.status==1?'点击禁用':'点击解除'"
                        @click="vestUserDel(scope.row.id,scope.row.status)"
                        :type="scope.row.status==1 ?'success':'info'"
                        size="mini"
                        class="mini-button"
                      >{{scope.row.status ? '正常' : '超出次数'}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="times" label="注册日期" align="center">
                    <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
                  </el-table-column>
                  <el-table-column prop="use" label="使用次数" align="center"></el-table-column>
                  <el-table-column prop="needs" label="发布需求数" align="center"></el-table-column>
                  <el-table-column prop="reply" label="回复需求数" align="center"></el-table-column>
                  <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="prop">
                      <el-button
                        title="删除马甲"
                        @click="delVestUser(prop.row)"
                        type="danger"
                        size="mini"
                        class="mini-button"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" align="center">
              <template slot-scope="scope">
                <p>
                  <img class="avatar" :src="scope.row.avatar" />
                </p>
                <p>{{scope.row.username}}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column prop label="头像" align="center">
              <template slot-scope="scope">
                <p><img class="avatar" :src="scope.row.avatar" /></p>
              </template>
            </el-table-column>-->
            <el-table-column prop="sex" label="性别" align="center">
              <template slot-scope="scope">{{scope.row.sex | sexStatus}}</template>
            </el-table-column>
            <el-table-column prop="city" label="城市" align="center"></el-table-column>
            <el-table-column prop="tel" label="手机号" align="center"></el-table-column>
            <el-table-column prop="coin" label="积分" align="center" width="60px"></el-table-column>
            <el-table-column prop="exp" label="经验" align="center" width="60px"></el-table-column>
            <el-table-column prop="card_price" label="卡卷金额（元）" align="center" width="100px"></el-table-column>
            <el-table-column prop label="账号状态" align="center">
              <template slot-scope="scope">
                <el-button
                  :title="scope.row.status=='1'?'点击禁用':'点击解除禁用'"
                  @click="userStop(scope.row.id)"
                  :type="scope.row.status=='1'?'success':'info'"
                  size="mini"
                  class="mini-button"
                >{{scope.row.status | userStatus}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="times" label="注册日期" align="center">
              <template slot-scope="scope">{{scope.row.times | formatTimeStamp(1)}}</template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  title="设置马甲"
                  @click="openSetVestUser(scope.row)"
                  type="primary"
                  size="mini"
                  class="mini-button"
                >设置马甲</el-button>
                <el-button
                  title="查看马甲用户"
                  @click="toogleExpand(scope.row)"
                  type="success"
                  size="mini"
                  class="mini-button"
                  style="margin : 10px 0 0 0;"
                >查看马甲</el-button>
                <el-button
                  v-if="uid==1"
                  :title="scope.row.is_openid ? '还原OpenID' : '转换OpenID'"
                  @click="setOpenId(scope.row)"
                  :type="scope.row.is_openid ? 'primary' : 'danger'"
                  size="mini"
                  class="mini-button"
                  style="margin : 10px 0 0 0;"
                >{{scope.row.is_openid ? '还原OpenID' : '转换OpenID'}}</el-button>
                  <el-button
                  title="推送消息"
                  @click="openSetMessage(scope.row)"
                  type="primary"
                  size="mini"
                  class="mini-button"
                >推送消息</el-button>
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
      title="设置马甲用户"
      width="750px"
      :visible.sync="openSetVestUserDialog"
      append-to-body
      @close="form.uids=''"
    >
      <el-form label-width="150px" :model="form" ref="form">
        <el-form-item label="已存在的马甲id" v-if="vestIdTag">
          <template v-for="item in vestIdTag">
            <el-tag
              closable
              style="margin-right:10px"
              :key="item"
              :disable-transitions="false"
              @close="handleClose(item)"
            >{{item}}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="马甲用户">
          <el-input type="textarea" v-model="form.uids" placeholder="请输入马甲用户id，多个用户id用“,”隔开"></el-input>
        </el-form-item>
        <el-form-item label="所属团队">
          <el-select v-model="form.team" placeholder="请选择所属团队" style="width:99%">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openSetVestUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="setVestUser()">确 定</el-button>
      </div>
    </el-dialog>

        <el-dialog
      title="推送"
      width="750px"
      :visible.sync="messageDialog"
      append-to-body
      @close="form.uids=''"
    >
      <el-form label-width="150px" :model="form" ref="form">
        <el-form-item label="传输内容" v-if="vestIdTag">
          <template v-for="item in vestIdTag">
            <el-tag
              closable
              style="margin-right:10px"
              :key="item"
              :disable-transitions="false"
              @close="handleClose(item)"
            >{{item}}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="标题">
          <el-input type="text" v-model="mesaageForm.title"  placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea"  v-model="mesaageForm.content"  placeholder="内容"></el-input>
        </el-form-item>
        <el-form-item label="透传参数">
          <el-input type="text"  v-model="mesaageForm.tc"  placeholder="透传参数,默认正意"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="messageDialog = false">取 消</el-button>
        <el-button type="primary" @click="setMessage()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import citys from "../../utils/province.js";
export default {
  data() {
    return {
      loading: false,
      isShow: false,
      options:[],
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
        { label: "普通用户", name: "3" },
        { label: "马甲用户", name: "2" },
        { label: "马甲主号", name: "1" },
        { label: "全部", name: "0" }
      ],
      cityData: citys, //城市数据
      utype: "3", //用户类型
      user_id: "", //用户id
      username: "", //用户名
      status: "", //用户状态
      date: "", //日期
      sex: "",
      tel:"",//手机号
      city: [],
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      openSetVestUserDialog: false,
      messageDialog:false,
      vestIdTag: [], //马甲用户id
      form: {
        id: "",
        uids: "",
        team:"",
      },
      mesaageForm:{
        uid:"",
        title:"",
        content:"",
        tc:"正意",
      },
      uid: JSON.parse(localStorage.getItem("userinfo")).id
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
        .getUserlist({
          page: this.page,
          limit: this.limit,
          utype: this.utype,
          status: this.status,
          times: this.date,
          gender: this.sex,
          city: this.city,
          tel:this.tel,
          username: this.username,
          user_id: this.user_id
        })
        .then(res => {
          this.dataList = res.data || [];
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
    //展开行
    toogleExpand(row) {
      let $table = this.$refs.table;

      let $t = $table[this.utype];
      console.log($t);
      this.dataList.list.map(item => {
        if (row.id != item.id) {
          $t.toggleRowExpansion(item, false);
        }
      });
      $t.toggleRowExpansion(row);
    },

    handleClose(tag) {
      this.$api.delVestUsers({ mainId: this.form.id, id: tag }).then(res => {
        if (res.code) return;
        this.search();
        this.openSetVestUserDialog = true;
        this.vestIdTag.splice(this.vestIdTag.indexOf(tag), 1);
      });
    },

    //删除用户的马甲
    delVestUser(item) {
      this.$api
        .delVestUsers({
          id: item.id,
          mainId: item.mainId
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          if (res.code) return;
          this.search();
        });
    },

    // 停用用户
    userStop(id) {
      this.$confirm("确认进行该项操作吗?", "提示", { type: "warning" })
        .then(() => {
          this.$api
            .userStop({
              uid: id,
              result: "1"
            })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data);
              this.getDataList();
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    openSetVestUser(item) {
      this.openSetVestUserDialog = true;
      this.form.id = item.id;
      this.vestIdTag = item.vestId;
      this.form.team=item.belong;
      this.getTeam();
    },
    openSetMessage(item) {
      this.messageDialog = true;
      this.mesaageForm.uid = item.id;
    },
    setVestUser() {
      this.$api.setVestUser(this.form).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        if (res.code) return;
        this.openSetVestUserDialog = false;
        this.getDataList();
      });
    },
    setMessage(){
      this.$api.oneSendMessage(this.mesaageForm).then(res=>{
        this.$message[res.code ? "warning" : "success"](res.data.message);
        if (res.code) return;
        this.messageDialog = false;
      });
    },
    getTeam() {
      this.$api.getTeam().then(res => {
        this.options = res.data.list;
      });
    },

    //解除马甲商户的使用限制
    vestUserDel(id, status) {
      this.$api
        .vestUserDel({
          id: id,
          status: status
        })
        .then(res => {
          this.$message[res.code ? "warning" : "success"](res.data.message);
          this.search();
        });
    },
    tabClick(val) {
      this.utype = val.name;
      this.page = 1;
      this.getDataList();
    },
    returnHome() {
      this.page = 1;
      this.limit = 10;
      this.status = "";
      this.times = "";
      this.username = "";
      this.user_id = "";
      this.city = [];
      this.gender = "";
      this.tel="";
      this.getDataList();
      this.isShow = false;
    },
    setOpenId(item) {
      this.$confirm("确定要转换该用户的openid吗？")
        .then(_res => {
          this.$api
            .setOpenId({ uid: item.id, type: item.is_openid })
            .then(res => {
              this.$message[res.code ? "warning" : "success"](res.data.message);
              if (!res.code) this.getDataList();
            });
        })
        .catch(_res => {});
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
