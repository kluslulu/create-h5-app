import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import * as api from '@/api'
import store from '@/store'

export interface IUserState {
  name: string
  hasLogin: boolean
  position: any
  isnew: boolean
  extra: any
  isWechat: boolean
  reqList: any[]
  latestDelivery: any
  tempDelivery: any
  tasterData: any
  tasterStatus: number
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public name = ''
  public hasLogin: boolean = false
  public isnew: boolean = false
  public extra: any = {
    coupon: 0,
    score: 0
  }
  public reqList: any[] = []
  public isWechat: boolean = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
  public position: any = {
    lat: '',
    lng: ''
  }
  public latestDelivery: any = {}
  public tempDelivery: any = {}
  public tasterData: any = {}
  // staus：-1: 还没兑换；0:未填写个人信息；1: 审核中，2: 已驳回，3: 已通过
  public tasterStatus: number = -2

  @Mutation
  public addReqList(item: any) {
    this.reqList.push(item)
  }
  @Mutation
  public setTempDeliver(item: any) {
    this.tempDelivery = item
  }
  @Mutation
  public clearReqList() {
    this.reqList.forEach((ele: any, idx: number) => {
      ele()
      delete this.reqList[idx]
    })
  }
  @Mutation
  private SET_STATUS(value: number) {
    this.tasterStatus = value
  }
  @Mutation
  private SET_LASTDIVERY(value: any) {
    this.latestDelivery = value
  }
  @Mutation
  private SET_TASTER_DATA(data: any) {
    this.tasterData = data
  }
  @Mutation
  private SET_HASLOGIN(value: boolean) {
    this.hasLogin = value
  }
  @Mutation
  private SET_ISNEW(value: boolean) {
    this.isnew = value
  }
  @Mutation
  private SET_EXTRA(value: any) {
    this.extra = value
  }

  @Mutation
  private SET_LOCATION(position: any) {
    this.position = position
  }

  @Action
  public async login(data: any) {
    const rlt: any = await api.loginOrRegis({ ...data })
    this.SET_ISNEW(rlt.isnew)
    this.SET_EXTRA(rlt.extra)

  }
  @Action
  public async logout() {
    const rlt: any = await api.logout()
    this.SET_HASLOGIN(false)
  }
  @Action
  public async tasterInfo() {
    try {
      const taster: any = await api.getTasterInfo()
      this.SET_HASLOGIN(true)
      this.SET_STATUS(taster.status)
      this.SET_LASTDIVERY(taster.latest_delivery || '')
      this.SET_TASTER_DATA(taster)
    } catch (err) {
      this.SET_HASLOGIN(false)
      this.SET_STATUS(-2)
      this.SET_LASTDIVERY('')
      this.SET_TASTER_DATA({})
    }
  }

  @Action
  public async geoLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      this.SET_LOCATION({ lat, lng })
    }, err => {
    }, {
        timeout: 5000
      })
  }
}

export const UserModule = getModule(User)
