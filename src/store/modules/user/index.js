import { defineStore } from 'pinia'
import md5 from 'md5'
import { message } from '@/libs/i-message/index'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      userInfo: null,
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userInfo'],
      },
    ],
  },
  getters: {
    getUser: state => state.user,
    getUserInfo: state => state.userInfo,
  },
  actions: {
    login({ username, password }) {
      // 获取token
      this.user = {
        token: 'eedb1a1e-6bfb-43b7-8ff1-d6b1f4f391e8',
      }
      this.userInfo = {
        qqOpenId: '',
        wxOpenId: '',
        nickname: '小慕同学4899',
        title: '',
        company: '',
        homePage: '',
        introduction: '',
        vipLevel: 0,
        regTime: '2022-05-10T07:05:16.809Z',
        avatar:
          'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png',
        outTradeNo: '',
        payResult: false,
        _id: '62b556721e406f5ab9add792',
        username: 'xiyuer',
        __v: 0,
      }
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      // 获取用户信息
      console.log('登录密码md5加密', md5(password))
      message('success', `登录成功, 欢迎回来 ${this.getUserInfo.nickname}`)
    },
    register({ username, password }) {
      message('success', '注册成功')
    },
    logout() {
      this.user = null
      this.userInfo = null
      window.localStorage.removeItem('user')
      location.reload()
      message('success', '登出成功')
    },
  },
})
