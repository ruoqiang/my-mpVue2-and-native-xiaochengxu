import Vue from 'vue'
import App from './App'

import store from './store/index'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
     'pages/login/main',
     'pages/home/main',
     'pages/register/main',
     'pages/forgetpassword/main',
     'pages/userbaseinfo/main',
     'pages/usercarinfo/main',
     '^pages/userupload/main',
     'pages/useradress/main',
      "pages/billList/billList",
      "pages/bill/bill",
      "pages/selectCar/selectCar",
      "pages/applicationrecordlist/applicationrecordlist",
      "pages/recordCar/recordCar"
   ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '易路通达',
      navigationBarTextStyle: 'black'
    }
    // 'tabBar': {
    //   selectedColor: '#EA5149',
    //   list: [
    //     {
    //       pagePath: 'pages/login/main',
    //       text: '登录',
    //       iconPath: 'static/img/book.png',
    //       selectedIconPath: 'static/img/book-active.png'
    //     },
    //     {
    //       pagePath: 'pages/register/main',
    //       text: '注册',
    //       iconPath: 'static/img/todo.png',
    //       selectedIconPath: 'static/img/todo-active.png'
    //     },
    //     {
    //       pagePath: 'pages/index/main',
    //       text: '首页',
    //       iconPath: 'static/img/me.png',
    //       selectedIconPath: 'static/img/me-active.png'
    //     }
    //
    //   ]
    // }
  }
}
