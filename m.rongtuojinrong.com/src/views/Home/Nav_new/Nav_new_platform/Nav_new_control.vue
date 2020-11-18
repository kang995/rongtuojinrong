<template>
    <!-- 风控体系 -->
    <div class="controlBox">
        <div class="control1">
            <h2>
                <span>风控体系</span>
            </h2>
            <i></i>
        </div>
        <div class="control2">
            <span>① 信息披露</span>
            <span>② 供应链金融模式</span>
            <span>③ 明晰项目资产</span>
            <span>④ 核心企业承付</span>
            <span>⑤ 风控尽调</span>
            <span>⑥ 人工智能化审核</span>
            <span>⑦ 法务内审</span>
            <span>⑧ 贷后管理</span>
        </div>
        <div class="control3">
             <h2>
                <span>互联网+供应链金融的优势---核心企业承付</span>
                <i></i>
            </h2>
            <p>互联网+供应链金融</p>
            <p>融托金融的核心商业模式为互联网+供应链金融，采用应收账款、预付账款质押融资，为借贷双方等提供资金撮合信息服务。在服务过程中，通过真实贸易背景以及授信企业与核心企业的关系来控制风险。</p>
            <p>核心企业提供与其上游企业的真实贸易凭证，融托金融在核实业务真实款项属实之后，在融托金融平台上发布标的，出借人在平台上出借，到期后，融资企业还本付息。资金流转过程全部在银行资金存管系统中完成。核心企业作为实际付款人签署承诺书，对债务人的付款义务承担连带责任，作为第二还款人承诺承付。</p>    
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .controlBox{
        width:100%;
        padding:0.17rem;
        .control1{
            width:100%;
            position:relative;
            h2{
                height:0.9rem;
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
                left:1.33rem;
            }
        }
        .control2{
            height:2.59rem;
            span{
                float:left;
                display: block;
                width: 1.06rem;
                height: 0.55rem;
                border: 1px dashed white;
                font-size: 0.13rem;
                color: white;
                text-align: left;
                padding: 0.1rem 0.15rem;
                line-height: 0.19rem;
                margin:0 0.08rem 0.17rem 0;
            }
            span:nth-child(3),span:nth-child(6){
                margin:0;
            }
        }
        .control3{
            width:100%;
            h2{
                height:0.32rem;
                position: relative;
                span{
                    font-size:0.17rem;
                    color:#fff;
                    display:flex;
                    align-items:flex-start;
                }
                i{
                    width:0.75rem;
                    height:1px;
                    background:#fff;
                    position:absolute;
                    top:0.3rem;
                    left:1.23rem; 
                }
            }
            p:nth-of-type(1){
                height:0.81rem;
                padding-left:0.04rem;
                font-weight: 200;
                color: #f63;
                display:flex;
                align-items:center;
            }
            p:nth-of-type(2){
                height:1.06rem;
                width:100%;
                padding-left:0.04rem;
                font-size:0.14rem;
                color:#fff;
            }
             p:nth-of-type(3){
                height:1.71rem;
                width:100%;
                padding-left:0.04rem;
                font-size:0.14rem;
                color:#fff;
            }
        }
    }
</style>