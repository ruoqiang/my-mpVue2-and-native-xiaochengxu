<template>
    <div class="inputBox" :class="calPadType" >
      <div class="input" :class="[sizeType,calAlignType,caltextAlignRight]" >
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: "my-input",
  props: {
    labelTxt: {
      type: String,
      default: '手机号'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    size: { //高度类型 2 为72px高度
      type: Number,
      default: 0
    },
    alignType: {
      type: Number,
      default: 0
    },
    padType: {
      type: String,
      default: ''
    },
    inputTextAlignRight: {
      type: Boolean(),
      default: false
    }
  },
  data() {
    return {
      //labelTxt: ''
    }
  },
  computed: {
    sizeType() {
      return 'size-' + (this.size + '') //数字转字符串
    },
    calAlignType() {
      return 'align-' + (this.alignType + '')
    },
    calPadType() {
      return 'padType' + (this.padType + '')
    },
    caltextAlignRight() {
      return this.inputTextAlignRight === true ? 'textAlignRight' : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
// .inputBox
//   padding: 0px 14px
//   position: relative
//   color: $color-theme
//   font-size: 14px
//   &.padType2
//     padding: 0px 0px 0px 14px
//   .input
//     display: flex
//     align-items:center
//     padding: 0
//     height:49px
//     line-height:49px
//     text-align: left
//     border-1px(#dddddd)
//     &.size-2
//       padding:0 0
//       padding: 0
//       height:49px
//       line-height:49px
//     &.align-0
//       height:63px
//       line-height:63px
//     &.align-1
//       height:56px
//       line-height:56px
//     &.align-2
//       label
//         display:inline !important
//         // min-width: auto;
//         margin-right:2em
//     &.textAlignRight
//         input
//            float:right
//            margin-top:15px
//            text-align:right
//            margin-right:15px
//     label
//       font-size: 14px
//       color:$color-text
//       margin-right:2em
//       min-width:140px
//       display:inline-block
//       vertical-align: middle
//     input
//       color:$color-text
//       margin-top:-1px
//       background:none
//       .large
//         width:66%
//     h2
//       font-size: 16px
//       color:$color-text
// @media only screen and (min-width: 414px)
//     .inputBox .input
//       label
//         vertical-align: top
      // input
      //   width: 290px
      //   display: inline-block
</style>
