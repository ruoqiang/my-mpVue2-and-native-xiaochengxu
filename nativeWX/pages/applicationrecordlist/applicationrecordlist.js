// pages/applicationrecordlist/applicationrecordlist.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    calStatusBtn: 'success'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中...'
    })
    const data = {
      token: wx.getStorageSync('token') || '1111'
    }
    var that = this
    util.post('Main/MainQuest', data).then((res) => {
      console.log(res)
      if (res.issuccess) {
        that.getQueryApply()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getQueryApply () {
    let token = wx.getStorageSync('token')
    util.post('SubInfo/QueryApply', {token}).then((res) => {
      console.log(res)
      let data = res.result
      data.forEach(element => {
        element.Name = element.Name.slice(0, 3)
        if (element.CheckStatus === "1" || element.CheckStatus === "3") {
          this.calStatusBtn = true
        } else if (element.CheckStatus === "0" || element.CheckStatus === "2" || element.CheckStatus === "4") {
          this.calStatusBtn = false
        }

        if (element.CheckStatus === "0") element.CheckStatusText = '审核中'
        if (element.CheckStatus === "1") element.CheckStatusText = '审核成功'
        if (element.CheckStatus === "2") element.CheckStatusText = '审核失败'
        if (element.CheckStatus === "3") element.CheckStatusText = '审核中'
        if (element.CheckStatus === "4") element.CheckStatusText = '已注销'
      })
      this.setData({
        list: res.result
      })
      wx.hideLoading()
    })
  }
})
