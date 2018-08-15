function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function getNowDate(addDayCount) {
  var AddDayCount = addDayCount || 0
  var nowDate = new Date()
  // var newDate = new Date()
  nowDate.setDate(nowDate.getDate() + AddDayCount)
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
   : nowDate.getMonth() + 1
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
   .getDate()
  var dateStr = year + "-" + month + "-" + day
  console.log(dateStr)
  return dateStr
}
export function isWeixin () {
  var ua = navigator.userAgent.toLowerCase()
  var _micromessenger = ua.match(/MicroMessenger/i)
  var isArr = Object.prototype.toString.call(_micromessenger) === '[object Array]'
  if (_micromessenger === 'micromessenger' || (isArr && _micromessenger.indexOf("micromessenger") > -1)) {
    return true
  } else {
    return false
  }
}
export function getIosVersion() {
  var ua = navigator.userAgent.toLowerCase()
  var ios = ua.match(/cpu iphone os (.*?) like mac os/)
  if (ios) {
    return ios[1].replace(/_/g, ".")
  }
}
