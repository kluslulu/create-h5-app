import api from '@/utils/request'
import { UserModule } from '@/store/user'
import * as utils from '@/utils'

export const getNearbyshop = () => {
  return api.get('/home/nearbyshop')
    .then((data: any) => data.url)
}

export const sendCode = (data: any) => {
  return api.post('/member/sendcode', data)
}

export const loginByCode = (data: any) => {
  return api.post('/member/codelogin', data)
}

export const loginOrRegis = (data: any) => {
  return api.post('/member/regislogin', data)
}
// 签到
export const signin = () => {
  return api.get('/member/signin')
}

export const signup = (data: any) => {
  return api.post('/member/signup', data)
}

export const getPrize = () => {
  return api.get('/prize/logs')
    .then((data: any) => {
      return data.logs.map((item: any) => {
        return {
          ...item,
          point: item.point || '-',
          time: utils.parseTime(item.created_at, '{y}-{m}-{d}')
        }
      })
    })
}
export const updateMemberInfo = (data: any) => {
  return api.post('/member/improve', data)
}
// 获取品鉴官信息
export const getTasterInfo = () => {
  return api.get('taster/info')
    .then((data: any) => {
      const latestDelivery: any = data.latest_delivery || {}
      latestDelivery && latestDelivery.delivery_time && (latestDelivery.delivery_time = utils.parseTime(latestDelivery.delivery_time, '{y}-{m}-{d}'))
      return data
    })
}
// 完善品鉴官信息
export const setTasterInfo = (data: any) => {
  return api.put('taster/improve', data)
}
// 发货记录
export const getLogistList = () => {
  return api.get('taster/delivery/list')
    .then((data: any) => {
      return (data.data || []).map((item: any) => {
        return {
          ...item,
          delivery_time: utils.parseTime(item.delivery_time, '{y}-{m}-{d}')
        }
      })
    })
}
// 物流详情
export const getLogistDetail = (id: string) => {
  return api.get(`taster/logistics/detail?tracking_no=${id}`)
    .then((data: any) => {
      return (data.infos || []).map((item: any) => {
        return {
          ...item,
          time: utils.parseTime(item.time, '{y}-{m}-{d} {h}:{i}:{s}')
        }
      })
    })
}
// 兑换码兑换
export const exchange = (code: string) => {
  return api.post('taster/exchange', { code })
}
export const logout = () => {
  return api.get('member/logout')
}
// 获取商品详情
export const getMailDetail = (id: number) => {
  return api.get(`/mall/detail`)
}
// 门店城市列表
export const cityList = () => {
  return api.get('store/cities').then((data: any) => {
    return data.data.map((item: any) => {
      return {
        text: item.name,
        value: item.id
      }
    })
  })
}
// 门店列表
export const shopList = (id: number) => {
  const position: any = UserModule.position
  return api.get(`store/list?city_id=${id}&lat=${position.lat}&lng=${position.lng}`)
}
// 省市区
export const getProvince = () => {
  return api.get('options/province')
    .then((res: any) => {
      return res.data
    })
}
export const getCities = (pid: number) => {
  return api.get(`options/city?parent_id=${pid}`)
    .then((res: any) => {
      return res.data
    })
}
export const getAreas = (cid: number) => {
  return api.get(`options/area?parent_id=${cid}`)
    .then((res: any) => {
      return res.data
    })
}
// 获取oss
export const getOSS = () => {
  return api.get('internal/oss/policytoken?objecttype=img')
}
// 图片上传
export const ossUpload = (host: string, data: any) => {
  return api.post(host, data)
    .then((res) => {
      return res.data
    })
}
export const OCR = (data: FormData) => {
  return api.post('https://ocr.snowplus.cn/ocr', data)
}
