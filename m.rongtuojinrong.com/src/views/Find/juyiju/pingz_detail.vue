<template>
  <div class="pzdetail">
    <headerBox title="报名凭证"></headerBox>
    <div class="pzdetail-line"></div>
    <!-- 已通过，未验票 -->
    <div class="pzdetail-1" v-if="detail.auth_status==2&&detail.is_check_ticket==0&&detail.is_expire==2">
        <div class="pzdetail-1-a">
            <span class="pzdetail-1-as1">{{detail.topic}}</span>
            <div class="pzdetail-1-ad"><img :src="detail.auth_qrcode_url" alt="二维码"></div>
            <span class="pzdetail-1-as2">{{detail.joinlable}}</span>
        </div>
        <div class="pzdetail-1-b">
            <p>活动时间：{{detail.activity_start_time}}</p>
            <p>活动地点：{{detail.address}}</p>
            <p>主办方：融托金融</p>
            <p>报名人：{{detail.realname}}</p>
        </div>
        <div class="pzdetail-1-c"><img src="../../../assets/dt_y.png"></div>
    </div>
    <!-- 已通过，已验票 -->
    <div class="pzdetail-2 pzdetail-1" v-if="detail.auth_status==2&&detail.is_check_ticket==1&&detail.is_expire==2">
        <div class="pzdetail-1-a">
            <span class="pzdetail-1-as1">{{detail.topic}}</span>
            <div class="pzdetail-1-ad"><img :src="detail.auth_qrcode_url" alt="二维码"></div>
            <span class="pzdetail-1-as2">{{detail.joinlable}}</span>
        </div>
        <div class="pzdetail-1-b">
            <p>活动时间：{{detail.activity_start_time}}</p>
            <p>活动地点：{{detail.address}}</p>
            <p>主办方：融托金融</p>
            <p>报名人：{{detail.realname}}</p>
        </div>
        <div class="pzdetail-1-c"><img src="../../../assets/dt_y1.png"></div>
    </div>
    <!-- 已结束-->
    <div class="pzdetail-3 pzdetail-1" v-if="detail.auth_status==2&&detail.is_expire==1">
        <div class="pzdetail-1-a">
            <span class="pzdetail-1-as1">{{detail.topic}}</span>
            <div class="pzdetail-1-ad"><img :src="detail.auth_qrcode_url" alt="二维码"></div>
            <span class="pzdetail-1-as2">{{detail.joinlable}}</span>
        </div>
        <div class="pzdetail-1-b">
            <p>活动时间：{{detail.activity_start_time}}</p>
            <p>活动地点：{{detail.address}}</p>
            <p>主办方：融托金融</p>
            <p>报名人：{{detail.realname}}</p>
        </div>
        <div class="pzdetail-1-c"><img src="../../../assets/dt_y2.png"></div>
    </div>
    <!-- 已拒绝 -->
    <div class="pzdetail-4 pzdetail-1" v-if="detail.auth_status==-1">
        <div class="pzdetail-1-a">
            <span class="pzdetail-1-as1">{{detail.topic}}</span>
            <div class="pzdetail-1-ad"><img :src="detail.auth_qrcode_url" alt="二维码"></div>
            <span class="pzdetail-1-as2">{{detail.joinlable}}</span>
        </div>
        <div class="pzdetail-1-b">
            <p>活动时间：{{detail.activity_start_time}}</p>
            <p>活动地点：{{detail.address}}</p>
            <p>主办方：融托金融</p>
            <p>报名人：{{detail.realname}}</p>
        </div>
        <div class="pzdetail-1-c"><img src="../../../assets/dt_y3.png"></div>
    </div>    
  </div>
</template>

<script>
export default {
    data(){
        return{
            detail:{}
        }
    },
    components: {
        
    },
    methods:{

    },
    created(){
      this.$post("/rongtuojinrong/activity/juyiju/my/AccessDetail.json",{
      submit_id: this.$route.query.id,
      }).then(res => {
        //console.log(this.$route.query.id);
        this.detail = res.data.data;
        console.log(res.data.data);
      })
      .catch(err => {
        console.log("加载失败");
      });
    }
}
</script>

<style lang="scss" scoped>
    body{
        .pzdetail{
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: #F5F6F8;
            .pzdetail-line{
                width: 1px;
                height: 1.5rem;
                border-left: 1px solid #E5E9F2;
                margin: 0 auto;
            }
            .pzdetail-1{
                background: url("../../../assets/pz_01.png") no-repeat;
                background-size: 100%;
                width: 2.9rem;
                height: 3.8rem;
                margin: -0.3rem auto 0;
                .pzdetail-1-a{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 0.5rem;
                    color: #fff;
                    .pzdetail-1-ad{
                        width: 0.9rem;
                        margin: 0.05rem;
                        img{
                            max-width: 100%;
                            height: auto;
                        }
                    }
                }
                .pzdetail-1-b{
                    padding-left: 0.3rem;
                    p{
                        line-height: 0.3rem;
                    }
                }
                .pzdetail-1-c img{
                    width: 0.6rem;
                    float: right;
                    margin: -0.2rem 0.3rem 0 0;
                }
            }
            .pzdetail-2{
                background: url("../../../assets/pz_02.png") no-repeat;
                background-size: 100%;
            }
            .pzdetail-3{
                background: url("../../../assets/pz_03.png") no-repeat;
                background-size: 100%;
            }
            .pzdetail-4{
                background: url("../../../assets/pz_04.png") no-repeat;
                background-size: 100%;               
            }
        }
    }
</style>