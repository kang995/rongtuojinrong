<template>
    <!-- 遵从监管-->
     <div class="superviseBox">
         <div class="supervise_header">
            <h2>
                <span>遵从监管——严控风险，层层把关</span>
                <i></i>
            </h2>
        </div>
        <div class="supervise_content">
            <h3>信息披露详尽</h3>
            <p>融托金融建立了专业的风控团队对项目进行全方位尽职调查，确保信息真实有效 。并且将项目信息、借款企业情况详尽披露，出借人可根据项目信息进行风险判断，按着自己的风险偏好，自主选择出借项目。</p>
        </div>
         <div class="supervise_content">
            <h3>资金银行存管</h3>
            <p>银行存管正式接入，用户资金流向透明。平台积极响应监管政策，与银行签订《网络借贷资金存管业务合作协议》，并在协议签订后与银行经过数月的对接开发，最终于2017年7月中旬正式上线！</p>
        </div>
         <div class="supervise_content">
            <h3>CFCA认证</h3>
            <p>中国金融认证中心简称CFCA，是国家级权威安全认证机构。融托金融与CFCA的合作，使得电子合同均由CFCA强大的签名验签技术确保真实性并提供证据存储；同时，无忧的数据加密存储和获取权限保护，杜绝电子合同信息被篡改或者泄露的可能；为融米每一次出借再上一道锁。</p>
        </div>
        <div class="supervise_content">
            <h3>法务内审</h3>
            <p>融托金融的法务部专门负责起草并审核所有主营业务合同，制定充分保护出借人利益的条款；全程监督审核平台对融资项目的尽职调查工作，确保尽调规范性、合理性。</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style  lang="scss">
.superviseBox{
        width:100%;
        .supervise_header{
            width:100%;
            padding:0 0.18rem;
            h2{
                height:1.1rem;
                position: relative;
                display:flex;
                align-items:center;
                justify-content:center;
                span{
                    font-size:0.18rem;
                    color:#fff;
                }
                i{
                    width:0.77rem;
                    height:1px;
                    background:#fff;
                    position:absolute;
                    top:0.73rem;
                    left:1.33rem;
                    position: absolute;
                }
            }
        }
        .supervise_content{
            width:100%;
            padding:0 0.18rem;
            background:#1a519b;
            margin-bottom:0.12rem;
            h3{
                height:0.4rem;
                font-size:0.14rem;
                color: #f63 !important;
                padding-top:0.16rem;
            }
            p{
                font-size: 0.14rem;
                color: white;
                text-align: justify;
                line-height: 0.21rem;
                padding-bottom:0.2rem;
            }
        }
    }
</style>