<template>
   <div class="DetailsBox">
        <!-- {{this.$route.params.article_id}} -->
         <!-- 头部 -->
        <mt-header :title="this.$route.query.title" fixed>
            <router-link to="/find" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> 
        <iframe class="iframeBox" :src="Details" frameborder="0" name="X-Frame-Options" value="ALLOW-FROM https://www.rongtuojinrong.com/bigWheel/flipCardIndex"></iframe>
   </div>
</template>

<script>
//引入qs模块
import qs from 'qs';
export default {
    data(){
        return{
            Details:this.$route.query.url,
            data:''
        }
    },
    methods:{
        getBannerDetail(){
            // let postData ="id="+this.$route.params.article_id  //第一种方式
            // let postData = qs.stringify({ //第二种方式
            //     id:this.$route.params.article_id
            // })
            // this.$http.post('http://api.php.sit.rongtuojinrong.com/rongtuojinrong/article/detail.jsonl',
            //   postData
            // ).then(res=>{
            //     this.data = res.data; 
            //     console.log(this.data);
            // })
            // location.href = this.$route.query.url;//直接跳转redirect_url
        }
    },
    created(){
        this.getBannerDetail();
    }
}
</script>

<style lang="scss">
    #app{
        height:100%;
        .DetailsBox{
            width:100%;
            height:100%;
            .mint-header {
                background: #fff;
                height: 0.5rem;
                .mint-button-icon {
                    color: #404040;
                }
                .mint-header-title {
                    font-size: 0.15rem;
                    color: #404040;
                }
            }
            .iframeBox{
                width:100%;
                height:100%;
                margin-top:0.5rem;
            }
        }
    }
</style>
