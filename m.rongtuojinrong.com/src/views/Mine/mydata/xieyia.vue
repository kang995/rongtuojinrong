<template>
    <div class="DetailsBox">
        <div class="Details_header">
            <!-- 头部 -->
            <!-- <mt-header title="聚一聚服务协议" fixed>
                <router-link to="/issue" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header> -->
            <headerBox title="网贷平台风险提示及禁止性行为"></headerBox>
        </div>
        <div class="Details_content" v-html="details2.data">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            details2:'',
        }
    },
    methods:{
        getDetails(){
            this.$post('/rongtuojinrong/userCenter/accountInformation/forbidAct.json').then(res=>{
                this.details2 = res.data;
                 console.log( this.details);
            })
        }
    },
    created(){
        this.getDetails();
    }
}
</script>

<style lang="scss">
        .DetailsBox{
            background:#fff;
            width: 100% !important;
            padding:0;
            background:#fff;
            //width:3.75rem;
            .mint-header {
                background: #fff;
                height: 0.5rem;
                border-bottom:1px solid #b6b6b6; 
                position:fixed;
                top:0;
                z-index:10;
                .mint-button-icon {
                    color: #404040;
                }
                .mint-header-title {
                    font-size: 0.18rem;
                    color: #000000;

                }
            }
            .Details_content{
                width:100%;
                height:100%;
                margin-top:0.5rem;
                padding:0 0.08rem;
                font-size: 0.14rem;
                p{font-size: 0.14rem;padding:0 0.2rem 0 0.2rem;width: 100%;line-height: 0.32rem;}
            }
          div{padding:0 !important; margin: 0;width: 100%;}
        }
</style>
