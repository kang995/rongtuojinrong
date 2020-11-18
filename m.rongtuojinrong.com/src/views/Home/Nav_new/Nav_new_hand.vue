<template>
<!-- 新手专享 -- 出借完成及接口请求失败隐藏 -->
    <div class="Nav_handBox" v-if="isShow">
        <div class="handBox">
            <div class="handBox_top">
                <h2>新手专享</h2>
            </div>
            <div class="handBox_center">
                <div class="content1">
                    <p>{{datas.title}}</p>
                    <span>{{datas.qixian}}</span>
                    <img src="../../../assets/新手专享图标.png" alt="">
                </div>
                <div class="content2">
                    <div class="content2_left">
                        <p class="bold">{{datas.lilv}}<i>%</i></p>
                        <p>预期年化率</p>
                    </div>
                    <div class="content2_right">
                        <p class="bold">{{datas.qitoujine}}<i>元</i></p>
                        <p>起投金额</p>
                    </div>
                </div>
            </div>
            <router-link :to="{name:'projectLoan',query:{jie_id:datas.jie_id,redirect:'/home'}}" tag="div" class="handBox_bottom">
                <input type="submit" value="立即出借"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return{
            datas:'',
            isShow:true,//默认显示
        }
    },
    computed:{
        ...mapState({//注册状态
            user_id:state=>state.login.token.user_id
        }),
        ...mapState({//开户状态
            is_identify:state=>state.login.token.is_identify
        }),
        ...mapState({//出借状态
            invest_count:state=>state.login.token.invest_count
        }),
       
    },
    methods:{
        // 请求数据
        getHand(){
            this.$post('/rongtuojinrong/project/novice.json').then(res=>{
                this.datas = res.data.data;
                // console.log(!this.datas)
            })
        },
        //  判断显示与隐藏新手专享
        getToken(){
            // debugger
            // if(!this.user_id){
            //    this.isShow = false;
            // }else if(+this.invest_count){//判断出借状态(0-N)
            //     this.isShow= false;
            // }else if(this.datas==null){
            //     this.isShow= false;
            // }
            if(+this.is_identify==1 && +this.invest_count==0 && this.datas){//开户但未出借、接口返回数据时显示新手专享
                this.isShow = true;
            }else{
                this.isShow = false;
            }
        },
    },
    created(){
        this.getHand();
        this.getToken();
    }
}
</script>

<style lang="scss" scoped>
    .Nav_handBox{
        width:100%;
        height:100%;
        background:#f9f9f9;
        padding:0.11rem;
        .handBox{
            width:100%;
            height:100%;
            .handBox_top{
                width:100%;
                height:0.28rem;
                h2{
                    width:100%;
                    height:0.28rem;
                    font-size:0.14rem;
                    color:#333;
                    font-weight:bold;
                }
            }
            .handBox_center{
                width:100%;
                height:0.92rem;
                background:#fff;
                .content1{
                    width:100%;
                    height:0.52rem;
                    display:flex;
                    align-items:center;
                    padding-left:0.19rem;
                    p{
                      font-size:0.13rem;
                      color:#333;  
                    }
                    span{
                        width: 0.38rem;
                        height:0.14rem;
                        font-size:0.1rem;
                        background:#e6e9fa;
                        color:#015ad6;
                        display:block;
                        text-align:center;
                        line-height:0.14rem;
                        margin:0 0.05rem;
                    }
                    img{
                        display:block;
                        width:0.4rem;
                        height:0.22rem;
                        margin-bottom:0.05rem;
                    }
                }
                .content2{
                    width:100%;
                    height:0.41rem;
                    display:flex;
                    justify-content:space-between;
                    .content2_left{
                        width:50%;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        margin-left:0.44rem;
                        border-right:1px solid #e5e9f9;
                        p:first-child{
                            margin-left:0.05rem;
                            font-size:0.19rem;
                            color:#ff6634;
                            font-weight:bold;
                            i{
                                font-size:0.1rem;
                                color:#ff6634;
                            }
                        }
                        p:last-child{
                            font-size:0.11rem;
                            color:#565656;
                        }
                    }
                    .content2_right{
                        width:50%;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        margin-left:0.71rem;
                           p:first-child{
                            font-size:0.18rem;
                            color:#333;
                            font-weight:bold;
                            margin-right:0.04rem;
                             i{
                                font-size:0.1rem;
                                color:#565656;
                            }
                        }
                        p:last-child{
                            font-size:0.11rem;
                            color:#666;
                            margin-right:0.04rem;
                        }
                    }
                }
            }
            .handBox_bottom{
                width:100%;
                height:0.89rem;
                background:#fff;
                display:flex;
                justify-content:center;
                align-items:center;
                input{
                    width:3.13rem;
                    height:0.41rem;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    background:url(../../../assets/圆角矩形12.png) no-repeat;
                    background-size:100%;
                    border:none;
                    font-size:0.13rem;
                    color:#fff;
                }
            }
        }
    }
</style>
