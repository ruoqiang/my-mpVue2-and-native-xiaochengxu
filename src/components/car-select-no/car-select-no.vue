<template>
    <div class="car-select-no-box" ref="carSelectBox" :class="{fadeIn:popIsfadeIn===true}" v-show="popIsfadeIn" >
        <div class="keyboard-list-box" ref="keyboardListBox" :class="{fadeIn:popIsfadeIn===true}" @click.stop>
          <ul class="keyboard-list " id="provinceList" ref="keyboardList" v-show="!childKeyBoardShow">
            <li class="list-item clearfix">
                <span class="p-item" v-for="(item,index) in provinceRow1" :key="index" @click="provinceSelect(item.name)">{{item.name}}</span>
            </li>
            <li class="list-item  clearfix">
                <span class="p-item" v-for="(item,index)  in provinceRow2" :key="index" @click="provinceSelect(item.name)">{{item.name}}</span>
            </li>
            <li class="list-item list-three clearfix">
              <span class="p-item  p-item-null"></span>
                <span class="p-item" v-for="(item,index)  in provinceRow3" :key="index" @click="provinceSelect(item.name)">{{item.name}}</span>
                <span class="p-item p-item-null"></span>
            </li>
            <li class="list-item  list-four clearfix">
                <!-- <span class="p-item p-item-null"></span> -->
                <span class="p-item p-item-null"></span>
                <span class="p-item" v-for="(item,index)  in provinceRow4" :key="index" @click="provinceSelect(item.name)">{{item.name}}</span>
                <span class="p-item p-item-close" @click="hide()">取消</span>
                <span class="p-item p-item-null"></span>
            </li>
          </ul>
            <ul class="keyboard-list" id="simKeyBoard" ref="simKeyBoard" v-show="childKeyBoardShow">
            <li class="list-item clearfix">
                <span class="p-item" v-for="(item,index)  in carNo1" :key="index" @click="carNoSelect(item.name)">{{item.name}}</span>
            </li>
            <li class="list-item  clearfix">
                <span class="p-item" v-for="(item,index)  in carNo2" :key="index" @click="carNoSelect(item.name)">{{item.name}}</span>
            </li>
            <li class="list-item list-three clearfix" style="width:90%">
                <span class="p-item" v-for="(item,index)  in carNo3" :key="index" @click="carNoSelect(item.name)">{{item.name}}</span>
            </li>
            <li class="list-item  list-four clearfix">
                <span class="p-item" v-for="(item,index)  in carNo4" :key="index" @click="carNoSelect(item.name)">{{item.name}}</span>
                <span class="p-item delete" @click="deleteVal" style="min-width:35px">></span>
                <span class="p-item font-confirm" @click="confirm" style="min-width:40px">确认</span>
            </li>
          </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "car-select-no",
  props: {
    defaultValue: {
      type: Array,
      default: ['京']
    }
  },
  data() {
    return {
      provinceRow1: [{name: '京'}, {name: '津'}, {name: '冀'}, {name: '鲁'}, {name: '晋'}, {name: '蒙'}, {name: '辽'}, {name: '吉'}, {name: '黑'}, {name: '沪'}],
      provinceRow2: [{name: '苏'}, {name: '浙'}, {name: '皖'}, {name: '闽'}, {name: '赣'}, {name: '豫'}, {name: '鄂'}, {name: '湘'}, {name: '粤'}, {name: '桂'}],
      provinceRow3: [{name: '渝'}, {name: '川'}, {name: '贵'}, {name: '云'}, {name: '藏'}, {name: '陕'}, {name: '甘'}, {name: '青'}],
      provinceRow4: [{name: '琼'}, {name: '新'}, {name: '港'}, {name: '澳'}, {name: '台'}, {name: '宁'}],
      carNo1: [{name: '1'}, {name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}, {name: '7'}, {name: '8'}, {name: '9'}, {name: '0'}],
      carNo2: [{name: 'Q'}, {name: 'W'}, {name: 'E'}, {name: 'R'}, {name: 'T'}, {name: 'Y'}, {name: 'U'}, {name: 'I'}, {name: 'O'}, {name: 'P'}],
      carNo3: [{name: 'A'}, {name: 'S'}, {name: 'D'}, {name: 'F'}, {name: 'G'}, {name: 'H'}, {name: 'J'}, {name: 'K'}, {name: 'L'}],
      carNo4: [{name: 'Z'}, {name: 'X'}, {name: 'C'}, {name: 'V'}, {name: 'B'}, {name: 'N'}, {name: 'M'}],
      selectValue: this.defaultValue,
      childKeyBoardShow: false,
      popIsfadeIn: false
    }
  },
  created() {
    if (this.selectValue && this.selectValue.length > 0) {
      this.childKeyBoardShow = !this.childKeyBoardShow
    }
  },
  methods: {
    provinceSelect(val) {
      this.selectValue = []
      this.selectValue.push(val)
      this.$emit('selectedValue', this.selectValue)
      this.childKeyBoardShow = !this.childKeyBoardShow
    },
    carNoSelect(val) {
      if (this.selectValue.length >= 7) {
        return
      }
      if (this.selectValue.length <= 1) {
        // this.childKeyBoardShow = !this.childKeyBoardShow
      }
      this.selectValue.push(val)
      console.log('carNoSelect', this.selectValue)
      this.$emit('selectedValue', this.selectValue)
    },
    //删除选择的值
    deleteVal() {
      if (this.selectValue.length <= 2) {
        this.childKeyBoardShow = !this.childKeyBoardShow
        this.selectValue = this.selectValue.pop()
        return
      }
      this.selectValue.pop()
      this.$emit('selectedValue', this.selectValue)
      console.log('selectedValue----', this.selectValue)
    },
    confirm() {
      this.hide()
    },
    //显示整个键盘
    show() {
      this.$nextTick(() => { //block之后，延迟触发transform动画
        setTimeout(() => {
          this.popIsfadeIn = true
          // addClass($carSelectBox, 'fadeIn')
          // addClass($keyboard, 'fadeIn')
        }, 300)
      })
    },
    //隐藏整个键盘
    hide() {
      var $carSelectBox = this.$refs.carSelectBox
      var $keyboard = this.$refs.keyboardListBox
      // removeClass($carSelectBox, 'fadeIn')
      // removeClass($keyboard, 'fadeIn')
      this.$nextTick(() => {
        setTimeout(() => {
          this.popIsfadeIn = false
          // $carSelectBox.style.display = 'none'
        }, 500)
      })
    }
  },
  watch: {
    defaultValue(val) { //如果外部选择的发生了变化selectValue就更新 组件间相互通信参考scroll组件
      console.log('watch:defaultValue--', val)
      this.selectValue = val
      if (this.selectValue && this.selectValue.length > 1) {
        this.childKeyBoardShow = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
// @import "~common/stylus/mixin"
.car-select-no-box
  background:rgba(0,0,0,.6)
  opacity: 0;
  height:100%;
  transition: all 0.5s
  overflow:hidden
  position:fixed
  top:0
  left:0
  bottom:0
  right:0
  width:100%
  z-index:2
  &.fadeIn
    opacity: 1;
    // transition: all .5s;
  .keyboard-list-box
    transition: all .5s;
    transform: translate3d(0px,243px,0);
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #d1d5da;
    &.fadeIn
      transition: all .5s;
      transform: translate3d(0px,0px,0);
  .keyboard-list
    width: 100%;
    max-width: 750px;
    margin: 0 atuo
    background: #d1d5da;
    padding-bottom: 20px;
    z-index: 9999;
    .list-item
      width: 96%;
      margin: 10px auto 0;
      display:flex
      justify-content: space-between
      .p-item
        display: block;
        width: 8.2%;
        flex:0 0 8.2%;
        height: 44px;
        line-height: 44px;
        background: #fff;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        min-width:30px
        &:active
          background: $color-text-lll;
        &.p-item-null
            pointer-events: none;
            background: none;
        &.p-item-close
          min-width:40px
          background:#acb4bf
          color:#fff
        &.font-confirm
            width: 12%;
            background: #ACB4BF;
            text-align: center;
            color: #fff;
            font-size: 14px;
            &:active
              background: #fff;
              color: $color-text-l;
        &.delete
            width: 12%;
            background: #ACB4BF;
            text-align: center;
            color: #fff;
            font-size: 28px;
            transform:rotateY(180deg)
            &:active
              background: #fff;
              color: $color-text-l;
</style>
