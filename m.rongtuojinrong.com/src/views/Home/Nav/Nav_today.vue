<!-- 今日任务--> 
<template>
  <div class="todayBox">
    <!-- 头部 -->
    <mt-header title="今日任务">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="popupVisible=!popupVisible">
        获取攻略
        <mt-popup v-model="popupVisible">
          <div class="popupBox">
            <h1>积分获取攻略</h1>
            <ol v-html="datas">
              <!-- <li>1、选择特定的项目进行出借赚积分:选择不同的特定项目进行出借获得项目积分不一样。<br/>计算公式为:项目积分=出借金额/10*项目期限/12,比如,1000元出借6个月,可获得积分500; </li>
                <li>2、签到赚积分:每天签到赚积分,连续签到15天, 额外奖励100积分;</li>
                <li>3、分享项目赚积分,每天一次随机1-5个积分;</li>
                <li>4、首次下载融托金融APP,注册成功后,送100积分;</li>
                <li>5、玩APP发现页小游戏可获得相应积分</li>
              <li>6、没满5000步可兑换50积分</li>-->
            </ol>
            <span>确定</span>
          </div>
        </mt-popup>
      </mt-button>
    </mt-header>

    <div class="navcss">
      <!-- 图片 -->
      <div class="toimg">
        <div class="sum">
          <div class="suma">
            <div>
              <div class="w10">
                <img src="../../../assets/img64.png" />
              </div>
              <div class="sumb">
                <p>今日步数</p>
                <p class="bold">{{today.feet}}</p>
                <p>每满5000步可兑换50积分！</p>
              </div>
            </div>
            <router-link :to="{name:'stepNum'}" tag="button">查看排行</router-link>
          </div>
          <p class="add_to">为了您的步数统计准确，请每天起床后尽早打开APP以确保计步器正常计步</p>
        </div>
      </div>
      <!-- 签到15天的显示效果 -->
      <div class="sumtwo" v-if="view.length==15">
        <div class="sumtwos">
          <p>
            <b class="bold">100</b>积分已发放
          </p>
          <p>
            已连续签到
            <span>{{today.qiandaoDays}}</span>天
          </p>
        </div>
      </div>
      <!-- 未签满15天效果 -->
      <div class="sumtwo" v-else>
        <ul> 
          <!-- 根据status判断是否签到：0：未签到;1：签到 -->
          <li v-for="item in today.qiandaoDates" :key="item.today">
            <div v-if="item.status==0">
              <span>{{item.label0}}</span>
              <p class="bold">{{item.label1}}</p>
            </div>
            <div v-if="item.status==1" class="active">
                <span>{{item.label0}}</span>
                <p class="bold">{{item.label1}}</p>
            </div>
          </li>
          
          <!-- <li class="active">
            <span>Sept.</span>
            <p>19</p>
          </li>
          <li class="active">
            <span>Sept.</span>
            <p>20</p>
          </li>
          <li>
            <span>Sept.</span>
            <p>21</p>
          </li>
          <li>
            <span>Sept.</span>
            <p>22</p>
          </li>
          <li>
            <span>Sept.</span>
            <p>23</p>
          </li>
          <li>
            <span>Sept.</span>
            <p>24</p>
          </li> -->
        </ul>
        <p class="qian">
          <b>
            已连续签到
            <span>&nbsp;{{today.qiandaoDays}}&nbsp;</span>天
          </b>{{today.qiandaoTip}}
        </p>
      </div>
      <!-- 结束 -->
      <div class="sumthree">
        <ul>
          <li>
            <div class="left div">
              <img src="../../../assets/img69.png" />
              <p>行走计划</p>
            </div>
            <span>50~100</span>
            <!-- <button :class="{'right':true,'huan':true,'active':(today.feet_plan==1 ? isShow : false)}" @click="getConvert">{{button1[today.feet_plan]}}</button> -->
               <button :class="['right','huan',(today.feet_plan==1 ? 'active' : '')]" @click="getConvert">{{button1[today.feet_plan]}}</button>
            <mt-popup v-model="convert" closeOnClickModal>
              <div class="popupBoxs">
                <h1>行走计划兑换攻略</h1>
                <p class="ps">{{integral.strategy}}</p>
                <!-- <p class="ps">积分封顶，每个用户每天可兑换一次。</p> -->
                <div class="mt1">
                  <van-circle
                    v-model="currentRate"
                    :rate="num"
                    size="1rem"
                    :speed = '40'
                    color="#00a3e9"
                    layer-color="#ccc"
                    :stroke-width="68"
                    default
                  />
                  <!-- 定位到circle上 -->
                  <div class="circleBox">
                    <p>今日步数</p>
                    <p class="today">{{integral.steps}}</p>
                    <p>可兑换</p>
                    <p>{{integral.sure_points}}积分</p>
                  </div>
                </div>
                <div class="zou">{{integral.tips}}</div>
                <div class="tanbu">
                  <button class="hbutton" @click="convert=!convert;">稍后兑换</button>
                  <button class="mbutton" @click="getScore">马上兑换</button>
                </div>
                <!-- 删除按钮 -->
                <img class="img1" @click="convert=!convert;" src="../../../assets/delect_06.jpg" alt="">
              </div>
            </mt-popup>
            <mt-popup v-model="convert1">
              <div class="popupBoxs1">
                <p>积分稍后发送至我的积分</p>
                <p>请稍后查看</p>
                <!-- <p>{{score.data}}</p> -->
              </div>
            </mt-popup>
          </li>
          <!-- 行走计划、每日签到......项目出借-->
          <li :to="{name:'mine'}"
              @click='changeButton(today.qian,"mine")'>
            <div class="left div">
              <img src="../../../assets/img68.png" />
              <p>每日签到</p>
            </div>
            <span>50~100</span>
            <button :class="{'right':true, 'huan':true,active:(today.qian==1?true:false)}">{{button[today.qian]}}</button>
          </li>
          <li :to="{name:'ProjectBidOne'}"  
              @click='changeButton(today.fenxiang,"ProjectBidOne")'>
            <div class="left div">
              <img src="../../../assets/img67.png" />
              <p>每日分享</p>
            </div>
            <span>50~100</span>
            <button :class="{'right':true, 'huan':true,active:(today.fenxiang==1?true:false)}">{{button[today.fenxiang]}}</button>
          </li>
          <!-- 每日分享：暂时没有可分享项目弹窗 -->
          <mt-popup v-model="popupVisible1" closeOnClickModal>
            <div class="messageBox">
                <p>暂时没有可分享的项目，请稍后再试</p>
                <span @click="changeSpan" :class="[(isShow1 ? 'active1':'')]">确定</span>
            </div>
          </mt-popup>
          <li :to="{name:'find'}"  
              @click='changeButton(today.game,"find")'>
            <div class="left div">
              <img src="../../../assets/img65.png" />
              <p>小游戏</p>
            </div>
            <span>50~100</span>
            <button :class="{'right':true, 'huan':true,active:(today.game==1?true:false)}">{{button[today.game]}}</button>
          </li>
          <!--   "LendItemDisplay":是否显示项目出借(整行) 1是0否 -->
          <li :to="{name:'project'}"  v-if="today.LendItemDisplay==1"
              @click='changeButton(today.project,"project")'>
            <div class="left div">
              <img src="../../../assets/img66.png" />
              <p>项目出借</p>
            </div>
            <span>50~100</span>
            <button :class="{'right':true, 'huan':true,active:(today.project==1?true:false)}">{{button[today.project]}}</button>
            <!-- 完成样式end -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { Circle } from "vant";
// import Vue from "vue";
// import { Indicator } from 'mint-ui';//加载中
import { Toast } from 'mint-ui';//轻提示
export default {
  name: "today",
  data() {
    return {
      popupVisible: false,//控制获取攻略弹窗
      popupVisible1:false,//控制每日分享弹窗显示与隐藏的变量
      isShow1:false,//控制每日分享弹窗确定按钮样式的变量
      convert: false,//控制行走计划兑换攻略弹窗
      convert1: false,//控制马上兑换弹窗
      currentRate:0,//当前进度
      num:0,//目标进度
      today: '', //今日任务首页数据
      view:[],//判断签到是否满15天效果数据(存储签到字段)
      integral: "", //今日任务步数兑换弹出后的说明接口数据
      datas: "",//今日任务首页积分获取攻略接口数据
      score:'',//今日任务步数兑换积分接口数据
      change:'',//更新步数接口数据
      // isShow:true,//控制去兑换按钮样式
      button:['去完成','已完成'],//存储按钮文本
      button1:['去兑换','已兑换']
    };
  },
  methods: {
    //1.去兑换按钮-弹出与关闭
    getConvert(){
      if(this.today.feet_plan==1){//积分兑换后禁用(feet_plan:1已兑换 0未兑换)
        this.convert = false;
        return;
      } 
      this.convert=!this.convert;
      this.getShow();//调用今日任务步数兑换弹出后的说明接口
      // console.log(this.today.feet_plan)
    },
    //2.今日任务步数兑换弹出后的说明接口方法
    getShow(){
      this.$post("/rongtuojinrong/activity/sports/v1/Feet2PointsInfo.json").then(res => {
            this.integral = res.data.data;
            this.num = this.integral.steps/10000*100;//兑换积分百分比
            // console.log(this.integral.steps)
          });
      },
    //3.步数兑换积分-马上兑换
    getScore(){
      if(this.integral.steps<5000){
        return;//return 的作用就是用来终止函数执行
      }
       // 1).今日任务步数兑换弹出后的说明接口
      // this.$post("/rongtuojinrong/activity/sports/v1/Feet2PointsInfo.json").then(res => {
      //     this.integral = res.data.data;
          // console.log(this.integral.steps)
            //2).今日任务步数兑换积分接口
            this.$post('/rongtuojinrong/activity/sports/v1/Feet2Points.json').then(res=>{
              this.score = res.data;
              if(this.score.status==0){// --积分兑换成功
                this.convert = false;//将行走计划兑换攻略窗口关闭
                this.convert1 = true;//兑换积分成功窗口显示 
                this.getToday();//再次请求首页接口，让去兑换按钮显示禁用样式
              }else if(this.score.status==1){//--积分兑换失败
                Toast({
                    message: this.score.msg,
                    iconClass: 'fa fa-check fa-lg',
                    position: 'middle',
                    duration: 1500,
                });
              }
           })
        // });
      },
    //4.今日任务首页数据
    getToday() {
      this.Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
      });
      // 1)今日任务首页数据
      this.$post("/rongtuojinrong/activity/today/v1/index.json",{
          user_id:12154
      }).then(res =>{
          this.today = res.data.data;
          this.view = res.data.data.qiandaoDates;
          this.Indicator.close();
          // console.log(this.today);
        });
        // 2)今日任务首页积分获取攻略接口
        this.$post("/rongtuojinrong/activity/today/strategy.json").then(res => {
          this.datas = res.data.data;
          this.Indicator.close();
          // console.log(res.data.data);
        })
      },
    // 5.更新接口方法
    // getDate(){
    //   this.$post('/rongtuojinrong/activity/sports/v1/Feet2PointsInfo.json').then(res=>{
    //       this.integral = res.data.data;
    //       //1).今日任务更新步数接口
    //         this.$post('rongtuojinrong/activity/sports/v1/updateFeet.json',{
    //           step:this.integral.steps //步数
    //         }).then(res=>{
    //           this.change = res.data.status
    //           if(this.change==0){
    //               this.getToday();//status为0时更新首页数据
    //           }
    //           // console.log(this.change)
    //         })
    //   })
    // },
    // 6.控制按钮是否跳转
    changeButton(val,name){
      if(val==0){//状态为0表示未完成，需要跳转
        if(name=='ProjectBidOne'&&this.today.fenxiang_id==0){
          this.popupVisible1=!this.popupVisible1;
          this.isShow1 = false;//关闭弹出框确定按钮样式（每日分享）
        }else if(name=='ProjectBidOne'&&this.today.fenxiang_id!=0){
          this.$router.push({
            path:'/ProjectBidOne',
            query:{id:this.today.fenxiang_id}
          })
        }else{
           this.$router.push({name:name})
        }
      }
    },
    // 7.控制每日分享弹窗方法
    changeSpan(){
        this.popupVisible1=!this.popupVisible1;
        this.isShow1 = true;//显示弹出框确定按钮样式
    }
  },
  computed: {
    text2() {
      return "15%";
      /*  return this.currentRate.toFixed(0) + "%"; */
    }
  },
  created() {
    this.getToday();//执行渲染首页数据方法
    // this.getDate();//执行更新接口方法
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
button,
img {
  padding: 0;
}
.todayBox {
  width: 100%;
  height: auto;
  background: #f9f9f9;
  font-size: 14px;
  overflow: hidden;
  .mint-header {
    background: #fff;
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
  .navcss {
    .toimg {
      width: 100%;
      height: 2.2rem;
      background: url(../../../assets/banner@2x.png) no-repeat;
      background-size: 100%;
      position: relative;
      margin-top: 0.5rem;
      //    .padding{
      //        padding:0.2rem 0 0 0.3rem;
      //        color:#fff;
      //        p{line-height: 0.4rem;}
      //        p:nth-child(1){
      //            font-size: 0.35rem;
      //            text-shadow:4px -1px #2a4eeb
      //        }
      //        p:nth-child(2){
      //            font-size: 0.2rem;
      //        }
      //    }
    }
    .sum {
      width: 92%;
      margin: auto;
      height: 1.25rem;
      background: #fff;
      border-radius: 0.1rem;
      position: absolute;
      top: 63%;
      left: 4%;
      box-shadow: 3px 3px 10px #eef0f5;
      .suma {
        width: 96%;
        margin: auto;
        height: 0.25rem;
        img {
          width: 0.7rem;
          height: 0.7rem;
          margin-top: 0.1rem;
          float: left;
        }
        .sumb {
          float: left;
          margin-top: 3%;
          margin-top: 0.1rem;
          padding-left: 0.02rem;
          p:nth-child(1) {
            font-size: 0.14rem;
            color: #282828;
          }
          p:nth-child(2) {
            font-size: 0.2rem;
            font-weight: bold;
            color: #333;
            padding-top: 0.05em;
          }
          p:nth-child(3) {
            font-size: 0.12rem;
            color: #999;
          }
        }
        button {
          display: block;
          width: 0.64rem;
          height: 0.22rem;
          float: right;
          background: linear-gradient(to right, #4d97ff 0%, #335eff 100%);
          border: none;
          border-radius: 0.2rem;
          color: #fff;
          margin-top: 0.33rem;
          font-size: 12px;
        }
        .w10 {
          width: 10%;
        }
      }
      .add_to {
        clear: both;
        font-size: 0.12rem;
        width: 78%;
        float: right;
        color: #999;
      }
    }
    .sumtwo {
      width: 92%;
      margin: auto;
      height: 0.9rem;
      background: #fff;
      border-radius: 0.1rem;
      -webkit-box-shadow: 3px 3px 10px #eef0f5;
      box-shadow: 3px 3px 10px #eef0f5;
      margin-top: 14%;
      overflow: hidden;
      .sumtwos {
        width: 96%;
        margin: auto;
        height: auto;
        p:nth-child(1) {
          width: 100%;
          margin-top: 3%;
          background: linear-gradient(to right, #4d97ff 0%, #335eff 100%);
          color: #fff;
          font-size: 0.2rem;
          border-radius: 0.06rem;
          line-height: 0.4rem;
          height: 0.4rem;
          text-align: center;
          display: block;
        }
        p:nth-child(2) {
          line-height: 0.4rem;
          span {
            color: #ff6633;
            padding: 0 2% 0 2%;
          }
        }
      }

      ul {
        /*  padding: 0.08rem 0.06rem 0.08rem 0.07rem; */
        overflow: hidden;
        display: flex;
        height: 0.65rem;
        align-items: center;
        li {
          float: left;
          width: 0.42rem;
          height: 0.49rem;
          border-radius: 0.06rem;
          text-align: center;
          margin-right: 0.06rem;
          color: #333;
          background: #ededed;
          overflow-x:hidden;
          span {
            font-size: 12px;
            line-height: 0.23rem;
          }
          p {
            font-weight: bold;
          }
        }
        .active {
          background: linear-gradient(to right, #4d97ff 0%, #335eff 100%);
          color: #fff;
          width: 0.42rem;
          height: 0.49rem;
          border-radius: 0.06rem;
          text-align: center;
        }
        li:last-child {
          margin-right: 0;
        }
      }
      .qian {
        padding-left: 0.07rem;
        font-size: 12px;
        span {
          color: #ff6633;
          /* padding: 0.07rem; */
        }
        b {
          color: #333;
          font-weight: bold;
          padding-right:0.12rem;
        }
      }
    }

    .sumthree {
      width: 100%;
      height: auto;
      background: #fff;
      -webkit-box-shadow: 3px 3px 10px #eef0f5;
      box-shadow: 3px 3px 10px #eef0f5;
      margin-top: 0.1rem;
      overflow: hidden;
      margin-bottom: 2%;
      ul {
        width: 90%;
        margin: auto;
        height: auto;
        overflow: hidden;
        padding: 0;

        li {
          border-bottom: 1px solid #f5f5f5;
          height: 0.6rem;
          text-align: center;
          clear: both;
          margin: 0;
          img {
            width: 0.43rem;
            height: 0.43rem;
            margin-top: 0.1rem;
            display: block;
            float: left;
          }
          .huan {
            width: 0.69rem;
            height: 0.3rem;
            background-color: #fff;
            color: #0159d5;
            border: none;
            border: 1px solid #0159d5;
            border-radius: 0.18rem;
            margin-top: 0.15rem;
            padding: 0;
          }
          // 禁用时样式
          .active{
            width: 0.69rem;
            height: 0.3rem;
            background-color: #fff;
            color: #ccc;
            border: none;
            border: 1px solid #ccc;
            border-radius: 0.18rem;
            margin-top: 0.15rem;
            padding: 0;
          }
          .end {
            width: 0.69rem;
            height: 0.3rem;
            background-color: #fff;
            color: #999;
            border: none;
            border: 1px solid #a7a7a7;
            border-radius: 0.18rem;
            margin-top: 0.15rem;
          }

          span {
            line-height: 0.6rem;
            color: #ff6633;
            display: block;
            float: left;
            width: 40%;
          }
          .div {
            width: 35%;
            height: 0.6rem;
            p {
              float: left;
              line-height: 0.6rem;
              padding-left: 0.06rem;
            }
          }
        }
        li:last-child {
          border-bottom: none;
        }
        // 每日分享弹窗样式
        .mint-popup{
          overflow: hidden;
          .messageBox{
            width:2.7rem;
            P{
              width:100%;
              height:0.6rem;
              font-size:0.12rem;
              color:#06090e;
              border-bottom:1px solid #91a5bd;
              display:flex;
              justify-content:center;
              align-items:center;
            }
            span{
              width:100%;
              height:0.45rem;
              font-size:0.15rem;
              color:#2f76aa;
              display:flex;
              justify-content:center;
              align-items:center;
            }
          }
        }
        .active1{
          background-color:#ddd;
        }
      }

      .mint-popup {
        border-radius: 0.1rem;
        .popupBoxs {
          width: 2.45rem;
          height: 3.47rem;
          background: #fff;
          border-radius: 0.1rem;
          position:relative;
          // padding:0 0.15rem;
          h1 {
            width: 100%;
            height: 0.61rem;
            color: #242424;
            font-size: 0.16rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ps {
            font-size: 12px;  
            padding: 0 0.22rem;
            text-align:left;
          }
          img {
            width: 3.33rem;
            height: 2.46rem;
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
          .zou {
            color: #ff6633;
            span {
              display: inline !important;
              /* float: inherit; */
            }
          }
          .img1{
            width:0.12rem;
            height:0.12rem;
            position: absolute;
            top:0rem;
            right:0.12rem;
          }
        }
        .popupBoxs1 {
          width: 2.45rem;
          height: 0.78rem;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 0.1rem;
          p {
            font-size: 0.11rem;
            color: #414141;
          }
        }
      }
      .mt1 {
        margin-top: 0.15rem;
        position: relative;
        .circleBox {
          width: 1.24rem;
          height: 0.74rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          left: 0.6rem;
          top: 0.18rem;
          p {
            width: 1.24rem;
          }
          p:nth-child(1) {
            font-size: 0.12rem;
            color: #333;
          }
          p:nth-child(2) {
            font-size: 0.15rem;
            color: #333;
            position: absolute;
            bottom: 0.34rem;
          }
          p:nth-child(3) {
            font-size: 0.1rem;
            color: #999;
            // line-height: 0.15rem;
            width: 0.55rem;
            position: absolute;
            bottom: 0.15rem;
          }
          p:nth-child(4) {
            font-size: 0.1rem;
            color: #999;
            // line-height: 0.15rem;
            width: 0.55rem;
            position: absolute;
            bottom: 0px;
          }
        }
      }
    }
  }
  .tanbu {
    padding: 0 0.31rem 0 0.31rem;
    .mbutton {
      width: 0.85rem;
      height: 0.31rem;
      background-color: #fff;
      color: #999;
      border: none;
      border: 1px solid #a7a7a7;
      border-radius: 0.18rem;
      margin-top: 0.15rem;
      float: right;
    }
    .mbutton_active {
      width: 0.85rem;
      height: 0.31rem;
      background-color: #0159d5;
      color: #fff;
      border: none;
      border-radius: 0.18rem;
      margin-top: 0.15rem;
      float: right;
    }
    .hbutton {
      width: 0.85rem;
      height: 0.31rem;
      background-color: #fff;
      color: #0159d5;
      border: none;
      border: 1px solid #0159d5;
      border-radius: 0.18rem;
      margin-top: 0.15rem;
      float: left;
    }
  }
}
</style>
 