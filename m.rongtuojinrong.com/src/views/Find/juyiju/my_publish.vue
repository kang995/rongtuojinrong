<!-- 聚一聚 我的发布列表页(全部活动)--> 
<template>
  <div class="MymangsBoxheader">
    <!-- 头部 -->
    <!-- <mt-header title="我的发布">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="我的发布"></headerBox>
    <ul class="head_nav">
      <router-link :to="{name:'mypublish'}" tag="li" replace>我的发布</router-link>
      <router-link :to="{name:'manage'}" tag="li" replace>管理报名</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
  .MymangsBoxheader {
    width: 100%;
    height: 100%;
    font-size: 14px;
     //background-color:#fff;
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
    .head_nav {
      margin-top: 0.5rem;
      height: 0.46rem;
      position:fixed;
      background: #fff;
      //top:0.5rem;
      left:0;
      width: 100%;
      z-index: 10;
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
    //进行 全部样式放置处

  }
</style>
 