import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入分享
// import Share from 'vue-social-share';
// import 'vue-social-share/dist/client.css';
// Vue.use(Share)

//1.解决非webpack下 Vue控制台提示You are running Vue in development mode.
Vue.config.productionTip = false

//2.引入main.scss样式文件 
import "./stylesheets/main.scss"

//3.引入rem.js适配文件
import "./modules/rem"   

//4.引入swiper的css样式
import "../node_modules/swiper/dist/css/swiper.min.css"

//5.将axios挂载到原型上
import axios from "axios"
Vue.prototype.$http = axios;

//6.引入api.js公共请求方法
import { get, post } from './modules/api';
Vue.prototype.$get = get;
Vue.prototype.$post = post;

//7.挂载全局变量（后续全局更改域名时方便）
Vue.prototype.$sign = 'http://api.php.sit.rongtuojinrong.com';
Vue.prototype.$url = 'http://api.php.rongtuojinrong.com';
//8.使用视频插件
import VideoPlayer from 'vue-video-player'
import "video.js/dist/video-js.css"
import 'videojs-contrib-hls'
import "vue-video-player/src/custom-theme.css"
Vue.use(VideoPlayer)

//9.全局注册公共组件
import headerBox from '@/components/header'
Vue.component('headerBox', headerBox)

//10.按需引入mint-ui相应的组件
import {
  Popup,
  Header,
  Button,
  InfiniteScroll,
  Lazyload,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Actionsheet,
  Field,
  Badge,
  Indicator,
} from 'mint-ui';
Vue.prototype.Indicator = Indicator;//方法
// Vue.prototype.Toast = Toast;
Vue.component("mt-popup", Popup);//全局组件
Vue.component("mt-header", Header);
Vue.component("mt-button", Button);
Vue.component("mt-navbar", Navbar);
Vue.component("mt-tab-item", TabItem);
Vue.component('mt-actionsheet', Actionsheet);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Badge.name, Badge);
Vue.component(Field.name, Field);
Vue.use(InfiniteScroll);//相当于自定义指令
Vue.use(Lazyload);

//11.全局引入Vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//12.按需引入Vant相应的组件
import {
  ActionSheet,
  Toast,
  RadioGroup, 
  Radio,
  Circle,
  PullRefresh,
  CountDown, 
  PasswordInput,
  NumberKeyboard,
  Checkbox, 
  CheckboxGroup,
  Dialog,
  NoticeBar 
} from 'vant';
Vue.use(ActionSheet);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Toast);
Vue.use(Circle);
Vue.use(PullRefresh);
Vue.use(CountDown);
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(NoticeBar);

//13.
import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用

//使用moment的日期过滤器  转换后格式为（2019-09-26）
Vue.filter('date-format', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
})

Vue.filter('date-format1', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD h:mm';
  return moment(value).format(formatString);
})

Vue.filter('date-format2', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
})

Vue.filter('date-format3', function (value, formatString) {
  formatString = formatString || 'MM-DD HH:mm';
  return moment(value).format(formatString);
})

 //14.实例化vue实例
 new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

//15.全局路由拦截（对需要登录后才可以访问的页面进行全局路由拦截）
router.afterEach((to, from,next) => {
  if(to.meta.requireAuth) {
    if(!store.state.login.token){
      router.push({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
}
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {  // 1.判断该路由是否需要登录权限
    // console.log(store)
      if(store.state.login.token){  // 2.通过vuex state获取当前的token是否存在
        next();
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }  // 3.将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
  }else if(to.path == '/login') {//如果已经登录再手动在地址栏中输入'/login'将跳转到首页
      if(store.state.login.token) {  // 通过vuex state获取当前的token是否存在
        next({
          path: '/home'
        });
      }else{
        next()
      }
  }else{
    next();
  }

})

//--金融注销路由拦截
router.afterEach((to, from) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
    //app（ios）调用此方法获取title值，解决app嵌入h5获取不到动态title的问题
    try{
      parent.testobject.getNavTitle(to.meta.title);
    }catch(e){

    }     
  }else{
    document.title = '融托金融';
    try{
      parent.testobject.getNavTitle("融托金融");
    }catch(e){

    }     
  }
})
//--金融注销路由拦截
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    try{
      parent.testobject.getNavTitle(to.meta.title);
    }catch(e){

    }    
  }else{
    document.title = '融托金融';
    try{
      parent.testobject.getNavTitle("融托金融");
    }catch(e){

    }     
  }
  next()
})



//--合伙人注销路由拦截
router.afterEach((to, from) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
    //app（ios）调用此方法获取title值，解决app嵌入h5获取不到动态title的问题
    try{
      getNavTitle(to.meta.title);
    }catch(e){

    }     
  }else{
    document.title = '融托金融';
    try{
      getNavTitle("融托金融");
    }catch(e){

    }     
  }
})
//--合伙人注销路由拦截
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    try{
      getNavTitle(to.meta.title);
    }catch(e){

    }    
  }else{
    document.title = '融托金融';
    try{
      getNavTitle("融托金融");
    }catch(e){

    }     
  }
  next()
})



// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入环形图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
Vue.prototype.$echarts = echarts

// import echarts from 'echarts'  //引入echarts
// Vue.prototype.$echarts = echarts  //注册组件

//兄弟组件传值
let bus = new Vue()
Vue.prototype.bus = bus

