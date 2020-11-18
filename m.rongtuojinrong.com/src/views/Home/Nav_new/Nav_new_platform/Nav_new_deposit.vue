<template>
    <!-- 银行存管 -->
    <div class="depositBox">
        <div class="deposit1">
            <h2>
                <span>银行存管正式接入—用户资金流向透明</span>
                <i></i>
            </h2>
            <p>平台积极响应监管政策，与银行签订《网络借贷资金存管业务合作协议》，并在协议签订后与银行经过数月的对接开发，最终计划于2017年7月中旬正式上线！</p>  
        </div>
        <div class="deposit2">
            <img src="../../../../assets/rongtuo.png" alt="">
        </div>
        <div class="deposit3">
            <h2>
                <span>银行存管优势</span>
                <i></i>
            </h2>
            <div class="titleBox1">
                <span>资金完全隔离</span>
                <p>用户所有的资金由存管银行进行管理与监督，平台资金与用户资金完全隔离</p>
            </div>
            <div class="titleBox2">
                <span>操作严格授权</span>
                <p>银行只有接到用户授权操作指令才能进行资金划转</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    body{
        height:100%;
        .depositBox{
            width:100%;
            padding:0 0.18rem;
            .deposit1{
                width:100%;
                h2{
                    width:100%;
                    height:1.12rem;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    position: relative;
                    span{
                        color:#fff;
                        font-size:0.16rem;
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
                p{
                    font-size:0.14rem;
                    line-height:0.2rem;
                    color:#fff;
                    height:0.91rem;
                }
            }
            .deposit2{
                width:100%;
                img{
                    width:100%;
                    height:100%;
                }
            }
            .deposit3{
                width:100%;
                h2{
                    height:0.96rem;
                    display:flex;
                    justify-content:center;
                    position: relative;
                    span{
                        font-size:0.17rem;
                        color:#fff;
                        margin-top:0.27rem;
                    }
                    i{
                        width:0.77rem;
                        height:1px;
                        background:#fff;
                        position:absolute;
                        top:0.56rem;
                        left:1.33rem;
                        position: absolute;
                    }
                }
                .titleBox1{
                    width:100%;
                    span{
                        font-weight: 200;
                        color: #f63;
                        margin-bottom: 0.06rem;
                    }
                    p{
                        line-height:0.21rem;
                        color:#fff;
                        margin-bottom:0.3rem;       
                    }
                }
                .titleBox2{
                    width:100%;
                    span{
                        font-weight: 200;
                        color: #f63;
                        margin-bottom: 0.06rem;
                    }
                    p{
                        line-height:0.21rem;
                        color:#fff;
                        margin-bottom:0.38rem;       
                    }
                }
            }
        }
    }
</style>