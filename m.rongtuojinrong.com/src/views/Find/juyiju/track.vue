<!-- 聚一聚-我的参与-我的足迹--> 
<template>
  <div class="todayBoxss">
    <!-- 头部 -->
    <!-- <mt-header title="我的参与">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
   <!-- <headerBox title="我的参与"></headerBox>

    <ul class="head_nav">
      <router-link :to="{name:'meet'}" tag="li">报名凭证</router-link>
      <router-link :to="{name:'track'}" tag="li">我的足迹</router-link>
    </ul> -->
    <div class="trackBox">
      <ul>
        <li  v-for="footmarks in footmark" :key="footmarks.id">
          <p>
            <span>{{footmarks.addtime}}</span>
            <span>{{footmarks.action}}</span>
          </p>
          <div class="xian">{{footmarks.topic}}</div>
        </li>
        <!-- <li>
          <P>
            <span>50分钟之前</span>
            <span>报名了活动</span>
          </P>
          <div class="xian">融米一家亲</div>
        </li>
        <li>
          <P>
            <span>50分钟之前</span>
            <span>报名了活动</span>
          </P>
          <div class="xian">融米一家亲</div>
        </li> -->
      </ul>


    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      footmark:[]
    }
  },
  methods:{
    footmak(){
      this.$post('/rongtuojinrong/activity/juyiju/my/Footmark.json',{
         user_id:31753
        //ser_id:this.$route.query.user_id
      }).then(res=>{
        this.footmark=res.data.data;
        console.log(res.data.data);
      })
    }
  },
  created(){
        this.footmak();
    }
};
</script>

<style lang="scss">
  .todayBoxss {
    width: 100%;
    height: auto;
    font-size: 14px;
    overflow: hidden;
    background: #fff;
    position: absolute;
    //padding-top:0.9rem;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
    .img_button {
      width: 0.16rem;
      height: 0.165rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .trackBox {
      margin: 0.9rem 0.28rem 0 0.28rem;
      font-size: 12px;
      height: auto;
      overflow: hidden;
      ul li {
        span:nth-child(1) {
          width: 0.78rem;
          height: 0.19rem;
          background: #ddf1fc;
          color: #003d90;
          font-size: 0.12rem;
          border-radius: 0.2rem;
          text-align: center;
          display: inline-block;
        }
        span:nth-child(2) {
          color: #999;
          padding-left: 0.1rem;
        }
        .xian {
          border-left: 1px solid #ddf1fc;
          height: auto;
          padding-left: 0.1rem;
          margin: 0.1rem;
          line-height: 0.32rem;
          color: #333;
        }
      }
      li:nth-child(1) {
        margin-top: 0.2rem;
        /*  */
      }
      li:last-child{
      .xian{display: none;}
      }
    }
  }

</style>
 