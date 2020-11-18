<template>
  <div class="hkBox">
      <headerBox title="回款计划"/>
      <div class="hkBox-1">
          <ul
            v-if="sign!=0"
            v-infinite-scroll="loadMore" 
            infinite-scroll-disabled="loading" 
            infinite-scroll-distance="10"           
          >
              <router-link :to="{name:'hkdetail',query:{months:det.month_en,months1:det.month_zh}}" v-for="(det,index) in list" :key="index" tag="li">
                  <div class="hkBox-1a">{{det.month_zh}}</div>
                  <div class="hkBox-1b">
                      <span>{{det.payment_sum}}</span>
                      <van-icon name="arrow" />
                  </div>
              </router-link>

          </ul>
        <div v-else class="nullinfo">
            <div class="shownull">
                <img src="@/assets/sm_19.jpg">
            </div>
        </div>           
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list: [],
            c_page:1,
            page_size:20,
            loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据
            sign: 10
        }
    },
    methods:{
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
            let {c_page,page_size} = this; //不使用{}解构时的写法：let page = this.page           
            this.loading = true;//关闭无限滚动  5s
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            this.$post('/rongtuojinrong/userCenter/mindeng/getPayPlanMonthList.json',{
            c_page,
            }).then(res=>{
                this.sign = res.data.data.length;
                this.flag = true;
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
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>
.hkBox{
    .hkBox-1{
        margin-top: 0.5rem;
        .nullinfo{
            background-color: #fff;
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            .shownull{
                width: 1.5rem;
                img{
                    max-width: 100%;
                    height: auto;
                }
            }
        }         
        ul{
            li{
                height: 0.5rem;
                line-height: 0.5rem;
                padding: 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .hkBox-1b{
                    display: flex;
                    align-items: center;
                    span{
                        color: #0159d5;
                        margin-right: 0.05rem;
                    }
                }
            }
        }
    }
}
</style>