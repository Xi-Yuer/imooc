import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from '@/router'
import mLibs from '@/libs'
import iDrectives from '@/drectives'
import './styles/index.scss'
import 'virtual:svg-icons-register' // 注册 svg-icon (虚拟注册)

const pinia = createPinia()
pinia.use(piniaPersist)

import { useRem } from '@/utils/isMobileTerminal'
import ThemeFn from '@/utils/theme/index'
useRem() // html的font-size
ThemeFn() // 主题
createApp(App)
  .use(pinia)
  .use(iDrectives)
  .use(router)
  .use(mLibs)
  .mount('#app')
