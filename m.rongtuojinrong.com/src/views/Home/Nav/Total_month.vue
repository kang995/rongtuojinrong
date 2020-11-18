<!-- 回款计划--月度总览 -->
<template>
    <div id="todalmonth">
        <!-- <mt-header title="月度总览" fixed :style="{background:bgcolor}">
            <router-link to="/plan" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerup title="月度总览" :style="{background:bgcolor,transition:'background 1s'}" to="back">
        </headerup>
        <div class="total_topimg">
            <img src="../../../assets/totalmonth_1.png" alt="">
        </div>

        <div class="month_con">
            <div class="total_mav">
                <div  @click="changeYear(choose_year-1)"><img src="../../../assets/totalmonth_3.png" alt="">{{choose_year-1}}年</div>
                <div>{{choose_year}}年</div>
                <div  @click="changeYear(choose_year+1)">{{choose_year+1}}年<img src="../../../assets/totalmonth_2.png" alt="">
                </div>
                <p  class="dv_img i_1" alt=""></p>
                <p  class="dv_img i_2" alt=""></p>
            </div>


            <div class="list_gorup">

                <div v-for="item in Datas.Detail" :key="item.id" class="list_gorup_li">
                    <div class="div_1">
                        <p :class="{mouth_num:item.receiveMonth==this_month&&this_year==choose_year}">{{parseInt(item.receiveMonth)}}月</p>
                        <div v-if="item.receiveMonth==this_month&&this_year==choose_year" class="benyue_img">

                        </div>
                    </div>
                    <div class="div_2">
                         <div class="div_21" v-if="this_month<=item.receiveMonth">
                            <p>
                                待收本金
                                <br>{{item.receiveMoney}}元
                            </p>
                            <p>
                                待收利息
                                <br>{{item.receiveInterest}}元
                            </p>
                        </div>
                        <div class="div_21" v-if="this_month>=item.receiveMonth">
                            <p> 已收本金
                                <br>{{item.hadReceiveMoney}}元</p>
                            <p> 已收利息
                                <br>{{item.hadReceiveInterest}}元</p>
                        </div>
                    </div>
                </div>

                <div class="wushuju" v-if="nolist">
                    <img src="../../../assets/hk_10.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerup from '@/components/headerUp';
    export default {
        name: 'todalmonth',
        components:{
            headerup
        },
        data() {
            return {
                choose_year: '',
                Datas:[],
                this_month : 0,
                this_year:0,
                nolist:false,
                bgcolor:'transparent'
            }
        },
        methods: {
            changeYear(num){
                let postdata = {
                    //向后台传入user_id
                         user_id:31753,
                         year:num
                  };
                this.Datas = [];
                this.$toast.loading({
                    mask: false,
                    duration: 0,
                    message: '加载中...',
                    forbidClick: true,
                });
                //https://php.rongtuojinrong.com/rongtuoxinsoc/Huishang?CmdId=MonthRecivesCashPlan&UserId=31753&Token=73e556fbfd92cd029e6e860780b42a64&defidenshuxing=1&platformiOS=iOS&AppTime=1566021219&FlagChnl=1&Month=2019-08&AppId=iOS
                this.$post('/rongtuojinrong/repayment/totalMonth.json',postdata).then(res=>{
                    this.Datas =  res.data.data;
                    // console.log(res.data.data.Detail.length);
                    if(this.Datas.Detail==null||this.Datas.Detail.length==0){
                        this.nolist =true;
                    }else{
                        this.nolist =false;
                    }
                    this.$toast.clear();
                })
                this.choose_year = num;
                if(this.choose_year<this.this_year){
                    this.this_month = 99;
                }else if(this.choose_year>this.this_year){
                    this.this_month = 0;
                }else{
                    this.this_month = new Date().getMonth()+1;
                }
            },
            onscroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop<40){
                    this.bgcolor = 'transparent';
                }else{
                    this.bgcolor = '#0159d5!important';
                }
            },
            closeMain(val){
                console.log(val)
            }
        },
        created() {
            this.choose_year = new Date().getFullYear();
            this.this_month = new Date().getMonth()+1;//设置当前月份 用来计算当月样式
            this.this_year = new Date().getFullYear();//设置当前月份 用来计算当月样式
            this.changeYear(this.choose_year);
            setTimeout(() => {
                window.onscroll = this.onscroll;
            }, 0);
        },
        destroyed () {
            window.onscroll = null;
        }
    }
</script>


<style lang="scss" scoped>
    .month_total {
        font-size: 0.14rem;
    }

    .mint-header {
        background-color: transparent!important;
        font-size: 0.15rem !important;
    }

    .mint-header label.mint-button-text {
        font-size: 0.14rem!important;
        font-weight: 0!important;
        margin-top: 10px;
    }

    .total_topimg img {
        width: 3.75rem;
    }

    .month_con {
        margin: 0.12rem;
        margin-top: -0.9rem;
        background: #fff;
        position: relative;
        z-index: 1;
        border-radius: 8px;
        padding: 0 0.12rem;
        font-size: 0.125rem;
        .total_mav {
            display: flex;
            justify-content: space-between;
            height: 0.5rem;
            align-items: center;
            color: #999;
            font-size: 0.1111rem;
            position: relative;
            .dv_img{
                top: 0.4rem;
                border-radius: 50%;
                position: absolute;
                width: 0.11rem;
                height: 0.11rem;
                z-index: 2;
            }
            .i_1 {
                background-color: rgb( 79, 95, 253 );
                left: -0.17rem;
            }
            .i_2 {
                background-color: rgb( 52, 144, 255 );
                right: -0.17rem;
            }
            div {
                display: flex;
                align-items: center;
                img {
                    height: 0.13rem;
                    width: 0.13rem;
                    margin: 0 2px;
                }
                &:nth-child(2) {
                    color: #333;
                    font-size: 0.14rem;
                }
            }
        }
        .list_gorup_li {
            display: flex;
            justify-content: space-between;
            margin: 0.15rem 0;
            align-items: center;
            .div_1 {
                line-height: 0.2rem;
                position: relative;
                .mouth_num {
                    color: #fff;
                }
                .benyue_img {
                    width: 0.35rem;
                    height: 0.35rem;
                    background: url(../../../assets/totalmonth_4.png) no-repeat center;
                    position: absolute;
                    top: -0.08rem;
                    left: -0.065rem;
                    z-index: -1;
                    background-size: cover;
                }
            }
            .div_2{
                width: 70%;
                .div_21{
                    display: flex;
                    justify-content: space-around;
                    p{
                        width: 50%;
                        margin: 0.05rem 0;
                    }
                     &:nth-child(2) {
                        color: #0159d5;
                        font-size: 0.14rem;
                    }
                }
            }
        }
    }
    .wushuju{
        img{
            width: 0.98rem;
            height: 0.98rem;
            margin: 2rem auto 0;
        }
        p{
            margin-top: 0.1rem;
            text-align: center;
        }
    }
</style>
