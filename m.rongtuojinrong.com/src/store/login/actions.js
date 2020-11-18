// 异步更改状态文件
import {SET_TOKEN} from './const.js'
export default{
    changeToken(store,token){
        store.commit(SET_TOKEN,token)
    },
}