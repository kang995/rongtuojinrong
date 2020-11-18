// 获取共享状态文件（派发新的状态）
export default {
    getStatus(state){
        if(!state.status){
            state.status = JSON.parse(localStorage.getItem('status'))
        }
        return state.status//返回值，非必须
    },
    getIssue(state){
        if(!state.issue){
            state.issue = JSON.parse(localStorage.getItem('issue'))
        }
        return state.issue//返回值，非必须
    }
}