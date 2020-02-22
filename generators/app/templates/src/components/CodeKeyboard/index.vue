<template>
  <div class="code-keyboard-box">
    <van-field
      v-model="codeNum"
      class="code-input"
      rows="2"
      autosize
      type="number"
      maxlength="4"
      @focus="onFocus()"
      @blur="onBlur()"
    />
    <ul class="code-keyboard-input">
      <li>
        <div v-if="focused && codeLen === 0" class="focus-item"></div>
        {{ codeArr[0] }}
      </li>
      <li>
        <div v-if="focused && codeLen === 1" class="focus-item"></div>
        {{ codeArr[1] }}
      </li>
      <li>
        <div v-if="focused && codeLen === 2" class="focus-item"></div>
        {{ codeArr[2] }}
      </li>
      <li>
        <div v-if="focused && codeLen === 3" class="focus-item"></div>
        {{ codeArr[3] }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'CodeKeyboard',
  components: {}
})
export default class extends Vue {
  @Prop() value!: number

  private codeNum: any = this.value
  private codeArr: string[] = []
  private codeLen: number = 0
  private focused: boolean = false

  private onBlur() {
    window.scroll(0, 0)
    this.focused = false
    this.$emit('blur')
  }
  private onFocus() {
    this.focused = true
    this.$emit('focus')
  }
  @Watch('codeNum', { immediate: true })
  private handler(nv: any, ov: any) {
    this.codeArr = String(nv).split('')
    this.codeLen = this.codeArr.length
    if (nv > 9999) {
      this.codeNum = +this.codeArr.splice(0, 4).join('')
    }
    this.$emit('input', this.codeNum)
  }
  @Watch('value')
  private handler2(nv: any, ov: any) {
    if (!nv) {
      this.codeNum = ''
    }
  }
}
</script>
<style>
.code-keyboard-box .van-cell:not(:last-child)::after {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.code-keyboard-box {
  position: relative;
  height: 60px;
  margin: 0 20px;
  .code-input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200%;
    z-index: 2;
    background: transparent;
    color: transparent;
    border: none;
    caret-color: transparent;
    margin-left: -200px;
  }
  .code-keyboard-input {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    li {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      line-height: 60px;
      border: none;
      box-shadow: 0 1.067vw 2.667vw 0 rgba(0, 0, 0, 0.05);
      margin-left: 15px;
      position: relative;
      flex: 1;
      text-align: center;
      background-color: #fff;
      font-size: 20px;
      &:first-child {
        margin-left: 0;
      }
    }
    .focus-item {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 40%;
      background-color: #323233;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      -webkit-animation: 1s cursor-flicker infinite;
      animation: 1s cursor-flicker infinite;
    }
  }
}
@keyframes cursor-flicker {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
