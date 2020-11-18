<template>
    <!-- 注册、开户、出借流程--未出借时显示，已出借时隐藏 -->
    <div class="Nav_roalBox" v-show="!isShow2">
        <ul class="roalBox">
            <li>
                <div class="roal1">
                    <span>注册</span>
                    <img  v-if="!isShow"  src="../../../assets/注册灰.png" alt="">
                    <img v-else src="../../../assets/注册.png" alt="" >
                </div>
                <div class="roal2">
                    <img v-if="!isShow" src="../../../assets/箭头2.png" alt="">
                    <img v-else src="../../../assets/箭头1.png" alt="">
                </div>
            </li>
            <li>
                <div class="roal3">
                    <span>开户</span>
                    <img v-if="!isShow1" src="../../../assets/开户灰.png" alt="">
                    <img v-else  src="../../../assets/开户.png" alt="">
                </div>
                <div class="roal4">
                    <img v-if="!isShow1" src="../../../assets/箭头2.png" alt="">
                    <img v-else src="../../../assets/箭头1.png" alt="">
                </div>     
            </li>
            <li>
                <div class="roal5">
                    <span>出借</span>
                    <img v-if="!isShow2" src="../../../assets/出借灰.png" alt="">
                    <!-- <img v-else src="../../../assets/出借灰.png" alt=""> -->
                </div>     
            </li>
            <li>
                <router-link v-if="!isShow" :to="{path:'/login',query:{redirect:'/home'}}"  tag="span">立即注册</router-link>
                <router-link v-else-if="!isShow1" :to="{path:'/realname1'}"  tag="span">立即开户</router-link>
                <router-link v-else :to="{path:'/project'}"  tag="span">立即出借</router-link>
            </li>
            <!-- 立即开通存管账户弹窗(注册但未开户时弹出) -->
                <Dialog :show="popupVisible1"></Dialog> 
            <!--设置徽商交易密码（开户但未出借时弹出）  -->
            <mt-popup v-model="popupVisible" closeOnClickModal>
                <div class="bankBox">
                    <p>温馨提示</p>
                    <p>银行存管系统已正式运行！为保障您的资金安全，请设置交易密码。</p>
                    <p>
                        <span @click="popupVisible=!popupVisible">取消</span>
                        <router-link tag="span" :to="{path:'/trade_mm'}">确认</router-link>
                    </p>
                </div>
            </mt-popup>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Dialog from '@/components/TheDialog1.vue'
export default {
    components:{
       Dialog 
    },
    data(){
        return{
            isShow:false,//控制注册状态变量
            isShow1:false,//控制开户状态变量
            isShow2:false,//控制出借状态变量
            popupVisible1:false,//控制立即开通存管账户的变量
            popupVisible:false//控制设置徽商交易密码的变量
        }
    },
    computed:{
        //1.注册状态
        ...mapState({
            user_id:state=>state.login.token.user_id
        }),
        //2.开户状态
        // ...mapState({//方式一
        //     is_identify:state=>state.login.token.is_identify//开户状态
        // }),
        is_identify:{//方式二
            get(){
                return this.$store.state.login.token.is_identify
            },
            set(val){
                this.$store.state.login.token.is_identify = val;
            }
        },
        //3.出借状态
        // ...mapState({//方式一
        //     invest_count:state=>state.login.token.invest_count//出借状态
        // }),
        invest_count:{//方式二
            get(){
                return this.$store.state.login.token.invest_count
            },
            set(val){
                this.$store.state.login.token.invest_count = val;
            }
        },
        //4.设置交易密码状态
        ...mapState({
            is_set_trade_pwd:state=>state.login.token.is_set_trade_pwd
        })
    },
    methods:{
        // 1.分角色判断
        getToken(){
            // debugger;
            if(this.user_id){//判断注册状态
               this.isShow = true;
            }
            if(+this.is_identify==1){//判断开户状态(0未实名1实名)
               this.isShow1 = true;
             // console.log(typeof this.is_identify)
            }
            if(+this.invest_count){//判断出借状态(0-N);0代表未出借
                this.isShow2= true;
                // console.log(typeof this.invest_count)
            }
        },
        //2.立即开户弹窗    
        changeDialog(){
           var roal1 = sessionStorage.getItem('roal');//初始化时只弹出一次
           if(this.user_id && +this.is_identify==0 && !roal1){//判断是否开户
                sessionStorage.setItem('roal','判断是否开户');
                this.popupVisible1 = true;//注册但未开户（每次会话开始时弹出）
           }
        },
        //3.是否设置交易密码弹窗
        changePassword(){
            var pwd = sessionStorage.getItem('pwd');//初始化时只弹出一次
            if(+this.is_identify==1 && +this.invest_count==0 && +this.is_set_trade_pwd==0 && !pwd){//判断是否设置交易密码状态（ 0未设置,1已设置）
                sessionStorage.setItem('pwd','判断是否设置交易密码');                                                                                                
                this.popupVisible = true;//已开户、未出借、并且未设置交易密码时弹出框显示（每次会话开始时弹出）
                // console.log(typeof +this.invest_count)
           }
        },
        // 4.同步更新开户、出借状态
        changeStatus(){
            if(this.user_id){//用户登录之后才被允许请求用户信息接口，进行状态更新
                this.$post('/rongtuojinrong/userCenter/accountInformation/userInformation.json').then(res=>{
                    this.is_identify = res.data.data.is_identify;//开户状态
                    this.invest_count = res.data.data.whether_lend;//出借状态
                    // console.log(res.data.data.whether_lend)
                })
            }
        }
    },
    created(){
        this.changeStatus();//执行同步更新开户、出借状态的方法（进入首页时更新到最新状态）
        this.getToken();//执行分角色方法
        this.changeDialog();//执行立即开户弹窗
        this.changePassword();//执行设置密码弹窗
        // console.log(this.$store)
    }
}
</script>

<style lang="scss" scoped>
    .Nav_roalBox{
        width:100%;
        height:1.18rem;
        background:#f9f9f9;
        padding:0 0.11rem;
        display:flex;
        justify-content:center;
        align-items:center;
        .roalBox{
            width:100%;
            height:0.75rem;
            background:#fff;;
            display:flex;
            border-radius:0.37rem;
            li:nth-child(1){
                width:0.95rem;
                height:0.75rem;
                display:flex;
                justify-content:center;
                align-items:center;
                .roal1{
                   display:flex;
                   flex-direction:column;
                   justify-content:center;
                   align-items:center;
                   margin-right:0.18rem;
                   span{
                       color:#333;
                       font-size:0.11rem;
                       margin-bottom:0.05rem;
                   }
                   img{
                    //    width:0.22rem;
                       height:0.20rem;
                   }
                }
                .roal2{
                    margin-top:0.2rem;
                    img{
                        width:0.12rem;
                        height:0.12rem;
                    }
                }
            }
            li:nth-child(2){
                width:0.68rem;
                height:0.75rem;
                display:flex;
                justify-content:flex-start;
                align-items:center;
                .roal3{
                   display:flex;
                   flex-direction:column;
                   justify-content:center;
                   align-items:center;
                   margin-right:0.22rem;
                   span{
                       color:#333;
                       font-size:0.11rem;
                       margin-bottom:0.05rem;
                   }
                   img{
                    //    width:0.22rem;
                       height:0.20rem;
                   }
                }
                .roal4{
                    margin-top:0.2rem;
                    img{
                        width:0.12rem;
                        height:0.12rem;
                    }
                }
            }
            li:nth-child(3){
                width:0.55rem;
                height:0.75rem;
                display:flex;
                justify-content:flex-start;
                align-items:center;
                margin-left:8px;
                .roal5{
                   display:flex;
                   flex-direction:column;
                   justify-content:center;
                   align-items:center;
                   span{
                       color:#333;
                       font-size:0.11rem;
                       margin-bottom:0.05rem;
                   }
                   img{
                    //    width:0.22rem;
                       height:0.20rem;
                   }
                }
            }
            li:nth-child(4){
                width:1.23rem;
                height:0.75rem;
                display:flex;
                justify-content:flex-start;
                align-items:center;
                span{
                    width:0.86rem;
                    height:0.33rem;
                    background:url(../../../assets/圆角矩形11.png) no-repeat center;
                    background-size:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    color:#fff;
                    font-size:0.11rem;
                }
            }
            .mint-popup{
                border-radius:0.1rem;
                overflow: hidden;
                 .bankBox{
                    width:2.7rem;
                    background:#f8f8fa;
                    border-radius: .1rem;
                    p:nth-child(1){
                        width:100%;
                        font-size:0.16rem;
                        font-weight:bold;
                        color:#030501;
                        display:flex;
                        justify-content:center;
                        align-items:flex-end;
                        padding:0.22rem 0 0.06rem 0;
                    }
                    p:nth-child(2){
                        width:100%;
                        line-height:0.18rem;
                        font-size:0.15rem;
                        color:#000;
                        display:flex;
                        justify-content:center;
                        padding:0 0.21rem 0.25rem 0.2rem;  
                        border-bottom:1px solid #ddd;              
                    }
                    p:nth-child(3){
                        width:100%;
                        height:0.44rem;
                        display:flex;
                        span:nth-child(1){
                            width:50%;
                            border-right:1px solid #ddd;
                            // display:flex;
                            // justify-content:center;
                            // align-items:center;
                            text-align:center;
                            line-height:0.44rem;
                            font-size:0.15rem;
                            color:#6e6e70;
                        }
                        span:nth-child(2){
                            width:50%;
                            // display:flex;
                            // justify-content:center;
                            // align-items:center;
                            text-align:center;
                            line-height:0.44rem;
                            font-size:0.15rem;
                            color:#e3726e;
                        }               
                    }
                }
            }
        }  
    }
</style>
