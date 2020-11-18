<!-- 聚一聚 活动评论页面--> 
<template>
  <div class="meetBox">
    <!-- 头部 -->
    <!-- <mt-header title="评论">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
  <headerBox title="评论"></headerBox>

    <div class="Metstyle">
      <div>
        <span>全部评论</span>
        <div class="right pbutton" @click="clickSort">
          <div v-if="isShow" class="pbuttoni"></div>
          <div v-else class="pbuttoni-remove"></div>
        </div>
      </div>

      <ul>
        <li v-for="(comment, index) in list" :key="index">
          <div class="metlog left">
            <img :src="comment.avatar" alt />
          </div>
          <div class="mettext left">
            <div class="c3">{{comment.username}}</div>
            <div class="c9">{{comment.addtime}}</div>
            <P class="c3">{{comment.content}}</P>
          </div>

          <div class="zan right">
            <!-- <div @click="zanShow=!zanShow" class="left">
              <div v-if="zanShow" class="zani"></div>
              <div v-else class="zani-remove"></div>
            </div> -->
            <div @click="clickZan(comment)" class="left">
              <!-- 已经点赞 -->
              <div  v-if="comment.fav_users>=1" class="zani-remove"></div>
              <!-- 未点赞 -->
              <div v-else class="zani"></div>
            </div>
            <div class="left c9 pl1">{{comment.fav_num}}</div>
          </div>
        </li>
      </ul>
      <div
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="loading" 
      infinite-scroll-distance="10">

      </div>
      
      <div class="mend">—— 'END' ——</div>

      <div class="metnav">
        <mt-button @click="popupVisible=!popupVisible">
          <div>想一块体验不一样的的旅途么？从这条评论开始</div>
        </mt-button>

        <mt-popup v-model="popupVisible" position="bottom">
          <div class="popup_bottom">
            <input type="type" name="" placeholder="评论:" v-model="comment"/>
            <button class="priend right" @click="popupShow">发送</button>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data() {
    return {
      isShow: true,
      zanShow: true,
      popupVisible: false,
      list: [],
      comment:'',
      page:1,
      limit:10,
      loadig:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据
      ordernum: 2
    };
  },
 watch:{
      // type(){
      //     this.list = [];  //数组内容要清空
      //     this.page = 1;     //页码从第一页开始
      //     this.hasMore = true; //默认都是有更多数据
      //     this.getList();//请求数据
      // }
  },


  methods: {
    //排序
    clickSort(){
      this.isShow=!this.isShow;
      this.hasMore = true;
      this.page = 1;
      this.list=[];      
      if(this.ordernum == 2){
        this.ordernum=1;
      }else if(this.ordernum==1){
        this.ordernum=2;
      }
      this.loadMore() 
    },
    //点赞
    clickZan(comment){
      this.$post("/rongtuojinrong/activity/juyiju/ActivityCommentFav",{
      user_id: 31753,
      comment_id: comment.id,
      }).then(res => {
        //已经点赞
        if(res.data.status==1){
          console.log(res.data.msg); 
          return
        //未点赞  
        }else{
          //this.list2 = res.data;
          comment.fav_num=comment.fav_num*1+1;
          comment.fav_users=1;

          console.log(res.data.msg); 
        }

      })
      .catch(err => {
        console.log("点赞失败");
      }); 
      // this.hasMore = true;
      // this.page = 1;
      // this.list=[];
      // this.loadMore() 
    },

    loadMore(){ //加载更多的方法  
           if(!this.hasMore){ //如果没有更多数据了
                Toast({
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
            let toast = Toast({
                message: '正在加载....',
                iconClass: 'fa fa-cog fa-spin',
                duration:-1
            });
            this.$post('/rongtuojinrong/activity/juyiju/ActivityCommentList',{
              user_id: 31753,
              page,
              limit,
              topic_id: this.$route.query.topic_id,
              order: this.ordernum
            }).then(res=>{
                this.list = this.list.concat(res.data.data.list);
                this.loading = false;//继续开启无限滚动
                toast.close();//关闭toast
                if(page*limit >= res.data.data.count){ //判断是否有更多数据
                    this.hasMore = false; //没有更多数据了
                    return false;
                }
                this.page++;
            })
        },




    //评论
    popupShow() {
      this.popupVisible = false;
      this.$post("/rongtuojinrong/activity/juyiju/ActivityCommentSubmit",{
      user_id: 31753,
      topic_id: this.$route.query.topic_id,
      content: this.comment

      }).then(res => {
        this.list1 = res.data;
        console.log(res.data); 
      })
      .catch(err => {
        console.log("评论失败");
      }); 
      window.scroll(0,0);
      this.comment='';
      this.hasMore = true;
      this.page = 1;
      this.list=[];
      this.loadMore() 
      // this.showComment();
    },
    showComment(){
   //评论列表
      this.$post("/rongtuojinrong/activity/juyiju/ActivityCommentList",{
      user_id: 31753,
      topic_id: this.$route.query.topic_id,
      order: 2

      }).then(res => {
        this.list = res.data.data.list;
      })
      .catch(err => {
        console.log("评论显示失败");
      });
    }

  },
  created(){
    //this.showComment();
  }
};
</script>

<style lang="scss">
  .meetBox {
    width: 100%;
    height: 100%;
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
  .c3 {
    color: #333;
  }
  .c9 {
    color: #999;
  }
  .pl1 {
    padding-left: 0.05rem;
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
    .Metstyle {
      width: 100%;
      height: auto; 
      overflow: hidden;
      padding: 0.1rem 0.2rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      .pbutton {
        height: auto;
        overflow: hidden;
        .pbuttoni {
          width: 0.15rem;
          height: 0.15rem;
          background: url(../../../assets/p1.png) no-repeat;
          background-size: 100%;
        }
        .pbuttoni-remove {
          width: 0.15rem;
          height: 0.15rem;
          background: url(../../../assets/p2.png) no-repeat;
          background-size: 100%;
        }
      }
      ul {
        height: auto;
        padding: 0.2rem 0 0.2rem 0;
        overflow: hidden;
        li {
          height: auto;
          overflow: hidden;
          margin-bottom: 0.1rem;
          .metlog {
            width: 12%;
            overflow: hidden;
            img {
              width: 0.31rem;
              height: 0.31rem;
            }
          }
          .mettext {
            width: 70%;
            height: auto;
            border-bottom: 1px solid #e5e9f2;
            padding-bottom: 0.1rem;
            font-size: 0.12rem;
            div {
              line-height: 0.2rem;
            }
          }
          .zan {
            /* width:10%;overflow: hidden; */
            .zani {
              width: 0.18rem;
              height: 0.18rem;
              background: url(../../../assets/p3.png) no-repeat;
              background-size: 100%;
              margin: 0;
            }
            .zani-remove {
              width: 0.18rem;
              height: 0.18rem;
              background: url(../../../assets/p4.png) no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
    .metnav {
      width: 100%;
      height: 0.6rem;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      border-top: 1px solid #ebeefc;
      .mint-button {
        color: #999;
        background-color: #f6f8fa !important;
        font-size: 0.12rem;
        border-radius: 0.05rem;
        width: 90%;
        margin: 0.12rem auto;
        line-height: 0.35rem;
        display: block;
        height: 0.35rem;
        label {
          font-weight: normal;
        }
      }
    }
    .mend {
      text-align: center;
      color: #999;
      height: 0.4rem;
      /* position: fixed;
      bottom: 10%;
      left: 0;
      width: 100%; */
    }
    .popup_bottom {
      width: 100%;
      height: 0.5rem;
      /* padding: 0.2rem 0.27rem; */
      background: #f9f9f9;
      input {
        width: 82%;
        height: 0.35rem;
        background: #fff;
        border-radius: 0.02rem;
        border: none;
        float: left;
        margin: 0.07rem 0 0 0.06rem;
        padding: 0.1rem;
      }

      button {
        width: 15%;
        border: none;
        display: block;
        height: 0.5rem;
        text-align: center;
        font-size: 0.14rem;
        background: none;
      }
    }

    .mint-button::after {
      background-color: none;
      content: " ";
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
    }
    .mint-button:active {
      background-color: none;
    }
    .mint-popup-bottom {
      width: 100%;
      top: auto;
      right: auto;
      bottom: 0;
      left: 50%;
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0);
      height: 0.5rem;
    }
  }
</style>
 