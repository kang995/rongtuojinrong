<!-- 信息披露 -->
<template>
  <div class="messageBox">
    <!-- 头部 -->
    <headerBox :title="this.$route.query.title"></headerBox>
    <!-- banner图 -->
    <div class="bannerBox">
      <div class="banner">
        <img :src="messages.banner" alt />
      </div>
      <div class="message">
        <div class="message1" v-if="isShow">
          <img class="img1" src="../../../../assets/img39.png" alt />
          <p>{{messages.con}}</p>
          <img  @click="isShow=!isShow" class="img2" src="../../../../assets/message_02.png" alt />
        </div>
        <div class="message2" v-else>
          <img class="img1" src="../../../../assets/img39.png" alt />
          <p>{{messages.con}}</p>
          <img  @click="isShow=!isShow" class="img2" src="../../../../assets/message_03.png" alt />
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="introduceBox">
      <ul class="introduce">
        <router-link :to="{name:'company',query:{sign:message.sign,name:message.name}}" tag="li" v-for="message in messages.content" :key="message.sign" >
            <img v-lazy="message.icon" alt />
            <span>{{message.name}}</span>
        </router-link>

        <!-- <li>
          <img src="../../../../assets/img41.png" alt />
          <span>公司简介</span>
        </li>
        <li>
          <img src="../../../../assets/img42.png" alt />
          <span>高管团队</span>
        </li>
        <li>
          <img src="../../../../assets/img43.png" alt />
          <span>机构信息</span>
        </li>
        <li>
          <img src="../../../../assets/img45.png" alt />
          <span>业务介绍</span>
        </li>
        <li>
          <img src="../../../../assets/img47.png" alt />
          <span>经营信息</span>
        </li>
        <li>
          <img src="../../../../assets/img46.png" alt />
          <span>备案管理</span>
        </li>
        <li>
          <img src="../../../../assets/img50.png" alt />
          <span>风险教育</span>
        </li>
        <li>
          <img src="../../../../assets/img48.png" alt />
          <span>发展历程</span>
        </li>
        <li>
          <img src="../../../../assets/img49.png" alt />
          <span>风险控制</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui';//加载中
export default {
  data() {
    return {
      isShow: true,
      messages:'',
      // datas:[],
      // navs:[
      //       {id:1,router:"company"},
      //       {id:2,router:"team"},
      //       {id:3,router:"organization"},
      //       {id:4,router:"profession"},
      //       {id:5,router:"manages"},
      //       {id:6,router:"records"},
      //       {id:7,router:"education"},
      //       {id:8,router:"develop"},
      //       {id:9,router:"risk"},
      //     ]
    };
  },
  methods:{
    getmessage(){
       this.Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        this.$post('/rongtuojinrong/information/home.json').then(res=>{
          this.messages = res.data.data;
          this.Indicator.close();
          // console.log(this.messages)
      })
    }
  },
  created(){
    this.getmessage();
    document.documentElement.style.fontSize = '100px';
  },
};

</script>

<style lang='scss'>
body {
  background: #f9f9f9;
  .messageBox {
    background: #f9f9f9;
    height: 100% !important;
    .mint-header {
      background: #fff;
      height: 0.5rem;
      .mint-button-icon {
        color: #404040;
      }
      .mint-header-title {
        font-size: 0.15rem;
        color: #404040;
      }
    }
    .bannerBox {
      width: 100%;
      padding: 0.1rem 0.11rem 0 0.11rem;
      margin-top: 0.5rem;
      .banner {
        height: 1.55rem;
        width: 100%;
        border-radius: 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .message {
        width: 100%;
        .message1 {
          // height: 0.58rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          padding-top:0.08rem;
          line-height:0.18rem;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding: 0 0.14rem 0 0.2rem;
            font-size:0.12rem;
            color:#000;
          }
          .img1 {
            position: absolute;
            top: 10px;
            left: 0;
          }
          .img2 {
            width:0.1rem;
            position: absolute;
            bottom: 0;
            right: 10px;
          }
        }
        .message2 {
          // height: 2.48rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          padding-top:0.08rem;
          line-height:0.18rem;
          p {
            padding: 0 0.14rem 0 0.2rem;
            font-size:0.12rem;
            color:#000;
          }
          .img1 {
            position: absolute;
            top: 10px;
            left: 0;
          }
          .img2 {
            width:0.1rem;
            position: absolute;
            bottom: 0;
            right: 10px;
          }
        }
      }
    }
    .introduceBox {
      width: 100%;
      height: 3.55rem;
      padding: 0.11rem;
      background: #f9f9f9;
      .introduce {
        width: 100%;
        height: 3.55rem;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        border-radius: 0.1rem;
        li {
          width: 32%;
          height: 1.05rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          img {
            width: 0.48rem;
            height: 0.48rem;
          }
          span {
            color: #2d2d2d;
            font-size: 0.12rem;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
