<template>
  <div id="chongzhi">
         <!--切换栏-->
                    <!-- <router-link to="/" class="topleft">img60.7de91ad2</router-link> -->
      <!--   <div class="cz_top">
            <div class="posi_fixed">
                <div class="topbar">
                    <router-link to="/mine" class="topleft"><img src="../../assets/img61.png" alt=""></router-link>
                    <h3>充值</h3>
                   
                </div>
            </div>
        </div> -->

     <headerBox title="充值"></headerBox>


        <div class="cz_cardbox" style="margin-top:0.6rem;">
            <div class="cz_title">
                <img src="../../assets/huishang_logo2.png" alt=""><span>资金存管专户</span>
            </div>
            <div class="cz_card_num"><input type="text" id="copy_id" value="2210301021000299428"> 2210 3010 2100 0299 428 <br> <span @click="copyText('copy_id')">（复制）</span></div>
            <div class="cz_kaihu_ren humingset">
                <div>收款方户名：</div> 
                <div class="companycop">
                    <span class=" cz_kaihu_name"><input type="text" id="copy_name" value="聊城融托金融服务有限公司">聊城融托金融服务有限公司</span>
                    <span @click="copyText('copy_name')">客户资金汇总专户（复制）</span>
                </div>

            </div>
            <div class="cz_kaihu_ren">开户支行： <span class=" cz_kaihu_name">徽商银行黄山天都支行</span></div>
            <div class="cz_kaihu_ren">开户城市： <span class=" cz_kaihu_name">安徽省黄山市</span></div>
        </div>

        <div class="cz_change_g">
            <div   class="cz_change_zhcz" :class="{active:show_1==5}" @click="show_tab(5)">
                <div class="imgbox"><img  src="../../assets/cz_tuijian.png" alt=""><span>推荐</span></div>
                转账充值
                <!--<span class="cz_zhcz_songjf c_f63">转账充值送积分</span>-->
            </div>
            <div  :class="{active:show_1==6}" @click="show_taby(6)">在线充值</div>
        </div>

        <div class="zzcz" v-show="show_1==6">
            <div class="cz_phone_num">您正在使用的手机号：{{this.$store.state.invite.invite.mobile}} <router-link class="c_0159d5" to="/shiming_photo">更换</router-link></div>
            <ul class="cz_cz_box">
                <li>
                    <div class="cz_cz_box_l">银行卡</div>
                    <div class="cz_cz_box_r">{{card}}</div>
                </li>
                <li>
                    <div class="cz_cz_box_l">金额</div>
                    <div class="cz_cz_box_r"><input type="text" v-model="mqian" @input="filter(mqian)" value="mqian" class="cz_jiner" placeholder="单笔最低1000元，单日最高50000元"></div>
                </li>
            </ul>

            <button v-if="suonline!=0" class="queren_chong" @click="queR(card1)">确认充值</button>
            <button v-else class="nochong queren_chong">确认充值</button>
              <!-- <div  class="packing" v-html="textcanter.con"> </div>  -->
             <div  class="packing"> <iframe class="iframeBox" :src="sign" frameborder="0"></iframe></div>
             

           <!-- 
             <iframe class="iframeBox" :src="textcanter.con" frameborder="0"></iframe> -->
               <!-- <div class="xiane_tit">限额查询</div>
            <table class="xiane_list">
                <tr class="thd">
                    <td>银行名称</td>
                    <td>单笔限额</td>
                    <td>单日限额</td>
                </tr>
                <tr>
                    <td>工商银行</td>
                    <td>5.00万元</td>
                    <td>5.00万元</td>
                </tr>     
            </table> -->


        </div>

        <div class="kjcz" v-show="show_1==5">
            <div class="hualeft">
                <div class="cz_phone_num zfangshi">
                    转账充值方式
                    <!-- <span class="c_f63">（ 仅限绑定的银行卡进行转账充值！）</span> -->
                </div>
                <van-notice-bar
                class="huacontent"
                background="#e7eaf1"
                color="#f63"
                text="（仅限绑定的银行卡进行转账充值！） （仅限绑定的银行卡进行转账充值！）"
                /> 
            </div>
              
                 <!--2018-06-28改动结束-->
                <ul class="cz_cz_box cz_cz_list">
                    <li @click="show_tc(1)">
                        <div class="cz_cz_box_l">方式一</div>
                        <div class="cz_cz_box_r">手机银行</div>
                        <div class="cz_cz_box_r2" @click.stop><a href="javascripr:;" @click="show_tc(4)" class="cz_bank_go c_f63">立即前往</a><img src="../../assets/hk_8.png" alt=""></div>
                    </li>
                    <!-- <li>
                        <div class="cz_cz_box_l">方式二</div>
                        <a href="#">
	                        <div class="" style="width: 4.3rem;line-height: 0.3rem;padding-top: 0.12rem;color: #0159d5;float: left;">掌上银行转账（仅限工、农、中、建、招商等5家银行）</div>
                        </a>
                        <div class="cz_cz_box_r2"><img src="images/yizhuanshouyi2.png" alt=""></div>
                    </li> -->
                    <li @click="show_tc(2)">
                        <div class="cz_cz_box_l">方式二</div>
                        <div class="cz_cz_box_r">网上银行</div>
                        <div class="cz_cz_box_r2"><img src="../../assets/hk_8.png" alt=""></div>
                    </li>
                    <li @click="show_tc(3)">
                        <div class="cz_cz_box_l">方式三</div>
                        <div class="cz_cz_box_r">柜台办理</div>
                        <div class="cz_cz_box_r2"><img src="../../assets/hk_8.png" alt=""></div>
                    </li>
                </ul>
                <div class="cz_phone_num">转账充值，随时随地，方式多样，操作简单。</div>
        </div>


        <div class="tankuang" v-show="show==1">
            <div class="cz_tkbank_01">
                <div class="cz_tkbank_top">
                    <div><img src="../../assets/tc_phone_bank.png" alt=""></div>
                    <div>
                        <p>手机银行</p>
                        <p>M-BANKING</p>
                    </div>
                </div>

                <div class="cz_tkbank_sesc">目前手机银行转账大部分免费，建议使用手机银行进行转账充值；</div>
                <div class="cz_tkbank_sesc">手机银行转账需首先需在网上或银行网点开通绑卡银行的手机银行功能，并下载该银行客户端。</div>
                <div class="tc_close_btn" @click="close_tc"><img src="../../assets/tc_close_01.png" alt=""></div>
            </div>
        </div>
        <div class="tankuang" v-show="show==2">
            <div class="cz_tkbank_01">
                <div class="cz_tkbank_top">
                    <div><img src="../../assets/tc_phone_bank2.png" alt=""></div>
                    <div>
                        <p>网上银行</p>
                        <p>E-BANKING</p>
                    </div>
                </div>

                <div class="cz_tkbank_sesc" style="text-align:center;margin:.48rem 0">网银转账只能在电脑端操作；</div>
                <div class="tc_close_btn" @click="close_tc"><img src="../../assets/tc_close_01.png" alt=""></div>
            </div>
        </div>
        <div class="tankuang" v-show="show==3">
            <div class="cz_tkbank_01">
                <div class="cz_tkbank_top">
                    <div><img src="../../assets/tc_phone_bank1.png" alt=""></div>
                    <div>
                        <p>柜台办理</p>
                        <p>B-COUNTER</p>
                    </div>
                </div>

                <div class="cz_tkbank_sesc">
                    银行柜台转账需填写信息<br>
                    收款账号（资金存管专户）:<br>
                    2210 3010 2100 0299 428<br>
                    收款方户名：聊城融托金融服务有限公司客户资金汇总专户<br>
                    开户支行：徽商银行黄山天都支行
                </div>
                <div class="tc_close_btn" @click="close_tc"><img src="../../assets/tc_close_01.png" alt=""></div>
            </div>
        </div>

        <div class="tankuang" v-show="show == 4">
            <div class="cz_tkbank_01" style="margin-top:0.6rem;width:2.8rem">
                <p class="cz_wenxin_top"><img src="../../assets/tc_phone_bank4.png" alt=""></p>
                <ul class="cz_wenxin_desc">
                    <li><a href="javascript:;">农业银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">民生银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">兴业银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">中信银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">交通银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">上海银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">渤海银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">建设银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">光大银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">招商银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">民生银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">农业银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">中信银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">兴业银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">上海银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">交通银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">建设银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">渤海银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">招商银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                    <li><a href="javascript:;">光大银行<img src="../../assets/tc_phone_bank5.png" alt=""></a></li>
                </ul>
                <div class="tc_close_btn" @click="close_tc"><img src="../../assets/tc_close_01.png" alt=""></div>
            </div>
        </div>
        
        <mt-popup v-model="popupVisible" class="popshow" popup-transition="popup-fade" :closeOnClickModal="false">
          <div class="popupContent">
            <div class="popupContent-1">
              <span>温馨提示</span>
            </div>
            <P>{{signcontent}}</P>
          </div>
          <div class="popupFooter">
            <div class="popupFooter-btn" @click="popupShow">确定</div>
          </div>
        </mt-popup>    


  </div>
</template>

<script>
import { Toast } from "vant";
export default {
    name:'chongzhi',
    data(){
        return{
                mqian:'',
                show:0,
                show_1:5,
                card:"",
                card1: '',
                sign:this.$sign+'/rongtuojinrong/information/bankPayLimit.json?from='+'h5',
                popupVisible: false,
                signcontent: '',
                popupVisible1: false,
                suonline: 1
            }
    },
    methods:{
        queR(a){
            if(this.mqian==''||this.mqian<1000){
                this.popupVisible = true;
                this.signcontent='在线充值最低充值金额为1000元，1000元以下的充值，请使用转账充值！';
                return false;
            }
            if(this.mqian>50000){
                this.popupVisible = true;
                this.signcontent='在线充值单笔限额50000元！';
                return false;                
            }
            this.$router.push({
                name: 'chongzhi',
                query: {recharge_money: this.mqian,CARDNBR: a}
            })
        },
        popupShow(){
            this.popupVisible=false;
        },
        filter(val){
            val = val.replace(/[^\d.]/g,"");
            val = val.replace(/\.{2,}/g,".");
            val = val.replace(/^\./g,"");
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
            this.mqian = val;
        },
        show_tc(val){
            this.show = val;
        },
        close_tc(){
            this.show = 0;
        },
        show_tab(val){
            this.show_1=val;
        },
        show_taby(val){
            
            //
            this.$post( "/rongtuojinrong/userCenter/accountInformation/bankCardBalance.json", {
                defidenshuxing: this.$store.state.invite.defidenshuxing,
                FlagChnl:3  
                })
            .then(res => {
                this.show_1=val;
                this.suonline = res.data.data.isSupportOnLine;
                if(res.data.data.isSupportOnLine==0){
                    this.signcontent='您所绑定的银行卡不支持在线充值，请使用转账充值！若想继续使用在线充值，请更换绑定的银行卡。支持在线充值的银行和限额请参照下方限额查询';
                    this.popupVisible = true;
                    return false;
                }else{
                    
                }
            })
            .catch(err => {});            
        },        
        copyText(id){
            // let text = document.getElementById("text").innerText;
            let input = document.getElementById(id);
            // input.value = text; // 修改文本框的内容\
            input.focus();
            input.setSelectionRange(0, 999999);
            const ret =document.execCommand("copy"); // 执行浏览器复制命令
            input.blur();
            Toast(ret?'复制成功':'复制失败')
        }
    },
    created(){
        //银行卡信息
      this.$post("/rongtuojinrong/userCenter/accountInformation/myBankCard.json",{
        defidenshuxing: this.$store.state.invite.defidenshuxing,
        FlagChnl:3
      }).then(res => {
        //通过正则隐藏银行卡号中间位
        this.card = res.data.data.No;
        this.card1 = res.data.data.No;
        var reg = /^(\d{4})\d+(\d{4})$/;
        this.card = this.card.replace(reg, "$1**********$2");
      })
      .catch(err => {});  

    }
}
</script>

<style lang="scss" >
    .popshow{       
        width: 2.45rem;
        border-radius: 10px;
        color: #333333;
        .popupContent {
            margin: 0.12rem;
            .popupContent-1 {
                font-weight: bold;
                text-align: center;
            }
            p{
                text-align: center;
            }
        }
        .popupFooter {
            border-top: 1px solid #eff2f8;
            .popupFooter-btn {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #0159d5;
            }
        }          
    }



#copy_id,#copy_name{
    position: absolute;
    top:-1000000px;
    opacity: 0;
}
.cz_change_g{
    display: flex;
    >div{
        width: 50%;
        position: relative;
        text-align: center;
        height: 0.41rem;
        line-height: 0.41rem;
    }
    .active{
        color: #0159d5;
    }
    .imgbox{
        position:absolute;
        right: 0;
        line-height: 0.15rem;
        img{
            height: 0.17rem;
        }
        span{
            position:absolute;
            top: 0;
            width: 90%;
            right: 0;
            color: #fff;
            font-size: 0.12rem;
            
        }
    }
}
.cz_top{
    height: 0.41rem;
    .posi_fixed{
        position: fixed;
        width: 100%;
        .topbar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 0.1rem;
            height: 0.41rem;
            position: relative;
            h3{
                position: absolute;
                width: 100%;
                text-align: center;
                z-index: -1;
            }
            .topleft{
                img{
                    height: 0.17rem;
                }
            }
        }
    }
}
.cz_cardbox{
    background: url(../../assets/img60.7de91ad2.png) no-repeat center;
    background-size:100% 100%;
    margin: 0.1rem;
    padding: 0.12rem;
    line-height: 0.25rem;
    color: #fff;
    font-size: 0.12rem;
    .cz_title{
        display: flex;
        justify-content: start;
        align-items: center;
        margin-bottom: 0.1rem;
       img{
           width: 1.11rem;
           height: 0.22rem;
           margin-right: 0.05rem;
       }
    }

    .cz_card_num{
        font-size: 0.2rem;
        text-align: center;
        margin: 0.05rem 0;
        span{
            font-size: 0.12rem;
        }
    }
    .humingset{
        display: flex;
        .companycop{
            display: flex;
            flex-direction: column;
        }
    }
}
.zzcz{
    .cz_phone_num{
        padding: 0 0.1rem;
        height: 0.41rem;
        line-height: 0.41rem;
        background: #f4f5f9;
        font-size: 0.12rem;
        .c_0159d5{
            color: #0159d5;
        }
    }

    .cz_cz_box{
        li{
            padding: 0 0.1rem;
            display: flex;
            justify-content: start;
            align-items: center;
            height: 0.40rem;
            font-size: 0.14rem;
            div{
                &:nth-child(1){
                    width: 0.46rem;
                    margin-right: 0.2rem;
                }
                &:nth-child(2){
                    width: 2.8rem;
                    input{
                        border: none;
                        width: 100%;
                    }
                }
            }
        }
    }
    .queren_chong{
        border: none;
        display: block;
        width: 3.55rem;
        margin: 0.2rem 0.1rem;
        box-sizing: border-box;
        height: 0.41rem;
        line-height: 0.41rem;
        background: #0159d5;
        color:#fff;
        font-size: 0.14rem;
        border-radius: 3px;
    }
    .nochong{
        background: #B5B5B5;
    }    
    .xiane_tit{
        width: 100%;
        margin: 0.2rem 0;
        line-height: 0.41rem;
        height: 0.41rem;
        text-align: center;
        font-size: 0.14rem;
        border-bottom: 1px solid #eeeeee;
    }
    .xiane_list{
        margin: 0.1rem;
        td{
            height: 0.4rem;
            vertical-align: middle;
            text-align: center;
            border: 1px solid #ddd;
            &:nth-child(1){
                width: 1.4rem;
            }
             &:nth-child(2){
                width: 1.1rem;
            }
             &:nth-child(3){
                width: 1.1rem;
            }
        }
        .thd{
            background: #ddd;
        }
    }
  
}

.kjcz{
    .hualeft{
        display: flex;
        align-items: center;
        background: #e7eaf1;
        .zfangshi{
            padding: 0 0 0 0.1rem;
        }
        .huacontent{
            width: 75%;
            padding: 0;
        }
    }
    .c_f63{
        color: #f63;
    }
    .cz_phone_num{
        font-size: 0.1rem;
        padding: 0.1rem;
    }
    .cz_cz_list{
        li{
            padding: 0.1rem;
            display: flex;
            justify-content: start;
            height: 0.41rem;
            align-items: center;
            font-size: 0.13rem;
            border-bottom: 1px solid #eee;
            div{
                &:nth-child(1){
                    width: 0.5rem;
                }
                &:nth-child(2){
                    width: 2.4rem;
                    color: #0159d5;
                }

                &:nth-child(3){
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: 0.64rem;
                    img{
                        height: 0.12rem;
                        margin-left: 0.02rem;
                    }
                }
            }

        }
    }
}
.tankuang{
    background: rgba($color: #000000, $alpha: 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    .cz_tkbank_01{
        top: 0;
        width: 3.1rem;
        background: #fff;
        margin: 0 auto;
        margin-top: 1.8rem;
        border-radius: .125rem;
        position: relative;
        padding-bottom: 0.15rem;
        .cz_tkbank_top{
            background: #0159d5;
            color: #fff;
            overflow: hidden;
            border-radius: .125rem .125rem 0 0;
            display: flex;
            justify-content: center;
            height: 0.6rem;
            margin-bottom: 0.1rem;;
            >div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                img{
                    height: 0.3rem;
                    margin-right: 0.1rem;
                }
            }
        }
        .cz_tkbank_sesc{
            padding: 0.05rem 0.1rem;
        }
        .tc_close_btn{
            position: absolute;
            bottom: -0.8rem;
            left: 50%;
            margin-left: -0.125rem;
            img{
                height: 0.25rem;
            }
        }

        .cz_wenxin_desc{
            display: flex;
            flex-wrap: wrap;
            width: 1.7rem;
            margin: 0 auto;
            justify-content: space-around;
            li{
                width: 50%;
                margin: 0.06rem 0;
                a{
                    font-size: 0.14rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #0099e9;
                }
                &:nth-child(even){
                    a{
                        justify-content: flex-end;
                    }
                }
                img{
                    width: 0.1rem;
                    height: 0.1rem;
                    margin-left: 0.05rem;
                }
            }
        }
    }

    .cz_wenxin_top{
        border: 1px solid transparent;
        img{
            width: 2.5rem;
            margin: 0.3rem auto 0.2rem;
        }
    }
}



//限额样式
.packing{
    width:100%;
            height:100%;
            position: absolute;
.iframeBox{
            width:100%;
            height:100%;
            //padding-top:0.5rem;
             margin: 0 auto;
             .topbar h3{font-size: 0.14rem !important;}
        }
}



</style>
