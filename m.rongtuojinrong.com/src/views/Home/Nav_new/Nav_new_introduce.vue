<template>
<!-- 平台介绍 ——首页平台介绍跳转后的页面 -->
    <div class="introduceBox">
        <!-- 头部 -->
        <headerBox title="平台介绍"></headerBox>
        <iframe class="iframeBox" id="ifra" name="ifra"  ref="box" :src="src" frameborder="0"></iframe>
        <!-- <div class="companyBox">
             <div class="company">
                 <img src="../../../assets/introduce_03.png" alt="">
             </div>
        </div>
        <div class="contentBox">
            <ul class="content">
                <li>聊城融托金融服务有限公司，简称融托金融。</li>
                <li>统一社会信用代码：<br/>913715000779646170 ，注册资本1000（万元），实缴资本1000（万元）。</li>
                <li>注册地址（经营地址）：<br/>聊城市东昌府区湖南路古楼运河苑消防通道东1号楼1-2层。</li>
                <li>融托金融成立于2013年9月6日(网址rongtuojinrong.com,2014年4月上线),经营期限长期,经营状态正常,法定代表人周润秋。</li>
                <li>经营范围：接受金融机构委托从事金融服务外包、金融信息技术外包、金融业务流程外包、金融知识流程外包、票据中介服务业务；受托资产管理服务；财务管理咨询服务（不含期货、证券、投资、融资、担保类业务咨询；不含消费储值卡等相关业务）。网络借贷信息中介（未经金融监管部门批准，不得从事吸收存款、融资担保、代客理财等金融业务；法律、行政法规另有规定的除外）。</li>
                <li><img src="../../../assets/Boss_03.png" alt=""></li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';//加载中
export default {
    data(){
        return{
           src:'https://www.rongtuojinrong.com/p2pxin/rongtuoxinsoc/helpzhongxin/pingtaishujuerliu?laiyuan=' 
        }
    },
    methods:{
        getData(){
            if(!this.$refs.box){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
            }
        },
        getData1(){
            if(this.$refs.box){
                Indicator.close();  
            }  
        }
    },
    created(){
    //    this.getData()
    },
//     mounted(){
//         this.getData1()
//    }
}
</script>

<style lang="scss">
    body{
        background:#f4f4f4;
        height:100%;
        width:100%;
        #app{
            width:100%;
            height:100%;
              .introduceBox{
                width:100%;
                height:100%;
                .mint-header {
                    background: #fff;
                    height: 0.5rem;
                    .mint-button-icon {
                        color: #404040;
                    }
                    .mint-header-title {
                        font-size: 0.18rem;
                        color: #0a0a0a;
                    }
                }
                .iframeBox{
                    width:100%;
                    height:100%;
                    padding-top:0.5rem;
                }
                // .companyBox{
                //     width:100%;
                //     height:2.02rem;
                //     padding:0 0.1rem;
                //     margin-top:0.5rem;
                //     display:flex;
                //     justify-content:center;
                //     align-items:center;
                //     .company{
                //         width:100%;
                //         height:1.75rem;
                //         background:#fff;
                //         img{
                //             width:100%;
                //             height:100%;
                //         }
                //     }
                // }
                // .contentBox{
                //     width:100%;
                //     background:#f5f5f5;
                //     padding:0 0.13rem;
                //     .content{
                //         width:100%;
                //         background:#fff;
                //         border-radius:0.2rem;
                //         padding: 0 .3rem;
                //         li:nth-child(1){
                //             width:100%;
                //             height:0.6rem;
                //             color:#333;
                //             font-size:0.12rem;
                //             display:flex;
                //             align-items:center;
                //         }
                //         li:nth-child(2){
                //             width:100%;
                //             height:0.72rem;
                //             line-height:0.21rem;
                //             color:#333;
                //             font-size:0.12rem;
                //         }
                //         li:nth-child(3){
                //             width:100%;
                //             height:0.77rem;
                //             line-height:0.21rem;
                //             color:#333;
                //             font-size:0.12rem;
                //         }
                //         li:nth-child(4){
                //             width:100%;
                //             height:0.73rem;
                //             line-height:0.21rem;
                //             color:#333;
                //             font-size:0.12rem;
                //         }
                //         li:nth-child(5){
                //             width:100%;
                //             height:1.78rem;
                //         }
                //         li:nth-child(6){
                //             width:100%;
                //             height:1.36rem;
                //             padding:0.33rem 0.17rem 0 1.5rem;
                //             img{
                //                 display:block;
                //                 width:1.25rem;
                //                 height:0.29rem;
                //             }
                //         }
                //     }
                // }
            }
        }

    }
    
</style> 
