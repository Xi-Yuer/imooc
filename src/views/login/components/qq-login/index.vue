<!--  -->
<template>
  <div>
    <span id="QQLogin" v-show="false"></span>
    <svg-icon
      class="w-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></svg-icon>
  </div>
</template>

<script setup>
import { message } from '@/libs/i-message';
import { onMounted } from 'vue'

const QQ_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'

onMounted(() => {
  QC.Login(
    {
      bynId: 'QQLogin',
    },
    // 登录成功的回调会在登录回调页面中被执行
    // qq登录存在缓存，所以需要判断是否已经登录过
    (data, options) => {
      console.log(data, options)
      //   注销登录，防止下次打开页面是展示上一次用户信息
      QC.Login.signOut()
    message('success', 'QQ授权成功') 
    }
  )
})

const onQQLogin = () => {
  openQQWindow()
}

const openQQWindow = () => {
  window.open(
    QQ_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
}
</script>
<style scoped></style>
