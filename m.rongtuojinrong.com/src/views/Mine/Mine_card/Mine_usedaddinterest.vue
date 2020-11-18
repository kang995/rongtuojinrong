<template>
    <div class="usedredenvelopeBox">
        <headerBox title="已使用和过期加息券"></headerBox>
        <ul v-if="sign!=0">
            <li v-for="(detail,index) in cardlist" :key="index">
                <div class="usedredenvelopeBox-1">
                    <div class="usedredenvelopeBox-1-a">
                    <span>{{detail.Title}}</span>
                    <span>{{detail.Status|fenxi}}</span>
                    </div>
                    <div class="usedredenvelopeBox-1-b">
                    <div class="usedredenvelopeBox-1-b1">{{detail.Desc}}</div>
                    <div class="usedredenvelopeBox-1-b2">
                        <span>有效期限：{{detail.PastTime*1000 | date-format2}}</span>
                        <div class="usedredenvelopeBox-1-b2s">
                        <span>{{detail.Rate*100}}</span>
                        <span>%</span>
                        </div>
                    </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else  class="Noclass">暂无数据</div>
        <div
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="10">

        </div>
        
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            cardlist: [],
            page:1,
            limit:10,
            loadig:false,//默认开启无限滚动   true的话就代表关闭无限滚动
            hasMore:true,//有更多数据 
            sign:"10",             
        }
    },
    methods:{
        loadMore(){ //加载更多的方法  
          if(!this.hasMore){ //如果没有更多数据了
                //   this.$toast({
                //       message: '我是有底线的....',
                //       duration:2000,
                //       position:"bottom"
                //   });
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
            this.$post('/rongtuojinrong/market/couponList.json',{
            page,
            limit,
            status:3
            }).then(res=>{
                this.sign = res.data.data.Detail.length;
                console.log(this.sign);
                this.cardlist = this.cardlist.concat(res.data.data.Detail);            
                this.loading = false;//继续开启无限滚动
                this.$toast.clear();//关闭toast
                if(page*limit >= res.data.data.Num){ //判断是否有更多数据
                    this.hasMore = false; //没有更多数据了
                    return false;
                }
                this.page++;
            })
        },   
    },
    filters:{
        fenxi(val){
        let stat = ["可用","未使用","已过期"];
        return stat[val];
        }
    }  

}
</script>

<style lang="scss" scoped>
body{
     
    .usedredenvelopeBox{
        width: 100%;
        min-height: 100%;
        position: absolute;
        background-color: #e7eaf1;       
        ul{
            padding-top: 0.5rem;
            li{
                width: 95%;
                margin: 0.2rem auto 0;
                .usedredenvelopeBox-1{
                    background: url("../../../assets/sm_15.png") no-repeat;
                    background-size: 100%; 
                    padding: 0 0.1rem;
                    .usedredenvelopeBox-1-a{
                        height: 0.5rem;
                        line-height: 0.5rem;
                        display: flex;
                        justify-content: space-between;
                        color: #fff;
                    }
                    .usedredenvelopeBox-1-b{
                        color: #ddd;
                        .usedredenvelopeBox-1-b1{
                            height: 0.3rem;
                            line-height: 0.3rem;
                            margin-bottom: 0.2rem;
                            white-space:nowrap; 
                            width:100%; 
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                        .usedredenvelopeBox-1-b2{
                            height: 0.5rem;
                            line-height: 0.5rem;
                            display: flex;
                            justify-content: space-between;
                            .usedredenvelopeBox-1-b2s{
                                span:first-of-type{
                                    font-size: 0.2rem;
                                    font-weight: bold;
                                }	
                            }
                        }
                    }



                }
            }

        }
      .Noclass{
          height:2rem;
          text-align:center;
          line-height:2rem;
          font-size: 0.16rem;
          letter-spacing:0.02rem;
          }
    }
}
</style>
