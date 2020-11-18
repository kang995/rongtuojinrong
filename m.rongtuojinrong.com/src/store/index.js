import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './login'
import status from './status'
import invite from './invite'
const store = new Vuex.Store({
  modules:{
    login,//登录模块
    status,//站内信
    invite //邀请
  }

})
export default store