<template>
    <div class="DetailsBox">
            <!-- <mt-header title="平台公告" fixed>
                <router-link to="/NoticeBarlist" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header> -->
          <!-- 头部 -->
        <headerBox title="平台公告"></headerBox>
        <div class="Details_content" v-html="details.content">
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import headerBox from '@/components/header.vue';
import { Indicator } from 'mint-ui';//加载中
export default {
    components:{
        headerBox
    },
    name:'NoticeBarlistDetails',
    data(){
        return{
            details:[],
        }
    },
    methods:{
        getDetails(){
            // let postData = qs.stringify({ //向后台传入article_id
            //     id:this.$route.query.article_id
            // });
            // this.$http.post('http://api.php.sit.rongtuojinrong.com/rongtuojinrong/article/detail.jsonl',postData).then(res=>{
            //     this.details = res.data.data;
                // console.log(res.data.data.content);
            // })
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post('/rongtuojinrong/article/detail.jsonl',{
                id:this.$route.query.article_id
            }).then(res=>{
                this.details = res.data.data;
                Indicator.close();
                // console.log(res.data)
            })
        }
    },
    created(){
        this.getDetails();
        // document.documentElement.fontSize = '50px';
    }
}
</script>

<style lang="scss">
    body{
        background:#fff;
        width:100%;
        height:100%;
        .DetailsBox{
            background:#fff;
            // .mint-header {
            //     background: #fff;
            //     height: 0.5rem;
            //     border-bottom:1px solid #b6b6b6; 
            //     position:fixed;
            //     top:0;
            //     z-index:10;
            //     .mint-button-icon {
            //         color: #404040;
            //     }
            //     .mint-header-title {
            //         font-size: 0.18rem;
            //         color: #000000;

            //     }
            // }
            .back p{
                font-family: "\5FAE\8F6F\96C5\9ED1";
            }
            .Details_content{
                margin-top:0.5rem;
                padding:0 0.08rem;
            }
        }
    }
</style>
