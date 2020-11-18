<template>
    <div class="DetailsBox">
        <div class="Details_header">
            <!-- 头部 -->
            <!-- <mt-header title="聚一聚服务协议" fixed>
                <router-link to="/issue" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header> -->
            <headerBox title="融托金融用户服务协议"></headerBox>
        </div>
        <div class="Details_content" v-html="details2.data">
        </div>
        <div class="heifht"></div>
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
            this.$post('/rongtuojinrong/userCenter/accountInformation/serviceAgreement.json').then(res=>{
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
            height:100%;
            position: absolute;
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
                height:auto;
                margin-top:0.5rem;
                padding:0 0.08rem;
                font-size: 0.14rem;
                overflow: hidden;
                p{font-size: 0.14rem;padding:0 0.2rem 0 0.2rem;width: 100%;}
                h2{padding: 0.1rem 0.2rem;font-size: 0.16rem;font-weight: bold;}
                p:first-child{padding-top:0.2rem;}
                p:last-child{padding-top:0.1rem;}
                
            }
          div{padding:0 !important; margin: 0;width: 100%;}
          .heifht{height: 0.2rem;}
        }
</style>
