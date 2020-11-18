<template>
    <div class="tabbarBox">
        <TabItem txt="首页" mark="home" :sel="selected">
            <img slot="normalImg" src="../../assets/home_normal.png" alt="">
            <img slot="activeImg" src="../../assets/home_active.png" alt="">
        </TabItem>
        <TabItem txt="项目" mark="project" :sel="selected">
            <img slot="normalImg" src="../../assets/project_normal.png" alt="">
            <img slot="activeImg" src="../../assets/project_active.png" alt="">
        </TabItem>
        <TabItem txt="发现" mark="find" :sel="selected">
            <img slot="normalImg" src="../../assets/find_normal.png" alt="">
            <img slot="activeImg" src="../../assets/find_active.png" alt="">
        </TabItem>
        <TabItem txt="我的" mark="mine" :sel="selected">
            <img slot="normalImg" src="../../assets/mine_normal.png" alt="">
            <img slot="activeImg" src="../../assets/mine_active.png" alt="">
        </TabItem>
    </div>
</template>

<script>
import TabItem from './TabItems'
export default {
    components:{
        TabItem
    },
    data(){
        return{
            selected:this.$route.name//当前路由
        }
    },
}
</script>

<style lang="scss">
    .tabbarBox{
        z-index:8;
        width:100%;
        height:.495rem;
        background:#fff;
        border-top:1px solid #ebeefc;
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:fixed;
        bottom:0;
        left:0;
    }
</style>
