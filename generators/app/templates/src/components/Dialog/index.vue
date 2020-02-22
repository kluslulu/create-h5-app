<template>
  <div class="isnew-dialog-container">
    <van-dialog v-model="show" :show-cancel-button="false" :show-confirm-button="false">
      <img v-if="showHeader" class="header-img" :src="headerImg" />
      <div class="title">{{ title }}</div>
      <!-- <div class="body">
        新用户弹窗文案：Hi 亲爱的雪加客，雪加会员俱乐部等你好久了！
        恭喜你，获得100积分～签到获取更多积分可换购多重豪礼。
        <br />这里还为您精心准备了一份新人专享礼包，免费畅享指定口味烟弹！
      </div>-->
      <div v-if="$slots.content" class="content">
        <slot name="content" />
      </div>
      <div class="btn-list">
        <button class="btn-item btn-ok" @click="confirm">{{ confirmText }}</button>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'SpDialog',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) showHeader!: boolean
  @Prop({ default: false }) visible!: boolean
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) confirmText!: string
  @Prop({ default: '' }) bodyText!: string
  // @Prop({ default: () => {} }) data?: any

  private show: boolean = this.visible
  private headerImg: any = require('./assets/bg.png')

  private confirm() {
    this.show = false
    this.$emit('confirm')
  }
  @Watch('visible', { immediate: true })
  private handler(nv: boolean, ov: boolean) {
    this.show = nv
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #e34b4b;
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
}
.header-img {
  width: 100%;
  margin-bottom: -30px;
}
.content {
  margin: 10px 30px 30px;
}
.btn-list {
  text-align: center;
  padding: 0 30px 30px;
  button {
    width: 245px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background: #ffe62f;
    color: #000;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
