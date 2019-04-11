import Vue from 'vue'
import Vuex from 'vuex'
import {asyRouter} from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList:[],//浏览器tab页
    asideList:asyRouter,//侧边栏
  },
  getters:{
    menuList(state){
      return state.menuList;
    },
    asideList(state){
      return state.asideList;
    },
  },
  mutations: {
    // 添加标签
    ADD_TAB(state,data){
      if(state.menuList.some(item=>item.path===data.path)) return;
      // if(state.menuList.length>9){
      //   state.menuList.splice(0,1);
      // }
      state.menuList.push({
        name:data.meta.name,
        path:data.path
      })
    },
    // 删除标签
    DEL_TAB(state,data){
      state.menuList.forEach(item=>{
        if(item.path===data.path){
         state.menuList.splice(state.menuList.indexOf(item),1);
        }
      })
    },
   //添加侧边栏
   SET_ASIDE_LIST(state,data){

   }
    
    
    
  },
  actions: {
    addTab(context,data){
      context.commit('ADD_TAB',data);
    },
    delTab(context,data){
      return new Promise((resolve,reject)=>{
        context.commit('DEL_TAB',data);
         resolve(context.state.menuList)
      })
    },
    
  }
})
