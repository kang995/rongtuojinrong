<template>
  <div id="projectInformation" v-show="Object.keys(lists).length">
    <div class="projectInformation-header" ref="topTab">
      <div class="projectInformation-header-a">
        <div :class="{ backa: isFixed, backb: isFixe }">
          <!-- 判断这个一开始是显示的 true,项目信息页面下拉变颜色 -->
          <img
            src="../../assets/totalmonth_5.png"
            v-if="img"
            :class="{ imgone: isImgOne }"
            @click="goback"
          />
          <!-- 这个一开始是不现实的 false ，项目信息页面下拉变颜色-->
          <img
            src="../../assets/totalmonth_3.png"
            v-else
            :class="{ imga: isImg }"
            @click="goback"
          />
          <p>项目信息</p>
          <!-- 这个一开始是显示的 true -->
          <img
            @click="isShare = !isShare"
            v-if="img"
            :class="{ imgtwo: isImgOne }"
            src="../../assets/img38.png"
          />
          <!-- 这个一开始是不显示的 false -->
          <img
            @click="isShare = !isShare"
            v-else
            src="../../assets/img38s.png"
            :class="{ imgb: isImg }"
          />
        </div>
        <mt-popup v-model="isShare" closeOnClickModal>
          <div class="popup_center-error">
            <img src="../../assets/img100.png" @click="isShare = !isShare" />
          </div>
          <div class="popupBox">
            <div class="popup_center">
              <img class="img-b" src="../../assets/img15.png" />
              <span class="popup_center-text">选择分享平台</span>
              <img class="img-b" src="../../assets/img15s.png" />
            </div>
            <div class="popup_bottom">
              <ol>
                <li>
                  <img class="img-a" src="../../assets/img16.png" />
                  <span>微信好友</span>
                </li>
                <li>
                  <img class="img-c" src="../../assets/img17.png" />
                  <span class="img-text">朋友圈</span>
                </li>
                <li>
                  <img class="img-a" src="../../assets/img19.png" />
                  <span>QQ</span>
                </li>
                <li>
                  <img class="img-a" src="../../assets/img18.png" />
                  <span>微博</span>
                </li>
              </ol>
            </div>
          </div>
        </mt-popup>
      </div>
      <div class="projectInformation-header-b"></div>
    </div>
    <!-- 供应链融资 -->
    <div class="projectInformation-header-supply">
      <!-- 供应链融资 -->
      <div class="projectInformation-header-supply-a" v-if="showaa">
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>{{ lists.title }}</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text">{{
            lists.start_time
          }}</span>
          <span>开放出借时间</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
      </div>
      <!-- 供应链融资结束 -->
      <!-- 状态4 -->
      <div
        class="projectInformation-header-supply-a"
        v-else-if="this.state1 == 4"
      >
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>{{ lists.title }}</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text"
            >{{ lists.touzirenshu }}人次已出借</span
          >
          <span>预期获取利息(元):{{ lists.yuqizongsy }}</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
        <div class="projectInformation-header-supply-a-c">
          <span>满标时间: {{ lists.manbiaoshijian }}</span>
        </div>
      </div>
      <!-- 供应链融资第三版结束 -->
      <!-- 供应链融资  第四版开始 状态 == 10-->
      <div
        class="projectInformation-header-supply-a"
        v-else-if="this.state1 == 10"
      >
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>供应链融资19072105</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text">{{
            lists.ketouqianshu
          }}</span>
          <span>可投金额</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
      </div>
      <!-- 供应链融资  第四版开始 状态 == 10-->
      <!-- 供应链融资 第二版   状态 == 6-->
      <div
        class="projectInformation-header-supply-a"
        v-else-if="this.state1 == 6"
      >
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>{{ lists.title }}</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text"
            >{{ lists.touzirenshu }}人次已出借</span
          >
          <span>预期获取利息(元):{{ lists.yuqizongsy }}</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
        <div class="projectInformation-header-supply-a-c">
          <span>满标时间: {{ lists.manbiaoshijian }}</span>
        </div>
      </div>
      <!-- 供应链融资 第二版   状态 == 6-->
      <!-- 供应链融资  第三版  状态 == 10-->
      <div
        class="projectInformation-header-supply-a"
        v-else-if="this.state1 == 10"
      >
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>{{ lists.title }}</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text">{{
            lists.ketouqianshu
          }}</span>
          <span>可投金额</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
      </div>
      <!-- 供应链融资  第三版  状态 == 10-->
      <!-- 供应链融资  第四版开始 状态 == 8-->
      <div
        class="projectInformation-header-supply-a"
        v-else-if="this.state1 == 8"
      >
        <div class="projectInformation-header-supply-a-text">
          <div class="projectInformation-header-supply-a-text-a"></div>
          <span>供应链融资19072105</span>
        </div>
        <div class="projectInformation-header-supply-a-money">
          <span class="projectInformation-header-supply-a-money-text">{{
            lists.ketouqianshu
          }}</span>
          <span>可投金额</span>
        </div>
        <div class="projectInformation-header-supply-a-rate">
          <div class="projectInformation-header-supply-a-rate-aa"></div>
          <div class="projectInformation-header-supply-a-rate-a">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.lilv
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >%</span
              >
            </div>
            <span>预期年化利率</span>
          </div>
          <div class="projectInformation-header-supply-a-rate-b">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                geren(lists)
              }}</span>
              <!-- <span class="projectInformation-header-supply-a-rate-a-aaa"></span> -->
            </div>
            <span class="projectInformation-header-supply-a-rate-bb"
              >融资期限</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-c">
            <div class="projectInformation-header-supply-a-rate-a-bb">
              <span class="projectInformation-header-supply-a-rate-a-aa">{{
                lists.jiner / 10000
              }}</span>
              <span class="projectInformation-header-supply-a-rate-a-aaa"
                >万</span
              >
            </div>
            <span class="projectInformation-header-supply-a-rate-a-bb-a"
              >融资金额</span
            >
          </div>
          <div class="projectInformation-header-supply-a-rate-bb"></div>
        </div>
      </div>
      <!-- 供应链融资  第四版开始 状态 == 8-->
      <!-- 项目等级 -->
      <div class="projectInformation-header-supply-grade">
        <div class="projectInformation-header-supply-grade-begin">
          <!-- 第一列 -->
          <div class="projectInformation-header-supply-grade-begin-one">
            <div
              class="projectInformation-header-supply-grade-begin-one-line"
              @click="inShow = !inShow"
            >
              <!-- 第一版 -->
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
                v-if="inShow"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two"
                >
                  <span>项目等级</span>
                  <span>
                    <img src="../../assets/message_02.png" alt />
                  </span>
                </div>
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-star"
                >
                  <van-rate v-model="star1" color="#f44" readonly />
                </div>
              </div>
              <!-- 第二版 -->
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one2"
                v-else
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two2"
                >
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-two2-a"
                  >
                    <span>项目等级</span>
                    <img src="../../assets/message_03.png" alt />
                  </div>
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-star2"
                  >
                    <van-rate v-model="star1" color="#f44" readonly />
                  </div>
                </div>
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one2-text"
                >
                  <span>星级越高,违约概率越小（内部评级,仅供参考）</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 第二列 -->
          <div class="projectInformation-header-supply-grade-begin-one">
            <div class="projectInformation-header-supply-grade-begin-one-line">
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two-a"
                >
                  <span>出借人条件</span>
                  <span>{{ lists.touzidengijmingcheng }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="projectInformation-header-supply-grade-begin-one"
            v-show="pinggu1"
          >
            <div class="projectInformation-header-supply-grade-begin-one-line">
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two-a"
                >
                  <span class="two">{{ grade }}</span>
                  <router-link
                    tag="div"
                    class="three"
                    @click.native="pinggu2"
                    :to="{ query: { id: lists.jie_id } }"
                    >去评估</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- 第三行 -->
          <div class="projectInformation-header-supply-grade-begin-one">
            <div class="projectInformation-header-supply-grade-begin-one-line">
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two-a"
                >
                  <span>{{ lists.pjct_type_title }}</span>
                  <span>{{ lists.pjct_type_name }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 第四行 -->
          <div
            class="projectInformation-header-supply-grade-begin-one"
            @click="isShow = !isShow"
          >
            <div
              class="projectInformation-header-supply-grade-begin-one-line"
              v-if="isShow"
            >
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two"
                >
                  <span>还款方式</span>
                  <span>
                    <img src="../../assets/message_02.png" alt />
                  </span>
                </div>
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-star"
                >
                  <span>每月还息到期还本</span>
                </div>
              </div>
            </div>
            <!-- 第二例 -->
            <div
              class="projectInformation-header-supply-grade-begin-one"
              v-else
            >
              <div
                class="projectInformation-header-supply-grade-begin-one-line"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one"
                >
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-two"
                  >
                    <span>还款方式</span>
                    <span>
                      <img src="../../assets/message_03.png" alt />
                    </span>
                  </div>
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-star"
                  >
                    <span>每月还息到期还本</span>
                  </div>
                </div>
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-text"
                >
                  <p>{{ lists.huankuanxiangqing }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 第五行 -->
          <div class="projectInformation-header-supply-grade-begin-one">
            <div class="projectInformation-header-supply-grade-begin-one-line">
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one-a"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two-b"
                >
                  <span>募集期限</span>
                  <span>{{ lists.mujiqixian }}天</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 贷款利息  第一版-->
      <div
        class="projectInformation-header-supply-grade-interest"
        v-if="showaa"
      >
        <div class="projectInformation-header-supply-grade-interest-one">
          <div class="projectInformation-header-supply-grade-interest-one-a">
            <span>起息日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-a-blue"
              >放款后生成</span
            >
          </div>
          <span
            class="projectInformation-header-supply-grade-interest-one-a-bar"
            >|</span
          >
          <div class="projectInformation-header-supply-grade-interest-one-b">
            <span>到期日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-b-blue"
              >放款后生成</span
            >
          </div>
        </div>
      </div>
      <!-- 贷款利息 第一版 结束 -->
      <!-- 贷款利息 第三班 状态 == 4 -->
      <div
        class="projectInformation-header-supply-grade-interest"
        v-else-if="this.state1 == 4"
      >
        <div class="projectInformation-header-supply-grade-interest-one">
          <div class="projectInformation-header-supply-grade-interest-one-a">
            <span>起息日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-a-blue"
              >{{ lists.end_time }}</span
            >
          </div>
          <span
            class="projectInformation-header-supply-grade-interest-one-a-bar"
            >|</span
          >
          <div class="projectInformation-header-supply-grade-interest-one-b">
            <span>到期日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-b-blue"
              >{{ lists.daoqi_time }}</span
            >
          </div>
        </div>
      </div>
      <!-- 贷款利息 第三班 状态 == 4 -->
      <!-- 贷款利息  第二版 开始 状态 == 6-->
      <div
        class="projectInformation-header-supply-grade-interest"
        v-else-if="this.state1 == 6"
      >
        <div class="projectInformation-header-supply-grade-interest-one">
          <div class="projectInformation-header-supply-grade-interest-one-a">
            <span>起息日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-a-blue"
              >{{ lists.end_time }}</span
            >
          </div>
          <span
            class="projectInformation-header-supply-grade-interest-one-a-bar"
            >|</span
          >
          <div class="projectInformation-header-supply-grade-interest-one-b">
            <span>到期日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-b-blue"
              >{{ lists.daoqi_time }}</span
            >
          </div>
        </div>
      </div>
      <!-- 贷款利息  第二版 开始 状态 == 6-->
      <!-- 贷款利息 第三班 状态 == 10 -->
      <div
        class="projectInformation-header-supply-grade-interest"
        v-else-if="this.state1 == 10"
      >
        <div class="projectInformation-header-supply-grade-interest-one">
          <div class="projectInformation-header-supply-grade-interest-one-a">
            <span>起息日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-a-blue"
              >放款后生成</span
            >
          </div>
          <span
            class="projectInformation-header-supply-grade-interest-one-a-bar"
            >|</span
          >
          <div class="projectInformation-header-supply-grade-interest-one-b">
            <span>到期日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-b-blue"
              >放款后生成</span
            >
          </div>
        </div>
      </div>
      <!-- 贷款利息 第三班 状态 == 10 -->
      <!-- 贷款利息 状态 == 8 -->
      <div
        class="projectInformation-header-supply-grade-interest"
        v-else-if="this.state1 == 8"
      >
        <div class="projectInformation-header-supply-grade-interest-one">
          <div class="projectInformation-header-supply-grade-interest-one-a">
            <span>起息日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-a-blue"
              >放款后生成</span
            >
          </div>
          <span
            class="projectInformation-header-supply-grade-interest-one-a-bar"
            >|</span
          >
          <div class="projectInformation-header-supply-grade-interest-one-b">
            <span>到期日期</span>
            <span
              class="projectInformation-header-supply-grade-interest-one-b-blue"
              >放款后生成</span
            >
          </div>
        </div>
      </div>
      <!-- 贷款利息 状态 == 8 -->
      <!--项目介绍  -->
      <div class="projectInformation-header-supply-project">
        <div class="projectInformation-header-supply-project-one">
          <div class="projectInformation-header-supply-project-one-b">
            <router-link
              tag="div"
              @click.native="xiangmu"
              :to="{ query: { id: lists.jie_id } }"
              class="projectInformation-header-supply-project-one-b-a"
            >
              <img src="../../assets/img34.png" alt />
              <span>项目介绍</span>
            </router-link>
            <!-- 风险披露 -->
            <router-link
              tag="div"
              @click.native="fengxian1"
              :to="{ query: { id: lists.jie_id } }"
              class="projectInformation-header-supply-project-one-b1"
            >
              <img src="../../assets/img35.png" alt />
              <span>风险披露</span>
            </router-link>
            <!-- 投标记录 -->
            <router-link
              tag="div"
              @click.native="change"
              :to="{ query: { id: lists.jie_id } }"
              class="projectInformation-header-supply-project-one-c"
            >
              <img src="../../assets/img36.png" alt />
              <span>投标记录</span>
            </router-link>
            <!-- 借后管理 -->
            <router-link
              tag="div"
              @click.native="guanli"
              :to="{ query: { id: lists.jie_id } }"
              class="projectInformation-header-supply-project-one-d"
            >
              <img src="../../assets/img37.png" alt />
              <span>借后管理</span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 市场风险 -->
      <div class="projectInformation-header-supply-project-risk">
        <div class="projectInformation-header-supply-project-risk-one">
          <div class="projectInformation-header-supply-grade-begin-one">
            <div class="projectInformation-header-supply-grade-begin-one-line">
              <div
                class="projectInformation-header-supply-grade-begin-one-line-one"
              >
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two1"
                >
                  <span>{{ lists.tishiyu }}</span>
                  <router-link to="/RiskWarning">
                    <img src="../../assets/img63.png" alt />
                  </router-link>
                </div>
                <!-- 第一列 -->
                <div
                  class="projectInformation-header-supply-grade-begin-one-line-one-two2-4"
                  @click="info = !info"
                >
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-two2-2"
                    v-if="info"
                  >
                    <span>免责提示</span>
                    <span>
                      <img src="../../assets/a.png" alt />
                    </span>
                  </div>
                  <div
                    class="projectInformation-header-supply-grade-begin-one-line-one-two2-4"
                    v-else
                  >
                    <div
                      class="projectInformation-header-supply-grade-begin-one-line-one-two2-3"
                    >
                      <span>免责提示</span>
                      <span>
                        <img src="../../assets/img61_1s.png" alt />
                      </span>
                    </div>
                    <span class="dog">{{ lists.mianzetishi }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kong"></div>
      <!-- 时间 -->
      <div>
        <div class="projectInformation-header-supply-projec-main">
          <span v-if="showaa" class="count-down">
            <span class="toubiao">投标倒计时：</span>
            <van-count-down
              :time="time"
              format="DD 天 HH 时 mm 分 ss 秒 "
              @finish="finish"
            />
          </span>
          <!-- 状态 4 -->
          <!--  可投钱数为0 -->
          <div
            v-else-if="this.state1 == 4 || lists.ketouqianshu == 0"
            class="ProjectLoan-begin-basea"
          >
            <span>立即出借</span>
          </div>
          <!-- 状态 6  或运算，当可投金额 等于 0 的时候 则变灰色，没法点击-->
          <div v-else-if="this.state1 == 6" class="ProjectLoan-begin-basea">
            <span>立即出借</span>
          </div>
          <!-- 状态 10 正式版接口的状态 -->
          <router-link
            v-else-if="this.state1 == 10"
            tag="div"
            @click.native="zhuangtai10"
            :to="{ query: { id: lists.jie_id } }"
            class="projectInformation-header-supply-projec-main"
          >
            <span class="count-down">立即投标</span>
          </router-link>
          <!-- 状态 8 测试版接口的状态 -->
          <router-link
            v-else-if="this.state1 == 8"
            tag="div"
            @click.native="zhuangtai8"
            :to="{ query: { id: lists.jie_id } }"
            class="projectInformation-header-supply-projec-main"
          >
            <span class="count-down">立即投标</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 立即开通存管账户弹窗 -->
    <Dialog :show="projet"></Dialog>
  </div>
</template>

<script>
import { formatDate } from "../../modules/datab.js";
import Dialog from "@/components/TheDialog1.vue";
import { Indicator } from "mint-ui";
import qs from "qs";
import Vue from "vue";
import { CountDown, Toast } from "vant";
import { all } from "q";
import { setTimeout, setInterval } from "timers";
import { mapState } from "vuex";
Vue.use(CountDown);
export default {
  components: {
    Dialog
  },
  name: "projectInformation",
  data() {
    return {
      // 项目等级 切换
      inShow: true,
      // 筛选点击消失
      showaa: true,
      // 还款方式 点击切换
      isShow: true,
      // 免责提示
      info: true,
      // 项目信息 下滑背景变色
      isShare: false,
      // 接收接口空数组
      lists: {},
      // 设置的星星为 0 个
      star1: 0,
      // 这是获取全部的高度
      scrollTop: "",
      // 这是获取滑动的高度
      offsetTop: "",
      // backa class 显示
      isFixed: true,
      // backb class 不显示
      isFixe: false,
      // imga class 不显示
      isImg: false,
      // isImga: false,
      isImgOne: true,
      // isImgTwo:true,
      img: true,
      fengxian: {},
      // 通过判断条件状态来判断 评估在什么情况下显示
      pinggu1: true,
      // 判断条件 决定评估弹窗的弹与不弹
      projet: false,
      websock: null,
      // 接受的user_id
      item_id: this.$route.query.id,
      // 判断如果渲染前没登录的话，那么后面接口的字符串也不会出现
      risk_grade:
        this.$store.state.invite.invite &&
        this.$store.state.invite.invite.risk_grade,
      //  判断如果渲染前没登录的话，那么后面接口的字符串也不会出现
      evaluate_overdue:
        this.$store.state.invite.invite &&
        this.$store.state.invite.invite.evaluate_overdue,
      // 登录账户 并且 已开通账户
      is_identify:
        this.$store.state.login.token.user_id &&
        this.$store.state.login.token.is_identify,
      // 开户
      is_identify1: this.$store.state.login.token.is_identify,
      // 账户登录
      user_id: this.$store.state.login.token.user_id,
      // 状态
      state1: 0,
      // 倒计时 时间
      time: 0
    };
  },

  // 方法
  methods: {
    // 倒计时
    Datd() {
      if (this.lists.wait_start_seconds > 0) {
        this.showaa = true;
        this.time = this.lists.wait_start_seconds * 1000;
        return this.time;
      }
    },
    // 倒计时插件的规则，倒计时结束时调用方法
    finish() {
      this.showaa = false;
    },
    // 个人期限赋值,当期限小于1的时候就会显示天数加上天
    geren(lists) {
      if (lists.qixian < 1) {
        return lists.tianshu + "天";
      } else {
        return lists.qixian + "个月";
      }
    },
    // websocket连接
    initWebSocket() {
      //初始化weosocket(必须)
      const wsuri =
        "ws://api.php.rongtuojinrong.com:9500/project/balance?appid=app_h5&user_id=" +
        this.$store.state.login.token.user_id +
        "&ssid=" +
        this.$store.state.login.token.ssid;
      this.websock = new WebSocket(wsuri); //新建一个webstock对象
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonopen() {
      //websocket连接后发送数据(send发送)
      let actions = {
        balance: 52000,
        item_id: "1587",
        port: 9511,
        time: 1572240122
      };
      this.websocketsend(JSON.stringify(actions));
    },

    websocketonmessage(e) {
      //数据接收
      let redata = JSON.parse(e.data);
      // 判断item_id 的话直接 把需要跳动的金钱额度赋值给 lists.ketouqianshu
      if (redata.item_id == this.item_id) {
        // 进行赋值
        this.lists.ketouqianshu = redata.balance.toFixed(2);
      }
    },
    //连接建立失败重连
    websocketonerror() {
      this.initWebSocket();
    },
    websocketclose(e) {
      console.log("断开连接");
    },
    websocketsend(Data) {
      console.log("数据已连接");
      this.websock.send(Data);
    },

    // 投标记录的点击呈现弹窗，根据设定的条件， 里面传入的show 是从封装的组件中 的 监听的值
    change(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else {
        this.$router.push({
          path: "/Bid_Records",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },

    // 项目介绍
    xiangmu(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else {
        this.$router.push({
          path: "/Project_Introduction",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },

    // 风险纰漏
    fengxian1(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else {
        this.$router.push({
          path: "/Risk_Disclosure",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },

    // 借后管理
    guanli(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else {
        this.$router.push({
          path: "/Project_Manage",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },

    //  去评估
    pinggu2(show) {
      if (this.is_identify == 0) {
        this.projet = show;
        // 当风险评测过期点击去评估会直接跳到这一面，再次评测
      } else if (this.is_identify1 == 1 && this.evaluate_overdue == 0) {
        this.$router.push({
          path: "/rishquestion",
          query: {
            id: this.$route.query.id
          }
        });
        // 当风险评估等级小于稳健型就是不合格需要重新评测，这接跳转到风险评测页面
      } else if (this.is_identify1 == 1 && this.risk_grade == 1) {
        this.$router.push({
          path: "/rishquestion",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$router.push({
          path: "/fengxian",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },
    // 投标状态8，测试环境
    zhuangtai8(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else if (!this.user_id) {
        this.$router.push({
          path: "/login",
          query: {
            id: this.$route.query.id
          }
        });
      } else if (
        this.lists.zddengji > this.risk_grade ||
        this.evaluate_overdue == 0
      ) {
        this.$router.push({
          path: "/rishquestion",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$router.push({
          path: "/ProjectLoan",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },

    // 投标状态10，正式环境
    zhuangtai10(show) {
      if (this.is_identify == 0) {
        this.projet = show;
      } else if (!this.user_id) {
        this.$router.push({
          path: "/login",
          query: {
            id: this.$route.query.id
          }
        });
      } else if (
        this.lists.zddengji > this.risk_grade ||
        this.evaluate_overdue == 0
      ) {
        this.$router.push({
          path: "/rishquestion",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$router.push({
          path: "/ProjectLoan",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },
    // 这个获取所有的高度
    onScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 这是滑动所需要的高度
      let offsetTop = this.$refs.topTab.offsetTop;
      // 盘点所有的高度减去滑动的高度
      if (scrollTop <= offsetTop) {
        // backa 显示
        this.isFixed = true;
        // imga 不显示
        (this.isImg = false),
          // backb 不显示
          (this.isFixe = false);
        // isImga 不显示
        this.isImgOne = true;
        // isImgTwo 显示
        this.img = true;
      } else {
        // isImgTwo 不显示
        this.img = false;
        // backb 显示
        (this.isFixe = true),
          // imga 显示
          (this.isImg = true),
          // backa 不显示
          (this.isFixed = false);
      }
    },
    // 判断状态来显示评估,没有登陆账号，评估不显示，如果已经开过户了，评估不显示
    // 只有登录账号，但是没开过户的评估出现，开户过期的可以出现进行操作
    pinggu() {
      if (this.user_id) {
        // 登录并开户但是没有风险评测
        if (this.evaluate_overdue == 0) {
          this.pinggu1 == true;
        }
        // 登录并开户但是风险等级评测低不符合要求
        if (this.is_identify1 == 1 && this.lists.zddengji > this.risk_grade) {
          this.pinggu = true;
        }
      } else {
        // 未登录
        this.pinggu1 = false;
      }
    },
    // loading 加载
    getBannerDetail() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
    },
    // 项目等级 星星 的判断
    getWa() {
      // if (this.star == 1) {
      //   this.star1 = 1;
      // } else if (this.star == 2) {
      //   this.star1 = 2;
      // } else if (this.star == 3) {
      //   this.star1 = 3;
      // } else if (this.star == 4) {
      //   this.star1 = 4;
      // } else if (this.star == 5) {
      //   this.star1 = 5;
      // } else {
      //   this.star1 = 4;
      // }
      switch (this.star) {
        case "1":
          this.star1 = 1;
          break;
        case "2":
          this.star1 = 2;
          break;
        case "3":
          this.star1 = 3;
          break;
        case "4":
          this.star1 = 4;
          break;
        case "5":
          this.star1 = 5;
          break;
        default:
          this.star1 = 4;
      }
    },
    // 判断 金额 来决定 状态的多少
    getList() {
      this.$post("/rongtuojinrong/project/borrowDetail.json", {
        jie_id: this.$route.query.id
      }).then(res => {
        // lists空数组赋值
        this.lists = res.data.data;
        console.log(this.lists);
        // 把接口可投金额赋值给 ketouqianshu
        this.ketouqianshu = this.lists.ketouqianshu;
        // 等级星星
        this.star = this.lists.xingji;
        // 状态
        this.state1 = this.lists.zhuangtai;
        //在接口处直接调用
        this.getWa();
        // 掉用加载中的方法
        Indicator.close();
        // 评估接口调用
        this.pinggu();
        // 倒计时调用接口
        this.Datd();
      });
      //风险评估结果 根据 条件判断进行显示
      if (this.user_id) {
        this.$post(
          "/rongtuojinrong/userCenter/accountInformation/riskEvaluateResult.json",
          { defidenshuxing: this.$store.state.invite.defidenshuxing }
        ).then(res => {
          this.fengxian = res.data.data;
        });
      }
    },
    // 首页返回
    goback() {
      this.$router.go(-1);
    },
    // 项目出借，判断接口，当status == 1 的时候弹出弹窗（msg的内容）
    golist() {
      this.$post("/rongtuojinrong/h5/invest/input.json", {
        user_id: this.user_id,
        ssid: this.$store.state.login.token.ssid,
        borrow_id: this.$route.query.id,
        referer: 1
      }).then(res => {
        this.lists = res.data;
        console.log(this.lists.msg);
        if (this.lists.status == 1) {
          alert(this.lists.msg);
        }
      });
    }
  },
  // 计算属性：计算评估显示的不合格，评估状态显示,风险评估到期后显示已过期
  computed: {
    grade() {
      if (this.user_id && +this.is_identify1 == 1) {
        if (this.risk_grade == 0) {
          return "您的风险评测能力未评测";
        }
        if (this.risk_grade == 1) {
          return "您的风险评测不符合条件";
        }
        if (this.evaluate_overdue == 0) {
          return "您的风险评测能力已过期";
        }
        this.pinggu1 = false;
        if (this.risk_grade == 2) {
          return "稳健型";
        }
        if (this.risk_grade == 3) {
          return "积极性";
        }
      } else {
        return "请先完成风险承受能力评估";
      }
    }
  },

  created() {
    // webSocket接口,渲染开始的事就就已经连接了
    this.initWebSocket();
    // 在钩子函数调用接口方法
    this.getList();
    // 滚动事件 渲染前开始
    window.addEventListener("scroll", this.onScroll);
    // 判断this.$store.state.invite.invite不是空值得时候才可以显示this.evaluate_overdue
  },
  //  结束后摧毁事件
  destroyed() {
    //离开路由之后断开websocket连接
    this.websock.close();
    // 滚动事件 结束后删除
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
/* 头部标签 */
#projectInformation {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  /* 头部 */
  .projectInformation-header {
    width: 100%;
    height: 1.395rem;
    background-image: url("../../assets/yb0.jpg");
    background-size: 100%;
    .projectInformation-header-a {
      width: 100%;
      height: 0.48rem;
    }
    .projectInformation-header-b {
      width: 100%;
      height: 0.915rem;
    }
  }
  /* 供应链融资板块 */
  .projectInformation-header-supply {
    width: 100%;
    .projectInformation-header-supply-a {
      width: 3.535rem;
      position: relative;
      top: -0.9rem;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 6px;
      .projectInformation-header-supply-a-text {
        width: 100%;
        height: 0.465rem;
        display: flex;
        align-items: center;
        span {
          margin-left: 0.1rem;
        }
        .projectInformation-header-supply-a-text-a {
          width: 0.05rem;
          height: 0.2rem;
          background-color: #0159d5;
          margin-left: 0.1rem;
        }
      }
      .projectInformation-header-supply-a-money {
        width: 100%;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span {
          display: block;
          margin: 0 auto;
        }
        .projectInformation-header-supply-a-money-text {
          color: #0159d5;
          font-weight: bold;
          font-size: 30px;
        }
      }
      .projectInformation-header-supply-a-rate {
        width: 100%;
        height: 0.7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .projectInformation-header-supply-a-rate-a {
          width: 0.9rem;
          height: 0.7rem;
          .projectInformation-header-supply-a-rate-a-bb {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          span {
            font-size: 12px;
            display: block;
          }
          .projectInformation-header-supply-a-rate-a-aa {
            font-size: 14px;
            margin-top: 17px;
            font-weight: bold;
            font-size: 14px;
          }
          .projectInformation-header-supply-a-rate-a-aaa {
            margin-top: 17px;
            font-size: 14px;
            /* display: inline; */
          }
        }
        .projectInformation-header-supply-a-rate-b {
          width: 0.6rem;
          height: 0.76rem;
          .projectInformation-header-supply-a-rate-a-bb {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .projectInformation-header-supply-a-rate-a-aa {
              margin-top: 17px;
              font-weight: bold;
              font-size: 14px;
            }
            .projectInformation-header-supply-a-rate-a-aaa {
              margin-top: 17px;
              font-size: 14px;
              /* display: inline; */
            }
          }
          .projectInformation-header-supply-a-rate-a-aa {
            font-size: 14px;
          }
          .projectInformation-header-supply-a-rate-a-aa {
            font-size: 14px;
          }
          .projectInformation-header-supply-a-rate-bb {
            font-size: 12px;
          }
        }
        .projectInformation-header-supply-a-rate-c {
          width: 0.6rem;
          height: 0.76rem;
          .projectInformation-header-supply-a-rate-a-bb {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .projectInformation-header-supply-a-rate-a-aa {
              margin-top: 17px;
              font-weight: bold;
              font-size: 14px;
            }
            .projectInformation-header-supply-a-rate-a-aaa {
              margin-top: 17px;
              font-size: 14px;
              /* display: inline; */
            }
          }
          .projectInformation-header-supply-a-rate-a-bb-a {
            font-size: 12px;
          }
        }
      }
    }
    /* 贷款利息 */
    .projectInformation-header-supply-grade-interest {
      width: 3.54rem;
      margin: 0 auto;
      border-radius: 6px;
      margin-top: 0.15rem;
      background-color: #ffffff;
      .projectInformation-header-supply-grade-interest-one {
        width: 2.41rem;
        height: 0.845rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .projectInformation-header-supply-grade-interest-one-a {
          width: 0.8rem;
          .projectInformation-header-supply-grade-interest-one-a-blue {
            display: block;
            margin-left: -3px;
            color: #0043cf;
            font-size: 0.12rem;
          }
        }
        .projectInformation-header-supply-grade-interest-one-b {
          width: 0.8rem;
          margin-right: -0.3rem;
          .projectInformation-header-supply-grade-interest-one-b-blue {
            display: block;
            margin-left: -3px;
            color: #0043cf;
            font-size: 0.12rem;
          }
        }
      }
    }
    /* 项目介绍 */
    .projectInformation-header-supply-project {
      width: 100%;
      margin-top: 0.15rem;
      .projectInformation-header-supply-project-one {
        width: 3.54rem;
        height: 0.845rem;
        margin: 0 auto;
        border-radius: 6px;
        background-color: #ffffff;
        margin-bottom: 0.15rem;
        /* 投标记录 */
        .projectInformation-header-supply-project-one-c {
          width: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 100%;
          }
          span {
            font-size: 10px;
            text-align: center;
          }
        }
        /* 借后管理 */
        .projectInformation-header-supply-project-one-d {
          width: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 100%;
          }
          span {
            font-size: 10px;
          }
        }
        .projectInformation-header-supply-project-one-b {
          width: 3.05rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          .projectInformation-header-supply-project-one-b-a {
            width: 0.6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 100%;
            }
            span {
              font-size: 10px;
            }
          }
        }
        /* 风险纰漏 */
        .projectInformation-header-supply-project-one-b1 {
          width: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 82%;
          }
          span {
            font-size: 10px;
          }
        }
      }
      /*市场风险 */
      .projectInformation-header-supply-project-risk {
        width: 100%;
        height: 0.86rem;
        // margin-top: 0.15rem;
      }
    }
  }
  .projectInformation-header-supply-grade {
    width: 3.535rem;
    border-radius: 6px;
    margin-top: -0.76rem;
    margin-left: 0.12rem;
    background-color: #ffffff;
    .projectInformation-header-supply-grade-begin {
      width: 100%;
      .projectInformation-header-supply-grade-begin-one-line2 {
        width: 3.54rem;
        .projectInformation-header-supply-grade-begin-one-line-one2 {
          width: 3.24rem;
          height: 0.42rem;
          border-radius: 6px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          border-bottom: 2px solid #f0f2f7;
        }
      }
      .projectInformation-header-supply-grade-begin-one {
        display: flex;
        justify-content: center;
        align-items: center;
        .projectInformation-header-supply-grade-begin-one-line {
          width: 3.54rem;
          .projectInformation-header-supply-grade-begin-one-line-one {
            width: 3.24rem;
            height: 0.42rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #f0f2f7;
            .projectInformation-header-supply-grade-begin-one-line-one-two-a {
              width: 3.24rem;
              height: 0.42rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .projectInformation-header-supply-grade-begin-one-line-one-two {
              display: flex;
              justify-content: space-between;
              align-items: center;
              img {
                width: 0.12rem;
                height: 0.1rem;
                margin-top: 2px;
              }
              .projectInformation-header-supply-grade-begin-one-line-one-star
                img {
                float: left;
                width: 0.16rem;
                margin-left: 5px;
              }
            }
          }
          .projectInformation-header-supply-grade-begin-one-line-one2 {
            width: 3.24rem;
            height: 0.82rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            border-bottom: 2px solid #f0f2f7;
            .projectInformation-header-supply-grade-begin-one-line-one-two2 {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .projectInformation-header-supply-grade-begin-one-line-one-two2-a {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .projectInformation-header-supply-grade-begin-one-line-one-star2
                  img {
                  float: left;
                  width: 0.16rem;
                  margin-left: 5px;
                }
                img {
                  width: 0.11rem;
                }
              }
            }
          }
        }
      }
    }
    .projectInformation-header-supply-grade-begin-one-line-one-star span {
      width: 100%;
    }
    /* 第二列和第三行第四行 */
    .projectInformation-header-supply-grade-begin {
      width: 100%;
      .projectInformation-header-supply-grade-begin-one {
        width: 3.54rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .projectInformation-header-supply-grade-begin-one-line {
        width: 3.54rem;
        .projectInformation-header-supply-grade-begin-one-line-one-two-b {
          width: 3.24rem;
          height: 0.42rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
        }
      }
    }
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two-a .two {
    color: #0159d5;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two-a .three {
    width: 0.635rem;
    height: 0.21rem;
    line-height: 0.21rem;
    text-align: center;
    background-color: #0159d5;
    color: #ffffff;
    border-radius: 6px;
  }
  .projectInformation-header-supply-project-risk-one {
    width: 3.54rem;
    margin: 0 auto;
    border-radius: 6px;
    background-color: #ffffff;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two1 {
    width: 3.24rem;
    height: 0.42rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two1 img {
    width: 70%;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-2 {
    width: 3.24rem;
    height: 0.42rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-3 {
    width: 3.24rem;
    height: 0.42rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-4 {
    width: 3.24rem;
    margin: 0 auto;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-3 .text {
    width: 100%;
    height: 0.42rem;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-4 .dog {
    font-size: 14px;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-2 img {
    width: 0.168rem;
    height: 8.39px;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2-3 img {
    width: 0.168rem;
    height: 8.39px;
  }
  .projectInformation-header-supply-grade-begin-one-line-one-two2 {
    width: 3.24rem;
    height: 0.42rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  // 空的盒子
  .kong {
    height: 0.6rem;
  }
  /* 底部结尾 */
  .projectInformation-header-supply-projec-main {
    width: 100%;
    height: 0.525rem;
    position: fixed;
    bottom: 0;
    margin-top: 0.15rem;
    background-color: #0159d5;
    text-align: center;
  }
  .van-count-down {
    color: #ffffff;
    line-height: 0.525rem;
  }
  /* 第二版*/
  .projectInformation-header-supply-grade-begin-one-line-text {
    width: 3.24rem;
    margin: 0 auto;
    background-color: #ffffff;
    border-bottom: 2px solid #f0f2f7;
  }
  .projectInformation-header-supply-grade-begin-one-line-text p {
    font-size: 14px;
  }
  /* 选择分享 */
  .mint-popup {
    border-radius: 10px;
  }
  .popupBox {
    width: 3rem;
    height: 1.59rem;
    border-radius: 6px;
  }
  .popup_heade {
    width: 3rem;
    height: 0.75rem;
    background: url(../../assets/img40.png) no-repeat center;
    background-size: 100%;
    border-radius: 10px 10px 0 0;
  }
  .popup_top {
    font-size: 0.12rem;
    color: #292929;
    padding: 0.2rem 0 0.12rem 0;
    border-bottom: 1px dashed #e3edfc;
    margin: 0 0.2rem;
    line-height: 0.17rem;
  }
  .popup_center {
    height: 0.7rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-a {
    display: block;
    width: 0.14rem;
    height: 0.1rem;
    margin-top: 8px;
  }
  .img-b {
    width: 0.3rem;
    height: 0.1rem;
  }
  .popup_bottom {
    width: 100%;
    height: 0.75rem;
    padding: 0 0.27rem;
  }
  ol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.75rem;
  }
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
  .img-a {
    width: 0.3rem;
    height: 0.3rem;
  }
  .img-c {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: -0.09rem;
    margin-top: 0.08rem;
  }
  .img-text {
    margin-left: -0.08rem;
  }
  .popup_center-text {
    padding: 5px;
    color: #1c1c1c;
    height: 0.4rem;
    margin-top: 0.07rem;
    font-size: 18px;
    font-weight: bold;
  }
  .popup_center-error img {
    width: 0.15rem;
    height: 0.15rem;
    margin-top: 0.1rem;
    margin-left: 5px;
    position: fixed;
    left: 2.66rem;
  }
  /* 这是头部样式 */
  .backa {
    width: 100%; // height: 0.5rem;
    display: flex;
    justify-content: center;
    position: fixed;
    background-color: #0159d5;
    z-index: 1;
    padding: 0 0.1rem;
    p {
      line-height: 0.5rem;
      color: #ffffff;
    }
  }
  .imgone {
    line-height: 0.5rem;
    width: 0.16rem;
    height: 0.15rem;
    position: absolute;
    top: 0.18rem;
    margin-left: -1.7rem;
  }
  .imgtwo {
    line-height: 0.5rem;
    width: 0.16rem;
    height: 0.15rem;
    position: absolute;
    left: 3.4rem;
    top: 0.18rem;
    margin-left: 0.1rem;
  }
  .imga {
    line-height: 0.5rem;
    width: 0.16rem;
    height: 0.15rem;
    position: absolute;
    left: 0;
    top: 0.18rem;
    margin-left: 0.1rem;
  }
  .imgb {
    line-height: 0.5rem;
    width: 0.16rem;
    height: 0.15rem;
    position: absolute;
    left: 3.4rem;
    top: 0.18rem;
    margin-left: 0.1rem;
  }
  .backa .a {
    width: 16px;
    height: 18px;
    margin-left: 93%;
  } // 时间
  .count-down {
    color: #ffffff;
    line-height: 0.525rem;
  }
  .projectInformation-header-supply-a-c span {
    font-size: 0.14rem;
    padding-left: 39%;
    line-height: 0.355rem;
  } //
  .ProjectLoan-begin-basea {
    width: 100%;
    height: 0.525rem;
    bottom: 0;
    position: fixed;
    background-color: #b9b7b8;
    text-align: center;
    span {
      color: #ffffff;
      font-weight: bold;
      line-height: 0.525rem;
      font-size: 14px;
    }
  } // 加载
  .loading {
    position: fixed;
    left: 0;
    margin: -0.9rem auto;
    right: 0; // bottom: 0;
    z-index: 10;
    width: 29%;
    height: 16%;
    background-color: #292929;
    background: rgba(0, 0, 0, 0.5);
    .loading-a {
      margin: 0.3rem auto;
      width: 20%;
      height: 70%;
      line-height: 30px;
    }
  }
}
#projectInformation .projectInformation-header-c {
  width: 100%;
  height: 0.48rem;
  background: 0;
  position: fixed;
  background-color: #0159d5;
  color: #ffffff;
}
.backb {
  width: 100%; // height: 0.5rem;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #ffffff;
  z-index: 1;
  padding: 0 0.1rem;
  p {
    line-height: 0.5rem;
    color: #000;
  }
}
.projectInformation-header-supply-grade-interest-one-a-bar {
  margin-right: 0.23rem;
}
.van-count-down {
  display: inline-block;
}
</style>
