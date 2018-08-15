// pages/selectCar/selectCar.js
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfoList: [{
        CarNum: '浙A9F023',
        CarType: '1'
      },
      {
        CarNum: '浙A9F023',
        CarType: '1'
      },
      {
        CarNum: '浙A9F023',
        CarType: '1'
      }
    ],
    type: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type
    })
    console.log(this.data.type)
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
    this.getCarList()
  },
  getCarList() {
    const data = {
      token: wx.getStorageSync('token')
    }
    util.post('SubInfo/QueryWirteCard', data).then((res) => {
      this.setData({
        carInfoList: res.result
      })
      //
    })
  },
  gotoRecord(e) {
    var url = '../../pages/bill/bill?carno=' + e.currentTarget.dataset.carno + '&cardnum=' + e.currentTarget.dataset.cardnum
    if (this.data.type === "2") {
      url = '../../pages/recordCar/recordCar?carno=' + e.currentTarget.dataset.carno
    }
      wx.navigateTo({
        url
      })
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

  }
})
