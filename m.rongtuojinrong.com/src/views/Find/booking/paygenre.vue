<template>
  <div class="zhichubox">
    <!-- <headerBox title="支出类别"></headerBox> -->
    <div class="back">
      <div class="left" @click="goback">
        <i class="mintui mintui-back"></i>
      </div>
      <p>支出类别</p> 
      <slot name="rightTo"></slot>   
    </div>

    <div class="box">

      <div class="tabs clearfix">

        <div  class="cc">
          <!-- 类别 -->
             <ul class="boxclass"  >
                <li  v-for="(item,index) in paygen" :key="index"  :class="{active : index===curId}" @click="tab(index)">{{item.typeTotalName}}</li>
             </ul>
          <!--  子类别 -->
          <div class="let" v-show="index===curId"  v-for="(item,index) in paygen" :key="index">
            <div class="tab-card"  v-for="itemt in item.typeDetailArr" :key="itemt.id"  
              @click="fnhang(itemt.title)"
            >{{itemt.title}}
            </div> 
               <button class="zeng" @click="newlei(item.id)">  <van-icon name="add-o" color="#ececec" />新增子类 </button>         
          </div>

        </div>    

      </div>

    </div>

<div class="append">
    <van-popup v-model="subclass" position="right" :style="{ height: '100%' ,width:'100%'}">
      <div class="subclass">
    <div class="back">
      <div class="left" @click="gobackc">
        <i class="mintui mintui-back"></i>
      </div>
      <p>新增支出类别</p>
      <slot name="rightTo"></slot>
    </div>
        <div class="newclass">
          <input type="text" placeholder="请输入。。。" v-model="addcss" />
          <button @click="addsubcss">保 存</button>  <!--  -->
        </div>
      </div>
    </van-popup>
  </div>


  </div>
</template>

<script>
import { Icon } from "vant";
import { Toast } from "vant";
export default {
  props: ["leiId"],
   /* provide(){
     return {
       reload:this.reload
     }
   }, */

  data() {
    return {
      subclass: false,
      paygen: [],
      name: "",
      paylist: [],
      obj: {},
      curId: 0,
      addcss:"",
      addval:""
    };
  },
  methods: {
    //showList() {},
    tab(index) {
      this.curId = index;
    },
  //新增子类按钮
    newlei(val) {
      this.subclass = true;
      console.log(val);
      this.addval = val;
    },
    Subclass(item) {

      console.log();
    },
    //返回按钮
    goback() {
      this.$emit("hidshandow", 0);
    },

    gobackc(){
      this.subclass = false;
    },
    
      initprice(){
            let postdata = {
               leibie: '1',    
            }
            this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            this.$post('/rongtuojinrong/jizhang/cate/all.json',postdata).then(res=>{
                this.paygen = res.data.data;
                this.$toast.clear();
                console.log(res.data.data);
            })
        },

   fnhang(obj) {
       this.$emit("getbank", obj);
       this.$emit('hidshandow',0);
    },
    //新增子类
    addsubcss(){
      if(this.addcss==""){
          Toast("请输入新增子类内容！");
          return false;
      }
      this.$post("/rongtuojinrong/jizhang/cate/add.json",{
        leibie:1,
        title:this.addcss,
        pid:this.addval,
      }).then(res=>{
           this.subclass = false;
          this.initprice();
          this.addcss = "";
         //this.reload();
      })
    }, 
  },
  created() {
    this.initprice();
  }
};
</script>

<style lang="scss">
.zhichubox {
  padding-top:0.5rem;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  .box {
    width: 100%;
    height: 100%;

    .clearfix { 
     height: 100%;
     //background:#efefef;
      .active {
        background: #fff;
      }
       .cc{ height: 100%;


       .boxclass {
         width: 25%;
    height: 100%;
    float: left;
    background: #efefef;
    clear: both;
    position: fixed;
    bottom: 0;
    top: 0.5rem;

        li {
          clear: both;
          border: 1px solid #efefef;
          height: 0.4rem;
          padding-left: 0.18rem;
          line-height: 0.4rem;
          text-align: left;
          width: 100%;
        }
      }
    /*  .wai{width: 25%;height:100%;}  */

      .let {
        width: 75%;
        float: left;
         position: absolute;
        right:0;
        top:0.1rem; 
        .tab-card {
          border: 1px solid #efefef;
          height: 0.4rem;
          padding-left: 0.18rem;
          line-height: 0.4rem;
          text-align: left;
          clear: both;
        }
      }

       }
      

    
    }

    .zeng {
      border: none;
      height: 0.4rem;
      border-bottom: 1px solid #efefef;
      background: #fff;
      width: 100%;
      text-align: left;
      padding-left: 0.18rem;
   
      .van-icon {
        position: relative;
        font: 14px/1 "vant-icon";
        font-size: 0.16rem;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        vertical-align: middle;
        padding-right: 0.05rem;
      }
    }
  }

  .van-tree-select__nav {
    background: #efefef;
    .van-sidebar-item {
      display: block;
      box-sizing: border-box;
      //padding: 20px 12px 20px 8px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      // line-height: 20px;
      word-break: break-all;
      background-color: #efefef;
      border-left: 3px solid transparent;
      -webkit-user-select: none;
      user-select: none;
      height: 0.4rem;
    }
    .van-sidebar-item--select {
      color: #323233;
      font-weight: 500;
      background-color: #fff;
    }
  }
  .bkvanlist {
    background: #fff;
    height: 100%;
    li {
      border: 1px solid #efefef;
      height: 0.4rem;
      padding-left: 0.18rem;
      line-height: 0.4rem;
      text-align: left;
    }
  }

  .subclass {
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    position: absolute;
    .newclass {
      padding: 0.6rem 0.18rem;
      input {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        width: 100%;
        border: none;
        border-bottom: 1px solid #009989;
        padding-left: 0.02rem;
        background: #f9f9f9;
      }
      button {
        background: #0159d5;
        border: none;
        color: #fff;
        border-radius: 0.04rem;
        width: 100%;
        height: 0.44rem;
        margin-top: 0.2rem;
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
  .append{
    .van-popup{
    top: 0;
    -webkit-transform:none;
    transform: none !important;
}
.van-popup--right {-webkit-transform:none !important;
    transform: none !important;}
  }
}
</style>