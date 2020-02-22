<template>
  <div class="shop-item">
    <div class="main-info">
      <h2 class="title">{{ data.name }}</h2>
      <span v-if="data.distance" class="distance">
        <van-icon name="location" size="18px" class="pin" />
        {{ parseDistance(data.distance) }}
      </span>
    </div>
    <div class="info">
      <p>营业时间：{{ data.hours }}</p>
      <p v-if="data.phones.length">
        联系电话：
        <a
          v-for="(phone, idx) in data.phones"
          :key="phone.title"
          :href="'tel:'+phone"
        >{{ phone }} {{ idx !== data.phones.length -1 ? ',' : '' }}</a>
      </p>
      <p>地址：{{ data.address }}</p>
    </div>
    <div class="button-box">
      <input type="text" :value="copyText" class="copyInput" />
      <button class="copy-button" @click="handleCopy">复制信息</button>
      <button class="navigate-button" @click="moveTo">导航到店</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { parseDistance } from '@/utils'
import { UserModule } from '@/store/user'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

@Component({
  name: 'SpShop',
  components: {}
})
export default class extends Vue {
  @Prop({ default: () => {} }) private data!: any

  private parseDistance: any = parseDistance
  // private copyText: string = ''
  get copyText() {
    const data: any = this.data
    const text: string = `推荐给你一家雪加线下店:
        ${data.name}
        营业时间: ${data.hours}
        ${data.phones.length ? '联系电话:' + data.phones.length : ''}
        地址: ${data.address}`
    return text
  }
  private created() {}
  private bdEncrypt(lng: number, lat: number) {
    let X_PI = (Math.PI * 3000.0) / 180.0
    let x = lng
    let y = lat
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
    const bdLng = z * Math.cos(theta) + 0.0065
    const bdLat = z * Math.sin(theta) + 0.006
    return {
      bdLat,
      bdLng
    }
  }
  private handleCopy() {
    const THIS: any = this
    // const data: any = this.data
    // this.copyText = `推荐给你一家雪加线下店:
    //       ${data.name}
    //       营业时间: ${data.hours}
    //       ${data.phones.length ? '联系电话:' + data.phones.length : ''}
    //       地址: ${data.address}`
    this.$copyText(this.copyText).then(
      e => {
        THIS.$toast('已复制店铺信息，去粘贴')
      },
      e => {
        THIS.$toast('复制失败')
      }
    )
  }
  private moveTo() {
    const THIS = this
    const { bdLat, bdLng } = this.bdEncrypt(
      this.data.longitude,
      this.data.latitude
    )
    const url: string = `http://api.map.baidu.com/marker?location=${bdLat},${bdLng}&title=${this.data.name}&content=${this.data.address}&output=html&src=雪加`
    window.location.href = url
    // if (UserModule.isWechat) {
    //   this.copyText = url
    //   this.$copyText(this.copyText).then(
    //     e => {
    //       THIS.$toast('已复制店铺地址，请到浏览器中打开')
    //     },
    //     e => {
    //       THIS.$toast('店铺地址复制失败')
    //     }
    //   )
    // } else {
    //   window.location.href = url
    // }
  }
}
</script>
<style lang="scss" scoped>
.shop-item {
  margin: 15px 0;
  background: #ffffff;
  border-radius: 4px;
  padding: 20px 15px 15px 20px;
  .main-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(216, 216, 216, 0.3);
    padding-bottom: 10px;
    margin-bottom: 10px;
    align-items: center;
    .title {
      line-height: 20px;
      font-size: 20px;
    }
    .distance {
      color: #ed7832;
      font-size: 12px;
      vertical-align: middle;
      min-width: 70px;
    }
    .pin {
      vertical-align: sub;
    }
  }

  .info {
    font-size: 16px;
    color: #666666;
    line-height: 18px;
    margin-bottom: 10px;
    text-align: left;
    p {
      margin-bottom: 5px;
    }
    a {
      color: #4182ff;
    }
  }
  .button-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 100px;
      height: 30px;
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      display: inline-block;
      margin-left: 10px;
      background: transparent;
    }
    .copyInput {
      position: fixed;
      z-index: -999;
      color: transparent;
      background: transparent;
      border: none;
    }
    .copy-button {
      border: 1px solid #979797;
      color: #999999;
    }
    .navigate-button {
      color: #ed7832;
      border: 1px solid #ed7832;
    }
  }
}
</style>
