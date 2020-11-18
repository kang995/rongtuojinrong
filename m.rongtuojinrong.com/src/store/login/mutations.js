// 修改共享状态文件
import {SET_TOKEN} from './const.js'
export default {
    // 1.存储token方法
    [SET_TOKEN](state,token){
        state.token = token;//同步更改token
        localStorage.token = JSON.stringify(token);//同步存储token至localStorage
    }
}