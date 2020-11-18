<!-- 我的积分商品明细-->
<template>
  <div class="shoppDetailsBox" id="anchor">
    <div class="shoppings">
      <div class="fanhui">
        <!--  头部轮播-->
        <div class="swiper-container" >
          <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="list1 in detail.images" :key="list1.id">
              <img :src="list1" alt />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <!-- 轮播结束 -->
        <router-link class="fhinput" to="/myintegral" tag="div">
          <img src="@/assets/totalmonth_5.png" />
        </router-link>
      </div>

      <div class="shopptext">
        <p class="c3">{{detail.title}}</p>
        <P>
          <span class="cju fz16">{{detail.fulljifen_ex}}</span> &nbsp;积分
        </P>
        <p class="c3 sign">
          市场参考价：
          <span>199.00元</span>
        </p>
      </div>

      <!-- 切换 -->
      <div>
        <van-tabs type="card" sticky @click="clickShowgid(detail.gid)">
          <van-tab title="商品详情">
            <div class="textone" v-html="detail.intro">
              <!-- <img src="@/assets/sm_18.jpg" alt />
              <img src="@/assets/sm_18.jpg" alt /> -->
            </div>
          </van-tab>
          <van-tab title="用户评价" >
            <div class="texttwo">
              <van-tabs type="card" @click="clickShow">
                <van-tab :title="tags.count_all">
                  <ul class="pinglun">
                    <li v-for="(detail,index) in listPing" :key=index>
                      <div class="left pllog">
                        <img :src="detail.avatar" />
                      </div>
                      <div class="left pimg">
                        <p>{{detail.author}}</p>
                        <P>{{detail.comment}}</P>
                        <P class="fz12">{{detail.date*1000 | date-format1}}</P>
                        <div v-if="detail.imgs!=''">
                          <p class="setimg" v-for="(imgdet,index) in detail.imgs" :key="index">
                              <img :src="imgdet">
                          </p> 
                        </div>
                        
                        <div v-if="detail.secondComment!=''">
                          <p class="cju">追评</p>
                          <p>{{detail.secondComment}}</p>
                          <div v-if="detail.secondImgs!=''">
                            <p class="setimg" v-for="(imgdet1,index) in detail.secondImgs" :key="index">
                              <img :src="imgdet1" />
                            </p>
                          </div>
                        </div>

                      </div>
                      <div class="left plxing">
                        <img src="@/assets/img30.png" />
                        <img src="@/assets/img30.png" />
                        <img src="@/assets/img30.png" />
                      </div>
                    </li>
                  </ul>
                </van-tab>
                <van-tab :title="tags.count_img">
                  <ul class="pinglun">
                   <li v-for="(detail,index) in listPing" :key=index>
                      <div class="left pllog">
                        <img :src="detail.avatar" />
                      </div>
                      <div class="left pimg">
                        <p>{{detail.author}}</p>
                        <P>{{detail.comment}}</P>
                        <P class="fz12">{{detail.date*1000 | date-format1}}</P>
                        <div v-if="detail.imgs!=''">
                          <p class="setimg" v-for="(imgdet,index) in detail.imgs" :key="index">
                              <img :src="imgdet">
                          </p> 
                        </div>
                        <div v-if="detail.secondComment!=''">
                          <p class="cju">追评</p>
                          <p>{{detail.secondComment}}</p>
                          <div v-if="detail.secondImgs!=''">
                            <p class="setimg" v-for="(imgdet1,index) in detail.secondImgs" :key="index">
                              <img :src="imgdet1" />
                            </p>
                          </div>
                        </div>

                      </div>
                      <div class="left plxing">
                        <img src="@/assets/img30.png" />
                        <img src="@/assets/img30.png" />
                        <img src="@/assets/img30.png" />
                      </div>
                    </li>
                  </ul>
                </van-tab>
                <van-tab :title="tags.count_zhuiping">
                  <ul class="pinglun">
                    <li v-for="(detail,index) in listPing" :key="index">
                        <div class="left pllog">
                          <img :src="detail.avatar" />
                        </div>
                        <div class="left pimg">
                          <p>{{detail.author}}</p>
                          <P>{{detail.comment}}</P>
                          <P class="fz12">{{detail.date*1000 | date-format1}}</P>
                          <div v-if="detail.imgs!=''">
                            <p class="setimg" v-for="(imgdet,index) in detail.imgs" :key="index">
                                <img :src="imgdet">
                            </p> 
                          </div>                        
                          <div v-if="detail.secondComment!=''">
                            <p class="cju">追评</p>
                            <p>{{detail.secondComment}}</p>
                            <div v-if="detail.secondImgs!=''">
                              <p class="setimg" v-for="(imgdet1,index) in detail.secondImgs" :key="index">
                                <img :src="imgdet1" />
                              </p>
                            </div>

                          </div>

                        </div>
                        <div class="left plxing">
                          <img src="@/assets/img30.png" />
                          <img src="@/assets/img30.png" />
                          <img src="@/assets/img30.png" />
                        </div>
                      </li>
                  </ul>
                </van-tab>
              </van-tabs>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 固定底部 -->
      <div class="shoppbofood">
        <a>
          <img src="@/assets/img12.png" />
          <span>客服</span>
        </a>

        <a @click="popupVisible=!popupVisible">
          <img src="@/assets/img38s.png" />
          <span>分享</span>
        </a>

        <a @click="popupduihuan=!popupduihuan">立即兑换</a>
      </div>

      <!-- 底部固定分享弹窗--->
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="popup_bottom">
          <ol>
            <li>
              <img src="../../../assets/img16.png" alt />
              <span>微信好友</span>
            </li>
            <li>
              <img src="../../../assets/img17.png" alt />
              <span>朋友圈</span>
            </li>
            <li>
              <img src="../../../assets/img19.png" alt />
              <span>QQ</span>
            </li>
            <li>
              <img src="../../../assets/img18.png" alt />
              <span>微博</span>
            </li>
          </ol>
          <div class="fxx"></div>
          <button class="priend" @click="popupShow">取消</button>
        </div>
      </mt-popup>
      <!--立即兑换弹窗--->
      <mt-popup v-model="popupduihuan" position="bottom">
        <div class="popup_bottom_duihuan">
          <div class="left dhimg">
            <img :src="firpic" />
          </div>
          <div class="left dhtext">
            <p class="fz16 cju">{{detail.needjifen}}积分</p>
            <p class="c3">库存{{detail.store}}件</p>
          </div>
          <div class="dhgb" @click="popupShowdh">
            <img src="@/assets/delect_03.jpg" />
          </div>
          <div class="clear dhshu">
            <span class="left">购买数量</span>
            <van-stepper v-model="value" min="1" :max="detail.store"/>
          </div>
          <button class="dhbutton" @click="clickque">确定</button>
        </div>
      </mt-popup>

      <!--  固定右侧 -->
      <div class="foodright">
        <a @click="gettop">
          <img src="@/assets/totalmonth_5s.png" />
          <span>顶部</span>
        </a>
        <a :href="'tel:' + 4008788686">
          <img src="@/assets/photos.png" />
        </a>
      </div>
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
      flag: 0
    };
  },
  methods: {
    clickque(){
      this.$router.push({
        name:'newdhadd',
        query: {shul:this.value,pic:this.firpic,name:this.toname,jifen:this.jifen,flag: this.flag}
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
      this.$post("/youshangcheng/detail.json",{
      id: this.$route.query.product_id
    })
    .then(res=>{
      this.detail = res.data.data;
      //首张图片
      this.firpic = this.detail.images[0];
      //名称
      this.toname = this.detail.title;
      //积分
      this.jifen = this.detail.needjifen;
      this.gid = res.data.data.gid;
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
        this.tags = res.data.data;
        console.log(res.data.data);
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
        console.log(res.data.data);
      })
      .catch(err=>{
        console.log("查询失败");
      })       
    }


  },
  created() {
    this.getBanners();
    this.flag = this.$route.query.flag;
  }

};
</script>
<style lang="scss" >
.clear {
  clear: both;
}


body {
  background: #fff;
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
  .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: #fff;
  }
}



    .mint-header {
      background: #fff;
      height: 0.5rem;
      border-bottom: 1px solid rgb(229, 233, 242);
      position: fixed;
      top: 0;
      right: 0;
      left: 0;

      z-index: 1;
      .mint-popup {
        border-radius: 0.1rem;
      }

      .mint-button-icon {
        color: #333333;
      }
      .mint-header-title {
        font-size: 0.15rem;
        color: #333333;
      }
      .mint-button-text {
        display: block;
        color: #333333;
        font-weight: normal;
        margin: 0;
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
    }
    .textone {
      margin: 0.18rem 0.18rem 0.53rem;
      img {
        width: 100%;
        height: 100%;
      }
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
      background: #e7eaef;
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
        width: 0.14rem;
        height: 0.14rem;
        margin-top: 0.02rem;
      }
      a:nth-child(1) {
        width: 30%;
        span {
          padding-top: 0.05rem;
        }
      }
      a:nth-child(2) {
        width: 30%;
        span {
          padding-top: 0.05rem;
        }
      }
      a:last-child {
        background: #0159d5;
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
      .fhinput {
        width: 0.3rem;
        height: 0.3rem;
        background: #000;
        opacity: 0.5;
        position: absolute;
        top: 2%;
        left: 2%;
        z-index: 100;
        border-radius: 0.5rem;
        img {
          width: 0.13rem;
          height: 0.13rem;
          margin: 0.09rem auto;
        }
      }
    }

    .foodright {
      position: fixed;
      bottom: 0.5rem;
      right: 0.12rem;
      z-index: 100;
      a {
        width: 0.4rem;
        height: 0.4rem;
        background: #000;
        opacity: 0.5;
        border-radius: 0.5rem;
        margin-bottom: 0.08rem;
        color: #fff;
        text-align: center;
        display: flex;
      }
      a:first-child {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        img {
          width: 0.13rem;
          height: 0.07rem;
        }
      }
      a:last-child {
        img {
          width: 0.26rem;
          height: 0.27rem;
          margin: auto;
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
    }
    .popup_bottom_duihuan {
      width: 100%;
      height: 4rem !important;
      /*  padding: 0.2rem 0.27rem; */
      // position: relative;
      .dhimg {
        width: 0.83rem;
        height: 0.83rem;
        padding: 0.02rem;
        overflow: hidden;
        position: absolute;
        top: -0.2rem;
        left: 0.1rem;
        display: flex;
        background: #fff;
        img {
          width: 100%;
          height: auto;
        }
      }
      .dhtext {
        position: absolute;
        left: 1rem;
        top: 0.02rem;
      }

      .dhbutton {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.46rem;
        background: #0159d5;
        color: #fff;
        border: none;
        line-height: 0.46rem;
        text-align: center;
        font-size: 0.14rem;
      }
      .dhshu {
        position: static;
        width: 100%;
        padding: 0.15rem;
        border-bottom: 1px solid #e5e5e5;
        width: 95%;
        margin: 0.7rem auto;
        span {
          line-height: 0.35rem;
          float: left;
        }
        .van-stepper {
          float: right;
        }
        .van-stepper__minus--disabled,
        .van-stepper__plus--disabled {
          background-color: #fff;
        }
        .van-stepper__input {
          background-color: #fff;
        }
        .van-stepper__plus {
          background: #fff;
        }
      }
      .dhgb {
        position: absolute;
        top: 0.05rem;
        right: 0.05rem;
        img {
          width: 80%;
        }
      }
    }
  }
}
</style>
 