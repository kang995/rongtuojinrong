<template>
    <div class="billBox"
     v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="30"
    >
        <headerBox title="账单">
            <span slot="rightTo" class="right_content saix">
                <van-icon name="filter-o" @click="showPopup"/>
            </span>           
        </headerBox>



        <van-popup v-model="popshow" position="right" :style="{ width:'70%',height: '100%' }" :close-on-click-overlay="false"> 
            <div class="billBox-pop">
                <span>设置筛选条件</span>
                <van-icon name="cross" @click="closePopup"/>
            </div>
            <div class="billBox-sel">
                <div class="screen-btn screen-all" :class="{active:isShow=='0,1,2,3,4,5'}" @click="chuanz('0,1,2,3,4,5')">全部</div>
                <p><span>收入</span></p>
                <div class="screen-sr">
                    <div class="screen-btn " :class="{active:isShow=='1'}" @click="chuanz('1')">充值</div>
                    <div class="screen-btn " :class="{active:isShow=='4'}" @click="chuanz('4')">回款</div>
                    <div class="screen-btn " :class="{active:isShow=='5'}" @click="chuanz('5')">奖励</div>
                    <div class="screen-btn " :class="{active:isShow=='0'}" @click="chuanz('0')">其他</div>
                </div>
                

                <p><span>支出</span></p>
                <div class="screen-sr">
                    <div class="screen-btn " :class="{active:isShow=='3'}" @click="chuanz('3')">出借</div>
                    <div class="screen-btn " :class="{active:isShow=='2'}" @click="chuanz('2')">提现</div>                   
                </div>

            </div>

          

        </van-popup>

        <ul class="billBox-u" v-if="sign!=0">
            <li  v-for="(detail,index) in monthslist" :key="index" :class="{toTop:index==numb}">
                <div class="billBox-u-d1" @click="clickShow(index,detail.Month)" >
                    <span>{{detail.Month}}</span>

                    <a v-if="detail.Month==nowDate" @click.stop="">
                        <span class="nodian">查看月账单</span>
                    </a>
                    <a v-else @click.stop="chaK(detail.Month)">
                        <span>查看月账单</span>
                    </a>                    
                    
                </div>

                <div v-for="mdetail in detail.detaillist" :key="mdetail.Id">
                    <div class="billBox-u-d2" v-if="detail.show">
                        <div class="billBox-u-d2-a">
                            <span class="qux" v-if="mdetail.Trench==2||mdetail.Trench==3">{{mdetail.Name}}</span>
                            <span class="huik" v-if="mdetail.Trench==4||mdetail.Trench==5">{{mdetail.Name}}</span>
                            <span class="congz" v-if="mdetail.Trench==1">{{mdetail.Name}}</span>
                            <span class="qit" v-if="mdetail.Trench==0">{{mdetail.Name}}</span>
                        </div>
                        <div class="billBox-u-d2-b">
                            <p class="billBox-u-d2-b1">
                                <span class="billBox-u-d2-b1s1">
                                    <span v-if="mdetail.Trench==0||mdetail.Trench==1||mdetail.Trench==4||mdetail.Trench==5">+</span>
                                    <span v-else>-</span>
                                    {{mdetail.Money}}
                                </span>
                                <span class="billBox-u-d2-b1s2">{{mdetail.Time*1000 | date-format3}}</span>
                            </p>
                            <p class="billBox-u-d2-b2">{{mdetail.Desc}}</p>
                            <p class="billBox-u-d2-b3">{{mdetail.YueDesc}}</p>
                        </div>
                    </div>
                </div>               
            </li>

        </ul>
        <div v-else class="nullinfo">
            <div class="shownull">
                <img src="@/assets/sm_19.jpg">
            </div>
        </div>
    </div>
    
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            popshow: false,
            show: false,
            num: '0,1,2,3,4,5',
            monthslist: [],
            page:1,
            limit:20,
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
            nownb: 0,
            detaillist: [],
            nowDate: '',
            sign: 10,
            numb: 0,
            isShow: '0,1,2,3,4,5'
        }
    },
    methods:{
        chaK(a){
            this.$router.push({
                name:'monthBill',
                query:{month:a}
            })
        },
        chuanz(z){
            this.isShow = z;
            this.popshow = false;
            this.num = z;
            this.monthslist = [];
            this.page = 1;
            this.loading = false;
            this.hasMore = true;
            this.loadMore();
        },
        showPopup(){
            this.popshow = true;
        },
        closePopup(){
            this.popshow = false;
        },
        clickShow(a,b){
            this.numb = a;
            
            //console.log(document.getElementsByClassName("toTop"));
            
            this.$set(this.monthslist[a], 'show', !this.monthslist[a].show);
            //console.log(!this.monthslist[a].show);
            if(!this.monthslist[a].show){
                return false;
            }
            //this.show=!this.show;
            this.nownb = a;
            this.$post('/rongtuojinrong/userCenter/bill/monthDetail.json',{
                defidenshuxing: this.$store.state.invite.defidenshuxing,
                deal_type: this.num,
                month: b
            })
            .then(res=>{
                this.$set(this.monthslist[a], 'detaillist', res.data.data.Records);
                //console.log(this.monthslist);

                // console.log("b",document.documentElement.scrollTop,tt.offsetTop);
                //window.scroll(0,tt.offsetTop);
                setTimeout(()=>{
                    var tt = document.querySelector('.toTop');
                    document.documentElement.scrollTop = tt.offsetTop;
                },50)
            })
            .catch(err=>{

            })
            

        },

        loadMore(){ //加载更多的方法  
            if(!this.hasMore){ //如果没有更多数据了
                    // this.$toast({
                    //     message: '我是有底线的....',
                    //     duration:2000,
                    //     position:"bottom"
                    // });
                    //关闭无限滚动
                this.loading = true;
                return false;//不在请求数据
                }
                this.getList() 
        },
        getList(){
            let {page,limit} = this; //不使用{}解构时的写法：let page = this.page           
            this.loading = true;//关闭无限滚动  5s
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            this.$post('/rongtuojinrong/userCenter/bill/monthList.json',{
            page,
            limit,
            defidenshuxing: this.$store.state.invite.defidenshuxing,
            deal_type: this.num
            }).then(res=>{
                this.sign = res.data.data.MonthList.length;
                console.log(this.sign);
                this.nowDate = res.data.data.CurDate;
                this.monthslist = this.monthslist.concat(res.data.data.MonthList);
                this.loading = false;//继续开启无限滚动
                this.$toast.clear();//关闭toast
                // if(page*limit >= res.data.data.Num){ //判断是否有更多数据
                //     this.hasMore = false; //没有更多数据了
                //     return false;
                // }               
                if(this.sign!=0){
                    this.clickShow(0,res.data.data.MonthList[0].Month);
                    this.$set(this.monthslist[0], 'show', true);
                }
                //this.clickShow(0,res.data.data.CurDate);

                if(res.data.data.MonthList.length<20){
                    this.hasMore = false;
                    return false;
                }
                
                this.page++;                        
            })
        },           
    },
    
    created(){
        
    },
    mounted(){

        
    }
}
</script>

<style lang="scss">
   
    .billBox{       
        background-color: #F4F5F9; 
        .saix{
            font-size: 0.2rem;
        }
        .van-popup--right{
            .billBox-pop{
                padding: 0 0.15rem;
                height: 0.3rem;
                line-height: 0.3rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e5e9f2;
                .van-icon-cross{
                    display: flex;
                    align-items: center;
                }
            }
            .billBox-sel{
                margin: 0.3rem 0.15rem 0;
                p span{
                    font-weight: bold;
                }
            }
            .screen-btn{
                width: 1rem;
                height: 0.25rem;
                line-height: 0.25rem;
                text-align: center;
                border: 1px solid #666;
                margin: 0.1rem 0;
                border-radius: 0.02rem;
            }
            .active{
                background: url('../../../assets/zd-001.png') no-repeat center;
                background-size: 100% 100%;
                border: none;
            }
           
            .screen-sr{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
        }
        
        .billBox-u{
            margin-top: 0.5rem;
            position: relative;
            li{
                // .fade-enter-active, .fade-leave-active {
                //     transition: opacity .5s;
                // }
                // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
                //     opacity: 0;
                // }
                .billBox-u-d1{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0.1rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    border-bottom: 1px solid #E5E5E5;
                    a{
                        .nodian{
                            color: #999;
                        }
                        span{
                            color: #134AC9;
                        }
                    }
                }

                .billBox-u-d2{
                    background-color: #fff;
                    padding: 0.1rem 3% 0.1rem 0;
                    display: flex;
                    border-bottom: 1px solid #eee;
                    .billBox-u-d2-a{
                        width: 20%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            width: 0.35rem;
                            height: 0.35rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 0.2rem;
                            background-color: red;
                            color: #ffffff;
                        }
                        .qux{
                            background-color: #FC6C6C;
                        }
                        .huik{
                            background-color: #F9A75B;
                        }
                        .congz{
                            background-color: #3B97FD;
                        }
                        .qit{
                            background-color: #79CBFF;
                        }
                    }
                    .billBox-u-d2-b{
                        width: 80%;
                        .billBox-u-d2-b1{
                            color: black;
                            display: flex;
                            justify-content: space-between;
                            .billBox-u-d2-b1s1{
                                font-weight: bold;
                            }
                        }
                        p{
                            height: 0.22rem;
                            line-height: 0.22rem;
                            white-space:nowrap; 
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                    }
                }
            }
        }
        .nullinfo{
            background-color: #fff;
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            .shownull{
                width: 1.5rem;
                img{
                    max-width: 100%;
                    height: auto;
                }
            }
        }
    }

</style>
