<!-- 聚一聚 我的参与-报名凭证--> 
<template>
  <div class="todayBox">
    <!-- 头部 -->
    <!-- <mt-header title="我的参与">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="我的参与"></headerBox>

    <ul class="head_nav">
      <router-link :to="{name:'meet'}" tag="li"   replace="">报名凭证</router-link>
      <router-link :to="{name:'track'}" tag="li" replace="">我的足迹</router-link>
    </ul>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
 
};
</script>

<style lang="scss">
  .todayBox {
    width: 100%;
    height: 100%;
    font-size: 14px;  
    background: #fff;
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
    .head_nav {
      //margin: 0.5rem auto 0.2rem;
      height: 0.46rem;
      overflow: hidden;
      position:fixed;
      background: #fff;
      top:0.5rem;
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
      }
       .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      } 
   .actcass{ color: #0159d5;
        border-bottom: 1px solid #0159d5 !important;}

    }
    .piao {
       padding: 0.1rem 0.28rem 0 0.28rem;
      .refer {
        width: 3.19rem;
        height: 1.5rem;
        overflow: hidden;
        background: url(../../../assets/ju1_s.png) no-repeat center;
        background-size: cover;
        .rezz {
          float: left;
          width: 40%;
          height: 1.3rem;
          text-align: center;
          color: #fff;
          span {
            font-size: 0.18rem;
            /*  font-weight:bold; */
            line-height: 1.3rem;
          }
        }
        .retext {
          float: right;
          width: 60%;
          height: 1.3rem;
          text-align: left;
          color: #fff;
          div {
            width: 92%;
            margin: 0.15rem auto;
            overflow: hidden;
            font-size: 12px;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 0.2rem;
              strong {
                font-weight: bold;
                font-size: 14px;
              }
            }
            p:nth-child(1) {
              padding-top: 0.07rem;
            }
            p:nth-child(3) {
              padding-top: 0.05rem;
            }
          }
        }
      }
    }

    .piao2 {
      margin: 0.05rem 0.28rem 0 0.28rem;
      .refer {
        width: 3.19rem;
        height: 1.5rem;
        overflow: hidden;
        background: url(../../../assets/ju2_s.png) no-repeat center;
        background-size: cover;
        .rezz {
          float: left;
          width: 40%;
          height: 1.3rem;
          text-align: center;
          color: #fff;
          span {
            font-size: 0.18rem;
            /*  font-weight:bold; */
            line-height: 1.3rem;
          }
        }
        .retext {
          float: right;
          width: 60%;
          height: 1.3rem;
          text-align: left;
          color: #fff;
          position: relative;
          .rewidth {
            width: 92%;
            margin: 0.15rem auto;
            overflow: hidden;
            font-size: 12px;
            p {
              overflow: hidden; /*内容超出后隐藏*/
              text-overflow: ellipsis; /* 超出内容显示为省略号*/
              white-space: nowrap;
              line-height: 0.2rem;
              strong {
                font-weight: bold;
                font-size: 14px;
              }
            }
            p:nth-child(1) {
              padding-top: 0.07rem;
            }
            p:nth-child(3) {
              padding-top: 0.05rem;
            }
            .y_img {
              position: absolute;
              width: 0.53rem;
              height: 0.5rem;
              background: url(../../../assets/y.png) no-repeat center;
              right: 0.12rem;
              bottom: 0.02rem;
              background-size: 100%;
            }

            .y_img2 {
              position: absolute;
              width: 0.53rem;
              height: 0.5rem;
              background: url(../../../assets/y2.png) no-repeat center;
              right: 0.12rem;
              bottom: 0.02rem;
              background-size: 100%;
            }
            .y_img3 {
              position: absolute;
              width: 0.53rem;
              height: 0.5rem;
              background: url(../../../assets/y.png) no-repeat center;
              right: 0.12rem;
              bottom: 0.02rem;
              background-size: 100%;
            }
          }
        }
      }

      .refers {
        width: 3.19rem;
        height: 1.5rem;
        overflow: hidden;
        background: url(../../../assets/ju3_s.png) no-repeat center;
        background-size: cover;
        .rezz {
          float: left;
          width: 40%;
          height: 1.3rem;
          text-align: center;
          color: #fff;
          span {
            font-size: 0.18rem;
            /*  font-weight:bold; */
            line-height: 1.3rem;
          }
        }
        .retext {
          float: right;
          width: 60%;
          height: 1.3rem;
          text-align: left;
          color: #fff;
          position: relative;
          .rewidth {
            width: 92%;
            margin: 0.15rem auto;
            overflow: hidden;
            font-size: 12px;
            p {
              overflow: hidden; /*内容超出后隐藏*/
              text-overflow: ellipsis; /* 超出内容显示为省略号*/
              white-space: nowrap;
              line-height: 0.2rem;
              strong {
                font-weight: bold;
                font-size: 14px;
              }
            }
            p:nth-child(1) {
              padding-top: 0.07rem;
            }
            p:nth-child(3) {
              padding-top: 0.05rem;
            }
            .y_img4 {
              position: absolute;
              width: 0.53rem;
              height: 0.5rem;
              background: url(../../../assets/y1.png) no-repeat center;
              right: 0.12rem;
              bottom: 0.02rem;
              background-size: 100%;
            }
          }
        }
      }
    }
    .NOdata{width: 100%;height:auto;overflow: hidden;
        margin:auto;
        img{width: 0.85rem;height:0.85rem;margin:0.05rem auto;}
        p{text-align: center;color:#333;line-height: 0.5rem;}
      }
  }
</style>
 