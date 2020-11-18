<template>
  <div class="mineBox">
    <div v-if="this.$store.state.invite.invite.is_md==0" class="header">
      <router-link to="/Myinformation" class="header-a header-left">
        <img :src="this.$store.state.invite.invite&&this.$store.state.invite.invite.avatar" />
        <span>{{this.$store.state.invite.invite&&changeValue()}}</span>
      </router-link>

      <div class="header-a header-center">我的账户</div>
      <router-link :to="{name:'service'}" tag="div" class="header-a header-right">
        <img src="../../assets/img51.png" />
      </router-link>
    </div>
    <div v-else class="header-1">
      <router-link to="/Myinformation" class="header-a header-left">
        <img :src="this.$store.state.invite.invite&&this.$store.state.invite.invite.avatar"/>
        <span>{{this.$store.state.invite.invite&&changeValue()}}</span>
      </router-link>

      <div class="header-a header-center">我的账户</div>
      <router-link :to="{name:'service'}" tag="div" class="header-a header-right">
        <img src="../../assets/ld_07.png" />
      </router-link>
    </div>
    <Banner></Banner>
    <mineContent></mineContent>
    <Tabbar></Tabbar>
    <!-- 签到弹出窗 -->
    <mt-popup v-model="popupVisible">
        <p>
          <img src="../../assets/points.png" alt="">
        </p>
        <p>{{popData.num}}</p>
        <p>恭喜获得签到积分</p>
    </mt-popup>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import Banner from "./Mine_banner";
import mineContent from "./Mine_content";
import { stat } from 'fs';
import {mapState} from 'vuex';
export default {
  data(){
    return{
      personal:'',
      popupVisible:false,//弹出窗变量
      popData:''//存储签到积分
      // value1:'',
    }
  },
  components: {
    Tabbar,
    Banner,
    mineContent
  },
  computed:{
    // ...mapState({
    //   value:state=>state.invite.invite.realname// 以回调函数的形式拿到状态
    // }),
    value:{
      get(){
        return this.$store.state.invite.invite.realname;
      },
      set(val){
        this.$store.state.invite.invite.realname = val
      }
    },
  },
  methods:{
    // 1.将姓用*号替换
    changeValue(){
      var reg = /^(\S{1})/;
      this.value = this.value.replace(reg, "*"); //replace方法的返回值是一个新字符串，原字符串并没有改变
      return this.value;//value为计算属性的值，会依赖与缓存，缓存的返回值是replace方法替换后的字符串
    },
    //2.弹出窗方法(自动签到功能)
    changePoints(){
        this.$post('/rongtuojinrong/activity/qiandao/apply.json',{
            user_id:this.$store.state.login.token.user_id
        }).then(res=>{
          this.popData = res.data.data;
          if(res.data.status==0){
            this.popupVisible = true;
            setTimeout(() => {
               this.popupVisible = false;
            }, 2000);
          }
          // console.log(res.data)
        })
        
    }
  },
  created(){
    this.changePoints();
      // this.value = this.$store.state.invite.invite.realname;
      // var reg = /^(\S{1})/;
      // this.value = this.value.replace(reg, "*");
  }
};
</script>

<style lang="scss" scoped>
.mineBox {
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  .header {
    img {
      width: 0.3rem;
      border-radius: 50%;
    }
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    background-color: #ffffff;
    font-size: 0.15rem;
    position: fixed;
    width: 100%;
    padding: 0 0.2rem;
    .header-a {
      width: 33%;
    }
    .header-left {
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        margin-right: 0.1rem;
      }
    }
    .header-center {
      text-align: center;
    }
    .header-right {
      text-align: right;
      img {
        display: inline-block;
        width: 0.2rem;
      }
    }
  }

  .header-1 {
    background-color: #0058d5;
    img {
      width: 0.3rem;
      border-radius: 50%;
    }
    height: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 0.15rem;
    position: fixed;
    width: 100%;
    padding: 0 0.2rem;
    .header-a {
      width: 33%;
      color: #fff;
    }
    .header-left {
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        margin-right: 0.1rem;
      }
    }
    .header-center {
      text-align: center;
    }
    .header-right {
      text-align: right;
      img {
        display: inline-block;
        width: 0.2rem;
      }
    }
  }
  .mint-popup{
    background-color:transparent;
    p:nth-child(1){
      width:100%;
      img{
        width:100%;
      }
    }
    p:nth-child(2){
      width:1.68rem;
      height:1.05rem;
      display:flex;
      justify-content:center;
      align-items:center;
      font-size:0.38rem;
      color:#dcd519;
    }
    p:nth-child(3){
      font-size:0.21rem;
      color:#fff;
    }
  }
}

</style>
