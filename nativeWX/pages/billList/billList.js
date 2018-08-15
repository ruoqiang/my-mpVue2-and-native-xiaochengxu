// pages/billList/billList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList: [],
    listTips: {
      text: '没有账单',
      status: 'no-record'
    },
    tabTitle: ['全部账单', '已还账单', '未还账单'],
    currentIndex: 0,
    domLeft: '0%'
  },
  tabClick(e) {
    let index = e.currentTarget.dataset.num
    console.log(index)
    // this.currentIndex = index
    if (index === 0) {
      this.setData({domLeft: '0'})
    } else if (index === 1) {
      this.setData({domLeft: '33%'})
    } else {
      this.setData({domLeft: '66%'})
    }
  },
  _getSingerList() {
    let that = this
    this.setData({
      billList: [...[{num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}, {num: '1'}]]
    }, () => {
      console.log('----------1', that.data.billList)
    })
    console.log('----------2', that.data.billList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._getSingerList()
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

  }
})
