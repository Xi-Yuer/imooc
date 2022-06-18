import { createRouter,createWebHistory } from 'vue-router'

import { isMobileTerminal } from '@/utils/isMobileTerminal'

import mobileRoutes from './modules/mobile'
import pcRoutes from './modules/pc'

const router = createRouter({
  history: createWebHistory(),
  // 路由表根据处于移动端还是pc端划分
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes,
})

export default router
