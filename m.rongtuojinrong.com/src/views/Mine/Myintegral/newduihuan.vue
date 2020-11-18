<template>
  <div class="DuiHuanBox">
    <!-- 头部 -->
    <div class="duihuanclass"
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10"     
    >
      <div class="seltop" @click="gos">
        <van-icon name="arrow-left" size="20px"/>
      </div>


      <van-tabs type="card" v-model="active" @click="onClick" sticky :offset-top='topT'>
        <van-tab title="待取货" name="0">

          <div v-if="sign>0">
            <div class="goodscontent" v-for="(shop,index) in list"  :key="index">
              <div class="contentbox" v-for="(det,index) in shop.goodList" :key="index">
                <div class="conttop">
                  <div class="topimg">
                    <img :src="det.coverImageApp">
                  </div>
                  <div class="topnei">
                    <div class="topnei1">{{det.goodName}}</div>
                    <div class="topnei2">{{det.payTime}}</div>
                  </div>
                </div>
                <div class="contbot">
                  <div @click="showma(shop.pickupCode)">查看提货码</div>              
                </div>
              </div>
            </div>
          </div>


          <div class="showk" v-if="sign==0">
            <div class="kongpig">
              <img src="@/assets/jf-007.png">
            </div>

            <p>暂无兑换订单~</p>

          </div>

        </van-tab>

        <van-tab title="已取货" name="1">

          <div v-if="sign>0">
            <div class="goodscontent" v-for="(shop,index) in list"  :key="index">
              <div class="contentbox" v-for="(det,index) in shop.goodList" :key="index">
                <div class="conttop">
                  <div class="topimg">
                    <img :src="det.coverImageApp">
                  </div>
                  <div class="topnei">
                    <div class="topnei1">{{det.goodName}}</div>
                    <div class="topnei2">{{det.payTime}}</div>
                  </div>
                </div>
                <div class="contbot">
                  <div @click="showma(shop.pickupCode)">查看提货码</div>              
                </div>
              </div>
            </div>
          </div>
          <div class="showk" v-if="sign==0">
            <div class="kongpig">
              <img src="@/assets/jf-007.png">
            </div>

            <p>暂无兑换订单~</p>

          </div>
          
        </van-tab>
      </van-tabs>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>您的提货码为：{{tihuom}}</span>
        </div>
      </div>
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShow">确定</div>
      </div>
    </mt-popup>

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
      sign: -1,
      active: 0,
      list: [],
      pageNumber:1,
      pageSize:10,
      loading:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据      
      flag: true,
      topT: 0,
      zta: 0,
      points: 0,
      popupVisible: false,      
      tihuom: ''
    };
  },
  methods:{

    showma(a){
      this.popupVisible = true;
      this.tihuom = a;
    },

    popupShow() {
      this.popupVisible = false;
    },

    gos(){
      this.$router.go(-1);
    },
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
        this.pageNumber = 1;
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
        let {pageNumber,pageSize} = this; //不使用{}解构时的写法：let page = this.page           
        this.loading = true;//关闭无限滚动  5s
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true
        });
        this.$post('/vipshop/v1/goods/takeLists.json',{
          pageNumber,
          pageSize,
          pickupFlag: this.zta,
        }).then(res=>{
            this.flag = true;
            this.sign = res.data.data.total;
            if(res.data.data!= null){
                this.$toast.clear();//关闭toast
                this.list = this.list.concat(res.data.data.data); 
                this.loading = false;//继续开启无限滚动
                console.log(this.list);
                if(res.data.data.data.length<20){
                    this.hasMore = false;
                    return false;
                }                  
                        
                this.pageNumber++;  
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
    font-size: 14px;
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #f9f9f9;
    .duihuanclass {
      .seltop{
        position: fixed;
        display: flex;
        align-items: center;
        padding: 0.15rem 0 0 0.1rem;
        z-index: 999;
      }    

      .showk{
        .kongpig{
          width: 100%;
          margin-top: 0.5rem;
          img{
            max-width: 100%;
            height: auto;
          }
        }
        p{
          font-size: 0.12rem;
          text-align: center;
        }
      }      

      .goodscontent{
        margin: 0.12rem;
        .contentbox{
          padding: 0.11rem 0.14rem;
          background-color: #fff;
          .conttop{
            display: flex;
            margin-bottom: 0.07rem;
            .topimg{
              width: 0.84rem;
              img{
                width: 0.84rem;
                height: auto;
              }
            }
            .topnei{
              margin-left: 0.1rem;
              .topnei1{
                color: #333;
              }
              .topnei2{
                margin-top: 0.05rem;
                color: #999;
              }
            }
          }
          .contbot{
            margin: 0 0 0.07rem; 
            display: flex;
            justify-content: flex-end;
            div{
              width: 0.8rem;
              height: 0.25rem;
              line-height: 0.25rem;
              background-color: #0159d5;
              text-align: center;
              color: #fff;
              border-radius: 0.03rem;
            }
          }
        }
      }

      .van-tabs--card {
        padding-top: 0;
        .van-sticky{
          background-color: #fff;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
        }
      }
      .van-tabs__nav--card {
        box-sizing: border-box;
        height: 30px;
        border: 1px solid #0159d5; /*  #0159d5; */
        border-radius: 2px;
        width: 1.31rem;
        margin: 0 auto;
      }

      .van-tabs__nav--card .van-tab.van-tab--active {
        color: #fff;
        background-color: #0159d5;
      }
      .van-tabs__nav--card .van-tab {
        color: #0159d5;
        line-height: 28px;
        border-right: none;
      }
    }

      .mint-popup {
        width: 2.45rem;
        border-radius: 10px;
        color: #333333;
        .popupContent {
          margin: 0.12rem;
          height: 0.4rem;
          line-height: 0.4rem;          
          .popupContent-1 {
            text-align: center;
          }
        }
        .popupFooter {
          border-top: 1px solid #eff2f8;
          .popupFooter-btn {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #0159d5;
          }
        }
      }


  }
</style>