<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面{{count}}</a>
     <button open-type="getUserInfo" style="height:30px;line-height:30px;background:#333;color:#fff;" bindgetuserinfo="bindGetUserInfo">授权登录</button>
     <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" style="height:30px;line-height:30px;background:#333;color:#fff;">获取手机号 </button>
  </div>
</template>

<script>
import card from '@/components/card'
import store from '../counter/store'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      mobile: ''
    }
  },

  components: {
    card
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      console.log('this.userInfo')
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log('this.userInfo----------', this.userInfo)
            }
          })
        }
      })
    },
    bindGetUserInfo (e) {
       console.log(e.detail.userInfo)
     },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getPhoneNumber (e) {
      console.log(e)
      this.mobile = e
      // console.log(e.detail.errMsg)
      // console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getPhoneNumber()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
