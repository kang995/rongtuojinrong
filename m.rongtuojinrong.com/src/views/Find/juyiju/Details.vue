<!-- 聚一聚 活动详情--> 
<template>
  <div class="DetailsBox">
    <!-- 头部 -->
   <!--  <mt-header title="活动">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">
        <div class="img_button">
          <img src="../../../assets/img38s.png" alt @click="popupVisible=!popupVisible" />
        </div>
      </mt-button>
    </mt-header>  -->        
  <headerBox title="活动">
    <span slot="rightTo" class="right_content">
      <div class="img_button">
          <img src="../../../assets/img38s.png" alt @click="popupVisible=!popupVisible" />
        </div>
    </span>
  </headerBox>

 <van-popup v-model="popupVisible"  position="bottom"  >
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
      </div>
      <div class="fxx"></div>
      <button class="priend" @click="popupShow">取消</button>
    </van-popup>



    <div class="pulishBox">
      <p class="c3">{{Detail.topic}}</p>
      <div class="putlist">
        <div class="debox">
          <div class="puma">
            <div class="left">
              <div class="left maing">
                <img :src="Detail.avatar" alt />
              </div>
              <div class="left lh25">
                <p class="c_blue">{{Detail.username}}</p>
                <p class="f12">{{Detail.add_date}}</p>
              </div>
            </div>
            <div class="right">
              <div class="lh25">
                <p>阅读&nbsp;{{Detail.count_view}}</p>
                <p>分享&nbsp;{{Detail.count_share}}</p>
              </div>
            </div>
          </div>
          <div class="dian">
            <div class="he2 left">
              <i class="i1"></i>
              <span>开始时间</span>
              <span>{{Detail.activity_start_date}}</span><!--  |formatDate -->
            </div>
            <div class="he2 left ml45">
              <i class="i2"></i>
              <span>报名地点</span>
              <span>{{Detail.address}}</span>
            </div>
            <div class="he2 left">
              <i class="i3"></i>
              <span>结束时间</span>
              <span>{{Detail.activity_end_date}}</span>
            </div>
            <div class="he2 left ml45">
              <i class="i4"></i>
              <span>报名人数</span>
              <span>{{Detail.submit_num}}名</span>
              <span>(限{{Detail.submit_limit}})</span>
            </div>
            <div class="he2 left">
              <i class="i5"></i>   
              <span>{{Detail.submit_end_date}}</span>
            </div>
          </div>

          <!--  活动内容 -->
          <div class="conter">
            <div v-html="Detail.content"></div>
              <div class="disNO">
                 <div class="dian2">
              <div class="tebg">
                <i class="left"></i>活动时间
                <i class="right"></i>
              </div>
              <p>{{Detail.activity_start_date}}</p>
              <p>聊城市花园南路聊城大学西校东门图书馆门口</p>
            </div>
            <div class="dian2">
              <div class="tebg">
                <i class="left"></i>活动地点
                <i class="right"></i>
              </div>
              <p>{{Detail.address}}</p>
            </div>
            <div class="dian2">
              <div class="tebg">
                <i class="left"></i>活动内容
                <i class="right"></i>
              </div>
              <p>5月12日（星期六）早6：00集合</p>
              <p>上午10点左右到达目的地采摘大樱桃</p>
              <p>（钓鱼爬山等自由安排）</p>
              <p>用餐樱桃树下农家宴</p>
              <p>（钓鱼爬山等自由安排）</p>
            </div>
            <div class="dian2">
              <div class="tebg">
                <i class="left"></i>活动经费
                <i class="right"></i>
              </div>
              <p>成人85元，儿童（1.44以下）55元</p>
              <p>含5元保险费</p>
              <p>买樱桃按25元/斤结算</p>
            </div>
            <div class="dian2">
              <div class="tebg">
                <i class="left"></i>活动备注
                <i class="right"></i>
              </div>
              <p>费用含午餐费和门票费，不含车费</p>
              <p>车座位按交费的顺序来安排</p>
              <p>交了费一律不退~</p>
              <p>车位按照AA再回来的路上收取</p>
              <p>咨询电话 111111111 雷女士</p>
            </div>
              </div>
            <p class="c_blue" >以上活动为融米发起，融托金融不承担任何责任</p>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <ul class="nav">
        <li>
          <img src="../../../assets/d8.png" @click="clickPraise(Detail.activity_end_time)" alt />
          <span v-if="Detail.ispraise==0" class="a1">赞({{Detail.praisenum}})</span>
          <span v-else class="a1">已赞({{Detail.praisenum}})</span>
        </li>
        <!-- <router-link :to="{name:'comment',query:{topic_id:this.$route.query.activity_id}}" tag="li">
          <img src="../../../assets/d7.png" alt />
          <span>{{Detail.commentnum}}</span>
        </router-link> -->
  
        <li @click="clickComment(Detail.activity_end_time)">
          <img src="../../../assets/d7.png" alt />
          <span>{{Detail.commentnum}}</span>
        </li>

        <!-- <router-link  tag="li" :to="{}" @click="popupEnlist=!popupEnlist">
        <img v-if="Detail.joinsuccess===0" src="../../../assets/d9.png" alt />
        <img v-if="Detail.joinsuccess===1" src="../../../assets/img08.jpg" alt />
        <img v-if="Detail.joinsuccess===2" src="../../../assets/img09.jpg" alt />
        <img v-if="Detail.joinsuccess===3" src="../../../assets/img08.jpg" alt />
        <span>{{Detail.joinsuccess}}</span>
        </router-link>-->

        <li>
          <!--   状态0可以报名 -->
          <div
            v-if="Detail.joinsuccess===0"
            style="display: inherit;"
            @click="popupEnlist=!popupEnlist"
          >
            <img src="../../../assets/d9.png" alt />
           <!--  <span>{{Detail.joinsuccess}}</span> -->
           <span>可以报名</span> 
          </div>
          <!--   状态1可报名已结束 -->
          <div v-if="Detail.joinsuccess===1" style="display: inherit;">
            <img src="../../../assets/img08.jpg" alt />
            <span>报名已结束</span>
          </div>
          <!--   状态2已报名 -->
          <div v-if="Detail.joinsuccess===2">
            <img src="../../../assets/img09.jpg" alt />
            <span>已报名</span>
          </div>
          <!--   状态3活动已结束 -->
          <div v-if="Detail.joinsuccess===3">
            <img src="../../../assets/img08.jpg" alt />
            <span>活动已结束</span>
          </div> 
        </li>
      </ul>

      <!--  报名弹窗 -->
      <van-popup v-model="popupEnlist" position="bottom">
        <div class="popup_bottomss">
          <input type="text" placeholder="手机号" name="" class="phones" v-model="mobile"/>
          <input type="text" placeholder="姓名" name="" class="names" v-model="name"/>
          <button @click="popupcgts">我要报名</button>
        </div>
      </van-popup>

      <!-- 报名提交审核弹窗 -->
      <!-- <van-popup v-model="popupokcgts" position="center" style="background:none;">
        <div class="popup_bottomok">
          <div class="bootok_img">
            <img src="../../../assets/tjcg.png" alt />
            <p class="cs f16">提交成功</p>
            <p>等待工作人员审核</p>
            <button>确定</button>
          </div>
          <img src="../../../assets/gb.png" alt class="gb" @click="popupwhole" />
        </div>
      </van-popup> -->

      <!-- 报名成功弹窗 -->
      <van-popup v-model="popupOk" :close-on-click-overlay="false" position="center" style="background:none;">
        <div class="popup_bottomok">
          <div class="bootok_img">
            <div class="bootok_img_1">
              <img src="../../../assets/jcg.png" alt />
            </div>           
            <p class="cs f16">报名成功</p>
            <div class="bootok_img_2">
              <div class="bootok_img_2a">
                <span>点击领取报名凭证</span>
                <span>用于活动入场时验票</span>
              </div>
              <div class="bootok_img_2b">免费</div>
            </div>
          </div>
          <img src="../../../assets/gb.png" alt class="gb" @click="popupwhole" />
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
//import { formatDate } from "../../../modules/datab.js";
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
export default {
  data() {
    return {
      popupVisible: false,
      popupEnlist: false,
      popupokcgts: false,
      popupOk: false,
      Detail: "", //详情
      praise:'',
      mobile:'',
      name:'',
      dbtimer:[]
    };
  },
  methods: {
    //点击评论
    clickComment(dat){
      //判断活动是否结束
      if(this.dbtimer.timestamp>dat){
        this.$toast('活动已结束不能操作！'); 
        return false;
      }
      //编程式
      this.$router.push({
        name:'comment',
        query:{topic_id:this.$route.query.activity_id}
      })
    },
    popupShow() {
      this.popupVisible = false;
    },
    //报名活动
    popupcgts() {
      if(this.name==''||this.mobile==''){
        this.$toast('手机号或姓名不能为空');
        return false;
      };
      if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ 
        this.$toast('请输入正确手机号'); 
        return false; 
      } 
      this.popupEnlist = false;
      this.popupokcgts = true;
      this.$post("/rongtuojinrong/activity/juyiju/ActivitySubmit",{
      user_id: 31753,
      realname: this.name,
      mobile: this.mobile,
      topic_id: this.$route.query.activity_id,

      }).then(res => {
        this.praise = res.data;
        //alert(res.data.msg);
        this.popupOk=true;
        console.log(res.data.data.activity_start_time)
      })
      .catch(err => {
        console.log("请重新报名");
      });
      this.mobile='';
      this.name='';
    },
    popupwhole() {
      this.popupokcgts = false;
      this.popupEnlist = false;
      this.popupOk=false;
    },

    getDetails() {
      this.$post( "/rongtuojinrong/activity/juyiju/ActivityDetail.json",{
          //user_id: 31753,
          activity_id: this.$route.query.activity_id
        }).then(res => {
          this.Detail = res.data.data;
        });
    },
    //点赞
    clickPraise(dat) {
      //判断活动是否结束
      if(this.dbtimer.timestamp>dat){
        this.$toast('活动已结束不能操作！'); 
        return false;
      }
      this.$post("/rongtuojinrong/activity/juyiju/ActivityFav",{
        user_id: 31753,
        topic_id: this.$route.query.activity_id,
        }).then(res => {
          this.praise = res.data;
          this.$toast(res.data.msg); 
        })
        .catch(err => {
          console.log("点赞失败");
        });
        this.getDetails();
    }
  },
  created() {
    this.getDetails();
    //获取服务器时间
    this.$post("/rongtuojinrong/utils/ntp.json")
        .then(res => {
          this.dbtimer = res.data.data;
          //console.log(res.data.data.timestamp);
        })
        .catch(err => {
          console.log("获取服务器时间失败");
        });
  }
};
</script>

<style lang="scss">
  .DetailsBox {
    width:100%;
    height:100%;
    font-size: 14px;
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
  .c3 {
    color: #333;
  }
  .f12 {
    font-size: 0.12rem;
  }
  .f16 {
    font-size: 0.16rem;
  }
  .c_blue {
    color: #0558da;
  }
  .tr {
    text-align: right;
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
    .mint-popup-bottom {
      width: 100%;
      top: auto;
      right: auto;
      bottom: 0;
      left: 50%;
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
      height: 1.5rem;
    }
    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      margin-top:0.15rem;
      img {
        width: 100%;
      }
    }
    .head_nav {
      margin-top: 0.5rem;
      height: 0.46rem;
      overflow: hidden;
      li {
        width: 50%;
        float: left;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-bottom: 1px solid #e5e9f2;
        background: #fff;
      }
      .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      }
    }
    .pulishBox {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0.12rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      .putlist {
        overflow: hidden;
        margin-top: 0.1rem;
        height: auto;
        width: 100%;
        .debox {
          color: #999;
          margin-bottom: 0.05rem;
          border-radius: 0.1rem;
          .puma {
            overflow: hidden;
            /*  border-bottom: 1px solid #e5e9f2; */
            padding-bottom: 0.1rem;
            .maing {
              width: 0.46rem;
              height: 0.46rem;
              overflow: hidden;
              border-radius: 0.2rem;
              margin-right: 0.1rem;
              img {
                width: 100%;
              }
            }
          }
        }
        .dian {
          color: #8e8f93;
          padding: 0.1rem;
          margin-bottom: 0.15rem;
          border-radius: 0.1rem;
          background: #f7f8fc;
          height: 0.85rem;
          font-size: 0.12rem;
          span {
            padding-left: 0.02rem;
          }
          .i1 {
            display: block;
            width: 0.14rem;
            height: 0.14rem;
            background: url(../../../assets/d1.png) no-repeat center;
            background-size: 100%;
            float: left;
            margin-top: 0.01rem;
          }
          .i2 {
            display: block;
            width: 0.14rem;
            height: 0.14rem;
            background: url(../../../assets/d2.png) no-repeat center;
            background-size: 100%;
            float: left;
            margin-top: 0.01rem;
          }
          .i3 {
            display: block;
            width: 0.14rem;
            height: 0.14rem;
            background: url(../../../assets/d3.png) no-repeat center;
            background-size: 100%;
            float: left;
            margin-top: 0.01rem;
          }
          .i4 {
            display: block;
            width: 0.14rem;
            height: 0.14rem;
            background: url(../../../assets/d4.png) no-repeat center;
            background-size: 100%;
            float: left;
            margin-top: 0.01rem;
          }
          .i5 {
            display: block;
            width: 0.14rem;
            height: 0.14rem;
            background: url(../../../assets/d5.png) no-repeat center;
            background-size: 100%;
            float: left;
            margin-top: 0.01rem;
          }
        }
        .conter {
          margin-bottom: 0.1rem;
          p {
            text-align: left;
            text-indent: 2em;
            line-height: 0.3rem;
            padding-bottom: 0.2rem;
          }
          img {
            width: 100%;
            border-radius: 0.1rem;
          }
          .dian2 {
            color: #8e8f93;
            padding: 0.1rem;
            margin-bottom: 0.15rem;
            border-radius: 0.15rem;
            background: #f7f8fc;
            height: auto;
            overflow: hidden;
            p {
              text-align: center;
              color: #333;
              line-height: 0.3rem;
              text-indent: 0;
              padding-bottom: 0;
            }
            .tebg {
              width: 40%;
              margin: auto;
              text-align: center;
              margin-bottom: 0.05rem;
              color: #333;
              i {
                width: 0.2rem;
                height: 0.2rem;
                background: url(../../../assets/d6.png) no-repeat;
                display: block;
                background-size: 100%;
              }
            }
          }
        }
      }
      .lh25 {
        line-height: 0.25rem;
      }
      .he2 {
        height: 0.25rem;
      }
      .disNO{display: none;}

      .nav {
      width: 100%;
      height: 0.52rem;
      display: flex;
      justify-content:space-around;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-top: 1px solid #ebeefc;
      li {
        height: 0.96rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.01rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
        }
        span {
          font-size: 0.11rem;
          color: #505050;
          padding-left: 0.05rem;
        }
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    }
    .popup_bottom {
      width: 100%;
      height: 0.75rem;
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
    }

    .popup_bottomss {
      width: 100%;
      height: 2.45rem;
      padding: 0.27rem 0.27rem;
     
      background: #fff;
      .phones {
        width: 100%;
        height: 0.4rem;
        border: none;
        background: #fff;
        box-shadow: 0 0 10px #f0f7ff;
        border-radius: 0.2rem;
        margin: 0.05rem auto;
        background: url(../../../assets/img103.png) no-repeat left;
        text-indent: 0.4rem;
        background-position-x: 0.1rem;
        background-size: 9%;
      }
      .names {
        width: 100%;
        height: 0.4rem;
        border: none;
        background: #fff;
        box-shadow: 0 0 10px #f0f7ff;
        border-radius: 0.2rem;
        margin: 0.2rem auto;
        background: url(../../../assets/img104.png) no-repeat left;
        text-indent: 0.4rem;
        background-position-x: 0.1rem;
        background-size: 9%;
      }
      button {
        width: 100%;
        height: 0.4rem;
        border: none;
        background: #1d87f7;
        box-shadow: 0 0 10px #f0f7ff;
        border-radius: 0.2rem;
        margin: 0.2rem auto;
        color: #fff;
      }
    }

    //报名审核弹窗
    .popup_bottomok {
      width: 2.7rem;
      height: 2.7rem;
      overflow: hidden;
      margin: auto;
      .bootok_img {
        width: 2.7rem;
        border-radius: 0.1rem;
        background: #fff;
        .bootok_img_1{
            width: 1.3rem;
            margin: 0 auto;
          img {
            max-width: 100%;
            height: auto
          }
        }

        .bootok_img_2{
          font-size: 0.14rem;
          display: flex;
          justify-content: space-between;
          .bootok_img_2a{
            width: 60%;
            text-align: center;
            display: flex;
            flex-direction: column;
            span{
              height: 0.25rem;
              line-height: 0.25rem;
            }
            span:nth-child(2){
              font-size: 0.1rem
            }
          }
          .bootok_img_2b{
            text-align: center;
            width: 40%;
            border-left: 1px solid #eee;
            height: 0.5rem;
            line-height: 0.5rem;
          }
        }

        p {
          text-align: center;
          line-height: 0.4rem;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid #eee;
        }
      }
      button {
        text-align: center;
        border: none;
        color: #0159d4;
        width: 100%;
        margin: 0.2rem auto;
        background: #fff;
        font-size: 0.14rem;
      }
      .gb {
        width: 0.2rem;
        height: 0.2rem;
        margin: 0.2rem auto;
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
      /* margin-top: 0.1rem; */
      height:0.4rem;
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
      margin-top: 0.3rem;
    }
    .ml45 {
      padding-left: 0.15rem;
    }
  }
</style>
 