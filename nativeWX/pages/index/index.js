//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToApplycation() {
    this.checkToken((res) => {
      const url = '../../pages/applicationrecordlist/applicationrecordlist'
      wx.navigateTo({
        url
      })
    })
  },
  checkToken(cb) {
    const data = {
      token: wx.getStorageSync('token') || 1111
    }
    util.post('Main/MainQuest', data).then((res) => {
      cb && cb()
    })
  },
  testLogin() {
    const data = {
      data: {
        Identifier: '18226796732',
        Credential: '123456'
      },
      token: '1111'
    }
    util.post('Login/UserLogin', data).then((res) => {
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      wx.setStorageSync('token', res.result.Token)
    })
  },
  goToSelectCar(e) {
    console.log(e)
    let type = e.target.dataset.type
    let url = '../../pages/selectCar/selectCar?type=' + type
    this.checkToken((res) => {
      wx.navigateTo({
        url
      })
    })
  }
})
