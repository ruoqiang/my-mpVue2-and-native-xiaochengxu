
<template>
  <div id="">
         <div class="title">
             <div>忘记密码</div>
         </div>
         <!-- <my-input :alignType="alignType">
           <label class="label">手机号</label>
           <input type="tel" placeholder="请输入手机号" value="" v-model="mobile" maxLength="16">
         </my-input> -->
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label class="label">手机号</label>
            <input type="tel" placeholder="请输入手机号" value="" v-model="mobile" maxLength="16">
          </div>
        </div>
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label class="label">验证码</label>
            <input type="tel" placeholder="请输入验证码" value="" v-model="code" maxLength="16">
            <div class="send-smg-code " :class="{'disable': codeBtnDisable}" @click="getCode(mobile)">{{codeBtnText}}</div>
          </div>
        </div>
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label >新密码</label>
            <input type="text" v-model="password" placeholder="请输入密码" maxlength="16" v-if="isOpen">
            <input type="password" v-model="password" placeholder="请输入密码" maxlength="16" v-else>
            <div class="eye" :class="{open:isOpen===true}" @click='eyeSwitch'></div>
          </div>
        </div>
         <div class="buttonBox mt50">
             <div class="buttonBox">
                 <div class="button" :class="{disable:btnDisable===true}" @click="register">
                     <div>确定</div>
                 </div>
             </div>
         </div>
         <!-- <div class="forget-register">
             <a class="extend-click" @click="gotoIndex">去首页2</a>
             <a class="extend-click register-btn" @click="gotoLogin">去登录2</a>
         </div> -->

     </div>
</template>

<script>
import myInput from "components/my-input/my-input"
import {post, showModal, showSuccess} from '@/utils/index'
export default {
  data () {
    return {
      mobile: '',
      password: '',
      alignType: 1,
      btnDisable: true,
      isOpen: false,
      code: '',
      codeBtnDisable: false,
      codeBtnText: '发送验证码'
    }
  },
  methods: {
    gotoIndex () {
      const url = '../index/main'
      // wx.navigateTo({ url })
      wx.switchTab({ url })  //切换TabBar按钮
    },
    gotoLogin () {
      const url = '../login/main'
      // wx.navigateTo({ url })
      wx.redirectTo({ url })  //切换TabBar按钮
    },
    async register () {
      if (!this.mobile) {
        showModal('验证失败', '请输入手机号')
        return
      }
      if (!/(1[3|4|5|7|8])\d{9}$/.test(this.mobile)) {
        showModal('验证失败', '请输入正确手机号码')
        return
      }
      if (!this.code) {
        showModal('验证失败', '请输入验证码')
        return
      }
      if (!this.password) {
        showModal('验证失败', '请输入密码')
        return
      }
      const data = {
        data: {
          Identifier: this.mobile,
          Credential: this.password,
          Additional: this.code
        },
        token: '1111'
      }
      this.btnDisable = true
      try {
        let res = await post('Login/UserRegister', data)
        wx.setStorageSync('token', res.Token)
        setTimeout(() => {
          showSuccess('登录成功')
          const url = '../home/main'
          wx.redirectTo({ url })
          this.btnDisable = false
        }, 500)
      } catch (e) {
        showModal('失败', e.msg)
        this.btnDisable = false
      }
    },
    eyeSwitch() {
      this.isOpen = !this.isOpen
      console.log(this.isOpen)
    },
    cheBtnIsDisable() {
      if (this.mobile && (/1[3|4|5|7|8]\d{9}/.test(this.mobile)) && this.mobile.length===11 &&this.code && this.password) {
        this.btnDisable = false
      } else {
        this.btnDisable = true
      }
    },
    getCode(mobile) {
      if (mobile === '') {
        showModal('失败', '请输入手机号码')
        return
      }
      if (!/1[3|4|5|7|8]\d{9}/.test(mobile)) {
        showModal('失败', '请输入正确手机号码')
        return
      }
      this.codeBtnDisable = true
      this.postVcode(mobile)
      let total = 59
      this.codeBtnText = `${total}秒`
      this.timer = setInterval(() => {
        // console.log(total)
        --total
        this.codeBtnText = `${total}秒`
        if (total <= 0) {
          clearInterval(this.timer)
          this.codeBtnText = '发送验证码'
          this.codeBtnDisable = false
        }
      }, 1000)
    },
    async postVcode(mobile) {
      const data = {
        data: {
          Phone: mobile
        },
        token: '1111'
      }
      try {
        let res = await post('ComService/PostVcode', data)
        // wx.setStorageSync('token', res.Token)
        console.log(res)
        showModal('提示', 'res.message')
      } catch (e) {
        showModal('失败', e.msg)
      }
    }
  },
  watch: {
    mobile(vl) {
      this.cheBtnIsDisable()
    },
    password(vl) {
      this.cheBtnIsDisable()
    },
    code(vl) {
      this.cheBtnIsDisable()
    }
  },
  components: {
    myInput
  },
  onShow() {
    let _mobile = wx.getStorageSync('mobile')
    if (_mobile) this.mobile = _mobile
  }
}

</script>
<style lang="stylus">
// @import "~common/stylus/variable"
@import "~common/stylus/public"
</style>
