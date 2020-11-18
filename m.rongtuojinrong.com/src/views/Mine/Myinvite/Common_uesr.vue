<template>
  <div class="Commonuserbox">
    <!-- 普通身份用户的页面 -->
    <!-- 头部 -->
    <!-- <mt-header title="我的邀请">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="我的邀请"></headerBox>

    <div  class="commonstyle">
      <div class="commom_top">
        <div class="commtoptext">
          <router-link tag="div" to="/interlist">
            累计奖励（元）
            <img src="@/assets/muser.png" class="jtimg" />
          </router-link>
          <span>{{(this.amount+this.amount2).toFixed(2)}}</span>
        </div>


        <div class="liesi">
          <router-link tag="a" :to="{name:'interlist',query:{AwardCashAmt:common.AwardCashAmt}}"  >  <!-- rewardType:common.rewardType -->
            <p>
              现金奖励（元）
              <img src="@/assets/muser.png" class="jtimg" />
            </p>
            <p>{{common.AwardCashAmt}}</p>
          </router-link>
          <router-link tag="a" :to="{name:'interlist',query:{AwardRedPacketAmt:common.AwardRedPacketAmt}}">
            <p>
              红包奖励（元）
              <img src="@/assets/muser.png" class="jtimg" />
            </p>
            <p>{{common.AwardRedPacketAmt}}</p>
          </router-link>
          <router-link tag="a" to="/friderList">  
            <p>
              邀请好友（人）
              <img src="@/assets/muser.png" class="jtimg" />
            </p>
            <p>{{common.InviteSum}}</p>
          </router-link>
        </div>
      </div>
      <div class="jltext">每成功邀请1位好友首次出借成功后，邀请人可获得20元红包奖励；还可享受好友自首次出借开始日起30天内，好友每笔出借金额年化2‰的现金奖励；</div>

      <div class="indexlist">
        
        <ul class="conmist"  v-for="itme in commonsum" :key="itme.id">
           <div class="liea"><span> <i></i> </span>奖励明细</div>
          <li>
            <div class="kong">
              <div class="left">
                <p class="red" v-if="itme.AwardType==2">+{{itme.AwardMoney}}元红包</p>
                <p class="red" v-else>+{{itme.AwardMoney}}元</p>
                <p v-if="itme.AwardTrench==1">好友首次出借成功</p>
                <p v-else>好友出借{{itme.InviteeBidMoney}}元，{{itme.ProjDuration}}个月</p>
             
              </div>
              <div class="right">{{itme.AwardTime |formatDate}}</div>
            </div>
            <i class="yuanxs"></i>
          </li> 
         <!--    <li>
            <div class="kong">
              <div class="left">
                <p class="red">+20.00元红包</p>
                <p>好友首次出借成功</p>
              </div>
              <div class="right">2018-02-12</div>
            </div>
            <i class="yuanxs"></i>
          </li>
          <li>
            <div class="kong">
              <div class="left">
                <p class="red">+20.00元红包</p>
                <p>好友首次出借成功</p>
              </div>
              <div class="right">2018-02-12</div>
            </div>
            <i class="yuanxs"></i>
          </li> -->    
        </ul>
      </div>
    </div>
 
  </div>
</template>

<script>
import { formatDate } from "../../../modules/datab.js";
export default {
  data(){
    return {
      common:"",
     amount:0,
     amount2:0,
     commonsum:[],
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "y-MM-dd");
    },
  },
  created(){
    //首页头部各项数目
    this.$post('/rongtuojinrong/userCenter/invite/ordinaryUser/home.json',{
      defidenshuxing: this.$store.state.invite.defidenshuxing,
    }).then(res=>{
      this.common = res.data.data;
      this.amount = Number(this.common.AwardRedPacketAmt);
      this.amount2 = Number(this.common.AwardCashAmt);
      console.log(res.data.data)
    });
 //奖励明细列表
  this.$post('/rongtuojinrong/userCenter/invite/ordinaryUser/rewardList.json',{
    defidenshuxing: this.$store.state.invite.defidenshuxing,
    rewardType:0,
  }).then(res=>{
     this.commonsum =res.data.data.Detail;
     console.log(res.data.data.Detail)
  })
  }
};
</script>

<style lang="scss">
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
button,
img {
  padding: 0;
}
.c3 {
  color: #333;
}
.red {
  color: #ec706b;
}
.Commonuserbox {
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 14px;
 position: absolute;
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

  .commonstyle {
    width: 100%;
    height: auto;
    margin: 0.5rem auto;
    overflow: hidden;

    .commom_top {
      height: 2.15rem;
      width: 100%;
      color: #fff;
      /*  background: linear-gradient(to top, #6cb7ec 0%, #a578c9 100%);  */
      background: -webkit-gradient(
        linear,
        0% 0%,
        100% 100%,
        from(#23cffc),
        to(#c369c7),
        color-stop(0, #23cffc),
        color-stop(0.9, #c369c7)
      ); /* Safari 5.1 - 6.0 */
      .commtoptext {
        height: 1.5rem;
        text-align: center;
        span {
          font-size: 0.3rem;
          letter-spacing: 0.02rem;
        }
        div {
          line-height: 0.65rem;
        }
      }
      .jtimg {
        width: 0.1rem;
        height: 0.11rem;
        display: inline-block;
        vertical-align: middle;
      }
      .liesi {
        border-top: 1px solid rgba(222, 222, 222, 0.2);
        padding: 0.08rem 0 0.05rem 0;
        width: 96%;
        margin: auto;
        a {
          width: 32%;
          border-right: 1px solid rgba(222, 222, 222, 0.2);
          color: #fff;
          text-align: center;
          float: left;
          p {
            line-height: 0.25rem;
          }
          p:last-child {
            font-size: 0.14rem;
          }
        }
        a:last-child {
          border-right: 0;
        }
      }
    }
    .jltext {
      margin: 0.15rem 0.1rem 0.1rem 0.1rem;
      text-align: center;
     // border-bottom: 1px solid #e5e9e5;
      padding-bottom:0.1rem;
    }
    .indexlist {
      margin-top: 0.05rem;
      padding: 0.15rem;
      .liea {
        color: #000;
        height: 0.15rem;
        span {
          display: block;
          width: 0.15rem;
          height: 0.15rem;
          background: #fff;
          border: 1px solid #bcbcbc;
          border-radius: 0.5rem;
          margin-right: 0.1rem;
          float: left;
          i {
            display: block;
            width: 0.06rem;
            height: 0.06rem;
            background: #bcbcbc;
            margin: 0.04rem auto;
            border-radius: 0.5rem;
          }
        }
      }

      .conmist {
        position: relative;
        li {
          border-left: 1px solid #bcbcbc;
          margin-left: 0.06rem;
          height: auto;
          overflow: hidden;
          padding: 0.1rem;
          // position: relative;
          .kong {
            /* position: relative; */
            padding-left: 0.1rem;
            p {
              line-height: 0.25rem;
            }
          }
          .yuanxs {
            display: block;
            width: 0.08rem;
            height: 0.07rem;
            background: #fff;
            border: 1px solid #bcbcbc;
            border-radius: 0.5rem;
            position: absolute;
            /* left:50%; 
                 top:50%;
                 margin-left:-1.75rem;
                 z-index: 2; */
            margin-left: -0.15rem;
            margin-top: 0.2rem;
          }
        }
        li .kong div:last-child {
          line-height: 0.49rem;
        }
        li:first-child {
          padding-top: 0.25rem;
        }
      }
    }
  }
   
}
</style>
