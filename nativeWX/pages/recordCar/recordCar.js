// pages/recordCar/recordCar.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultDate1: util.getNowDate(-7),
    defaultDate2: util.getNowDate(),
    recordList: [],
    CarNo: '',
    toView: 'red',
    scrollTop: 100,
    imgHeight: '200px',
    pageSize: 10,
    page: 0,
    hasMore: true,
    ajaxLoaingShow: true,
    scroll: null,
    btnDisable: false,
    isLoadingMore: false,
    isShowNoListTips: false,
    backBtnIsShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CarNo: options.carno || '浙A9F023'
    })
    wx.showLoading({
      title: '数据加载中...'
    })
    this.getScrollViewHeiht()
    this.loadMore()
  },
  loadMore() {
    var that = this
    if (!this.data.hasMore) { //没有更多了就停止请求
      // this.isLoadingMore = false
       return
     }
    let _page = that.data.page
    that.setData({page: ++_page}, () => {
      let data = {
        token: wx.getStorageSync('token') || '1111',
        data: {
          CarNo: this.data.CarNo,
          outTimeBefore: this.data.defaultDate1 +' 00:00:00',
          outTimeAfter: this.data.defaultDate2 +' 23:59:59',
          pageHelp: {
            CurrentPage: that.data.page,
            PageSize: that.data.pageSize
          }
        }
      }
      util.post('Main/QueryConsumeDetailNew', data).then((ret) => {
        console.log(ret)
        wx.hideLoading()
        if (ret.issuccess) {
          if (ret.result.ConsumeDetail ===null) ret.result.ConsumeDetail = [] //特殊处理
          let formateConsumeDetail,
          oldConsumeDetail = ret.result.ConsumeDetail
          //格式化特殊显示字段
          if (oldConsumeDetail.length > 0) {
            formateConsumeDetail = oldConsumeDetail.map((item) => {
              item.inTime = item.inTime ? (item.inTime).replace('T', ' ') : ''
              item.outTime = item.outTime ? (item.outTime).replace('T', ' ') : ''
            })
          }
          //数据合并
          that.setData({recordList: that.data.recordList.concat(ret.result.ConsumeDetail)})
          //判断是否有更多
          let data = ret.result
          if (!data.ConsumeDetail.length || (data.pageHelp.PageSize + (data.pageHelp.CurrentPage - 1) *  this.data.pageSize) >= data.pageHelp.AllCount) {  /*没有更多数据了 禁用上拉更新*/
            // infiniteScroll.enable(false);  //一个页面可以多次加载，不要禁用销毁掉 改为隐藏掉
            that.setData({hasMore: false})
          }
        }
      })
    })
  },
  getScrollViewHeiht() {
    let that = this
    //滚动容器高度：页面容器高度 - 图片部分的高度
    wx.getSystemInfo({
      success: function (res) {
        var query = wx.createSelectorQuery()
        //选择id
        query.select('.record-img').boundingClientRect(function (rect) {
          let reactWidth = parseInt(rect.height)
          that.setData({
            imgHeight: (res.windowHeight - reactWidth) + 'px'
          })
        }).exec()
      }
    })
  },
  backTop: function(e) {
      this.setData({
          scrollTop: 0
      })
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    // console.log(e)
    if (e.detail.scrollTop > 150) {
      this.setData({
        backBtnIsShow: true
      })
    } else {
      this.setData({
        backBtnIsShow: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.areaPicker1 = this.selectComponent("#areaPicker1")
    this.areaPicker2 = this.selectComponent("#areaPicker2")
  },
  showAreaPicker1() {
    this.areaPicker1.showDialog()
  },
  showAreaPicker2() {
    this.areaPicker2.showDialog()
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消')
    this.areaPicker1.hideDialog()
  },
  //确认事件
  _confirmEvent(e) {
    this.areaPicker1.hideDialog()
    this.setData({
      defaultDate1: e.detail
    })
  },
  _confirmEvent2(e) {
    this.areaPicker2.hideDialog()
    this.setData({
      defaultDate2: e.detail
    })
  },
  DateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      defaultDate1: e.detail.value
    })
  },
  DateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      defaultDate2: e.detail.value
    })
  },
  validateDate(date1, date2) {
    let newdate1 = new Date(date1).getTime()
    let newdate2 = new Date(date2).getTime()
    return newdate1 - newdate2 > 0 ? 0 : 1
  },
  _searchList() {
    let validateDate = this.validateDate(this.data.defaultDate1, this.data.defaultDate2)
    if (!validateDate) {
      wx.showToast({
        title: '开始时间不能大于结束时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // this.hasMore = true //重置为初始值
    // this.ajaxLoaingShow = true //重置为初始值
    // this.page = 0 //重置为初始值
    // this.recordList = [] //重置为初始值
    this.setData({
      hasMore: true,
      ajaxLoaingShow: true,
      page: 0,
      recordList: []
    })
    this.loadMore()
    // setTimeout(() => {
    //   this.ajaxLoaingShow = false
    // }, 600)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log('onReachBottom', e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
