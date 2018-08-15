// pages/bill/bill.js
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CarNum: '',
    CardNum: '',
    billInfoList: {
      DayCharge: '0.00', //昨日服务费
      AllConsume: '1.00', //应还金额
      DayAlreadyPay: '1.00' // 已还金额
    },
    BillNum: '122233r2xxss22333d' //账单号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CarNum: options.carno || '浙A9F023',
      CardNum: options.cardnum || '浙A9F023'
    })
    let data = {
      token: wx.getStorageSync('token') || '1111',
      data: {
        CarNum: this.data.CarNum,
        CardNum: this.data.CardNum
      }
    }
    util.post('Main/BillDetail', data).then((res) => {
      if (res.result !== null) {
        // let formateDataRet = res.result.map((item) => {
        //   this.formatMoney(item)
        // })
        this.setData({
          billInfoList: res.result
        })
      }
    })
  },
  goToPayMent() {
    // this.$router.push('/repayment')
    if (this.data.billInfoList.AllConsume - this.data.billInfoList.DayAlreadyPay > 0) {
      let attach = this.billInfoList.BillNum
      location.href = url + '/Models/WeChatPay/JstBillPage.aspx?attach=' + attach
    } else {
      // this.$refs.myDialog2.show()
      wx.showModal({
        title: '提示',
        content: '您暂时还没有需要还款的记录。',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }
  },
  goToBillList() {
    let billNum = this.data.BillNum
      const url = '../../pages/billList/billList?billNum=' + billNum
      wx.navigateTo({
        url
      })
  },
  formatMoney(val) {
    val = val.toString().replace(/\$|\\,/g, '')
    if (isNaN(val)) {
      val = "0"
    }
    let sign = (val === (val = Math.abs(val)))
    val = Math.floor(val * 100 + 0.50000000001)
    let cents = val % 100
    val = Math.floor(val / 100).toString()
    if (cents < 10) {
      cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
    }
    return (val + '.' + cents)
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
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})
