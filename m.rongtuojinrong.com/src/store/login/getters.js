// 获取共享状态文件（派发新的状态）
export default {
    getToken(state){
        if(!state.token){
            if(localStorage.getItem('token')!=null){//未登录时获取token不为空
                state.token = JSON.parse(localStorage.getItem('token'))
            }
        }
        return state.token//返回值，非必须
    }
}
