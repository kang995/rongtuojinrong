
<template>
<!-- 改文件暂不需要 -->
  <div class="bookBox">
    <headerBox title="记一笔"></headerBox>
    <div class="booktext">
      <van-tabs v-model="active">
        <van-tab title="支出">
          <input type="number" placeholder="0.00" class="money red"  v-model="moneys"/>
          <!-- <input type="text" value="早餐" class="money" /> -->
          <router-link tag="input" type="text" v-model="conter"  class="money"  :to="{name:'paygenre'}"></router-link>

          <div class="bztime">
            <input type="text" placeholder="备注..." class="beizhu"  v-model="bztext" />
            <button @click="openPicker">
              <img src="../../../assets/biao3.png" /><span ref="termStart">{{start}}</span>
            </button>
          </div>

        </van-tab>
         <van-popup v-model="timeshow"  :style="{ width:'90%',border:'none'}">
        <van-datetime-picker
          v-model="startTime"
         type="datetime"
          :visible-item-count="3"
          @cancel="cancelPicker"
          @confirm="confirmPicker"
          datePicker="startTime"
          :title="start"
        />
      </van-popup>

        <van-tab title="收入">
             <input type="number" placeholder="0.00" class="money clv" />
           <!--   <input type="text" placeholder="工资薪水" class="money" /> -->
            <router-link tag="input" type="text" value="工资薪水" class="money"  :to="{name:'income'}"></router-link>
           
            <div class="bztime">
              <input type="text" placeholder="备注..." class="beizhu" />
            <button>
              <img src="../../../assets/biao3.png" /><span>2019-10-28 15:34</span>
            </button>
          </div>
        </van-tab>
        <van-tab title="借贷">
           <input type="number" placeholder="0.00" class="money" />
            <div class="twoinput">
                 <input type="text" value="借入" @click="populve" > <!--  -->
                 <input type="text" placeholder="债权人"  />
            </div>
            <div class="bztime">
              <input type="text" placeholder="备注..." class="beizhu" />
            <button>
              <img src="../../../assets/biao3.png" /><span>2019-10-28 15:34</span>
            </button>
          </div>
        </van-tab>
      </van-tabs>

<!-- 借贷类型 -->
 <div class="tans">
   <van-action-sheet v-model="show" title="借贷类型"  :actions="actions" ><!--  position="conter" -->
   </van-action-sheet> 
 </div>

      <div class="bookend">
          <button>保存再记</button>
          <button @click="Keep">保存</button>
      </div>
    </div>
  </div>
</template>  

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import { DatetimePicker } from 'vant';
export default {
  data() {
    return {
      active: 0,
      show:false,
      timeshow:false,
      startTime: new Date(), // 开始时间
      actions: [
        { name: '借出' },
        { name: '借入' },
      ],
      moneys:'', //金额
      conter:"", //支出项
      bztext:""  //备注
    };
  },
  methods:{
    populve(){
      this.show=true;
    },
     openPicker() {
      ////活动截止弹出层并显示时间选择器
      this.timeshow = true;
      //this.datePicker = picker;
    },
    //取消
    cancelPicker() {
      this.timeshow = false;
      //this.datePicker = "";
    },
    //第一个弹窗确定
    confirmPicker(value) {
       var date = value;
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var min = date.getMinutes();
      var timer = date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
      this.$refs["termStart"].innerHTML = timer;
      this.timeshow = false;
      this.datePicker = "";
      //this.start = timer;
    },
    //保存
    Keep(){
      this.$post("/rongtuojinrong/jizhang/add.json",{
       leibie:1,
       money:this.moneys,
       cate_title:this.conter,
      }).then(res=>{
        
      })
    }
  },
  created(){
     //获取当前日期
    var time1 = this.$moment(new Date()).format('YYYY-MM-DD H:mm');
    //this.jfendtime = time1;
    this.start = time1;
  }
};
</script>

<style  lang="scss">
.bookBox {
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
  }
  .red {
    color: #df2800;
  }.clv {
          color: #72d881;
        }
  .booktext {
    margin-top: 0.5rem;
    .money {
      width: 100%;
      height: 0.46rem;
      border: none;
      border-bottom: 1px #a1a1a1 solid;
      padding: 0 0.2rem;
    }
    .bztime {
      padding: 0 0.18rem;
      .beizhu {
        width: 52%;
        float: left;
        border: none;
        height: 0.3rem;
        border-bottom: 1px solid #5c5c5c;
      }
      button {
        width: 44%;
        background: #a6a6a6;
        height: 0.22rem;
        float: left;
        border: none;
        color: #fff;margin:0.08rem 0 0 0.1rem;
        img {
           width: 0.14rem;
           height: 0.14rem; 
          display: inline-block;
          vertical-align:middle;
        }
        span{vertical-align:middle;padding-left:0.05rem;}
      }
    }
    .bookend{
        position: fixed;
        left:7%;
        bottom:0;
        margin:auto;
        button{width: 1.55rem;height: 0.3rem;background: #003d8e;color:#fff;
        text-align: center;line-height: 0.3rem;border:none;margin-right:0.1rem;float: left;display:block;}
        button:last-child{margin-right:0;}
    }
    .twoinput input{width: 50%;float: left;height: 0.46rem;border:none;border-bottom: 1px #a1a1a1 solid;padding-left:0.2rem;}
      .van-tabs .van-tabs__line{width: 33% !important;background: #0159d5;}
    [class*=van-hairline]::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-bottom: 1px solid #000;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}
  }
  .tans{
      .van-popup--bottom {
    /* bottom: 0; */
    left: 21%;
    width: 60%;
    /* margin: auto; */
    top: 30%;
    height: 1.12rem;
    font-size: 0.14rem;
}
.van-action-sheet__header{background: #dddddd;} .van-action-sheet__item {
    height: 40px;line-height: 42px;
}
[class*=van-hairline]::after {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-bottom: 1px solid #a1a1a1;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
  }


}
</style>