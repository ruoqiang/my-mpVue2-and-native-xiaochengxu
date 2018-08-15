<template>
  <div class="userBaseinfo">

    <div class="head-setp">
       <div class="setp">
           <div class="setp-tips-box">
               <span class="active">申请人信息</span><span class="active">车辆信息</span><span class="active">证件照片</span><span class="">收货地址</span>
           </div>
           <div class="setp-dot-box">
               <span class="active"></span><span class="active setp-line"></span><span class="active"></span><span class="setp-line"></span>
               <span class="active">
               </span><span class="setp-line"></span><span class=""></span>
           </div>
       </div>
   </div>

   <div class="form-box" style="pointer-events: auto;">
     <div class="inputBox padType2">
         <div class="input size-2 align-0"><h2>上传身份证照片</h2></div>
     </div>
       <div class="list-box">
           <ul>
               <li @click="selectImg(0)">
                   <div class="img-box">
                     <img :src="uploadImgSrc[0]['src']">
                   </div>
                   <p class="desc">上传身份证正面照</p>
               </li>
               <li>
                   <div class="img-box">
                     <img :src="uploadImgSrc[1]['src']">
                   </div> <p class="desc">上传身份证反面照</p>
                   <!-- <input type="file" name="" value="" text="请选择图片" id="1" accept="image/jpg,image/jpeg,image/png,image/gif"> -->
                   <input type="file" value="" @change="inputChange" id="0" v-if="isIos && !destroyInput" accept="image/jpg,image/jpeg,image/png,image/gif" />
                   <input type="file" v-if="!isIos && !destroyInput" @change="inputChange" id="1" accept="image/jpg,image/jpeg,image/png,image/gif" />
               </li>
           </ul>
       </div>

  </div>
   <div class="h10"></div>
   <div class="form-box" style="pointer-events: auto;">
     <div class="inputBox padType2">
         <div class="input size-2 align-0"><h2>上传驾驶证照片</h2></div>
     </div>
       <div class="list-box">
           <ul>
               <li @click="selectImg">
                   <div class="img-box">
                       <img :src="uploadImgSrc[2]['src']">
                   </div>
                   <p class="desc">上传驾驶证正面照</p>
               </li>
               <li>
                   <div class="img-box">
                     <img :src="uploadImgSrc[3]['src']">
                   </div> <p class="desc">上传驾驶证反面照</p>
                   <input type="file" text="请选择图片" id="1" accept="image/jpg,image/jpeg,image/png,image/gif">
               </li>
           </ul>
       </div>

  </div>
  <div class="h10"></div>
  <div class="form-box" style="pointer-events: auto;">
    <div class="inputBox padType2">
        <div class="input size-2 align-0"><h2>上传行驶证照片</h2></div>
    </div>
      <div class="list-box">
          <ul>
              <li @click="selectImg">
                  <div class="img-box">
                      <img :src="uploadImgSrc[4]['src']">
                  </div>
                  <p class="desc">上传行驶证正页照</p>
              </li>
              <li>
                  <div class="img-box">
                    <img :src="uploadImgSrc[5]['src']">
                  </div> <p class="desc">上传行驶证副页照</p>
                  <input type="file" text="请选择图片" id="1" accept="image/jpg,image/jpeg,image/png,image/gif">
              </li>
          </ul>
      </div>

  </div>
   <div class="buttonBox mt40">
       <div class="buttonBox">
           <div class="button" :class="{disable:btnDisable===true}" @click="goToNext">
               <div>下一步</div>
           </div>
       </div>
   </div>
   <div style="height: 40px;"></div>
   <view>
     <canvas class='share-canvas' :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }" canvas-id="share_canvas"></canvas>
     <img :src="imgsrc1" alt="" style="width:100px; height:80px;">
   </view>
  </div>


</template>
<script>
import {post, showModal, showSuccess, host} from '@/utils/index'
import {mapMutations, mapGetters, mapActions} from 'vuex'
import {__BASE64} from './toBase64'
export default {
  components: {
    // carSelectNo
  },
  data() {
    return {
      stepNum: 3,
      params1: {IDfication: '182541111', TypeID: 1011, Relation: ''},
      params2: {IDfication: '182541112', TypeID: 1012, Relation: ''},
      params3: {IDfication: '182541113', TypeID: 1013, Relation: ''},
      params4: {IDfication: '182541114', TypeID: 1014, Relation: ''},
      params5: {IDfication: '182541114', TypeID: 1015, Relation: ''},
      params6: {IDfication: '182541114', TypeID: 1016, Relation: ''},
      uploadImgSrc: [{
          src: require('@/common/image/pic01.png'),
          isUploaded: false,
          IDfication: '上传身份证正面照',
          TypeID: 1011
        },
        {
          src: require('@/common/image/pic02.png'),
          isUploaded: false,
          IDfication: '上传身份证反面照',
          TypeID: 1012
        },
        {
          src: require('@/common/image/pic04.png'),
          isUploaded: false,
          IDfication: '上传驾驶证正页照',
          TypeID: 1013
        },
        {
          src: require('@/common/image/pic03.png'),
          isUploaded: false,
          IDfication: '上传驾驶证副页照',
          TypeID: 1014
        },
        {
          src: require('@/common/image/pic04.png'),
          isUploaded: false,
          IDfication: '上传行驶证正面照',
          TypeID: 1015
        },
        {
          src: require('@/common/image/pic03.png'),
          isUploaded: false,
          IDfication: '上传行驶证反面照',
          TypeID: 1016
        }
      ],
      destroyInput: false, // 是否销毁input元素, 解决在第二次和第一次选择的文件相同时不触发onchange事件的问题
      isIos: true, //ImageUtil.isIos,
      imgsrc1: 'http://wechat.chepass.com:8021/Content/dist/static/img/action001.0f0c621.png',
      canvasWidth: '300',
      canvasHeight: '300',
      testSrc: ''
    }
  },
  onShow () {
    console.log('userupload-------', this.userApplyStep)
    this.fillDefaultImg()
  },
  methods: {
    fillDefaultImg () {
      let userApplyStep = this.userApplyStep
      if (this.userApplyStep && this.userApplyStep.listphoto && this.userApplyStep.listphoto.length > 0) {
        var listPhotoArr = userApplyStep.listphoto
        listPhotoArr.forEach((item) => {
          let oldTypeID = item.TypeID.toString()
          let index = oldTypeID.substr(oldTypeID.length - 1, 1) -1 //index 的索引根据TypeID字段最后一个值来确定
          this.uploadImgSrc[index]['src'] = host + item.Url
          this.uploadImgSrc[index]['isUploaded'] = true
        })
      }
      this.Relation = (this.userApplyStep && this.userApplyStep.apply && this.userApplyStep.apply.Relation) || ''
      // console.log('Relation', this.Relation)
      var UserApplyStep = this.userApplyStep && this.userApplyStep.apply && this.userApplyStep.apply.Relation
      this.params1.Relation = UserApplyStep
      this.params2.Relation = UserApplyStep
      this.params3.Relation = UserApplyStep
      this.params4.Relation = UserApplyStep
      this.params5.Relation = UserApplyStep
      this.params6.Relation = UserApplyStep
    },
    goToNext() {
      const url = '../useradress/main'
      wx.navigateTo({ url })
    },
     convertImgToBase64(imgdata, callback, outputFormat) {
        // var canvas = document.createElement('canvas'),
        // ctx = canvas.getContext('2d'),
        let ctx = wx.createCanvasContext('share_canvas')
        let canvas = {}
        canvas.width = imgdata.width > 500 ? 500 : imgdata.width //设置canvas宽度，重画输出的图片宽度按照该宽度
        var scale = imgdata.width / imgdata.height
        canvas.height = canvas.width / scale //根据原图片尺寸来计算高度，保持宽高等比缩小

        let path = imgdata.path //.replace(/http/, "https")
        ctx.drawImage(path, 0, 0, imgdata.width, imgdata.height, 0, 0, canvas.width, canvas.height)
        // ctx.drawImage(path, 0, 0, 135, 135)
        ctx.draw()
        this.canvasWidth = canvas.width //动态设置canvas元素宽高
        this.canvasHeight = canvas.height
        var dataURL = ctx._context.canvas.toDataURL(outputFormat || 'image/jpeg', 1)
        // // callback.call(this, dataURL)
        callback && callback(dataURL)
    },
    selectImg(index) {
      var that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0]
          // wx.getImageInfo({
          //   src: res.tempFilePaths[0],
          //   success: function (res) {
          //     console.log(res.width)
          //     console.log(res.height)
          //     that.convertImgToBase64(res, (Base64) => {
          //       console.log('convertImgToBase64--res333', Base64)
          //       // that.uploadImgSrc[index]['src'] = Base64
          //       // let userImageBase64 = Base64
          //       let userImageBase64 = Base64.replace('data:image/jpeg;base64,', '')
          //       var needData = {
          //         data: {
          //           IDfication: that.uploadImgSrc[index]['IDfication'],
          //           TypeID: that.uploadImgSrc[index]['TypeID'],
          //           Relation: that.userApplyStep.apply.Relation,
          //           FileBase64: tempFilePaths
          //         },
          //         token: wx.getStorageSync('token')
          //       }
          //       post('SubInfo/SubPhoto', needData).then(res => {
          //         console.log(res)
          //         that.uploadImgSrc[index]['src'] = host + res.result.Url
          //       })
          //     })
          //   }
          // })

          //*********************************************
          wx.saveFile({
              tempFilePath: tempFilePaths,
              success: function(res) {
                var savedFilePath = res.savedFilePath
                console.log(savedFilePath)
                that.imgsrc1 = savedFilePath
              }
            })
          //*********************************************

          // wx.request({
          //       url: res.tempFilePaths[0],
          //       method: 'GET',
          //       responseType: 'arraybuffer',
          //       success: function(res) {
          //         let base64 = wx.arrayBufferToBase64(res)
          //         let userImageBase64 = 'data:image/jpg;base64,' + base64
          //         console.log('userImageBase64----', userImageBase64)
          //         console.log('res----', res)
          //       }
          // })
                    ////SubInfo/SubPhoto
          // let base64 = wx.arrayBufferToBase64(res.tempFilePaths[0])
          // let userImageBase64 = 'data:image/jpg;base64,' + base64
          // var needData = {
          //   data: {
          //     IDfication: that.uploadImgSrc[index]['IDfication'],
          //     TypeID: that.uploadImgSrc[index]['TypeID'],
          //     Relation: that.userApplyStep.apply.Relation,
          //     FileBase64: userImageBase64
          //   },
          //   token: wx.getStorageSync('token')
          // }
          // post('SubInfo/SubPhoto', needData).then(res => {
          //   console.log(res)
          // })
          //
        }
      })
      //
    }
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
.form-box
  background:$color-background
  border-1px(#dddddd)
  .list-box
    padding:15px 0
    ul
      display:flex
      width:83%
      justify-content: space-between
      margin: 0 auto;
      li
        flex:0 0 42%
        position:relative
        .img-box
          width:135px
          height:135px
          margin:0 auto
          overflow:hidden
          border-radius:3px
          border:1px solid #ddd
          img
            width:100%
            height:100%
        p.desc
          width:100%
          text-align:center
          margin-top:11px
          font-size:14px
        input
          position:absolute
          left:0px
          top:0px
          width:100%
          height:135px
          opacity:0
        .inputBox
          position:absolute
          left:0px
          top:0px
          width:100%
          height:135px

</style>
