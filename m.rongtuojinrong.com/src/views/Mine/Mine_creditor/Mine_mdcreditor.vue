<template>
  <div class="zaiq">
    <headerBox title="我的债权"></headerBox>
    <div class="content" 
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10"    
    >
        <van-tabs v-model="active" animated line-width="33%" line-height="1px" title-active-color="#2457CD" color="#2457CD" background="#F2F5F7" @click="onClick" sticky :offset-top='topT'>
            <van-tab  title="全部  " class="contentlist">
                <div v-if="sign!=0">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <div class="creditorAll">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.pro_code}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.bid_amt}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.rate}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.plan_interest}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.trans_time}}</span>起投-<span>{{adetail.end_time}}</span>到期</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
                </div>
            </van-tab>
            <van-tab  title="未到期  " class="contentlist">
                <div v-if="sign!=0">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <div class="creditorAll">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.pro_code}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.bid_amt}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.rate}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.plan_interest}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.trans_time}}</span>起投-<span>{{adetail.end_time}}</span>到期</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
                </div>                       
            </van-tab>
            <van-tab  title="已到期 " class="contentlist">
                <div v-if="sign!=0">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <div class="creditorAll">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.pro_code}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.bid_amt}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.rate}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.plan_interest}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.trans_time}}</span>起投-<span>{{adetail.end_time}}</span>到期</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
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
            sign: 10,
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
            this.$post('/rongtuojinrong/userCenter/mindeng/getUserBidList.json',{
            c_page,
            pro_type: 0,
            finance_method: 0,
            trans_state: this.active   
            }).then(res=>{
                this.sign = res.data.data.length;
                this.flag = true;
                if(res.data.status == 0){
                    this.list = this.list.concat(res.data.data); 
                    this.loading = false;//继续开启无限滚动
                    this.$toast.clear();//关闭toast
                    if(res.data.data.length<20){
                        this.hasMore = false;
                        return false;
                    }                  
                            
                    this.c_page++;    
                }else{
                    this.$toast.clear();//关闭toast
                    this.$toast({
                        duration: 1000, 
                        message: '暂无数据'
                    });                    
                }
                    
            })
        },         
        showCre(){
          
        }
    },
    created(){

    },
    updated(){
        //获取当前html根节点的字体大小，设置吸顶高度
        let str = parseInt(document.documentElement.style.fontSize.slice(0,-2));       
        this.topT = str/2;
    }
}
</script>

<style lang="scss" scoped>
    .zaiq{
        width: 100%;
        min-height: 100%;
        position: absolute;
        background-color: #F2F5F7;
        .content{
            padding-top: 0.5rem;
            .contentlist{
                .nullinfo{
                    display: flex;
                    justify-content: center;
                    margin-top: 1.5rem;
                    flex-direction: column;
                    align-items: center;
                    .shownull{
                        width: 1rem;
                        img{
                            max-width: 100%;
                            height: auto;
                        }
                    }
                }                
                .creditorAllXX{
                    width: 100%;
                    border-bottom: 3px solid #e5e9f2;     
                    background-color: #FFFFFF;              
                    .creditorAll{
                        width: 95%;
                        margin: 0 auto;               
                        .detail{
                            .detail-p1{
                                height: 0.4rem;
                                line-height: 0.4rem;
                            }
                            .detail-u{
                                width: 90%;
                                margin: 0 auto;
                                display: flex;
                                justify-content: space-between;
                                li{
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    span:first-of-type{
                                        padding-bottom: 0.1rem;
                                    }
                                }
                            }
                            .detail-p2{
                                height: 0.4rem;
                                line-height: 0.4rem;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }                
            }
        }
    }
</style>