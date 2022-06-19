import { nextTick, watch } from 'vue'
import { useThemeStore } from '@/store'

// 监听系统主题变更
let matchMedia
const watchThemeChange = () => {
  // 仅需一次初始化
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme('system')
  }
}
const changeTheme = val => {
  let themeClassName = ''
  switch (val) {
    case 'light':
      themeClassName = 'light'
      break
    case 'dark':
      themeClassName = 'dark'
      break
    case 'system':
        // 调用方法，监听系统主题变化
      watchThemeChange()
      themeClassName = matchMedia.mathches ? 'dark' : 'light'
      break
    default:
      'light'
  }
  document.querySelector('html').className = themeClassName
  window.localStorage.setItem('theme', themeClassName)
}
// 初始化主题
export default () => {
  nextTick(() => {
    watch(
      () => useThemeStore().getTheme,
      val => changeTheme(val),
      {
        immediate: true,
      }
    )
  })
}
