/*
 * @Author: your name
 * @Date: 2019-09-29 13:26:02
 * @LastEditTime: 2019-11-13 09:39:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\zy\super\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
const login = () =>
    import ( /* webpackChunkName: "login" */ './views/login.vue')
const noFound = () =>
    import ( /* webpackChunkName: "404" */ './views/404.vue')
const home = () =>
    import ( /* webpackChunkName: "home" */ './views/home.vue')

/******************************************数据统计***************************************************************/
const dataStatistics = () =>
    import ( /* webpackChunkName: "dataStatistics" */ './views/dataStatistics.vue')

/******************************************需求管理***************************************************************/
const needMenage = () =>
    import ( /* webpackChunkName: "needMenage" */ './views/needMenage')
const needList = () =>
    import ( /* webpackChunkName: "needList" */ './views/needMenage/needList.vue')
const keywords = () =>
    import ( /* webpackChunkName: "keywords" */ './views/needMenage/keywords.vue')
const needShs = () =>
    import ( /* webpackChunkName: "needShs" */ './views/needMenage/needShs.vue')

/******************************************用户管理***************************************************************/
const userMenage = () =>
    import ( /* webpackChunkName: "userMenage" */ './views/userMenage')
const userList = () =>
    import ( /* webpackChunkName: "userList" */ './views/userMenage/userList.vue')
const teacher = () =>
    import ( /* webpackChunkName: "teacher" */ './views/userMenage/teacher.vue')
const sellers = () =>
    import ( /* webpackChunkName: "sellers" */ './views/userMenage/sellers.vue')
const agents = () =>
    import ( /* webpackChunkName: "agents" */ './views/userMenage/agents.vue')
const operator = () =>
    import ( /* webpackChunkName: "operator" */ './views/userMenage/operator.vue')
const userRecord = () =>
    import ( /* webpackChunkName: "userRecord" */ './views/userMenage/userRecord.vue')
    /******************************************审核管理***************************************************************/
const checkMenage = () =>
    import ( /* webpackChunkName: "checkMenage" */ './views/checkMenage')
const agentSh = () =>
    import ( /* webpackChunkName: "agentSh" */ './views/checkMenage/agentSh.vue')
const sellerSh = () =>
    import ( /* webpackChunkName: "sellerSh" */ './views/checkMenage/sellerSh.vue')
const punish = () =>
    import ( /* webpackChunkName: "punish" */ './views/checkMenage/punish.vue')
const teacherSh = () =>
    import ( /* webpackChunkName: "teacherSh" */ './views/checkMenage/teacherSh.vue')
const reports = () =>
    import ( /* webpackChunkName: "reports" */ './views/checkMenage/reports.vue')
const identification = () =>
    import ( /* webpackChunkName: "identification" */ './views/checkMenage/identification.vue')
const needSh = () =>
    import ( /* webpackChunkName: "needSh" */ './views/checkMenage/needSh.vue')

/******************************************代理商管理***************************************************************/
const agentMenage = () =>
    import ( /* webpackChunkName: "agentMenage" */ './views/agentMenage')
const agent = () =>
    import ( /* webpackChunkName: "agent" */ './views/agentMenage/agent.vue')
const agentShs = () =>
    import ( /* webpackChunkName: "agentShs" */ './views/agentMenage/agentShs.vue')

/******************************************商户管理***************************************************************/
const sellerMenage = () =>
    import ( /* webpackChunkName: "sellerMenage" */ './views/sellerMenage')
const seller = () =>
    import ( /* webpackChunkName: "seller" */ './views/sellerMenage/seller.vue')
const sellerShs = () =>
    import ( /* webpackChunkName: "sellerShs" */ './views/sellerMenage/sellerShs.vue')

/******************************************马甲商户***************************************************************/
const vestSupplier = () =>
    import ( /* webpackChunkName: "vestSupplier" */ './views/vestSupplier')
const vestOrder = () =>
    import ( /* webpackChunkName: "vestOrder" */ './views/vestSupplier/vestOrder.vue')
const suGoods = () =>
    import ( /* webpackChunkName: "suGoods" */ './views/vestSupplier/suGoods.vue')
const vestSuSale = () =>
    import ( /* webpackChunkName: "suGoods" */ './views/vestSupplier/vestSuSale.vue')
const goods = () =>
    import ( /* webpackChunkName: "goods" */ './views/vestSupplier/goods.vue')

/******************************************计划生产***************************************************************/
const crowdfunding = () =>
    import ( /* webpackChunkName: "crowdfunding" */ './views/crowdfunding')
const goodsList = () =>
    import ( /* webpackChunkName: "goodsList" */ './views/crowdfunding/goodsList')

/******************************************财务管理***************************************************************/
const financeMenage = () =>
    import ( /* webpackChunkName: "financeMenage" */ './views/financeMenage')
const finance = () =>
    import ( /* webpackChunkName: "finance" */ './views/financeMenage/finance.vue')
const bill = () =>
    import ( /* webpackChunkName: "bill" */ './views/financeMenage/bill.vue')
const refund = () =>
    import ( /* webpackChunkName: "refund" */ './views/financeMenage/refund.vue')
const userbill = () =>
    import ( /* webpackChunkName: "bill" */ './views/financeMenage/userbill.vue')
const writeOff = () =>
    import ( /* webpackChunkName: "writeOff" */ './views/financeMenage/writeOff.vue')

/******************************************运营管理***************************************************************/
const operationMenage = () =>
    import ( /* webpackChunkName: "operationMenage" */ './views/operationMenage')
const ad = () =>
    import ( /* webpackChunkName: "ad" */ './views/operationMenage/ad.vue')
const systemArticle = () =>
    import ( /* webpackChunkName: "systenArticle" */ './views/operationMenage/systemArticle.vue')
const information = () =>
    import ( /* webpackChunkName: "information" */ './views/operationMenage/information.vue')

/******************************************日志管理***************************************************************/
const logManage = () =>
    import ( /* webpackChunkName: "logManage" */ './views/logManage')
const refundLog = () =>
    import ( /* webpackChunkName: "ad" */ './views/logManage/refundLog.vue')

/******************************************招商管理***************************************************************/
const investment = () =>
    import ( /* webpackChunkName: "investment" */ './views/investment.vue')
    /******************************************订单管理***************************************************************/
const order = () =>
    import ( /* webpackChunkName: "order" */ './views/order.vue')

/******************************************售后管理***************************************************************/
const sale = () =>
    import ( /* webpackChunkName: "sale" */ './views/sale.vue')


/******************************************代金券管理***************************************************************/
const card = () =>
    import ( /* webpackChunkName: "card" */ './views/card.vue')

/******************************************权限管理***************************************************************/
const authorization = () =>
    import ( /* webpackChunkName: "authorization" */ './views/authorization.vue')

/******************************************系统设置***************************************************************/
const userSetting = () =>
    import ( /* webpackChunkName: "userSetting" */ './views/userSetting.vue')

/******************************************运营管理***************************************************************/
Vue.use(Router)



export const asyRouter = [{
        path: '/dataStatistics',
        name: 'dataStatistics',
        component: dataStatistics,
        meta: {
            name: '数据统计',
            iconfont: 'iconfont shujutongji',
            needLogin: true, //需要登录
        }
    },
    {
        path: '/needMenage',
        name: 'needMenage',
        component: needMenage,
        meta: {
            name: '需求管理',
            iconfont: 'iconfont shouhou-',
            needLogin: true, //需要登录
        },
        redirect: '/needMenage/needList',
        children: [{
                path: '/needMenage/needList',
                name: 'needList',
                component: needList,
                meta: {
                    name: '回复需求',
                    iconfont: 'iconfont shoujihao1',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/needMenage/keywords',
                name: 'keywords',
                component: keywords,
                meta: {
                    name: '需求关键词',
                    iconfont: 'iconfont qianyue',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/needMenage/needShs',
                name: 'needShs',
                component: needShs,
                meta: {
                    name: '需求审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/userMenage',
        name: 'userMenage',
        component: userMenage,
        meta: {
            name: '用户管理',
            iconfont: 'iconfont yonghu5',
            needLogin: true, //需要登录
        },
        redirect: '/userMenage/userList',
        children: [{
                path: '/userMenage/userList',
                name: 'userList',
                component: userList,
                meta: {
                    name: '用户管理',
                    iconfont: 'iconfont yonghu1',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userMenage/userRecord',
                name: 'userRecord',
                component: userRecord,
                meta: {
                    name: '用户记录',
                    iconfont: 'iconfont yonghu1',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userMenage/teacher',
                name: 'teacher',
                component: teacher,
                meta: {
                    name: '专引师管理',
                    iconfont: 'iconfont yonghu5',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userMenage/sellers',
                name: 'sellers',
                component: sellers,
                meta: {
                    name: '商户管理',
                    iconfont: 'iconfont yonghu5',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userMenage/agents',
                name: 'agents',
                component: agents,
                meta: {
                    name: '代理商管理',
                    iconfont: 'iconfont yonghu5',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userMenage/operator',
                name: 'operator',
                component: operator,
                meta: {
                    name: '运营者管理',
                    iconfont: 'iconfont renshu',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/checkMenage',
        name: 'checkMenage',
        component: checkMenage,
        meta: {
            name: '审核管理',
            iconfont: 'iconfont examine',
            needLogin: true, //需要登录
        },
        redirect: '/checkMenage/agent',
        children: [{
                path: '/checkMenage/agentSh',
                name: 'agentSh',
                component: agentSh,
                meta: {
                    name: '代理商审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/sellerSh',
                name: 'sellerSh',
                component: sellerSh,
                meta: {
                    name: '商户审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/teacherSh',
                name: 'teacherSh',
                component: teacherSh,
                meta: {
                    name: '专引师审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/punish',
                name: 'punish',
                component: punish,
                meta: {
                    name: '处罚单',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/reports',
                name: 'reports',
                component: reports,
                meta: {
                    name: '投诉单',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/needSh',
                name: 'needSh',
                component: needSh,
                meta: {
                    name: '需求审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/checkMenage/identification',
                name: 'identification',
                component: identification,
                meta: {
                    name: '认证审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
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
            iconfont: 'iconfont dailishang',
            needLogin: true, //需要登录
        },
        redirect: '/agentMenage/agent',
        children: [{
                path: '/agentMenage/agent',
                name: 'agent',
                component: agent,
                meta: {
                    name: '代理商列表',
                    iconfont: 'iconfont yonghu3',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/agentMenage/agentShs',
                name: 'agentShs',
                component: agentShs,
                meta: {
                    name: '代理商审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/sellerMenage',
        name: 'sellerMenage',
        component: sellerMenage,
        meta: {
            name: '商户管理',
            iconfont: 'iconfont dianpu1',
            needLogin: true, //需要登录
        },
        redirect: '/sellerMenage/seller',
        children: [{
                path: '/sellerMenage/seller',
                name: 'seller',
                component: seller,
                meta: {
                    name: '商户列表',
                    iconfont: 'iconfont yonghu3',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/sellerMenage/sellerShs',
                name: 'sellerShs',
                component: sellerShs,
                meta: {
                    name: '商户审核',
                    iconfont: 'iconfont shenhe',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/vestSupplier',
        name: 'vestSupplier',
        component: vestSupplier,
        meta: {
            name: '马甲商户管理',
            iconfont: 'iconfont dianpu',
            needLogin: true, //需要登录
        },
        redirect: '/vestSupplier/vestOrder',
        children: [{
                path: '/vestSupplier/vestOrder',
                name: 'vestOrder',
                component: vestOrder,
                meta: {
                    name: '订单管理',
                    iconfont: 'iconfont zongdingdanshu',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/vestSupplier/suGoods',
                name: 'suGoods',
                component: suGoods,
                meta: {
                    name: '商户管理',
                    iconfont: 'iconfont zongdingdanshu',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/vestSupplier/goods',
                name: 'goods',
                component: goods,
                meta: {
                    name: '商品管理',
                    iconfont: 'iconfont zongdingdanshu',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/vestSupplier/vestSuSale',
                name: 'vestSuSale',
                component: vestSuSale,
                meta: {
                    name: '售后管理',
                    iconfont: 'iconfont zongdingdanshu',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/crowdfunding',
        name: 'crowdfunding',
        component: crowdfunding,
        meta: {
            name: '计划生产',
            iconfont: 'iconfont zhongchoushangpin',
            needLogin: true, //需要登录
        },
        redirect: '/crowdfunding',
        children: [{
            path: '/crowdfunding/goodsList',
            name: 'goodsList',
            component: goodsList,
            meta: {
                name: '商品管理',
                iconfont: 'iconfont icon_caigoushuliang',
                needLogin: true, //需要登录
            }
        }, ]
    },
    {
        path: '/financeMenage',
        name: 'financeMenage',
        component: financeMenage,
        meta: {
            name: '财务管理',
            iconfont: 'iconfont shouru1',
            needLogin: true, //需要登录
        },
        redirect: '/financeMenage/finance',
        children: [{
                path: '/finance',
                name: 'finance',
                component: finance,
                meta: {
                    name: '财务中心',
                    iconfont: 'iconfont icon-test',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/bill',
                name: 'bill',
                component: bill,
                meta: {
                    name: '账单流水',
                    iconfont: 'iconfont icon-test',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/refund',
                name: 'refund',
                component: refund,
                meta: {
                    name: '售后退款',
                    iconfont: 'iconfont shouru1',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/userbill',
                name: 'userbill',
                component: userbill,
                meta: {
                    name: '个人流水',
                    iconfont: 'iconfont shouru1',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/writeOff',
                name: 'writeOff',
                component: writeOff,
                meta: {
                    name: '核销券',
                    iconfont: 'iconfont shouru1',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/operationMenage',
        name: 'operationMenage',
        component: operationMenage,
        meta: {
            name: '运营管理',
            iconfont: 'iconfont zhaoshang2',
            needLogin: true, //需要登录
        },
        redirect: '/operationMenage/ad',
        children: [{
                path: '/ad',
                name: 'ad',
                component: ad,
                meta: {
                    name: '广告位管理',
                    iconfont: 'iconfont guanggao',
                    needLogin: true, //需要登录
                }
            },

            {
                path: '/systemArticle',
                name: 'systemArticle',
                component: systemArticle,
                meta: {
                    name: '系统文章管理',
                    iconfont: 'iconfont navicon-wzgl',
                    needLogin: true, //需要登录
                }
            },
            {
                path: '/information',
                name: 'information',
                component: information,
                meta: {
                    name: '资讯管理',
                    iconfont: 'iconfont zixun1',
                    needLogin: true, //需要登录
                }
            },
        ]
    },
    {
        path: '/logManage',
        name: 'logManage',
        component: logManage,
        meta: {
            name: '日志管理',
            iconfont: 'iconfont rizhi1',
            needLogin: true, //需要登录
        },
        redirect: '/logManage/refundLog',
        children: [{
            path: '/refundLog',
            name: 'refundLog',
            component: refundLog,
            meta: {
                name: '退款日志',
                iconfont: 'iconfont ccgl-tongbucaozuorizhi-5',
                needLogin: true, //需要登录
            }
        }, ]
    },
    {
        path: '/investment',
        name: 'investment',
        component: investment,
        meta: {
            name: '招商管理',
            iconfont: 'iconfont zhaoshang',
            needLogin: true, //需要登录
        }
    },
    {
        path: '/order',
        name: 'order',
        component: order,
        meta: {
            name: '订单管理',
            iconfont: 'iconfont zongdingdanshu',
            needLogin: true, //需要登录
        }
    },

    {
        path: '/sale',
        name: 'sale',
        component: sale,
        meta: {
            name: '售后管理',
            iconfont: 'iconfont shouhou',
            needLogin: true, //需要登录
        }
    },
    {
        path: '/card',
        name: 'card',
        component: card,
        meta: {
            name: '代金券设置',
            iconfont: 'iconfont voucher',
            needLogin: true, //需要登录
        }
    },
    {
        path: '/authorization',
        name: 'authorization',
        component: authorization,
        meta: {
            name: '权限管理',
            iconfont: 'iconfont ic_opt_feature',
            needLogin: true, //需要登录
        }
    },
    {
        path: '/userSetting',
        name: 'userSetting',
        component: userSetting,
        meta: {
            name: '设置',
            iconfont: 'iconfont icon-test1',
            needLogin: true, //需要登录
        }
    },
]

const router = new Router({
        routes: [{
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
    // 全局路由守卫
router.beforeEach((to, from, next) => {
    let isLogin = localStorage.getItem('token') // 判断是否登录，本地存储有用户数据则视为已经登录
    if (to.meta.needLogin) { // 判断该路由是否需要登录权限
        if (isLogin) { // 判断是否已经登录
            next()
        } else { //未登录，传递当前路径过去
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})

export default router