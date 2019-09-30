import { fetchGet, fetchPost } from './fetch';

// {headers:{ 'Content-Type': 'multipart/form-data' }}
export default {
    //登录
    login(params) {
        return fetchPost('/admin/login', params)
    },
    checkLogin(params) {
        return fetchPost('/admin/checkUserLogin', params)
    },
    getVersions(params) {
        return fetchPost('/common/getVersions', params)
    },
    //获取数据统计
    getCount(params) {
        return fetchPost('/admin/adminCount', params)
    },
    //获取通知消息
    getNotify(params) {
        return fetchPost('/admin/getNotify', params)
    },

    /**
     * @用户管理
     * 获取用户列表
     * 查询列表
     * 停用，启用
     * 设置马甲用户
     * 解除马甲用户的使用限制
     * 转换用户的openid
     */
    getUserlist(params) {
        return fetchPost('/Client/userList', params)
    },
    userStop(params) {
        return fetchPost('/admin/userStop', params)
    },
    getVestInfo(params) {
        return fetchPost('/Client/getVestInfo', params)
    },
    vestUserDel(params) {
        return fetchPost('/Client/vestUserDel', params)
    },
    setOpenId(params) {
        return fetchPost('/Client/setOpenId', params)
    },

    //审核商户
    checkSupplier(params) {
        return fetchPost('/admin/checkSupplier', params)
    },

    //用户流水
    userFlow(params) {
        return fetchPost('/userflow/dataList', params)
    },
    setVestUser(params) {
        return fetchPost('/admin/setVestUser', params)
    },
    delVestUsers(params) {
        return fetchPost('/admin/delVestUsers', params)
    },
    /**
     * @需求管理
     * 获取需求列表
     * 二维码
     */
    getNeedList(params) {
        return fetchPost('/admin/getNeedUser', params)
    },
    transWx(params) {
        return fetchPost('/qrcode/createImQrcode', params)
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
     * @众筹商品
     * 众筹商品列表
     * 获取商品分类
     * 添加商品
     * 修改商品
     * 下架商品
     * 获取服务城市
     * */
    getCrowdList(params) {
        return fetchPost('/crowd/getCrowdList', params)
    },
    getGoodsCate(params) {
        return fetchPost('/goods/GoodsCate', params)
    },
    addCrowdGoods(params) {
        return fetchPost('/crowd/addCrowdGoods', params)
    },
    editCrowdGoods(params) {
        return fetchPost('/crowd/editCrowdGoods', params)
    },
    goodUpDown(params) {
        return fetchPost('/crowd/goodUpDown', params)
    },
    getCitys(params) {
        return fetchPost('/supplier/getCitys', params);
    },


    /**
     * @广告位管理 
     * 获取广告列表
     * 添加广告位
     * 修改广告位
     * 删除广告位
     * 广告类型
     * */
    getAdList(params) {
        return fetchPost('/ads/adsList', params)
    },
    addAd(params) {
        return fetchPost('/ads/adsAdd', params, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    editAd(params) {
        return fetchPost('/ads/adsEdit', params)
    },
    delAd(params) {
        return fetchPost('/ads/adsDelete', params)
    },
    adsType(params) {
        return fetchPost('/ads/getAdsType', params)
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
     * 
     * @param 资讯管理
     * 
     * 资讯列表
     * 添加资讯
     * 修改资讯
     * 删除资讯
     * 资讯类型
     */
    getCmsList(params) {
        return fetchPost('/cms/cmsList', params)
    },
    addCms(params) {
        return fetchPost('/cms/addCms', params)
    },
    editCms(params) {
        return fetchPost('/cms/editCms', params)
    },
    delCms(params) {
        return fetchPost('/cms/delCms', params)
    },
    geCmsType(params) {
        return fetchPost('/cms/cmsType', params)
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
    citySupplier(params) {
        return fetchPost('/supplier/findSupplier', params)
    },
    goodList(params) {
        return fetchPost('/supplier/countGoods', params)
    },
    guidesList(params) {
        return fetchPost('/supplier/countGuides', params)
    },




    /**
     * @订单管理
     * 订单列表
     * 删除订单
     * 马甲商户订单列表
     * 马甲商户id和商铺名称
     * 马甲商户的商品
     */
    getOrderList(params) {
        return fetchPost('/orders/adminOrdersList', params)
    },
    delOrder(params) {
        return fetchPost('/orders/OrdersDelete', params)
    },
    vestOrderList(params) {
        return fetchPost('/supplier/vestOrderList', params)
    },
    getVestSu(params) {
        return fetchPost('/supplier/getVestSu', params)
    },
    vestSuGoods(params) {
        return fetchPost('/supplier/vestSuGoods', params)
    },
    getVestGoods(params) {
        return fetchPost('/supplier/getVestGoods', params)
    },
    sendGoods(params) {
        return fetchPost('/orders/sh_express_add', params)
    },
    getExpress(params) {
        return fetchPost('/orders/getExpress', params)
    },

    /**
     * @售后管理
     * 售后列表
     */
    getSaleList(params) {
        return fetchPost('/after/suSaleList', params)
    },
    suProcess(params) {
        return fetchPost('/after/suProcess', params)
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
     * 
     * @招商管理
     * 招商列表
     * 删除招商
     * 
     */
    getInvest(params) {
        return fetchPost('/admin/getInvestment', params);
    },
    delInvest(params) {
        return fetchPost('/admin/delInvest', params);
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
        return fetchPost('/punish/punishType', params)
    },
    getPunishList(params) {
        return fetchPost('/punish/getPunishList', params)
    },
    delPunish(params) {
        return fetchPost('/ticket/TicketDelete', params)
    },
    addPunish(params) {
        return fetchPost('/punish/addPunish', params)
    },
    editPunish(params) {
        return fetchPost('/punish/checkPunish', params)
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
    //财务处理售后退款
    financeRefund(params) {
        return fetchPost('/refund/financeRefund', params)
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
     * 
     * 
     * 设置马甲用户
     * 获取路由
     * 设置角色路由权限
     * 获取角色路由权限
     * 设置版本
     * 获取版本
     * 设置允许用户在每月几号之间能修改银行卡信息
     * 获取允许用户在每月几号之间能修改银行卡信息
     * 设置清除已领取大礼包的专引师
     */
    getAdminInfo(params) {
        return fetchPost('/admin/getAdminInfo', params)
    },
    adminUpdateSu(params) {
        return fetchPost('/admin/batchPwd', params)
    },
    countDatas(params) {
        return fetchPost('/admin/countDatas', params)
    },
    billList(params) {
        return fetchPost('/orders/billList', params)
    },
    exportAdmin(params) {
        return fetchGet('/getorders/exportAdmin', params)
    },
    setVestUserInfo(params) {
        return fetchPost('/admin/setVestUserInfo', params)
    },
    setOneUserInfo(params) {
        return fetchPost('/admin/setOneUserInfo', params)
    },
    getRouting(params) {
        return fetchPost('/admin/getRouting', params)
    },
    setUserRouting(params) {
        return fetchPost('/admin/setUserRouting', params)
    },
    getUserRouting(params) {
        return fetchPost('/admin/getUserRouting', params)
    },
    setVersion(params) {
        return fetchPost('/admin/setVersion', params)
    },
    getVersion(params) {
        return fetchPost('/admin/getVersion', params)
    },
    setCardDate(params) {
        return fetchPost('/admin/setCardDate', params)
    },
    getCardDate(params) {
        return fetchPost('/admin/getCardDate', params)
    },
    setClear(params) {
        return fetchPost('/admin/clearGiftGuide', params)
    },


    /** 
     * 专引师退款
     */
    setRefund(params) {
        return fetchPost('/refund/setRefund', params)
    },

    /**
     * 投诉单列表
     * @param  params 
     */
    getReportsList(params) {
        return fetchPost('/report/getReportsList', params)
    },
    setReply(params) {
        return fetchPost('/report/setReply', params)
    },

    //个人流水
    userLiuShui(params) {
        return fetchPost('/admin/userLiuShui', params)
    },
}