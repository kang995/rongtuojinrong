 <!--暂不需要 先不删除-->
<!-- 聚一聚 我的发布列表页（进行中活动）     --> 
<template>
  <div class="mangBox">
    <!-- 头部 -->
    <!-- <mt-header title="我的发布">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="head_nav">
      <router-link :to="{name:'mypublish'}" tag="li" class="router-link-active">我的发布</router-link>
      <router-link :to="{name:'manage'}" tag="li">管理报名</router-link>
    </ul>-->

    <div class="gl_pulishBox">
      <div class="putop">
        <span>
          共
          <span>1</span>个活动
        </span>
        <router-link :to="{name:'mypublish'}" class="acss">查看全部活动</router-link>
      </div>
      <ul class="putlist">
        <router-link :to="{}" tag="li">
          <div class="pbor">
            <div>
              <p>融米俱乐部</p>
              <P class="c9">
                发布时间：
                <span>昨天</span>
              </P>
            </div>
            <div class="clear stpa">
              <div class="state left">
                <span>免费</span>
                <span>报名中</span>
              </div>
            </div>
          </div>
          <ul class="mantul">
            <li>
              <img src="../../../assets/h_01.jpg" alt />
              <span>查看</span>
            </li>
            <li>
              <img src="../../../assets/h_02.jpg" alt />
              <span>修改</span>
            </li>
            <li>
              <img src="../../../assets/h_03.jpg" alt />
              <span class="c9">分享</span>
            </li>
          </ul>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
  .mangBox {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
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
  .c9 {
    color: #999;
    padding-top: 0.02rem;
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
        /* font-size: 14px; */
      }
    }

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
              span:nth-child(1) {
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
    }
  }
</style>
 