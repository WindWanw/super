const routeList=[
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/dataStatistics',
      children:[
        {
          path: '/dataStatistics',
          name: 'dataStatistics',
          component: dataStatistics,
          meta:{
            name:'数据统计',
            iconfont:'',
            rule:['admin','agent']
          }
        },
        {
          path: '/userList',
          name: 'userList',
          component: userList,
          meta:{
            name:'用户管理',
            iconfont:'',
            rule:['admin']
          }
        },
        {
          path: '/audit',
          name: 'audit',
          component: audit,
          meta:{
            name:'审核管理',
            iconfont:'',
            rule:['admin']
          }
        },
        {
          path: '/agent',
          name: 'agent',
          component: agent,
          meta:{
            name:'代理商管理',
            iconfont:'',
            rule:['admin']
          }
        },
        {
          path: '/userSetting',
          name: 'userSetting',
          component: userSetting,
          meta:{
            name:'用户设置',
            iconfont:'',
            rule:['admin','agent']
          }
        },
      ]
    },
  ]

  function routeFilter(type){
    console.log(type);
  }

export default routeFilter;