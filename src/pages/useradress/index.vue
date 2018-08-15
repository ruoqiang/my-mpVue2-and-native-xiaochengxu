<template>
  <div class="userBaseinfo">

    <div class="head-setp">
       <div class="setp">
           <div class="setp-tips-box">
               <span class="active">申请人信息</span><span class="active">车辆信息</span><span class="active">证件照片</span><span class="active">收货地址</span>
           </div>
           <div class="setp-dot-box">
               <span class="active"></span><span class="active setp-line"></span><span class="active"></span><span class="setp-line"></span>
               <span class="active">
               </span><span class="setp-line"></span><span class="active"></span>
           </div>
       </div>
   </div>

   <div class="form-box" style="pointer-events: auto;">
           <div class="inputBox padType2">
               <div class="input size-2 align-2"><h2 @click="back">收货地址</h2></div>
           </div>
           <div class="inputBox padType2">
               <div class="input size-2 align-2"><label>收货人</label> <input type="text" placeholder="请输入收货人" maxlength="20"></div>
           </div>
           <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>手机号</label> <input type="text" name="" placeholder="请输入手机号" maxlength="20">
               </div>
           </div>
           <div class="inputBox padType2"  @click="showPicker">
               <div class="input size-2 align-2">
                   <label>所在地区</label>
                   {{pickerValueDefault}}
                   <div class="icon-more"></div>
               </div>
           </div>
           <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>详细地址</label> <input type="text" name="" placeholder="请输入详细地址" maxlength="20">
               </div>
           </div>
       </div>
       <div class="buttonBox mt40">
           <div class="buttonBox">
               <div class="button" :class="{disable:btnDisable===true}" @click="goToNext">
                   <div>提交</div>
               </div>
           </div>
       </div>
       <div style="height: 40px;"></div>
       <head-step></head-step>
       <pick-city ref="mpvuePicker" :pickerValueDefault22="pickerValueDefault"  @onConfirm="pickerConfirm"></pick-city>
  </div>
</template>
<script>
import {getComponentByTag} from '@/utils/index'
import pickCity from 'components/pick-city/pick-city'
import city from '@/common/js/city'
export default {
  components: {
    pickCity
  },
  data() {
    return {
      stepNum: 1,
      noText: '',
      carColorTypeArr: ['蓝牌', '黄牌', '黑牌', '白牌'],
      carColorType: '0',
      carColorTypeDesc: '蓝牌',
      carno: ['京', 'E', '1', '1', '2'],
      ValueDefault: [0, 0, 0],
      pickerValueDefault: '广东 深圳 罗湖区',
      deepLength: 3
    }
  },
  created() {
    //模拟接口获取的省市区数据
    // setTimeout(() => {
    //   this.pickerValueDefault = '湖北 黄石 大冶市'
    //   console.log(this.pickerValueDefault)
    // }, 500)
  },
  onShow() {
    setTimeout(() => {
      this.pickerValueDefault = '湖北 黄石 大冶市'
      console.log(this.pickerValueDefault)
    }, 500)
  },
  methods: {
    showPicker() {
      this.$refs.mpvuePicker.show()
    },
    pickerConfirm(e) {
      console.log('pickerConfirm--parent', e)
      this.pickerValueDefault = e
    },
    selectCarColor(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      console.log('picker发送选择改变，携带值为this.carColorTypeArr[e.mp.detail.value]', this.carColorTypeArr[e.mp.detail.value])
      this.carColorTypeDesc = this.carColorTypeArr[e.mp.detail.value]
      this.carColorType = e.mp.detail.value
    },
    showCarselectedNo() {
      let carSeletedCompoent = getComponentByTag(this, 'car-select-no')
      carSeletedCompoent.show()
    },
    selectedValueFromChild(val) {
      console.log('selectedValueFromChild', val)
      this.carno = val
    },
    goToNext() {
      const url = '../userupload/main'
      wx.navigateTo({ url })
    },
    back() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/public"
page
  background-color: #f5f5f5 !important;
.picker
  width:250px
  color:#333
.icon-more
    position: absolute;
    right: 15px;
    top: 15px;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #333
    &:after
      content: ">";
      position: absolute;
      left: 0px;
      top: -15px;
      font-size:18px;
      color:#999;
.selected-car-box
  width: 75%
  font-size:0
  position:absolute
  left:80px
  top:0px
  height:49px
  .inputLike
    width:20px
    height:20px
    line-height:20px
    border:1px solid $color-text-ll
    text-align:center
    display:inline-block
    vertical-align: middle
    font-size:14px
    margin:0 4px
    -webkit-appearance: none
    &:last-child
      border:1px solid $color-theme
    &:nth-child(3)
      margin-right:12px
    // &.active
    //   border:1px solid $color-theme
  .line
    display:inline-block
    width:1px
    height:22px
    background:$color-text-ll
    vertical-align: middle
    position:absolute
    left:63px
    top:12px
.selectedValueBox
  font-size:0
  position:absolute
  left:80px
  top:0px
  .inputLike
    width:20px!important
    height:20px!important
    border:1px solid #ddd
    text-align:center
    display:inline-block!important
    vertical-align: middle
    font-size:14px
    box-sizing: content-box;
    margin:0 4px
    -webkit-appearance: none
    &:nth-child(3)
      margin-right:12px
  .line
    display:inline-block
    width:1px
    height:22px
    background:#ddd
    vertical-align: middle
    position:absolute
    left:63px
    top:12px
.mpvue-picker-view {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
