import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: { // 会生成json文件，页面里面的配置在此处配置。
    navigationBarTitleText: '申请人信息'
    // navigationBarBackgroundColor: '#B3D4DB'
  }
}
