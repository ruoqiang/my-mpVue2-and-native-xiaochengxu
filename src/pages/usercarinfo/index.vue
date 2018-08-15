<template>
  <div class="userBaseinfo">

    <div class="head-setp">
       <div class="setp">
           <div class="setp-tips-box">
               <span class="active">申请人信息</span><span class="active">车辆信息</span><span class="">证件照片</span><span class="">收货地址</span>
           </div>
           <div class="setp-dot-box">
               <span class="active"></span><span class="active setp-line"></span><span class="active"></span><span class="setp-line"></span>
               <span class="">
               </span><span class="setp-line"></span><span class=""></span>
           </div>
       </div>
   </div>

   <div class="form-box" style="pointer-events: auto;">
           <div class="inputBox padType2">
               <div class="input size-2 align-2"><h2 @click="back">车辆信息</h2></div>
           </div>
           <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>车牌颜色</label>
                   <picker bindchange="bindPickerChange" :value="index" :range="carColorTypeArr" @change="selectCarColor">
                     <div class="picker">
                       {{carColorTypeDesc}}
                     </div>
                   </picker>
                   <div class="icon-more"></div>
               </div>
           </div>
            <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>车牌号 {{defaultValue}}</label>
                   <!-- <span  *ngFor="let item of carNum">{{item}}</span> -->
                   <div class="selectedValueBox" @click="showCarselectedNo">
                     <span class="line"></span>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>
                     <div class="inputLike"></div>

                   </div>
                   <div class="selected-car-box"  @click="showCarselectedNo">
                     <span class="line"></span>
                     <div class="inputLike" v-for="(item,index) in carno" :key="index">{{item}}</div>
                   </div>

               </div>
           </div> <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>发动机号</label> <input type="text"  v-model="engineNum" placeholder="请输入发动机号" maxlength="20">
               </div>
           </div> <div class="inputBox padType2">
               <div class="input size-2 align-2">
                   <label>车辆识别代码</label> <input type="text" v-model="vehicleCode" placeholder="请输入车辆识别代码" maxlength="20">
               </div>
           </div> <div class="inputBox padType2">
               <div class="input size-2 align-2"><label>车辆品牌</label> <input type="text" v-model="carBrand" placeholder="请输入车辆品牌" maxlength="20"></div>
           </div>
           <div class="inputBox padType2">
               <div class="input size-2 align-2"><label>核定载重(kg)</label> <input type="text" v-model="carLoad" placeholder="请输入核定载重" maxlength="20"></div>
           </div>
       </div>
       <div class="buttonBox mt40" ref="register">
           <div class="buttonBox">
               <div class="button" :class="{disable:btnDisable===true}" @click="nextPage">
                   <div>下一步</div>
               </div>
           </div>
       </div>
       <div style="height: 40px;"></div>
       <car-select-no ref="carSelectNo" :defaultValue="carno" @selectedValue="selectedValueFromChild"></car-select-no>
       <head-step></head-step>
  </div>
</template>
<script>
// import headStep from '@/components/head-step/head-step'
import carSelectNo from '@/components/car-select-no/car-select-no'
// import {getComponentByTag} from '@/utils/index'
import {post, showModal, showSuccess} from '@/utils/index'
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  components: {
    carSelectNo
  },
  data() {
    return {
      carColorTypeArr: ['蓝牌', '黄牌', '黑牌', '白牌'],
      carColorType: '0',
      carColorTypeDesc: '蓝牌',
      carno: ['京', 'E', '1', '1', '2'],
      engineNum: '',
      vehicleCode: '',
      carBrand: '',
      carLoad: '',
      btnDisable: false,
      stepNum: 2
    }
  },
  onShow () {
    console.log('ddddddd')
    // console.log(this) ///不要随便打印this 手机上可能或报错并且没有明显提示
    console.log('usercarionfo-------', this.userApplyStep)
    this.fillStepData(this.userApplyStep)
  },
  methods: {
    selectCarColor(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      console.log('picker发送选择改变，携带值为this.carColorTypeArr[e.mp.detail.value]', this.carColorTypeArr[e.mp.detail.value])
      this.carColorTypeDesc = this.carColorTypeArr[e.mp.detail.value]
      this.carColorType = e.mp.detail.value
    },
    showCarselectedNo() {
      // let carSeletedCompoent = getComponentByTag(this, 'car-select-no')
      // carSeletedCompoent.show()
      this.$refs.carSelectNo.show()
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
    },
    fillStepData(data) {
      if (data && data.apply) {
        this.carColorTypeDesc =  data.apply.CarColor && data.apply.CarColor
        this.carColorType =  data.apply.CarColorType && data.apply.CarColorType
        this.carno = data.apply.CarNum && data.apply.CarNum.split('') //车牌号
        this.engineNum = data.apply.EngineNum && data.apply.EngineNum //发动机号
        this.vehicleCode = data.apply.CarVin && data.apply.CarVin // 车辆识别码
        this.carBrand = data.apply.CarBrand && data.apply.CarBrand
        this.carLoad = data.apply.CarLoad && data.apply.CarLoad
      }
    },
    async nextPage () {
      ///------------------
      if (this.carno.length < 5) {
        showModal('验证失败', '请输入正确位数车牌号')
        return
      }
      if (!this.engineNum) {
        showModal('验证失败', '请输入发动机号')
        return
      }
      var engineNumReg = /^[0-9a-zA-Z]*$/g
      if (!engineNumReg.test(this.engineNum)) {
        showModal('验证失败', '请输入正确格式的发动机号')
        return
      }
      if (!this.vehicleCode) {
        showModal('验证失败', '请输入车辆识别代码')
        return
      }
      var vehicleCodeReg = /^[0-9a-zA-Z]*$/g
      if (!vehicleCodeReg.test(this.vehicleCode)) {
        showModal('验证失败', '请输入正确格式的车辆识别代码')
        return
      }
      if (!this.carBrand) {
        showModal('验证失败', '请输入车牌品牌')
        return
      }
      if (!this.carLoad) {
        showModal('验证失败', '请输入车辆载重')
        return
      }
       var numReg= /^\d+(\.\d+)?$/
      if (!numReg.test(this.carLoad)) {
        showModal('验证失败', '请输入正确的载重')
        return
      }
        this.btnDisable = true
        var data = {
          data: {
            Step: 2,
            CCustomerApply: {
              "CarColor": this.carColorTypeDesc, //车牌颜色
              "CarColorType": this.carColorType, //车牌颜色编号
              "CarNum": this.carno.join(''), //车牌号
              "EngineNum": this.engineNum, //发动机号
              "CarVin": this.vehicleCode, //车辆识别码
              "CarBrand": this.carBrand,
              "CarLoad": this.carLoad,
              "Relation": "11111"
            }
          },
          token: wx.getStorageSync('token')
        }
      ///=========
      try {
        let res = await post('SubInfo/UserAndCar', data)
        //showSuccess('登录成功')
        setTimeout(() => {
          const url = '../userupload/main'
          wx.navigateTo({ url })
          this.btnDisable = false
        }, 500)
      } catch (e) {
        showFail(e.message)
        this.btnDisable = false
        wx.redirectTo({ url: '../login/main' })
      }
    } //------------
  },
  computed: {
    ...mapGetters([
      'userApplyStep'
    ])
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
</style>
