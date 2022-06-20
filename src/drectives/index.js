import lazy from './modules/lazyImg'
// 全局注册指令
export default {
  install(app) {
    app.directive('lazy', lazy)
  },
}
