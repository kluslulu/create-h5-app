<template>
  <div class="shop-container">
    <div v-if="cities.length" class="header-box">
      <van-dropdown-menu>
        <van-dropdown-item v-model="currentCity" :options="cities" />
      </van-dropdown-menu>
    </div>
    <div v-if="!shops.length && loading" class="shop-list">
      <van-skeleton v-for="item in [0,1,2,3,4,5,6]" :key="item" class="skeleton-item" :row="3" />
    </div>
    <div v-if="shops.length" class="shop-list">
      <SpShop v-for="item in shops" :key="item.title" :data="item" />
    </div>
    <div v-else class="shop-empty">暂时还没有直营店</div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { SpShop } from '@/components'
import { cityList, shopList } from '@/api'

@Component({
  name: 'ShopList',
  components: {
    SpShop
  }
})
export default class extends Vue {
  private showArea: boolean = false
  // 0 列表 1 地图
  private showType: number = 0
  private currentCity: number = 1
  private cities: any[] = []
  private shops: any[] = []
  private loading: boolean = true
  private async created() {
    try {
      const res: any = await Promise.all([
        cityList(),
        shopList(this.currentCity)
      ])
      this.cities = res[0] || []
      this.shops = res[1].data || []
    } catch (e) {
      console.log(e)
    }
    this.loading = false
  }

  private handleCityModal() {
    this.showArea = !this.showArea
  }
  @Watch('currentCity')
  private handler(nv: number, ov: number) {
    this.shops = []
    this.loading = true
    shopList(nv)
      .then((data: any) => {
        this.shops = data.data || []
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss" scoped>
.shop-container {
  height: calc(100vh - 44px);
  overflow: hidden;
  background: #f4f4f4;
}
.header-box {
  border-top: 2px solid #f4f4f4;
  height: 44px;
}
.skeleton-item {
  background: #ffffff;
  padding: 24px;
}
.shop-list {
  height: calc(100vh - 88px);
  overflow: auto;
}
.shop-empty {
  color: #333;
  height: 40vh;
  line-height: 40vh;
}
</style>
