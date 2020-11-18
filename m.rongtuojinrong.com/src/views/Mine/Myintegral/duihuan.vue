<template>
  <div class="DuiHuanBox">
    <!-- 头部 -->
    <div class="duihuanclass"
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10"     
    >
      <router-link to="/myintegral" slot="left" class="position" tag="a">
        <mt-button icon="back"></mt-button>
      </router-link>

      <van-tabs type="card" v-model="active" @click="onClick" sticky :offset-top='topT'>
        <van-tab title="已发货" name="shipped">
          <div class="jfnumber">
            <p>我的积分：</p>
            <P>{{points}}分</P>
          </div>
          <!--  情况1 没有数据 -->
          <div class="Nodata" v-if="list.length == 0">
            <img src="../../../assets/sm_16.png" />
            <p>暂无数据</p>
          </div>

          <ul class="huolist" v-else>
            <router-link :to="{name:'jfDetails',query:{product_id:detail.goods_items[0].product_id}}" v-for="(detail,index) in list" :key="index" tag="li">
              <div class="leftcont">
                <div class="imgg">
                  <img :src="detail.goods_items[0].thumbnail_pic" />
                </div>
                <div class="neir">
                  <p class="neir1">{{detail.goods_items[0].name}}</p>
                  <P>
                    <span>花费积分：{{detail.used_jifen}}</span> &nbsp;&nbsp;
                    <span>数量：{{detail.itemnum}}</span>
                  </P>
                </div>
              </div>

              <div class="rightcont">
                <!-- <router-link tag="a" to="/jfDetails">
                  <img src="../../../assets/img63.png" alt class="navimg" />
                </router-link> -->
                <span class="rightconts1">
                  <van-icon name="arrow" />
                </span>
 
                <div class="rightconts2" @click.stop="deljl(detail.order_id)">
                  <span>删除记录</span>
                  <van-icon name="delete" />
                </div>
              </div>
            </router-link>
          </ul>

        </van-tab>
        <van-tab title="待发货" name="unship">
          <div class="jfnumber">
            <p>我的积分：</p>
            <P>{{points}}分</P>
          </div>

          <div class="Nodata" v-if="list.length == 0">
            <img src="../../../assets/sm_16.png" />
            <p>暂无数据</p>
          </div>

          <ul class="huolist" v-else>
            <router-link :to="{name:'jfDetails',query:{product_id:detail.goods_items[0].product_id}}" v-for="(detail,index) in list" :key="index" tag="li">
              <div class="leftcont">
                <div class="imgg">
                  <img :src="detail.goods_items[0].thumbnail_pic" />
                </div>
                <div class="neir">
                  <p class="neir1">{{detail.goods_items[0].name}}</p>
                  <P>
                    <span>花费积分：{{detail.used_jifen}}</span> &nbsp;&nbsp;
                    <span>数量：{{detail.itemnum}}</span>
                  </P>
                </div>
              </div>

              <div class="rightcont">
                <!-- <router-link tag="a" to="/jfDetails">
                  <img src="../../../assets/img63.png" alt class="navimg" />
                </router-link> -->
                <span class="rightconts1">
                  <van-icon name="arrow" />
                </span>
 
                <div class="rightconts2">
                  <span>删除记录</span>
                  <van-icon name="delete" />
                </div>
              </div>
            </router-link>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);

import { Icon } from "vant";
Vue.use(Icon);

export default {
  data() {
    return {
      active: 0,
      list: [],
      page:1,
      page_size:20,
      loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据      
      flag: true,
      topT: 0,
      zta: 'shipped',
      points: 0      
    };
  },
  methods:{
    deljl(a){
        this.$dialog.confirm({
          title: '确定要删除记录吗？',
          message: '兑换记录删除后不可恢复！',
        }).then(() => {
          // on confirm

          this.$post('/rongtuojinrong/points/delExchangeRecord.json',{
            defidenshuxing: this.$store.state.invite.defidenshuxing,
            mobile: this.$store.state.invite.invite.mobile,
            from: 'rongtuoh5',
            order_id: a
          })
          .then(res=>{
              
          })
          .catch(err=>{

          }) 

        }).catch(() => {
          // on cancel

        });        


       
    },
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
        this.$post('/rongtuojinrong/points/exchangeRecord.json',{
          page,
          defidenshuxing: this.$store.state.invite.defidenshuxing,
          //mobile: this.$store.state.invite.invite.mobile,
          mobile: '13688629789',
          from: 'rongtuoh5',
          pay_status: this.zta,
        }).then(res=>{
            this.flag = true;
            if(res.data.data != null){
                this.$toast.clear();//关闭toast
                this.list = this.list.concat(res.data.data); 
                this.loading = false;//继续开启无限滚动
                console.log(this.list);
                if(res.data.data.length<20){
                    this.hasMore = false;
                    return false;
                }                  
                        
                this.page++;  
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
    this.$post('/rongtuojinrong/points/getTotal.json')
    .then(res=>{
      this.points = res.data.data.points;
    })
  }
};
</script>
<style lang="scss">
body {
  background: #f9f9f9;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .clear {
    clear: both;
  }
  .mt0 {
    margin-top: 0;
  }
  .c3 {
    color: #333;
  }
  .c_blue {
    color: #0159d5;
  }
  .red {
    color: red;
  }
  .position {
    position: absolute;
    z-index: 10;
  }
  .pltop{padding-top:0.1rem;}  .pltop1{padding-top:0.2rem;}
  .DuiHuanBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;
    .duihuanclass {
      .van-tabs--card {
        padding-top: 10px;
      }

      .jfnumber {
        width: 100%;
        height: 1.25rem;
        background: #0159d5;
        padding: 0.2rem;
        color: #fff;
        margin-top: 0.1rem;

        p:nth-child(2) {
          text-align: center;
          font-size: 0.18rem;
          line-height: 0.65rem;
        }
      }
      .Nodata {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0.5rem auto;
        text-align: center;
        line-height: 0.4rem;
        img {
          width: 0.85rem;
          height: 0.85rem;
          margin: auto;
        }
      }
      .huolist {
        li {
          padding: 0.15rem 0.1rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .leftcont{
            display: flex;
            .imgg {
              width: 0.83rem;
              height: 0.83rem;
              overflow: hidden;
              border-radius: 0.1rem;
              img {
                width: 100%;
              }
            }
            .neir{
              padding-left: 0.1rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .neir1{
                height: 0.3rem;
                padding-bottom: 0.1rem;
              }
            }            
          }
         .rightcont{
              display: flex;
              flex-direction: column;
              justify-content: center;
              .rightconts1{
                height: 0.3rem;
                padding-bottom: 0.1rem;
                display: flex;
                justify-content:flex-end;
              }
              .rightconts2{
                display: flex;
                align-items: center;
                span{
                  margin-right: 0.05rem;
                }
              }              
         } 

          .navimg {
            
          }

        }
      }

      .van-tabs__nav--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0 0.6rem;
        border: 1px solid #0159d5; /*  #0159d5; */
        border-radius: 2px;
      }

      .van-tabs__nav--card .van-tab.van-tab--active {
        color: #fff;
        background-color: #0159d5;
      }
      .van-tabs__nav--card .van-tab {
        color: #0159d5;
        line-height: 28px;
        border-right: 1px solid #0159d5;
      }
    }
  }
}
</style>