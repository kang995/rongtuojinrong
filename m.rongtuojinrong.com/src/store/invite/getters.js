// 获取共享状态文件（派发新的状态）
export default {
    getInvite(state){
        if(!state.invite){
            state.invite = JSON.parse(localStorage.getItem('invite'))
        }
        return state.invite//返回值，非必须
    },
    
    getDefidenshuxing(state){
        if(!state.defidenshuxing){
            state.defidenshuxing = JSON.parse(localStorage.getItem('defidenshuxing'))
        }
        return state.defidenshuxing//返回值，非必须
    }    
}