<template>
    <div class="TabItemBox" @click="changeFlag">
        <span v-if="!flag">
            <slot name="normalImg"></slot>
        </span>
        <span v-else>
            <slot name="activeImg"></slot>
        </span>
        <!-- 使用三目运算符，动态给txt文本添加激活样式 -->
        <span :class="['title',(flag ? 'active' : '')]">{{txt}}</span>
         <!-- <span :class="{'title':true,'active':flag}">{{txt}}</span> -->
    </div>  
</template>

<script>
export default {
    props:["txt","mark","sel"],
    computed:{
        flag(){//flag标志，控制normal图片和active图片的切换
            if(this.mark === this.sel){//判断mark标志和当前路由
                return true;
            }else{
                return false;
            }
        }
    },
    methods:{
        changeFlag(){//改变flag标志的方法，实现点击当前TabItem使其高亮
            this.$router.push("/"+ this.mark);//编程式导航实现组件切换和跳转
            // console.log('sel',this.sel)
            // console.log('mark',this.mark)
        }
    }
}
</script>

<style lang="scss" scoped>
    .TabItemBox{
        flex:1;
        display:flex;
        height:.495rem;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        img{
            width:.2rem;
            height:.2rem;
        }
        .title{
            font-size:0.1rem;
            color:#333;
            margin-top:0.04rem;
                &.active{
                color:#095ac6;
            }
        }
       
    }
</style>
