<template>
    <div class="serviceBox">
        <!-- 头部 -->
        <headerBox title="联系客服"></headerBox>
        <!-- 内容 -->
        <div class="contentBox">
            <ul class="content">
                <router-link :to="{name:'weixin'}" tag="li">
                    <img src="../../../assets/img16.png" alt="">
                    <p>微信客服:</p>
                    <span>rongtuojinrong001</span>
                    <img src="../../../assets/img63.png" alt="">            
                </router-link>
                <router-link :to="{name:'weibo'}" tag="li">
                    <img src="../../../assets/img18.png" alt="">
                    <p>@融托金融</p> 
                    <img src="../../../assets/img63.png" alt="">  
                </router-link>
                <router-link :to="{name:'qq'}" tag="li">
                    <img src="../../../assets/img19.png" alt="">
                    <p>客户交流QQ群:</p>
                    <span>&nbsp;&nbsp;188154837</span>
                    <img src="../../../assets/img63.png" alt="">      
                </router-link>
                <li>
                    <img src="../../../assets/youxiang_03.jpg" alt="">
                    <p>客服邮箱:</p>
                    <span>&nbsp;&nbsp;service@rongtuojinrong.com</span>   
                </li>
            </ul>
            <div class="content1">
                <img src="../../../assets/server_03.jpg" alt="">
            </div>
            <div class="content2">
                <a class="tell" :href="'tel:'+ 4008788688">拨打客服电话</a>
            </div>                  
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tempwindow:'',
        }
    },
//    methods:{
//         getweibo(){
//             this.tempwindow = window.open('_blank');
//             this.tempwindow.location.href = 'https://weibo.com/rongtuojinrong?is_hot=1';
//         }
//     },
//     mounted(){
//         this.getweibo();
//     }
}
</script>

<style lang="scss" scoped>
    body,html{
        // background:#e7eaf1!important;
        height:100%;
        .serviceBox{
            width:100%;
            height:100%;
            background:#e7eaf1;
            position:absolute;
        .mint-header {
            background: #fff;
            height: 0.5rem;
            border-bottom:1px solid #ddd;
            .mint-button-icon {
                color: #404040;
            }
            .mint-header-title {
                font-size: 0.17rem;
                color: #404040;
                font-weight:500;
            }
           
        }
        .contentBox{
            width:100%;
            padding-top:0.5rem;
            background:#fff;
            .content{
                width:100%;
                li{
                    width:100%;
                    height:0.55rem;
                    display:flex;
                    align-items:center;
                    border-bottom:1px solid #ddd;
                    padding:0 0.11rem;
                    img:first-of-type{
                        width:0.35rem;
                        height:0.35rem;
                    }
                    img:last-of-type{
                        width:0.1rem;
                        height:0.15rem;
                        margin-left:auto;
                    }
                    p{
                        font-size:0.15rem;
                        color:#333;
                        margin-left:0.13rem;
                    }
                    span{
                        display:flex;
                        justify-content:flex-end;
                        font-size:0.15rem;
                        color:#333;
                    }
                }
                li:last-child img{
                    width:0.35rem;
                    height:0.35rem;
                    margin:0;
                }
            }
            .content1{
                width:100%;
                height:3.11rem;
                background:#e7eaf1;
                padding-top:0.3rem;
                img{
                    display:block;
                    width:2.25rem;
                    height:0.95rem;
                   margin:0 auto;
                }
            }
            .content2{
                width:100%;
                height:0.7rem;
                background:#e7eaf1;
                .tell{
                    display:block;
                    width:3.21rem;
                    height:0.4rem;
                    line-height:0.4rem;
                    background:#0359d4;
                    color:#fff;
                    font-size:0.15rem;
                    border-radius:0.2rem;
                    margin:0 auto;
                    text-align:center;
                    border:none;
                    text-decoration:none;
                }
            }
        }
        
    }
}
</style>