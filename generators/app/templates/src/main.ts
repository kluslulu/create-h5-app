import Vue from 'vue'
import {
  Tabbar, TabbarItem, Dialog, Button,
  Popup, DatetimePicker, Swipe, SwipeItem, Area, Steps, Step,
  ActionSheet, Toast, Checkbox, Tabs, Tab, Icon, Field,
  DropdownMenu, DropdownItem, Search, Skeleton, Uploader, Overlay, Loading
} from 'vant'

import '@/styles/global.scss'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Popup)
  .use(DatetimePicker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Area)
  .use(ActionSheet)
  .use(Toast)
  .use(Checkbox)
  .use(Tabs)
  .use(Tab)
  .use(Dialog)
  .use(Icon)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Search)
  .use(Skeleton)
  .use(Field)
  .use(Uploader)
  .use(Steps)
  .use(Step)
  .use(Overlay)
  .use(Loading)

// require('../mock/mock.ts')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
