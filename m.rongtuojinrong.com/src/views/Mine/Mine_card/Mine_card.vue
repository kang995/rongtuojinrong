<template>
    <div class="creditorBox">
        <div class="creditorC">
            <mt-header title="我的卡券包" fixed>
                <router-link to="/mine" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>     
            </mt-header>
            <ul class="nav">
            <router-link :to="{name:'redEnvelope'}" tag="li" class="header-nav-a" >红包券</router-link>
            <router-link :to="{name:'addInterest'}" tag="li" class="header-nav-a" >加息券</router-link>
            <router-link :to="{name:'experience'}" tag="li" class="header-nav-a" >体验金</router-link>      
            </ul>
        </div>        
        <router-view></router-view>
    </div>
    
</template>

<script>
import headerbar from '@/components/header'
export default {
    components:{
        headerbar

    },
  
}
</script>

<style lang="scss" scoped>


 body{
     .creditorBox{
            width: 100%;
            min-height: 100%;
            position: absolute;
            background-color: #e7eaf1;
         .creditorC{
            .mint-header {
            color: black;
            font-size: 0.15rem;
            background: #fff;
            height: 0.5rem;
            border-bottom: 1px solid rgb(229, 233, 242);
            .mint-popup {
                border-radius: 0.1rem;
            }

            .mint-button-icon {
                color: #333333;
            }
            .mint-header-title {
                font-size: 0.15rem;
                color: #333333;
            }
            .mint-button-text {
                display: block;
                color: #333333;
                font-weight: normal;
                margin: 0;
            }
        }
            .mint-header {
            color: black;
            font-size: 0.15rem;
            background: #fff;
            height: 0.5rem;
            border-bottom: 1px solid rgb(229, 233, 242);
            .mint-popup {
                border-radius: 0.1rem;
            }

            .mint-button-icon {
                color: #333333;
            }
            .mint-header-title {
                font-size: 0.15rem;
                color: #333333;
            }
            .mint-button-text {
                display: block;
                color: #333333;
                font-weight: normal;
                margin: 0;
            }
        }
            .nav {
            display: flex;
            height: 0.33rem;
            width: 100%;
            position: fixed;
            margin-top: 0.5rem;
            background-color: #fff;
            .header-nav-a {
                width: 33.3%;
                height: 0.32rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                }
            .router-link-active {
                line-height: 0.32rem;
                border-bottom: 1px solid #3776f7;
                color: #3776f7;
                }
            }                      
         } 

        
    }
 }
</style>
