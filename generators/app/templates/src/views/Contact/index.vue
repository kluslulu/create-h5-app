<template>
  <div class="page-container">
    <p class="tip">扫码添加微信号</p>
    <div class="qrcode">
      <img src="./assets/qrcode.jpg" alt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'Contact',
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 60px 0 0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tip {
  margin-bottom: 10px;
}
.qrcode {
  width: 185px;
  height: 185px;
  background-color: white;
  border-radius: 20px;
  background-color: rgb(244, 246, 248);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  border-radius: 1px;
  img {
    max-width: 100%;
  }
}
</style>
