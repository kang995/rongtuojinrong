<!-- 回款计划 -->
<template>
    <div id="plan">
        <!-- 头部 -->
        <!-- <mt-header title="回款计划" :style="{background:bgcolor,transition:'background 1s'}" fixed>
            <router-link>
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link slot="right" class="month_total" to="/totalmonth">月度总览</router-link>
        </mt-header> -->
        <!-- <aaa title="aaa"></aaa> -->
        <headerup title="回款计划" :style="{background:bgcolor,transition:'background 1s'}" to="back">
            <router-link slot="rightTo" to="/totalmonth" class="rightTo">月度总览</router-link>
        </headerup>
        <div class="hk_pass">
            <img class="w100" src="../../../assets/hk_1.png" alt="">
            <div class="date_cont">
                <p class="p1">{{date_time.year}}</p>
                <div class="dspfx">
                    <div :class="{div_1:true,active:DM_flag == 'm'}" @click="changeMD('m',date_time.day)">{{date_time.mouth}}月</div>
                    <div :class="{div_2:true,active:DM_flag == 'd'}" @click="changeMD('d',date_time.day)">{{date_time.day}}日</div>
<!--                    <p style="text-align:center;margin:10px;">年月</p>-->
                </div>

                <div class="date_table a1" ref="dingwei">
                    <div class="dtitle">
                        <div class="dtitle_gp">
                            <img src="../../../assets/hk_2.png" alt=""><span class="c_1">结息日</span>
                            <img src="../../../assets/hk_3.png" alt=""><span class="c_1">还本日</span>
                            <img src="../../../assets/hk_4.png" alt=""><span class="c_2">已结算</span>
                        </div>
                        <div class="dtitle_tody" @click="setToday">
                            今日
                        </div>
                    </div>

                    <div class="d_table1">
                        <div class="">日</div>
                        <div class="">一</div>
                        <div class="">二</div>
                        <div class="">三</div>
                        <div class="">四</div>
                        <div class="">五</div>
                        <div class="">六</div>
                    </div>
                    <div class="d_table2">
                       <div v-for="item in date_time.mdayWeek" :key="item.id"></div>
                       <div class=""  v-for='(item,id) in date_list' :class="item.classList" v-bind:id="id" v-bind:year='date_time.year' v-bind:mouth="date_time.mouth" v-bind:day='item.day' @click='item.method(id)' :key="item.id">{{item.day}}</div>
                    </div>
<!--
                    <div class="before_mout" >上个月</div>
            <div class="after_mout" >下个月</div>
-->
                    <div class="change_hd">
                        <img src="../../../assets/hk_5.png" alt="" @click="before(date_time.year,date_time.mouth-1,date_time.day)"><span>左右点击可查看其它月份</span><img @click="before(date_time.year,date_time.mouth+1,date_time.day)" src="../../../assets/hk_6.png" alt="">
                    </div>
                </div>

                <div class="hk_dlist">

                    <div v-if="DM_flag=='m'">
                        <div class="hk_wujilu" v-if="Datas.outerTotalAmt=='0.00'&&Datas.insideTotalAmt=='0.00'">
                            <img src="../../../assets/hk_9.png" alt="">
                            <p>当月无记录</p>
                        </div>
                        <div v-else>
                            <router-link :to="{name:'plandetail',query:{type:'1',hktype:'2',date:date_time.year+'-'+date_time.mouth}}"  class="li">
                                <div class="li_d1"><img src="../../../assets/hk_10.png" alt=""></div>
                                <div class="li_d2">
                                    <p>当月应收本金(元)：<span>{{Datas.outerTotalAmt}}</span></p>
                                    <p>已收本金(元)：<span>{{Datas.hadOuterTotalAmt}}</span></p>
                                </div>
                                <div class="li_d3">
                                    <div>查看详情</div><img src="../../../assets/hk_8.png" alt="">
                                </div>
                            </router-link>

                            <router-link :to="{name:'plandetail',query:{type:'1',hktype:'1',date:date_time.year+'-'+date_time.mouth}}" class="li">
                                <div class="li_d1"><img src="../../../assets/hk_10.png" alt=""></div>
                                <div class="li_d2">
                                    <p>当月应收利息(元)：<span>{{Datas.insideTotalAmt}}</span></p>
                                    <p>已收利息(元)：<span>{{Datas.hadInsideTotalAmt}}</span></p>
                                </div>
                                <div class="li_d3">
                                    <div>查看详情</div><img src="../../../assets/hk_8.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div v-else>
                        <div class="hk_wujilu" v-if="!ashow">
                            <img src="../../../assets/hk_9.png" alt="">
                            <p>当日无记录</p>
                        </div>
                        <div v-else>
                            <router-link :to="{name:'plandetail',query:{type:'2',hktype:'2',date:date_time.year+'-'+date_time.mouth+'-'+date_time.day}}" class="li">
                                <div class="li_d1"><img src="../../../assets/hk_10.png" alt=""></div>
                                <div class="li_d2">
                                    <p>当日应收本金(元)：<span>{{dayData.outerTotalAmt}}</span></p>
                                    <p>已收本金(元)：<span>{{dayData.hadOuterTotalAmt}}</span></p>
                                </div>
                                <div class="li_d3">
                                    <div>查看详情</div><img src="../../../assets/hk_8.png" alt="">
                                </div>
                            </router-link>
                            <router-link :to="{name:'plandetail',query:{type:'2',hktype:'1',date:date_time.year+'-'+date_time.mouth+'-'+date_time.day}}" class="li">
                                <div class="li_d1"><img src="../../../assets/hk_10.png" alt=""></div>
                                <div class="li_d2">
                                    <p>当日应收利息(元)：<span>{{dayData.insideTotalAmt}}</span></p>
                                    <p>已收利息(元)：<span>{{dayData.hadInsideTotalAmt}}</span></p>
                                </div>
                                <div class="li_d3">
                                    <div>查看详情</div><img src="../../../assets/hk_8.png" alt="">
                                </div>
                            </router-link>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>


<script>
import headerup from '@/components/headerUp';
import { type } from 'os';
    export default {
        name: 'plan',
        components:{
            headerup
        },
        data() {
            return {
                date_list: [],//日期列表1，2，3，4天
                date_time:{},//储存选择点击的时间；
                nowdate:{},//页面初始化今日时间
                ashow : false,//控制显示是否有回款列表的显示。
                bfid:false,//记录上一次点击的天数。
                DM_flag:'m',//月日按钮切换功能
                bgcolor:'transparent',//top-title 背景色变换
                Datas:[],
                dayData:[],
                bjcls:['dsty_1','dsty_2','dsty_3']//类名标记
            }
        },
        methods: {
            dated(nowdate,fun){
                this.$toast.loading({
                    mask: false,
                    duration: 0,
                    message: '加载中...',
                    forbidClick: true,
                });
                //nowdate 传递的时间进行初始化，对日历进行初始化渲染操作。 fun 解决异步请求加载数据问题
                nowdate||(nowdate=new Date());
                let year = nowdate.getFullYear(); //把年赋值给 year
                let mouth = nowdate.getMonth();   //把月赋值给mouth
                let day = nowdate.getDate();   //把一个月返回的某一天赋值给day
                let week = nowdate.getDay(); //把一个星期返回的某一天赋值给week
                let mouthday = new Date(year,mouth+1,0).getDate();//本月天数，某一天
                let mdayWeek = new Date(year,mouth,1).getDay();//本月第一天周几 ，某一天
                let token = this.$store.state.login.token;
                //选中选择的日期
                // 创建date_time对象，把年 月 日 星期 储存到里面
                this.date_time={
                    mouth:mouth+1,
                    year:year,
                    day : day,
                    mdayWeek:mdayWeek //用于计算每月第一天的留白数据
                }
                // 链接 年 和 月
                let postdata = {
                    Month:this.date_time.year+'-'+this.date_time.mouth,
                  };
                //月份初始化时间先清空。
                // 创建date_time空数组
                this.date_list=[];
                // 遍历本月天数
                for(let i=0;i<mouthday;i++){
                    // 创建 date对象 
                    var data = {
                        day:i+1,
                        method:this.setblue,//事件绑定method；
                        classList:{}//类名class样式对象
                    }
                    // 判断 本月的 某一天等等于 选中选择的天数 && 本年等等于选中的年数 && 本月等等于选中的月数
                    if(i == this.nowdate.day-1&&year == this.nowdate.year && mouth == this.nowdate.mouth){
                        data.classList['d_today'] = true;//添加今日灰色图标的样式；
                    }
                    // 选出来的date对象添加到 date_list数组里面
                    this.date_list.push(data);
                }
                //https://php.rongtuojinrong.com/rongtuoxinsoc/Huishang?CmdId=MonthRecivesCashPlan&UserId=31753&Token=73e556fbfd92cd029e6e860780b42a64&defidenshuxing=1&platformiOS=iOS&AppTime=1566021219&FlagChnl=1&Month=2019-08&AppId=iOS
                this.$post('/rongtuojinrong/repayment/MonthRecivesCashPlan.json',postdata).then(res=>{
                    this.Datas = res.data.data;
                    if(this.Datas.lixilist){
                        // 如果 是true的话 就会选中 下标 0 的 类名标记 dsty_1
                        this.setbiaoji(this.Datas.lixilist,this.bjcls[0]);
                    }
                    if(this.Datas.huanbenlist){
                        // 如果 是true的话 就会选中 下标 1 的 类名标记 dsty_2
                        this.setbiaoji(this.Datas.huanbenlist,this.bjcls[1]);
                    }
                    if(this.Datas.jiesuanlist){
                        // 如果 是true的话 就会选中 下标 2 的 类名标记 dsty_23
                        this.setbiaoji(this.Datas.jiesuanlist,this.bjcls[2]);
                    }
                    // console.log(this.date_time,this.nowdate)
                    // 这个是在接口调用解决异步
                    fun();
                    this.$toast.clear();
                })
            },
            //通用点击蓝色背景
            setblue(id){
//               console.log(id,event.target.getAttribute('year'));
            //    this.bfid 是 false
                if(this.bfid||this.bfid===0){
                    let className = this.date_list[this.bfid].classList;
                    className['d_click'] = false;
                }
                this.bfid = id;
                // let className = this.date_list[id].classList['d_click'] = true;
                this.$set(this.date_list[id].classList, 'd_click', true);
                this.date_time.day = id+1;
                this.ashow = false;
                this.changeMD('d',id+1);
            },
            //切换年份
            before(year,mouth,day){
                let date1 = new Date(year,mouth,0);
                let day1 = date1.getDate();
                // 判断  如果 this.bfid 大余下个月最有一天
                if(this.bfid > day1-1){
                    day = day1;
                    this.bfid = day1-1;
                }
                this.dated(new Date(year, mouth-1,day),()=>{});
                this.changeMD('m',day);
                this.nowdate.year = 9999;
                // this.ashow = false;
                // if(this.nowdate.mouth == mouth-1){
                //     this.setblue(this.nowdate.day-1);
                // }
            },
            //设置今天标记
            setToday(){
                var nowdate = new Date();
                // 通过对象的方式把年 月 日 存入 里面
                this.nowdate = {
                    year:nowdate.getFullYear(),
                    mouth:nowdate.getMonth(),
                    day:nowdate.getDate()
                }

                //若本日有回款标记，直接请求回款的数据。使用回调函数，有效解决一步请求数据的延迟的问题。
                this.dated('',()=>{
                    if(this.date_time.year == this.nowdate.year &&this.date_time.mouth == this.nowdate.mouth+1&&this.date_time.day == this.nowdate.day){
                        this.bfid = false;
                        // let flg = this.data_flg(this.date_time.day-1);
                        this.setblue(this.date_time.day-1);
                    }
                });
                // this.setblue(this.nowdate.day-1);
            },
            data_flg(zhe_tian){//判断是否含有回款的标记 zhe_tian->方法传参；需要判断的天数
                // let f1 = this.date_list[zhe_tian].classList['dsty_1'];
                // let f2 = this.date_list[zhe_tian].classList['dsty_2'];
                // let f3 = this.date_list[zhe_tian].classList['dsty_3'];
                for(let val of this.bjcls){
                    let fg = this.date_list[zhe_tian].classList[val];
                    if(fg){
                        return true;
                    }
                }
                return false
            }
            ,
            //给每天有回款的设置标记 arr 需要添加标记的天数， classname 添加的样式class名
            setbiaoji(arr,classname){
                for(var i =0;i<arr.length;i++){
                    var num = arr[i]-1;
                    // this.date_list[num].classList[classname] = true;
                    this.$set(this.date_list[num].classList, classname, true);
                    // this.date_list[num].method = this.getxiangqing;
                }
            },
            //获取项目详情 num 传入参数通过num对当前点击对象的classList进行类名添加
            // getxiangqing(num){
            //     this.setblue(num)
            //     // console.log('getxq',this.ashow)
            // },
            //获取数据借口封装；
            load_day(){
                this.$toast.loading({
                    mask: false,
                    duration: 0,
                    message: '加载中...'
                })
                let postdata = {
                    SearchDate:this.date_time.year+'-'+this.date_time.mouth+'-'+this.date_time.day
                };

                this.$post('/rongtuojinrong/repayment/DayRecivesCashPlan.json',postdata).then(res=>{
                    this.ashow = true;
                    this.dayData = res.data.data;
                    this.$toast.clear();
                })
            }
            ,
            //月日切换功能啊；上面呢个框框 str 用来判断点击事件触发的元素为月还是日。 day 选择的时间传入。
            changeMD(str,day){
                this.DM_flag = str;
                if(str == 'd'){
                    this.date_list[day-1].classList['d_click'] = true;
                    this.ashow = false;
                    if(this.data_flg(day-1)){
                        // this.date_list[day-1].classList['d_click'] = true;
                        this.load_day();
                    }
                }else{
                    this.date_list[day-1].classList['d_click'] = false;
                }
            },
            //控制顶部透明色渐变样式
            onscroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop<40){
                    this.bgcolor = 'transparent';
                }else{
                    this.bgcolor = '#0159d5!important';
                }
            }
        },
        created(){
            this.setToday();
            setTimeout(() => {
                window.onscroll = this.onscroll;
            }, 0);
        },
        destroyed () {
            window.onscroll = null;
        }
    }
</script>

<style lang="scss" scoped>
    .month_total{
        font-size: 0.14rem;
    }
    .mint-header {
        background-color: transparent!important;
        font-size: 0.15rem !important;
    }
    .mint-header label.mint-button-text {
        font-size: 0.14rem!important;
        font-weight: 0!important;
        margin-top: 10px;
    }

    .w100 {
        width: 3.75rem;
    }

    .hk_pass {
        position: relative;
        .date_cont {
            position: absolute;
            width: 100%;
            top: 40px;

            .p1 {
                font-size: 0.12rem;
                margin: 0.1rem 0;
                color: #fff;
                text-align: center;
                font-family: myFirstFont2;
            }
            .dspfx {
                display: flex;
                justify-content: center;
                font-size: 0.14rem;
                color: #fff;
                text-align: center;
                div {
                    width: 0.75rem;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    background: #fff;
                    background: transparent;
                }
                .div_1 {
                    border-radius: 4px 0 0 4px;
                    border: 1px solid #fff;
                    border-right: none;
                }
                .active{
                    color: #0159d5;
                    background: #fff;
                }
                .div_2 {
                    border-radius: 0px 4px 4px 0px;
                    border: 1px solid #fff;
                }
            }
            .date_table {
                text-align: center;
                margin: 0.3rem 0.1rem 0;
                background: #fff;
                border-radius: 5px;
                padding-top: 0.1rem;
                margin-bottom: 0.15rem;
                font-size: 0.11rem;
                box-shadow: 0 2px 10px #ddd;
                padding-bottom: 0.2rem;
                .dtitle {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.15rem;
                    .dtitle_gp {
                        display: flex;
                        justify-content: flex-start;
                        color: #333;
                        align-items: center;
                        .c_1{
                            color:#ff6633;
                        }
                        .c_2  {
                            color:#ccc;
                        }
                    }
                    img {
                        width: 10px;
                        height: 10px;
                        margin-left: 0.1rem;
                        margin-right: 5px;
                    }
                    .dtitle_tody {
                        color: #0159d5;
                        width: 0.4rem;
                        border: 1px solid #0159d5;
                        text-align: center;
                        line-height: 0.22rem;
                        height: 0.24rem;
                        border-radius: 3px;
                        margin-right: 0.1rem;
                    }
                }

                .d_table1{
                    display: flex;
                    justify-content: space-around;
                    background: #ededed;
                    padding: 3px 0;
                    margin-bottom: 0.1rem;
                    div{
                        width: 0.22rem;
                        height: 0.22rem;
                        border-radius: 50%;
                        font-size: 0.11rem;
                        line-height: 0.22rem;
                    }
                }
                .d_table2{
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    div{
                        width: 0.22rem;
                        height: 0.22rem;
                        border-radius: 50%;
                        font-size: 0.11rem;
                        line-height: 0.22rem;
                        margin:0.075rem 0.143rem;
                    }
                    .d_today{
                        background: #cccccc;
                        color: #fff;
                    }
                    .d_click{
                        background: #0159d5;
                        color:#fff;
                    }
                    .dsty_1 {
                        &:after{
                            content:"";
                            display: table;
                            background-image: url(../../../assets/hk_2.png);
                            background-repeat: no-repeat;
                            background-position: bottom center;
                            height: 0.08rem;
                            width: 0.1rem;
                            background-size: 0.06rem 0.06rem;
                            margin-left: 0.05rem;
                            margin-top: 0.02rem;
                        }
                    }
                    .dsty_2 {
                        &:after{
                            content:"";
                            display: table;
                            background-image: url(../../../assets/hk_3.png);
                            background-repeat: no-repeat;
                            background-position: bottom center;
                            height: 0.1rem;
                            width: 0.1rem;
                            background-size: auto 0.09rem;
                            margin-left: 0.06rem;
                            margin-top: 0.04rem;
                        }
                    }
                    .dsty_3 {
                        &:after{
                            content:"";
                            display: table;
                            background-image: url(../../../assets/hk_4.png);
                            background-repeat: no-repeat;
                            background-position: bottom center;
                            height: 0.08rem;
                            width: 0.1rem;
                            background-size: 0.06rem 0.06rem;
                            margin-left: 0.06rem;
                            margin-top: 0.04rem;
                        }
                    }
                }

                .change_hd{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.2rem;
                    img{
                        width: 0.125rem;
                        height: 0.125rem;
                        margin: 0 0.05rem;
                    }
                }
            }
            .hk_dlist{
                margin: 0 0.1rem 0;
                .li{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    align-content: flex-start;
                    padding: 0.1rem 0;
                    box-shadow: 0 2px 10px #ddd;
                    margin-bottom: 0.15rem;
                    .li_d1{
                        align-self: flex-start;
                        padding-top: 10px;
                        margin-left: 0.1rem;
                        img{
                            height: 0.05rem;
                            width:0.05rem;
                        }
                    }
                    .li_d2{
                        width: 2.4rem;
                        line-height: 0.22rem;
                        span{
                            font-size:0.14rem;
                            font-family: myFirstFont1;
                        }
                    }
                    .li_d3{
                        display: flex;
                        align-content: center;
                        img{
                            height: 0.12rem;
                            width: 0.12rem;
                            align-self: center;
                        }
                    }
                }
                .hk_wujilu{
                    margin: 0.4rem 0;
                    img{
                        margin: 0 auto;
                        width: 0.95rem;
                    }
                    p{
                        text-align: center;
                        margin: 0.1rem 0;
                    }
                }
            }
        }
    }
    a:hover{
        text-decoration: none;
    }
</style>
