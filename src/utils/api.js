import { fetchGet, fetchPost } from './fetch';

// {headers:{ 'Content-Type': 'multipart/form-data' }}
export default {
    //登录
    login(params) {
        return fetchPost('/admin/login', params)
    },
    //获取数据统计
    getCount(params) {
        return fetchPost('/admin/adminCount', params)
    },
    //获取通知消息
    getMessageList(params) {
        return fetchPost('/admin/messageAudit', params)
    },

    /**
     * @用户管理
     * 获取用户列表
     * 查询列表
     * 停用，启用
     */
    getUserlist(params) {
        return fetchPost('/Client/userList', params)
    },
    userStop(params) {
        return fetchPost('/admin/userStop', params)
    },
    //审核商户
    checkSupplier(params) {
        return fetchPost('/admin/checkSupplier', params)
    },


    /**
     * @代理商管理
     * 获取列表
     * 添加修改代理商
     * 停用，启用
     * 代理商审核列表（status:2）
     */
    getAgentList(params) {
        return fetchPost('/Agent/agentList', params)
    },
    addAgent(params) {
        return fetchPost('/Agent/registAgent', params)
    },
    editAgent(params) {
        return fetchPost('/Agent/agentUpdate', params)
    },




    /**
     * @广告位管理 
     * 获取广告列表
     * 添加广告位
     * 修改广告位
     * 删除广告位
     * */
    getAdList(params) {
        return fetchPost('/ads/AdsList', params)
    },
    addAd(params) {
        return fetchPost('/ads/AdsAdd', params, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    editAd(params) {
        return fetchPost('/ads/AdsEdit', params)
    },
    delAd(params) {
        return fetchPost('/ads/AdsDelete', params)
    },

    /**
     * @系统文章管理
     * 获取系统文章列表
     * 添加系统文章
     * 修改系统文章
     * 删除系统文章
     */
    getArticleList(params) {
        return fetchPost('/sys_articles/SysArticlesList', params)
    },
    addArticle(params) {
        return fetchPost('/sys_articles/SysArticlesAdd', params)
    },
    editArticle(params) {
        return fetchPost('/sys_articles/SysArticlesEdit', params)
    },
    delArticle(params) {
        return fetchPost('/sys_articles/SysArticlesDelete', params)
    },
    getDataTypeList(params) {
        return fetchPost('/sys_articles/SysArticleType', params)
    },



    /**
     * @商户管理
     * 商户列表
     * 添加商户
     * 修改商户
     * 删除商户
     * 商户审核列表(status=0)
     */
    getSellerList(params) {
        return fetchPost('/supplier/supplierAdminList', params)
    },
    addSeller(params) {
        return fetchPost('/supplier/supplierAdminAdd', params)
    },
    editSeller(params) {
        return fetchPost('/supplier/supplierAdminUpdate', params)
    },
    delSeller(params) {
        return fetchPost('/supplier/supplierAdminDel', params)
    },


    /**
     * @订单管理
     * 订单列表
     * 删除订单
     */
    getOrderList(params) {
        return fetchPost('/orders/adminOrdersList', params)
    },
    delOrder(params) {
        return fetchPost('/orders/OrdersDelete', params)
    },

    /**
     * @专引师管理
     * 专引师列表
     */
    getGuideList(params) {
        return fetchPost('/guide/showGuideList', params)
    },
    guideStop(params) {
        return fetchPost('/guide/guideStop', params)
    },



    /**
     * @代金券管理
     * 获取列表
     */
    getCardList(params) {
        return fetchPost('/card/cardList', params)
    },



    /**
     * @处罚单管理
     * 处罚类型列表
     * 获取列表
     * 删除
     * 处罚
     * 审核
     */
    getPunishType(params) {
        return fetchPost('/ticket/Ticket_Type', params)
    },
    getPunishList(params) {
        return fetchPost('/ticket/TicketList', params)
    },
    delPunish(params) {
        return fetchPost('/ticket/TicketDelete', params)
    },
    addPunish(params) {
        return fetchPost('/ticket/TicketAdd', params)
    },
    editPunish(params) {
        return fetchPost('/ticket/TicketEdit', params)
    },

    /**
     * @专引师管理
     * 财务中心列表
     */
    getWithdrawList(params) {
        return fetchPost('/finance/withdrawList', params)
    },
    passWithdraw(params) {
        return fetchPost('/finance/passWithdraw', params)
    },
    blowWithdraw(params) {
        return fetchPost('/finance/blowWithdraw', params)
    },
    payWithdraw(params) {
        return fetchPost('/finance/payWithdraw', params)
    },
    unquaWithdraw(params) {
        return fetchPost('/finance/unquaWithdraw', params)
    },

    /**
     * @权限管理
     * 权限类型列表
     * 权限角色添加
     * 角色列表
     * 删除角色
     * 修改密码
     * 发送短信
     */
    getAuthGenre(params) {
        return fetchPost('/admin/authGenre', params)
    },
    authAdd(params) {
        return fetchPost('/admin/authAdd', params)
    },
    getAuthList(params) {
        return fetchPost('/admin/authList', params)
    },
    delAdmin(params) {
        return fetchPost('/admin/delAdmin', params)
    },
    editAdminPassword(params) {
        return fetchPost('/admin/editAdminPassword', params)
    },
    sendSms(params) {
        return fetchPost('/common/sendsms', params)
    },

    /**
     * @用户设置
     * 用户信息
     * 修改密码
     * 发送短信
     */
    getAdminInfo(params) {
        return fetchPost('/admin/getAdminInfo', params)
    },
}