<template>
  <div class="userBaseinfo">
    <!-- <head-step :step="stepNum"></head-step> -->
    <div class="head-setp">
       <div class="setp">
           <div class="setp-tips-box">
               <span class="active">申请人信息</span><span class="">车辆信息</span><span class="">证件照片</span><span class="">收货地址</span>
           </div>
           <div class="setp-dot-box">
               <span class="active"></span><span class="active setp-line"></span><span class=""></span><span class="setp-line"></span>
               <span class="">
               </span><span class="setp-line"></span><span class=""></span>
           </div>
       </div>
   </div>
   <div class="form-box" style="pointer-events: auto;">
        <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <h2>申请人信息</h2>
            </div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>姓名</label>
                <input type="text" v-model="userName" placeholder="请输入姓名" maxlength="20">
            </div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>性别</label> <div class="sex-box">
                    <span :class="{'active':sex===1}" @click="switchSex(1)"></span><b @click="switchSex(1)">男</b>
                    <span :class="{'active':sex===0}" @click="switchSex(0)"></span><b @click="switchSex(0)">女</b>
                </div>
            </div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>身份证号</label> <input type="text" v-model="iDNumber" placeholder="请输入身份证号"  maxlength="18">
            </div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2"><label>手机号</label> <input type="tel" v-model="mobile" placeholder="请输入手机号" maxlength="11"></div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2"><label>邀请码（选填）</label> <input type="tel" v-model="inviteMoblie" placeholder="请输入邀请码" maxlength="11"></div>
        </div>
    </div>
    <div class="h10"></div>
    <div class="form-box" style="pointer-events: auto;">
        <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>是否为申请人本人车辆</label> <div class="sex-box self-box">
                    <span :class="{'active':isSelf===true}" @click="switchSelf(true)"></span><b @click="switchSelf(true)">是</b>
                    <span :class="{'active':isSelf===false}" @click="switchSelf(false)"></span><b @click="switchSelf(false)">否</b>
                </div>
            </div>
        </div>
    </div>
    <div class="h10"></div>
    <div class="form-box" v-if="!isSelf">
        <div class="inputBox padType2">
            <div class="input size-2 align-2"><h2>车主信息</h2></div>
        </div> <div class="inputBox padType2">
            <div class="input size-2 align-2">
              <label>车主姓名</label> <input type="text" v-model="carOwnerName" placeholder="请输入车主姓名"  maxlength="20"></div>
        </div>
        <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>车主身份证号</label> <input type="text" v-model="carOwnerIDNum" placeholder="请输入车主身份证号" maxlength="18">
            </div>
        </div>
        <div class="inputBox padType2">
            <div class="input size-2 align-2">
                <label>手机号</label> <input type="tel" v-model="carOwnerPhone" placeholder="请输入手机号码" maxlength="11">
            </div>
        </div>
    </div>
    <div class="buttonBox mt40">
        <div class="buttonBox">
            <div class="button" :class="{disable:btnDisable===true}" @click="nextPage">
                <div>下一步</div>
            </div>
        </div>
    </div>
    <div style="height: 40px;"></div>
  </div>
</template>
<script>
import headStep from '@/components/head-step/head-step'
import {post, showModal, showSuccess} from '@/utils/index'
// import store from '@/store/index'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    headStep
  },
  data() {
    return {
      userName: '',
      sex: 1, //1：男，0：女
      iDNumber: '',
      mobile: '',
      isSelf: true, //是否车主 true是车主 false不是车主
      carOwnerName: '',
      carOwnerIDNum: '',
      carOwnerPhone: '',
      btnDisable: false,
      inviteMoblie: ''
    }
  },
  onShow() {
    // wx.setNavigationBarTitle({
    //   title: '基本信息'
    // })
    this.getUserInfo()
  },
  methods: {
    goToNext() {
      const url = '../usercarinfo/main'
      wx.navigateTo({ url })
    },
    async getUserInfo () {
      wx.showLoading({
        title: '数据加载中...'
      })
      const data = {
        token: wx.getStorageSync('token')
      }
      try {
        let res = await post('SubInfo/CheckStep', data)
        if (res.issuccess) {
          wx.hideLoading()
          this.fillStepData(res.result)
          this.saveUserApplyStepList(res.result)
          console.log('userbaseinfo-----', res.result)
        }
        //
      } catch (e) {
        // showModal('失败', e.message) 全局接口失败情况里面已经做了弹框
        // wx.redirectTo({ url: '../login/main' })
      }
    },
    fillStepData(data) {
      if (data && data.apply) {
        this.userName = data.apply.Name
        this.sex = parseInt(data.apply.Sex) === 1 ? 1 : 0
        this.iDNumber = data.apply.IDNumber
        this.mobile = data.apply.Phone
        this.inviteMoblie = data.apply.Inviter
        this.isSelf = data.apply.IsOwnerApply
        this.carOwnerName = data.apply.CarOwnerName
        this.carOwnerIDNum = data.apply.CarOwnerIDNum
        this.carOwnerPhone = data.apply.CarOwnerPhone
      }
      if (data.IsShow) {
        setTimeout(() => {
          // this.$refs.userApplyTips.show()
        }, 500)
      }
    },
    async nextPage () {
      if (this.userName === '') {
        showModal('验证失败', '请输入姓名')
        return
      }
      if (this.iDNumber === '') {
        showModal('验证失败', '请输入身份证号码')
        return
      }
      var iDNumberReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!iDNumberReg.test(this.iDNumber)) {
        showModal('验证失败', '请输入正确格式的身份证号码')
        return
      }
      if (this.mobile === '') {
        showModal('验证失败', '请输入手机号码')
        return
      }
      if (!/1[3|4|5|7|8]\d{9}/.test(this.mobile)) {
        showModal('验证失败', '请输入正确手机号码')
        return
      }
      // if (this.inviteMoblie && !/1[3|4|5|7|8]\d{9}/.test(this.inviteMoblie)) {
      //   this.tipsText = '请输入正确邀请人手机号码'
      //   this.$refs.topTips.show()
      //   return
      // }
      if (!this.isSelf) {
        if (!this.carOwnerName) {
          this.tipsText = '请输入车主姓名'
          this.$refs.topTips.show()
          showModal('验证失败', '请输入手机号码')
          return
        }
        if (!this.carOwnerIDNum) {
          showModal('验证失败', '请输入车主身份证号')
          return
        }
        if (!iDNumberReg.test(this.carOwnerIDNum)) {
          showModal('验证失败', '请输入正确格式的身份证号码')
          return
        }
        if (!this.carOwnerPhone) {
          showModal('验证失败', '请输入车主手机号')
          return
        }
        if (!/1[3|4|5|7|8]\d{9}/.test(this.carOwnerPhone)) {
          showModal('验证失败', '请输入正确手机号码')
          return
        }
      }
        this.btnDisable = true
      const data = {
        data: {
          Step: 1,
          CCustomerApply: {
            "Name": this.userName,
            "Sex": this.sex,
            "IDNumber": this.iDNumber,
            "Phone": this.mobile,
            "Inviter": this.inviteMoblie,
            "IsOwnerApply": this.isSelf,
            "CarOwnerName": this.carOwnerName,
            "CarOwnerIDNum": this.carOwnerIDNum,
            "CarOwnerPhone": this.carOwnerPhone,
            "Relation": "11111"
          }
        },
        token: wx.getStorageSync('token')
      }
      this.btnDisable = true
      try {
        let res = await post('SubInfo/UserAndCar', data)
        //showSuccess('登录成功')
        setTimeout(() => {
          const url = '../usercarinfo/main'
          wx.navigateTo({ url })
          this.btnDisable = false
        }, 500)
      } catch (e) {
        showFail(e.message)
        this.btnDisable = false
        wx.redirectTo({ url: '../login/main' })
      }
    },
    switchSex(val) {
      this.sex = val
    },
    switchSelf(val) {
      this.isSelf = val
    },
    ...mapActions([
      'saveUserApplyStepList'
    ])
  },
  watch: {
    // ...mapActions([
    //   'saveUserApplyStepList'
    // ])
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/public"
.sex-box
  position:absolute
  left:56px
  top:0px
  &.self-box
    left:158px
  span
    width:15px
    height:15px
    border:1px solid $color-text-ll
    text-align:center
    display:inline-block
    vertical-align: middle
    border-radius:50%
    margin-right:0px
    &.active
      color:#46c33b
      background:url('./checked.png')
      border:none
      width:17px
      height:17px
      background-size:100%
    &:active
      background:url('./checked.png')
      border:none
      width:17px
      height:17px
      background-size:100%
  b
    color:$color-text
    margin:0 13px 0 0px
    vertical-align: middle
    display:inline-block
    padding-left:7px
page
  background-color: #f5f5f5 !important;
</style>
