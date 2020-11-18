<!-- 我的积分商品明细-->
<template>
  <div class="shoppDetailsBox" id="anchor">
    <div class="shoppings">
      <div class="fanhui">
        <!--  头部轮播-->
        <div class="swiper-container" >
          <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="list1 in detail" :key="list1.id">
              <img :src="list1" alt />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <!-- 轮播结束 -->

        <div class="topshow topshow1" v-if="showselect1">
          <div class="fhinput" @click="shangy" tag="div">
            <img src="@/assets/img61.png" />
          </div>

          <router-link class="fhinput fhinput1" to="/cart" tag="div">
            <img src="@/assets/jf-002.png" />
          </router-link>
        </div>  

        <div class="topshow" v-if="showselect">
          <router-link class="fhinput" to="/myintegral" tag="div">
            <img src="@/assets/img61.png" />
          </router-link>

          <div class="selectshop">
            <!-- <div @click="xiangq" :class="act">商品详情</div>
            <div @click="pingl" :class="act">用户评价</div> -->

            <div v-for="(itemone,index) in clickshowshop" :key="index" @click="showxp(index,hei)" :class="{active:index == num}">
              {{itemone}}
            </div>
          </div>

          <router-link class="fhinput fhinput1" to="/cart" tag="div">
            <img src="@/assets/jf-002.png" />
          </router-link>
        </div>
      

      </div>

      <div class="shopptext" ref="topTab">
        <p class="c3">{{shopdetail.goodsName}}</p>

        <div class="shopptextright">
          <P class="cju">
            <span class="fz16">{{shopdetail.score}}</span> 积分
          </P>
          <p class="c3">
            已兑换：{{shopdetail.redeemed}}件
          </p>
        </div>

      </div>

      <!-- 切换 -->
      <div>
        <div type="card" sticky @click="clickShowgid(detail.gid)">
          <div title="商品详情">
            <div class="textone" ref="xiangqTab">
              <!-- <img src="@/assets/sm_18.jpg" alt />-->
              <!-- <img :src="shopdetail.coverImageApp" alt />  -->
              <div v-html="shopdetail.introApp"></div>
            </div>
            <div class="texttwo" ref="pinglTab">
              这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论
            </div>
          </div>

        </div>
      </div>    

      <!-- 固定底部 -->
      <div class="shoppbofood">
        <a :href="'tel:' + 4008788686">
          <img src="@/assets/jf-003.png" />
          <span>客服</span>
        </a>

        <a @click="showgou(1)">加入购物车</a>
        <a @click="showgou(2)">立即兑换</a>
        <!-- <a @click="popupduihuan=!popupduihuan">立即兑换</a> -->
      </div>


      <!--立即兑换弹窗--->
      <mt-popup v-model="popupduihuan" position="bottom">
        <div class="popup_bottom_duihuan">
          <div class="tanchu">
            <div class="leftcont">
              <div class="dhimg">
                <img :src="firpic" />
              </div>
              <div class="dhtext">
                <div class="dhtexttop">
                  <p class="cju">积分：<span class="fz16 ">{{shopdetail.score}}</span></p>
                  <p class="c3">库存：{{shopdetail.allStore}}件</p>
                </div>

                <div class="dhshu">
                  <span class="">数量：</span>
                  <van-stepper v-model="value" min="1" :max="shopdetail.allStore"/>
                </div>            
              </div>
            </div>

            <div class="dhgb" @click="popupShowdh">
              <img src="@/assets/jf-004.png" />
            </div>
          </div>

          <div class="contbot">
            <button v-if="signflag == 1" class="dhbutton" @click="clickadd">加入购物车</button>
            <button v-if="signflag == 2" class="dhbutton" @click="clickque(shopdetail.score,value)">立即兑换</button>
          </div>
          
        </div>
      </mt-popup>

      <!-- 购买成功弹窗 -->
      <van-popup round v-model="showgoum">
        <div class="succont">
          <div class="succim">
            <img src="@/assets/jf-005.png">
          </div>
          <div>加入购物车成功</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Vue from "vue";
import { Stepper } from "vant";
import qs from "qs";
Vue.use(Stepper);
export default {
  data() {
    return {
      popupVisible: false,
      popupduihuan: false,
      value: 1,
      detail:{},
      list1:[],
      tags:{},
      num: 1,
      gid: '',
      Gid: '',
      listPing: [],
      firpic: '',
      toname: '',
      jifen: '',
      flag: 0,
      activeName: 'a',
      showselect1: true,
      showselect: false,
      act: 'active',
      clickshowshop: ['商品详情','用户评价'],
      num: 0,
      hei:0,
      showgoum: false,
      shopdetail: {},
      signflag: '',
      points: 0
    };
  },
  methods: {
    getDetail(){
      this.$post('/vipshop/v1/goods/details.json',{
        goodsId: this.$route.query.goodsId     
      })
      .then(res=>{
        this.shopdetail = res.data.data.data;
      //名称
        this.toname = this.shopdetail.goodsName;
      //积分
        this.jifen = this.shopdetail.score;         
      })
      .catch(err=>{

      })      
    },
    showgou(c){
      this.value = 1;
      if(c==1){
        this.popupduihuan=!this.popupduihuan
        this.signflag = c;        
      }

      if(c==2){
        this.popupduihuan=!this.popupduihuan
        this.signflag = c;
      }


      
    },
    shangy(){
      this.$router.go(-1);
    },
    onScroll() {
      //获取当前html根节点的字体大小
      let str = parseInt(document.documentElement.style.fontSize.slice(0,-2));       
      //console.log(str);
      let hei = 0.4*100*2;    

      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = this.$refs.topTab.offsetTop;
      let a = this.$refs.pinglTab.offsetTop;
      let b = a - hei;
      if (scrollTop >= offsetTop) {
        this.showselect1 = false;
        this.showselect = true;
      }else{
        this.showselect1 = true;
        this.showselect = false;
      }; 
      if(scrollTop < b){
        this.num = 0;
      }else{
        this.num = 1;
      }      
    },

    showxp(a,al){
      this.num = a;
      if(a==0){
        let b = this.$refs.xiangqTab.offsetTop-al;
        window.scrollTo({ 
          top: b, 
          behavior: "smooth" 
        });          
      }
      if(a==1){
        let a = this.$refs.pinglTab.offsetTop-al;
          window.scrollTo({ 
            top: a, 
            behavior: "smooth" 
        });        
      }
    },

    clickadd(){
      this.$post('/vipshop/v1/shoppingCart/add.json',{
        goodsId: this.$route.query.goodsId,
        quantity: this.value     
      })
      .then(res=>{
        this.showgoum = true;
        this.popupduihuan = false;
      })
      .catch(err=>{

      }) 
    },

    clickque(a,b){
      if(a*b>this.points){
        this.$toast("你的剩余积分不足");
        return;
      };


      this.$post('/vipshop/v1/goods/exchange.json',{
        goodsId: this.$route.query.goodsId,
        quantity: this.value     
      })
      .then(res=>{
        this.$router.push({
          name:'newdhadd',
          query: {shul:this.value,goodsid:this.$route.query.goodsId,biaoz:0}
        })        
      })
      .catch(err=>{

      }) 



    },

    clickShowgid(id){
      this.showPinglun(id);
      this.showDetail();
    },


    clickShow(name){
      this.num = name+1;
      this.showDetail();
    },


    //回到顶部
    gettop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //分享弹窗
    popupShow() {
      this.popupVisible = false;
    },
    //兑换关闭弹窗
    popupShowdh() {
      this.popupduihuan = false;
    },

    getBanners() {
      this.$post("/vipshop/v1/goods/banner.json",{
      goodsId: this.$route.query.goodsId
    })
    .then(res=>{
      this.detail = res.data.data.data;
      //首张图片
      this.firpic = this.detail[0];
      // this.gid = res.data.data.gid;
      //实例化swiper，实现滑动;注意：要等到数据更新引发视图重新渲染后再去实例化swiper，放在$nextTick()回到函数中
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, //循环模式选项，true 循环播放
          autoplay: true, //可选选项，自动滑动
          pagination: {
            //添加分页器
            el: ".swiper-pagination",  
          }
        });
      });
  
    })
    .catch(err=>{
      console.log("查询失败");
    })
     
    },

    //用户评论标签
    showPinglun(ID){
      this.$post("/youshangcheng/commentTags.json",{
        id: ID
      })
      .then(res=>{
        this.tags = res.data.data
      })
      .catch(err=>{
        console.log("查询失败");
      })      
    },
    //用户评论内容
    showDetail(){
      this.$post("/youshangcheng/comment.json",{
        id: this.gid,
        type: this.num
      })
      .then(res=>{
        this.listPing = res.data.data
      })
      .catch(err=>{
        console.log("查询失败");
      })       
    }


  },
  created() {
    //进入页面，回到顶部位置
　　this.$router.afterEach((to,from,next)=>{
　　　　window,scrollTo(0,0)
　　})

    //账号总积分
    this.$post("/vipshop/v1/user/integral.json").then(res => {
      this.points = res.data.data.data.allScore;
    });

    this.getBanners();
    this.getDetail();
    this.flag = this.$route.query.flag;
    window.addEventListener("scroll", this.onScroll);
  },
  updated(){
      //获取当前html根节点的字体大小
      let str = parseInt(document.documentElement.style.fontSize.slice(0,-2));       
      //console.log(str);
      this.hei = 0.4*100*2;    
      this.topT = str/2;
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);

  }  

};
</script>
<style lang="scss" >
.clear {
  clear: both;
}


body {
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
  .fz16 {
    font-size: 0.16rem;
  }
  .fz12 {
    font-size: 0.12rem;
  }
  .cju {
    color: #fe6633;
  }
  .shoppDetailsBox {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;
    .succont{
      width: 2.45rem;
      height: 1.02rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;      
      .succim{
        width: 0.29rem;
        margin-bottom: 0.15rem;
        img{
          max-width: 100%;
          height: auto;
        }
      }
    }
.swiper-container {
  height: 3.7rem;
  //   background: red;
  margin: 0;
  border-radius: 0;
  .swiper-wrapper {
    width: 3.75rem;
    height: 3.7rem;
    .swiper-slide {
      width: 3.75rem;
      height: 3.7rem;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  .swiper-pagination{
    //color: #0159d5;
    display: flex;
    justify-content: flex-end;
    padding-right: 0.1rem;
    .swiper-pagination-bullet{
      background: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background-color: #0159d5;
    }
  }
  .swiper-pagination-customs {
    width: 0.1rem;
    height: 0.03rem;
    display: inline-block;
    background: #000;
    opacity: 0.3;
    border-radius: 1px;
    margin: 0 2px;
    outline: 0;
  }

}

    .shopptext {
      /* height: 0.2rem; */
      background: #fff;
      padding: 0.1rem 0.1rem;
      border-bottom: 0.1rem solid #e5e9e5;
      p {
        line-height: 0.35rem;
      }
      .sign{
        color: #fe6633
      }
      .shopptextright{
        display: flex;
        justify-content: space-between;
      }
    }
    .textone {
      margin: 0.18rem 0.18rem 0.53rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .texttwo{
      min-height: 5rem;
    }
    .van-tabs--card > .van-tabs__wrap {
      height: 40px;
    }
    .van-tabs__nav--card {
      box-sizing: border-box;
      height: 40px;
      margin: 0;
      border: none;
      border-bottom: 1px solid #e5e9e5;
      border-radius: 2px;
    }
    .van-tabs__nav--card .van-tab {
      color: #333;
      line-height: 38px;
      border-right: none;
      border-right: 1px solid #e5e9e5;
    }

    .van-tabs--card {
      padding-top: 0;
    }
    .van-tabs__nav--card .van-tab.van-tab--active {
      color: #005ad4;
      background-color: #fff;
      border-bottom: 1px solid #005ad4;
    }

    .texttwo {
      margin: 0.18rem;
      min-height: 7rem;
      .van-tab span {
        display: block;
        background: #e7ebec;
        border-radius: 0.08rem;
      }

      .van-tab {
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        box-sizing: border-box;
        min-width: 0;
        color: #7d7e80;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
      }
      .van-tabs__line {
        display: none;
      }
      .van-tabs__nav--card .van-tab.van-tab--active span {
        color: #fff;
        background: #fe6633;
        border: none;
      }
      .van-tabs__nav--card .van-tab.van-tab--active {
        border: none;
      }
      .van-tabs__nav--card .van-tab {
        border-right: none;
      }
      .van-tabs__nav--card {
        border-bottom: none;
      }
    }

    .pinglun {
      margin: 0.05rem;
      li {
        border-top: 1px solid #e5e9e5;
        border-bottom: 1px solid #e5e9e5;
        padding: 0.1rem;
        height: auto;
        overflow: hidden;
        p {
          line-height: 0.3rem;
        }
        .pllog {
          width: 0.25rem;
          height: 0.25rem;
          img {
            width: 100%;
          }
        }
        .plxing {
          margin: 0.12rem 0.1rem;
          img {
            width: 0.09rem;
            height: 0.09rem;
            float: left;
            margin-left: 0.01rem;
          }
        }
        .pimg p img {
          width: 0.5rem;
          height: 0.5rem;
        }
        .pimg{
          .setimg{
            display: inline-block;
            margin-right: 0.1rem;
          }
        }
      }
    }
    .shoppbofood {
      height: 0.53rem;
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      z-index: 99;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      a img {
        width:0.2rem;
        height: 0.2rem;
        margin-top: 0.02rem;
      }
      a:nth-child(1) {
        width: 30%;
        span {
          padding-top: 0.05rem;
        }
      }
      a:nth-child(2) {
        background: #f7b500;
        height: 0.53rem;
        width: 30%;
        color: #fff;
        line-height: 0.53rem;
        text-align: center;
        width: 40%;
      }
      a:last-child {
        background: #ff6633;
        height: 0.53rem;
        width: 30%;
        color: #fff;
        line-height: 0.53rem;
        text-align: center;
        width: 40%;
      }
    }

    .fanhui {
      position: relative;
      height: auto;
      overflow: hidden;
      .topshow{
        height: 0.4rem;
        position: fixed;
        z-index: 99;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 0.1rem;
        align-items: center;
        background-color: #fff;
      }
      .topshow1{
        padding: 0.1rem;
        background-color: transparent;
      }
      .fhinput {
        width: 0.1rem;
        z-index: 100;
        border-radius: 0.5rem;
        img {
          max-width: 100%;
          height: auto;
        }
      }
      .fhinput1{
        width: 0.2rem;
        left: auto;
        right: 2%;
      }
      .selectshop{
          display: flex;
          width: 2rem;
          justify-content: space-between;
          margin-top: 0.1rem;
        .active{
          color: #ff6633;
          border-bottom: 2px solid #ff6633;
          padding-bottom: 0.1rem;
        }
      }
    }

    .popup_bottom {
      width: 100%;
      height: 1.4rem !important;
      padding: 0.2rem 0.27rem;
      ol {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.75rem;
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
          height: 0.75rem;
          img {
            width: 0.3rem;
            height: 0.3rem;
          }
          span {
            color: #1c1c1c;
            height: 0.1rem;
            margin-top: 0.07rem;
          }
        }
      }
      .van-button {
        background: none;
        border: none;
      }
      .priend {
        border: none;
        width: 100%;
        background: none;
        text-align: center;
        color: #333;
        margin-top: 0.1rem;
      }
      .van-button::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: none;
        border: inherit;
        border-color: none;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        content: " ";
      }
      .fxx {
        height: 2px;
        border-top: 3px solid #f7f8fc;
        width: 100%;
      }
      .ml45 {
        padding-left: 0.15rem;
      }
    }

    .mint-popup {
      width: 100%;
      height: auto;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
    }
    .popup_bottom_duihuan {
      width: 100%;
      height: 4rem !important;
      padding: 0.11rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;      
      .tanchu{
        display: flex;
        justify-content: space-between;
        .leftcont{
          display: flex;
          .dhimg{
            width: 1.225rem;
            img{
              max-width: 100%;
              height: auto;
            }
          }    
          .dhtext{
            margin-left: 0.275rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .dhtexttop{
              margin-top: 0.16rem;
            }
            .dhshu{
              color: #333;
              display: flex;
              align-items: center;              
            }
          }       
        }
        .dhgb{
          width: 0.14rem;
          img{
            max-width: 100%;
            height: auto;
          }
        }
      }
      .contbot{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 0.45rem;
        .dhbutton{
          width: 3.03rem;
          height: 0.46rem;
          background: #ff6633;
          color: #fff;
          border: none;
          line-height: 0.46rem;
          text-align: center;
          font-size: 0.14rem;      
          border-radius: 0.02rem;  
        }
      }
    }
  }
}
</style>
 