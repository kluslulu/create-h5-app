<template>
  <div class="upload-container">
    <van-uploader v-model="fileList" :after-read="afterRead" />
    <button>{{ src ? '重新上传' : '上传' }}</button>
    <van-overlay :show="overlay" @click="overlay = false">
      <van-loading class="loading-mask" type="spinner" />
    </van-overlay>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getOSS, OCR } from '@/api'
@Component({
  name: 'SpUpload',
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) showOcr?: boolean

  private preview: any = {}
  private src: string = ''
  private fileList: any[] = []
  private overlay: boolean = false

  private getSuffix(filename: string) {
    const pos: number = filename.lastIndexOf('.')
    let suffix: string = ''
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    return suffix
  }
  private randomString(len?: number) {
    const chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos: number = chars.length
    let pwd = ''
    len = len || 32
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }
  private async afterRead(e: any) {
    this.uploadImg(e)
    if (this.showOcr) {
      this.parseOCR(e)
    }
  }
  private async uploadImg(e: any) {
    this.overlay = true
    const file: File = e.file
    const suffix: string = this.getSuffix(e.file.name)
    const rlt: any = await getOSS()
    const filename: string = `${rlt.dir}${this.randomString(10)}${suffix}`
    let fd: any = new FormData()
    fd.append('key', filename)
    fd.append('policy', rlt.policy)
    fd.append('OSSAccessKeyId', rlt.accessid)
    fd.append('signature', rlt.signature)
    fd.append('file', file)
    fetch(rlt.host, {
      method: 'POST',
      mode: 'cors',
      body: fd
    })
      .then((res: any) => {
        this.src = e.content
        // this.$toast.success('图片上传成功')
        this.$emit('success', filename)
      })
      .catch((e: any) => {
        this.src = ''
        this.$toast.fail('图片上传失败， 请重试')
      })
      .finally(() => {
        this.overlay = false
      })
  }
  private parseOCR(e: any) {
    // this.overlay = true
    const file: any = e.file
    let fd: any = new FormData()
    fd.append('file', file)
    fetch('https://ocr.snowplus.cn/ocr', {
      method: 'POST',
      mode: 'cors',
      body: fd
    })
      .then((res: any) => {
        return res.json()
      })
      // OCR(fd)
      .then((json: any) => {
        // this.overlay = false
        this.$emit('ocrChange', json.id)
        // this.$toast.success('解析成功')
      })
      .catch((e: any) => {
        // this.overlay = false
        // this.$toast.fail('解析失败')
      })
  }
}
</script>
<style lang="scss" scoped>
.upload-container {
  display: inline-block;
  width: 120px;
  height: 30px;
  line-height: 30px;
  position: relative;
  font-weight: 600;
  button {
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: #ffe62f;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    margin-left: 40px;
  }
  img {
    position: absolute;
    width: 30px;
    height: 30px;
    object-fit: contain;
    left: 0px;
    top: 0;
  }
  .uploader {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
<style lang="scss">
.loading-mask {
  margin-top: 49vh;
  font-size: 20px;
}
.upload-container {
  .van-uploader {
    position: absolute;
    left: 30px;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .van-uploader__upload {
      width: 90px;
      height: 30px;
      margin: 0;
      border: none;
      background-color: transparent;
      .van-uploader__upload-icon {
        display: none;
      }
    }
    .van-uploader__preview {
      position: absolute;
      width: 50px;
      height: 30px;
      left: -55px;
      .van-uploader__preview-image {
        width: 100%;
        height: 100%;
      }
      .van-uploader__preview-delete {
        display: none;
      }
    }
  }
}
</style>
