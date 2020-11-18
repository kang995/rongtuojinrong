<template>
  <div id="rish">
      <headerup :title="tm_list_zong.Title" to="back"></headerup>
      <div style="padding-top:0.44rem">
        <img class="fxpghomebanner" src="../../assets/fxpgwenjuanshouye1.png" alt="" />
      </div>
      <div v-if="zuotima">
        <div class="fxpghometext">
            <p class="tishi">{{tm_list_zong.Subtitle}}</p>
            <p class="fxpghometextp2">{{tm_list_zong.Desc}}</p>
        </div>
        <div class="fxpgxiayibu blue" @click="zuotima = !zuotima">下一步</div>
      </div>
      <div v-else>
        <div class="fxpghometext">
                <p class="rish_wenti">{{tm_list.Content}}</p>
                <div class="my_radio">
                    <van-radio-group v-model="radio">
                        <van-radio :name="item.Id" v-for="item in tm_list.Opt" :key="item.id">
                            {{item.Content}}
                            <img slot="icon" slot-scope="props" :src="props.checked ? activeIcon : inactiveIcon">
                        </van-radio>
                    </van-radio-group>
                </div>
            </div>
        <div :class="{fxpgxiayibu:true,blue:radio}" @click="nextquetion">下一步</div>
      </div>

  </div>
</template>

<script>
import headerup from '@/components/headerUp';
import activeIcon from '@/assets/xuanze_blue.png';
import inactiveIcon from '@/assets/xuanze_moren.png';
export default {
    name:'rish',
    components:{
        headerup
    },

    data() {
        return {
            radio: 0,//当前选项 abc
            tm_num:0,// 当前做题
            tm_arr:[],//答案储存
            tm_list_zong:[],//所有题目
            tm_list:[],//当前选题。
            zuotima:true,
            activeIcon:activeIcon,
            inactiveIcon:inactiveIcon
        }
    },
    methods:{
        nextquetion(){//下一题。
            if(this.tm_num >= this.tm_list_zong.Qu.length||this.radio == 0){
                return;
            }

            this.timu_sive(this.tm_num+1+':'+this.radio);
            this.tm_num = this.tm_num+1;
            //判断下一题为最后一题
            if(this.tm_num >= this.tm_list_zong.Qu.length){
                // console.log(this.tm_arr.join('|'));
                let invite = this.$store.state.invite;
                let postdata = {
                    defidenshuxing:invite.defidenshuxing,
                    answers:this.tm_arr.join('|')
                }
                this.$toast.loading({
                    mask: false,
                    duration: 0,
                    message: '加载中...',
                    forbidClick: true,
                });
                this.$post('/rongtuojinrong/userCenter/accountInformation/questionNaireSubmit.json',postdata).then(res=>{
                   this.$dialog.alert({
                        title: '提示',
                        message: res.data.msg
                    }).then(() => {
                        this.$router.go(-1);
                    });
                    this.$toast.clear();
                })
                return;
            }
            //切换当前做题。
            this.tm_list = this.tm_list_zong.Qu[this.tm_num];
        },
        timu_sive(num){//保存选题答案方法
            this.tm_arr.push(num);
            this.radio = 0;//重置选项。
        },
        tm_init(){//题目初始化。
            let invite = this.$store.state.invite;
            let postdata = {
                defidenshuxing:invite.defidenshuxing
            }
            this.$toast.loading({
                mask: false,
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            this.$post('/rongtuojinrong/userCenter/accountInformation/questionNaire.json',postdata).then(res=>{
                this.tm_list_zong = res.data.data;
                this.tm_list = res.data.data.Qu[this.tm_num];
                this.$toast.clear();
            })
        }

    },
    created(){
        this.tm_init();
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .header_fixed .left i{
        color: #333!important;
    }
// >>>
    /deep/ .header_fixed p{
        color: #333!important;
    }
    /deep/ .header_fixed{
        background: #fff;
    }
    .fxpghomebanner{
        display: block;
        width: 3.75rem;
    }

   .fxpghometext {
        font-size: 0.1523rem;
        color: #333333;
        line-height: 0.23rem;
    }

   .fxpgxiayibu {
        display: block;
        width: 3.4rem;
        height: 0.44rem;
        font-size: 0.152rem;
        color: white;
        background: #cccccc;
        text-align: center;
        border-radius: 3px;
        line-height: 0.44rem;
        position: fixed;
        bottom: 0.2rem;
        left: 50%;
        margin-left: -1.7rem;
    }
    .fxpgxiayibu.blue {
        background: #0159d5;
    }
    .fxpghometextp2{
        padding: 0.12rem;
    }
    .tishi{
        padding: 0.12rem;
        padding-bottom: 0;
    }
    /deep/ .my_radio{
        .van-radio{
            border-bottom: 1px solid #eeeeee;
            padding:0.1rem;
        }
        .van-radio__icon{
            height: auto;
        }
        img{
            width: 0.17rem;
            height:0.17rem;
        }
    }
    .rish_wenti{
        line-height: 0.22rem;
        font-size: 0.152rem;
        padding:0.1rem;
        border-bottom: 1px solid #eeeeee;
    }
</style>
