import { createRouter, createWebHistory } from 'vue-router'

import { isMobileTerminal } from '@/utils/isMobileTerminal'

import mobileRoutes from './modules/mobile'
import pcRoutes from './modules/pc'

const router = createRouter({
  history: createWebHistory(),
  // 路由表根据处于移动端还是pc端划分
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes,
})

router.beforeEach((to, from) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')
  console.log(userInfo.userInfo)
  if (to.path === '/login') {
    if (userInfo.userInfo) {
      return '/'
    }
  }
  if (to.path !== '/login' && to.path !== '/register') {
    if (!userInfo.userInfo) {
      return '/login'
    }
  }
})

export default router
