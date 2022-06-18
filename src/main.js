import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from '@/router'

import { useRem } from '@/utils/isMobileTerminal'
// html的font-size
useRem()

// 注册 svg-icon (虚拟注册)
import 'virtual:svg-icons-register'

import mLibs from '@/libs'

createApp(App).use(router).use(mLibs).mount('#app')
