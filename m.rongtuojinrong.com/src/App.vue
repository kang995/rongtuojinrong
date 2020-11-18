<template>
<!-- <van-pull-refresh id="app" v-model="isLoading" @refresh="onRefresh">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
</van-pull-refresh> -->
    <div id="app">
      <!-- 融托金融 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
// import { PullRefresh } from 'vant';
  export default {
    data(){
      return{
        isLoading:false,
      }
    },
    created(){
      this.$store.getters.getToken;//本地取token
      this.$store.getters.getInvite;//本地取用户信息
      this.$store.getters.getDefidenshuxing; //此处是获取的方法名
      // this.$store.getters.getStatus//本地取status
      localStorage.setItem("script",0);
    },
    methods: {
      // onRefresh() {
      //   // this.route
      //   setTimeout(() => {
      //     this.isLoading = false;
      //     this.$router.replace({path:'/refresh',query: {t: Date.now()}});
      //   }, 1500);
      // }
    }
  }
</script>

<style lang="scss">
// div.van-pull-refresh__track {
//   position: absolute;
//   width: 100%;
//   // height:100%;
// }
// html #app iframe {
//   position: fixed;
//   margin: 0!important;
//   padding-top: 0.5rem;
//   box-sizing: border-box;
// }
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
