<template>
  <div class="page-container">
    <van-swipe :autoplay="3000" indicator-color="white" class="banner">
      <van-swipe-item>
        <!-- <a :href="activeUrl"> -->
        <!-- <a href> -->
        <img src="./assets/banner2.jpg" alt />
        <!-- </a> -->
      </van-swipe-item>
    </van-swipe>
    <div class="container">
      <div v-if="tasterStatus === -1" class="code-box">
        <div class="code-text">兑换码</div>
        <van-field v-model="conCode" class="code-input" placeholder="请输入您的兑换码" />
        <button class="submit" :disabled="sending" @click="handleConfirm">确定</button>
      </div>
      <div v-if="tasterStatus === 0 || tasterStatus === 2" class="info-box">
        <button class="submit" @click="goInfo">完善个人信息</button>
      </div>
      <div
        v-if="(tasterStatus === 1 || tasterStatus === 3) && !latestDelivery"
        class="logis-box"
        style="color: #969799"
      >暂时没有发货记录</div>
      <div v-if="latestDelivery.delivery_time" class="logis-box">
        <div class="logis-date">{{ latestDelivery.delivery_time }}</div>
        <div class="logis-sended">{{ latestDelivery.delivery_status }}</div>
        <div class="logis-name">{{ latestDelivery.logistics_company }}</div>
        <button class="submit" @click="goLositDetail()">查看详情</button>
      </div>
      <a class="near-shop" href="http://shop.snowplus.cn?channel=vip">
        <img src="@/assets/nearshop.png" alt />
      </a>
      <div class="list-title">
        <span>兑换商品</span>
      </div>
      <div class="goods">
        <div class="item" @click="onExchange">
          <img :src="pic1" alt />
          <i>即将上线</i>
        </div>
        <div class="item" @click="onExchange">
          <img :src="pic2" alt />
          <i>即将上线</i>
        </div>
        <div class="item" @click="onExchange">
          <img :src="pic3" alt />
          <i>即将上线</i>
        </div>
        <div class="item" @click="onExchange">
          <img :src="pic4" alt />
          <i>即将上线</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/user'
import { SpInput } from '@/components'
import { exchange } from '@/api'

@Component({
  name: 'Home',
  components: {
    SpInput
  }
})
export default class extends Vue {
  private conCode: string = ''
  private sending: boolean = false
  private pic1: string = require('./assets/pic1.jpg')
  private pic2: string = require('./assets/pic2.jpg')
  private pic3: string = require('./assets/pic3.jpg')
  private pic4: string = require('./assets/pic4.jpg')

  private activeUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://activity.snowplus.cn/christmas/#/christmas'
      : 'https://testactivity.snowplus.cn/christmas/#/christmas'

  async created() {}

  get tasterStatus() {
    return UserModule.tasterStatus
  }
  get latestDelivery() {
    return UserModule.latestDelivery
  }
  private async handleConfirm() {
    await exchange(this.conCode)
    this.$toast.success('兑换成功!')
    const infoData: any = await UserModule.tasterInfo()
    if (UserModule.tasterStatus === 0 || UserModule.tasterStatus === 2) {
      this.$router.push({ path: '/userInfo', query: this.$route.query })
    }
  }
  private goInfo() {
    this.$router.push({ path: '/userInfo', query: this.$route.query })
  }
  private goLositDetail() {
    UserModule.setTempDeliver({
      ...this.latestDelivery
    })
    this.$router.push({ path: 'logisDetail' })
  }
  private onExchange() {
    // window.location.href = this.activeUrl
    this.$toast('即将上线')
  }
  @Watch('tasterStatus', { immediate: true })
  private handler(nv: number, ov: number) {
    if (nv === 2) {
      this.$dialog
        .confirm({
          message: '您的信息已被驳回，请重新完善信息!'
        })
        .then(() => {
          this.$router.push({ path: '/userInfo', query: this.$route.query })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #f6f6f6;
  padding-bottom: 40px;
}

.banner {
  height: 220px;
  img {
    max-width: 100%;
    // max-height: 100%;
    object-fit: contain;
  }
}

.container {
  padding: 15px;
  text-align: left;
}
.logis-box,
.code-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  padding: 13px 15px;
  .submit {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 600;
  }
}
.logis-box {
  font-size: 14px;
  .logis-date {
    flex: 3;
  }
  .logis-sended {
    flex: 2;
  }
  .logis-name {
    width: 60px;
  }
  .submit {
    margin-left: 10px;
    width: 90px;
  }
}
.code-box {
  .code-text {
    font-size: 14px;
    flex: 1;
  }
  .code-input {
    flex: 3;
    height: 35px;
    border: 2px solid #ccc;
    border-radius: 20px;
    padding: 5px 15px !important;
    margin: 0 10px;
  }
  .submit {
    width: 70px;
  }
}

.near-shop {
  display: block;
  height: 70px;
  margin: 15px 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.list-title {
  position: relative;
  margin: 0;
  display: inline-block;
  line-height: 1;
  span {
    position: relative;
    z-index: 2;
  }
  &:after {
    position: absolute;
    display: block;
    content: ' ';
    height: 7px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #92aeff;
    z-index: 1;
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  .item {
    position: relative;
    width: 165px;
    height: 165px;
    // background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    &:nth-child(2n) {
      margin-left: 15px;
    }
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
    i {
      position: absolute;
      color: white;
      bottom: 10px;
      right: 10px;
      font-size: 12px;
    }
  }
}
</style>
