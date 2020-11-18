// 异步更改状态文件
import {SET_INVITE,SET_DEFIDENSHUXING} from './const.js'
export default{
    changeInvite(store,invite){
        store.commit(SET_INVITE,invite)
    },
   
    changeDefidenshuxing(store,defidenshuxing){
        store.commit(SET_DEFIDENSHUXING,defidenshuxing)
    },    
   
}   
