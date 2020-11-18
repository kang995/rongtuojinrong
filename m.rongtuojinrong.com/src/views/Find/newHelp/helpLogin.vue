<template>
    <div class="heleLoginBox">
        <headerBox title="注册登录篇"></headerBox>
        <iframe class="iframeBox" src="http://p2pxin.rongtuojinrong.com/rongtuoxinsoc/Helpzhongxin/showeb1" frameborder="0"></iframe>
    </div>
</template>

<script>
import headerBox from '../../../components/header'
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
        .heleLoginBox{
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