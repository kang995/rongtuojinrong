<template>
    <div class="loginBox">
        <!-- 首页头部固定返回首页-->
        <!-- <mt-header title="" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox :isShow = 'header'>
            <router-link v-if="header" :to="{path:'/home'}" tag="span" slot="rightTo" class="right_content">首页</router-link>
        </headerBox>
        <div class="contentBox">
            <h2>欢迎登录</h2>
            <div class="inputBox">
                <input name='username' v-model="username" @input="changeShow1,changeInput1" @blur="change1" @focus="nav1"  type="text" placeholder="请输入手机号或用户名">
                <!--密码（明、暗文输入框）  -->
                <input v-if="!checked" name="password"  @keyup.13="doLogin" v-model="password" @input="changeShow2,changeInput2"  @blur="change2" @focus="nav2" type="password" placeholder="请输入密码">
                <input v-else name="password"  @keyup.enter="doLogin" v-model="password" @input="changeShow2,changeInput2"  @blur="change2" @focus="nav2" type="text" placeholder="请输入密码">
                <input @click="doLogin" type="submit" value="登录">
                <!-- 登录提示弹出框 -->
                <mt-popup v-model="popupVisible" closeOnClickModal>
                    <div class="messageBox">
                        <p>{{btnTitle}}</p>
                        <span @click="changeSpan" :class="[(isShow ? 'active':'')]">确定</span>
                    </div>
                </mt-popup>
                <!-- 叉号图片 -->
                <img @click="clearInput1" v-show="Show1" ref="img1" src="../../assets/delect_03.jpg" alt="">
                <img @click="clearInput2" v-show="Show2" src="../../assets/delect_03.jpg" alt="">
                <!-- 明、暗文图片：控制input输入框的切换 -->
                <img v-show="!checked" @click="checked=!checked" src="../../assets/anwen_03.jpg" alt="">
                <img v-show="checked" @click="checked=!checked" src="../../assets/mingwen_03.jpg" alt="">
            </div>
            <div class="contentText">
                <router-link :to="{name:'code',query:{redirect:redirect}}" tag="span">验证码登录</router-link>
                <router-link :to="{name:'register'}" tag="span">会员注册</router-link>
                <router-link :to="{name:'findPassword'}" tag="span">找回密码</router-link>
            </div>
            <div class="content_bottom">
                <span>登录代表您已阅读并同意</span>
                <router-link :to="{name:'protocol'}" tag="p">《融托金融用户服务协议》</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '../../components/header';
import qs from 'qs';
import { Toast } from 'mint-ui';//轻提示
// import {mapState} from "vuex"
export default {
    computed:{
        changeInput1(){
           if(this.username){
               this.Show1 = true;
           }else{
               this.Show1 = false;
           }
        },
        changeInput2(){
           if(this.password){
               this.Show2 = true;
           }else{
               this.Show2 = false;
           }
        },
    },
    components:{
        navBar
    },
    data(){
        return{
            username:'',//用户名
            password:'',//密码
            Show1:false,
            Show2:false,
            checked:false,//控制明暗文
            popupVisible:false,//弹出层变量
            btnTitle:'',
            header:false,//控制头部（首页）样式
            redirect:'',//存储来源路由
            distinguish:'',//区分头部样式
            isShow:false//控制弹出框样式
        }
    },
    methods:{
        // 1.改变header样式
        changeHeader(){
            if(this.distinguish == 'code'){
                this.header = true;
            }
        },
        // 2.控制弹出框显示与隐藏及确定按钮样式
        changeSpan(){
            this.popupVisible=!this.popupVisible;
            this.isShow = true;//显示弹出框确定按钮样式
        },
        //3.登录方法
        doLogin (){
            if (this.username == ''){//用户名不能为空
                this.popupVisible = true;
                this.btnTitle = '请输入用户名';
                this.isShow = false;//取消弹出框确定按钮样式
                // alert('请输入用户名');
                // return false
            }else if (this.password == ''){//密码不能为空
                this.popupVisible = true;
                this.btnTitle = '请输入密码';
                this.isShow = false;//取消弹出框确定按钮样式
                // alert('请输入密码');
                // return false
            }else{
                // 发送请求
                this.$post('/rongtuojinrong/login.json',{
                    username:this.username,
                    password:this.password
                }).then(res => {
                    if(res.data.status == 0){//登录成功
                        // this.$store.commit('setToken',res.data);
                        this.$store.dispatch('changeToken',res.data.data)
                        Toast({
                            message: '登录成功!',
                            iconClass: 'fa fa-check fa-lg',
                            position: 'middle',
                            duration: 1500,
                        });
                        // 调用用户信息接口方法
                        let _this = this;
                        _this.receiveUserInfo();
                        // 判断跳转后页面（有来源页面跳转来源页面；没有跳转首页）
                        setTimeout(()=>{
                            if(this.redirect){
                                // 接受从ProjectLoan传过来的参数，并且直接返回
                                this.$router.replace({path:this.redirect,query:{code:this.$route.query.code,id:this.$route.query.id}})//跳转登录成功后的页面
                            }else{
                                this.$router.replace({path:'/home'})    
                            }
                        },1500)
                    }else if(res.data.status == 1){//登录失败
                        Toast({
                            message:res.data.msg,
                            iconClass: 'fa fa-times fa-lg',
                            position: 'middle',
                            duration: 2000,
                        });
                    }
                }).catch(err => {
                  console.log(err)
                })
            }
        },
        // 4.定义请求用户信息接口方法
        receiveUserInfo(){
            this.$post('/rongtuojinrong/userCenter/accountInformation/userInformation.json').then(res=>{
                // console.log(res.data.data)
                this.$store.dispatch('changeInvite',res.data.data);
                //判断接口请求中defidenshuxing的值
                //未实名
                if(this.$store.state.login.token.is_identify==0){
                    console.log(0);
                    this.$store.dispatch('changeDefidenshuxing',0);
                //已实名    
                }else{  
                    //出借个人          
                    if(res.data.data.primary_role==0){
                        //借款个人 
                        if(res.data.data.personal_type==1){
                            console.log(2);
                            this.$store.dispatch('changeDefidenshuxing',2);
                        //出借个人    
                        }else{
                            // console.log(1);
                            this.$store.dispatch('changeDefidenshuxing',1);
                        }
                    }
                    //借款企业
                    if(res.data.data.primary_role==1){
                        console.log(2);
                        this.$store.dispatch('changeDefidenshuxing',2);
                    }
                    //担保企业
                    if(res.data.data.primary_role==2){
                        console.log(4);
                        this.$store.dispatch('changeDefidenshuxing',4);
                    }
                }
            })
        },
        // 5.清除输入框内容的方法
        clearInput1(){
            this.username = ''
            this.Show1 = false;
        },
        clearInput2(){
            this.password = ''
            this.Show2 = false;
        },
        // 6.input事件控制删除按钮显示与隐藏的方法
        changeShow1(){
            this.Show1 = true
        },
        changeShow2(){
            this.Show2 = true
        },
        //7.blur事件失去焦点
        change1(){
          setTimeout(()=>{
            this.Show1 =false;
          },0)
        },
        change2(){
          setTimeout(()=>{
            this.Show2 =false;
          },0)
        },
        // 8.focus事件获取焦点
        nav1(){
            if(this.username){
                this.Show1 = true;
            }else{
                this.Show1 = false;
            }
        },
        nav2(){
            if(this.password){
                this.Show2 = true;
            }else{
                this.Show2 = false;
            }
        }
    },
    created(){
        // console.log(this.$route.query.redirect)
        this.redirect = this.$route.query.redirect;//接受路由拦截传来的参数redirect(来源路由,即登录成功后需要跳转的下一页面)
        this.distinguish = this.$route.query.distinguish;//接受退出账户页面（Myinformation.vue）传来的参数distinguish
        this.changeHeader();
    }
}
</script>

<style lang="scss">
body{
    background:#fff;
    .loginBox{
        width:100%;
        height:100%;
        position:absolute;
        .right_content{
            color:#333;
            font-size:0.14rem;
        }
        // .mint-header {
        //     background: #fff;
        //     height: 0.5rem;
        //     border-bottom:1px solid #ddd;
        //     .mint-button-icon {
        //         color: #404040;
        //     }
        //     .mint-header-title {
        //         font-size: 0.15rem;
        //         color: #404040;
        //     }
        // }
        .contentBox{
            width:100%;
            height:100%;
            padding:0 0.21rem;
            background:#fff;
            h2{
                display:flex;
                align-items:flex-end;
                width:100%;
                height:0.56rem;
                font-size:0.3rem;
                color:#323232;
                margin-top:0.5rem;
            }
            .inputBox{
                width:100%;
                position:relative;
                input:nth-of-type(1){
                    border:none;
                    margin:0.75rem 0 0.5rem 0;
                    width:100%;
                    font-size:0.17rem;
                    color:#333;
                    background:#fff;
                }
                input:nth-of-type(2){
                    border:none;
                    margin-bottom:0.58rem;
                    width:100%;
                    font-size:0.17rem;
                    color:#333;
                }
                input:nth-of-type(3){
                    border:none;
                    margin-bottom:0.35rem;
                    width:100%;
                    height:0.4rem;
                    font-size:0.16rem;
                    color:#fff;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    border-radius:0.2rem;
                    background:#0359d4;         
                }
                // 弹出框样式
                .mint-popup{
                    border-radius:0.15rem;
                    background:#f7f7f9;
                    overflow: hidden;
                     .messageBox{
                        width:2.7rem;
                        p{
                            width:2.7rem;
                            height:0.6rem;
                            line-height:0.6rem;
                            text-align:center;
                            color:#000104;
                            font-size:0.12rem;
                            border-bottom:0.5px solid #d9e9f8;
                        }
                        span{
                            display:block;
                            width:2.7rem;
                            height:0.46rem;
                            line-height:0.46rem;
                            text-align:center;
                            font-size:0.15rem;
                            color:#4573a4;
                        }
                        .active{
                            background-color:#ddd;
                        }
                    }
                }
                img:nth-of-type(1){
                    width:0.14rem;
                    height:0.12rem;
                    position: absolute;
                    top:0.78rem;
                    right:0.8rem;
                    z-index:10;
                }
                img:nth-of-type(2){
                    width:0.14rem;
                    height:0.12rem;
                    position: absolute;
                    top:1.5rem;
                    right:0.8rem;
                }
                img:nth-of-type(3){
                    position:absolute;
                    top:1.5rem;
                    right:0.2rem;
                    width:0.2rem;
                    height:0.11rem;
                }
                img:nth-of-type(4){
                    position:absolute;
                    top:1.5rem;
                    right:0.2rem;
                    width:0.2rem;
                    height:0.11rem;
                }
            }
            .contentText{
                width:100%;
                display:flex;
                justify-content:space-between;
                padding:0 0.15rem 0 0.07rem;
                margin-bottom:1.8rem;
                span{
                    font-size:0.12rem;
                    color:#787878;
                }
            }
            .content_bottom{
                width:100%;
                margin-bottom:0.35rem;
                padding:0 0.3rem 0 0.25rem;
                display:flex;
                span{
                    font-size:0.12rem;
                    color:#333;
                }
                p{
                    font-size:0.12rem;
                    color:#0587cc;
                }
            }
        }
    }
}
</style>
