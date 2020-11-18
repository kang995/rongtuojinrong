import Vue from 'vue'
import Router from 'vue-router'
import Finance from './Finance.js'
import Partner from './Partner.js'
Vue.use(Router)


export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...Finance,//金融注销路由
    ...Partner,
    //1.首页
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/Home.vue'),
    },
    //客服页
    {
      path: '/service',
      name: 'service',
      component: () => import('../views/Home/service/service.vue')
    },
    //客服-微信
    {
      path: '/weixin',
      name: 'weixin',
      component: () => import('../views/Home/service/weixin.vue')
    },
    //客服-微博
    {
      path: '/weibo',
      name: 'weibo',
      component: () => import('../views/Home/service/weibo.vue')
    },
    //客服-QQ
    {
      path: '/qq',
      name: 'qq',
      component: () => import('../views/Home/service/QQ.vue')
    },
    //站内信
    {
      path: '/mail',
      name: 'mail',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('../views/Home/mail/mail.vue')
    },
    // 站内信-详情页
    {
      path: '/mailDetail',
      name: 'mailDetail',
      component: () => import('../views/Home/mail/mailDetail.vue')
    },
    // 首页-回款计划
    {
      path: '/plan',
      name: 'plan',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/Home/Nav/Nav_Plan.vue')
    },
    // 首页-信息披露
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/Home/Nav/Nav_message/Nav_message.vue')
    },
    //首页-信息披露详情
    {
      path: '/company',
      name: 'company',
      component: () => import('../views/Home/Nav/Nav_message/Nav_messageDetails.vue')
    },
    // 首页-今日任务
    {
      path: '/today',
      name: 'today',
      component: () => import('../views/Home/Nav/Nav_today.vue')
    },
    // 首页-今日任务-查看排行
    {
      path: '/stepNum',
      name: 'stepNum',
      component: () => import('../views/Home/Nav/Nav_today_stepNum.vue')
    },
    // 首页-轮播图
    {
      path: '/bannerDetail',
      name: 'bannerDetail',
      component: () => import('../views/Home/Home_banner_details.vue')
    },
    // 首页-平台公告-更多
    {
      path: '/NoticeBarlist',
      name: 'NoticeBarlist',
      meta: {
        keepAlive: true
      },
      component: () => import('../views/Home/NoticeBar_list.vue')
    },
    // 首页-更多-平台公告详情
    {
      path: '/NoticeBarlistDetails',
      name: 'NoticeBarlistDetails',
      component: () => import('../views/Home/NoticeBar_list_details.vue')
    },
    // 首页-平台介绍
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import('../views/Home/Nav_new/Nav_new_introduce.vue')
    },
    // 首页-平台风控
    {
      path: '/platform',
      name: 'platform',
      redirect: '/platform/strength',
      component: () => import('../views/Home/Nav_new/Nav_new_platform'),
      children: [
        // 平台实力
        {
          path: 'strength',
          name: 'strength',
          component: () => import('../views/Home/Nav_new/Nav_new_platform/Nav_new_strength.vue')
        },
        // 风控体系
        {
          path: 'control',
          name: 'control',
          component: () => import('../views/Home/Nav_new/Nav_new_platform/Nav_new_control.vue')
        },
        // 银行存管
        {
          path: 'deposit',
          name: 'deposit',
          component: () => import('../views/Home/Nav_new/Nav_new_platform/Nav_new_deposit.vue')
        },
        // 技术措施（系统）
        {
          path: 'system',
          name: 'system',
          component: () => import('../views/Home/Nav_new/Nav_new_platform/Nav_new_system.vue')
        },
        // 遵从监管
        {
          path: 'supervise',
          name: 'supervise',
          component: () => import('../views/Home/Nav_new/Nav_new_platform/Nav_new_supervise.vue')
        },
      ]
    },





    //2.项目页
    {
      path: '/project',
      name: 'project',
      component: () => import('../views/Project/Project.vue')

    },
  
    // 风险提示
    {
      path: '/riskWarning',
      name: 'RiskWarning',
      component: () => import('../views/Project/RiskWarning.vue')
    },
    // 项目确认出借
    {
      path: '/projectLoan',
      name: 'projectLoan',
      component: () => import('../views/Project/ProjectLoan.vue')
    },
 
 
    //项目投标页2
    {
      path: '/ProjectBidOne',
      name: 'ProjectBidOne',
      
      component: () => import('../views/Project/ProjectBidOne.vue')
    },
   
    // 项目介绍
    {
      path: '/Project_Introduction',
      name: 'Project_Introduction',
      component: () => import('../views/Project/Project_Introduction.vue')
    },
    //  风险纰漏
    {
      path: '/Risk_Disclosure',
      name: 'Risk_Disclosure',
      component: () => import('../views/Project/Risk_Disclosure.vue'),
    },
    // 投标记录
    {
      path:'/Bid_Records',
      name:'Bid_Records',
      component:() => import('../views/Project/Bid_Records.vue')
    },
    // 借后管理
    {
      path: '/Project_Manage',
      name: 'Project_Manage',
      component: () => import('../views/Project/Project_Manage.vue')
    },

    //3.发现页
    {
      path: '/find',
      name: 'find',
      component: () => import('../views/Find/Find.vue'),
    },
    //财经新闻详情
    {
      path: '/find/cjNew/cjDetail',
      name: 'cjdetail',
      component: () => import('../views/Find/cjdetail.vue'),
    },

    //新手帮助
    {
      path: '/helps',
      name: 'helps',
      redirect: '/helps/help',
      component: () => import('../views/Find/newHelp/newhelps.vue'),
      children: [
        //新手帮助    
        {
          path: 'help',
          name: 'help',
          component: () => import('../views/Find/newHelp/help.vue'),
        },

        //视频教程
        {
          path: 'video',
          name: 'video',
          component: () => import('../views/Find/newHelp/video.vue'),
        },

      ]
    },
    //新手帮助-新手指引
    {
      path:'/newbies',
      name:'newbies',
      component:()=>import('../views/Find/newHelp/newbies.vue')
    },

    //新手帮助-注册登录篇
    {
      path: '/helpLogin',
      name: 'helpLogin',
      component: () => import('../views/Find/newHelp/helpLogin.vue')
    },
    //新手帮助-充值篇
    {
      path: '/helpRecharge',
      name: 'helpRecharge',
      component: () => import('../views/Find/newHelp/helpRecharge.vue')
    },
    //新手帮助-出借篇
    {
      path: '/helpLend',
      name: 'helpLend',
      component: () => import('../views/Find/newHelp/helpLend.vue')
    },
    //新手帮助-资产篇
    {
      path: '/helpRoperty',
      name: 'helpRoperty',
      component: () => import('../views/Find/newHelp/helpRoperty.vue')
    },
    //新手帮助-提现篇
    {
      path: '/helpDeposit',
      name: 'helpDeposit',
      component: () => import('../views/Find/newHelp/helpDeposit.vue')
    },

    //视频教程-充值
    {
      path: '/videoRedeem',
      name: 'videoRedeem',
      component: () => import('../views/Find/newHelp/videoRedeem.vue')
    },
    //视频教程-更换银行卡/修改密码/修改手机号
    {
      path: '/videoChangeCard/:article_id',
      name: 'videoChangeCard',
      component: () => import('../views/Find/newHelp/videoChangeCard.vue')
    },
   
    

    //聚一聚首页
    {
      path: '/meets',
      name: 'meets',
      component: () => import('../views/Find/juyiju/ju_index.vue')
    },

    //收益计算器
    {
      path: '/counter',
      name: 'counter',
      component: () => import('../views/Find/counter.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Find/find_banner_article.vue')
    },
    //返回聚一聚首页路由

    {
      path: '/m',
      name: 'm',
      component: () => import('../views/Find/juyiju/ju_index.vue')
    },

   //我的参与路由以及二级路由
    {
      path: '/baoming',
      name: 'baoming',
      redirect: '/meet',
      component: () => import('../views/Find/juyiju/attend.vue'),
      children: [
         //报名凭证
{
  path: '/meet',
  name: 'meet',
  meta: {
    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
  component: () => import('../views/Find/juyiju/meet.vue')
},
  //我的足迹
  {
    path: '/track',
    name: 'track',
    component: () => import('../views/Find/juyiju/track.vue')
  },

      ]
   }, 

//凭证详情
{
  path: '/pingzdetail',
  name: 'pingzDetail',
  component: () => import('../views/Find/juyiju/pingz_detail.vue')
},

    //我的发布
    {
      path: '/newmypublish',
      name: 'newmypublish',
      redirect: '/mypublish',
      component: () => import('../views/Find/juyiju/my_publish.vue'),
      children: [
        //我的发布  
        {
          path: '/mypublish',
          name: 'mypublish',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('../views/Find/juyiju/mypublishConter.vue'),
        },
        //管理报名
        {
          path: '/manage',
          name: 'manage',
          component: () => import('../views/Find/juyiju/manage.vue')
        },
        //管理报名查看全部活动

        /* {
          path: '/addMy',
          name: 'addMy',
          component: () => import('../views/Find/juyiju/addMypublish.vue')
        }, */
      ]
    },


    //发布
    {
      path: '/issue',
      name: 'issue',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('../views/Find/juyiju/issue.vue')
    },
    //后期修改发布内容
    {
      path: '/reviseissue',
      name: 'reviseissue',
      component: () => import('../views/Find/juyiju/Revise_issue.vue')
    },
    //活动详情页
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/Find/juyiju/Details.vue')
    },
    //活动评论
    {
      path: '/comment',
      name: 'comment',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('../views/Find/juyiju/comment.vue')
    },
    //验票
    {
      path: '/run',
      name: 'run',
      component: () => import('../views/Find/juyiju/ticket.vue')
    },
    //管理报名详情页
    {
      path: '/rundet',
      name: 'rundet',
      component: () => import('../views/Find/juyiju/run_details.vue')
    },
    //管理报名审核页面
    {
      path: '/mangdet',
      name: 'mangdet',
      component: () => import('../views/Find/juyiju/manage_details.vue')
    },
    //聚一聚协议
    {
      path: '/xieyi',
      name: 'xieyi',
      component: () => import('../views/Find/juyiju/xieyi.vue')
    },
    //4.我的页
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/Mine/Mine.vue'),
      meta: {
        // keepAlive: true, // 需要被缓存
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },

    //我的账户信息
    {
      path: '/Myinformation',
       component: () => import('../views/Mine/mydata/Myinformation.vue')
    },

    //账户信息~个人信息
    {
      path: '/Mydata',
      name: 'Mydata',
      component: () => import('../views/Mine/mydata/Mydata.vue')
    },
    //账户信息~个人信息~我的地址
    {
      path: '/address',
      name: 'address',
      component: () => import('../views/Mine/mydata/address.vue')
    },
   
    //账户信息~个人信息~编辑地址
    {
      path: '/editaddress',
      name: 'editAddress',
      component: () => import('../views/Mine/mydata/editaddress.vue')
    },

    //账户信息~银行卡
    {
      path: '/bank',
      name: 'bank',
      component: () => import('../views/Mine/mydata/Bank.vue')
    },
    //账户信息~安全设置
    {
      path: '/safe',
      name: 'safe',
      component: () => import('../views/Mine/mydata/safe.vue')
    },
    //账户信息~安全设置~实名认证
    {
      path: '/Real_name',
      name: 'Real_name',
      component: () => import('../views/Mine/mydata/Real_name.vue')
    },
    //账户信息~安全设置~未实名认证
    {
      path: '/realname1',
      name: 'realname1',
      component: () => import('../views/Mine/mydata/realname1.vue')
    },
      //账户信息确定实名认证
    {
      path: '/confirmrealname',
      name: 'confirmrealname',
      component: () => import('../views/Mine/mydata/confirmrealname.vue')
    },
     //账户信息确定绑定银行卡
     {
      path: '/confirmbank',
      name: 'confirmbank',
      component: () => import('../views/Mine/Mine_money/confirmbank.vue')
    },


    //账户信息~安全设置~修改手机号(未实名认证)
    {
      path: '/photo',
      name: 'photp',
      component: () => import('../views/Mine/mydata/photo.vue')
    },
    //账户信息~安全设置~修改手机号（实名认证）
    {
      path: '/shiming_photo',
      name: 'shiming_photo',
      component: () => import('../views/Mine/mydata/shiming_photo.vue')
    },
    //原手机停用
    {
      path: '/smxg_photo',
      name: 'smxg_photo',
      component: () => import('../views/Mine/mydata/smxg_photo.vue')
    },
    //shiming_newphoto 更换绑定手机号
    {
      path: '/Datecter',
      name: 'Datecter',
      component: () => import('../views/Home/Datecter.vue')
    },
    {
      path: '/shiming_newphoto',
      name: 'shiming_newphoto',
      component: () => import('../views/Mine/mydata/shiming_newphoto.vue')
    },
    //交易密码管理~修改交易密码列表
    {
      path: '/trade_mm',
      name: 'trade_mm',
      component: () => import('../views/Mine/mydata/trade_mm.vue')
    },
    //我的充值
    {
      path: '/Recharge',
      name: 'Recharge',
      component: () => import('../views/Mine/Mine_Recharge.vue')
    },
    //确认充值-跳转徽商页面
    {
      path: '/Chongzhi',
      name: 'chongzhi',
      component: () => import('../views/Mine/Mine_money/Mine_chongzhi.vue')
    },    
    {//修改交易密码
      path: '/xg_trademm',
      name: 'xg_trademm',
      component: () => import('../views/Mine/mydata/xg_trademm.vue')
    },
    //交易密码管理~修改交易密码最后一步
    {
      path: '/xg_end_trademm',
      name: 'xg_trademmxg_end_trademm',
      component: () => import('../views/Mine/mydata/xg_end_trademm.vue')
    },
    // 交易密码管理~重置交易密码
    {
      path: '/cz_end_trademm',
      name: 'cz_end_trademm',
      component: () => import('../views/Mine/mydata/cz_end_trademm.vue')
    },
    //账户信息~安全设置~登录密码管理
    {
      path: '/password',
      name: 'password',
      component: () => import('../views/Mine/mydata/Password.vue')
    },
    //账户信息~~登录密码管理~修改登录密码
    {
      path: '/xg_password',
      name: 'xg_password',
      component: () => import('../views/Mine/mydata/xg_password.vue')
    },
    //账户信息~~登录密码管理~重置登录密码
    {
      path: '/cz_password',
      name: 'cz_password',
      component: () => import('../views/Mine/mydata/cz_password.vue')
    },
    //账户信息~~登录密码管理~重置登录密码~添加验证码
    {
      path: '/cz_yzm_password',
      name: 'cz_yzm_password',
      component: () => import('../views/Mine/mydata/cz_yzm_password.vue')
    },
    //账户信息~~登录密码管理~重置登录密码~完成
    {
      path: '/end_cz_password',
      name: 'end_cz_password',
      component: () => import('../views/Mine/mydata/end_cz_password.vue')
    },
    //账户信息~风险承受能力测试
    {
      path: '/fengxian',
      name: 'fengxian',
      component: () => import('../views/Mine/mydata/fengxian_text.vue')
    },
    //账户信息~风险承受能力常见问题
    {
      path: '/commonproblem',
      name: 'commonproblem',
      component: () => import('../views/Mine/mydata/fengxian_commpro.vue')
    },

    //我的~我的邀请合伙人首页
    {
      path: '/myinviteindex',
      name: 'myinviteindex',
      component: () => import('../views/Mine/Myinvite/index.vue'),
    },
     //我的~我的邀请普通用户首页
     {
      path: '/commonuser',
      name: 'commonuser',
      component: () => import('../views/Mine/Myinvite/Common_uesr.vue'),
    },
    //我的~我的邀请--普通用户未邀请状态
    {
      path: '/NOcommonuser',
      name: 'NOcommonuser',
      component: () => import('../views/Mine/Myinvite/NOcommonuser'),
    },
    //我的邀请明细
    {
      path: '/Mydetailed',
      name: 'Mydetailed',
      component: () => import('../views/Mine/Myinvite/MyinviteDetailed.vue'),
      redirect: '/yingfaDetailed',
      children: [
        //应发奖励
        {
      path: '/yingfaDetailed',
      name: 'yingfaDetailed',
      component: () => import('../views/Mine/Myinvite/yingfaDetailed.vue'),
        },
        //应发奖励
        {
          path: '/yifaDetailed',
      name: 'yifaDetailed',
      component: () => import('../views/Mine/Myinvite/yifaDetailed.vue'),
        }

      ]
    
    },
    //推荐客户列表
    {
      path: '/Recommendcustomers/:khs',
      name: 'Recommendcustomers',
      component: () => import('../views/Mine/Myinvite/Recommendcustomers.vue')
    },
    //设置推荐权限
    {
      path: '/opwe',
      name: 'opwe',
      component: () => import('../views/Mine/Myinvite/opwe.vue')
    },
    //奖励明细 wealthdetails
    {
      path: '/wealthdetails',
      name: 'wealthdetails',
      component: () => import('../views/Mine/Myinvite/wealth_details/Myinvite_xq.vue'),
    },
    //普通用户奖励明细
    {
      path: '/interlist',
      name: 'interlist',
      component: () => import('../views/Mine/Myinvite/CommomuserList.vue'),
    },
    //普通用户邀请好友列表friderList.vue
    {
      path: '/friderList',
      name: 'friderList',
      component: () => import('../views/Mine/Myinvite/friderList.vue'),
    },

    //奖励攻略
    {
      path: '/jlgl',
      name: 'jlgl',
      component: () => import('../views/Mine/Myinvite/jlgl.vue'),
    },
    //我的二维码
    {
      path: '/twocode',
      name: 'twocode',
      component: () => import('../views/Mine/Myinvite/twocode.vue'),
    },        
    //我的积分
    {
      path: '/myintegral',
      name: 'myintegral',
      component: () => import('../views/Mine/Myintegral/index.vue'),
    },
    //积分~兑换记录
    {
      path: '/duihuan',
      name: 'duihuan',
      component: () => import('../views/Mine/Myintegral/duihuan.vue'),
    },
    //新-积分~兑换记录
    {
      path: '/newduihuan',
      name: 'newduihuan',
      component: () => import('../views/Mine/Myintegral/newduihuan.vue'),
    },

    //积分~积分明细  
    {
      path: '/jfDefinite',
      name: 'jfDefinite',
      component: () => import('../views/Mine/Myintegral/jfDefinite.vue'),
    },
    //积分商品明细
    {
      path: '/jfDetails',
      name: 'jfDetails',
      component: () => import('../views/Mine/Myintegral/ShoppingDetails.vue')
    },
    //积分商品明细-新
    {
      path: '/newjfDetails',
      name: 'newjfDetails',
      component: () => import('../views/Mine/Myintegral/newShoppingDetails.vue')
    },    
    //确认订单
    {
      path: '/dhadd',
      name: 'dhadd',
      component: () => import('../views/Mine/Myintegral/Dh_add.vue')
    },
    //新-确认订单
    {
      path: '/newdhadd',
      name: 'newdhadd',
      component: () => import('../views/Mine/Myintegral/newDh_add.vue')
    },    
    //积分攻略
    {
      path: '/gonglv',
      name: 'gonglv',
      component: () => import('../views/Mine/Myintegral/gonglv.vue')
    },
    //购物车
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Mine/Myintegral/cart.vue')
    },    


    //我的债权
    {
      path: '/mine/creditor',
      name: 'creDitor',
      component: () => import('../views/Mine/Mine_creditor/Mine_creditor.vue'),
      // redirect: '/mine/creditor/crall',
      // children: [
      //   //我的债权-全部
      //   {
      //     path: '/mine/creditor/crall',
      //     name: 'crAll',
      //     component: () => import('../views/Mine/Mine_creditor/Mine_creditor_crAll.vue'),
      //   },
      //   //我的债权-冻结中
      //   {
      //     path: '/mine/creditor/crfreeze',
      //     name: 'crFreeze',
      //     component: () => import('../views/Mine/Mine_creditor/Mine_creditor_crFreeze.vue'),
      //   },
      //   //我的债权-未到期
      //   {
      //     path: '/mine/creditor/crbefore',
      //     name: 'crBefore',
      //     component: () => import('../views/Mine/Mine_creditor/Mine_creditor_crBefore.vue'),
      //   },
      //   //我的债权-已经到期
      //   {
      //     path: '/mine/creditor/crexpired',
      //     name: 'crExpired',
      //     component: () => import('../views/Mine/Mine_creditor/Mine_creditor_crExpired.vue'),
      //   },
      // ]
    },
    //民登账户~我的债权
    {
      path: '/mine/mdcreditor',
      name: 'mdcreditor',
      component: () => import('../views/Mine/Mine_creditor/Mine_mdcreditor.vue'),
    },    
    //我的账单
    {
      path: '/mine/bill',
      name: 'Bill',
      component: () => import('../views/Mine/Mine_bill/Mine_bill_hp.vue'),
    },
    //月账单
    {
      path: '/mine/monthbill',
      name: 'monthBill',
      component: () => import('../views/Mine/Mine_bill/Mine_bill_monthBill.vue'),
    },
    //已赚收益
    {
      path: '/mine/shouyi',
      name: 'shouYi',
      component: () => import('../views/Mine/Mine_shouyi/Mine_shouyi.vue'),
    },
    //债权详情
    {
      path: '/mine/creditordetail',
      name: 'creditorDetail',
      component: () => import('../views/Mine/Mine_shouyi/Mine_creditor_detail.vue'),
    },
    //回款情况
    {
      path: '/mine/recesituation',
      name: 'receSituation',
      component: () => import('../views/Mine/Mine_shouyi/Mine_rece_situation.vue'),
    },
    //查看合同
    {
      path: '/mine/lookcontract',
      name: 'lookContract',
      component: () => import('../views/Mine/Mine_shouyi/Mine_look_contract.vue'),
    },
    //我的卡券
    {
      path: '/mine/card',
      name: 'card',
      component: () => import('../views/Mine/Mine_card/Mine_card.vue'),
      redirect: '/mine/redenvelope',
      children: [
        {
          path: '/mine/redenvelope',
          name: 'redEnvelope',
          component: () => import('../views/Mine/Mine_card/Mine_redenvelope.vue'),
        },
        {
          path: '/mine/addinterest',
          name: 'addInterest',
          component: () => import('../views/Mine/Mine_card/Mine_addinterest.vue'),
        },
        {
          path: '/mine/experience',
          name: 'experience',
          component: () => import('../views/Mine/Mine_card/Mine_experience.vue'),
        },

      ]
    },
    //红包券使用说明
    {
      path: '/mine/redenvelopeuse',
      name: 'redenvelopeUse',
      component: () => import('../views/Mine/Mine_card/Mine_redenvelopeuse.vue'),
    },
    //查看已使用和过期红包券
    {
      path: '/mine/usedredenvelope',
      name: 'usedRedenvelope',
      component: () => import('../views/Mine/Mine_card/Mine_usedredenvelope.vue'),
    },
    //加息券使用说明
    {
      path: '/mine/addinterestuse',
      name: 'addinterestUse',
      component: () => import('../views/Mine/Mine_card/Mine_addinterestuse.vue'),
    },
    //查看已使用和过期加息券
    {
      path: '/mine/usedaddinterest',
      name: 'usedAddinterest',
      component: () => import('../views/Mine/Mine_card/Mine_usedaddinterest.vue'),
    },
    //体验金使用说明
    {
      path: '/mine/experienceuse',
      name: 'experienceUse',
      component: () => import('../views/Mine/Mine_card/Mine_experienceuse.vue'),
    },
    //查看已使用和过期体验金
    {
      path: '/mine/usedexperience',
      name: 'usedExperience',
      component: () => import('../views/Mine/Mine_card/Mine_usedexperience.vue'),
    },    
    //提现
    {
      path: '/mine/cash',
      name: 'cash',
      component: () => import('../views/Mine/Mine_money/Mine_cash.vue'),
    },
    //取现
    {
      path: '/mine/quxian',
      name: 'quxian',
      component: () => import('../views/Mine/Mine_money/Mine_quxian.vue'),
    },   
    //大额取现 largemoney
    {
      path: '/mine/largemoney',
      name: 'largemoney',
      component: () => import('../views/Mine/Mine_money/Mine_large.vue'),
    },  

    //我的账户~融托金融账户页面
    {
      path: '/mine/rtjr',
      name: 'rtjr',
      component: () => import('../views/Mine/Mine_role/Mine_rtjr.vue'),
    },    
    //我的账户~融托民登账户页面
    {
      path: '/mine/rtmd',
      name: 'rtmd',
      component: () => import('../views/Mine/Mine_role/Mine_rtmd.vue'),
    }, 
    //融托民登账户回款计划
    {
      path: '/mine/mdhk',
      name: 'mdhk',
      component: () => import('../views/Mine/Mine_role/Mine_mdhk.vue'),
    }, 
    //融托民登账户回款详情
    {
      path: '/mine/hkdetail',
      name: 'hkdetail',
      component: () => import('../views/Mine/Mine_role/Mine_hkdetail.vue'),
    },       

    //绑定银行卡
    {
      path: '/mine/bindcard',
      name: 'bindCard',
      component: () => import('../views/Mine/Mine_money/Mine_bindcard.vue'),
    },

    {
      path: '/totalmonth',
      name: 'totalmonth',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/Home/Nav/Total_month.vue')
    },

    {
      path: '/plandetail',
      name: 'plandetail',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/Home/Nav/Plan_details.vue')
    },
    //5.登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    //登录页-融托金融用户服务协议
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import('../views/login/login_protocol.vue')
    },
    //网贷平台风险提示及禁止性行为协议
    {
      path: '/ptxieyi',
      name: 'ptxieyi',
      component: () => import('../views/Mine/mydata/xieyia.vue')
    },
    //绑定银行卡金融服务协议
    {
      path: '/ptxieyis',
      name: 'ptxieyis',
      component: () => import('../views/Mine/mydata/xieyib.vue')
    },
   
    //登录页-验证码登录
    {

      path: '/code',
      name: 'code',
      component: () => import('../views/login/login_code.vue')
    },
    //登录页-验证码-获取验证码
    {
      path: '/getCode',
      name: 'getCode',
      component: () => import('../views/login/login_getCode.vue')
    },
    //登录页-找回密码（手机号）
    {
      path: '/findPassword',
      name: 'findPassword',
      component: () => import('../views/login/findPassword.vue')
    },
    //登录页-找回密码（验证码）
    {
      path: '/findPasswordNote',
      name: 'findPasswordNote',
      component: () => import('../views/login/findPasswordNote.vue')
    },
    //登录页-找回密码-完成
    {
      path: '/findPasswordFinish',
      name: 'findPasswordFinish',
      component: () => import('../views/login/findPasswordFinish.vue')
    },
    //6.注册页
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/register.vue'),
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: () => import('../views/Home/refresh.vue')
    },
    // 风险评估问卷
    {
      path: '/rishquestion',
      name: 'rishquestion',
      component: () => import('../views/Mine/rish_question.vue')
    },
    //7.404页面
    {
      path:'/notFound',
      name:'notFound',
      component:()=>import('../views/Notfound')
    },
   //记账工具
   {
    path: '/booking',
    name: 'booking',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/Find/booking/index.vue') 
   },
 //记账工具--记一笔
 {
  path: '/book',
  name: 'book',
  component: () => import('../views/Find/booking/Paybook.vue') 
 },
//记账工具--支出类别 
{
  path: '/paygenre',
  name: 'paygenre',
  component: () => import('../views/Find/booking/paygenre.vue') 
 },
//记账工具--收入类别 
{
  path: '/income',
  name: 'income',
  component: () => import('../views/Find/booking/income.vue') 
 },
//记账工具--明细
{
  path: '/definite',
  name: 'definite',
  component: () => import('../views/Find/booking/definite.vue') 
 },
//记账工具--报表
{
  path: '/journaling',
  name: 'journaling',
  component: () => import('../views/Find/booking/journaling.vue') 
 },
 //记账工具--报表
{
  path: '/inquiry',
  name: 'inquiry',
  component: () => import('../views/Find/booking/inquiry.vue') 
},
{
  path:'*',
  redirect:'/notFound'
},
],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


