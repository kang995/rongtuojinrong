<template>
  <div class="fwincomeBox">
    <div class="back">
            <div class="left"  @click="goback">
                <i class="mintui  mintui-back"></i>
            </div>
            <p>查询条件</p>
            <slot name="rightTo"></slot>
        </div>

    <ul>
      <li @click="scopetie(name)" v-for="(name,index) in title" :key="index">{{name}}</li>
      <!-- <li @click="scopetie(2)">支出</li>
      <li @click="scopetie(3)">收入</li>
      <li @click="scopetie(4)">借贷</li> --> 
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  props:['scopeId'],
  data(){
    return{
     title:['全部','支出','收入','借贷']  
    }
  },
   methods:{
     goback(){      
        this.$emit('hidshandow',0);
        },
     scopetie(obj){
        this.$emit("getbank",obj);
       console.log(obj);
     }
   }
};
</script>

<style lang="scss">
 .fwincomeBox {
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
    .back{
        width: 100%;
        height:0.5rem;
        border-bottom:1px solid #ddd;
        // padding:0 0.1rem;
        background:#fff;
        position:fixed;
        top:0;
        z-index:10;
        .left{
            width:0.2rem;
            height:0.5rem;
            position:absolute;
            top:0rem;
            left:0.1rem;
            z-index:10;
            i{
                height:0.5rem;
                line-height:0.5rem;
                display:block;
                font-size:0.16rem;
            }
        }
        p{
            width:100%;
            height:0.5rem;
            line-height:0.5rem;
            font-size: 0.16rem;
            color: #404040;
            text-align:center;
            position: absolute;
            top:0rem;
        }
        .right_content{
            position:absolute;
            top:0rem;
            right:0.1rem;
            height:0.5rem;
            line-height:0.5rem;
        }
    }
 } 
</style>