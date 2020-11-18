<template>
    <div class="helpRechargeBox">
       <headerBox title="充值篇"></headerBox>
       <iframe class="iframeBox" src="http://p2pxin.rongtuojinrong.com/rongtuoxinsoc/Helpzhongxin/showeb2" frameborder="0"></iframe>
    </div>
</template>

<script>
import headerBox from '@/components/header.vue'
export default {
    components:{
        headerBox
    }
}
</script>

<style lang="scss">
#app{
    width:100%;
    height:100%;
    .helpRechargeBox{
        width:100%;
        height:100%;
        .iframeBox{
            width:100%;
            height:100%;
            margin-top:0.5rem;
        }
    }
}
</style>