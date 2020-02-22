const NODE_ENV = process.env.NODE_ENV
const baseAPI: any = {
    production: 'https://vip.snowplus.cn/api/v1/',
    dev: 'https://testvip.snowplus.cn/api/v1/',
    development: '/api/v1',
    local: '/api/v1'
}
export const baseURL = baseAPI[NODE_ENV || 'local']
