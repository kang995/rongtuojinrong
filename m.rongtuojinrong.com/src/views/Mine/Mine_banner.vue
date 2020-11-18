<template>
<div>
  <div v-if="this.$store.state.invite.invite.is_md==0" class="mineBanner">
        <div class="mineBanner-content">
            <p class="mineBanner-content-r mineBanner-content-1">
                <span>资产总额（元）</span>
                
                <img src="../../assets/img53.png" @click="popupVisible=!popupVisible">
            </p>
            <p class="mineBanner-content-2">
                <span v-if="isShow" class="mineBanner-content-2-a bold" >{{jrdetail.zichanzongshu}}</span>
                <span v-else class="mineBanner-content-2-b" >********</span>
                
                <span @click="ztShow">
                    <img v-if="isShow" src="../../assets/img52.png" >
                    <img v-else src="../../assets/img54.png" >
                </span>
            </p>
            <p class="mineBanner-content-r mineBanner-content-1">
                <span>累计收息（元）</span>
                <span v-if="isShow" class="bold">{{jrdetail.yizhuan}}</span>
                <span v-else class="mineBanner-content-2-b" >********</span>
            </p>
            <div class="mineBanner-content-3">
                <div class="mineBanner-content-3-c">
                    <span>待收本金</span>
                    <span v-if="isShow" class="bold">{{jrdetail.toubiaozhong}}</span>
                    <span v-else class="mineBanner-content-2-b" >********</span>
                </div>
                <div class="mineBanner-content-3-c">
                    <span>待收利息</span>
                    <span v-if="isShow" class="bold">{{jrdetail.yuqishouyi}}</span>
                    <span v-else class="mineBanner-content-2-b" >********</span>
                </div>
                <div class="mineBanner-content-3-c">
                    <span>可用余额</span>
                    <span v-if="isShow" class="bold">{{jrdetail.keyong}}</span>
                    <span v-else class="mineBanner-content-2-b" >********</span>
                </div>
            </div>
            <mt-popup  
            v-model="popupVisible"
            popup-transition="popup-fade"
            :closeOnClickModal=false>
            <div class="popupContent">
                <div class="popupContent-1">
                    <span class="popupContent-1-s1">·</span>
                    <span>什么是资产总额？</span>
                </div>
                <p>资产总额=待收本金+待收利息+冻结中资产+可用余额</p>
                <div class="popupContent-1">
                    <span class="popupContent-1-s1">·</span>
                    <span>待收利息如何计算？</span>
                </div>
                <p>待收利息仅供参考，可能会因节假日顺延而发生变动，以实际计息天数为准。</p>
            </div>
            <div class="popupFooter">
                <div class="popupFooter-btn" @click="popupShow">确定</div>
            </div>
            </mt-popup>
      </div>
  </div>

<div v-else>
  <div class="mineBanner-l">
      <div class="mineBanner-content">
        <p class="mineBanner-content-r mineBanner-content-1">
          <span>资产总额（元）</span>

          <img src="../../assets/img53.png" @click="popupVisible=!popupVisible" />
        </p>
        <p class="mineBanner-content-2">
          <span v-if="isShow" class="mineBanner-content-2-a bold">{{zcze}}</span>
          <span v-else class="mineBanner-content-2-b">********</span>

          <span @click="ztShow">
            <img v-if="isShow" src="../../assets/img52.png" />
            <img v-else src="../../assets/img54.png" />
          </span>
        </p>
        <div class="mineBanner-content-d">
          <p class="mineBanner-content-r mineBanner-content-1">
            <span>累计收息（元）</span>
            <span v-if="isShow" class="bold">{{ljsx}}</span>
            <span v-else class="mineBanner-content-2-b">********</span>
          </p>
          <p class="mineBanner-content-r mineBanner-content-1">
            <span>可用余额</span>
            <span v-if="isShow" class="bold">{{this.jrdetail.keyong}}</span>
            <span v-else class="mineBanner-content-2-b">********</span>
          </p>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
          <div class="popupContent">
            <div class="popupContent-1">
              <span class="popupContent-1-s1">·</span>
              <span>什么是资产总额？</span>
            </div>
            <p>资产总额=融托金融总资产+融托民登总资产</p>
          </div>
          <div class="popupFooter">
            <div class="popupFooter-btn" @click="popupShow">确定</div>
          </div>
        </mt-popup>
      </div>
    </div>

      <div class="mineContent-4">
              <div class="mineContent-4al">
                  <div class="mineContent-4a">
                      <img src="../../assets/ld_05.png">
                  </div>
              </div>

              <router-link class="mineContent-4b" :to="{name:'rtjr'}" tag="div">
                  <div class="mineContent-4b1">
                      <span>总资产（元）</span>
                      <span v-if="isShow" class="bold">{{this.jrdetail.zichanzongshu}}</span>
                      <span v-else>****</span>
                  </div>
                  <div class="mineContent-4b2">
                      <!-- <div class="mineContent-4b2a"  @click="Nobdbank" >
                          <div  class="mineContent-4b2a-1">充值</div>
                          <div  class="mineContent-4b2a-1 mineContent-4b2a-2">提现</div>
                      </div> -->

                      <div class="mineContent-4b2a" >
                          <div @click.stop="clickinvest" class="mineContent-4b2a-1">充值</div>  <!--     :to="{name:'Recharge'}"  -->
                          <div @click.stop="clickTix" class="mineContent-4b2a-1 mineContent-4b2a-2">提现</div>
                      </div>

                      <div class="mineContent-4b2b">
                          <img src="../../assets/hk_8.png">
                      </div>
                  </div>
              </router-link>
          </div>

          <div class="mineContent-4 mineContent-5">
              <div class="mineContent-4al">
                  <div class="mineContent-4a">
                      <img src="../../assets/ld_06.png">
                  </div>
              </div>

              <router-link class="mineContent-4b" :to="{name:'rtmd'}" tag="div">
                  <div class="mineContent-4b1">
                      <span>总资产（元）</span>
                      <span v-if="isShow" class="bold">{{this.mddetail.unreceived_principal}}</span>
                      <span v-else>****</span>
                  </div>
                  <div class="mineContent-4b2">

                      <div class="mineContent-4b2b" >
                          <img src="../../assets/hk_8.png">
                      </div>
                  </div>
              </router-link>
          </div> 
          <the-dialog :show="showDialog">
           
          </the-dialog>   
          <the-dialog1 :show="showDialog1">
          </the-dialog1>          
  </div>


</div>  
</template>

<script>
import Tabbar from "@/components/Tabbar";
import TheDialog1 from '@/components/TheDialog1'
import TheDialog from '@/components/TheDialog'
export default {
  data() {
    return {
      popupVisible: false,
      isShow: true,
      jrdetail:{},
      mddetail:{},
      jrzc: 0,
      mdzc: 0,
      jrsx: 0,
      mdsx: 0,
      kyye: '',
      flag: 0,
      showDialog: false,
      showDialog1: false,
      zcze: 0,
      ljsx: 0
    };
  },
  components:{
        TheDialog,
        TheDialog1
    },
  methods: {
    clickTix(show){
      if(this.$store.state.login.token.is_identify==0){
          this.showDialog1 = show;
          return false;
      }else if(this.$store.state.invite.invite.is_huishang_binding_bankcard==0){
          this.showDialog = show;
          return false;
      }else{
          this.$router.push({
              name:'cash'
          })
      }

       //提现 银行卡信息是否绑定银行卡
      //  this.$post( "/rongtuojinrong/userCenter/accountInformation/myBankCard.json", {
      //   defidenshuxing: this.$store.state.invite.defidenshuxing,
      //   FlagChnl:3
      // }).then(res => {
      //   this.flag = res.data.status;
      //   if(res.data.status==0){
      //      this.$router.push({ name:'cash'})
      //   }else{
      //      this.showDialog = show;
      //   }
      // })
      //.catch(err => {}); 
      
    },

    clickinvest(show){
        if(this.$store.state.login.token.is_identify==0){
            this.showDialog1 = show;
            return false;
        }else if(this.$store.state.invite.invite.is_huishang_binding_bankcard==0){
            this.showDialog = show;
            return false;
        }else{
            this.$router.push({
                name:'Recharge'
            })
        }

      //充值 银行卡信息是否绑定银行卡
      //  this.$post( "/rongtuojinrong/userCenter/accountInformation/myBankCard.json", {
      //   defidenshuxing: this.$store.state.invite.defidenshuxing,
      //   FlagChnl:3
      // }).then(res => {
      //   this.flag = res.data.status;
      //   if(res.data.status==0){
      //      this.$router.push({ name:'Recharge'})
      //   }else{
      //      this.showDialog = show;
      //   }
      // })
    },
  
//绑定银行卡弹窗
   /*  Nobdbank(show){
            this.showDialog = show;
            console.log(show);
        }
 */
    ztShow(){
      this.isShow=!this.isShow;
      if(this.isShow){
        localStorage.setItem("mystatus",1);
      }
      if(!this.isShow){
        localStorage.setItem("mystatus",0);
      }
      
    },
    popupShow() {
      this.popupVisible = false;
    },

 },
  created(){   
      this.$toast.loading({
          message: '加载中...',
          forbidClick: true
      });     
      this.$post('/rongtuojinrong/userCenter/totalAssetsDetails.json')
      .then(res=>{
        this.jrdetail = res.data.data;    
        this.jrzc = Number(this.jrdetail.zichanzongshu);
        this.jrsx = Number(this.jrdetail.yizhuan);

        //民登总资产接口 
        this.$post('/rongtuojinrong/userCenter/getIncome.json')
        .then(res=>{
          this.$toast.clear();//关闭toast
          this.mddetail = res.data.data; 
          this.mdzc = Number(this.mddetail.unreceived_principal);
          this.mdsx = Number(this.mddetail.received_profit);
          this.zcze = (this.jrzc+this.mdzc).toFixed(2);
          this.ljsx = (this.jrsx+this.mdsx).toFixed(2);
        })
        .catch(err=>{
        })        


        this.kyye = this.jrdetail.keyong;
      })
      .catch(err=>{

      }) 


      //从本地缓存中取状态
      if(localStorage.getItem("mystatus")==1){
        this.isShow = true;
      }
      if(localStorage.getItem("mystatus")==0){
        this.isShow = false;
      }      
  },

};
</script>

<style lang="scss" scoped>
body {
  .mineBanner {
    color: #ffffff;
    padding: 0.5rem 0.11rem 0;
    .mineBanner-content {
      background: url("../../assets/img60.png") no-repeat;
      background-size: 100%;
      width: 3.45rem;
      height: 1.6rem;
      border-radius: 0.1rem;
      margin: 0 auto;
      .mineBanner-content-r {
        padding-left: 0.14rem;
      }
      .mineBanner-content-1 {
        height: 0.335rem;
        line-height: 0.335rem;
        img {
          display: inline-block;
          width: 0.12rem;
        }
      }
      .mineBanner-content-2 {
        font-weight: bold;
        font-size: 0.2rem;
        text-align: center;
        padding: 0 0.05rem;
        margin-bottom: 0.1rem;
        position: relative;
        .mineBanner-content-2-a{
          padding-left: 0.21rem;
        }
        span:nth-child(2){
          position: absolute;
          right: 0.2rem;
        }
        img {
          display: inline-block;
          width: 0.21rem;
          right: 0.18rem;
          top: 0.075rem;
        }
      }
      .mineBanner-content-3 {
        display: flex;
        justify-content: space-around;
        .mineBanner-content-3-c {
          width: 33.3%;
          display: flex;
          flex-direction: column;
          span {
            text-align: center;
          }
          span:first-of-type{
            margin-bottom: 0.1rem;
          }
        }
      }
      .mineBanner-content-d {
        display: flex;
        justify-content: space-around;
        margin-left: -0.14rem;
      }

      
      .mint-popup {
        width: 2.45rem;
        border-radius: 10px;
        color: #333333;
        .popupContent {
          margin: 0.12rem;
          .popupContent-1 {
            font-weight: bold;
            .popupContent-1-s1 {
              width: 0.12rem;
              text-align: center;
              color: #ff6632;
              display: inline-block;
            }
          }
        }
        .popupFooter {
          border-top: 1px solid #eff2f8;
          .popupFooter-btn {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #0159d5;
          }
        }
      }
    }
  }


    .mineBanner-l {
    color: #ffffff;
    height: 2.2rem;
    padding: 0.5rem 0.11rem 0;
    background-color: #0058d5;
    .mineBanner-content {
      background-size: 100%;
      width: 3.45rem;
      height: 1.45rem;
      border-radius: 0.1rem;
      margin: 0 auto;
      .mineBanner-content-r {
        padding-left: 0.14rem;
      }
      .mineBanner-content-1 {
        height: 0.335rem;
        line-height: 0.335rem;
        font-size: 0.14rem;
        img {
          display: inline-block;
          width: 0.12rem;
        }
      }
      .mineBanner-content-2 {
        font-weight: bold;
        font-size: 0.2rem;
        text-align: center;
        padding: 0 0.05rem;
        margin-bottom: 0.1rem;
        .mineBanner-content-2-a{
          padding-left: 0.21rem;
        }
        span:nth-child(2){
          float: right;
        }
        img {
          display: inline-block;
          width: 0.21rem;
          right: 0.18rem;
          top: 0.075rem;
        }
      }
      .mineBanner-content-3 {
        display: flex;
        justify-content: space-around;
        .mineBanner-content-3-c {
          width: 33.3%;
          display: flex;
          flex-direction: column;
          span {
            text-align: center;
          }
        }
      }
      .mineBanner-content-d {
        display: flex;
        justify-content: space-between;
      }



      .mint-popup {
        width: 3rem;
        border-radius: 10px;
        color: #333333;
        .popupContent {
          margin: 0.12rem;
          .popupContent-1 {
            font-weight: bold;
            .popupContent-1-s1 {
              width: 0.12rem;
              text-align: center;
              color: #ff6632;
              display: inline-block;
            }
          }
        }
        .popupFooter {
          border-top: 1px solid #eff2f8;
          .popupFooter-btn {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #0159d5;
          }
        }
      }
    }
        
  }
  .mineContent-4{
            background-color: #fff;
            border-radius: 0.1rem;
            margin: -0.5rem 0.11rem 0.1rem;
            padding-bottom: 0.2rem;
            .mineContent-4al{
                padding: 0.1rem;
                .mineContent-4a{
                    width: 1.3rem;
                    height: 0.2rem;
                    margin: 0 auto;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }

            .mineContent-4b{
                padding: 0 0.1rem 0 0.18rem;
                display: flex;
                justify-content: space-between;
                .mineContent-4b1{
                    display: flex;
                    flex-direction: column;
                    span:first-of-type{
                        margin-bottom: 0.1rem;
                    }
                    span:nth-child(2){
                        color: black;
                        font-size: 0.2rem;
                        height: 0.2rem;
                        line-height: 0.2rem;
                    }
                }
                .mineContent-4b2{
                    display: flex;
                    align-items: center;
                    .mineContent-4b2a{
                        .mineContent-4b2a-1{
                            width: 0.64rem;
                            height: 0.215rem;
                            line-height: 0.215rem;
                            background-color: #0058d5;
                            color: #fff;
                            text-align: center;
                            border-radius: 0.03rem;
                            margin-bottom: 0.1rem;
                        }
                        .mineContent-4b2a-2{
                            background-color: #fff;
                            color: #0058d5;
                            border: 1px solid #0058d5;
                            margin-bottom: 0;
                        }
                    }
                    .mineContent-4b2b{
                      margin-left: 0.1rem;
                    }
                }
            }
        }
        .mineContent-5{
            margin-top: 0.1rem;
        }

}
</style>
