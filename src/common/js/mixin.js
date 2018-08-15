
export const getCodeMixin = {
  data() {
    return {
      codeBtnDisable: false,
      codeBtnText: '发送验证码'
    }
  },
  methods: {
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
        wx.setStorageSync('token', res.Token)
        setTimeout(() => {
          showSuccess('登录成功')
          const url = '../home/main'
          wx.redirectTo({ url })
        }, 500)
      } catch (e) {
        showModal('失败', e.msg)
      }
      //
    }
  }
}
