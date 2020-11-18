<template>
  <div class="bookBox">
    <headerBox title="记一笔"></headerBox>
    <div class="booktext">
      <van-tabs v-model="active"  @click="onclick">   <!--  -->
        <van-tab title="支出">
          <input type="number" placeholder="0.00" class="money red"  v-model="moneys"/>
           <input type="text"    :value="qbankname"   class="money"  @click="leishow = true" /> 
         <!--  <router-link tag="input" type="text" v-model="conter"    :value="qbankname"  class="money"   :to="{name:'paygenre'}"></router-link> -->
          <div class="bztime">
            <input type="text" placeholder="备注..." class="beizhu"  v-model="bztext" />
            <button @click="openPicker">
              <img src="../../../assets/biao3.png" /><span >{{startdate}}</span>
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
          :title="startdate"
        />
      </van-popup>

         <van-tab title="收入">
             <input type="number" placeholder="0.00" class="money clv"  v-model="moneys2" />
            <!--  <router-link tag="input" type="text"  class="money"  v-model="income"  :to="{name:'income'}"></router-link> -->
               <input type="text"    :value="income"   class="money"  @click="incomeleishow = true" /> 
            <div class="bztime">
              <input type="text" placeholder="备注..." class="beizhu"  v-model="bztext2"/>
            <button  @click="openPicker">
              <img src="../../../assets/biao3.png" /><span >{{startdate}}</span>
            </button>
          </div>
        </van-tab>

         <van-tab title="借贷">
           <input type="number" placeholder="0.00" class="money"  v-model="moneys3"/>
            <div class="twoinput">
                 <input type="text" value="借入" @click="populve" v-model="borrow" > 
                 <input type="text" placeholder="债权人"  v-model="nameborrow" />
            </div>
            <div class="bztime">
              <input type="text" placeholder="备注..." class="beizhu" v-model="bztext3" />
            <button  @click="openPicker">
              <img src="../../../assets/biao3.png" /><span >{{startdate}}</span>
            </button>
          </div>
        </van-tab> 
      </van-tabs> 

<!-- 借贷类型 -->
  <div class="tans">
   <van-action-sheet v-model="show" title="借贷类型"  :actions="actions"  @select="onSelect">
   </van-action-sheet> 
 </div>
     <div class="bookend">
          <button @click="Keep(1)">保存再记</button>
          <button @click="Keep(2)">保存</button>
      </div>
      <!-- 编辑 -->
     <div class="bookend" v-show="edshow">
          <button @click="Delete">删除</button>
          <button @click="editor">保存</button>
      </div>

    </div>

<!-- 支出类型 -->
<div class="newcc">
<van-popup v-model="leishow"  position="right" :style="{ height: '100%' ,width:'100%'}">   
     <leititle :leiId="leiclassid" @hidshandow="hidshandow" @getbank="getbank"></leititle>  
</van-popup>
</div>
<div class="newcc">
<!-- 收入类型 -->
 <van-popup v-model="incomeleishow"  position="right" :style="{ height: '100%' ,width:'100%'}">   
     <incomelist :incomeId ="incomeleiclassid" @inshandow="inshandow" @getincome="getincome"></incomelist>  
</van-popup> 
</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import { DatetimePicker } from 'vant';
import { Toast } from "vant";
import leititle from '../booking/paygenre.vue';
import incomelist from '../booking/income.vue';
import { formatDate } from "../../../modules/datab.js";
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
      moneys2:'', //金额
      moneys3:'', //金额
      qbankname:'早餐',//支出项
      bztext:"" , //备注
      bztext2:"",
      bztext3:"",
      leishow:false,
      incomeleishow:false,
      leiclassid:"" ,
      incomeleiclassid:"",//收入项
      startdate:"" ,
      newtime:"",
      state1:1,
      borrow:"借入",//借贷类型
      income:"工资薪水",//收入类型
      nameborrow:"",
      edshow:false,
    };
  },
  components:{
    leititle,
    incomelist,
  },
  methods:{
    getRoute(){
      this.edshow = true;
    },
   onSelect(item) {
      this.show = false;
      //Toast(item.name);
      this.borrow = item.name;
      console.log(this.borrow);
    },
  onclick(){
      this.state1 = this.active+1;
      console.log(this.state1);  
      },  
     getbank(val){
      console.log(val);
      this.leishow = false;
      this.qbankname = val;
    }, 
   hidshandow(val){
      this.leishow = false;
    },

    getincome(val){
      this.incomekleishow = false;
      this.income = val;
    },
     inshandow(val){
        this.incomeleishow = false;
     },

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
        // this.$refs["termStart"].innerHTML = timer;
        this.startdate = timer; 
        //   this.newtime = Math.round(value/1000); .getTime()
        //this.start = this.newtime;

        this.newtime  = Math.round(value/1000);
        console.log(this.newtime);
        this.timeshow = false;
        this.datePicker = "";
    },
    //保存
    Keep(a){
    if(this.active==0){
      this.money =  this.moneys; //钱
      this.cate_title = this.qbankname;//类别
      this.remarks = this.bztext;//备注
      //this.newtime = ;//时间
        if(this.moneys==""){
          Toast("请输入金额！");
        } 
     }
     if(this.active==1){
       this.money =  this.moneys2;
       this.cate_title = this.income;
       this.remarks = this.bztext2;
        if(this.moneys2==""){
          Toast("请输入金额！");
        } 
     }
    if(this.active==2){
      this.money = this.moneys3;
      this.cate_title = this.borrow;
      this.remarks = this.bztext3;
      if(this.moneys3==""){
         Toast("请输入金额！");
         return false;
     } 
     if(this.nameborrow==""){
       Toast("无效债权人，请检查后重试！");
        return false;
     }
    }
      this.$post("/rongtuojinrong/jizhang/add.json",{
      state:this.state1,
      money:this.money,
      cate_title:this.cate_title,
      date:this.newtime,
      //date:this.start,
      remark:this.remarks,
      }).then(res=>{
           if(a==1){
             if(res.data.status==0){
              location.reload();
        }
    }
        else{
             if(res.data.status==0){
           setTimeout(() => {
          this.$router.push("/booking");
        }, 1000);

        }
    }
      }) 
  
    }, 
    //内容编辑  this.$route.query
    editor(){
      var date = this.$route.query.dates.split(' ');
      var start = date[0]+' '+date[2]; 
      var timegetime = (new Date(start)).getTime()/1000;
      this.state1 = this.$route.query.state;
      this.active=this.$route.query.state-1;
       if(this.active==0){
       this.money =  this.moneys; //钱
       this.cate_title = this.qbankname;//类别
       this.remarks = this.bztext;//备注
        if(this.moneys==""){
          Toast("请输入金额！");
        } 
     }  
     if(this.active==1){
       this.money =  this.moneys2;
       this.cate_title = this.income;
       this.remarks = this.bztext2;
        if(this.moneys2==""){
          Toast("请输入金额！");
        } 
     }
    if(this.active==2){
      this.money = this.moneys3;
      this.cate_title = this.borrow;
      this.remarks = this.bztext3;
      if(this.moneys3==""){
         Toast("请输入金额！");
         return false;
     } 
     if(this.nameborrow==""){
       Toast("无效债权人，请检查后重试！");
        return false;
     }
    } 
        this.$post('/rongtuojinrong/jizhang/edit.json',{
        state:this.state1,
        money:this.money,
        cate_title:this.cate_title,
        //date:this.newtime,
        date:timegetime,
        remark:this.remarks,
        id:this.$route.query.id,
      }).then(res=>{
        console.log(timegetime);
       this.$router.push("/definite");
      })
    },
    Delete(){
       this.$post('/rongtuojinrong/jizhang/delete.json',{
         id:this.$route.query.id,
       }).then(res=>{
         setTimeout(() => {
          this.$router.push("/definite");
        },);
         
       })
    },
  },
  created(){
     //设置当前日期
     console.log(this.$route.query.dates);
    var time1 = this.$moment(new Date()).format('YYYY-MM-DD H:mm');
    this.startdate = time1;
    this.newtime = Math.round(new Date()/1000);
    if(this.$route.query.state){
      this.edshow = true;
      var date = this.$route.query.dates.split(' ');
      this.startdate = date[0]+' '+date[2]; 
      this.time2 = (new Date(this.startdate)).getTime()/1000;
      //console.log( this.start);
      this.state1 = this.$route.query.state;
      this.active=this.$route.query.state-1;
      //明细列表传输过来的数据
      if(this.$route.query.state==1){
          //this.active=0;
         // this.active=this.$route.query.state-1;    
          this.moneys= this.$route.query.money;
          this.qbankname =this.$route.query.cate_title;
         // this.state1 = this.$route.query.state;
         /*  var date = this.$route.query.dates.split(' ');
          this.start = date[0]+' '+date[2];  */
          this.bztext = this.$route.query.remark;
      }
       if(this.$route.query.state==2){
         //this.active=this.$route.query.state-1;
         this.moneys2= this.$route.query.money;
         this.income =this.$route.query.cate_title;
         this.bztext2 = this.$route.query.remark;
      }
        if(this.$route.query.state==3){
          this.moneys3= this.$route.query.money;
          this.borrow =this.$route.query.cate_title;
          this.bztext3 = this.$route.query.remark;
      }
    }else{
      this.edshow = false;
    }
    
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
        } .disno{display: none;}
  .booktext {
    padding-top: 0.5rem;
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
        bottom:0.1rem;
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
input::-webkit-input-placeholder{
            color:#999;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
           color:#999;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#999;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
           color:#999;
        }
 .newcc{
   .van-popup--right{-webkit-transform: none;
    transform:none !important;
    top:0;}
 }
 
}
</style>