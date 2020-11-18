<template>
    <div class="cart">
        <headerBox title="购物车"></headerBox>
        <div v-if="sign>0" class="content">
            <van-checkbox-group  v-model="result" ref="checkboxGroup">
                
                    <van-checkbox :name="det.goodsId" v-model="isSel" v-for="(det,index) in cartlist" :key="index" class="shopone" @click='select((value[index]),det.score,index)'>
                        <div class="shoplist">
                            <div class="listleft">
                                <img :src="det.goodsImage">
                            </div>
                            <div class="listcenter">
                                <div>{{det.goodsName}}</div>
                                <div class="tjsig">{{det.score}}积分</div>
                            </div>
                            <div class="listcenter listbot">
                                <div class="delt" @click.stop="detshop(det.cartId)">
                                    <div class="detbtn">删除</div>
                                </div>
                                <div @click.stop="changez">
                                    <van-stepper v-model="value[index]" @plus='onplus((value[index]+1),det.score,index,det.cartId)' @minus='onminus((value[index]-1),det.score,index,det.cartId)' input-width="20px" button-size="16px"/>
                                </div>
                                
                            </div>
                        </div>

                    </van-checkbox>

            </van-checkbox-group> 
            <div class="allselect">
                <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>    
                <div class="tjj">
                    <div class="tjj1">合计：<span class="tjsig tjf">{{zongjif}}</span><span class="tjsig">积分</span></div>
                    <div class="tjj2" @click="jies">结算</div>
                </div>
            </div>
            
        </div>

        <div class="showk" v-if="sign==0">
          <div class="kongpig">
            <img src="@/assets/jf-007.png">
          </div>

          <p>购物车没有宝贝~</p>

        </div>
    </div>
  
</template>

<script>
import { Dialog } from "vant";
export default {
    data(){
        return{
            checked: false,
            result: [],
            isselect: false,
            value: [],
            cartlist: [],
            zongjif: 0,
            isSel: false,
            show: false,
            selfjif: 0,
            score: 0,
            sign: -1
        }
    },
    // computed: {
    //     // 计算属性的 getter
    //     zongjif: function () {
    //     // `this` 指向 vm 实例
    //     return this.message.split('').reverse().join('')
    //     }
    // },
    methods:{       
        //删除商品
        detshop(id){
            Dialog.confirm({
            title: '',
            message: '确定要删除宝贝'
            }).then(() => {
                this.$post("/vipshop/v1/shoppingCart/delete.json",{
                    cart_ids: id
                })
                .then(res => {
                    this.showList();
                })
                .catch(err => {});                
            }).catch(() => {
            
            });

          
        },

        //结算
        jies(){
            //console.log(this.zongjif,this.score);


            if(this.zongjif == 0){
                this.$toast("您还没有选择宝贝哦");
            };

            let idarr=[];
            let newarr='';
            for(var i=0;i<this.cartlist.length;i++){
                if(this.cartlist[i].show){
                    idarr.push(this.cartlist[i].cartId);
                }
            }
            
            newarr = idarr.join(",");            
            if(this.score>this.zongjif){
                this.$post("/vipshop/v1/shoppingCart/submitCheck.json",{
                    cartIds: newarr
                })
                .then(res => {
                    if(res.data.data.status == 0){
                        this.$router.push({
                            name: 'newdhadd',
                            query: {biaoz: 1,cartids: newarr}
                        })
                    }
                    
                })
                .catch(err => {});  
            }else{
                Dialog.alert({
                message: '您所选商品所需积分已经超出了你所拥有的积分哦！',
                confirmButtonText:'我知道了',
                }).then(() => {
                // on close
                });                
            }

            
        },

        //获取总积分
        getallscore(){
            this.$post("/vipshop/v1/user/integral.json")
            .then(res => {
                this.score = res.data.data.data.allScore;
            })
            .catch(err => {});              
        },

        //单选商品
        select(a,b,c){      
            this.cartlist[c].show = !this.cartlist[c].show;     
            if(this.cartlist[c].show){
                this.selfjif = a*b;
                this.$set(this.cartlist[c], 'selfjif', this.selfjif);
                //console.log(this.selfjif);
            }else{
                this.$set(this.cartlist[c], 'selfjif', 0);
            }            
            
            let zonji1 = 0;
            //console.log(this.cartlist);
            for(var i=0;i<this.cartlist.length;i++){
                if(this.cartlist[i].selfjif){   
                    zonji1 +=  this.cartlist[i].selfjif ;             
                }
                
            }
            console.log(zonji1);
            this.zongjif = zonji1;
        },
        onminus(a,b,c,d){

            this.$post("/vipshop/v1/shoppingCart/edit.json",{
                cart_id: d,
                goods_num: a
            })
            .then(res => {
                
            })
            .catch(err => {});               




            this.selfjif = a*b;
            this.$set(this.cartlist[c], 'selfjif', this.selfjif);
            let zonji1 = 0;
            if(this.cartlist[c].show){
                for(var i=0;i<this.cartlist.length;i++){
                    if(this.cartlist[i].selfjif){
                        zonji1 +=  this.cartlist[i].selfjif ;             
                    }
                    
                }
                this.zongjif = zonji1;                
            };

            

        },
        onplus(c,d,f,g){
            this.$post("/vipshop/v1/shoppingCart/edit.json",{
                cart_id: g,
                goods_num: c
            })
            .then(res => {
                
            })
            .catch(err => {});  


            this.selfjif = c*d;
            this.$set(this.cartlist[f], 'selfjif', this.selfjif);  
            let zonji1 = 0;
            if(this.cartlist[f].show){
                for(var i=0;i<this.cartlist.length;i++){
                    if(this.cartlist[i].selfjif){ 
                        zonji1 +=  this.cartlist[i].selfjif ;             
                    }
                    
                }
            this.zongjif = zonji1;                 
            };

            
                  
        },
        //购物车列表显示
        showList(){
            this.$post("/vipshop/v1/shoppingCart/lists.json")
            .then(res => {
                this.cartlist = res.data.data.data;
                
                this.sign = this.cartlist.length;
                for(var i=0; i<this.cartlist.length; i++ ){
                    this.value[i] = this.cartlist[i].goodsNum;
                    this.$set(this.cartlist[i], 'show', false);
                    //this.zongjif = this.zongjif + this.cartlist[i].scoreSum;
                    //this.result.push(this.cartlist[i].goodsId);
                }
                //console.log(this.result);
            })
            .catch(err => {});            
        },
        onSubmit(){

        },
        changez(){
            //console.log(this.value);
            
        },
        //全选
        checkAll() {
            let list = this.cartlist;
            let sum = 0;
            if(!this.checked){
                for(var i=0; i<this.cartlist.length; i++ ){
                    this.$set(this.cartlist[i], 'show', true);
                    this.$set(this.cartlist[i], 'realnum', this.value[i]);
                    
                    sum += this.cartlist[i].realnum*this.cartlist[i].score;
                    this.$set(this.cartlist[i], 'selfjif', this.cartlist[i].realnum*this.cartlist[i].score);


                }
                //console.log(sum);   
                this.zongjif = sum;

                for(var i=0; i<this.cartlist.length; i++ ){
                    this.result.push(this.cartlist[i].goodsId);

                }    
                                         
            }else{
                for(var i=0; i<this.cartlist.length; i++ ){
                    this.$set(this.cartlist[i], 'show', false);
                    this.$set(this.cartlist[i], 'realnum', 0);
                    this.$set(this.cartlist[i], 'selfjif', 0);
                }


                for(var i=0; i<this.cartlist.length; i++ ){
                    this.result.pop(this.cartlist[i].goodsId);
                }                
                this.result=[];
                this.zongjif = 0;
            }
        
        },
        toggleAll() {
        //this.$refs.checkboxGroup.toggleAll();
        }        
    },
    created(){
        this.showList();
        this.getallscore();
    }
}
</script>

<style lang="scss" scoped>
.cart{
    .tjsig{
        color: #ff6633;
    }   
    width: 100%;
    min-height: 100%;
    position: absolute;
    background-color: #fafafa; 
    color: black;  
    .content{
        padding-top: 0.635rem;
        .allselect{
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            padding: 0.08rem 0.15rem;
            position: fixed;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            .tjj{
                display: flex;
                align-items: center;
                .tjj1{
                    .tjf{
                        font-size: 0.18rem;
                    }
                }
                .tjj2{
                    width: 0.85rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    text-align: center;
                    background-color: #ff6633;
                    border-radius: 0.3rem;
                    color: #fff;
                    margin-left: 0.1rem;
                }
            }
        }
        .shopone{
            margin: 0.045rem 0.075rem;
            padding: 0.08rem 0.075rem;
            background-color: #fff;   
            border-radius: 0.05rem;
            .shoplist{
                display: flex;
                .listleft{
                    width: 0.84rem;
                    margin-right: 0.12rem;
                    img{
                        max-width: 100%;
                        height: auto;
                    }
                }
                .listcenter{
                    width: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 0.13rem;
                }
                .listbot{
                    width: 0.8rem;
                    align-items: flex-end;
                    .delt{
                        display: flex;
                        justify-content: center;
                        .detbtn{
                            width: 0.42rem;
                            height: 0.19rem;
                            line-height: 0.19rem;
                            color: #c3c3c3;
                            border: 1px solid #c3c3c3;
                            text-align: center;
                        }
                    }
                }
            }
        }

    }

    .showk{
        .kongpig{
        width: 100%;
        margin-top: 1rem;
        img{
            max-width: 100%;
            height: auto;
        }
        }
        p{
        font-size: 0.12rem;
        text-align: center;
        }
    }

}

</style>