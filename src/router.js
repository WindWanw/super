import Vue from 'vue'
import Router from 'vue-router'
const login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const noFound = () => import(/* webpackChunkName: "404" */ './views/404.vue')
const home = () => import(/* webpackChunkName: "home" */ './views/home.vue')
const dataStatistics = () => import(/* webpackChunkName: "dataStatistics" */ './views/dataStatistics.vue')
const userList = () => import(/* webpackChunkName: "userList" */ './views/userList.vue')

const agentMenage = () => import(/* webpackChunkName: "agentMenage" */ './views/agentMenage')
const agent = () => import(/* webpackChunkName: "agent" */ './views/agentMenage/agent.vue')

const sellerMenage = () => import(/* webpackChunkName: "sellerMenage" */ './views/sellerMenage')
const seller = () => import(/* webpackChunkName: "seller" */ './views/sellerMenage/seller.vue')

const checkMenage = () => import(/* webpackChunkName: "checkMenage" */ './views/checkMenage')
const agentSh = () => import(/* webpackChunkName: "agentSh" */ './views/checkMenage/agentSh.vue')
const sellerSh = () => import(/* webpackChunkName: "sellerSh" */ './views/checkMenage/sellerSh.vue')
const punish = () => import(/* webpackChunkName: "punish" */ './views/checkMenage/punish.vue')
const teacherSh = () => import(/* webpackChunkName: "teacherSh" */ './views/checkMenage/teacherSh.vue')

const order = () => import(/* webpackChunkName: "order" */ './views/order.vue')
const teacher = () => import(/* webpackChunkName: "teacher" */ './views/teacher.vue')
const ad = () => import(/* webpackChunkName: "ad" */ './views/ad.vue')
const systemArticle = () => import(/* webpackChunkName: "systenArticle" */ './views/systemArticle.vue')
const card = () => import(/* webpackChunkName: "card" */ './views/card.vue')
Vue.use(Router)



export const asyRouter = [
  {
    path: '/dataStatistics',
    name: 'dataStatistics',
    component: dataStatistics,
    meta: {
      name: '数据统计',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/userList',
    name: 'userList',
    component: userList,
    meta: {
      name: '用户管理',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/checkMenage',
    name: 'checkMenage',
    component: checkMenage,
    meta: {
      name: '审核管理',
      iconfont: 'el-icon-loading',
    },
    redirect: '/checkMenage/agent',
    children: [
      {
        path: '/checkMenage/agentSh',
        name: 'agentSh',
        component: agentSh,
        meta: {
          name: '代理商审核',
          iconfont: 'el-icon-loading',
        }
      },
      {
        path: '/checkMenage/sellerSh',
        name: 'sellerSh',
        component: sellerSh,
        meta: {
          name: '商户审核',
          iconfont: 'el-icon-loading',
        }
      },
      {
        path: '/checkMenage/teacherSh',
        name: 'teacherSh',
        component: teacherSh,
        meta: {
          name: '专引师审核',
          iconfont: 'el-icon-loading',
        }
      },
      {
        path: '/checkMenage/punish',
        name: 'punish',
        component: punish,
        meta: {
          name: '处罚单',
          iconfont: 'el-icon-loading',
        }
      },
    ]
  },

  {
    path: '/agentMenage',
    name: 'agentMenage',
    component: agentMenage,
    meta: {
      name: '代理商管理',
      iconfont: 'el-icon-loading',
    },
    redirect: '/agentMenage/agent',
    children: [
      {
        path: '/agentMenage/agent',
        name: 'agent',
        component: agent,
        meta: {
          name: '代理商列表',
          iconfont: 'el-icon-loading',
        }
      }
    ]
  },
  {
    path: '/sellerMenage',
    name: 'sellerMenage',
    component: sellerMenage,
    meta: {
      name: '商户管理',
      iconfont: 'el-icon-loading',
    },
    redirect: '/sellerMenage/seller',
    children: [
      {
        path: '/sellerMenage/seller',
        name: 'seller',
        component: seller,
        meta: {
          name: '商户列表',
          iconfont: 'el-icon-loading',
        }
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      name: '订单管理',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/ad',
    name: 'ad',
    component: ad,
    meta: {
      name: '广告位管理',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: teacher,
    meta: {
      name: '专引师管理',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/systemArticle',
    name: 'systemArticle',
    component: systemArticle,
    meta: {
      name: '系统文章管理',
      iconfont: 'el-icon-loading',
    }
  },
  {
    path: '/card',
    name: 'card',
    component: card,
    meta: {
      name: '代金券设置',
      iconfont: 'el-icon-loading',
    }
  },
]

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/dataStatistics',
      children: [
        ...asyRouter
      ]
    },
    {
      path: '*',
      component: noFound
    }
  ]
})
