<template>
  <div class="timeincomeBox">
     <div class="back">
            <div class="left"  @click="gobackt">
                <i class="mintui  mintui-back"></i>
            </div>
            <p>选择日期类型</p>
            <slot name="rightTo"></slot>
        </div>
    <ul>
      <li v-for="(center,index) in datetitle" :key="index" @click="getime(center)">{{center.name}}</li>
      <!-- <li>昨日</li>
      <li>本周</li>
      <li>上周</li>
      <li>本月</li>
      <li>上月</li>
      <li>最近三个月</li>
      <li>本季</li>
      <li>上季</li>
      <li>今年</li>
      <li>去年</li>
      <li>最近7天</li>
      <li>最近30天</li> -->
    </ul>
  </div>
</template>

<script>
import { Icon } from "vant"; 
export default {
 props:['dateId'],
  data(){
    return{
    datetitle:[
       {name:'今日',id:0},
       {name:'昨日',id:1},
       {name:'本周',id:2},
       {name:'上周',id:3},
       {name:'本月',id:4},
       {name:'上月',id:5},
       {name:'最近三个月',id:6},
       {name:'本季',id:7},
       {name:'上季',id:8},
       {name:'今年',id:9},
       {name:'去年',id:10},
       {name:'最近7天',id:11},
       {name:'最近30天',id:12},  
    ] 
    }
  },
  methods:{
    gobackt(){
     this.$emit('hidatedow',0); 
    },
    getime(obj){
     this.$emit("getdate",(obj));
     console.log(obj);
   }
  }     
};
</script>

<style lang="scss">
 .timeincomeBox {
 margin-top: 0.5rem;
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