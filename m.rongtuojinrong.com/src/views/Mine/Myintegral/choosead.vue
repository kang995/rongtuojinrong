<template>
    <div class="hangchoose">
        <div class="back">
            <div class="left"  @click="goback">
                <i class="mintui  mintui-back"></i>
            </div>
            <p>自提地址</p>
            <slot name="rightTo"></slot>
        </div>
        <div class="xuanzebox">
            <div class="topcont">
                <div class="selectBox">
                    <div class="selectBox_show" v-on:click.stop="arrowDown">
                        <i class="icon icon_arrowDown"></i>
                        <p title="请选择">{{unitName}}</p>
                        <van-icon name="play" class="mydes"/>
                        <input type="hidden" name="unit" v-model="unitModel">
                    </div>
                    <div class="selectBox_list" v-show="isShowSelect">
                        <div class="selectBox_listLi" v-for="item in dataList" :key="item.regionId"
                            @click.stop="select(item, item.regionId)">{{item.regionName}}
                        </div>
                    </div>
                </div>

                <div class="selectBox">
                    <div class="selectBox_show" v-on:click.stop="arrowDown1">
                        <i class="icon icon_arrowDown"></i>
                        <p title="请选择">{{unitName1}}</p>
                        <van-icon name="play" class="mydes"/>
                        <input type="hidden" name="unit" v-model="unitModel1">
                    </div>
                    <div class="selectBox_list" v-show="isShowSelect1">
                        <div class="selectBox_listLi" v-for="item1 in cityList" :key="item1.regionId"
                            @click.stop="select1(item1, item1.regionId)">{{item1.regionName}}
                        </div>
                    </div>
                </div>

                <div class="selectBox">
                    <div class="selectBox_show" v-on:click.stop="arrowDown2">
                        <i class="icon icon_arrowDown"></i>
                        <p title="请选择">{{unitName2}}</p>
                        <van-icon name="play" class="mydes"/>
                        <input type="hidden" name="unit" v-model="unitModel2">
                    </div>
                    <div class="selectBox_list" v-show="isShowSelect2">
                        <div class="selectBox_listLi" v-for="item2 in quList" :key="item2.regionId"
                            @click.stop="select2(item2, item2.regionId)">{{item2.regionName}}
                        </div>
                    </div>
                </div>
            </div>
            <van-radio-group v-model="radio">
            <div class="showadd">
                
                    <div v-for="( det, index) in addList" :key="det.shop_id">
                        <van-radio class="add"  :name="index" @click="clickcho(det)">
                            <div class="add1">
                                <div>{{det.shopName}}</div>
                                <div>218m</div>
                            </div>
                            <div>地址：{{det.address}}</div>
                            <div>店长电话：{{det.managerMobile}}</div>
                        </van-radio>
                    </div>


                
            </div>
                    <van-radio name="2" class="add bot" @click="clickcho(1)">
                        <div class="add1">
                            <div>没法自提？</div>
                        </div>
                        <div>请拨打400-878-8686或者rongtuojinrong001</div>
                    </van-radio>
            </van-radio-group>
        </div>

        <!-- <van-popup v-model="bankshow" position="right" :style="{ height: '100%' ,width:'100%'}">
            <addr></addr>
        </van-popup>    -->
<!-- @getbank="getbank" @hidshandow="hidshandow" -->

    </div>
</template>
<script>
import addr from '../mydata/address';
export default {
    props:['cardId','goodsid','goodsnum'],
    // components: {
    //     addr
    // },
    data(){
        return{
            backnum:0,
            privice:[],
            city:[],
            hang:[],
            isShowSelect: false,
            isShowSelect1: false,
            isShowSelect2: false,
            dataList: [
            // {key: -1, value: "请选择"},
            // {key: 0, value: "苹果"},
            // {key: 1, value: "香蕉"}
            ],
            cityList: [],
            quList: [],
            unitName:'全国',
            unitName1:'请选择',
            unitName2:'请选择',
            unitModel: '',
            unitModel1: '',
            unitModel2: '',
            fdataList: [],
            fsheng: '',
            cityid: 0,
            radio: '0',
            add: '',
            addList: [],
        }
    },
    methods:{
        goback(){
            this.$emit('hidshandow',0);
        },

        clickcho(e){
            console.log(e);
            if(e == 1){
                
                this.$router.push({
                    name: 'address',
                    query:{flag:0}
                })
                return;
            }            
            this.$emit('hidshandow',0);
            this.$emit("getbank",e);      
        },

        // getLocation()
        // {     
        //     if (navigator.geolocation)
        //     {
        //         navigator.geolocation.getCurrentPosition(function(pos) {
        //                 var latitude = pos.coords.latitude;
        //                 var longitude = pos.coords.longitude;
        //                 alert("Your position: " + latitude + ", " + longitude);
        //         });
        //     }
        //     else
        //     {
        //         alert("该浏览器不支持获取地理位置。");
        //     }

        // },





        showaddress(a,b){
            console.log(this.goodsid,this.goodsnum);
            this.$post('/vipshop/v1/lists.json',{
                goodsIds: this.goodsid,
                goodsNums: this.goodsnum,
                regionId: a,
                regionFlag: b
            })
            .then(res=>{
            this.addList = res.data.data.data.shops;
            console.log(this.addList);

            })             
        },

        //区
        arrowDown2(){
            this.isShowSelect2 = !this.isShowSelect2;
            this.$post('/vipshop/v1/address/lists.json',{
                regionFlag: 3,
                regionId: this.unitModel1
            })
            .then(res=>{
                if(res.data.data!=null){
                    this.quList = res.data.data.data.region;
                }
            

            })               
        },

        //市
        arrowDown1(){
            this.isShowSelect1 = !this.isShowSelect1;
            this.$post('/vipshop/v1/address/lists.json',{
                regionFlag: 2,
                regionId: this.unitModel
            })
            .then(res=>{
                if(res.data.data!=null){
                    this.cityList = res.data.data.data.region;
                }
            
            console.log(this.cityList);
            })               
        },

        //省
        arrowDown() {
            this.isShowSelect = !this.isShowSelect;
            this.$post('/vipshop/v1/address/lists.json',{
                regionFlag: 1,
                regionId: 0
            })
            .then(res=>{
            this.dataList = res.data.data.data.region;
            })              
        },
        //选择省
        select(item, province_id) {
            this.isShowSelect = false;
            this.unitModel = province_id;
            this.unitName = item.regionName;
            

            this.$post('/vipshop/v1/address/lists.json',{
                regionFlag: 2,
                regionId: this.unitModel
            })
            .then(res=>{
                this.cityList = res.data.data.data.region;
                this.unitName1 = this.cityList[0].regionName;
                

                this.$post('/vipshop/v1/address/lists.json',{
                    regionFlag: 3,
                    regionId: this.cityList[0].regionId
                })
                .then(res=>{
                    this.quList = res.data.data.data.region;
                    this.unitName2 = this.quList[0].regionName;
                    this.showaddress(this.quList[0].regionId,3);
                }) 

            })   





        },
        //选择市
        select1(item1, city_id) {
            this.radio = '0';            
            this.isShowSelect1 = false;
            console.log(item1);
            console.log(city_id);
            this.unitModel1 = city_id;
            this.unitName1 = item1.regionName;


            this.$post('/vipshop/v1/address/lists.json',{
                regionFlag: 3,
                regionId: this.unitModel1
            })
            .then(res=>{
                this.quList = res.data.data.data.region;
                this.unitName2 = this.quList[0].regionName;
                this.showaddress(this.quList[0].regionId,3);
            })  


            

            // this.$post('/vipshop/v1/lists.json',{
                
            // })
            // .then(res=>{
            //  this.quList = res.data.data;

            // this.showaddress();
            
            // })    
            
            
        }, 
        //选择区
        select2(item2,qu_id) {
            this.isShowSelect2 = false;
            console.log(item2);
            console.log(qu_id);
            this.unitModel2 = qu_id;
            this.unitName2 = item2.regionName;
            this.showaddress(this.unitModel2,3);
        }
    },
    created(){
        // this.unitModel = 15;
        // this.unitModel1 = 1224;
        this.showaddress(0,4);
        //this.getLocation();
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
            .topcont{
                width: 100%;
                padding: 0.2rem;
                display: flex;
                justify-content: space-between;
                position: fixed;
                height: 0.5rem;
                z-index: 999;
                background-color: #fff;
                .selectBox_show{
                    width: 0.8rem;
                    height: 0.25rem;
                    border: 1px solid #eee;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;        
                    .mydes{
                        transform: rotate(90deg);
                        margin-left: 0.05rem;
                    }
                }
                .selectBox_list{
                    width: 0.8rem;
                    background-color: #fff;
                    .selectBox_listLi{
                        border: 1px solid #eee;
                        height: 0.2rem;
                        text-align: center;            
                    }
                }                
            }
            .showadd{
            padding-top: 0.5rem;
            height: 5rem;
            overflow: scroll; 
            padding-bottom: 0.5rem;
                .add{
                    width: 100%;           
                    padding: 0.1rem 0.1rem 0.2rem;                   
                    display: flex;
                    align-items: end;    
                    border-bottom: 1px solid #eee;

                    .van-radio__label{
                        width: 100%;
                        .add1{
                            display: flex;
                            justify-content: space-between;
                        }   
                    }
             
                }

            }
            .bot{
                position: fixed;
                bottom: 0;
                width: 100%;
                margin: 0;
                padding: 0.1rem;
                background-color: #fff;
            }
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
