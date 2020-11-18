<template>
  <div class="zaiq">
    <headerBox title="我的债权"></headerBox>
    <div class="content" 
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10"    
    >
        <van-tabs v-model="active" animated line-width="25%" line-height="1px" title-active-color="#2457CD" color="#2457CD" background="#fff" @click="onClick" sticky :offset-top='topT'>
            <van-tab  title="全部 " class="contentlist" name="0">
                <div v-if="sign!=null">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <router-link :to="{name:'creditorDetail',query:{id:adetail.jilu_id}}" class="creditorAll" tag="div">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.biaoti}}</p> 
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.jiner}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.lilv}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.xmshouyi}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.qitshijian}}</span>起投-<span>{{adetail.daoqshijian}}</span>到期</p>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
                </div>
            </van-tab>
            <van-tab  title="冻结中  " class="contentlist" name="10">
                <div v-if="sign!=null">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <router-link class="creditorAll" router-link :to="{name:'creditorDetail',query:{id:adetail.jilu_id}}" tag="div">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.biaoti}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.jiner}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.lilv}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.xmshouyi}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.qitshijian}}</span>起投-<span>{{adetail.daoqshijian}}</span>到期</p>
                            </div>
                        </router-link>
                    </div> 
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
                </div>  
       
            </van-tab>            
            <van-tab  title="未到期 " class="contentlist" name="6">
                <div v-if="sign!=null">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <router-link class="creditorAll" router-link :to="{name:'creditorDetail',query:{id:adetail.jilu_id}}" tag="div">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.biaoti}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.jiner}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.lilv}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.xmshouyi}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.qitshijian}}</span>起投-<span>{{adetail.daoqshijian}}</span>到期</p>
                            </div>
                        </router-link>
                    </div> 
                </div>
                <div v-else class="nullinfo">
                    <div class="shownull">
                        <img src="@/assets/hk_9.png">
                    </div>
                    <div>暂无数据</div>
                </div> 
            </van-tab>
            <van-tab  title="已到期 " class="contentlist" name="8">
                <div v-if="sign!=null">
                    <div class="creditorAllXX" v-for="(adetail,index) in list" :key="index">
                        <router-link class="creditorAll" router-link :to="{name:'creditorDetail',query:{id:adetail.jilu_id}}" tag="div">
                            <div class="detail">
                                <p class="detail-p1">{{adetail.biaoti}}</p>
                                <ul class="detail-u">
                                    <li>
                                        <span>出借金额</span>
                                        <span>{{adetail.jiner}}</span>
                                    </li>
                                    <li>
                                        <span>预期年化利率</span>
                                        <span>{{adetail.lilv}}%</span>
                                    </li>
                                    <li>
                                        <span>项目收益</span>
                                        <span>{{adetail.xmshouyi}}</span>
                                    </li>
                                </ul>
                                <p class="detail-p2"><van-icon name="clock-o" /><span>{{adetail.qitshijian}}</span>起投-<span>{{adetail.daoqshijian}}</span>到期</p>
                            </div>
                        </router-link>
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
            page:1,
            page_size:20,
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
            zta: 0,
            flag: true,
            topT: 0,
            sign: ''
        }
    },
    methods:{
        onClick(name){
            if(!this.flag){return}
            this.flag = false;
            this.zta = name;
            this.list = [];
            this.page = 1;
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
            let {page,page_size} = this; //不使用{}解构时的写法：let page = this.page           
            this.loading = true;//关闭无限滚动  5s
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            this.$post('/rongtuojinrong/userCenter/bond/bondList.json',{
            page,
            page_size,
            txlx: 0,
            xmlx: 0,
            finance_method: 0,
            jkzhuangtai: this.zta   
            }).then(res=>{
                this.flag = true;
                this.sign = res.data.data;
                if(res.data.status == 0){
                    this.list = this.list.concat(res.data.data); 
                    this.loading = false;//继续开启无限滚动
                    this.$toast.clear();//关闭toast
                    if(res.data.data.length == null){
                        return false;
                    }
                    if(res.data.data.length<20){
                        this.hasMore = false;
                        return false;
                    }                  
                            
                    this.page++;  
                }else{
                    this.$toast.clear();//关闭toast
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
        
    },
    mounted(){
        
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