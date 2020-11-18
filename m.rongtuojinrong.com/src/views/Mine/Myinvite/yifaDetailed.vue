<template>
  <div class="Mydetailed1">
    <div class="minetextlist" v-if="sign==0"><!--  v-if="sign!=0" -->
      <div class="listhun" v-for="(yingfalist,index) in yflist" :key="index"  >
        <button>{{index.split('年')[0]}}</button>
        <ul>
          <router-link
            tag="li"
            :to="{name:'wealthdetails',query:{nianyue:item.nian+'-'+item.yue,nianyues:item.nianyue}}"
            v-for="item in yingfalist"
            :key="item.id"
          >
            <div class="left">
              <p>{{item.yue}}月</p>
              <p>奖励总额</p>
              <p>{{item.zongshu}}元</p>
            </div>
            <div class="right">
              <p>
                <span class="left">融托金融奖励</span>
                <span class="right">{{item.rongtuo}}元</span>
              </p>
              <p>
                <span class="left">融托民登奖励</span>
                <span class="right">{{item.mindeng}}元</span>
              </p>
              <p>
                <span class="left">融托优选奖励</span>
                <span class="right">{{item.shangcheng}}元</span>
              </p>
              <p>
                <span class="left">顾问奖励</span>
                <span class="right">{{item.guwen}}元</span>
              </p>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
   <div v-else class="nullinfo">
        <div class="shownull">
          <img src="@/assets/sm_19.jpg">
       </div>
    </div> 
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      yflist: [],
      sign:'',
    };
  },
  methods: {
},
  created() {
    this.$post("/rongtuojinrong/userCenter/invite/inviteDetail.json", {
      page: 1,
      CmdId: "hadyongjin",
      defidenshuxing: this.$store.state.invite.defidenshuxing
    })
      .then(res => {
        this.sign = res.data.status;
        this.yflist = res.data.data;
        var json = {};
        var cnum = 0;
        for (let key in this.yflist) {
          if (cnum != this.yflist[key].nian) {
            cnum = this.yflist[key].nian;
            json[cnum + "年"] || (json[cnum + "年"] = []);
          }
          json[cnum + "年"].push(this.yflist[key]);
        }
        this.yflist = json;
        console.log(this.yflist);
      })
      .catch(err => {}); 
  }
};
</script>

<style lang="scss" >
  .Mydetailed1 {
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
  .mtop {
    margin-top: 0.1rem;
  }
  .c3 {
    color: #333;
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
      }
      .actcass {
        color: #0159d5;
        border-bottom: 1px solid #0159d5 !important;
      }
    }
    .minetextlist {
      margin: 1.1rem 0.15rem;
      .listhun {
        width: 100%;
        height: auto;
        /* overflow: hidden; */
        margin-top: 0.18rem;
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
        ul {
          width: 100%;
          height: auto;
          li {
            height: 1.5rem;
            box-shadow: 0 0 10px #e5e9e5;
            border-radius: 0.05rem;
            margin-top: 0.15rem;
            background: #fff;
            div:nth-child(1) {
              width: 30%;
              height: 1.27rem;
              text-align: center;
              margin-top: 0.02rem;
              p:nth-child(1) {
                color: #0c85e2;
                font-size: 0.16rem;
                padding: 0.12rem 0.1rem;
              }
              p:nth-child(2){padding-top:0.12rem;line-height: 0.3rem;}
            }
            div:nth-child(2) {
              width: 65%;
              height: 1.27rem;
              padding-left: 0.1rem;
              border-left: 1px solid #999;
              margin-top: 0.02rem;
              p {
                line-height: 0.32rem;
                clear: both;
              }
            }
          }
          li:last-child {
            margin-bottom: 0.25rem;
          }
        }
      }
    }
     .nullinfo{
                background-color: #fff;
                display: flex;
                justify-content: center;
                margin-top: 2rem;
                .shownull{
                    width: 1.5rem;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            } 
  }
</style>
