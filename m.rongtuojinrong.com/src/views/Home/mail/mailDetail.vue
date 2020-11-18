<template>
    <div class="mailDetailBox">
        <!-- 头部 -->
        <headerBox title="站内信"></headerBox>
        <!-- 内容 -->
        <div class="contentBox">
            <div class="content_top">
                <p>{{details.title}}</p>
                <span>{{details.time}}</span>
            </div>
            <div class="content_bot">{{details.content}}</div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
// import {mapState} from 'vuex';
export default {
    data(){
        return{
            details:''
        }
    },
    methods:{
        getDetails(){
            //   let postData = qs.stringify({ //向后台传入article_id
            //    mess_id:this.$route.query.mess_id,
            // });
            this.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$post('/rongtuojinrong/userCenter/mail/v1/detail.json',{
                mess_id:this.$route.query.id
            }).then(res=>{
                this.details = res.data.data; 
                this.Indicator.close();
                // console.log(this.details)
            })
        },
        goback(){
            this.$router.go(-1)
        }
    },
    created(){
        this.getDetails();
    }
}
</script>

<style lang="scss" scoped>
.mailDetailBox{
    width:100%;
    .contentBox{
        width:100%;
        height:100%;
        position:absolute;
        margin-top:0.5rem;
        padding:0.2rem 0.15rem 0;
        background:#f4f4f4;
        .content_top{
            width: 100%;
            display:flex;
            flex-direction:column;
            padding-left:0.11rem;
            border-radius:0.1rem 0.1rem 0 0;
            background:#fff;
            p{
                font-size:0.14rem;
                color:#000;
                padding:0.15rem 0; 
            }
            span{
                font-size:0.1rem;
                color:#999;
                padding-bottom:0.12rem;
                border-bottom:1px solid #ddd;
            }
        }
        .content_bot{
            width: 100%;
            font-size:0.14rem;
            color:#323232;
            text-indent:0.35rem;
            white-space:wrap;
            line-height:0.22rem;
            padding:0.22rem 0.47rem 0.25rem 0.11rem;
            border-radius:0 0 0.1rem 0.1rem;
            background:#fff;
        }
    }
}

</style>