<template>
    <div class="redenvelopeuseBox">
        <headerbar title="红包券使用说明"></headerbar>
        <div class="redenvelopeuseBox-1">
            <div class="redenvelopeuseBox-1-a">
                <p>Q: 如何选择红包券？</p>
                <p>用户出借时，可选择需要使用的红包，选择红包后，可自动抵减出借本金。（如未选择使用红包，则此次出借不享受红包抵扣）</p>
                <p>普通标默认用户使用红包券，若用户不想使用可自行选择不使用。</p>
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>Q: 每次出借可以使用几个红包券？</p>
                <p>用户出借只能使用一个红包券，且不能和加息券同时使用。</p>               
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>Q: 各类红包券的使用条件是什么？</p>
                <p>各类红包的具体使用条件请参阅该红包券的介绍页面</p>
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>Q: 使用了红包券出借如何计算收益？</p>
                <p>使用了红包券，按照您的出借本金正常计算收益。比如：您投标了1000元，用了5元的红包券，实际支付995元，系统会按照1000元正常计算收益。</p>                
            </div>

            <div class="redenvelopeuseBox-1-a">
                <p>Q: 系统在选择默认红包时按照什么规则？</p>
                <p>优先按照红包券到期时间由早到晚进行排序；</p>
                <p>当红包券到期时间相同时，按照红包券金额由大到小进行排序；</p>
                <p>当红包券金额相同时，按照红包券发放时间由早到晚进行排序；</p>
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
