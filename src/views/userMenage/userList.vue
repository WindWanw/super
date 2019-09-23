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
          v-model="username"
          placeholder="请输入用户名"
          size="mini"
          style="width:200px"
          @keyup.enter.native="search"
        ></el-input>
        <el-input
          clearable
          v-model="city"
          placeholder="请输入城市名称"
          size="mini"
          style="width:200px;margin:0 10px"
          @keyup.enter.native="search"
        ></el-input>
        <el-select
          clearable
          v-model="sex"
          placeholder="请选择用户性别"
          size="mini"
          style="margin:0 10px"
          @keyup.enter.native="search"
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
        <el-select
          clearable
          v-model="status"
          placeholder="请选择用户类型"
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
          <el-table
            :data="dataList.list"
            stripe
            border
            v-loading="loading"
            ref="table"
            :height="height"
          >
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
            <el-table-column prop="username" label="用户名" align="center">
              <template slot-scope="scope">
                {{scope.row.username}}
                <div>{{scope.row.isVest | vestStatus}}</div>
              </template>
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
            <el-table-column prop="tel" label="手机号" align="center"></el-table-column>
            <el-table-column prop="coin" label="积分" align="center"></el-table-column>
            <el-table-column prop="exp" label="经验" align="center"></el-table-column>
            <el-table-column prop="card_price" label="卡卷金额（元）" align="center"></el-table-column>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openSetVestUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="setVestUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isShow: false,
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
      tabList: [{ label: "全部", name: "0" }, { label: "马甲主号", name: "1" }],
      utype: "0", //用户类型
      username: "", //用户名
      status: "", //用户状态
      date: "", //日期
      sex: "",
      city: "",
      dataList: [], //数据源
      page: 1, //页
      limit: 10, //条
      openSetVestUserDialog: false,
      vestIdTag: [], //马甲用户id
      form: {
        id: "",
        uids: ""
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
          username: this.username
        })
        .then(res => {
          this.dataList = res.data || [];
          this.height = 100;
          let t = res.data.total;
          if (t >= 10) {
            this.height = 750;
          } else if (t != 0) {
            this.height = t * 160;
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
    },
    setVestUser() {
      this.$api.setVestUser(this.form).then(res => {
        this.$message[res.code ? "warning" : "success"](res.data.message);
        if (res.code) return;
        this.openSetVestUserDialog = false;
        this.getDataList();
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
      this.city = "";
      this.gender = "";
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
