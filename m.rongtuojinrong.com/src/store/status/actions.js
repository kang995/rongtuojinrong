// 异步更改状态文件
import {SET_STATUS,SET_ISSUE} from './const.js'
export default{
    changeStatus(store,status){
        store.commit(SET_STATUS,status)
    },
    changeIssue(store,issue){
        store.commit(SET_ISSUE,issue)
    },
}