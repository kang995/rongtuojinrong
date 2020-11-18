<template>
    <div class="weixinBox">
        <!-- 头部 -->
        <!-- <mt-header title="微信客服" fixed>
            <router-link to="/service" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox title="微信客服"></headerBox>
        <div class="content">
            <div class="content_top">
                <p>微信号已复制成功，请按以下步骤进行添加</p>
                <img src="../../../assets/weixin_03.jpg" alt="">
                <p>打开微信</p>
                <img src="../../../assets/img61a.png" alt="">
                <img src="../../../assets/weixin_04.jpg" alt="">
            </div>
            <div class="content_bottom">
                <img src="../../../assets/img61a.png" alt="">
                <p>点击添加朋友</p>
                <img src="../../../assets/img61a.png" alt="">
                <img src="../../../assets/weixin_05.jpg" alt="">
                <p>点击添加后就可以和客服对话啦</p> 
            </div>                              
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    body,html{
        background:#fff;
        .weixinBox{
            width:100%;
            .mint-header {
                background: #fff;
                height: 0.5rem;
                border-bottom:1px solid #ddd;
                .mint-button-icon {
                    color: #404040;
                }
                .mint-header-title {
                    font-size: 0.17rem;
                    color: #404040;
                    font-weight:500;
                }
            }
            .content{
                width:100%;
                padding-top:0.5rem;
                overflow: hidden;
                background:#fff;
                .content_top{
                    width:100%;
                    p:nth-of-type(1){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0.12rem auto 0.2rem;
                        text-align:center;
                    }
                    img:nth-of-type(1){
                        display:block;
                        width:0.4rem;
                        height:0.4rem;
                        margin: 0 auto 0.07rem;
                    }
                     p:nth-of-type(2){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0 auto 0.15rem;
                        text-align:center;
                    }
                    img:nth-of-type(2){
                        display:block;
                        width:0.21rem;
                        height:0.12rem;
                        margin: 0 auto 0.08rem;
                    }
                    img:nth-of-type(3){
                        display:block;
                        width:2.4rem;
                        height:1.27rem;
                        margin: 0.08rem auto 0.04rem;
                    }
                }
                .content_bottom{
                    width:100%;
                    overflow: hidden;
                    background:#fff;
                    img:nth-of-type(1){
                        display:block;
                        width:0.21rem;
                        height:0.12rem;
                        margin: 0.04rem auto 0.08rem;
                    }
                    p:nth-of-type(1){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0 auto 0;
                        text-align:center;
                    }
                    img:nth-of-type(2){
                        display:block;
                        width:0.21rem;
                        height:0.12rem;
                        margin: 0.11rem auto 0.08rem;
                    }
                    img:nth-of-type(3){
                        display:block;
                        width:2.41rem;
                        height:1.9rem;
                        margin: 0.07rem auto 0.11rem;
                    }
                    p:nth-of-type(2){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0.11rem auto 0.52rem;
                        text-align:center;
                    }
                }
            }
        }
    }
</style>