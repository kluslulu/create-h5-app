<template>
  <div class="logist-container">
    <ul v-if="list.length" class="list-box">
      <li class="title">
        <span>发货时间</span>
        <span>物流状态</span>
        <span>承运商</span>
        <span>运单编号</span>
      </li>
      <li v-for="item in list" :key="item.tracking_no" class="body">
        <span>{{ item.delivery_time }}</span>
        <span>{{ item.delivery_status }}</span>
        <span>{{ item.logistics_company }}</span>
        <span class="link" @click="goLogitDetail(item)">{{ item.tracking_no }}</span>
      </li>
    </ul>
    <p v-else class="empty">
      <van-icon name="shopping-cart-o" class="empty-icon" />
      <br />暂时还没有发货记录
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/user'
import { getLogistList } from '@/api'

@Component({
  name: 'LogistList',
  components: {}
})
export default class extends Vue {
  private list: any[] = []

  private created() {
    this.getList()
  }
  private async getList() {
    const data: any = await getLogistList()
    this.list = data || []
  }
  private goLogitDetail(data: any) {
    UserModule.setTempDeliver({
      ...data
    })
    this.$router.push({ path: 'logisDetail' })
  }
}
</script>

<style lang="scss" scoped>
.logist-container {
  padding: 10px;
}
.list-box {
  li {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    span {
      flex: 1;
      text-align: center;
      align-items: center;
      line-height: 1.5;
      &:last-child {
        text-align: right;
      }
      &:first-child {
        width: 80px;
      }
      &:nth-child(2) {
        max-width: 80px;
      }
      &.link {
        color: #0099cc;
      }
    }
    &.title {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.8);
      line-height: 1.2;
      margin-top: 0;
      border: none;
      span {
        flex: 1;
        text-align: center;
      }
    }
    &.body {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.empty {
  color: rgba(0, 0, 0, 0.5);
  margin-top: 40px;
  .empty-icon {
    font-size: 30px;
  }
}
</style>
