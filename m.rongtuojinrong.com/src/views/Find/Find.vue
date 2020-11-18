<template>
    <div class="findBox">
        <div class="header" ref='topHeader'>发现更多精彩</div>  
        <Banner></Banner>          
        <Appcontent></Appcontent>
        <New></New>
        <Tabbar></Tabbar>
    </div>
</template>



<script>
import Banner from './find_banne'
import Appcontent from './conter'
import New from './conter_text'
import Tabbar from '@/components/Tabbar'
export default {
    components:{
        Banner,
        Appcontent,
        New,
        Tabbar
    },
      //在页面离开时记录滚动位置
beforeRouteLeave (to, from, next) {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // console.log(this.scrollTop);
    next()
  },
//进入该页面时，用之前保存的滚动位置赋值
beforeRouteEnter (to, from, next) {
    next(vm => {
// console.log(vm);
      document.body.scrollTop = vm.scrollTop
      
    //   console.log(vm.scrollTop);
    })
  }
}
</script>

<style lang="scss" scoped>
    .findBox{
        width:100%;  
        // height:0.5rem;
        background:#f9f9f9;
       /*  padding:0 0.20rem 0 0.20rem; */
        margin-bottom:5px;
         button,img{padding:0;}
        .header{
            width:100%;
            height:0.5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#333;
            font-size: 0.15rem;
             background: #f9f9f9;
             position:fixed;
             top:0;
             z-index:10;
            }
    }
</style>
