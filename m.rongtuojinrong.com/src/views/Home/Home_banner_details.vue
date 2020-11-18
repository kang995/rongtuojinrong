<template>
   <div class="DetailsBox">
        <!-- 头部 -->
        <!-- <mt-header :title="this.$route.query.title" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>  -->
        <headerBox :title="this.$route.query.title"></headerBox>
       <!-- 1.根据是否有数据请求判断渲染的结构：有数据请求渲染article_id不为0的数据：没有数据请求用iframe渲染接收到的链接 -->
        <div v-if="datas" class="contentBox">
            <div v-html="datas.content"></div>
        </div>
        <iframe v-else class="iframeBox" :src="Details" frameborder="0"></iframe>
   </div>
</template>

<script>
//引入qs模块
import qs from 'qs';
import { Indicator } from 'mint-ui';//加载中
export default {
    data(){
        return{
            Details:this.$route.query.redirect_url,//article_id为0，用iframe渲染接收到的链接
            article_id:this.$route.query.article_id,//article_id不为0，用article_id当做参数请求详情接口
            datas:'',
        }
    },
    methods:{
        getBannerDetail(){
            // let postData ="id="+this.$route.params.article_id  //第一种方式
            // let postData = qs.stringify({ //第二种方式
            //     id:this.$route.query.article_id
            // })
            if(this.article_id!=0){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                this.$post('/rongtuojinrong/article/detail.jsonl',{
                    id:this.article_id
                }).then(res=>{
                    this.datas = res.data.data;
                    Indicator.close(); 
                    // console.log(this.datas);
                })
            }
            // location.href = this.$route.params.redirect_url;//直接跳转redirect_url
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
        // .mint-header {
        //     background: #fff;
        //     height: 0.5rem;
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
            margin-top:0.5rem;
        }
        .contentBox{
            padding-top:0.5rem;
        }
    }
}
</style>
