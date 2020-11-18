<template>
<!--未出借时导航页-- 未出借时显示，已出借时隐藏 （根据出借状态显示或隐藏）-->
    <div class="nav_newBox" v-show="!isShow">
       <div class="newBox">
           <router-link :to="{name:'introduce'}" tag="li">
               <img src="../../../assets/平台介绍.png" alt="">
               <span>平台介绍</span>
           </router-link>
           <router-link :to="{name:'platform'}" tag="li">
               <img src="../../../assets/风控体系.png" alt="">
               <span>风控体系</span>
           </router-link>
           <router-link tag="li" :to="{name:'message',query:{title:title}}">
               <img src="../../../assets/平台数据.png" alt="">
               <span>平台数据</span>
           </router-link>
           <router-link tag="li" :to="{name:'help'}">
               <img src="../../../assets/新手帮助.png" alt="">
               <span>新手帮助</span>
           </router-link>
       </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return{
            title:'平台数据',
            isShow:false//控制出借状态变量
        }
    },
    computed:{
        ...mapState({
            invest_count:state=>state.login.token.invest_count// 以回调函数的形式拿到状态
        })
    },
    methods:{
        getToken(){
            if(+this.invest_count){//判断出借状态(0-N)
                this.isShow= true;
           }
        }
    },
    created(){
        this.getToken();
    }
}
</script>

<style lang="scss">
    .nav_newBox{
        width:100%;
        height:0.96rem;
        background:#fff;
        padding:0 0.20rem;
        .newBox{
            width:100%;
            height:0.96rem;
            display:flex;
            justify-content:space-between;
            align-items:center;
            li{
                width:25%;
                height:0.96rem;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                
                img{
                    width:0.56rem;
                    height:0.56rem;
                }
                span{
                    color:#1a1a1a;
                    font-size:0.12rem;
                    // margin-top:0.07rem;
                }
            }
        }
    }
</style>
