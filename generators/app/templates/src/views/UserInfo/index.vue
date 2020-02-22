<template>
  <div class="page-container">
    <sp-header title="完善个人信息" />
    <div class="form-container">
      <div class="form-item">
        <label>
          <i>*</i>身份证正面
        </label>
        <SpUpload :show-ocr="true" @success="uploadSuccess1" @ocrChange="handleOCR" />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>身份证反面
        </label>
        <SpUpload @success="uploadSuccess2" />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>手持身份证
        </label>
        <SpUpload @success="uploadSuccess3" />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>性别
        </label>
        <sp-input
          v-model="genderListDict[form.gender]"
          class="form-input"
          icon-class="circle"
          placeholder="请选择性别"
          readonly
          @click="genderVisible = tasterData !== 2"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>职业
        </label>
        <sp-input
          v-model="form.job"
          class="form-input"
          icon="package"
          icon-class="circle"
          placeholder="请选择职业"
          readonly
          @click="jobVisible = tasterData !== 2"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>身份证
        </label>
        <sp-input
          v-model="form.identity_number"
          class="form-input"
          icon-class="circle"
          placeholder="请填写身份证号"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>微信号
        </label>
        <sp-input
          v-model="form.wechat"
          class="form-input"
          icon-class="circle"
          placeholder="请填写微信号"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>姓名
        </label>
        <sp-input
          v-model="form.receiver"
          class="form-input"
          icon-class="circle"
          placeholder="请填写收货人姓名"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>手机号
        </label>
        <sp-input
          v-model="form.phone_receiver"
          class="form-input"
          icon="package"
          icon-class="circle"
          placeholder="请填写收货人手机号"
        />
      </div>
      <div class="form-item">
        <label>
          <i>*</i>所在地区
        </label>
        <SpArea :value.sync="areaData" />
      </div>
      <div class="form-item" style="align-items: flex-start">
        <label>
          <i>*</i>收货地址
        </label>
        <van-field
          v-model="form.address"
          class="form-input form-textarea"
          rows="2"
          autosize
          type="textarea"
          placeholder="请填写详细收货地址"
        />
      </div>
      <van-button class="submit" :loading="loading" loading-text="提交" @click="onSubmit">提交</van-button>
    </div>
    <van-action-sheet v-model="genderVisible" :actions="genderList" @select="onGenSelect" />
    <van-action-sheet v-model="jobVisible" :actions="jobList" @select="onJobSelect" />
    <van-popup v-model="areaVisible" position="bottom" safe-area-inset-bottom>
      <van-area
        :area-list="areaList"
        title="选择收货地址"
        @cancel="areaVisible = false"
        @confirm="handleArea"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { SpInput, SpHeader, SpUpload, SpArea } from '@/components'
import { UserModule } from '@/store/user'
import { setTasterInfo } from '@/api'
import areaList from '@/utils/area'

interface ISelect {
  name: string
  value: number
}
@Component({
  name: 'UserInfo',
  components: {
    SpInput,
    SpHeader,
    SpUpload,
    SpArea
  }
})
export default class extends Vue {
  private areaList: any = areaList
  private form: any = {
    gender: '',
    identity_number: '',
    wechat: '',
    job: '',
    address: '',
    receiver: '',
    phone_receiver: '',
    card_front: '',
    card_back: '',
    holding_card: ''
  }
  private errTips: any = {
    gender: '请选择性别',
    identity_number: '请填写身份证号',
    wechat: '请填写微信号',
    job: '请选择职业',
    area_id: '请选择城市',
    address: '请填写详细地址',
    receiver: '请填写收货人姓名',
    phone_receiver: '请填写收货人手机号',
    card_front: '请上传身份证正面',
    card_back: '请上传身份证反面',
    holding_card: '请上传手持身份证'
  }
  private areaData: any = {
    provinceid: '',
    cityid: '',
    areaid: ''
  }
  private areaVisible: boolean = false
  private jobVisible: boolean = false
  private genderVisible: boolean = false
  private loading: boolean = false
  private genderList: Array<object> = [
    { name: '男', value: 1 },
    { name: '女', value: 2 },
    { name: '其他', value: 3 }
  ]
  private genderListDict = this.genderList.reduce((a: any, b: any) => {
    a[b.value] = b.name
    return a
  }, {})
  private jobList: Array<object> = [
    { name: '在校学生', value: 1 },
    { name: '政府/机关干部/公务员', value: 2 },
    { name: '企业管理者(包括基层及中高层管理者)', value: 3 },
    { name: '普通职员(办公室/写字楼工作人员)', value: 4 },
    { name: '商业服务业职工(销售人员/商店职员/服务员等)', value: 5 },
    { name: '个体经营者/承包商', value: 6 },
    { name: '自由职业者', value: 7 },
    { name: '其他', value: 7 }
  ]

  get tasterData() {
    return UserModule.tasterData
  }
  private uploadSuccess1(filename: string) {
    this.form.card_front = filename
  }
  private uploadSuccess2(filename: string) {
    this.form.card_back = filename
  }
  private uploadSuccess3(filename: string) {
    this.form.holding_card = filename
  }
  private handleOCR(data: any) {
    !this.form.identity_number && (this.form.identity_number = data)
  }
  private goback() {
    try {
      this.$router.replace({ path: '/login', query: this.$route.query })
    } catch (e) {
      console.log(e)
    }
  }
  private validatePhone() {
    return !/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(
      this.form.phone_receiver
    )
  }
  private validateCard() {
    return /[0-9]{17}[\s\S]{1}/.test(this.form.identity_number)
  }
  private handleArea(data: any) {
    this.areaVisible = false
    if (data) {
      this.form.city = ''
      data.forEach((item: any) => {
        this.form.city = this.form.city + item.name
      })
    }
  }
  private async onSubmit() {
    let tip: string = '请完善个人信息'
    this.form.area_id = this.areaData.areaid
    const valid: boolean = Object.keys(this.form).every((item: string) => {
      if (this.form[item]) {
        return true
      } else {
        tip = this.errTips[item]
        return false
      }
    })
    if (!valid) {
      this.$toast(tip)
    } else if (this.validatePhone()) {
      this.$toast('手机号格式不正确')
    } else if (!this.validateCard()) {
      this.$toast('身份证格式不正确')
    } else {
      await setTasterInfo({ ...this.form })
      this.$toast.success('信息提交成功！')
      await UserModule.tasterInfo()
      this.$router.push({ path: '/' })
    }
  }
  private onGenSelect(item: ISelect) {
    this.form.gender = item.value
    this.genderVisible = false
  }
  private onJobSelect(item: ISelect) {
    this.form.job = item.name
    this.jobVisible = false
  }

  @Watch('tasterData', { immediate: true, deep: true })
  private handler(nv: any, ov: any) {
    if (nv.status === 2) {
      this.form = {
        gender: nv.gender,
        identity_number: nv.identity_number,
        wechat: nv.wechat,
        job: nv.job,
        address: nv.address,
        receiver: nv.receiver,
        phone_receiver: nv.phone_receiver,
        card_front: nv.card_front,
        card_back: nv.card_back,
        holding_card: nv.holding_card
      }
      this.areaData = {
        provinceid: nv.province_id,
        cityid: nv.city_id,
        areaid: nv.area_id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  padding: 10px 16px 20px;
}
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px 0;
  font-size: 15px;
  i {
    color: red;
  }
  .form-input {
    flex: 1;
    margin-bottom: 0 !important;
    margin-left: 10px;
    &.form-textarea {
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
    }
  }
}
.submit {
  margin-top: 20px;
  width: 315px;
  background-color: #ffe62f;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  margin-left: 0;
}
</style>
