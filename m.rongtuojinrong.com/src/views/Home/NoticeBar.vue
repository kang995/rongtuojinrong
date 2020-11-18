<template>
  <div id="NoticeBar">
    <div class="teo">
      <span class="teo-text">平台</span>
      <span class="teo-one">公告</span>
    </div>
<!--
    <router-link tag="div" :to="{name:'NoticeBarlistDetails',query:{article_id:bar.article_id}}" style="width:70%;">
        <van-notice-bar :text="'【网站公告】'+bar.title" color="#313131" background="#ffffff" :speed="65" style="width:100%;" />
    </router-link >
-->
    <div class="move_over">
       <div class="move_move" :style="{top:changeTop,transition:donghua}">
           <router-link tag="div" v-for="item in Bars" :key="item.id" :to="{name:'NoticeBarlistDetails',query:{article_id:item.article_id}}">
                 <div class="" >【网站公告】{{item.title}}</div>
           </router-link >
           <div class="" >【网站公告】{{bar.title}}</div>
       </div>
    </div>

    <span class="two-red">|</span>
    <div class="three">
      <router-link to="/NoticeBarlist" tag="span" class="three-text">更多</router-link>
    </div>
  </div>
</template>
<script>
import { NoticeBar } from "vant";
import Vue from "vue";
Vue.use(NoticeBar);
import qs from 'qs';
import { setInterval, setTimeout } from 'timers';
export default {
    name: "NoticeBar",
    data(){
      return{
        Bars:[],
        limit:6,
        page:1,
        otop:0,
        donghua:'all 0.5s',
        bar:[],
      }
    },
    methods:{
      getNoticeBar(){
        // var {limit,page} = this;
          // let postData = qs.stringify({ //向后台传入user_id
          //       cate_id:1,
          //       page,
          //       limit
          // });
        this.$post('/rongtuojinrong/article/lists.json',{
          cate_id:1,
          page:this.page,
          limit:this.limit
        }).then(res=>{
          this.Bars = res.data.data.list;
          this.bar =this.Bars[0];
          // console.log(this.Bars)

          // for(let index in this.Bars){
          //     this.i = index;
          //     console.log(this.i);
          // }

            // for(let value of this.Bars){
            //   this.bar1 = value;
            //   console.log(this.bar1);
            // }

            // var oDiv = document.getElementsByClassName("van-notice-bar__content")
            // console.log(oDiv[0].offsetLeft);
            //   if(oDiv[0].offsetLeft<=0){
            //          let _this = this;
            //         _this.bar = _this.Bars[0];
            //         var i = 0;
            //           setInterval(() => {
            //             i++;
            //             if(i == _this.Bars.length){
            //               i=0;
            //             }
            //             _this.bar = _this.Bars[i];
            //           }, 1000);
            //     }
        })
      },
        changeNum(){
            setInterval(() => {
                var atm = -0.4*(this.Bars.length+1)
                atm = atm.toFixed(1);
                this.otop = this.otop-0.4;
                if(this.otop==atm){
                    this.donghua = 'all 0s';
                    this.otop=0;
                    setTimeout(()=>{
                        this.donghua = 'all 0.5s';
                        this.otop=-0.4;
                    },10)
                }else{
                    this.donghua = 'all 0.5s';
                }

            }, 3000);
        }
    },
    created(){
      this.getNoticeBar();
      // this.changei();
        this.changeNum()
    },
    computed: {
        changeTop(){//关联变量值，比较适合对多个变量或者对象进行处理后返回一个结果值
            return this.otop+'rem';
        }
    }
};
</script>

 <style>
     .teo{
         width: 0.6rem;
     }
     .move_over{
         width: 2.4rem;
         height: 0.4rem;;
         overflow: hidden;
         position: relative;
     }
     .move_move{
         position: absolute;
         transition: top 0.5s;
     }
     .move_move>div{
       height: 0.4rem;
       display: flex;
       justify-content: flex-start;
       align-items: center;
     }
     .move_move div{
         white-space: nowrap;
         text-overflow: ellipsis;
         width: 2.4rem;
         overflow: hidden;
     }
#NoticeBar {
  width: 100%;
  height: 0.41rem;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e9f2;
}


.teo-text {
  font-size:0.14rem;
  color:#333;
  font-weight:bold;
}
.van-notice-bar {
  font-size: 14px;
  width: 70%;
  height: 40px;
}
.teo-one {
  font-size: 13px;
  border-radius: 15%;
  background-color: #ffffff;
  color: #ffffff;
  background-color: #fe2f4a;
}
.two-red {
  background-color: #ffffff;
  color: #f2f3fc;
}
.three-text {
  font-size: 14px;
  color: #0051d3;
}
</style>
