 <template>
    <div class="mineContent">
        <div v-if="this.$store.state.invite.invite.is_md==0">

            <ul class="mineContent-1">
                <!-- <router-link class="mineContent-1-c mineContent-1-c-1" to="/Recharge">充值</router-link> -->
                <!-- <router-link :to="{name:'cash'}" class="mineContent-1-c mineContent-1-c-2" tag="li">取现</router-link> -->
                <li class="mineContent-1-c mineContent-1-c-1" @click="congZ">充值</li>
                <li  class="mineContent-1-c mineContent-1-c-2"  @click="bindCard">取现</li>
            </ul>
            <div v-if="this.$store.state.invite.invite.risk_grade==0" class="pingguTs">
                <div>您尚未进行风险承受能力评估</div>
                <div @click="quPingg">
                    <van-button type="info" size="small" color="#0099e9">去评估</van-button>
                </div>
            </div>
            <ul class="mineContent-2">
                <router-link :to="{name:'creDitor'}" class="mineContent-2-c" tag="li">
                    <div class="mineContent-2-c-a">
                        <img src="../../assets/img59.png">
                    </div>               
                    <span>我的债权</span>
                </router-link>
                <router-view></router-view>
                <router-link :to="{name:'Bill'}" class="mineContent-2-c" tag="li">
                    <div class="mineContent-2-c-a">
                        <img src="../../assets/img57.png">
                    </div>               
                    <span>我的账单</span>
                </router-link>
                <router-link :to="{name:'shouYi'}" class="mineContent-2-c" tag="li">
                    <div class="mineContent-2-c-a">
                        <img src="../../assets/img56.png">
                    </div>               
                    <span>已赚收益</span>
                </router-link>
                <router-link :to="{name:'plan'}" class="mineContent-2-c" tag="li">
                    <div class="mineContent-2-c-a">
                        <img src="../../assets/img58.png">
                    </div>                
                    <span>回款计划</span>
                </router-link>
            </ul>
        </div>



        <!-- <div class="mineContent-4">
            <div class="mineContent-4al">
                <div class="mineContent-4a">
                    <img src="../../assets/ld_05.png">
                </div>
            </div>

            <div class="mineContent-4b">
                <div class="mineContent-4b1">
                    <span>总资产（元）</span>
                    <span>4932.45</span>
                </div>
                <div class="mineContent-4b2">
                    <div class="mineContent-4b2a">
                        <div class="mineContent-4b2a-1">充值</div>
                        <div class="mineContent-4b2a-1 mineContent-4b2a-2">提现</div>
                    </div>
                    <router-link :to="{name:'rtjr'}" class="mineContent-4b2b" tag="div">
                        <img src="../../assets/hk_8.png">
                    </router-link>
                </div>
            </div>
        </div>

        <div class="mineContent-4 mineContent-5">
            <div class="mineContent-4al">
                <div class="mineContent-4a">
                    <img src="../../assets/ld_06.png">
                </div>
            </div>

            <div class="mineContent-4b">
                <div class="mineContent-4b1">
                    <span>总资产（元）</span>
                    <span>4932.45</span>
                </div>
                <div class="mineContent-4b2">

                    <router-link :to="{name:'rtmd'}" class="mineContent-4b2b" tag="div">
                        <img src="../../assets/hk_8.png">
                    </router-link>
                </div>
            </div>
        </div> -->


        <div class="mineContent-3">
            <ul>
                <router-link :to="{name:'card'}" tag="li">
                    <span class="mineContent-3-s">我的卡券</span>
                    <div class="mineContent-3-c">
                        <span>{{jrdetail.CouponSum}}张</span>
                        <img src="@/assets/img63.png">
                    </div>                   
                </router-link>
                <router-link tag="li" to="/myintegral">
                    <span class="mineContent-3-s">我的积分</span>
                    <div class="mineContent-3-c">
                        <span>{{zjf.points}}积分</span>
                        <img src="@/assets/img63.png">
                    </div>    
                </router-link>

                <router-link to="/myinviteindex" tag="li" v-if="jrdetail.InviterLevel==3">
                    <span class="mineContent-3-s">我的邀请</span>
                    <div class="mineContent-3-c">
                        <span>已邀请{{jrdetail.InviteeSum}}位好友</span>
                        <img src="@/assets/img63.png">
                    </div>                   
                </router-link>

                <router-link tag="li" to="/commonuser"  v-if="jrdetail.InviterLevel==1">
                <span class="mineContent-3-s">我的邀请</span>
                    <div class="mineContent-3-c">
                        <span>已邀请{{jrdetail.InviteeSum}}位好友</span>
                        <img src="@/assets/img63.png">
                    </div>  
                </router-link>
                <router-link tag="li" v-if="jrdetail.InviterLevel==2"   to="/NOcommonuser">
                 <span class="mineContent-3-s">我的邀请</span>
                    <div class="mineContent-3-c">
                        <span>已邀请{{jrdetail.InviteeSum}}位好友</span>
                        <img src="@/assets/img63.png">
                    </div>
                </router-link>
                 

                <router-link class="mail-sign" tag="li" :to="{name:'mail'}">
                    <span class="mineContent-3-s">站内信</span>
                    <span v-if="is_unread==1" class="mail-sign-s">●</span>
                    <div class="mineContent-3-c">
                        <span v-if="is_unread==1">您有未读的站内信</span>
                        <span v-else>全部已读</span>                       
                        <img src="@/assets/img63.png">
                    </div>                   
                </router-link>
                <li>
                    <span class="mineContent-3-s">我要借款</span>
                    <div class="mineContent-3-c">
                        <span class="mineContent-3-c-ls">请登录官网申请</span>                        
                    </div>                   
                </li> 
            </ul>
        </div>
 
        <the-dialog :show="showDialog">
        </the-dialog>

        <the-dialog1 :show="showDialog1">
        </the-dialog1>

    </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import TheDialog from '@/components/TheDialog1'
import TheDialog1 from '@/components/TheDialog'
export default {
    data() {
            return {
                // 控制弹窗组件的初始显示与隐藏
                showDialog: false,
                showDialog1: false,
                jrdetail: {},
                zjf: {},
                personal: {}
            }
        },
    computed:{
        is_unread:{//方式一
            get(){
                return this.$store.state.invite.invite.is_unread//is_unread：1为有未读站内信，0为无未读站内信
            }
        },
    },
    methods: {
         //定义请求用户信息接口方法
        receiveUserInfo(){
            if(this.is_unread){//登录后才能发送请求
                    this.$post('/rongtuojinrong/userCenter/accountInformation/userInformation.json').then(res=>{
                    this.$store.dispatch('changeInvite',res.data.data);
                })
            }
        },
        quPingg(show){
            if(this.$store.state.login.token.is_identify==0){
                this.showDialog = show;
            }else{
                this.$router.push({
                    name:'fengxian'
                })
            }   
        },

        congZ(show){
            if(this.$store.state.login.token.is_identify==0){
                this.showDialog = show;
                return false;
            }else if(this.$store.state.invite.invite.is_huishang_binding_bankcard==0){
                this.showDialog1 = show;
                return false;
            }else{
                this.$router.push({
                    name:'Recharge'
                })
            }            

        },

        bindCard(show){
            
            if(this.$store.state.login.token.is_identify==0){
                this.showDialog = show;
                return false;
            }else if(this.$store.state.invite.invite.is_huishang_binding_bankcard==0){
                this.showDialog1 = show;
                return false;
            }else{
                this.$router.push({
                    name:'cash'
                })
            }
            
        }
        // cancel(show) {
        //     this.showDialog = show
        // },
        // confirm(show) {
        //     this.showDialog = show
        // },
        // cancel2(show) {
        //     this.showDialog2 = show
        // },
        // confirm2(show) {
        //     this.showDialog2 = show;
        // },
    },
    components:{
        TheDialog,
        TheDialog1
    },
    created(){
      this.receiveUserInfo();
      this.$post('/rongtuojinrong/userCenter/totalAssetsDetails.json')
      .then(res=>{
        this.jrdetail = res.data.data;    
        // console.log(this.jrdetail);

      })
      .catch(err=>{

      }) 

      this.$post('/rongtuojinrong/points/getTotal.json')
      .then(res=>{
        this.zjf = res.data.data;    
        // console.log(this.zjf);

      })
      .catch(err=>{

      }) 

    // this.$post("/rongtuojinrong/userCenter/accountInformation/userInformation.json",{
    //     }).then(res=>{
    //     this.personal=res.data.data;
    //     this.$store.dispatch('changeInvite',res.data.data);

    //     //判断接口请求中defidenshuxing的值

    //     //未实名
    //     if(this.$store.state.login.token.is_identify==0){
    //         console.log(0);
    //         this.$store.dispatch('changeDefidenshuxing',0);
    //     //已实名    
    //     }else{  
    //         //出借个人          
    //         if(res.data.data.primary_role==0){
    //             //已借款的借款个人 
    //             if(res.data.data.is_lend==1){
    //                 console.log(2);
    //                 this.$store.dispatch('changeDefidenshuxing',2);
    //             //未借款的借款个人    
    //             }else{
    //                 // console.log(1);
    //                 this.$store.dispatch('changeDefidenshuxing',1);
    //             }
    //         }
    //         //借款企业
    //         if(res.data.data.primary_role==1){
    //             console.log(2);
    //             this.$store.dispatch('changeDefidenshuxing',2);
    //         }
    //         //担保企业
    //         if(res.data.data.primary_role==2){
    //             console.log(4);
    //             this.$store.dispatch('changeDefidenshuxing',4);
    //         }
    //     }        

    //     });
    }
}
</script>

<style lang="scss" scoped>
body{
    .mineContent{           
        margin: 0 0.11rem 0;
        border-radius: 0.07rem;
        padding-bottom: 0.5rem;
        .mineContent-1{
            background-color: #ffffff;
            display: flex;
            border-bottom: 1px solid #eff2f8;
            margin-top: 0.075rem;
            .mineContent-1-c-1{
                color: #ff6632;
                border-right: 1px solid #eff2f8;
            }
            .mineContent-1-c-2{
                color: #0099e9;
            }
            .mineContent-1-c{
                font-size: 0.15rem;               
                height: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50%;
            }
        }
        .pingguTs{
            display: flex;
            justify-content: space-between;
            background-color: #ffffff;
            height: 0.5rem;
            line-height: 0.5rem;
            border-bottom: 1px solid #eff2f8;
            padding: 0 0.15rem;
            color: #333333;
        }
        .mineContent-2{
            background-color: #ffffff;
            height: 0.84rem;
            display: flex;
            justify-content: space-around;
            border-radius: 0.08rem;
            .mineContent-2-c{
                color: #333333;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .mineContent-2-c-a{
                    width: 0.255rem;
                    height: 0.26rem;
                    margin-bottom: 0.11rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                img{
                    width: 0.255rem;
                    
                }            
            }
        }
        .mineContent-3{
            font-size: 0.12rem;
            background-color: #ffffff;
            margin: 0.1rem auto 0;
            border-radius: 0.08rem;
            ul li{
                height: 0.51rem;
                display: flex;
                align-items: center;
                padding: 0 0.18rem 0;
                justify-content: space-between;
                border-bottom: 1px solid #eff2f8;
                .mineContent-3-s{
                    color: #333333; 
                }
                .mineContent-3-c{
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 0.1rem;
                    }
                    .mineContent-3-c-ls{
                        margin-right: 0;
                    }
                }
            }
            ul li.mail-sign{
                position: relative;
                .mail-sign-s{
                    position: absolute;
                    left: 0.55rem;
                    top: 0.08rem;
                    color: red;
                }
            } 
            ul li img{
                display: inline-block;
                width: 0.06rem;
            }

        }
        // .mineContent-4{
        //     background-color: #fff;
        //     border-radius: 0.1rem;
        //     margin: -0.5rem auto 0.1rem;
        //     padding-bottom: 0.2rem;
        //     .mineContent-4al{
        //         padding: 0.1rem;
        //         .mineContent-4a{
        //             width: 1.3rem;
        //             height: 0.2rem;
        //             margin: 0 auto;
        //             img{
        //                 max-width: 100%;
        //                 height: auto;
        //             }
        //         }
        //     }

        //     .mineContent-4b{
        //         padding: 0 0.18rem;
        //         display: flex;
        //         justify-content: space-between;
        //         .mineContent-4b1{
        //             display: flex;
        //             flex-direction: column;
        //             span:first-of-type{
        //                 margin-bottom: 0.1rem;
        //             }
        //             span:nth-child(2){
        //                 color: black;
        //                 font-size: 0.2rem;
        //             }
        //         }
        //         .mineContent-4b2{
        //             display: flex;
        //             align-items: center;
        //             .mineContent-4b2a{
        //                 .mineContent-4b2a-1{
        //                     width: 0.64rem;
        //                     height: 0.215rem;
        //                     line-height: 0.215rem;
        //                     background-color: #0058d5;
        //                     color: #fff;
        //                     text-align: center;
        //                     border-radius: 0.03rem;
        //                     margin-bottom: 0.1rem;
        //                 }
        //                 .mineContent-4b2a-2{
        //                     background-color: #fff;
        //                     color: #0058d5;
        //                     border: 1px solid #0058d5;
        //                     margin-bottom: 0;
        //                 }
        //             }
        //         }
        //     }
        // }
        // .mineContent-5{
        //     margin-top: 0.1rem;
        // }
    }
}    
</style>
