// 修改共享状态文件
import {SET_INVITE,SET_DEFIDENSHUXING} from './const.js'
export default {
    // 1.存储token方法
    [SET_INVITE](state,invite){
        state.invite = invite;//同步更改status
        localStorage.invite = JSON.stringify(invite);//同步存储token至localStorage
    },
   
    [SET_DEFIDENSHUXING](state,defidenshuxing){
        state.defidenshuxing = defidenshuxing;//同步更改status
        localStorage.defidenshuxing = JSON.stringify(defidenshuxing);//同步存储token至localStorage
    },
   
}