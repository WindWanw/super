import {fetchGet,fetchPost} from './fetch';

// {headers:{ 'Content-Type': 'multipart/form-data' }}
export default{
    //登录
    login(params){
        return fetchPost('/admin/login',params)
    },
    //获取数据统计
    getCount(params){
        return fetchPost('/admin/adminCount',params)
    },
    //获取通知消息
    getMessageList(params){
        return fetchPost('/admin/messageAudit',params)
    },

    /**
     * 用户管理
     * 获取用户列表
     * 查询列表
     * 停用，启用
     */
    getUserlist(params){
        return fetchPost('/Client/userList',params)
    },
    userStop(params){
        return fetchPost('/admin/userStop',params)
    },


    /**
     * 代理商管理
     * 获取列表
     * 添加修改代理商
     * 停用，启用
     * 代理商审核列表（status:2）
     */
    getAgentList(params){
        return fetchPost('/Agent/agentList',params)
    },
    addAgent(params){
        return fetchPost('/Agent/registAgent',params)
    },
    editAgent(params){
        return fetchPost('/Agent/agentUpdate',params)
    },
    



    /**
     * 广告位管理 
     * 获取广告列表
     * 添加广告位
     * 修改广告位
     * 删除广告位
     * */
    getAdList(params){
        return fetchPost('/ads/AdsList',params)
    },
    addAd(params){
        return fetchPost('/ads/AdsAdd',params,{headers:{ 'Content-Type': 'multipart/form-data' }})
    },
    editAd(params){
        return fetchPost('/ads/AdsEdit',params)
    },
    delAd(params){
        return fetchPost('/ads/AdsDelete',params)
    },

    /**系统文章管理
     * 获取系统文章列表
     * 添加系统文章
     * 修改系统文章
     * 删除系统文章
     */
    getArticleList(params){
        return fetchPost('/sys_articles/SysArticlesList',params)
    },
    addArticle(params){
        return fetchPost('/sys_articles/SysArticlesAdd',params)
    },
    editArticle(params){
        return fetchPost('/sys_articles/SysArticlesEdit',params)
    },
    delArticle(params){
        return fetchPost('/sys_articles/SysArticlesDelete',params)
    },



    /**
     * 商户管理
     * 商户列表
     * 添加商户
     * 修改商户
     * 删除商户
     * 商户审核列表(status=0)
     */
    getSellerList(params){
        return fetchPost('/supplier/supplierList',params)
    },
    addSeller(params){
        return fetchPost('/supplier/supplierAdd',params)
    },
    editSeller(params){
        return fetchPost('/supplier/suplierUpdate',params)
    },
    delSeller(params){
        return fetchPost('/supplier/suplierDel',params)
    },


    /**
     * 订单管理
     * 订单列表
     * 删除订单
     */
    getOrderList(params){
        return fetchPost('/orders/OrdersList',params)
    },
    delOrder(params){
        return fetchPost('/orders/OrdersDelete',params)
    },

    /**
     * 专引师管理
     * 
     * 专引师列表
     * 新增专引师
     * 编辑专引师
     * 删除专引师
     */
    getGuideList(params){
        return fetchPost('/guide/guideList',params)
    },
    delGuide(params){
        return fetchPost('/guide/delGuide',params)
    },

    /**
     * 代金券
     * 列表
     * 添加
     * 修改
     * 查询
     */
    getCardList(params){
        return fetchPost('/card/cardList',params)
    },
   


    /**
     * 处罚单
     * 列表
     * 删除
     * 查询
     */
    getPunishList(params){
        return fetchPost('/ticket/TicketList',params)
    },
    delPunish(params){
        return fetchPost('/ticket/TicketDelete',params)
    },

}