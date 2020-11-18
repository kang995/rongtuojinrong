<template>
    <!-- 平台实力 -->
    <div class="strengthBox">
       <div class="strength">
            <h2>
                <span>稳健运营的互联网金融平台</span>
            </h2>
            <i></i>
            <p>融托金融是一家稳健运营的网络借贷信息中介平台，是以互联网为工具，为有资金需求的优质中小微企业、资信状况优良的个人以及有闲散资金的出借者搭建的信息中介平台。在这里，出借者可以根据平台充分披露的信息将资金出借给特定的借款人，并获得相应的出借收益。</p>
            <p>经营范围：接受金融机构委托从事金融服务外包、金融信息技术外包、金融业务流程外包、金融知识流程外包、票据中介服务业务；受托资产管理服务；财务管理咨询服务（不含期货、证券、出借、融资、担保类业务咨询；不含消费储值卡等相关业务）。网络借贷信息中介（未经金融监管部门批准，不得从事吸收存款、融资担保、代客理财等金融业务；法律、行政法规另有规定的除外）。</p>
       </div>
       <div class="strength1">
            <h2>
                <span>融托金融大事记</span>
            </h2>
            <i></i>
            <p>2013年9月，融托金融在聊城注册成立</p>
            <p>2014年4月，融托金融正式上线运营；</p>
            <p>2015年6月-8月，产品线不断丰富，定期类、定投类和类活期项目陆续上线；</p>
            <p>2015年9月，成功举办2届融米见面会；</p>
            <p>2015年12月，成交额突破5亿元；</p>
            <p>2016年2月，成功举办“为信任奉献回报”的年会盛典；</p>
            <p>2016年10月，累计成交额突破8亿元；</p>
            <p>2017年3月8日，累计成交额突破10亿元；</p>
            <p>2017年3月9日，被互联网信用评价中心评为AA企业；</p>
            <p>2017年3月17日，获得公安部国家信息系统安全保护三级认证；</p>
            <p>2017年5月5日，融托金融携手CFCA上线上线安心签；</p>
            <p>2017年7月12日，银行存管系统正式上线；</p>
            <p>2017年9月6日，融托金融APP获得国家版权局颁发的软件著作权登记证书；</p>
       </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .strengthBox{
        width:100%;
        height:100%;
       .strength{
            width:100%;
            padding:0 0.18rem;
            // padding-bottom:0.3rem;
            line-height:0.22rem;
            color:#fff;
            position:relative;
            h2{
                height:1.01rem;
                display:flex;
                justify-content:center;
                align-items:center;
                span{
                    color: white;
                    font-size: 0.17rem;
                    font-weight:200;
                }
            }
            i{
                width:0.77rem;
                height:1px;
                background:#fff;
                position:absolute;
                top:0.73rem;
                left:1.48rem;
            }
            p:nth-of-type(1){
                height:1.55rem;
            }
        }
        .strength1{
            width:100%;
            // padding:0 0.18rem;
            color:#fff;
            position:relative;
            margin-top:0.3rem;
            h2{
                height:.66rem;
                display:flex;
                justify-content:center;
                span{
                    color: white;
                    font-size: 0.17rem;
                    font-weight:200;
                }
            }
            i{
                width:0.77rem;
                height:1px;
                background:#fff;
                position:absolute;
                top:0.3rem;
                left:1.48rem;
            }
            p{
                height:0.6rem;
                margin-bottom:0.3rem;
                background:#18509a;
                padding:0 0.15rem 0 0.15rem;
                display:flex;
                align-items:center;
            }
            p:nth-last-of-type(1){
                margin-bottom:0;
            }
        }
    }
</style>