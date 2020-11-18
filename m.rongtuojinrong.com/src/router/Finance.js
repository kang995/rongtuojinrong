export default[
    //融托金融注销账户获取验证码-未实名
    {
        path:'/finGetCode',
        name:'finGetCode',
        meta:{
            title:'手机号验证'
        },
        component:() => import('../views/Unsubscribe/Finance/finGetCode.vue')
    },
    //融托金融注销账户获取验证码-已实名
    {
        path: '/CodeSucess',
        name: 'codesucess',
        meta:{
            title:'手机号验证'
        },        
        component: () => import('../views/Unsubscribe/Finance/finGetCodeSucess.vue') 
    },
    // 注销账号失败
    {
        path:'/LogoutFailed',
        name:'logoutfailed',
        meta:{
            title:'注销账号'
        },         
        component:() => import('../views/Unsubscribe/Finance/LogoutFailed.vue')
    },
    // 实人认证失败
    {
        path:'/AuthenticationFailure',
        name:'authenticationfailure',
        meta:{
            title:'实人认证'
        },         
        component:()=>import('../views/Unsubscribe/Finance/AuthenticationFailure.vue')
    },
    //注销账户首页
    {
        path: '/logoutindex',
        name: 'logoutindex',
        meta:{
            title:'注销账号'
        },        
        component: () => import('../views/Unsubscribe/Finance/Logoutindex.vue') 
    },
    //注销账户协议
    {
        path: '/Agreement',
        name: 'Agreement',
        meta:{
            title:'注销协议'
        },         
        component: () => import('../views/Unsubscribe/Finance/Agreement.vue') 
    },
    //实人认证成功
    {
        path: '/AuthenticationOk',
        name: 'AuthenticationOk',
        meta:{
            title:'注销账号'
        },         
        component: () => import('../views/Unsubscribe/Finance/AuthenticationOk.vue')  
    },

]