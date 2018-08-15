<template>
  <div id="">
         <div class="title">
             <div>用户登录</div>
         </div>

         <!-- <my-input :alignType="alignType">
           <label class="label">手机号</label>
           <input type="tel" placeholder="请输入手机号" v-model="mobile" maxLength="16">
         </my-input> -->

         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label class="label">手机号</label>
            <input type="tel" placeholder="请输入手机号" value="" v-model="mobile" maxLength="16">
          </div>
        </div>
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label >密&nbsp&nbsp&nbsp&nbsp码</label>
            <input type="text" v-model="password" placeholder="请输入密码" maxlength="16" v-if="isOpen">
            <input type="password" v-model="password" placeholder="请输入密码" maxlength="16" v-else>
            <div class="eye" :class="{open:isOpen===true}" @click='eyeSwitch'></div>
          </div>
        </div>
         <div class="buttonBox mt50" @click="login">
             <div class="buttonBox">
                 <div class="button" :class="{disable:btnDisable===true}">
                     <div>登录</div>
                 </div>
             </div>
         </div>
         <div class="forget-register">
             <a class="extend-click" @click.prevent="gotoForgetpassword">忘记密码？</a>
             <a class="extend-click register-btn" @click.prevent="gotoRegister">立即注册</a>
         </div>

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
      pwsInputType: 'password'
    }
  },
  mounted() {
    //do something after mounting vue instance
    wx.hideTabBar() //隐藏底部TabBar按钮
  },
  methods: {
    gotoRegister () {
      wx.setStorageSync('mobile', this.mobile)
      const url = '../register/main'
      // wx.navigateTo({ url })
      // wx.switchTab({ url })  //切换TabBar按钮
      wx.redirectTo({ url })
    },
    gotoForgetpassword () {
      const url = '../forgetpassword/main'
      wx.navigateTo({ url })
    },
    async login () {
      if (!this.mobile) {
        showModal('验证失败', '请输入手机号')
        return
      }
      if (!/(1[3|4|5|7|8])\d{9}$/.test(this.mobile)) {
        showModal('验证失败', '请输入正确手机号码')
        return
      }
      if (!this.password) {
        showModal('验证失败', '请输入密码')
        return
      }
      const data = {
        data: {
          Identifier: this.mobile,
          Credential: this.password
        },
        token: '1111'
      }
      this.btnDisable = true
      try {
        let res = await post('Login/UserLogin', data)
        // .then(res => { //如果没有后续数据操作 可以不要then
        //   // console.log('res---', res)
        //   wx.setStorageSync('token', res.Token)
        // })
        wx.setStorageSync('token', res.result.Token)
        wx.setStorageSync('mobile', this.mobile)
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
      this.isOpen ? this.pwsInputType = 'text' : this.pwsInputType = 'password'
    },
    cheBtnIsDisable() {
      if (this.mobile && (/1[3|4|5|7|8]\d{9}/.test(this.mobile)) && this.mobile.length===11 && this.password) {
        this.btnDisable = false
      } else {
        this.btnDisable = true
      }
    }
  },
  watch: {
    mobile(vl) {
      this.cheBtnIsDisable()
    },
    password(vl) {
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
@import "~common/stylus/public"
</style>
