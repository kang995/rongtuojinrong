<!-- 信息披露详情页 -->
<template>
    <div class="companyBox">
        <!-- 头部 -->
        <!-- <mt-header :title="this.$route.query.name" fixed>
            <router-link to="/message" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <headerBox :title="name"></headerBox>
        <!-- 使用iframe跳转web页 -->
        <iframe class="iframeBox" :src="sign" frameborder="0"></iframe>
    </div>
</template>

<script>
import qs from 'qs';
// import { Indicator } from 'mint-ui';//加载中
export default {
    data(){
        return{
            navs:[],
            sign:this.$sign+'/rongtuojinrong/information/detail.json?sign='+this.$route.query.sign+'&from=h5',
            name:this.$route.query.name
        }
    },
    methods:{
        getDetails(){
            this.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            // let postData = qs.stringify({ //向后台传入user_id
            //     sign:this.$route.query.sign,
            // });
            this.$post('/rongtuojinrong/information/detail.json',{
                sign:this.$route.query.sign
            }).then(res=>{
                this.navs = res.data.data
                this.Indicator.close();
                // console.log( this.navs)
            })
        }
    },
    mounted(){
        this.getDetails();
        // document.documentElement.style.fontSize = '50px';
    },
}
 
</script>

<style lang="scss">
body,html{
    width:100%;
    height:100%;
    #app{
        width:100%;
        height:100%;
        .companyBox{
            width:100%;
            height:100%;
             .mint-header {
                background: #fff;
                height: 0.5rem !important;
                -webkit-max-height:0.5rem !important;
                // max-height:1rem !important;
                // z-index:10;
                .mint-button-icon { 
                    color: #404040;
                }
                .mint-header-title {
                    font-size: 0.15rem !important;
                    -webkit-font-size: 0.15rem !important;
                    // -webkit-text-size-adjust: none;
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
}




// body{
//     background:#fff;
//     .companyBox{
//         .mint-header {
//             background: #fff;
//             height: 1rem;
//             z-index:10;
//             .mint-button-icon {
//                 color: #404040;
//             }
//             .mint-header-title {
//                 font-size: 0.3rem;
//                 color: #404040;
//             }
//         }
//         .company{
//             margin-top:1rem;
//             .posi_top{
//                 margin-top:1rem;
//             }
//         }
//     }
// }
    
</style>