<!-- 聚一聚 发布活动列表详情页面--> 
<template>
  <div class="runBox">
    <!-- 头部 -->  
<!-- <mt-header :title="administer.topic">
      <router-link to="/mypublish" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link :to="{name:'run'}" slot="right">
        <mt-button>验票</mt-button>
      </router-link>
    </mt-header> -->
   <headerBox  :title="administer.topic">
      <span slot="rightTo" class="right_content fz14" >
        <router-link :to="{name:'run'}" slot="right" v-if="this.$route.query.acticity_status==2">
        <!--  ,query:{activity_id:run.activity_id} -->
        验票 
      </router-link>
      <div v-else @click="Unaudited">验票</div>
      </span>
    </headerBox>

    <div class="runstyleBox">
      <div class="pl">管理活动</div>
      <div class="runcolumn">
        <div class="columna">
          <p class="pdqu">报名</p>
          <P class="c9">{{administer.submit_num}}</P>
        </div>
        <div class="columnb">
          <p class="pdqu">
            阅读
            <span class="c9">{{administer.count_view}}</span>
          </p>
          <p>
            评论
            <span class="c9 pdl05">{{administer.commentnum}}</span>
          </p>
        </div>

        <div class="columnc">
          <p class="pdqu">
            分享
            <span class="c9">{{administer.count_share}}</span>
          </p>
          <p>
            赞&nbsp;&nbsp;&nbsp;
            <span class="c9 pdl05">{{administer.praisenum}}</span>
          </p>
        </div>
      </div>

      <div class="pl">活动信息</div>
      <div class="xinxi">
        <!-- <input type placeholder="融米一家亲" /> -->
        <div class="input">{{administer.topic}}</div>

        <button class="xinxg" v-if="this.$route.query.acticity_status==2" @click="button">修改</button>
        <router-link v-else class="xinxg" tag="button" :to="{name:'reviseissue',query:{activity_id:administer.activity_id}}">修改</router-link>
      </div>

      <div class="pl">你还可以进行一下操作</div>
      <ul class="yucz">
        <li v-if="this.$route.query.acticity_status==2" >
          <img src="../../../assets/r2.png" alt />
          <span>分享</span>
        </li>

      <li v-else @click="Unaudited">
          <img src="../../../assets/r2.png" alt />
          <span>分享</span>
        </li>

        <router-link :to="{name:'issue'}" tag="li">
          <img src="../../../assets/r6.png" alt />
          <span>再发一个</span>
        </router-link>
        <router-link tag="li" :to="{name:'details',query:{activity_id:administer.activity_id}}">
          <!-- ,query:{activity_id:publish.activity_id} -->
          <img src="../../../assets/r4.png" alt />
          <span>查看</span>
        </router-link>
        <!-- <li>
          <img src="../../../assets/r3.png" alt />
          <span>导出名单</span>
        </li> 
        <li>
          <img src="../../../assets/r5.png" alt />
          <span>群发消息</span>
        </li>
        <li>
          <img src="../../../assets/r7.png" alt />
          <span>下载二维码</span>
        </li>-->
      </ul>


    </div>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import { Toast } from "vant";
Vue.use(Toast);
// 全局注册
//Vue.use(Dialog);
export default {
  data() {
    return {
      administer: ""
    };
  },
  methods: {
    getDetail() {
      this.$post("/rongtuojinrong/activity/juyiju/ActivityDetail.json", {
        user_id: 31753,
        activity_id: this.$route.query.activity_id
      }).then(res => {
        this.administer = res.data.data;
        console.log(res.data.data);
      });
    },
 button(){
   Toast("活动已审核通过或活动已结束无法修改");
}, 
  Unaudited(){
    Toast("活动未审核通过或活动已结束无法进行验票操作！");
  }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style lang="scss">
  .runBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
     background: #f9f9f9;
     position: absolute;
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
  .c9 {
    color: #999;
  }
  .f12 {
    font-size: 0.12rem;
  }
  .f16 {
    font-size: 0.16rem;
  }
  .f14 {
    font-size: 0.14rem;
  }
  .c_blue {
    color: #0558da;
  }
  .tr {
    text-align: right;
  }
  .pl {
    padding: 0.15rem;
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
        overflow: visible !important;
      }
      .mint-button-text {
        display: block;
        color: #333333;
        font-weight: normal;
        margin: 0;
        font-size: 14px;
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
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .runstyleBox {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: 0.5rem;

      .runcolumn {
        height: 0.97rem;
        background: #fff;
        width: 100%;
        /* padding: 0 0.35rem 0 0.15rem; */
        overflow: hidden;
        color: #000;
        div {
          width: 32%;
          overflow: hidden;
          float: left;
          .pdqu {
            /* padding-top: 0.2rem; */
            span {
              padding-left: 0.05rem;
            }
          }
          p {
            line-height: 0.5rem;
          }
         
        }
         .columna { text-align: center;padding-top:0.32rem;
           p {
            line-height: 0.2rem;
          }
         }
      }

      .xinxi {
        height: auto;
        background: #fff;
        width: 100%;
        padding: 0 0.35rem 0 0.15rem;
        overflow: hidden;
        .input {
          width: 100%;
          border: none;
          border-bottom: 1px solid #0159d5;
          height: 0.4rem;
          line-height: 0.4rem;
          color: #666;
        }
        .xinxg {
          background: url(../../../assets/r1.png) no-repeat;
          text-indent: 0.16rem;
          border: none;
          background-size: 36%;
          text-align: center;
          display: block;
          margin: 0.1rem auto;
        }
      }

      .pdl05 {
        padding-left: 0.05rem;
      }
      .yucz {
        width: 100%;
        height: auto; /* 1.88rem */
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        /* padding: 0.25rem 0 0.25rem 0; */
        background: #fff;

        li {
          width: 32%;
          height: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          img {
            width: 0.26rem;
            height: 0.26rem;
          }
          span {
            color: #2d2d2d;
            font-size: 0.14rem;
            margin-top: 0.1rem;
          }
        }
      }
    }
  
  }
</style>
 