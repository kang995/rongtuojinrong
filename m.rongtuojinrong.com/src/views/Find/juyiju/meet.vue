<!-- 聚一聚 我的参与-报名凭证--> 
<template>
  <div class="todayBoxs1">
    <!-- 头部 -->
    <!-- <mt-header title="我的参与">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <!-- <headerBox title="我的参与"></headerBox>

    <ul class="head_nav">
      <router-link :to="{name:'meet'}" tag="li"  class="actcass">报名凭证</router-link>
      <router-link :to="{name:'track'}" tag="li">我的足迹</router-link>
    </ul> -->
      <div class="NOdata" v-if="this.sign.length==0"><img src="../../../assets/sm_16.png"><P>暂无数据</P></div>   
          <div v-else>
              <div v-for="item1 in list" :key="item1.id" class="mcss">
            <div class="piao" v-if="item1.auth_status==1">
            <div class="refer">
              <div class="rezz">
                <span>已提交</span>
              </div>
              <div class="retext">
                <div>
                  <p>{{item1.topic}}</p>
                  <p>
                    <strong>融托金融</strong>
                  </p>
                  <p>{{item1.activity_start_time}}至{{item1.activity_end_time}}</p>
                  <p>{{item1.address}}</p>
                </div>
              </div>
            </div>
          </div>

          <router-link class="piao2" v-if="item1.auth_status==-1" :to="{name:'pingzDetail',query:{id:item1.id}}" tag="div">
            <div class="refers">
            <div class="rezz">
              <span>未通过</span>
            </div>
            <div class="retext">
              <div class="rewidth">
                <div>
                  <p>{{item1.topic}}</p>
                  <p>
                    <strong>融托金融</strong>
                  </p>
                  <p>{{item1.activity_start_time}}至{{item1.activity_end_time}}</p>
                  <p>{{item1.address}}</p>
                </div>
              </div>
            </div>
          </div>
          </router-link>

        <router-link class="piao2" v-if="item1.auth_status==2&&item1.is_expire==2" :to="{name:'pingzDetail',query:{id:item1.id}}" tag="div">
          <div class="refer">
            <div class="rezz">
              <span>审核通过</span>
            </div>
            <div class="retext">
              <div class="rewidth">
                <div>
                  <p>{{item1.topic}}</p>
                  <p>
                    <strong>融托金融</strong>
                  </p>
                  <p>{{item1.activity_start_time}}至{{item1.activity_end_time}}</p>
                  <p>{{item1.address}}</p>
                </div>
                <div v-if="item1.is_check_ticket==0" class="y_img3"></div>
                <div v-else class="y_img2"></div>
              </div>
            </div>
          </div>
        </router-link>
        <router-link class="piao2" v-if="item1.auth_status==2&&item1.is_expire==1" :to="{name:'pingzDetail',query:{id:item1.id}}" tag="div">
          <div class="refers">
            <div class="rezz">
              <span>审核通过</span>
            </div>
            <div class="retext">
              <div class="rewidth">
                <div>
                  <p>{{item1.topic}}</p>
                  <p>
                    <strong>融托金融</strong>
                  </p>
                  <p>{{item1.activity_start_time}}至{{item1.activity_end_time}}</p>
                  <p>{{item1.address}}</p>
                </div>
                <div class="y_img4"></div>
              </div>
            </div>
          </div>
        </router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[],
      sign:''
    }
  },
  created(){
      this.$post("/rongtuojinrong/activity/juyiju/my/OrderList.json",{
     // user_id: 31753,
      }).then(res => {
        this.list = res.data.data;
        this.sign = res.data.data;
        console.log(res.data.data);
      })
      .catch(err => {
        console.log("加载失败");
      });
  }
};
</script>

<style lang="scss">
  .todayBoxs1 {
    width: 100%;
    min-height: 100%;
    font-size: 14px;
    overflow: hidden;
   background: #fff;
   padding-top:1.1rem;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
    .piao {
      margin: 0.05rem 0.28rem 0 0.28rem;
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
 