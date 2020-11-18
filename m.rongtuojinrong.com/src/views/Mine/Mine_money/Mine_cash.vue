<template>
  <div class="cashBox">
    <headerBox title="提现"></headerBox>
    <div class="cashBox-1">
      徽商银行电子交易账户余额：
      <span>{{xiandetail.acctAmt}}元</span>
    </div>
    <div class="cashBox-2">
      <mt-field label="储蓄卡" placeholder v-model="card" :readonly="true" :disableClear="true"></mt-field>
      <mt-field label="金额（元）" placeholder="请输入提现金额" type="number" v-model="money"></mt-field>
    </div>
    <div class="cashBox-3">
      <van-radio-group v-model="radio">
        <van-radio name="1" @click="clickqu(1)">
          实时提现（
          <span>{{xiandetail.limitDesc}}</span>）
        </van-radio>
        <van-radio name="2" @click="clickqu(2)">
          大额提现（
          <span>{{xiandetail.largeDesc}}</span>）
        </van-radio>
      </van-radio-group>
    </div>
     <!-- 开户行 --> 
      
      <van-cell title="开户行" is-link :value="qbankname"  @click="bankshow = true"  v-show="cc" />
  
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>温馨提示</span>
        </div>
        <p>小于等于5万的取现，请选择实时取现!</p>
      </div>  
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShow">我知道了</div>
      </div>
    </mt-popup>

 <mt-popup v-model="popupVisibletwo" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>温馨提示</span>
        </div>
        <p>您的单笔提现金额超限，请于工作日08:30-16:30使用大额提现！</p>
      </div>  
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShowtwo">我知道了</div>
      </div>
    </mt-popup>

 <mt-popup v-model="popupVisiblethree" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>温馨提示</span>
        </div>
        <p>大于5万的取现，请选择大额取现</p>
      </div>  
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShowthree">我知道了</div>
      </div>
    </mt-popup>

  <!-- 不在工作日提现时间弹窗 -->
 <mt-popup v-model="popupVisiblefour" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>温馨提示</span>
        </div>
        <p>大额提现只能在工作日08:30-16:30使用，请知悉！</p>
      </div>  
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShowfour">我知道了</div>
      </div>
    </mt-popup>   

 <mt-popup v-model="popupVisiblefive" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="popupContent">
        <div class="popupContent-1">
          <span>温馨提示</span>
        </div>
        <p>余额不足，账户余额需大于您所输入的金额和提现费用的总额方能取出！</p>
      </div>  
      <div class="popupFooter">
        <div class="popupFooter-btn" @click="popupShowfive">我知道了</div>
      </div>
    </mt-popup>    

    <div class="cashBox-4">
      <div class="cashBox-4-btn" @click="subClick">确定</div>
    </div>

    <div class="cashBox-5">
        <span>温馨提示：</span>
        <div v-for="des in xiandetail.desc" :key="des.id">
          <p>{{des.id}}.{{des.content}}</p>
        </div>
    </div>
   
   <van-popup v-model="bankshow"  position="right" :style="{ height: '100%' ,width:'100%'}">   
     <banktitle :cardId="bankid" @hidshandow="hidshandow" @getbank="getbank"></banktitle>  
   </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from "vant";
import { Cell, CellGroup } from 'vant';
import banktitle from '../choosehang.vue';
Vue.use(Cell).use(CellGroup);
export default {
  data() {
    return {
      card: "",
      money: "",
      radio: "1",
      popupVisible: false,
      popupVisibletwo:false,
      popupVisiblethree: false,
      popupVisiblefour: false,
      popupVisiblefive: false,
      yue:'',
      bankshow:false,
      bankid:"",
      bankname:"",
      cc:false,
      xiandetail: {},
      nowtime: 0,
      qbankname: ''
    };
  },
  components:{
    banktitle
  },
  methods: {
    subClick(){

      //提现金额不能大于余额
      if(this.money>this.xiandetail.acctAmt){
        this.popupVisiblefive = true;
        return false;
      }

      if (this.money == "") {
        this.radio = "1";
        Toast({
            message: '请输入提现金额！',
            className: 'tishi'
        });
        return false;     
      }
      if(this.money > 50000 && this.radio==1){
        this.popupVisibletwo = true;
        return false;
      }
      if(this.money < 50000&& this.radio==2){
        this.popupVisible = true;
        return false;
      }
      if(this.money <= 50000){
        this.$router.push({name:'quxian', query: {TransType:0,FlagChnl:2,TransAmt:this.money} });
      }
      if(this.money > 50000){
        if(this.qbankname==""){
          this.radio = "2";
          Toast({
              message: '请选择开户行！',
              className: 'tishi'
          });          
          return false;
        }
        //不在工作日提现时间内
        if(this.nowtime<this.xiandetail.beginTime||this.nowtime>this.xiandetail.endTime){
          this.popupVisiblefour = true;
          return false;
        }
        this.$router.push({ name:'largemoney', query: {TransType:0,FlagChnl:2,TransAmt:this.money,BrabankName:this.qbankname,BankCnaps:this.bankid}}) 
      }
    },
    
    popupShow() {
      this.popupVisible = false;
    },
    popupShowtwo() {
      this.popupVisibletwo = false;
    },
    popupShowthree() {
      this.popupVisiblethree = false;
    },    
    popupShowfour() {
      this.popupVisiblefour = false;
    },  
    popupShowfive() {
      this.popupVisiblefive = false;
    },        

    clickqu(rad){
      if (this.money == "") {
        this.radio = "1";
        Toast({
            message: '请输入提现金额！',
            className: 'tishi'
        });        
        return false;
      }         
      if(rad==1&&this.money<=50000){
        this.radio="1";
        this.cc = false;
        return false; 
      }
      if(rad==1&&this.money>50000){
        this.radio="2";
        //this.popupVisiblethree = true;
        return false; 
      }
      if(rad==2&&this.money<=50000){
        this.radio = "1";
        this.popupVisible = true;
        this.cc = false;
        return;
      }
      if(rad==2&&this.money>50000){
        this.radio = "2";
        this.cc = true;
      }
    },    

    getbank(val){
      console.log(val);
      this.bankshow=false;
      //this.$store.dispatch('changeToken',res.data.data)
      this.bankname = val; 
      this.qbankname = val.lname;
    },         
    hidshandow(val){
      this.bankshow = false;
    }         
  },
  created(){
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    });    
    // this.yue = this.$route.query.ye;
    // //银行卡信息
    // this.$post("/rongtuojinrong/userCenter/accountInformation/myBankCard.json",{
    //     defidenshuxing: this.$store.state.invite.defidenshuxing,
    //      FlagChnl:3
    //   }).then(res => {
    //     this.flag = res.data.status;
    //     this.bankdetail = res.data.data;
    //     //通过正则隐藏银行卡号中间位
    //     this.card = res.data.data.No;
    //      this.bankid = res.data.data.No;
    //     var reg = /^(\d{4})\d+(\d{4})$/;
    //     this.card = this.card.replace(reg, "$1**********$2");
    //   })
    //   .catch(err => {});  

     //请求取现接口 
     this.$post('/rongtuojinrong/userCenter/withdrawal/cash.json',{
       defidenshuxing: this.$store.state.invite.defidenshuxing,
       FlagChnl: 3
     }).then(res=>{
       this.$toast.clear();
       this.xiandetail = res.data.data;
        //通过正则隐藏银行卡号中间位
        this.card = res.data.data.signBankCard;
         this.bankid = res.data.data.signBankCard;
        var reg = /^(\d{4})\d+(\d{4})$/;
        this.card = this.card.replace(reg, "$1**********$2");     
        //默认银行
        this.qbankname =   res.data.data.brabankName;
     })    

      
     this.$post('/rongtuojinrong/userCenter/withdrawal/largeAmount.json',{
       defidenshuxing: this.$store.state.invite.defidenshuxing
     }).then(res=>{
       this.large = res.data.status;
     })

     //获取服务器日期
     this.$post('/rongtuojinrong/utils/ntp.json').then(res=>{
       this.nowtime = res.data.data.timestamp;
     })     
  }
};
</script>

<style lang="scss">
  .tishi{
    top: 25%;
  }
  .cashBox {
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #f9f9f9;
    .cashBox-1 {
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      margin-top: 0.5rem;
    }
    .cashBox-2 {
      a:first-of-type {
        border-bottom: 1px solid #eee;
      }
    }
    .cashBox-3 {
      padding: 0.1rem 0.1rem 0;
      font-size: 0.1rem;
      .van-radio-group {
        .van-radio {
          height: 0.3rem;
          line-height: 0.3rem;
          .van-radio__icon {
            font-size: 0.1rem;
          }
        }
      }
    }
    .mint-popup {
      width: 2.45rem;
      border-radius: 10px;
      color: #333333;
      .popupContent {
        margin: 0 0.12rem;
        .popupContent-1 {
          height: 0.3rem;
          line-height: 0.3rem;
          text-align:center;
          margin-top: 0.1rem;
          span {
            font-size: 0.14rem;
            color: black;
          }
        }
        p{ padding-bottom:0.15rem;text-align: center;}
      }
      .popupFooter {
        .popupFooter-btn {
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          color: #0159d5;
          border-top: 1px solid #eee;
        }
      }
    }
    .cashBox-4 {
      padding: 0.1rem 0;  
      .cashBox-4-btn {
        width: 1.2rem;
        height: 0.25rem;
        line-height: 0.25rem;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        background-color: #0159d5;
        border-radius: 14px;
      }
    }
    .cashBox-5{
        padding: 0 0.1rem;
        span{
            display: inline-block;
            height: 0.3rem;
            line-height: 0.3rem;
            color: #ff6633;
        }
        p{line-height: 0.25rem;}
    }
    .van-cell{ padding: 12px 10px;
      .van-cell__title span{color:#666;font-size: 16px;}
      .van-cell__value{flex:4;text-align:left;}
    }
  }

</style>
