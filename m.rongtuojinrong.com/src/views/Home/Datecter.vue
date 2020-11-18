<template>
    <div id="ceshi">
        <p style="text-align:center;margin:10px;">{{date_time.year}}年{{date_time.mouth}}月</p>
        <div class="mout_box">
            <div class="before_mout" @click="before(date_time.year,date_time.mouth-1)">上个月</div>
            <div class="after_mout" @click="before(date_time.year,date_time.mouth+1)">下个月</div>
        </div>

        <div class="date_box">
           <div class="date_hd">
               <li>日</li>
               <li>一</li>
               <li>二</li>
               <li>三</li>
               <li>四</li>
               <li>五</li>
               <li>六</li>
           </div>
            <!--留白-->
            <li v-for="item in date_time.mdayWeek" :key="item"></li>
            <li class=""  v-for='(item,id) in date_list' :key="item.id" :class="item.classList" v-bind:id="id" v-bind:year='date_time.year' v-bind:mouth="date_time.mouth" v-bind:day='item.day' @click='item.method(id,$event)'>{{item.day}}</li>
        </div>

        <div class="show_log" v-show="ashow">
            这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容这是显示内容
        </div>
        <van-popup
        v-model="tshow"
        position="center"
        :style="{ height: '40%',width:'90%' }"
        >
        <div style="padding: 0px 0.1rem;display: flex;justify-content: space-between;align-items: center;height: 0.4rem;color: #0159d5;">
            <div @click="tshow = false">取消</div>
            <div @click="queren_ok">确认</div>
        </div>
        <div style="display:flex;align-items: center;">
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :style="{width:'90%'}"
            :show-toolbar='false'
            />
            <div style="white-space: nowrap;">
                --
            </div>
            <van-datetime-picker
            v-model="currentDate2"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :style="{width:'90%'}"
            :show-toolbar='false'
            />
            </div>
        </van-popup>


    </div>
</template>


<script>
//    import qs from 'qs';
import Vue from 'vue';
import { DatetimePicker } from 'vant';
// import formatDate from '@/modules/datab.js';
import { formatDate } from "../../modules/datab.js";
Vue.use(DatetimePicker);
    export default {
        name: 'ceshi',
        data() {
            return {
                date_list: [],
                date_time:{},
                nowdate:{

                },
                tshow:true,
                ashow : false,
                bfid:false,
                minHour: 10,
                maxHour: 20,
                minDate: new Date(1996,1, 1),
                maxDate: new Date(2049, 10, 1),
                currentDate: new Date(),
                currentDate2: new Date()
            }
        },
        methods: {
            queren_ok(){
                console.log(this.currentDate,this.currentDate2);
                console.log(formatDate(this.currentDate,'y-MM-dd'),formatDate(this.currentDate2,'y-MM-dd'))
            },
            dated(nowdate){
//                if(!date){
//                    date==nowdate = new Date();
//                }
                nowdate||(nowdate=new Date());
                let year = nowdate.getFullYear();
                let mouth = nowdate.getMonth();
                let day = nowdate.getDate();
                let week = nowdate.getDay();
                let mouthday = new Date(year,mouth+1,0).getDate();//本月天数
                let mdayWeek = new Date(year,mouth,1).getDay();//本月第一天周几
//                console.log(nowdate,year,mouth,day,week,mouthday,mdayWeek);
//                mouth:mouth+1,
//                        year:year,
                this.date_time={
                    mouth:mouth+1,
                    year:year,
                    mdayWeek:mdayWeek //用于计算每月第一天的留白数据
                }
                this.date_list=[];
                for(let i=0;i<mouthday;i++){
                    var data = {
                        day:i+1,
                        method:this.htmlDate,//事件绑定method；
                        classList:[]//事件绑定method；
                    }

                    if(i == this.nowdate.day-1&&year == this.nowdate.year && mouth == this.nowdate.mouth){
                        data.classList=['c_red','f_size']
                    }
                    this.date_list.push(data)
                }
            },

            htmlDate(id,event){
               console.log(id,event.target.getAttribute('year'));
                if(this.bfid||this.bfid===0){
                    let className = this.date_list[this.bfid].classList;
                    let removenum = className.indexOf('b_click');
                    className.splice(removenum,1);
                }
                this.bfid = id;
                let className = this.date_list[id].classList.push('b_click');
                this.ashow = true;

            },
            before(year,mouth){
                console.log(year, mouth);
                this.dated(new Date(year, mouth-1));
                this.ashow = false;
            }
        },
        created(){
            var nowdate = new Date();
            this.nowdate = {
                year:nowdate.getFullYear(),
                mouth:nowdate.getMonth(),
                day:nowdate.getDate()
            }
            this.dated();
        }
    }
</script>


<style>
    .date_box{
        overflow: hidden;
    }
    .date_hd li,.date_box li{
        float: left;
        width: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        
    }
    .c_red{
        color: #f00;
    }

    .f_size{
        font-size: 24px;
    }
    .mout_box{
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    .mout_box>div{
        float: left;
        width: 60px;
        text-align: center;
        border: 1px solid #0159d5;
        border-radius: 3px;
        margin:0 20px;
        color: #0159d5;
    }
    .show_log{
        padding: 15px;
    }
    .b_click{
        border: 1px solid #f00;
        box-sizing: border-box;
        color: #f00;
    }
    
</style>
