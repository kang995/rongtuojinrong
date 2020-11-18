<template>
    <!--平台风控  ——首页风控体系跳转后的页面-->
    <div class="Nav_systemBox">
        <!-- 头部 -->
        <!-- <mt-header title="平台风控" fixed>
        <router-link to="/home" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        </mt-header> -->
        <headerBox title="平台风控"></headerBox>
        <!-- 导航条 -->
        <div class="systemNav">
            <ul class="nav">
                <!-- <router-link :class="['normal', (isShow ? 'active' : '')]" to="/platform/strength" tag="li" >平台实力</router-link>
                <router-link :class="['normal', (isShow ? 'active' : '')]" to="/platform/control" tag="li" >风控</router-link>
                <router-link :class="['normal', (isShow ? 'active' : '')]" to="/platform/deposit" tag="li">存管</router-link>
                <router-link :class="['normal', (isShow ? 'active' : '')]" to="/platform/system" tag="li" >系统</router-link>
                <router-link :class="['normal', (isShow ? 'active' : '')]" to="/platform/supervise" tag="li">遵从监管</router-link> -->
                <router-link 
                    replace
                    v-for="nav in navs" 
                    :key="nav.id" 
                    @click.native="type=nav.type" 
                    :class="{'active':type===nav.type}" 
                    :to="{name:nav.router}" tag="li"
                >{{nav.title}}</router-link>
            </ul>
        </div>
        <!-- 内容显示 -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow:false,
            type:"isShow1",
            navs:[
                {id:1,title:'平台实力',type:"isShow1",router:"strength"},
                {id:2,title:'风控体系',type:"isShow2",router:"control"},
                {id:3,title:'银行存管',type:"isShow3",router:"deposit"},
                {id:4,title:'技术措施',type:"isShow4",router:"system"},
                {id:5,title:'遵从监管',type:"isShow5",router:"supervise"},
            ]
        }
    }
}
</script>

<style lang="scss">
    .Nav_systemBox{
        width:100%;
        height:100%;
            .mint-header {
                background: #fff;
                height: 0.5rem;
                .mint-button-icon {
                    color: #404040;
                }
                .mint-header-title {
                    font-size: 0.18rem;
                    color: #010101;
                }
            }
        .systemNav{
            width:100%;
            padding:0 0.15rem 0 0.11rem;
            background:#002049;
            margin-top:0.5rem;
            position:fixed;
            top:0;
            z-index:10;
            .nav{
                width:100%;
                height:0.45rem;
                display:flex;
                justify-content:space-between;
                align-items:center;
                li{
                    height:0.45rem;
                    color:#ccc;
                    font-size:0.14rem;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                   
                }
                .active{
                    line-height:0.45rem;
                    color:#ff6633;
                    border-bottom:1px solid #FF6633;
                }
                //  .router-link-active{
                //     line-height:0.45rem;
                //     color:#ff6633;
                //     border-bottom:1px solid #FF6633;
                // }
              
            }
        }
        .content{
            width:100%;
            background:#003f8e;
            padding-bottom:0.3rem;
            margin-top:0.95rem;
        }
    }
</style>