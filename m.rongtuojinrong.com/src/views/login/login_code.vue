<template>
    <div class="codeBox">
        <!-- 头部 -->
        <!-- <mt-header title="" fixed>
            <router-link to="/login" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox></headerBox>
        <div class="contentBox">
            <h2>欢迎登录</h2>
            <div class="content">
                <div class="iphoneBox">
                    <span>+86&nbsp;></span>
                    <input v-model="clear_input" @input="changeShow,changeInput" @blur="change" @focus="nav" type="tel" placeholder="请输入手机号">
                    <img @click="clearInput" v-show="Show" src="../../assets/delect_03.jpg" alt="">
                </div>
                <p>未注册的手机号验证后自动创建融托金融账户</p>
            </div>
            <input @click="getIphone" type="submit" value="获取验证码">
            <div class="contentText">
                <!-- 点击密码登录不让其产生历史记录 -->
                <router-link :to="{name:'login',query:{distinguish:'code',redirect:redirect}}" tag="span" replace>密码登录</router-link>
                <router-link to="/register" tag="span">会员注册</router-link>
            </div>
            <div class="content_bottom">
                <span>登录代表您已阅读并同意</span>
                <router-link :to="{name:'protocol'}" tag="p">《融托金融用户服务协议》</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import HeaderBox from '../../components/header'
import { Toast } from 'mint-ui';//轻提示
export default {
    // components:{
    //     HeaderBox
    // },
    computed:{
        changeInput(){
           if(this.clear_input){
               this.Show = true;
           }else{
               this.Show = false;
           }
        },
    },
    data(){
        return{
            clear_input:'',//手机号数据
            redirect:'',//存储来源路由
            Show:false
        }
    },
    created(){
        this.redirect = this.$route.query.redirect;//接受路由拦截传来的参数redirect(来源路由)
    },
    methods:{
        //获取验证码进行校验
        getIphone(){
            if(!/^1[3456789]\d{9}$/.test(this.clear_input)) {
                Toast({
                    message: '请输入正确的手机号',
                    position: 'middle',
                    duration: 1500
                });
            }else{
                //请求发送验证码接口（验证码登录）
                this.$post('/rongtuojinrong/certificate/commonAuth/send.json',{
                    mobile:this.clear_input,
                    type:9//短信登录--短信发送验证码通用接口(非注册)
                }).then(res=>{
                    // console.log(res.data.data);
                    if(res.data.status==1){//60s限制，弹出提示信息
                        Toast({
                            message:res.data.msg,
                            position: 'middle',
                            duration: 1500
                        });
                    }else if(res.data.status==0){//发送成功
                        Toast({
                            message:res.data.data,
                            position: 'middle',
                            duration: 1500
                        });
                        setTimeout(()=>{
                            // 跳转时不让其产生历史记录
                            this.$router.replace({
                                path:'/getCode',
                                query:{tel:this.clear_input,redirect:this.redirect}
                            })
                        },1500)
                    }
                })
            }
        },

         //1.清空输入框内容
        clearInput(){
            this.clear_input = '';
            this.Show = false;
        },
        // 2.input事件删除按钮显示
        changeShow(){
            this.Show = true;
        },
        //3.blur事件
        change(){
            setTimeout(()=>{
                this.Show = false;
            },0)
        },
        //4.focuss事件
        nav(){
            if(this.clear_input){
                this.Show = true;
            }else{
                this.Show = false;
            }
        }
    }
}
</script>

<style lang="scss">
    .codeBox{
        width:100%;
        .mint-header {
            background: #fff;
            height: 0.5rem;
            border-bottom:1px solid #ddd;
            .mint-button-icon {
                color: #404040;
            }
            .mint-header-title {
                font-size: 0.15rem;
                color: #404040;
            }
        }
         .contentBox{
            width:100%;
            height:100%;
            margin-top:0.5rem;
            padding:0 0.21rem;
            h2{
                display:flex;
                align-items:flex-end;
                width:100%;
                height:0.56rem;
                font-size:0.3rem;
                color:#323232;
            }
            .content{
                width:100%;
                height:1.16rem;
                margin-top:0.36rem;
                .iphoneBox{
                    width:100%;
                    height:0.36rem;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    border-bottom:1px solid #9d9d9d;
                    position:relative;
                    span{
                        width:0.5rem;
                        font-size:0.12rem;
                        color:#5f5f5f;
                    }
                    input{
                        height:0.35rem;
                        border:none;
                        width:100%;
                        font-size:0.15rem;
                        color:#333;
                    }
                    img{
                        width:0.14rem;
                        height:0.13rem;
                        position: absolute;
                        top:50%;
                        right:0.1rem;
                    }
                }
                p{
                    margin-top:0.1rem;
                    font-size:0.1rem;
                    color:#606060;
                }
            }
            >input:nth-of-type(1){
                border:none;
                margin-bottom:0.58rem;
                width:100%;
                height:0.4rem;
                font-size:0.16rem;
                color:#fff;
                display:flex;
                justify-content:center;
                align-items:center;
                border-radius:0.2rem;
                background:#0359d4!important;
            }
            .contentText{
                width:100%;
                display:flex;
                justify-content:space-between;
                padding:0 0.15rem 0 0.07rem;
                margin-bottom:1.38rem;
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
</style>
