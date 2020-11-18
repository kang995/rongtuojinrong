<template>
    <!-- 技术措施（系统） -->
    <div class="systemBox">
        <div class="system_header">
            <h2>
                <span>技术措施 — 时刻保护用户隐私</span>
                <i></i>
            </h2>
        </div>
        <div class="system_content">
            <h3>网站采用国际领先的系统加密及保护技术</h3>
            <p>融托金融核心交易系统由自身技术团队自主研发，支持安全套接层协议和128 位加密技术，让客户在进行个人账户管理、充值等涉及敏感信息的操作时，信息被自动加密，然后才被安全地通过互联网发送出去。</p>
        </div>
         <div class="system_content">
            <h3>云安全技术</h3>
            <p>系统采用云安全技术，足以有效防御黑客攻击，确保客户数据安全。配备商业防攻击防火墙服务，聘请国内知名安全厂商对网站安全性进行实时检测，确保网站安全性。</p>
        </div>
         <div class="system_content">
            <h3>24小时监控与实时备份</h3>
            <p>经由融托金融的所有线上交易数据实时备份，资金往来保存原始记录。另外，客户出借时生成的电子合同可自行下载保存，作为出借有力证据。</p>
        </div>
         <div class="system_content">
            <h3>敏感数据脱敏</h3>
            <p>融托金融用户以及合作方的敏感数据，经过脱敏后分类保存，普通员工无法接触，即便是指定权限的内部工作人员也不可能窥测用户的数据信息。</p>
        </div>
         <div class="system_content">
            <h3>多要素认证</h3>
            <p>用户在融托金融注册开户时，就需要进行实名认证，实名认证包含姓名、身份证号、手机号、银行卡、短信验证码等五项内容，只有开通了实名认证的用户才可以在融托金融进行充值、投标、提现等操作。采用多要素认证，有效地防止用户的误操作，或者账号被盗不是本人操作的情况。</p>
        </div>
         <div class="system_content">
            <h3>数据中心异地灾备</h3>
            <p>融托金融异地的灾备数据中心实现了准实时的同步备份，并经过多次事故的应急处理演练，可在不可抗拒的网络灾难下达到分钟级的容灾要求。</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .systemBox{
        width:100%;
        // padding:0 0.18rem;
        .system_header{
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
        .system_content{
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