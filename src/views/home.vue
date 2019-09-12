<template>
  <div id="home">
    <div id="header">
      <Header @changeCollapse="changeCollapse"></Header>
    </div>
    <div id="main">
      <div id="aside">
        <Aside :collapse="collapse"></Aside>
      </div>
      <div id="content">
        <div id="content_menu">
          <Menu></Menu>
        </div>
        <div id="content_main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header";
import Aside from "@/components/aside";
import Menu from "@/components/menu";
export default {
  data() {
    return {
      collapse: false, //侧边栏展开收起状态
      order_num: 0,
      new_num: 0,
      info: ""
    };
  },
  components: { Header, Aside, Menu },
  methods: {
    //由子组件触发
    changeCollapse() {
      this.collapse = !this.collapse;
    },
    getOrderNotify() {
      let that = this;
      this.$api.getNotify().then(res => {
        if (res.data.num > that.order_num) {
          that.new_num = res.data.num - that.order_num;
          that.info = res.data.message;
          that.setNotify(); //弹窗提醒
        }
        that.order_num = res.data.num;
      });

      setTimeout(res => {
        that.getOrderNotify();
      }, 600000);
    },
    setNotify() {
      let that = this;
      that.getAudio(that.info);
      that.$notify({
        title: "新的订单",
        message: "您有" + that.new_num + "条订单等待处理，请注意查收",
        iconClass: "iconfont ic_wait",
        offset: 50,
        duration: 5000,
        onClick: function() {
          that.$router.replace("/vestSupplier/vestOrder?status=2");
        }
      });
    },
    getAudio(str) {
      var url = 
      "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=" +
      encodeURI(str);
      var audio = new Audio(url);
      console.log(audio);
      audio.load();
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.play();
          })
          .catch(() => {});
      }
      // new Audio(url).play();
    }
  },
  created() {
    this.getOrderNotify();
  }
};
</script>
<style>
#home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1024px;
}
#main {
  flex: 1;
  display: flex;
}
#content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f1f2f7;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
#content_menu {
  position: absolute;
  width: 100%;
}
#content_main {
  top: 60px;
  position: absolute;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
}
</style>
