<template>
    <div class="credetBox">
        <headerBox title="债权详情"></headerBox>
        <!-- <div class="credetBox-all">
            <div class="credetBox-a">
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">项目名称</span>
                    <span class="credetBox-a-s2">供应链融资19043006</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">承付保障</span>
                    <span class="credetBox-a-s2">山东华建仓储装备科技有限公司</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">还款方式</span>
                    <span class="credetBox-a-s2">每月还息到期还本息</span>
                </div>
            </div>

            

            <div class="credetBox-a">
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">项目状态</span>
                    <span class="credetBox-a-s2">还款中</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">转让状态</span>
                    <span class="credetBox-a-s2">未转让</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">原出借额</span>
                    <span class="credetBox-a-s2">50000.00</span>
                </div>
            </div>

            <div class="credetBox-a">
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">预期年化利率</span>
                    <span class="credetBox-a-s2">10.5%</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">预期获取利息</span>
                    <span class="credetBox-a-s2">2200.68元</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">投标时间</span>
                    <span class="credetBox-a-s2">2019-04-30 15:23:07</span>
                </div>
            </div>

            <div class="credetBox-a">
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">到期时间</span>
                    <span class="credetBox-a-s2">2019-09-30</span>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">回款情况</span>
                    <router-link :to="{name:'receSituation'}" class="credetBox-a-s2" tag="span">查看</router-link>
                </div>
                <div class="credetBox-a-1">
                    <span class="credetBox-a-s1">查看合同</span>
                    <router-link :to="{name:'lookContract'}" class="credetBox-a-s2" tag="span">查看</router-link>
                </div>
            </div>

            <div class="credetBox-btn">
                不可转让
            </div>
        </div> -->
        <div v-html="det" class="content"></div>

        
    </div>
    
</template>

<script>

export default {
    data(){
        return{          
            det: ''
        }
    },
    methods:{
        
    },
    created(){
        this.$post('/rongtuojinrong/userCenter/bond/bondDetails.json',{
            jilu_id: this.$route.query.id
        })
        .then(res=>{
            this.det = res.data
        })
        .catch(err=>{

        })        
    }
}
</script>

<style lang="scss" scoped>
body{   
    .credetBox{
        width: 100%;
        .content{
            padding-top: 0.5rem;
        }
        .credetBox-all{
            padding-top: 0.5rem;
            .credetBox-a{
                background-color: #eee;
                padding-top: 0.2rem;
                .credetBox-a-1{
                    background-color: #fff;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0.1rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    border-bottom: 1px solid #ddd;
                    .credetBox-a-s1{
                        color: black;
                    }
                }
            }
            .credetBox-btn{
                width: 100%;
                margin: 0 auto;
                text-align: center;
                height: 0.3rem;
                line-height: 0.3rem;
                background-color: #eee;
                color: #fff;
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
        
    }
}
</style>
