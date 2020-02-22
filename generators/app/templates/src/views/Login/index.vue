<template>
  <div :class="`page-container ${bound ? 'bound-box' : ''}`">
    <sp-header v-if="step === 2" title="登录" color="noshadow" :back="false" @goBack="goback()" />
    <img class="logo" src="@/assets/sp-logo.png" alt />
    <div v-if="step === 1" class="input-box">
      <sp-input v-model="phone" icon="phone" label="手机号" type="number" placeholder="请输入您的手机号" />
    </div>
    <div v-if="step === 2" class="input-box">
      <!-- 验证码输入框 -->
      <code-keyboard v-model="code" @focus="onFocus" @blur="onBlur"></code-keyboard>
    </div>
    <div v-if="step === 2 && isnew" class="agree-box">
      <van-checkbox v-model="agree">
        <div class="agree-text">
          <span>我已确认满十八周岁</span>
          <br />
          <span>天使保护计划：未成年人禁止使用本产品</span>
        </div>
      </van-checkbox>
    </div>
    <div class="btn-box">
      <van-button
        v-if="step === 1"
        class="submit"
        :loading="sending || loading"
        :disabled="sending"
        @click="nextStep"
      >下一步</van-button>
      <van-button
        v-if="step === 2"
        class="submit"
        :loading="sending || loading"
        :disabled="sending || countDown < timer"
        @click="sendCode"
      >{{ countDown &lt; timer ? `重新发送（${countDown &lt; 10 ? '0' + countDown : countDown}）s` : '获取验证码' }}</van-button>
    </div>
    <img class="bg1" src="@/assets/lbg1.png" alt />
    <img class="bg2" src="@/assets/lbg2.png" alt />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { SpInput, SpHeader, CodeKeyboard } from '@/components'
import { sendCode, loginByCode } from '@/api'
import { UserModule } from '@/store/user'

@Component({
  name: 'Login',
  components: {
    SpInput,
    SpHeader,
    CodeKeyboard
  }
})
export default class extends Vue {
  private phone: string = ''
  private step: number = 1
  private code: string = ''
  private isnew: boolean = false
  private agree: boolean = false
  private timer: number = 60
  private countDown: number = this.timer
  private sending: boolean = false
  private loading: boolean = false
  private bound: boolean = false
  private interval: any

  private goback() {
    this.step = 1
  }
  private onFocus() {
    this.bound = true
  }
  private onBlur() {
    this.bound = false
  }
  private async login() {
    try {
      if (!this.phone) {
        return this.$toast('请输入手机号')
      }
      if (!this.code) {
        return this.$toast('请输入验证码')
      }
      this.loading = true
      const { channel: source = 'ka' } = this.$route.query
      const { lat, lng } = UserModule.position
      const rlt = await UserModule.login({
        phone: this.phone,
        code: this.code,
        source,
        address: lat && lng ? `${lat},${lng}` : ''
      })
      await UserModule.tasterInfo()
      // const redirect: any = this.$route.query.redirect
      this.$router.replace({
        path: '/'
      })
      this.loading = false
    } catch (e) {
      this.code = ''
      this.loading = false
    }
  }
  private async nextStep() {
    // this.triggerFocus = true
    if (this.countDown < this.timer) {
      this.step = 2
    } else {
      this.sendCode()
    }
  }
  private async sendCode() {
    if (this.sending || this.countDown < this.timer) {
      return
    }
    try {
      if (!this.phone) {
        return this.$toast('请输入手机号')
      }
      if (
        !/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(
          this.phone
        )
      ) {
        return this.$toast('手机号格式不正确')
      }
      this.sending = true
      const rlt: any = await sendCode({
        phone: this.phone
      })
      this.isnew = rlt.isnew
      this.countDown = this.timer
      this.step = 2
      this.interval = setInterval(() => {
        if (this.countDown === this.timer) {
          this.sending = false
        }
        if (this.countDown < 1) {
          this.clearTimer()
        } else {
          this.countDown--
        }
      }, 1000)
    } catch (err) {
      this.sending = false
    }
  }
  private clearTimer() {
    clearInterval(this.interval)
    this.countDown = this.timer
  }
  private onInput(key: any) {
    this.code = (this.code + key).slice(0, 4)
  }
  private onDelete() {
    this.code = this.code.slice(0, this.code.length - 1)
  }
  @Watch('phone')
  private handler1(nv: any, ov: any) {
    this.code = ''
    this.sending = false
    this.clearTimer()
  }
  @Watch('code')
  private handler2(nv: any, ov: any) {
    if (nv.length === 4) {
      if (this.isnew && !this.agree) {
        this.$toast('请确认是否已满18周岁')
        return
      }
      this.login()
    }
  }
  @Watch('agree')
  private handler3(nv: boolean, ov: boolean) {
    if (this.code.length === 4 && (!this.isnew || nv)) {
      this.login()
    }
  }
}
</script>

<style lang="scss" scoped>
.bound-box {
  margin-top: -30px;
}
.page-container {
  position: relative;
  min-height: 100vh;
  .logo {
    width: 144px;
    height: 30px;
    margin: 50px 35px;
    margin-top: 80px;
    margin-bottom: 50px;
  }
  .bg1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 143px;
    z-index: 0;
  }
  .bg2 {
    position: absolute;
    width: 62px;
    top: 300px;
    left: 0;
    z-index: 0;
  }
}
.input-box {
  padding: 0 30px;
}
.btn-box {
  padding: 0 30px;
  margin-top: 30px;
  width: 100%;
  transition: 0.3s;
  a {
    display: inline-block;
    color: #254cf4;
    font-size: 12px;
    margin-top: 20px;
  }
}
.agree-box {
  display: flex;
  font-size: 12px;
  text-align: left;
  margin: 30px 40px;
  align-items: flex-start;
  z-index: 1;
  position: relative;
  .agree-radio {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  }
  .agree-text {
    span:first-child {
      color: #254cf4;
    }
    span:last-child {
      color: #ff4848;
    }
  }
}
</style>
