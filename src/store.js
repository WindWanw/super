import Vue from 'vue'
import Vuex from 'vuex'
import { asyRouter } from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menuList: [], //浏览器tab页
        asideList: asyRouter, //侧边栏
        agent_check_num: 0, //代理商审核
        supplier_check_num: 0, //商户审核
        guide_check_num: 0, //专引师审核
        punish_check_num: 0, //处罚单审核
        report_check_num: 0, //投诉单
        need_check_num: 0, //需求审核
        identify_check_num: 0, //认证审核

        check: ["agentSh", "sellerSh", "teacherSh", "punish", "reports", "needSh", "identification"], //需要显示的
    },
    getters: {
        menuList(state) {
            return state.menuList;
        },
        asideList(state) {
            return state.asideList;
        },
        check(state) {
            return state.check;
        }
    },
    mutations: {
        // 添加标签
        ADD_TAB(state, data) {
            if (state.menuList.some(item => item.path === data.path)) return;
            // if(state.menuList.length>9){
            //   state.menuList.splice(0,1);
            // }
            state.menuList.push({
                name: data.meta.name,
                path: data.path
            })
        },
        // 删除标签
        DEL_TAB(state, data) {
            state.menuList.forEach(item => {
                if (item.path === data.path) {
                    state.menuList.splice(state.menuList.indexOf(item), 1);
                }
            })
        },
        //添加侧边栏
        SET_ASIDE_LIST(state, data) {

        },
        UPDATE_AGENT_CHECK_NUM(state, num) {
            state.agent_check_num = num
        },
        UPDATE_SUPPLIER_CHECK_NUM(state, num) {
            state.supplier_check_num = num
        },
        UPDATE_GUIDE_CHECK_NUM(state, num) {
            state.guide_check_num = num
        },
        UPDATE_PUNISH_CHECK_NUM(state, num) {
            state.punish_check_num = num
        },
        UPDATE_REPORT_CHECK_NUM(state, num) {
            state.report_check_num = num
        },
        UPDATE_NEED_CHECK_NUM(state, num) {
            state.need_check_num = num
        },
        UPDATE_IDENTIFY_CHECK_NUM(state, num) {
            state.identify_check_num = num
        },
    },
    actions: {
        addTab(context, data) {
            context.commit('ADD_TAB', data);
        },
        delTab(context, data) {
            return new Promise((resolve, reject) => {
                context.commit('DEL_TAB', data);
                resolve(context.state.menuList)
            })
        },

    }
})