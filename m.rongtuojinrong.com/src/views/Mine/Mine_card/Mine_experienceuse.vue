<template>
    <div class="redenvelopeuseBox">
        <headerbar title="体验金使用说明"></headerbar>
        <div class="redenvelopeuseBox-1">
            <div class="redenvelopeuseBox-1-a">
                <p>1、体验金是融托金融用平台自有资金设立的一个专门用于提供给平台客户进行平台项目出借体验的基金，是一种出借体验目的虚拟资金。</p>
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>2、获得体验金后，可以出借体验金专享标。</p>         
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>3、体验金专享标是由融托金融设立的一个专门提供给平台客户使用体验金进行出借体验的虚拟项目。</p>
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>4、出借体验标也需要完成实名认证，方便后续出借、取现等操作。</p>  
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>5、客户使用体验金出借项目到期后，所得的收益归客户所有(可提现或续投融托金融平台的任意项目)，本金部分由平台收回。</p>
            </div>
        </div>
        
    </div>
    
</template>

<script>

import headerbar from '@/components/header'
export default {
    data(){
        return{          
            
        }
    },
    methods:{
        
    },
    
    components:{
        headerbar

    }
}
</script>

<style lang="scss" scoped>
body{   
    .redenvelopeuseBox{
        .redenvelopeuseBox-1{
            border-top: 0.05rem solid #eee;
            padding-top: 0.5rem;
            .redenvelopeuseBox-1-a{
                margin: 0.1rem;
                border-bottom: 1px solid #ddd;
                padding-bottom: 0.1rem;
                p:first-of-type{
                    color: black;
                    font-weight: bold;
                    margin-bottom: 0.08rem;
                }
            }
        }
    }
}
</style>
