<template>
  <div class="incomeBox">
      <!-- <headerBox title="收入类别"></headerBox> -->
    <div class="back">
      <div class="left" @click="gobacks">
        <i class="mintui mintui-back"></i>
      </div>
      <p>收入类别</p>
      <slot name="rightTo"></slot>
    </div>
       <ul>
          <li v-for="item in income"  :key="item.id"   @click="fnhang2(item.title)">{{item.title}}</li>
       </ul>
       <div class="height"></div>
      <button  class="zeng" @click="Newincome"><van-icon name="add-o" color="#ececec" /><span>新增子类</span></button>
  
   <!--  新增支出子类 -->
    <van-popup v-model="subclass" position="right" :style="{ height: '100%' ,width:'100%'}">
      <div class="subclass">
        <headerBox title="新增收入"></headerBox>
         <div class="back">
      <div class="left" @click="gobackt">
        <i class="mintui mintui-back"></i>
      </div>
      <p>新增收入</p>
      <slot name="rightTo"></slot>
    </div>
        <div class="newclass">
          <input type="text" placeholder="请输入。。。" v-model="addlei" />
          <button @click="Newkeep">保 存</button>
        </div>
      </div>
    </van-popup>
   
  </div>
</template>

<script>
import { Icon } from "vant";
import { Toast } from "vant";
export default {
  props: ["incomeId"],
   data(){
     return{
        income:[ ],
        subclass:false,
        addlei:"",
        new:"",
     }
   },
 methods:{
   //返回按钮
    gobacks() {
      this.$emit("inshandow", 0);
    },
    
    initprice2(){
      //收入项
      let postdata = {
               leibie: '2',    
            }
       this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
       this.$post('/rongtuojinrong/jizhang/cate/all.json',postdata).then(res=>{
      this.income=res.data.data;
      this.$toast.clear();
      console.log(res.data.data);
      
    })
},
     fnhang2(obj) {
       this.$emit("getincome", obj);
       this.$emit('inshandow',0);
       console.log(obj)
    },

Newincome(){
   this.subclass=true;
   },
   gobackt(){
     this.subclass= false; 
   },

   //保存添加收入子类
   Newkeep(){  
     if(this.addlei==""){
      Toast("请输入新增子类内容！");
          return false;
     }
     this.$post('/rongtuojinrong/jizhang/cate/add.json',{
       leibie:2,
       title:this.addlei,

     }).then(res=>{
       this.new=res.data.data; 
      // this.$router.go(-1);
       this.subclass=false;
     })
   },
 },
created(){
   this.initprice2();  
  }
}
</script>

<style lang="scss">
 .incomeBox {
  padding-top: 0.5rem;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
   ul{
       li{
            border-bottom: 1px solid #efefef;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: left;
            padding: 0 0.15rem;
         
       }
   }
    .height{height:1rem;} 
   .zeng {
      border: none;
      height: 0.3rem;
      border-bottom: 1px solid #efefef;
      background:#555;
      width: 100%;
      text-align: center;
      padding-left: 0.18rem;
      position: fixed;
      bottom:0;
      left:0;
      color:#fff;
      z-index: 12;
      .van-icon {
        position: relative;
        font: 14px/1 "vant-icon";
        font-size: 0.16rem;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        vertical-align: middle;
        padding-right: 0.05rem;
      }
      span{vertical-align: middle;}
    }
    .subclass {
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    position: absolute;
    .newclass {
      margin: 0.6rem 0.18rem;
      input {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        width: 100%;
        border: none;
        border-bottom: 1px solid #009989;
        padding-left:0.02rem;
         background: #f9f9f9;
      }
      button{
        background:#0159d5;
        border:none;
        color:#fff;
        border-radius:0.04rem;
        width: 100%;
        height:0.44rem;
        margin-top:0.2rem;
        line-height: 0.44rem;
        text-align: center;
        font-size: 0.14rem;
      }
    }
  }
  .back {
    width: 100%;
    height: 0.5rem;
    border-bottom: 1px solid #ddd;
    // padding:0 0.1rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 10;
    .left {
      width: 0.2rem;
      height: 0.5rem;
      position: absolute;
      top: 0rem;
      left: 0.1rem;
      z-index: 10;
      i {
        height: 0.5rem;
        line-height: 0.5rem;
        display: block;
        font-size: 0.16rem;
      }
    }
    p {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      color: #404040;
      text-align: center;
      position: absolute;
      top: 0rem;
    }
    .right_content {
      position: absolute;
      top: 0rem;
      right: 0.1rem;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }

  }
</style>