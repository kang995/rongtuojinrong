import QS from 'qs';
import axios from "axios"
import router from '../router'
import {SET_TOKEN} from '@/store/login/const.js'
import {SET_INVITE,SET_DEFIDENSHUXING} from '@/store/invite/const.js'
//  * get方法，对应get请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
export function get(url, params){    
    url = 'http://api.php.sit.rongtuojinrong.com'+url;
    let token = this.$store.state.login.token;
    params||(params={})
    // console.log(params)
    params.time = parseInt(new Date().getTime()/1000);//当前时间秒数
    params.appid = 'app_h5';
    params.ssid = token.ssid;
    params.user_id = token.user_id;
    return new Promise((resolve, reject) => {
        axios.get(url, {params:params}).then(res => {
            if(res.data.data=="needLogin"){//判断登录超时
                // localStorage.removeItem('token'); // 清除loclStorage中的token
                // localStorage.removeItem('invite');
                localStorage.clear();//清除LocalStorage中存储的所有字段
                this.$store.commit(SET_TOKEN, '');//清除vuex中的token
                this.$store.commit(SET_INVITE,'');
                this.$store.commit(SET_DEFIDENSHUXING,'');
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath,distinguish:'code'}//登录后跳转的路由
                })
            }else{
                resolve(res);
            }
        }).catch(err => {            
            this.$toast.clear();
            this.$toast('数据加载失败...');
            reject(err)
        })    
    });
}

//  * post方法，对应post请求 
//  * @param {String} url [请求的url地址] 
//  * @param {Object} params [请求时携带的参数] 
export function post(url, params) {
    url = 'http://api.php.sit.rongtuojinrong.com'+url;
    let token = this.$store.state.login.token;
    params||(params={})
    params.time = parseInt(new Date().getTime()/1000);//当前时间秒数
    params.appid = 'app_h5';
    params.ssid = token.ssid;
    params.user_id = token.user_id;   
    return new Promise((resolve, reject) => {         
        axios.post(url, QS.stringify(params)).then(res => {
            if(res.data.data=="needLogin"){//判断登录超时
                // localStorage.removeItem('token'); // 清除loclStorage中的token
                // localStorage.removeItem('invite');
                localStorage.clear();//清除LocalStorage中存储的所有字段
                sessionStorage.clear()
                this.$store.commit(SET_TOKEN, '');//清除vuex中的token
                this.$store.commit(SET_INVITE,'');
                this.$store.commit(SET_DEFIDENSHUXING,'');
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath,distinguish:'code'}//登录后跳转的路由
                })
            }else{
                resolve(res);
            }  
        }).catch(err => {            
            this.$toast.clear();
            this.$toast('数据加载失败...');
            reject(err)        
        })    
    });
}

// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         // console.log('1111111',response)
//         // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
//         // 否则的话抛出错误
//         if (response.status == 200) {
//             console.log('1111111',response.data)
//             switch (response.data.data) {
//                 case 'needLogin':     
//                     // 返回 401 清除token信息并跳转到登录页面
//                     localStorage.removeItem('token'); // 清除loclStorage中的token
//                     store.commit(SET_TOKEN, null);//清除vuex中的token
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }            
//         }else{            
//             return Promise.reject(response);        
//         }    
//     },
    // error => {
    //     if (error.response) {
    //         switch (error.response.data.data) {
    //             case 'needLogin':
    //                 // 返回 401 清除token信息并跳转到登录页面
    //                 localStorage.removeItem('token'); // 清除loclStorage中的token
    //                 store.commit(SET_TOKEN, null);//清除vuex中的token
    //                 router.replace({
    //                     path: 'login',
    //                     query: {redirect: router.currentRoute.fullPath}
    //                 })
    //         }
    //     }
    //     return Promise.reject(error.response.data.data.msg)   // 返回接口返回的错误信息
    // }
    // );
