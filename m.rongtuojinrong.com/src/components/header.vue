<template>
     <div class="back">
        <div class="left"  @click="goback(router)">
            <i v-if="!isShow" class="mintui  mintui-back"></i>
        </div>
        <p>{{title}}</p>
        <slot name="rightTo"></slot>
    </div>
</template>
<script>
export default {
    props:["title",'isShow','router'],//isShow为login页面变量（控制头部箭头样式变化）
    data(){
        return{
           
        }
    },
    methods:{
        goback(router){
            if(router=='code'){
                this.$router.replace({name:router})
            }else{
                this.$router.go(-1)
            }
        }
    },
}
</script>

<style lang="scss">
    .back{
        width: 100%;
        height:0.5rem;
        border-bottom:1px solid #ddd;
        // padding:0 0.1rem;
        background:#fff;
        position:fixed;
        top:0;
        z-index:10;
        .left{
            width:0.2rem;
            height:0.5rem;
            position:absolute;
            top:0rem;
            left:0.1rem;
            z-index:10;
            i{
                height:0.5rem;
                line-height:0.5rem;
                display:block;
                font-size:0.16rem;
            }
        }
        p{
            width:100%;
            height:0.5rem;
            line-height:0.5rem;
            font-size: 0.16rem;
            color: #404040;
            text-align:center;
            position: absolute;
            top:0rem;
        }
        .right_content{
            position:absolute;
            top:0rem;
            right:0.1rem;
            height:0.5rem;
            line-height:0.5rem;
        }
    }
</style>