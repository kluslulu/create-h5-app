import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { UserModule } from '@/store/user'
import Home from '@/views/Home/index.vue'
import * as utils from '@/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      showFooter: true,
      title: '首页',
      noHeader: true
    },
    component: Home
  },
  {
    path: '/shop',
    name: 'shop',
    meta: {
      showFooter: true,
      noHeader: true
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/Shop/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      showFooter: true,
      title: '会员中心',
      noHeader: true
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/User/index.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: '联系客服'
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/Contact/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      noHeader: true
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/Login/index.vue')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    meta: {
      title: '完善个人信息',
      noHeader: true
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/UserInfo/index.vue')
  },
  {
    path: '/logists',
    name: 'logists',
    meta: {
      title: '发货记录'
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/Logist/index.vue')
  },
  {
    path: '/logisDetail',
    name: 'logisDetail',
    meta: {
      title: '物流详情'
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/LogisDetail/index.vue')
  },
  {
    path: '/shoplist',
    name: 'shoplist',
    meta: {
      title: '门店列表'
    },
    component: () => import(/* webpackChunkName: "" */ '@/views/ShopList/index.vue')
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next) => {
  const whiteIdx: number = whiteList.indexOf(to.path)
  UserModule.clearReqList()
  try {
    if (whiteIdx === -1 && (!UserModule.hasLogin || UserModule.tasterStatus === -2)) {
      await UserModule.tasterInfo()
    }
    if (UserModule.hasLogin) {
      // if (UserModule.tasterStatus === 2 && to.path !== '/userInfo') {
      //   next({ path: '/userInfo', query: to.query })
      // } else {
      //   next()
      // }
      next()
    } else {
      if (whiteIdx !== -1) {
        next()
      } else {
        next({
          path: '/login',
          query: {
            ...to.query,
            redirect: to.path
          }
        })
      }
    }
    utils.setTitle(`品鉴官 - ${to.meta.title}`)
  } catch (err) {
    console.log(err)
  }
})
router.afterEach((to: any) => {
  window.scrollTo(0, 0)
})

export default router
