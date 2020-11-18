<template>
    <div class="protocolBox">
         <!-- 头部 -->
        <!-- <div class="back">
            <img src="../../assets/img61.png" alt="" @click="goback">
            <p>融托金融用户服务协议</p>
        </div> -->
        <headerBox title="融托金融用户服务协议"></headerBox>
        <iframe class="iframeBox" src="http://ww.rongtuojinrong.com/login/xieyi" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    },
    // updated(){
    //     this.goback();
    // }
}
</script>

<style  lang="scss">
   body,html{
       width:100%;
       height:100%;
        #app{
           width:100%;
           height:100%;
            .protocolBox{
                width:100%;
                height:100%;
                .back{
                    width: 100%;
                    height:0.5rem;
                    display:flex;
                    justify-content:center;
                    position: relative;
                    border-bottom:1px solid #ddd;
                    padding:0 0.1rem;
                    position:fixed;
                    top:0;
                    z-index:10;
                    img{
                        line-height:0.5rem;
                        width:0.08rem;
                        height:0.12rem;
                        position:absolute;
                        left:0;
                        top:0.18rem;
                        margin-left:0.13rem;
                    }
                    p{
                        line-height:0.5rem;
                        font-size: 0.15rem;
                        color: #404040;
                    }

                }
                // .mint-header {
                //     background: #fff;
                //     height: 0.5rem;
                //     border-bottom:1px solid #ddd;
                //     .mint-button-icon {
                //         color: #404040;
                //     }
                //     .mint-header-title {
                //         font-size: 0.15rem;
                //         color: #404040;
                //     }
                // }
                .iframeBox{
                    width:100%;
                    height:100%;
                    padding:0 0.1rem;
                    padding-top:0.5rem;
                }
            }
       }
   }
</style>
