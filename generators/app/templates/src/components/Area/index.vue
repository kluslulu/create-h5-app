<template>
  <div class="area-container">
    <div class="area-item">
      <select
        v-model="data.provinceid"
        class="addr-item"
        placeholder="省/直辖市"
        filterable
        :disabled="disabled"
        @change="handleProvince"
      >
        <option value disabled selected>省/直辖市</option>
        <option
          v-for="item in provinces"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >{{ item.name }}</option>
      </select>
    </div>
    <div v-if="cities.length" class="area-item">
      <select
        v-model="data.cityid"
        class="addr-item"
        placeholder="市"
        :disabled="disabled"
        filterable
        @change="handleCity"
      >
        <option value disabled selected>市</option>
        <option
          v-for="item in cities"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >{{ item.name }}</option>
      </select>
    </div>
    <div v-if="areas.length" class="area-item">
      <select
        v-model="data.areaid"
        class="addr-item"
        placeholder="区"
        filterable
        :disabled="disabled"
        @change="handleArea"
      >
        <option value disabled selected>区</option>
        <option
          v-for="item in areas"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >{{ item.name }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getProvince, getCities, getAreas } from '@/api'

interface IAddress {
  name: string
  id: number
}
interface IAreaData {
  provinceid: string
  cityid: string
  areaid: string
}
@Component({
  name: 'SpArea',
  components: {}
})
export default class extends Vue {
  @Prop() private value!: IAreaData
  @Prop({ default: false }) private disabled?: boolean

  // data
  private provinces: IAddress[] = []
  private cities: IAddress[] = []
  private areas: IAddress[] = []
  private data: IAreaData = { provinceid: '', cityid: '', areaid: '' }

  private created() {
    this.initData()
  }

  private initData() {
    this.data = { ...this.value }
    this.loadData()
  }

  private async loadData() {
    const { provinceid, cityid } = this.data
    try {
      const provinces: any = await getProvince()
      this.provinces = provinces || []
    } catch (e) {
      console.log('load province error')
    }
    if (provinceid) {
      this.loadCities(Number(provinceid))
    }
    if (cityid) {
      this.loadAreas(Number(cityid))
    }
  }

  private async loadCities(pid: number) {
    const cities: any = await getCities(pid)
    this.cities = cities || []
  }

  private async loadAreas(cid: number) {
    const areas: any = await getAreas(cid)
    this.areas = areas
  }

  private handleProvince(e: any) {
    this.loadCities(e.target.value)
    this.data.cityid = ''
    this.data.areaid = ''
  }

  private handleCity(e: any) {
    this.loadAreas(e.target.value)
    this.data.areaid = ''
  }

  private handleArea(e: any) {
    // data.areaid = String(e.target.value)
  }

  @Watch('data', { immediate: true, deep: true })
  private handler1(nv: IAreaData, ov: IAreaData) {
    this.$emit('update:value', { ...nv })
  }

  @Watch('value', { deep: true })
  private handler2(nv: IAreaData, ov: IAreaData) {
    if (nv.provinceid !== ov.provinceid) {
      this.initData()
      this.$emit('update:value', { ...nv })
    }
  }
}
</script>

<style lang="scss" scoped>
.area-container {
  width: 77%;
  display: flex;
}
.addr-item {
  margin-right: 10px;
}
.area-item {
  position: relative;
  flex: 1;
  height: 40px;
  box-shadow: 0 1.067vw 2.667vw 0 rgba(0, 0, 0, 0.05);
  margin: 0 2px;
  &::after {
    content: '';
    width: 14px;
    height: 10px;
    background: url('./assets/arrow.png') no-repeat;
    background-size: contain;
    position: absolute;
    right: 3px;
    top: 15px;
    pointer-events: none;
  }
}
select {
  width: 100%;
  padding: 0 2px 0 10px;
  font-size: 14px;
  height: 40px;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
