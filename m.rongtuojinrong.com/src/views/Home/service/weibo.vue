<template>
     <div class="weiboBox">
        <!-- 头部 -->
        <!-- <mt-header title="@融托金融" fixed>
            <router-link to="/service" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox title="@融托金融"></headerBox>
        <iframe class="iframeBox" src="https://weibo.com/rongtuojinrong?is_hot=1" frameborder="0"></iframe>
      </div>
</template>

<script>
export default {
    methods:{
        getweibo(){
            // var tempwindow = window.open('_blank');
            // location.href = 'https://weibo.com/rongtuojinrong?is_hot=1';
        }
    },
    mounted(){
        this.getweibo();
    }
}
</script>

<style lang='scss'>
    html,body{
        width:100%;
        height:100%;
        background:#fff;
       #app{
           width:100%;
           height:100%;
            .weiboBox{
                width:100%;
                height:100%;
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
                .iframeBox{
                    width:100%;
                    height:100%;
                    margin-top:0.5rem;
                }
            }
        }
    }
</style>