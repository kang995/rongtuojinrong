<!--聚一聚首页--> 
<template>
  <div class="counterBox">
    <!-- 头部 -->
    <!-- <mt-header title="聚一聚">
      <router-link to="/find" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
<headerBox title="聚一聚"></headerBox>

    <!-- 循环生成cell -->
    <ul  class="bookingbox" >
      <li v-for="listing in list" :key="listing.id">
        <div class="left bookinglog">
          <img :src="listing.avatar" />
        </div>
        <div class="left bookingadd">
          <P>{{listing.username}}</P>
          <p>{{listing.activity_date}}</p>
        </div>
        <div class="right bookings">
          <img src="../../../assets/img101.png" /><span>{{listing.address}}</span>
        </div>
        <div class="clear bookban">
          <img :src="listing.cover_pic" />
        </div>
        <div class="clear booktext">
          <div class="bookte1 left">
            <p>{{listing.topic}}</p>
            <P>{{listing.topic}}</P>
          </div>
          <!-- 跳转详情 -->
          <router-link :to="{name:'details',query:{activity_id:listing.activity_id}}"  class="right bookxq">
             <span>{{listing.button_name}}</span>
          </router-link>
        </div>
      </li>
    </ul>

    <div
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="loading" 
    infinite-scroll-distance="10">

    </div>

    <!-- 底部 -->
    <ul class="nav">
      <router-link :to="{name:'meet'}" tag="li">
        <img src="../../../assets/ju.png" alt />
        <span class="a1">我的参与</span>
      </router-link>
      <router-link :to="{name:'issue'}" tag="li">
        <img src="../../../assets/img102.png" alt />
        <span>发布</span>
      </router-link>
      <router-link :to="{name:'newmypublish'}" tag="li">
        <img src="../../../assets/ju0.png" alt />
        <span>我的发布</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
    return{
      list:[], //活动列表
      page:1,
      limit:10,
      loadig:false,//默认开启无限滚动   true的话就代表关闭无限滚动
      hasMore:true,//有更多数据
      number:""
    }
  },
  methods:{
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
            this.$post('/rongtuojinrong/activity/juyiju/ActivityList.json',{
              page,
              limit,
              status:2
            }).then(res=>{
                this.list = this.list.concat(res.data.data.list);
                console.log(this.list);
                this.loading = false;//继续开启无限滚动
                toast.close();//关闭toast
                if(page*limit >= res.data.data.count){ //判断是否有更多数据
                    this.hasMore = false; //没有更多数据了
                    return false;
                }
                this.page++;
            })
        },


    //  getListing(){
    //      /* let postData = qs.stringify({  //向后台传入user_id
    //         page:1,
    //         limit:10,
    //         status:2
    //     }); */
    //     this.$post('/rongtuojinrong/activity/juyiju/ActivityList.json',{
    //         page:1,
    //         limit:10,
    //         status:2
    //     }).then(res=>{
    //       this.listings = res.data.data.list;
    //      console.log( this.listings )
    //     })
    //   }
    },
     created(){  
       if(this.$store.state.login.token.user_id){
          this.$post("/rongtuojinrong/activity/juyiju/my/FirstOpen.json",{
          }).then(res=>{
            this.number=res.data;
            console.log(res.data);
          })
       }  
    }
};
</script>

<style lang="scss" >
  .counterBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #fff;
  button,
  img {
    padding: 0;
  }
  .left {
    float: left;
  }
  .clear {
    clear: both;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  a {
    text-decoration: none;
  }
    .bookingbox {
      margin: 0.7rem 0.2rem;
      overflow: hidden;
      height: auto;

      li {
        margin-bottom: 0.3rem;
        .bookinglog {
          width: 0.37rem;
          height: 0.37rem;
          margin-bottom: 0.15rem;
          img {
            width: 100%;
            height:100%;
          }
        }
        .bookingadd {
          font-size: 12px;
          padding: 0.01rem 0 0 0.1rem;
          p:nth-child(1) {
            color: #0a5fd6;
          }
          p:nth-child(2) {
            color: #999;
          }
        }
        .bookings {
          color: #999;
          padding-top: 0.05rem;
          img {
            width: 0.13rem;
            height: 0.16rem;
            float: left;
            margin: 0.02rem 0.06rem;
          }  
        }

        .bookban {
          width: 100%;
          height: 2.08rem;
          border-radius: 0.1rem;
          overflow: hidden;
          margin-top: 0.2rem;
          img {
            width: 100%;  height:100%;
          }
        }

        .booktext {
          .bookxq {
            width: 0.61rem;
            height: 0.61rem;
           /*  background: linear-gradient(to top, #ff2b7b 0%, #fb653f 100%); */
            background: url(../../../assets/but.png)no-repeat;
            background-size: 100%;
            color: #fff;
            text-align: center;
            border-radius: 0.25rem;
            line-height: 0.15rem;
            padding-top: 0.1rem;
            margin-top: 0.1rem;
            span{display: inline-block; width: 50%;padding-top: 0.04rem;}
          }
          .bookte1 {
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p:nth-child(1) {
              color: #fe6633;
              line-height: 0.35rem;
              font-size: 0.15rem;
            }
            p:nth-child(2) {
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
    }
    .nav {
      width: 100%;
      height: 0.52rem;
      display: flex;
      justify-content:space-evenly;
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
        flex-direction: column;
        margin-top: 0.01rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
        }
        span {
          font-size: 0.11rem;
          color: #505050;
          margin-top: 0.08rem;
        }
      }
      li:nth-child(2) {
        width: 0.5rem;
        border-radius: 0.5rem;
        border-top: 1px solid #ebeefc;
        background: #fff;
        position: relative;
        img {
          width: 0.38rem;
          height: 0.38rem;
          position: absolute;
          top: 4px;
        }
        span {
          margin-top: 0.26rem;
        }
      }
    }
  }
</style>
 