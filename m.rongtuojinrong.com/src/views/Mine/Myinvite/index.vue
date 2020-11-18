<!-- 我的邀请--> 
<template>
  <div class="myinviteBox">
    <!-- 头部 -->
    <!-- <mt-header title="我的邀请">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> --> 
    <headerBox title="我的邀请" ></headerBox> 

    <div class="myincont">
      <div class="myincot_top">
        <div class="bg_blue"></div>
        <div class="zongjie">
          <ul>
            <router-link class="right" tag="li"  to="/Mydetailed">
              明细
              <img src="@/assets/img63.png" />
            </router-link>
            
            <li class="clear">
              <p>{{myinvite.jinriyjjiner}}</p>
              <P>今日佣金结算（元）</P>
            </li>
            <li>
              <div class="left">
                <p>{{myinvite.benyyjjiner}}</p>
                <P>本月累计佣金</P>
              </div>
              <div class="right">
                <p>{{myinvite.leijiyjjiner}}</p>
                <P>累计已收佣金</P>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="myimgtext">
        <div class="tjzc">
          <P>推荐资产</P>
          <p>{{myinvite.myzichanjiner}}万元</p>
        </div>
        <router-link  :to="{name:'Recommendcustomers',params:{khs:myinvite.myreuserjiner}}"  class="tjkh" tag="div" >
          <P>推荐客户</P>
          <p>{{myinvite.myreuserjiner}}名&nbsp;&gt;</p>
        </router-link>

      </div>

      <div class="myintlist">
        <ul>
          <!-- <li>
            <span class="mineContent-3-s">我的团队</span>
            <div class="mineContent-3-c">
              <img src="@/assets/img63.png" />
            </div>
          </li> -->
          <router-link to="/jlgl" tag="li">
            <span class="mineContent-3-s">奖励攻略</span>
            <div class="mineContent-3-c">
              <img src="@/assets/img63.png" />
            </div>
          </router-link>
         <!--  <router-link  to="/opwe" tag="li">
            <span class="mineContent-3-s">设置推荐权限</span>
            <div class="mineContent-3-c">
              <img src="@/assets/img63.png" />
            </div>
          </router-link> -->
          <router-link to="/twocode" tag="li">
            <span class="mineContent-3-s">我的二维码</span>
            <div class="mineContent-3-c">
              <img src="@/assets/img63.png" />
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      myinvite: {}
    }
  },
  methods:{

  },
  created(){
    //this.$store.getters.getInvite;
    let invite = this.$store.state.invite;
    // console.log(1,invite)
    this.$post('/rongtuojinrong/userCenter/invite/home.json',{
      defidenshuxing: invite.defidenshuxing
    })
    .then(res=>{
        this.myinvite = res.data.data;    
        // console.log(res.data.data);
    })
    .catch(err=>{

    })
  }

};
</script>

<style lang="scss">
.myinviteBox {
  width: 100%;
  height: auto;
  background: #fff;
  font-size: 14px;
  overflow: hidden;
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
  .mint-header {
    background: #005ad4;
    height: 0.5rem;
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    white-space: normal;
    .mint-popup {
      border-radius: 0.1rem;
      .popupBox {
        width: 3.34rem;
        // height: 3.46rem;
        background: #fff;
        border-radius: 0.1rem;
        // padding:0 0.15rem;
        h1 {
          width: 100%;
          // height: 0.61rem;
          margin-top: 0.3rem;
          color: #242424;
          font-size: 0.13rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        ol {
          padding: 0 0.1rem;
          text-align: left;
          line-height: 0.22rem;
          font-size: 0.12rem;
          color: #232323;
          margin-bottom: 0.2rem;
          letter-spacing: 1px;
        }
        span {
          height: 0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.15rem;
          color: #0a5fd6;
          border-top: 1px solid #f9f9f9;
        }
      }
    }
    .mint-button-icon {
      color: #fff;
    }
    .mint-header-title {
      font-size: 0.15rem;
      color: #fff;
    }
    .mint-button-text {
      display: block;
      color: #333333;
      font-weight: normal;
      margin: 0;
    }
  }
  .myincont {
    width: 100%;
    height: auto;
    margin: 0.5rem auto;
    overflow: hidden;

    .myincot_top {
      height: 2.05rem;
      overflow: hidden;
      position: relative;
      .bg_blue {
        height: 0.4rem;
        background: #005ad4;
        position: relative;
      }
      .zongjie {
        width: 3.45rem;
        border-radius: 0.08rem;
        background: #fff;
        -webkit-box-shadow: 0 0 5px #e5e9e5;
        box-shadow: 0 0 5px #e5e9e5;
        height: 2rem;
        position: absolute;
        top: 0;
        left: 0.15rem;
        padding: 0.18rem;

        ul li img {
          display: inline-block;
          width: 0.06rem;
          margin-left: 0.02rem;
        }

        ul li:nth-child(2) {
          p {
            line-height: 0.35rem;
            text-align: center;
          }
          p:nth-child(1) {
            font-size: 0.2rem;
            font-weight: 600;
            color: #005ad4;
          }
        }

        ul li:nth-child(3) {
          margin-top: 0.1rem;
          div {
            width: 50%;
            height: auto;

            p {
              line-height: 0.35rem;
              text-align: center;
            }
            p:nth-child(1) {
              font-size: 0.16rem;
              color: #005ad4;
            }
          }
          div:nth-child(1) {
            border-right: 1px solid #e5e9e5;
          }
        }
      }
    }

    .myimgtext {
      margin: 0.18rem;
      overflow: hidden;
      height: auto;
      .tjzc {
        background: url(../../../assets/sm_10.jpg) no-repeat;
        width: 1.66rem;
        height: 0.96rem;
        background-size: 100%;
        float: left;
        color: #fff;
        text-align: center;
        p:nth-child(1) {
          padding: 0.1rem 0 0 0.1rem;
          line-height: 0.4rem;
          font-size: 0.12rem;
        }
      }
      .tjkh {
        background: url(../../../assets/sm_11.jpg) no-repeat;
        width: 1.66rem;
        height: 0.96rem;
        background-size: 100%;
        float: right;
        color: #fff;
        text-align: center;
        p:nth-child(1) {
          padding: 0.1rem 0 0 0.1rem;
          line-height: 0.4rem;
          font-size: 0.12rem;
        }
      }
    }
    .myintlist {
      clear: both;
      ul li {
        height: 0.51rem;
        display: flex;
        align-items: center;
        padding: 0 0.18rem 0;
        justify-content: space-between;
        background-color: #fff;
        .mineContent-3-s {
          color: #333333;
        }
        .mineContent-3-c {
          display: flex;
          align-items: center;
          span {
            margin-right: 0.1rem;
          }
          .mineContent-3-c-ls {
            margin-right: 0;
          }
          .reviseimg {
            width: 0.37rem;
            height: 0.37rem;
            border-radius: 0.5rem;
            overflow: hidden;
            margin-right: 0.05rem;
            img {
              width: 100%;
            }
          }
        }
      }
      ul li img {
        display: inline-block;
        width: 0.06rem;
      }
    }
  }

 .back{
                width: 100%;
                height:0.5rem;
                display:flex;
                justify-content:center;
                position:fixed;
                top:0;
                padding:0 0.1rem;
                background:#005ad4;
                border:none;
                img{
                    line-height:0.5rem;
                    width:0.08rem;
                    height:0.12rem;
                    position:absolute;
                    left:0;
                    top:0.18rem;
                    margin-left:0.13rem;
                }
                p{
                    line-height:0.5rem;
                    font-size: 0.16rem;
                    font-weight:500;
                    color: #fff;
                }
                span{
                    font-size:0.12rem;
                    //color:#333;
                    position:absolute;
                    right:0;
                    top:0.18rem;
                    margin-right:0.13rem;
                }
                .mintui-back:before { color: #fff;}
            }

}
</style>
