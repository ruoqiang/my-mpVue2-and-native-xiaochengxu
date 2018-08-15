<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <!-- 三级联动 -->
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValueSelected" @change="pickerChangeMul">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in firstArr" :key="index">{{item.text}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in secondArr" :key="index">{{item.text}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in thirdArr" :key="index">{{item.text}}</div>
          </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<script>
import city from './city'
export default {
  data() {
    return {
      pickerValueSelected: [0, 0, 0],
      firstArr: [],
      secondArr: [],
      thirdArr: []
    }
  },
  props: {
    /* 是否显示控件 */
    showPicker: {
      type: Boolean,
      default: false
    },
    /* 默认值 */
    pickerValueDefault22: {
      type: String,
      default: '北京 东城区'
    }
  },
  created() {
    this.initPicker('北京 东城区') //默认选中的城市
  },
  watch: {
    pickerValueDefault22(val) {
      this.initPicker(val)
      // console.log('watch', val)
      // var cityData = city
      // console.log('defaultArea---', val)
      // var province = val.split(' ')[0]
      // var month = val.split(' ')[1]
      // var date = val.split(' ')[2]
      //
      // var first = []
      // var second = []
      // var third = []
      // var selectedIndex = [1, 0, 0] /* 数组第一项设置为1 修复 创建月列表少一个的问题 */
      // var checked = [0, 0, 0] /* 已选选项 */
      // this._creatList(cityData, first, (list) => { //创建年列表
      //   this.firstArr = list
      //   console.log(this.firstArr)
      // })
      // this.provinceIdx = this._getKeyByValue(province, this.firstArr)
      // this.pickerValueSelected[0] = this.provinceIdx //根据创建的索引 选中默认选项
      // console.log(this.provinceIdx)
      // if (cityData[this.provinceIdx].hasOwnProperty('sub')) { //创建月份列表
      //   this._creatList(cityData[this.provinceIdx].sub, second, (list) => {
      //     this.secondArr = list
      //   })
      // } else {
      //   second = [{text: '', value: 0}]
      // }
      // this.cityIdx = this._getKeyByValue(month, this.secondArr)
      // console.log(this.cityIdx)
      // this.pickerValueSelected[1] = this.cityIdx //根据创建的索引 选中默认选项
      // if (cityData[this.provinceIdx].sub[this.cityIdx].hasOwnProperty('sub')) { //创建日期列表
      //   this._creatList(cityData[this.provinceIdx].sub[this.cityIdx].sub, third, (list) => {
      //     this.thirdArr = list
      //   })
      // } else {
      //   third = [{text: '', value: 0}]
      // }
      // this.thirIdx = (this.thirdArr && this._getKeyByValue(date, this.thirdArr)) || 0
      // console.log(this.thirIdx)
      // this.pickerValueSelected[2] = this.thirIdx //根据创建的索引 选中默认选项
    }
  },
  methods: {
    initPicker(val) {
      var cityData = city
      console.log('defaultArea---', val)
      var province = val.split(' ')[0]
      var month = val.split(' ')[1]
      var date = val.split(' ')[2]

      var first = []
      var second = []
      var third = []
      var selectedIndex = [1, 0, 0] /* 数组第一项设置为1 修复 创建月列表少一个的问题 */
      var checked = [0, 0, 0] /* 已选选项 */
      this._creatList(cityData, first, (list) => { //创建年列表
        this.firstArr = list
        console.log(this.firstArr)
      })
      this.provinceIdx = this._getKeyByValue(province, this.firstArr)
      this.pickerValueSelected[0] = this.provinceIdx //根据创建的索引 选中默认选项
      console.log(this.provinceIdx)
      if (cityData[this.provinceIdx].hasOwnProperty('sub')) { //创建月份列表
        this._creatList(cityData[this.provinceIdx].sub, second, (list) => {
          this.secondArr = list
        })
      } else {
        second = [{text: '', value: 0}]
      }
      this.cityIdx = this._getKeyByValue(month, this.secondArr)
      console.log(this.cityIdx)
      this.pickerValueSelected[1] = this.cityIdx //根据创建的索引 选中默认选项
      if (cityData[this.provinceIdx].sub[this.cityIdx].hasOwnProperty('sub')) { //创建日期列表
        this._creatList(cityData[this.provinceIdx].sub[this.cityIdx].sub, third, (list) => {
          this.thirdArr = list
        })
      } else {
        third = [{text: '', value: 0}]
      }
      this.thirIdx = (this.thirdArr && this._getKeyByValue(date, this.thirdArr)) || 0
      console.log(this.thirIdx)
      this.pickerValueSelected[2] = this.thirIdx //根据创建的索引 选中默认选项
    },
    show() {
      setTimeout(() => {
        if (this.pickerValueArrayChange) {
          this.initPicker(city)
          this.showPicker = true
          this.pickerValueArrayChange = false
        } else {
          this.showPicker = true
        }
      }, 0)
    },
    maskClick() {
      this.pickerCancel()
    },
    pickerCancel() {
      this.showPicker = false
    },
    pickerConfirm(e) {
      this.showPicker = false
      //根据选中的索引得到对应的省市区
      let province = this.firstArr[this.pickerValueSelected[0]]['text']
      let city = this.secondArr[this.pickerValueSelected[1]]['text']
      let area = (this.thirdArr[this.pickerValueSelected[2]] && this.thirdArr[this.pickerValueSelected[2]]['text']) || ''
      console.log('text', this.pickerValueSelected[0])
      console.log(this.firstArr[this.pickerValueSelected[0]]['text'])
      console.log(this.secondArr[this.pickerValueSelected[1]]['text'])
      console.log((this.thirdArr[this.pickerValueSelected[2]] && this.thirdArr[this.pickerValueSelected[2]]['text']))
      let pickerValueSelectedZh = area ? `${province} ${city} ${area}` : `${province} ${city}`
      this.$emit('onConfirm', pickerValueSelectedZh)
    },
    showPickerView() {
      this.showPicker = true
    },
    pickerChangeMul(e) {
        let pickerValueArray = this.pickerValueArray
        let changeValue = e.mp.detail.value //每一个列的索引
        let pickerValueMulThreeTwo = []
        let pickerValueMulThreeThree = []
        // 重新渲染第二列，如果是第一列滚动
        let cityData = city
        if (changeValue[0] !== this.pickerValueSelected[0]) {
          this.secondArr = []
          var first = []
          var second = []
          var third = []
          this.provinceIdx = changeValue[0] //第一项
          this.pickerValueSelected = [0, 0, 0] //重置
          this.pickerValueSelected[0] = this.provinceIdx //根据创建的索引 选中默认选项 修改第一项
          // console.log(this.provinceIdx)
          // console.log('cityData[this.provinceIdx]', cityData[this.provinceIdx])
          if (cityData[this.provinceIdx].hasOwnProperty('sub')) { //根据第一项索引创建第二项
            this._creatList(cityData[this.provinceIdx].sub, second, (list) => {
              this.secondArr = list
            })
          } else {
            second = [{text: '', value: 0}]
          }
          // 重新渲染第三列
          this.thirdArr = []
          this.cityIdx = 0
          if (cityData[this.provinceIdx].sub[this.cityIdx].hasOwnProperty('sub')) {
            this._creatList(cityData[this.provinceIdx].sub[this.cityIdx].sub, third, (list) => {
              // console.log('third:', list)
              this.thirdArr = list
            })
          } else {
            third = [{text: '', value: 0}]
          }
        } else { // 第二列滚动
          // 重新渲染第三列
          if (changeValue[1] !== this.pickerValueSelected[1]) { //判断是第二项变化排除第三项
            this.thirdArr = []
            this.cityIdx = changeValue[1]
            // console.log(this.cityIdx)
            this.pickerValueSelected[1] = this.cityIdx //根据创建的索引 选中默认选项
            if (cityData[this.provinceIdx].sub[this.cityIdx].hasOwnProperty('sub')) { //创建日期列表
              this._creatList(cityData[this.provinceIdx].sub[this.cityIdx].sub, this.thirdArr, (list) => {
                this.thirdArr = list
              })
            } else {
              this.thirdArr = [{text: '', value: 0}]
            }
          } else {
            this.pickerValueSelected[2] = changeValue[2]
          }
        }
    },
    _getKeyByValue(val, arr) {
      var ret = ''
       arr.forEach(function(item, i) {
         if (item['text'] === val) {
           ret = item['value']
           return false
         }
       })
       return ret
     },
      _creatList(obj, list, cb) {
        obj.forEach(function (item, index, arr) {
            var temp = {}
            temp.text = item.name
            temp.value = index
            list.push(temp)
        })
       // console.log(list)
       cb && cb(list)
     }
  }
}
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6)
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0)
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5)
}
.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1)
}
</style>
