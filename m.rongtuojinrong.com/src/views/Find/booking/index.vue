<template>
  <div class="bookingBox">
    <headerBox title="记账"></headerBox>
    <div class="bookingcanter">
      <div class="conterimg">
        <ul>
          <li>
            <p>本月收入</p>
            <p>{{yuezong.currrentMonthIncome}}</p>
          </li>
          <li>
            <p>本月支出</p>
            <p>{{yuezong.currrentMonthExpend}}</p>
          </li>
          <li>
            <p>本月差额</p>
            <p>{{yuezong.currrentMonthGap}}</p>
          </li>
        </ul>
      </div>
      <router-link class="apen" tag="button" :to="{name:'book'}">记一笔</router-link>

     <div class="xunhuan"   > <!-- v-for="conter in details" :key="conter.id" -->
      <div class="jiconter">
        <p class="left">
          <span>{{details.secDate}}</span>
        </p>
        <p class="right">
           <span>支:￥<span> {{details.lendTotalMoney}}</span></span> 
           <span class="pl05">收:￥<span>{{details.incomeTotalMoney}}</span> </span>
        </p>
      </div>
 
      <div class="xunhuan">
        <ul class="jilist" v-for="list in details.detailListArr" :key="list.id">
        <li>
          <div>
            <p class="left">{{list.cate_title}}</p>
            <p class="right red" v-if="list.state==1">{{list.money}}</p>
            <p class="right clv" v-else>{{list.money}}</p>
          </div>
          <div class="clear">
            <p class="left">
              <img class="lineimg" src="../../../assets/biao2.png" />
              <span class="imgtext">{{list.time}}</span>
            </p>
            <p class="right">{{list.detailAbout}}</p>
          </div>
        </li>
        <!-- <li>
          <div>
            <p class="left">早餐</p>
            <p class="right red">10</p>
          </div>
          <div class="clear">
            <p class="left">
              <img class="lineimg" src="../../../assets/biao2.png" />
              <span class="imgtext">10:24</span>
            </p>
            <p class="right">日常账单</p>
          </div>
        </li> -->

      </ul>    
</div>
<div class="height"></div>
    </div>
      <ul class="conterend">
        <router-link tag="li" to="/definite">
          <img src="../../../assets/mingxi.png" />
          <span>明细</span>
        </router-link>
         <router-link tag="li" to="/journaling">
          <img src="../../../assets/baobiao.png" />
          <span>报表</span>
         </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      yuezong:"",
      details:"",
      //yuelist:[]
    }
  },
  methods:{

  },
  created(){
    this.$post("/rongtuojinrong/jizhang/index.json",{
    }).then(res=>{
   this.yuezong = res.data.data;
   this.details = res.data.data.todayDetails;
   console.log(this.yuezong);

    })
  }
};
</script>

<style  lang="scss">
.bookingBox {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f9f9f9;
  position: absolute;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .clear {
    clear: both;
  }
  .c3 {
    color: #333;
  }  .pl05{padding-left:0.05rem;} 
  .bookingcanter {
    padding-top: 0.5rem;
    position: relative;
    .conterimg {
      background: url(../../../assets/jz01.png) no-repeat;
      height: 1.97rem;
      background-size: 100%;
      position: relative;
      ul {
        height: 0.48rem;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 0.12rem;
        li {
          display: flex;
          width: 33.2%;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      }
    }
    .apen {
      background: #0159d5;
      height: 0.42rem;
      margin: 0.2rem auto;
      border-radius: 0.2rem;
      color: #fff;
      line-height: 0.42rem;
      text-align: center;
      width: 2.32rem;
      border: none;
      display: block;
    }
    .jiconter {
      padding: 0.18rem;
      background: #ebebeb;
      width: 100%;
      height: 0.22rem;
      p {
        line-height: 0.05rem;
        text-align: left;
        font-size: 0.12rem;
      }
    }
    .jilist {
      width: 100%;
      height: auto;
      overflow: hidden;
      li {
        height: 0.5rem;
        border-bottom: 1px solid #c6c6c6;
        overflow: hidden;
        padding: 0 0.2rem;
        font-size: 0.12rem;
        .clv {
          color: #72d881;
        }
        .red {
          color: #df2800;
        }
        .lineimg {
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          vertical-align: middle;
        }
        .imgtext {
          color: #ccc;
          vertical-align: middle;
          line-height: 0.25rem;
          padding-left: 0.02rem;
          font-size: 0.12rem;
        }
        div {
          text-align: center;
          overflow: hidden;
        }
        div:first-child {
          padding-top: 0.08rem;
        }
      }
    }
    .conterend {
      width: 100%;
      height: 0.6rem;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #d5d5d5;
      display: flex;
      li {
        display: flex;
        width: 50%;
        justify-content: center;
        align-items: center;
        /*  flex-direction: column; */
        span {
          padding-left: 0.06rem;
        }
      }
      li:first-child img {
        height: 0.2rem;
        width: 0.18rem;
      }
      li:last-child img {
        height: 0.2rem;
        width: 0.18rem;
      }
    }
   
     .height{height:1rem;}
   
  }

}
</style>