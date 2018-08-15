const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let config = {
  host: 'http://wechat.chepass.com:8021/'
}
// http get工具函数 获取数据
const get = (url, data) => {
  return request(url, 'GET', data)
}

function post(url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: config.host + url,
      success: function (res) {
        // console.log(res.data)
        if (res.data.issuccess) {
          resolve(res.data)
        } else {
          showFail(res.data.message)
          if (res.data.statuscode === 403) {
            setTimeout(() => {
              wx.navigateTo({
                url: '../login/main' //
              })
            }, 1500)
            return false
          }
          // reject(res.data)
        }
      }
    })
  })
}

function getNowDate(addDayCount) {
  var AddDayCount = addDayCount || 0
  var nowDate = new Date()
  // var newDate = new Date()
  nowDate.setDate(nowDate.getDate() + AddDayCount)
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
    nowDate.getMonth() + 1
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
    .getDate()
  var dateStr = year + "-" + month + "-" + day
  return dateStr
}

function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

function showFail(text) {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}
module.exports = {
  formatTime: formatTime,
  get: get,
  post: post,
  getNowDate: getNowDate,
  showSuccess: showSuccess
}
