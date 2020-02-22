<template>
  <div class="page-container">
    <sp-header title="兑换记录" show-home="true" />
    <ul class="list-box">
      <li class="title">
        <span>时间</span>
        <span>兑换商品</span>
        <span>数量</span>
        <span>消耗积分</span>
      </li>
      <li v-for="item in list" :key="item.id">
        <span>{{ item.time }}</span>
        <span>{{ item.prod }}</span>
        <span>{{ item.count }}</span>
        <span>{{ item.point }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { SpHeader } from '@/components'
import * as api from '@/api'

@Component({
  name: 'Orders',
  components: {
    SpHeader
  }
})
export default class extends Vue {
  private list = []
  async created() {
    try {
      const rlt = await api.getPrize()
      this.list = rlt
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  font-size: 14px;
}
.list-box{
  padding: 0 10px;
  li{
    display: flex;
    margin-bottom: 10px;
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    span{
      flex:1;
      text-align: left;
      &:last-child{
        text-align: right;
      }
      &:nth-child(3){
        max-width: 65px;
      }
      &:nth-child(4){
        max-width: 65px;
      }
    }
    &.title{
      font-size: 15px;
      color: rgba(0,0,0,0.3);
      line-height: 1.2;
      margin-top: 0;
      border: none;
    }
  }
}
</style>
