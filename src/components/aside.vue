<template>
  <el-menu :default-active="active" :router="true"
             unique-opened class="el-menu-vertical-demo" :collapse="collapse">
    <!-- 一级菜单 -->
    <template v-for="item in asideList">
      <el-submenu v-if="item.children && item.children.length" :index="item.path" :key="item.path"  :hidden="(admin !=1 && path.length!=0 && path.indexOf(item.name) ==-1)">
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

          <el-menu-item v-else :index="itemChild.path" :key="itemChild.path" :hidden="(admin !=1 && path.length!=0 && path.indexOf(itemChild.name) ==-1)">
            <i :class="itemChild.meta.iconfont"></i>
            <span slot="title">{{itemChild.meta.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-menu-item v-else :index="item.path" :key="item.path" :hidden="(admin !=1 && path.length!=0 && path.indexOf(item.name) ==-1)">
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
      active:this.$route.path,
      path:[],
      admin: JSON.parse(localStorage.getItem("userinfo")).id || "",
    }
  },
  methods:{

    setPath(){
      var p=localStorage.getItem("path");

      this.path=p.split(",")

    }
    
  },
  computed:{
    asideList(){
      return this.$store.getters.asideList;
    }
  },
  watch:{
    '$route'(to,from){
      this.active = this.$route.path;
    }
  },
  components: {},
  created(){
    this.active=this.$route.path;
    this.setPath()
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
</style>
