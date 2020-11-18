<template>
  <div class="redenvelopeBox">
    <div class="redenvelopeBox-1">
      <van-icon name="warning-o" />
      <router-link :to="{name:'redenvelopeUse'}" class="redenvelopeBox-1s" tag="span">使用说明</router-link>
    </div>

    <div v-if="znum==0" class="redenvelopeBox-3">
      <div class="redenvelopeBox-3-a">暂无红包券</div>
      <router-link :to="{name:'usedRedenvelope'}" tag="div">查看已使用和过期红包券 ></router-link>
    </div>

    <div v-else class="redenvelopeBox-2">
      <ul >
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
                  <span>{{detail.Amt}}</span>
                  <span>元</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="loading" 
      infinite-scroll-distance="10">

      </div>
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
      znum: 0             
    }
  },
  methods:{
      loadMore(){ //加载更多的方法  
          if(!this.hasMore){ //如果没有更多数据了
                  this.$toast({
                      message: '我是有底线的....',
                      duration:2000,
                      position:"bottom"
                  });
                  //关闭无限滚动
              this.loading = true;
              return false;//不在请求数据
              }
              this.getList() 
      },
      getList(){
          let {page,limit} = this; //不使用{}解构时的写法：let page = this.page           
          this.loading = true;//关闭无限滚动  5s
          let toast = this.$toast({
              message: '正在加载....',
              iconClass: 'fa fa-cog fa-spin',
              duration:-1
          });
          this.$post('/rongtuojinrong/market/redPacketList.json',{
          page,
          limit,
          status:0
          }).then(res=>{
              this.znum = res.data.data.Num;
              this.cardlist = this.cardlist.concat(res.data.data.Detail);
              this.loading = false;//继续开启无限滚动
              toast.close();//关闭toast
              if(page*limit >= res.data.data.Num){ //判断是否有更多数据
                  this.hasMore = false; //没有更多数据了
                  return false;
              }
              this.page++;
          })
      },        
            

  },
  created(){
      // this.$post('/rongtuojinrong/market/redPacketList.json',{
      //   status: 0

      // })
      // .then(res=>{
      //   this.cardlist = res.data.data.Detail;    
      // })
      // .catch(err=>{

      // })     
  },
  filters:{
    fenxi(val){
      let stat = ["可用","未使用","已过期"];
      return stat[val];
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .redenvelopeBox {
    padding-top: 0.83rem;
    .redenvelopeBox-1 {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 0.2rem;
      margin-top: 0.05rem;
      .redenvelopeBox-1s {
        padding-left: 0.05rem;
      }
    }
    .redenvelopeBox-2{
        ul {
            margin-top: -0.1rem;
            li {
                width: 95%;
                margin: 0.2rem auto 0;
                .usedredenvelopeBox-1 {
                    background: url("../../../assets/sm_15s.png") no-repeat;
                    background-size: 100%;
                    padding: 0 0.1rem;
                    .usedredenvelopeBox-1-a {
                        height: 0.5rem;
                        line-height: 0.5rem;
                        display: flex;
                        justify-content: space-between;
                        color: #fff;
                    }
                    .usedredenvelopeBox-1-b {
                        color: #666;
                        .usedredenvelopeBox-1-b1 {
                        height: 0.3rem;
                        line-height: 0.3rem;
                        margin-bottom: 0.2rem;
                        }
                        .usedredenvelopeBox-1-b2 {
                        height: 0.5rem;
                        line-height: 0.5rem;
                        display: flex;
                        justify-content: space-between;
                            .usedredenvelopeBox-1-b2s {
                                color: #ff5254;
                                span:first-of-type {
                                font-size: 0.2rem;
                                font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }
        }        
    }


    .redenvelopeBox-3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.3rem;
      .redenvelopeBox-3-a {
        font-size: 0.14rem;
        color: black;
        height: 0.3rem;
        line-height: 0.3rem;
      }
    }
  }
}
</style>