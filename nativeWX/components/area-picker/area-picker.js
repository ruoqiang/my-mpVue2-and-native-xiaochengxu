// components/Dialog/dialog.js

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear() + 5; i++) {
  years.push(String(i))
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i
  }
  months.push(String(i))
}

for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i
  }
  days.push(String(i))
}
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */

  properties: {
    // 弹窗标题
    defaultDate: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },
  attached: function () {
    console.log('attached ')
  },
  detached: function () {
    console.log('detached')
  },
  ready: function () {
    //根据默认日期得到年月日3项分别属于value的第几项并setData
    console.log(this)
    //分割年月日
    let defaultDate = this.properties.defaultDate && this.properties.defaultDate.split('-')
    let _year = defaultDate[0] || '1990'
    let _month = defaultDate[1] || '01'
    let _day = defaultDate[2] || '01'
    //根据日期得到年月日所在对应列表里的索引
    let _yearIdx = this.getIndexByValue(years, _year)
    let _monthIdx = this.getIndexByValue(months, _month)
    let _dayIdx = this.getIndexByValue(days, _day)
    this.setData({
      value: [_yearIdx, _monthIdx, _dayIdx],
      year: _year,
      month: _month,
      day: _day
    })
  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [9999, 1, 1]
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    getIndexByValue(list, value) {
      console.log('getIndexByValue')
      let resIndex = 0
      list.forEach((item, index) => {
        if (item === value) {
          resIndex = index
        }
      })
      return resIndex
    },
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      var selectedDate = this.data.year + '-' + this.data.month + '-' + this.data.day
      console.log(selectedDate)
      this.triggerEvent("confirmEvent", selectedDate)
    },
    bindChange: function (e) {
      const val = e.detail.value
      console.log(val)
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]]
      })
    }
  }
})
