<template>
      <div class="header_fixed" :style="mystyle">
          <div class="left" @click="back">
              <i class="mintui mintui-back"></i>
          </div>
          <p>{{data_title}}</p>
          <slot name="rightTo" class="data_title"></slot>
      </div>
      <!-- <div style="height:0.45rem;"></div> -->
</template>

<script>
export default {
    props:['title','mystyle','to'],
    data(){
        return {
            tourl:this.to,
            style :this.mystyle,
            data_title:this.title
        }
    },
    methods:{
        back(){
            if(this.to == 'back'){
                this.$router.go(-1)
            }else{
                this.$router.replcae({path:this.to})
            }
        }
    },
    watch:{
        mystyle(val,val2){
            this.style = val;
        },
        title(val){
            this.data_title = val;
        }
    }

}
</script>

<style lang="scss" scoped>
.header{
    background: transparent;
    height: 0.45rem;
}
.header_fixed{
    position: fixed;
    height: 0.45rem;
    width: 100%;
    background:transparent;
    z-index: 9;
    top: 0;
    .left{
        position: absolute;
        left: 0.1rem;
        top: 0.13rem;
        width: 0.2rem;
        z-index: 1;
        i{
            color: #fff;
            font-weight: normal!important;
            font-size: 0.16rem;
        }

    }
    p{
        position: absolute;
        top: 0;
        width: 100%;
        height: 0.45rem;
        line-height: 0.45rem;
        color: #fff;
        text-align: center;
        background:transparent;
        font-size: 0.16rem;
    }
    .rightTo{
        position: absolute;
        right: 0.1rem;
        top: 0.13rem;
        color: #fff;
        font-size: 0.14rem;
    }
}


</style>
