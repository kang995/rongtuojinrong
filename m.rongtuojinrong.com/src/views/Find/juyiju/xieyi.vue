<template>
    <div class="DetailsBox">
        <div class="Details_header">
            <!-- 头部 -->
            <!-- <mt-header title="聚一聚服务协议" fixed>
                <router-link to="/issue" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header> -->
            <headerBox title="聚一聚服务协议"></headerBox>
        </div>
        <div class="Details_content" v-html="details.data">
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            details:'',
        }
    },
    methods:{
        getDetails(){
            this.$post('/rongtuojinrong/activity/juyiju/ActivityRules').then(res=>{
                this.details = res.data;
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
    body{
        background:#fff;
        width:3.75rem;
        .DetailsBox{
            background:#fff;
            width: 100% !important;
            padding:0;
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
            }
          div{padding:0  0 !important;margin:0;}
          //div#app{width: 100%; padding:0 4%;}
        }
    }
</style>
