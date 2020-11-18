<!-- 回款计划详情 -->
<template>
    <div id="plandetail">
        <headerup :title="title" style="background:#fff"  to="back"></headerup>
        <div class="pland_nav">
            <div :class="{active:clicknum==0}" @click="search_plan(0)">全部</div>
            <div :class="{active:clicknum==1}" @click="search_plan(1)">回收利息</div>
            <div :class="{active:clicknum==2}" @click="search_plan(2)">回收本金</div>
        </div>

        <div class="pland_con">
            <div v-if="listData">
                <div class="pland_cli" v-for="item in listData" :key="item.id">
                    <div v-if="item.monthDayTitle=='本金'">
                        <img src="../../../assets/hk_12.png" alt="">
                    </div>
                    <div v-else>
                        <img src="../../../assets/hk_11.png" alt="">
                    </div>
                    <div>
                        <p>{{item.monthDayTitle}}</p>
                        <p>{{item.monthDayTime}}</p>
                    </div>
                    <div>
                        <p>{{item.monthDayMoney}}</p>
                        <p>{{item.monthDayProjectId}}</p>
                    </div>
                </div>
            </div>
            <div class="nosuju" v-else>
                <img src="../../../assets/hk_9.png" alt="">
                <p>已结清或无相关交易，请到账单查看！</p>
            </div>
        </div>
    </div>
</template>
<script>
import headerup from '@/components/headerUp';
    export default {
        name: 'plandetail',
        components:{
            headerup
        },
        data() {
            return {
                clicknum: 0,
                title:'',
                listData:[]
            }
        },
        methods: {
            search_plan(num){
                this.clicknum = num;
                this.$toast.loading({
                    mask: false,
                    duration: 0,
                    message: '加载中...',
                    forbidClick: true,
                });
                let postdata={
                    leixing:this.$route.query.type,
                    Type:num,
                    MonthDay:this.$route.query.date,
                    // PageNum:1,
                    // PageSize:15
                };

                this.$post('/rongtuojinrong/repayment/ReciveMoneyMonthDayDetail.json',postdata).then(res=>{
                    this.listData = res.data.data.Detail;
                    this.$toast.clear();
                })
            }
        },
        created() {
            // console.log(this.$route.params)
            this.search_plan(this.$route.query.hktype)
            let datearr = this.$route.query.date.split('-');
            if(datearr.length == 2){
                this.title = datearr[0]+'年'+ datearr[1]+'月'
            }else{
                this.title = datearr[0]+'年'+ datearr[1]+'月'+ datearr[2]+'日'
            }

        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .header_fixed .left i{
        color: #333!important;
    }
// >>>
    /deep/ .header_fixed p{
        color: #333!important;
    }

    .pland_nav{
        display: flex;
        padding-top: 0.4rem;
        div{
            width: 50%;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.135rem;

        }
        div.active{
            border-bottom: 2px solid #0159d5;
            color: #0159d5;

        }
    }
    .nosuju{
        text-align: center;
        img{
            width: 1rem;
            margin: 0.2rem auto;
        }
        p{
            font-size: 0.14rem;
        }
    }
    .pland_con{
        margin: 0.1rem;
        .pland_cli{
            display: flex;
            padding: 0.16rem 0.1rem;
            box-shadow: 0 2px 10px #e5e9f2;
            margin: 0.12rem 0;
            div{
                width: 33%;
                line-height: 0.2rem;
                &:nth-child(1){
                    width: 1rem;
                    img{
                        width: 0.42rem;
                        height: 0.42rem;
                    }
                }
                &:nth-child(2){
                    width: 2.4rem;

                    p{
                        &:nth-child(1){
                            font-size: 0.13rem;
                        }
                        &:nth-child(2){
                            font-size: 0.111rem;
                            color: #999;
                        }
                    }
                }
                &:nth-child(3){
                    width: 3.4rem;
                    text-align: right;
                    p{
                        &:nth-child(1){
                            font-size: 0.168rem;
                            color: #ff6633;
                            font-family: myFirstFont1;
                        }
                        &:nth-child(2){
                            font-size: 0.111rem;
                            color: #333;
                        }
                    }
                }
            }
        }

    }
</style>
