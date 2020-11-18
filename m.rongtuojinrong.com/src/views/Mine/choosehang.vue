<template>
    <div class="hangchoose">
        <div class="back">
            <div class="left"  @click="goback">
                <i class="mintui  mintui-back"></i>
            </div>
            <p>{{title[backnum]}}</p>
            <slot name="rightTo"></slot>
        </div>
        <div class="xuanzebox">
            <div v-if="backnum==0">
                <van-cell :title="item.Name" v-for="item in privice" :key="item.id" is-link @click="fnprivice(item.Code)"/>
            </div>
            <div v-if="backnum==1">
                <van-cell :title="item.Name" v-for="item in city" :key="item.id" is-link @click="fncity(item.CityCode)"/>
            </div>
            <div v-if="backnum==2">
                <van-cell :title="item.lname" v-for="item in hang" :key="item.id" is-link @click="fnhang(item)"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['cardId'],
    data(){
        return{
           title:['选择省份','选择城市','选择开户行'],
           backnum:0,
           privice:[],
           city:[],
           hang:[]
        }
    },
    methods:{
        goback(){
            if(this.backnum == 0){
                this.$emit('hidshandow',0);
                return;
            }
            this.backnum = this.backnum-1;
        },
        initprice(){
            let postdata = {
                FlagChnl:'3',
            }
            this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            this.$post('/rongtuojinrong/userCenter/withdrawal/province.json',postdata).then(res=>{
                this.privice = res.data.data.Province;
                this.$toast.clear();
            })
        },
        fnprivice(num){
            ///
            this.backnum = 1+this.backnum;
            let postdata = {
                FlagChnl:'3',
                Code:num
            }
            this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            this.city = [];
            this.$post('/rongtuojinrong/userCenter/withdrawal/city.json',postdata).then(res=>{
                this.city = res.data.data.City;
                this.$toast.clear();
            })
        },
        fncity(num){
            this.backnum = 1+this.backnum;
            this.hang= [];
            this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            let postdata = {
                FlagChnl:'3',
                CityCode:num,
                CardNo:this.cardId,
            }
            console.log(this.cardId);
            this.$post('/rongtuojinrong/userCenter/withdrawal/bankName.json',postdata).then(res=>{
                this.hang = res.data.data.card_list;
                this.$toast.clear();
            })
        },
        fnhang(obj){
          this.$emit("getbank",obj);
          this.backnum = 0;
        }
    },
    created(){
        this.initprice();
    }
}
</script>

<style lang="scss">
    .hangchoose{
        .xuanzebox{
            position:absolute;
            padding-top:0.5rem;
            height: 100%;
            width: 100%;
        }
    }

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
