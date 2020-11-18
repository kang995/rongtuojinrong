export default[
    // 合伙人注销账户
    {
        path:'/Cancel',
        name:'Cancel',
        meta:{
            title:'注销账号'
        }, 
        component:() =>import('../views/Unsubscribe/Partner/Cancel.vue')
    },
    //合伙人注销成功页面
    {
        path:'/PcertificationOk',
        name:'PcertificationOk',
        meta:{
            title:'实人认证'
        }, 
        component:() =>import('../views/Unsubscribe/Partner/PcertificationOk.vue')
    },
    //合伙人注销手机号验证Partnerphoto.vue
    {
        path:'/Partnerphoto',
        name:'Partnerphoto',
        meta:{
            title:'手机号验证'
        }, 
        component:() =>import('../views/Unsubscribe/Partner/Partnerphoto.vue')
    },
    {
        path:'/Protocol',
        name:'Protocol',
        meta:{
            title:'账号注销协议'
        },
        component:() =>import('../views/Unsubscribe/Partner/Protocol.vue')
    },
    {
        path:'/PcertificationFailure',
        name:'PcertificationFailure',
        meta:{
            title:'实人认证'
        },
        component:()=>import('../views/Unsubscribe/Partner/PcertificationFailure.vue')
    }
]