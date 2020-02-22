<template>
  <div class="page-container">
    <div class="header">
      <router-link
        v-if="!hasLogin"
        class="item-box login"
        :to="{ path: '/login', query: $route.query }"
      >
        <div class="circle"></div>
        <span>注册/登录</span>
      </router-link>
    </div>
    <a class="near-shop" href="http://shop.snowplus.cn?channel=vip">
      <img src="@/assets/nearshop.png" alt />
    </a>
    <router-link to="/contact" class="list-item">
      <img src="./assets/listen.png" alt />
      <span>加雪姐一起嗨</span>
      <i class="iconfont iconright-arrow"></i>
    </router-link>
    <router-link :to="{ path: '/logists', query: $route.query }" class="list-item">
      <img src="./assets/file.png" alt />
      <span>发货记录</span>
      <i class="iconfont iconright-arrow"></i>
    </router-link>
    <van-button
      v-if="hasLogin"
      class="submit"
      loading-text="确定"
      :loading="loading"
      @click="logout"
    >退出登录</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/user'
import { logout } from '@/api'
@Component({
  name: 'User',
  components: {}
})
export default class extends Vue {
  private loading: boolean = false

  async logout() {
    try {
      this.loading = true
      await UserModule.logout()
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  }
  get hasLogin() {
    return UserModule.hasLogin
  }
  async created() {}
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  padding-bottom: 70px;
  background-color: #f6f6f6;
}

.header {
  height: 150px;
  background-image: url('./assets/bg.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .item-box {
    &.login {
      .circle {
        background-image: url('./assets/snowplus.png');
      }
    }
    &:last-child:not(:first-child) {
      margin-left: 75px;
    }
  }
  .circle {
    width: 70px;
    height: 70px;
    background: linear-gradient(to top, #ffcb00, #fff6b7);
    background-size: cover;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    i {
      font-size: 18px;
    }
  }
  span {
    display: inline-block;
    font-size: 14px;
    color: white;
    margin-top: 15px;
  }
}

.near-shop {
  display: block;
  height: 76px;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}

.list-item {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  img {
    width: 35px;
    height: 35px;
    margin-right: 16px;
  }
  span {
    flex: 1;
    text-align: left;
  }
  i {
    opacity: 0.3;
    font-size: 12px;
  }
}

.submit {
  border-radius: 18px;
  margin-top: 50px;
  width: 120px;
  background-color: #eeeeee;
  border: none;
  height: 37px;
  line-height: 37px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
