<template>
    <div class="qqBox">
        <!-- 头部 -->
        <!-- <mt-header title="QQ交流群" fixed>
            <router-link to="/service" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox title="QQ交流群"></headerBox>
        <!-- 内容 -->
        <div class="content">
            <div class="content_top">
                <p>QQ群号已复制，请按以下步骤进行关注</p>
                <img src="../../../assets/qq_03.jpg" alt="">
                <p>打开QQ点击联系人</p>
                <img src="../../../assets/img61a.png" alt="">
                <img src="../../../assets/qq_04.jpg" alt="">
            </div>
            <div class="content_bottom">
                <p>点击添加</p>
                <img src="../../../assets/img61a.png" alt="">
                <img src="../../../assets/qq_05.jpg" alt="">
                <p>点击找群输入QQ群号</p> 
                <p>点击搜索后申请加入就可以了</p>
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
        .qqBox{
            width:100%;
            background:#fff;
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
                padding-top:0.5rem;
                width:100%;
                overflow: hidden;
                .content_top{
                    width:100%;
                    p:nth-of-type(1){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0.07rem auto 0.2rem;
                        text-align:center;
                    }
                    img:nth-of-type(1){
                        display:block;
                        width:0.38rem;
                        height:0.38rem;
                        margin: 0 auto 0.08rem;
                    }
                    p:nth-of-type(2){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0rem auto 0.2rem;
                        text-align:center;
                    }
                    img:nth-of-type(2){
                        display:block;
                        width:0.21rem;
                        height:0.12rem;
                        margin: 0 auto 0.17rem;
                    }
                    img:nth-of-type(3){
                        display:block;
                        width:2.37rem;
                        height:1.05rem;
                        margin: 0 auto;
                    }
                }
                .content_bottom{
                    width:100%;
                    p:nth-of-type(1){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0.12rem auto 0.1rem;
                        text-align:center;
                    }
                    img:nth-of-type(1){
                        display:block;
                        width:0.21rem;
                        height:0.12rem;
                        margin: 0 auto 0.07rem;
                    }
                    img:nth-of-type(2){
                        display:block;
                        width:2.37rem;
                        height:0.95rem;
                        margin: 0 auto;
                    }
                    p:nth-of-type(2){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0.15rem auto 0;
                        text-align:center;
                    }
                    p:nth-of-type(3){
                        font-size:0.13rem;
                        color:#415ec3;
                        margin:0rem auto 1.5rem;
                        text-align:center;
                    }
                }
            }
        }
   }
</style>