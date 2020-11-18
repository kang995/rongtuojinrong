<!--我的邀请~明细--->

<template>
  <div class="Mydetailed">
    <!-- 头部 -->
   <!--  <mt-header title="财富明细">
      <router-link to="/myinviteindex" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
   <headerBox title="财富明细"></headerBox>
    <ul class="head_nav">
      <router-link :to="{name:'yingfaDetailed'}" tag="li"  replace="">应发奖励</router-link>
      <router-link :to="{name:'yifaDetailed'}" tag="li"  replace="">已发奖励</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
  .Mydetailed {
    width: 100%;
    height: auto; 
   background:#fff;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .mtop {
    margin-top: 0.1rem;
  }
  .c3{color:#333;}

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

    .head_nav {
     // margin-top: 0.5rem;
      height: 0.46rem;
      overflow: hidden;
      position: fixed;
    background: #fff;
    top: 0.5rem;
    left: 0;
    width: 100%;
    z-index: 10;
      li {
        width: 50%;
        float: left;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-bottom: 1px solid #e5e9f2;
      }
       .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      }
      .actcass {
        color: #0159d5;
        border-bottom: 1px solid #0159d5 !important;
      }
    }
    .minetextlist {
      margin: 0.18rem 0.1rem;
      .listhun {
        width: 100%;
        height: auto;
        /* overflow: hidden; */
        button {
          color: #0159d5;
          border-radius: 0.5rem;
          padding: 0.02rem 0.15rem;
          text-align: center;
          background: #fff;
          border: none;
          display: block;
          margin: auto;
          border: 1px solid #0159d5;
        }
        ul{width: 100%;height:auto;
        li {
          padding: 0.1rem;
          background-color: #fff;
          height: auto;
          box-shadow: 0 0 10px #e5e9e5;
          overflow: hidden;
          border-radius: 0.05rem;
          margin-top: 0.2rem;

          p {
            line-height: 0.25rem;
            clear: both;
          }

          div:nth-child(1) {
            width: 30%;
            height: auto;
            overflow: hidden;
            text-align: center;
            p:nth-child(1) {
              color: #0159d5;
              font-size: 0.16rem;
              padding: 0.1rem;
            }
          }
          div:nth-child(2) {
            width: 65%;
            height: auto;
            overflow: hidden;
            padding-left: 0.1rem;
            border-left: 1px solid #999;
          }
        }
        } 
      }
    }
  }
</style>
