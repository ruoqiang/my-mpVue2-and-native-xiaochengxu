
<template>
  <div id="">
         <div class="title">
             <div>用户注册</div>
         </div>
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label class="label">手机号</label>
            <input type="tel" placeholder="请输入手机号" value="" v-model="mobile" maxLength="16">
          </div>
        </div>
         <!-- <my-input :alignType="alignType">
           <label class="label">手机号</label>
           <input type="tel" placeholder="请输入手机号" value="" v-model="mobile" maxLength="16">
         </my-input> -->

         <!-- <my-input :alignType="alignType">
           <label class="label">验证码</label>
           <input type="tel" placeholder="请输入验证码" value="" v-model="mobile" maxLength="16">
         </my-input> -->
         <div class="inputBox padType">
          <div class="input size-0 align-1">
            <label class="label">验证码</label>
            <input type="tel" placeholder="请输入验证码" value="" v-model="code" maxLength="16">
            <div class="send-smg-code " :class="{'disable': codeBtnDisable}" @click="getCode(mobile)">{{codeBtnText}}</div>
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
        <div class="agree-register">
          <div class="agree-check" :class="{unchose:unchose===false}" @click="switchChoose"></div>
          <div class="agree-text">
              同意《
              <a class="agree-text2" @click="showPop">
                  注册协议
              </a>
              》
          </div>
      </div>
         <div class="buttonBox mt50">
             <div class="buttonBox">
                 <div class="button" :class="{disable:btnDisable===true}" @click="register">
                     <div>注册</div>
                 </div>
             </div>
         </div>
         <div class="buttonBox mt20">
             <div class="buttonBox">
                 <div class="button reverse" @click="gotoLogin">
                     <div>已有账号，去登录</div>
                 </div>
             </div>
         </div>
         <!-- <div class="forget-register">
             <a class="extend-click" @click="gotoIndex">去首页2</a>
             <a class="extend-click register-btn" @click="gotoLogin">去登录2</a>
         </div> -->
         <scroll-view scroll-y style="height: 600px;width:100%;" class="register-pop-scroll" v-if="isShowPop">
           <div class="register-pop">
             <h2>一、特别提示 </h2>
             <p>在此特别提醒您（用户）在注册成为上海易路通达车联网信息科技有限公司（以下简称“易路通达”）用户之前，请认真阅读本《用户服务协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。 </p>
             <p>本协议约定易路通达与用户之间关于“易路通达服务”（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的公司或个人。本协议可由易路通达随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本站中查阅最新版协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用易路通达提供的服务，用户继续使用易路通达提供的服务将被视为接受修改后的协议。 </p>
             <h2>二、账号注册 </h2>
             <p>1、用户在使用本服务前需要注册一个“易路通达”账号。“易路通达”账号应当使用手机号码绑定注册，请用户使用尚未与“易路通达”账号绑定的手机号码，以及未被易路通达根据本协议封禁的手机号码注册“易路通达”账号。易路通达可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。 </p>
             <p>2、如果注册申请者有被易路通达封禁的先例或涉嫌虚假注册及滥用他人名义注册，及其他不能得到许可的理由， 易路通达将拒绝其注册申请。 </p>
             <p>3、鉴于“易路通达”账号的绑定注册方式，您同意易路通达在注册时将允许您的手机号码及手机设备识别码等信息用于注册。 </p>
             <p>4、在用户注册及使用本服务时，易路通达需要搜集能识别用户身份的个人信息以便易路通达可以在必要时联系用户，或为用户提供更好的使用体验。易路通达搜集的信息包括但不限于用户的姓名、地址。</p>
             <h2>三、账户安全 </h2>
             <p>1、用户一旦注册成功，成为易路通达的用户，将得到一个用户名和密码，并有权利使用自己的用户名及密码随时登陆易路通达。</p>
             <p>2、用户对用户名和密码的安全负全部责任，同时对以其用户名进行的所有活动和事件负全责。 </p>
             <p>3、用户不得以任何形式擅自转让或授权他人使用自己的易路通达用户名。</p>
             <p>4、如果用户泄漏了密码，有可能导致不利的法律后果，因此不管任何原因导致用户的密码安全受到威胁，应该立即和易路通达客服人员取得联系，否则后果自负。 </p>
             <h2>四、用户个人信息保护</h2>
             <p>1、保护用户个人信息是易路通达的一项基本原则。</p>
             <p>2、您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。</p>
             <p>3、一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</p>
             <p>4、易路通达将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</p>
             <p>5、易路通达保证不对外公开或向第三方披露或提供用户注册资料及用户在使用网络服务时存储在易路通达平台、服务器或数据库的非公开内容和信息，但下列情况除外：</p>
             <p>1) 事先获得用户的明确授权；</p>
             <p>2) 根据有关的法律法规要求；</p>
             <p>3) 按照相关政府主管部门和司法机关的要求；</p>
             <p>4) 为维护社会公众的利益；</p>
             <p>5) 为维护易路通达的合法权益。</p>
             <h2>五、用户声明与保证</h2>
             <p>1、用户承诺其为具有完全民事行为能力的民事主体，且具有达成交易履行其义务的能力。</p>
             <p>2、用户有义务在注册时提供自己的真实资料，并保证诸如手机号码、姓名、所在地区等内容的有效性及安全性，保证易路通达工作人员可以通过上述联系方式与用户取得联系。同时，用户也有义务在相关资料实际变更时及时更新有关注册资料。 </p>
             <p>3、用户通过使用服务的过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复和相关链接页面，以及其他使用账号或本服务所产生的内容，不得违反国家相关法律制度，包含但不限于如下原则： </p>
             <p>（1）反对宪法所确定的基本原则的； </p>
             <p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； </p>
             <p>（3）损害国家荣誉和利益的； </p>
             <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的； </p>
             <p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的； </p>
             <p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的； </p>
             <p>（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
             <p>（8）侮辱或者诽谤他人，侵害他人合法权益的； </p>
             <p>9）含有法律、行政法规禁止的其他内容的。 </p>
             <p>4、用户不得利用“易路通达”账号或本服务制作、上载、复制、发布、传播下干扰易路通达正常运营，以及侵犯其他用户或第三方合法权益的内容： </p>
             <p>（1）含有任何性或性暗示的； </p>
             <p>（2）含有辱骂、恐吓、威胁内容的； </p>
             <p>（3）含有骚扰、垃圾广告、恶意信息、诱骗信息的；</p>
             <p>（4）涉及他人隐私、个人信息或资料的； </p>
             <p>（5）侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</p>
             <p>（6）含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。</p>
             <h2>六、服务内容 </h2>
             <p>1、易路通达具体服务内容由易路通达根据实际情况提供，包括但不限于：</p>
             <p>（1）在线咨询服务； </p>
             <p>（2）服务商收入结算和用户支付费用：具体金额以易路通达产生的统计数据为准。 </p>
             <p>2、易路通达有权随时审核或删除用户发布/传播的涉嫌违法或违反社会主义精神文明，或者被易路通达认为不妥当的内容（包括但不限于文字、语音、图片、视频、图文等）。 </p>
             <p>3、所有发给用户的通告及其他消息都可通过本站或者用户所提供的联系方式发送。 </p>
             <h2>七、服务的终止 </h2>
             <p>1、在下列情况下，易路通达有权终止向用户提供服务： </p>
             <p>（1）在用户违反本服务协议相关规定时，易路通达有权终止向该用户提供服务。如该用户再一次直接或间接或以他人名义注册为用户的，一经发现，易路通达有权直接单方面终止向该用户提供服务； </p>
             <p>（2）如易路通达通过用户提供的信息与用户联系时，发现用户在注册时填写的联系方式已不存在或无法接通，易路通达以其它联系方式通知用户更改，而用户在三个工作日内仍未能提供新的联系方式，易路通达有权终止向该用户提供服务； </p>
             <p>（3）用户不得通过程序或人工方式进行刷量或作弊，若发现用户有作弊行为，易路通达将立即终止服务，并有权扣留账户内金额；</p>
             <p>（4）一旦易路通达发现用户提供的数据或信息中含有虚假内容，易路通达有权随时终止向该用户提供服务； </p>
             <p>（5）本服务条款终止或更新时，用户明示不愿接受新的服务条款；</p>
             <p>（6）其它易路通达认为需终止服务的情况。 </p>
             <p>2、服务终止后，易路通达没有义务为用户保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方。</p>
           </div>
           <div class="back-btn" @click="hidePop">
             返回
           </div>
         </scroll-view>

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
      codeBtnText: '发送验证码',
      unchose: true,
      isShowPop: false
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
      if (!this.unchose) {
        showModal('验证失败', '请输勾选同意注册协议')
        return
      }
      this.btnDisable = true
      const data = {
        data: {
          Identifier: this.mobile,
          Credential: this.password,
          Additional: this.code
        },
        token: '1111'
      }
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
    switchChoose() {
      this.unchose = !this.unchose
      console.log(this.unchose)
    },
    showPop() {
      this.isShowPop = true
    },
    hidePop() {
      this.isShowPop = false
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
.agree-register {
margin: 15px 0 0;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
font-size: 12px;
color: #333
}

.agree-register .agree-check {
  display:inline-block;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
width: 14px;
height: 14px;
position: relative;
margin-top: -2px;
background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUU2OTJGRDdCRDM5MTFFN0EwQUM5N0MzRUI3NzRFRTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUU2OTJGRDhCRDM5MTFFN0EwQUM5N0MzRUI3NzRFRTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTY5MkZENUJEMzkxMUU3QTBBQzk3QzNFQjc3NEVFNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTY5MkZENkJEMzkxMUU3QTBBQzk3QzNFQjc3NEVFNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkTsd/EAAAI3SURBVHjaYjx85pNn/eQnc1+//y3JQEMgKsj6vDFXJpnRKf7aM1pbhmwpE70sAwGQXUwMdAajFg4NCwX5WRgWtCszaKtw0t5CVhZGhr5yeQYjLW6GzEhx2ltYnCjJYKzNzfDs1S+G2klPaGthgLMgQ5SPCMOPn/8YCtoeMrz/+Id2FuqqcTHUZskw/P/PwFAH9NmN+99pl2hEBFkY+irkwfG3cMNrhh1HPtAulYIs6QUmEnFhVoZj5z8zTFj0grRswcjIwKChyEm0hZVp0gyGmtwMj1/8YijvecTw799/0izMi5VgWN6rwhDmIUzQsmA3IYYQdyGG7z9AieQBw8cvf0nP+F++/mNgYmJkqMmUZihKkGQAMrECAw0uhqp0aXAiqZn4mOH2wx9EhQizuHpmA7LA+etfGe4++sHgYMbHYKLDw6CqwMFw6Mxnhj9/EEElBoyvWc1KDLzczAxz17xiWL71LWVF2+5jHxkSq+4xvP3wh8HZgp9hXqsyOCXCEkk/MEUCK1OGI2c/M0xZ9pI6ZemV298YYsrugH0LKhOXdqsyqMpzgIMalOcePfvJUEZEIsFIlLp+F/Hq4OFiZugpk2OwMuRl+A0MVpAPv3z7yxBbdpfh7uMfJGcjgvkQZHh28wOGdbvfgS0DJZLaiU/IsgwEWIhR9Pfvf4aGKU8YHjz9ycDJzsSw98RHsgsKFlIUL1j/erTGJ2whqHFKL8uAefkFU0OuTAqIQWvLgKXT08Zc2WSAAAMA21vEa+PjtRkAAAAASUVORK5CYII=');
background-size: 100% 100%;
margin-right: 14px;
}

.agree-register .agree-check.unchose {
background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUU2OTJGREJCRDM5MTFFN0EwQUM5N0MzRUI3NzRFRTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUU2OTJGRENCRDM5MTFFN0EwQUM5N0MzRUI3NzRFRTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTY5MkZEOUJEMzkxMUU3QTBBQzk3QzNFQjc3NEVFNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTY5MkZEQUJEMzkxMUU3QTBBQzk3QzNFQjc3NEVFNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhLp5vUAAABfSURBVHjaYrx7964nAwPDXCCWZKAteA7EyYxAC5/RwTK4pSxIljHS2LL/ILuYGOgMRi0ctXDUwlELRy0ctXDUwlELRy0cKhY+R2o30hKDwAuQhSkgBh089xTU1AcIMADfticTlOv7KwAAAABJRU5ErkJggg==');
background-size: 100% 100%;
}
.agree-text,.agree-text2{
  display:inline-block;
}
.agree-text2{
  color: #2d4ed1;
}
.register-pop-scroll
  position:absolute;
  left:0px;
  top:0;
  z-index:999;
  background:#fff;
  font-size:14px;
  .register-pop
    box-sizing: border-box;
    padding:15px;
    width:100%;
    h2
      margin-bottom: 5px;
    p
    text-indent:2em;
    line-height:1.5;
.back-btn
  position:fixed;
  right:10px;
  top:10px;
  background:rgba(0,0,0,0.3)
  border-radius:50%;
  width:40px;
  height:40px;
  line-height:40px;
  text-align:center
  color:#fff;
</style>
