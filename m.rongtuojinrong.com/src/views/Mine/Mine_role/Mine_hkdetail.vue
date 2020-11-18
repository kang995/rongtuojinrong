<template>
  <div class="hkdetailBox">
        <headerBox :title="dat"/>
        <div class="content" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="10"    
        >
            <van-tabs v-model="active" line-width="33%" title-active-color="#2457CD" line-height="1px" color="#2457CD" background="#FFFFFF" @click="onClick" sticky :offset-top='topT'>
                <van-tab  title="全部  " class="contentlist">
                    <div v-if="sign!=null" class="hkdetailBox-2">
                        <ul>
                            <li v-for="(detail,index) in list" :key="index">
                                <div class="hkdetailBox-2a">
                                    <span>{{detail.pro_code}}({{detail.cycle_time}}个月)</span>
                                    <span>出借编号：{{detail.ord_id}}</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2b">
                                    <span>利息</span>
                                    <span>{{detail.money}}元</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2c">
                                    <span>{{detail.payment_date}}</span>
                                    <span>出借金额：{{detail.bid_amt}}元</span>
                                </div>
                            </li>
                        </ul>
                    </div>   
                    <div v-else class="nullinfo">
                        <div class="shownull">
                            <img src="@/assets/sm_19.jpg">
                        </div>
                    </div>                               
                </van-tab>
                <van-tab  title="回收利息  " class="contentlist">
                    <div v-if="sign!=null" class="hkdetailBox-2">
                        <ul>
                            <li v-for="(detail,index) in list" :key="index">
                                <div class="hkdetailBox-2a">
                                    <span>{{detail.pro_code}}({{detail.cycle_time}}个月)</span>
                                    <span>出借编号：{{detail.ord_id}}</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2b">
                                    <span>利息</span>
                                    <span>{{detail.money}}元</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2c">
                                    <span>{{detail.payment_date}}</span>
                                    <span>出借金额：{{detail.bid_amt}}元</span>
                                </div>
                            </li>
                        </ul>
                    </div>   
                    <div v-else class="nullinfo">
                        <div class="shownull">
                            <img src="@/assets/sm_19.jpg">
                        </div>
                    </div>                                            
                </van-tab>
                <van-tab  title="回收本金 " class="contentlist">
                    <div v-if="sign!=null" class="hkdetailBox-2">
                        <ul>
                            <li v-for="(detail,index) in list" :key="index">
                                <div class="hkdetailBox-2a">
                                    <span>{{detail.pro_code}}({{detail.cycle_time}}个月)</span>
                                    <span>出借编号：{{detail.ord_id}}</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2b">
                                    <span>利息</span>
                                    <span>{{detail.money}}元</span>
                                </div>
                                <div class="hkdetailBox-2a hkdetailBox-2c">
                                    <span>{{detail.payment_date}}</span>
                                    <span>出借金额：{{detail.bid_amt}}元</span>
                                </div>
                            </li>
                        </ul>
                    </div>  
                    <div v-else class="nullinfo">
                        <div class="shownull">
                            <img src="@/assets/sm_19.jpg">
                        </div>
                    </div>                     
                </van-tab>
            </van-tabs>
        </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            active: 0,
            list: [],
            c_page:1,
            limit:20,
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
            flag: true,
            topT: 0,
            dat: '',
            sign: ''            
        }
    },
    methods:{
        onClick(){
            if(!this.flag){return}
            this.flag = false;
            this.list = [];
            this.c_page = 1;
            this.loading = false;
            this.hasMore = true;            
            this.loadMore();
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
            let {c_page,limit} = this; //不使用{}解构时的写法：let page = this.page           
            this.loading = true;//关闭无限滚动  5s
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            this.$post('/rongtuojinrong/userCenter/mindeng/getPayPlanList.json',{
            c_page,
            type: this.active,
            month_en: this.$route.query.months,
            }).then(res=>{
                this.flag = true;
                this.sign = res.data.data;
                if(res.data.data != null){
                    this.list = this.list.concat(res.data.data); 
                    this.loading = false;//继续开启无限滚动
                    this.$toast.clear();//关闭toast
                    if(res.data.data.length<20){
                        this.hasMore = false;
                        return false;
                    }                  
                            
                    this.c_page++;    
                }else{
                    this.$toast.clear();;//关闭toast
                    // this.$toast({
                    //     duration: 1000, 
                    //     message: '暂无数据'
                    // });                    
                }
                    
            })
        },         
        showCre(){
          
        }
    },
    created(){
        this.dat = this.$route.query.months1;
    },
    updated(){
        //获取当前html根节点的字体大小，设置吸顶高度
        let str = parseInt(document.documentElement.style.fontSize.slice(0,-2));       
        this.topT = str/2;
    }    
}
</script>

<style lang="scss" scoped>
.hkdetailBox{
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #e7eaf1;
    .content{
        padding-top: 0.5rem;
        .hkdetailBox-2{
            background-color: #fff;
            ul{
                li{
                    border-bottom: 1px solid #eeeeee;
                    .hkdetailBox-2a{
                        display: flex;
                        justify-content: space-between;
                        padding: 0.05rem 0.1rem;
                        font-size: 0.13rem;
                    }
                    .hkdetailBox-2b{
                        span:nth-child(2){
                            color: #0159d5;
                        }
                    }
                    .hkdetailBox-2c{
                        padding-bottom: 0.12rem;
                    }
                }
            }
        } 
        .nullinfo{
            background-color: #fff;
            display: flex;
            justify-content: center;
            padding-top: 1.5rem;
            position: fixed;
            width: 100%;
            height: 100%;
            .shownull{
                width: 1.5rem;
                img{
                    max-width: 100%;
                    height: auto;
                }
            }
        }               
    }
    // .hkdetailBox-1{
    //     background-color: #fff;
    //     margin-top: 0.5rem;
    //     ul{
    //         display: flex;
    //         li{
    //             width: 33.3%;
    //             height: 0.4rem;
    //             line-height: 0.4rem;
    //             text-align: center;
    //         }
    //         .active{
    //             border-bottom: 1px solid #0159d5;
    //             color: #0159d5;
    //         }

    //     }
    // }

}
</style>