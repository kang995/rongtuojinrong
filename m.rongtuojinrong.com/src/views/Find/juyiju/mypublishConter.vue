<template>
  <div class="MymangsBox">

    <div class="pulishBox" v-if="isShowtrue">
      <div class="putop">
        <span>
          共
          <span>{{count}}</span>个活动
        </span>
        <a class="acss" @click="jinxing">只看进行中的活动</a>
      </div>
       <div class="NOdata" v-if="this.count==0"><img src="../../../assets/sm_16.png"><P>暂无数据</P></div> 
      <!-- status==0 -->
       <div v-else>
         <ul class="putlist"   v-for="publishs in publisha" :key="publishs.id">
        <!--v-if="publish.status===0"-->
        <router-link :to="{name:'rundet',query:{activity_id:publishs.activity_id,acticity_status:publishs.acticity_status}}"
          tag="li"  v-if="publishs.acticity_status==2||publishs.acticity_status==3">
          <div class="pbor">
            <p>{{publishs.topic}}</p>
            <P class="c9 fz12">{{publishs.pub_date}}</P>
          </div>
          
          <div class="clear stpa">
            <div class="state left">
              <span
                v-for="item in publishs.activity_label"
                :style="{backgroundColor:'#'+item.label_color}"
                :key="item.id"
              >{{item.label_name}}</span>
            </div>
            <div class="right stc fz12">
              <span>{{publishs.submit_num}}</span>报名
            </div>
          </div>
        </router-link>

        <li v-else @click="hdend">
          <div class="pbor">
            <p>{{publishs.topic}}</p>
            <P class="c9">{{publishs.pub_date}}</P>
          </div>
          <div class="clear stpa">
            <div class="state left">
              <span
                v-for="item in publishs.activity_label"
                :style="{backgroundColor:'#'+item.label_color}"
                :key="item.id"
              >{{item.label_name}}</span>
              <!-- <span>免费</span>
              <span>已结束</span>--> 
              <!-- {{publishs.activity_label}} -->
            </div>
            <div class="right stc fz12">
              <span>{{publishs.submit_num}}</span>报名
            </div>
          </div>
        </li>
      </ul>
       </div>

      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      ></div>
    </div>

    <!--  进行中的活动 -->
    <div class="gl_pulishBox " v-if="isShow">
      <div class="putop">
        <span>
          共
          <span>{{count}}</span>个活动
        </span>
        <a class="acss" @click="getList">查看全部活动</a>
      </div>
        <div class="NOdata" v-if="this.count==0"><img src="../../../assets/sm_16.png"><P>暂无数据</P></div> 
        <div v-else>
            <ul class="putlist">
              <li  v-for="publishs2 in publishb" :key="publishs2.id"  >
              <router-link class="pbor"   :to="{name:'rundet',query:{activity_id:publishs2.activity_id,acticity_status:publishs2.acticity_status}}"
              tag="div">
                <div>
                  <p class="lh">{{publishs2.topic}}</p>
                  <P class="c9 lh">
                    发布时间：
                    <span>{{publishs2.pub_date}}</span>
                  </P>
                </div>
                <div class="clear stpa">
                  <div class="state left">
                    <!-- <span>免费</span>
                    <span>报名中</span>-->
                    <span
                      v-for="item in publishs2.activity_label"
                      :style="{backgroundColor:'#'+item.label_color}"
                      :key="item.id"
                    >{{item.label_name}}</span>
                  </div>
                </div>
              </router-link>

              <ul class="mantul">
                <router-link tag="li" :to="{name:'details',query:{activity_id:publishs2.activity_id}}">
                  <img src="../../../assets/h_01.jpg" alt />
                  <span>查看</span>
                </router-link>
                <li v-if="publishs2.acticity_status==2" @click="tzbutton">
                  <img src="../../../assets/h_02.jpg" alt />
                  <span>修改</span>
                </li>
                <router-link tag="li"  v-else :to="{name:'rundet',query:{activity_id:publishs2.activity_id,acticity_status:publishs2.acticity_status}}">
                  <img src="../../../assets/h_02.jpg" alt />
                  <span>修改</span>
                </router-link>
                <li @click="popupVisible=!popupVisible">
                  <img src="../../../assets/h_03.jpg" alt />
                  <span class="c9">分享</span>
                </li>
              </ul>
              </li>
            </ul>  
        </div>
      
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      ></div>
      <!-- 分享 -->
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

    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      publisha:[] ,
      publishb:[] ,
      isShowtrue: true,
      isShow: false,
      count: "",
      page: 1,
      limit: 10,
      loadig: false, //默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore: true, //有更多数据
      popupVisible: false,
    }
  },
  methods: {
    loadMore(){//加载更多的方法
      if (!this.hasMore){
        //如果没有更多数据了
        Toast({
          message: "我是有底线的....",
          duration: 2000,
          position: "bottom"
        });
        //关闭无限滚动
        this.loading = true;
        return false; //不在请求数据
      }
      this.getList() 
      /*  this.quanbu()  */
    },
    getList() {
      let {page, limit } = this; //不使用{}解构时的写法：let page = this.page
      this.loading = true; //关闭无限滚动  5s
      let toast = Toast({
        message: "正在加载....",
        iconClass: "fa fa-cog fa-spin",
        duration: -1
      });
      this.isShowtrue = true;
      this.isShow = false;
      this.$post("/rongtuojinrong/activity/juyiju/my/PubActivityList.json", {
        page,
        limit,
        //user_id: 31753,
        status: 0
      }).then(res => {
        this.publisha =this.publisha.concat(res.data.data.list);
        this.count = res.data.data.count;
        console.log(this.count);
        console.log( this.publisha)
        this.loading = false; //继续开启无限滚动
        toast.close(); //关闭toast
        if (page * limit >= res.data.data.count) {
          //判断是否有更多数据
          this.hasMore = false; //没有更多数据了
          return false;
        }
        this.page++;
      });
    },
    jinxing(){
      this.isShow = true;
      this.isShowtrue = false;
       this.$post("/rongtuojinrong/activity/juyiju/my/PubActivityList.json", {
        //user_id: 31753,
        status: 1,
      }).then(res => {
        this.publishb = this.publishb.concat(res.data.data.list);
        this.count = res.data.data.count;
      }); 
    },
    popupShow() {
      this.popupVisible = false;
    },
    tzbutton(){
       Toast("活动已审核通过或活动已结束无法修改。");
    },
    hdend(){
      Toast("活动已结束，无法进行管理。");
    }
  },

  created() {
     /* this.getList(); */
  }
};
</script>

<style lang="scss" scoped>
  .lh{line-height: 0.22rem;}
  .MymangsBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
    position:absolute;
    padding-top:1rem;
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
  .c9{color:#999;}
  .fz12{font-size: 0.12rem;}
    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      overflow: hidden;
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
      padding: 0.1rem 0.2rem;
      .putop {
        overflow: hidden;
        padding-bottom: 0.1rem;
        height: 0.3rem;
        span {
          padding: 0.05rem;
          color: #999;
          line-height: 0.3rem;
          span {
            color: #333;
          }
        }
        .acss {
          background: #0159d5;
          padding: 0.05rem;
          color: #fff;
          border-radius: 0.1rem;
          border-radius: 0.03rem;
          float: right;
          display: block;
        }
      }
      .putlist {
        li {
          background: #fff;
          margin-top: 0.1rem;
          border-radius: 0.1rem;
          padding: 0.05rem 0 0.12rem 0;
          height: auto;
          width: 100%;

          .pbor {
            border-bottom: 1px solid #e5e9f2;
            margin: 0 0.1rem;
            color: #333;
            padding-bottom:0.1rem;
           p{line-height: 0.25rem;}
          }

          .stpa {
            padding: 0.15rem 0.2rem 0 0.1rem;
            .state {
              span {
                // background: #f49915;
                padding: 0.03rem 0.04rem;
                border-radius: 0.05rem;
                color: #fff;
                font-size: 12px;
                margin-right: 0.1rem;
              }
            }
            .stc {
              color: #999;
              span {
                color: #f49915;
                padding: 0.05rem;
              }
            }
          }
        }
      }
    }

    .gl_pulishBox {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0.1rem 0.2rem;
      .putop {
        overflow: hidden;
        padding-bottom: 0.1rem;
        height: 0.3rem;
        span {
          padding: 0.05rem;
          color: #999;
          line-height: 0.3rem;
          span {
            color: #333;
          }
        }
        .acss {
          background: #0159d5;
          padding: 0.05rem;
          color: #fff;
          border-radius: 0.1rem;
          border-radius: 0.03rem;
          float: right;
          display: block;
        }
      }
      .putlist {
        li {
          background: #fff;
          margin-top: 0.1rem;
          border-radius: 0.1rem;
          padding: 0 0 0.05rem 0;
          height: auto;
          width: 100%;

          .pbor {
            border-bottom: 1px solid #e5e9f2;
            padding: 0.1rem;
            color: #333;
          }

          .stpa {
            padding: 0.08rem 0 0 0;
            .state {
           /*    span:nth-child(1) {
                background: #2c71b6;
                padding: 0.03rem 0.04rem;
                border-radius: 0.05rem;
                color: #fff;
                font-size: 12px;
                margin-right: 0.1rem;
              }
              span:nth-child(2) {
                background: #e94f5b;
                padding: 0.03rem 0.04rem;
                border-radius: 0.05rem;
                color: #fff;
                font-size: 12px;
                margin-right: 0.1rem;
              } */
              span{padding: 0.03rem 0.04rem;
                border-radius: 0.05rem;
                color: #fff;
                font-size: 12px;
                margin-right: 0.1rem;}
            }


            .stc {
              color: #999;
              span {
                color: #f49915;
                padding: 0.05rem;
              }
            }
          }

          .mantul {
            width: 100%;
            display: flex;
            height: 0.42rem;
            align-items: center;
            height: auto;
            overflow: hidden;
            li {
              width: 32%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              img {
                width: 0.18rem; /* height:0.11rem; */
              }
              span {
                /* color: #333; */
                font-size: 0.12rem;
                padding-top: 0.05rem;
              }
            }
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
         .fxx {
      height: 2px;
      border-top: 3px solid #f7f8fc;
      width: 100%;
      margin-top: 0.3rem;
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
    }
      .NOdata {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: auto;
        img {
          width: 0.85rem;
          height: 0.85rem;
          margin: 0.05rem auto;
        }
        p {
          text-align: center;
          color: #333;
          line-height: 0.5rem;
        }
      }
  }
</style>