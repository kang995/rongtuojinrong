<!--发现 收益计算器--> 
<template>
  <div class="counterBox">
    <!-- 头部 -->
    <!-- <mt-header title="收益计算器">
      <router-link to="/find" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> -->
    <headerBox title="收益计算器"></headerBox>
    
    <form>
      <ul class="count_text">
        <li>
          <div class="left rbo">
            <P>到期本息(元)</P>
            <p class="shuc">{{strip}}</p>
          </div>

          <div class="right rbo2">
            <div class="pdt0">
              <p>利息(元)</p>
              <p class="shuc">{{accrual}}</p>
            </div>

            <div class="pdt1">
              <p>月均收息(元)</p>
              <p class="shuc">{{monthly}}</p>
            </div>
          </div>
        </li>
        <li class="yuan">
          <span>输入金额（元）</span>
          <input type="number" v-model="money" placeholder="输入出借金额" class="right" />
        </li>
        <li class="yuan">
          <span>预期年利率（%）</span>
          <input type="number" v-model="rate" placeholder="输入预期年利率" class="right" />
        </li>
        <li class="yuan">
          <span>期限（天）</span>
          <input type="number" v-model="day" placeholder="输入出借期限" class="right" />
        </li>
      </ul>
      <p class="pju">注：计算结果仅供参考，并不构成任何形式的法律或金融意见和承诺</p>
      <div class="tj">
        <button type="button" @click="count">计算</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';//轻提示
export default {
  data(){
    return{
      money:'',//出借金额（元）
      rate:'',//预期年利率
      day:'',//出借期限(天)
      strip:'0.00',//到期本息(元)
      accrual:'0.00',//利息(元)
      monthly:'0.00'//月均收息(元)
    }
  },
  methods:{
    count(){//注意toFixed方法只能用于数值型数据
      if(this.money ==''){
          Toast({
              message: '请输入出借金额',
              position: 'middle',
              duration: 1500
          });
      }else if(this.rate == ''){
        Toast({
            message: '请输入预期年利率',
            position: 'middle',
            duration: 1500
        });
      }else if(this.day==''){
         Toast({
            message: '请输入出借期限',
            position: 'middle',
            duration: 1500
        });
      }else{
          this.accrual = (parseInt(this.money)*this.rate*this.day/(365*100)).toFixed(2);//计算利息--利息=金额（取整）*年利率*天数/(365*100)
          console.log(typeof this.accrual)
          this.strip = (parseInt(this.money) + +this.accrual).toFixed(2); //计算到期本息--到期本息=本金+利息
          console.log(typeof  this.strip)
          this.monthly = (parseInt(this.money)*this.rate*30/(365*100)).toFixed(2);//计算月均利息--月均利息=金额（取整）*年利率*30/(365*100)
          console.log(typeof  this.monthly)
      }
    }
  }
};
</script>


<style  lang="scss">
  .counterBox{
    width: 100%;
    height: 100%;
    font-size: 14px;
    background:#e2ebf4;
    position: absolute;
  button, img {
    padding: 0;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
    .count_text {
      overflow: hidden;
      background: #fff;
      padding: 0.1rem 0.1rem 0 0.1rem;
      color: #333;
      padding-top:0.5rem;
      li:nth-child(1) {
        overflow: hidden;
        height: 1rem;
        margin-bottom: 0.1rem;
        .rbo {
          width: 50%;
          line-height: 0.3rem;
          height: 1rem;
          border-right: 1px solid #e5e9f2;
          padding-left: 0.3rem;
          padding-top: 0.25rem;
          letter-spacing: 0.01rem;
          p {
            line-height: 0.22rem;
          }
        }
        .rbo2 {
          width: 50%;
          line-height: 0.3rem;
          height: 1rem;
          letter-spacing: 0.01rem;

          padding-left: 0.3rem;
          p {
            line-height: 0.2rem;
          }
        }
      }
      .yuan {
        height: 0.42rem;
        border-top: 1px solid #e5e9f2;
        text-align: left;
        line-height: 0.42rem;
        input {
          border: none;
          text-align: right;
          background: none;
        }
      }
      .pdt0 {
        padding-top: 0.05rem;
      }
      .pdt1 {
        padding-top: 0.1rem;
      }
      .shuc {
        color: #fe6633;
        font-weight: 600;
      }
    }
    .pju {
      padding: 0.2rem;
      color: #999;
      // background:#e2ebf4;
    }

    .tj {
      width: 100%;
      padding: 0.2rem;
      overflow: hidden;
      // background:#e2ebf4;
      button {
        width: 100%;
        height: 0.45rem;
        background: linear-gradient(to right, #4d97ff 0%, #335eff 100%);
        border: none;
        border-radius: 0.05rem;
        color: #fff;
        font-size: 0.16rem;
        letter-spacing: 2px;
      }
      button:active {
        background: #335eff;
      }
    }
  }
</style>
 

