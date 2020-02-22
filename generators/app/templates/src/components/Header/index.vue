<template>
  <header :class="color">
    <div class="oprate back" @click.stop="goBack">
      <i class="iconfont iconback" />
    </div>
    <span>{{ title }}</span>
    <div class="oprate home">
      <span v-if="showHome" @click="goHome">首页</span>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'SpHeader',
  components: {}
})
export default class extends Vue {
  @Prop() private title?: string
  @Prop() private color?: string
  @Prop() private showHome?: boolean
  @Prop({ default: true }) private back?: boolean

  private goBack() {
    if (this.back) {
      this.$router.back()
    } else {
      this.$emit('goBack')
    }
  }

  private goHome() {
    this.$router.push('/')
  }
}
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  font-size: 18px;
  padding: 0 10px;
  &.white {
    color: white;
    box-shadow: none;
    i {
      color: white;
    }
  }
  &.noshadow {
    box-shadow: none;
  }
  span {
    flex: 1;
  }
  .oprate {
    width: 50px;
    cursor: pointer;
    &.back {
      text-align: left;
    }
  }
  .home {
    font-size: 14px;
  }
}
</style>
