<template>
    <div class="helpRopertyBox">
       <headerBox title="资产篇"></headerBox>
       <iframe class="iframeBox" src="http://p2pxin.rongtuojinrong.com/rongtuoxinsoc/Helpzhongxin/showeb4" frameborder="0"></iframe>
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
    .helpRopertyBox{
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