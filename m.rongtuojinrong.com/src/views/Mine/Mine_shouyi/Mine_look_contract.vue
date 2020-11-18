<template>
    <div class="lookcontractBox">
        <headerbar title="债权详情"></headerbar>
        <mt-popup  
            v-model="popupVisible"
            popup-transition="popup-fade"
            :closeOnClickModal=false>
            <div class="popupContent">
                <div class="popupContent-1">                   
                    <span>通知</span>
                </div>
                <p>为避免借款人受到恶意骚扰保障其隐私，即日起，本平台合同中不再披露借款人联系方式。如出借人需要，需向本平台提交书面申请，平台审核方可单独告知。</p>
            </div>
            <div class="popupFooter">
                <div class="popupFooter-btn" @click="popupShow">我知道了</div>
            </div>
        </mt-popup>
        
    </div>
    
</template>

<script>

import headerbar from '@/components/header'
export default {
    data(){
        return{          
            popupVisible: true,
        }
    },
    methods:{
        popupShow(){           
            this.popupVisible=false;
        }
    },
    
    components:{
        headerbar

    }
}
</script>

<style lang="scss" scoped>
body{   
    .lookcontractBox{
        .mint-popup{
                width: 2.45rem;
                border-radius: 10px;
                color: #333333;
                .popupContent{                   
                    margin: 0 0.12rem;
                    .popupContent-1{
                        height: 0.3rem;
                        line-height: 0.3rem;
                        text-align: center;
                        span{
                            font-size: 0.15rem;
                            color: black;
                        }
                    }
                }
                .popupFooter{                    
                    .popupFooter-btn{
                        height: 0.4rem;
                        line-height: 0.4rem;
                        text-align: center;
                        color: #0159d5;
                    }
                }
            }
    }
}
</style>
