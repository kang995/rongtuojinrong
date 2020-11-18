<template>
    <div class="recesitBox">
        <headerbar title="债权详情"></headerbar>
        <div class="recesitBox-1">
            <table>
                <tr>
                    <th>回款日期</th>
                    <th>回款类型</th>
                    <th>回款金额/元</th>
                    <th>回款状态</th>
                </tr>
                <tr>
                    <td>2019-05-30</td>
                    <td>利息</td>
                    <td>431.51</td>
                    <td>已还款</td>
                </tr>
                <tr>
                    <td>2019-05-30</td>
                    <td>利息</td>
                    <td>431.51</td>
                    <td>已还款</td>
                </tr>
                <tr>
                    <td>2019-05-30</td>
                    <td>利息</td>
                    <td>431.51</td>
                    <td>已还款</td>
                </tr>
                <tr>
                    <td>2019-05-30</td>
                    <td>利息</td>
                    <td>431.51</td>
                    <td>已还款</td>
                </tr>
                
            </table>
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
    .recesitBox{
        .recesitBox-1{
            padding-top: 0.5rem;
            table{
                width: 100%;
                tr:first-of-type{
                    background-color: #eee;
                    th{
                        font-weight: normal;
                    }
                    height: 0.2rem;
                    line-height: 0.2rem;
                }
                tr{
                    border-bottom: 1px solid #ddd; 
                    height: 0.4rem;
                    line-height: 0.4rem;
                    td:first-of-type{
                        color: #ff6633; 
                    }
                    td:nth-child(3){
                        color: #ff6633; 
                    }
                    td{
                        text-align: center;
                        color: #ddd;
                    }
                } 
            }
        }

    }
}
</style>
