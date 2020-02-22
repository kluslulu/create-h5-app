<template>
  <div id="app">
    <sp-header v-if="!$route.meta.noHeader" :title="$route.meta.title" />
    <van-tabbar v-show="$route.meta.showFooter===true" route>
      <van-tabbar-item replace :to="{ path: '/', query: $route.query }">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? homeIcon.active : homeIcon.inactive"
        />
      </van-tabbar-item>
      <van-tabbar-item replace :to="{ path: '/user', query: $route.query }">
        <span>会员中心</span>
        <img slot="icon" slot-scope="props" :src="props.active ? vipIcon.active : vipIcon.inactive" />
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { SpHeader } from '@/components'
import { UserModule } from '@/store/user'

@Component({
  name: 'App',
  components: {
    SpHeader
  }
})
export default class extends Vue {
  private active: number = 0
  private homeIcon = {
    active: require('./assets/home-active.png'),
    inactive: require('./assets/home.png')
  }
  private vipIcon = {
    active: require('./assets/vip-active.png'),
    inactive: require('./assets/vip.png')
  }
  private created() {
    this.geoLocation()
    // UserModule.tasterInfo()
  }

  private async geoLocation() {
    await UserModule.geoLocation()
  }
}
</script>

<style lang="scss">
@import './styles/variables.scss';
@import '//at.alicdn.com/t/font_1540878_qc8kahash3b.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.color {
  color: $menuActiveText;
}
.submit {
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  background-color: #ffe62f;
  height: 40px;
  border: none;
  width: 100%;
  border-radius: 20px;
}
.sp-content {
  text-align: left;
  font-weight: 400;
  opacity: 0.6;
  font-family: 'PingFangSC-Light';
  font-size: 16px;
  color: #000;
  letter-spacing: -0.04px;
  line-height: 24px;
  height: 230px;
  overflow: auto;
}
.agree-box .van-checkbox {
  align-items: flex-start;
}
</style>
