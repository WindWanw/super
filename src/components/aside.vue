<template>
  <el-menu
    :default-active="active"
    :router="true"
    unique-opened
    class="el-menu-vertical-demo"
    :collapse="collapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 一级菜单 -->
    <template v-for="item in asideList">
      <el-submenu
        v-if="item.children && item.children.length"
        :index="item.path"
        :key="item.path"
        :hidden="(admin !=1 && path.length!=0 && path.indexOf(item.name) ==-1)"
      >
        <template slot="title">
          <i :class="item.meta.iconfont"></i>
          <span>{{item.meta.name}}</span>
        </template>

        <!-- 二级菜单 -->
        <template v-for="itemChild in item.children">
          <el-submenu
            v-if="itemChild.children && itemChild.children.length"
            :index="itemChild.path"
            :key="itemChild.path"
          >
            <template slot="title">
              <i :class="itemChild.meta.iconfont"></i>
              <span>{{itemChild.meta.name}}</span>
            </template>

            <!-- 三级菜单 -->
            <el-menu-item
              v-for="itemChild_Child in itemChild.children"
              :index="itemChild_Child.path"
              :key="itemChild_Child.path"
            >
              <i :class="itemChild_Child.meta.iconfont"></i>
              <span slot="title">{{itemChild_Child.meta.name}}</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item
            v-else
            :index="itemChild.path"
            :key="itemChild.path"
            :hidden="(admin !=1 && path.length!=0 && path.indexOf(itemChild.name) ==-1)"
          >
            <i :class="itemChild.meta.iconfont"></i>

            <span slot="title">
              <el-badge
                :value="getNum(itemChild.name)"
                :max="99"
                class="item"
                :hidden="check.indexOf(itemChild.name) ==-1 || getNum(itemChild.name)==0"
              >{{itemChild.meta.name}}</el-badge>
            </span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-menu-item
        v-else
        :index="item.path"
        :key="item.path"
        :hidden="(admin !=1 && path.length!=0 && path.indexOf(item.name) ==-1)"
      >
        <i :class="item.meta.iconfont"></i>
        <span slot="title">{{item.meta.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  props: ["collapse"],
  data() {
    return {
      active: this.$route.path,
      path: [],
      admin: JSON.parse(localStorage.getItem("userinfo")).id || ""
    };
  },
  methods: {
    setPath() {
      var p = localStorage.getItem("path");

      this.path = p ? p.split(",") : [];
    },
    getNum(name) {
      if (this.check.indexOf(name) != -1) {
        switch (name) {
          case "agentSh":
            return this.agent_check_num;
            break;
          case "agentShs":
            return this.agent_check_num;
            break;
          case "sellerSh":
            return this.supplier_check_num;
            break;
          case "sellerShs":
            return this.supplier_check_num;
            break;
          case "teacherSh":
            return this.guide_check_num;
            break;
          case "punish":
            return this.punish_check_num;
            break;
          case "reports":
            return this.report_check_num;
            break;
          case "needSh":
            return this.need_check_num;
            break;
          case "needShs":
            return this.need_check_num;
            break;
          case "identification":
            return this.identify_check_num;
            break;
        }
      }
    }
  },
  computed: {
    agent_check_num() {
      return this.$store.state.agent_check_num;
    },
    supplier_check_num() {
      return this.$store.state.supplier_check_num;
    },
    guide_check_num() {
      return this.$store.state.guide_check_num;
    },
    punish_check_num() {
      return this.$store.state.punish_check_num;
    },
    report_check_num() {
      return this.$store.state.report_check_num;
    },
    need_check_num() {
      return this.$store.state.need_check_num;
    },
    identify_check_num() {
      return this.$store.state.identify_check_num;
    },
    check() {
      return this.$store.getters.check;
    },
    asideList() {
      return this.$store.getters.asideList;
    }
  },
  watch: {
    $route(to, from) {
      this.active = this.$route.path;
    }
  },
  components: {},
  created() {
    this.active = this.$route.path;
    this.setPath();
  }
};
</script>

<style>
.el-menu {
  height: 100%;
  /* border-right: none; */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.el-menu-item i {
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}
li i {
  padding: 0 10px;
  box-sizing: border-box;
}
.el-badge__content.is-fixed {
  top: 16px;
  right: 1px;
}
</style>
