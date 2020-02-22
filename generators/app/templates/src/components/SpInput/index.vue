<template>
  <div class="input-container">
    <input
      v-model="currentValue"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      @click="onClick"
      @blur="onBlur"
      @input="onChange"
    />
    <button
      v-if="smsusefor"
      class="get-code"
      :disabled="sending || countDown > 0"
      @click="sendCode"
    >{{ countDown>0?`${countDown}s`:'获取验证码' }}</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import * as api from '@/api'

@Component({
  name: 'SpInput',
  components: {}
})
export default class extends Vue {
  @Prop() private value?: any
  @Prop() private placeholder?: any
  @Prop({ default: 'text' }) private type?: any
  @Prop() private smsusefor?: string
  @Prop() private smsphone?: string
  @Prop({ default: false }) private readonly?: boolean

  private currentValue: any = this.value || ''
  private sending: boolean = false
  private countDown: number = 0

  private onClick() {
    this.$emit('click')
  }
  private onBlur() {
    window.scroll(0, 0)
  }
  private onChange(e: any) {
    this.currentValue = e.currentTarget.value
    this.$emit('input', this.currentValue)
  }
  private async sendCode() {
    try {
      if (!this.smsphone) {
        return this.$toast('请输入手机号')
      }
      if (this.sending) {
        return
      }
      this.sending = true
      const rlt = await api.sendCode({
        phone: this.smsphone,
        usefor: this.smsusefor
      })
      this.countDown = 60
      const interval = setInterval(() => {
        if (this.countDown < 1) {
          clearInterval(interval)
        } else {
          this.countDown--
        }
      }, 1000)
    } catch (err) {
      console.log(err)
    } finally {
      this.sending = false
    }
  }
  @Watch('value', { immediate: true })
  private onValueChange(nValue: any) {
    this.currentValue = nValue
  }
}
</script>
<style lang="scss" scoped>
.input-container {
  height: 40px;
  background-color: white;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  input {
    flex: 1;
    font-size: 15px;
    height: 48px;
    width: 100%;
    border: none;
  }
  .get-code {
    font-size: 14px;
    color: #254cf4;
    padding: 0;
    border: none;
    background: transparent;
  }
}
</style>
