<template>
  <div class="steps-container">
    <div class="logis-info">
      <p>
        <!-- 物流状态：{{ tempDelivery.delivery_status }}
        <br />-->
        承运商：{{ tempDelivery.logistics_company }}
        <br />
        运单编号：{{ tempDelivery.tracking_no }}
      </p>
    </div>
    <van-steps class="logis-detail" direction="vertical" :active="100">
      <van-step v-for="(item, idx) in infos" :key="`${idx}-${item.time}`" class="detail-item">
        <div class="info-title">{{ item.process_info }}</div>
        <p class="info-time">{{ item.time }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/user'
import { getLogistDetail } from '@/api'

@Component({
  name: 'LogistDetail',
  components: {}
})
export default class extends Vue {
  private infos: any = []
  private created() {}
  get tempDelivery() {
    return UserModule.tempDelivery
  }
  private async loadData(no: string) {
    const data: any = await getLogistDetail(no)
    this.infos = data || []
  }
  @Watch('tempDelivery', { immediate: true })
  private handler(nv: any, ov: any) {
    this.loadData(nv.tracking_no)
  }
}
</script>

<style lang="scss" scoped>
.logis-info {
  padding: 10px;
  border-bottom: 10px solid #ebedf0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  p {
    text-align: left;
    display: inline-block;
  }
}
.logis-detail {
  padding: 30px 10px 10px 30px;
}
.detail-item:first-child {
  .info-title {
    color: #07c160;
  }
}
.info-title {
  text-align: left;
  font-size: 14px;
}
.info-time {
  text-align: left;
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
}
</style>
<style lang="scss">
.logis-detail {
  .van-step__circle {
    width: 10px;
    height: 10px;
  }
  .van-step__line {
    width: 2px;
    left: -16px;
  }
}
</style>
