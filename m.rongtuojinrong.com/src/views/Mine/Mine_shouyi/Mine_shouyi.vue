<template>
    <div class="shouyiBox">
        <headerBox title="已赚收益"></headerBox>
        <div class="shouyiBox-all">
            <ul v-if="sign!=null">
                <li v-for="(det,index) in monthlist" :key="index" :class="{toTop:index==numb}">
                    <div class="shouyiBox-a" @click="clickShow(index)">
                        <div class="shouyiBox-a-1">{{det.month}}</div>
                        <div class="shouyiBox-a-2">
                            <span>{{det.Monthtotal}}</span>
                            <div class="shouyiBox-a-2">
                                <van-icon name="arrow-down" v-if="det.show"/>
                                <van-icon name="arrow" v-else/>
                            </div>
                            
                        </div>
                    </div>
                    <ul class="shouyiBox-b" v-show="det.show">
                        <li class="shouyiBox-b-i" v-for="(dayl,index) in det.Monthlist" :key="index">
                           
                            <div class="shouyiBox-b-i2">
                                <div class="shouyiBox-b-i2all">

                                    <div class="shouyiBox-b-i2e">
                                        <div class="pin-solid icon"><span>{{dayl.daynum}}</span></div>                               
                                        <span>{{dayl.day}}</span> 
                                    </div>
                                    <div class="shouyiBox-b-i2a">
                                        当日合计：<span>{{dayl.daytotal}}</span>
                                    </div>
                                </div>
                                
                                <ul class="shouyiBox-b-i2bx">
                                    <router-link v-for="(nowd,index) in dayl.daylist" :key="index" :to="{name:'creditorDetail',query:{id:nowd.jilu_id}}" class="shouyiBox-b-i2ball" tag="li">
                                        <div class="shouyiBox-b-i2b">
                                            <div>{{nowd.jie_title}}</div>   
                                            <span class="shouyiBox-b-i2b-s2">{{nowd.money}}</span>
                                        </div>
                                    </router-link>

                                </ul>
                                                                
                            </div>
                        </li>

                    </ul>
                    
                </li>
                
            </ul>

            <div v-else class="nullinfo">
                <div class="shownull">
                    <img src="@/assets/sm_19.jpg">
                </div>
            </div>            
        </div>
        
    </div>
    
</template>

<script>

export default {
    data(){
        return{          
            show: true,
            num: 0,
            monthlist : [],
            sign: '',
            numb: 0
        }
    },
    methods:{
        clickShow(a){
            this.numb = a;
            this.$set(this.monthlist[a], 'show', !this.monthlist[a].show);
            //console.log(!this.monthlist[a].show);
            if(!this.monthlist[a].show){
                return false;
            }

            setTimeout(()=>{
                var tt = document.querySelector('.toTop');
                //console.log("a",document.documentElement.scrollTop,tt.offsetTop);
                document.documentElement.scrollTop = tt.offsetTop;
            },50)
        }
    },
    created(){
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true
        });
        this.$post('/rongtuojinrong/userCenter/interest/earnedIncome.json')
        .then(res=>{
            this.sign = res.data.data;
            this.monthlist = res.data.data;
            this.$toast.clear();

            this.clickShow(0);
        })
        .catch(err=>{

        })        

        
    }
}
</script>

<style lang="scss" scoped>
body{   
    .shouyiBox{
        .shouyiBox-all{
            ul{
                position: relative;
            }
            padding-top: 0.5rem;
            .nullinfo{
                background-color: #fff;
                display: flex;
                justify-content: center;
                margin-top: 1rem;
                .shownull{
                    width: 1.5rem;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
            }            
            .shouyiBox-a{
                padding: 0 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.5rem;
                border-bottom: 1px solid #ddd;
                .shouyiBox-a-2{               
                    display: flex;
                    align-items: center;
                    span{
                        color: #ff6633;
                    }
                }
            }
        .shouyiBox-b{
            padding: 0 0 0 0.1rem;
            .shouyiBox-b-i{
                display: flex;
                justify-content: space-between;
                .shouyiBox-b-i1{
                    width: 13%;                   
                    
                    .shouyiBox-b-i1c{
                        border-right: 1px solid #ddd;
                    }
                        
                        // .pin-solid.icon:before{content:'';position:absolute;left:3px;top:3px;width:4px;height:4px;color:#fff;border:solid 1px currentColor;border-radius:3px;background-color:currentColor}

                
            }
        }
        .shouyiBox-b-i2{
            width: 100%;            
             .shouyiBox-b-i2all{
                 display: flex;
                justify-content: space-between;
             }
             .shouyiBox-b-i2e{
                 width: 10%;
                 background-color: #fff;
                 .pin-solid.icon{
                        color:#ddd;                        
                        margin-left:7px;
                        margin-top:2px;
                        width:0.2rem;
                        height:0.2rem;
                        border:solid 1px currentColor;
                        border-radius:10px 10px 10px 0;
                        background-color:currentColor;
                        -webkit-transform:rotate(-45deg);
                        transform:rotate(-45deg);
                        position: relative;
                        display: flex;
                        justify-content: center;
                        span{
                            color: #ffffff;
                            position: absolute;
                            transform: rotate(45deg);
                        }
                    }
             }
             .shouyiBox-b-i2a{    
                 width: 88%;        
                 height: 0.25rem;
                 line-height: 0.25rem;    
                 display: flex;
                 justify-content: flex-end;
                 background-color: #eee;
                 padding-right: 0.1rem;
             }
             .shouyiBox-b-i2bx{
                 margin-top: -0.1rem;
                 .shouyiBox-b-i2ball{
                    border-left: 1px dotted #ddd;
                    margin-left: 0.15rem;
                        .shouyiBox-b-i2b{
                        margin-left: 0.3rem;                 
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #ddd;
                        padding-right: 0.1rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        div{
                            white-space:nowrap; 
                            width:80%; 
                            overflow:hidden;
                            text-overflow:ellipsis;                            
                        }
                        .shouyiBox-b-i2b-s2{
                            color: #ff6633;
                        }
                    }
                }
             }
             
             
        }
    }
        }




    

    }
}
</style>
