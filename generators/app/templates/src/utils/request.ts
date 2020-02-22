import axios from 'axios'
import { Toast } from 'vant'
import { UserModule } from '@/store/user'
import { baseURL } from './config'

console.log(baseURL)
const service = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true // send cookies when cross-domain requests
})
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    config.cancelToken = new axios.CancelToken((cancel: any) => {
      UserModule.addReqList(cancel)
    })
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response: any) => {
    const res: any = response.data
    return res
  },
  (error: any) => {
    const response: any = error.response
    const { status, data } = response
    const err = error.response && error.response.data && error.response.data.error
    if (err && err.code !== 11001) {
      Toast(err.prompt || err.message)
    }
    if (axios.isCancel(error)) {
      // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
      return new Promise(() => { })
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
