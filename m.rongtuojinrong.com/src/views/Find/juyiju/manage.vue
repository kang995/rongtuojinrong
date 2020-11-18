<!-- 聚一聚 管理报名--> 
<template>
  <div class="todayBox1">
    <!-- 头部 -->
    <!-- <mt-header title="我的发布">
      <router-link to="/m" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="head_nav">
      <router-link :to="{name:'mypublish'}" tag="li">我的发布</router-link>
      <router-link :to="{name:'manage'}" tag="li">管理报名</router-link>
    </ul> -->

    <div class="pulishBoxs">
       <div class="NOdata" v-if="this.sign==0" ><img src="../../../assets/sm_16.png"><P>暂无数据</P></div> 
        <div  v-else >
              <ul class="putlist"  v-for="item in manage"  :key="item.id" >
            <!--  ,activity_id:item.activity_id -->
          <li v-if="item.sub_status==3" @click="Nolisthidden" > 
          <div class="puma">
            <div class="left">
              <div class="left maing">
                <img :src= "item.avatar" alt />
              </div>
              <div class="left">
                <p class="c3">{{item.realname}} {{manage.sub_status}}</p>
                <p class="f12">{{item.sub_num}}</p>
              </div>
            </div>
            <div class="right">
              <p>
                  <span v-if="item.sub_status==1"  class="c3">已提交</span>
                  <span v-if="item.sub_status==2" class="cf5">已通过</span>
                  <span v-if="item.sub_status==3" class="c9">已结束 </span> 
              </p>
              <P class="f12 tr">{{item.joinlable}}</P>
            </div>
          </div> 
          <div class="mtime">
            <div class="left w40">{{item.submit_date}}</div>&nbsp;
            <div class="right w60 tr">{{item.topic}}</div>
          </div>
         </li> 

       <router-link v-else  tag="li" :to="{name:'mangdet',query:{user_Id:item.user_Id,activity_id:item.activity_id,realname:item.realname,mobile:item.mobile,sub_status:item.sub_status} }" 
        >   
           <!--  ,activity_id:item.activity_id -->
          <div class="puma">
            <div class="left">
              <div class="left maing">
                <img :src= "item.avatar" alt />
              </div>
              <div class="left">
                <p class="c3">{{item.realname}}</p>
                <p class="f12">{{item.sub_num}}</p>
              </div>
            </div>
            <div class="right">
              <p>
                   <span v-if="item.sub_status==1"  class="c3">已提交</span>
                  <span v-if="item.sub_status==2" class="cf5">已通过</span>
                  <span v-if="item.sub_status==3" class="c9">已结束</span> 
              </p>
              <P class="f12 tr">{{item.joinlable}}</P>
            </div>
          </div>
          <div class="mtime">
            <div class="left w40">{{item.submit_date}}</div>&nbsp;
            <div class="right w60 tr">{{item.topic}}</div>
          </div>
       </router-link>     
      </ul>
        </div>
    </div>

  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data (){
    return{
      manage:[],
      sign:""
    }
  },
methods:{
   getManage(){
     this.$post("/rongtuojinrong/activity/juyiju/my/ActivitySubmitList.json",{
        page:1,
        limit:5,
     }).then(res=>{
          this.manage = res.data.data.list;
          this.sign = res.data.data.count;
          console.log(this.manage); 
     });
   },
    Nolisthidden(){
   this.$toast("活动已结束，无法查看信息！");
  },
},
created(){
  this.getManage();
}     

};
</script>

<style lang="scss">
  .todayBox1 {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f9f9f9;
    position:absolute;
    padding-top:0.9rem;
     .left {
    float: left;
  }
  .right {
    float: right;
  }
  .displayNO {
    display: none;
  }
  .clear {
    clear: both;
  }
  .c3 {
    color: #333;
  }
  .c9 {
    color: #999;
  }
  .cf5 {
    color: #ff5715;
  }
  .c9 {
    color: #999;
  }
  .f12 {
    font-size: 0.12rem;
  }
  .tr {
    text-align: right;
  }
    .head_nav {
      //margin-top: 0.5rem;
      height: 0.46rem;
      overflow: hidden;
      li {
        width: 50%;
        float: left;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-bottom: 1px solid #e5e9f2;
        background: #fff;
      }
      .router-link-active {
        color: #0159d5;
        border-bottom: 1px solid #0159d5;
      }
    }
    .pulishBoxs {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 0.1rem 0.2rem;
      background: #f9f9f9;
      .putlist {
        margin-top: 0.1rem;
        border-radius: 0.1rem;
        li {
          color: #999;
          padding: 0.1rem;
          margin-bottom: 0.15rem;
          background: #fff;
          border-radius: 0.1rem;
          height: auto;
          overflow: hidden;
          .puma {
            height: 0.68rem;
            border-bottom: 1px solid #e5e9f2;
            padding-bottom: 0.1rem;

            .maing {
              width: 0.57rem;
              height: 0.57rem;
              overflow: hidden;
              border-radius: 0.2rem;
              margin-right: 0.1rem;
              img {
                width: 100%;
              }
            }
          }

          .mtime {
            clear: both;
           // overflow: hidden;
           // height: auto;
            font-size: 0.12rem;
            //text-overflow: ellipsis;
           // overflow: hidden;
           // white-space: nowrap;
            margin-top: 0.1rem;
            height: auto;
            span:nth-child(2) {
              color: #333;
            }
          }
          p{line-height: 0.28rem;}
          .w60{width:60%;color:#666;}  .w40{width:38%;}
        }
      }
      .NOdata{width: 100%;height:auto;overflow: hidden;margin:0.3rem  auto;
        img{width: 0.85rem;height:0.85rem;margin:auto;}
        p{text-align: center;color:#333;line-height: 0.5rem;}
      }
    }
  }
</style>
 