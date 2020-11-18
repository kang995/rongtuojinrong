// 修改共享状态文件
import {SET_STATUS,SET_ISSUE} from './const.js'
export default {
    // 1.存储token方法
    [SET_STATUS](state,status){
        state.status = status;//同步更改status
        localStorage.status = JSON.stringify(status);//同步存储token至localStorage
    },
    [SET_ISSUE](state,issue){
        state.issue = issue;//同步更改issue
        localStorage.issue = JSON.stringify(issue);//同步存储issue至localStorage
    }
}