<template>
  <div class="home">
    <swiper class="bannerBox" indicator-dots="true" indicator-color="white" circular="true" autoplay="true" interval="5000" duration="500">
      <div class="swiperWrap" v-for="(item,index) in imgUrls" :key="index">
        <swiper-item class="bannerItem">
          <image :src="item" class="slide-image" />
        </swiper-item>
      </div>
    </swiper>
    <div class="card-box">
        <div tag="div" class="card-item" to="/process" ref="cardItem" @click.stop>
            <img src="../../common/image/icon-ETC.png" alt="" @click="goToProcess()">
            <p>办理ETC</p>
        </div>
        <div tag="div" class="card-item" to="/applicationRecordList">
            <div class="">
                <img src="../../common/image/icon-applyRecord.png" alt="" @click="goToApplycation">
                <p>申请记录</p>
            </div>
        </div>
        <div tag="div" class="card-item" to="/process" ref="cardItem" @click.stop="goToSelectCar('1')">
          <img src="../../common/image/icon-bill.png" alt="">
                <p>账单查询</p>
        </div>
        <div tag="div" class="card-item" to="/applicationRecordList" @click.stop="goToSelectCar('2')">
            <div class="">
              <img src="../../common/image/icon-record.png" alt="">
               <p>通行记录</p>
            </div>
        </div>
    </div>
    <div class="actionBox">
      <h2>新闻资讯</h2>
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
          <view id="green" class="scroll-view-item_H bc_green" @click="gotoLogin">
            <img src="../../common/image/action001.png" alt="">
          </view>
          <view id="red"  class="scroll-view-item_H bc_red" @click="gotoLogin">
            <img src="../../common/image/action002.png" alt="">
          </view>
        </scroll-view>
    </div>

  </div>
</template>

<script>
import card from '@/components/card'
import store from '../counter/store'
import {post, showSuccess} from '@/utils/index'
export default {
  data () {
    return {
      imgUrls: [
        require('@/common/image/banner2.png'),
        require('@/common/image/banner3.png'),
        require('@/common/image/banner3.jpg')
    ],
    scrollX: true
    }
  },
  components: {
    card
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    getPhoneNumber (e) {
      console.log(e)
      this.mobile = e
    },
    async checkToken () {
      const data = {
        token: wx.getStorageSync('token') || 1111
      }
      try {
        let res = await post('Main/MainQuest', data) //接口请求回来后再执行下面的代码
        // if (!res.issuccess) {
        //   const url = '../login/main'
        //   wx.redirectTo({ url })
        //   return false
        // }
        // cb && cb()
        return new Promise((resolve, reject) => { //纯粹为了避免回调函数形式的写法
          resolve(res)
        })
        // const url = '../userbaseinfo/main'
        // wx.navigateTo({ url })
      } catch (e) {
          const url = '../login/main'
          wx.redirectTo({ url })
      }
    },
    // gotoLogin() {
    //   wx.redirectTo({ url: '../login/main' })
    // },
    goToProcess() {
      wx.showLoading({
        title: '加载中'
      })
      this.checkToken().then((res) => {
        console.log(res)
        if (res.issuccess) {
          const url = '../userbaseinfo/main'
          wx.navigateTo({ url })
        }
      })
    },
    goToApplycation() {
      // wx.showLoading({
      //   title: '加载中'
      // })
      this.checkToken().then((res) => {
        if (res.issuccess) {
          const url = '../applicationrecordlist/applicationrecordlist'
          wx.navigateTo({ url })
        }
      })
    },
    goToSelectCar(type) {
      this.checkToken().then((res) => {
        if (res.issuccess) {
          let url = '../../pages/selectCar/selectCar?type=' + type
          wx.navigateTo({ url })
          }
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
  },
  mounted() {
    // let token = wx.getStorageSync('token')
    // if (token) {
    //   this.token = token
    //   // this.checkToken()
    // }
  }
}
</script>

<style lang="stylus">
/* .musicComment {
    width: 100%;
    display: flex;
    overflow: hidden;
} */
// .home{
//   background:#333
// }
page {
  background-color: #f5f5f5 !important;
}

.swiperWrap{
  width: 100%;
}
.bannerBox img{
  width: 100%;
  /* height: 200px; */
}
.bannerItem .slide-image{
  width: 100%;
}
swiper{
  height:400rpx;
}
swiper image {
height:400rpx;
}
$scrollHeight = 300rpx;
.scroll-view_H{
  /* width: 100%; */
  height: $scrollHeight;
  white-space: nowrap;
  // margin-top: 10px;
  margin-left:12px;
}
.scroll-view-item_H{
  width: 550rpx;
  height: $scrollHeight;
  display:inline-block;
  &:nth-child(1) {
    margin-right: 16rpx;
  }
  image{
    width: 100%;
    height: $scrollHeight;
  }
}
.actionBox h2
    height: 38px;
    line-height: 38px;
    font-size:14px;
    margin-left:12px;
.card-box
  padding:10px 0
  margin-top:10px
  display: -webkit-flex
  display:flex
  background:#fff
  flex-wrap: wrap
  .card-item
    float:left
    width:25%
    flex:0 0 25%
    text-align:center
    img
      width:40px
      height:40px
    p
      font-size:12px
      color:$color-text
      margin-top:7px
    &.second-line
      margin-top:10px
</style>
