<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- pc端头部图标 -->
    <div class="hidden pt-5 h-8 xl:block">
      <!-- 图片地址 -->
      <img
        class="m-auto"
        src="https://res.lgdsunday.club/signlogo.png"
        alt=""
      />
    </div>
    <!-- 移动端头部图标 -->
    <div class="h-[111px] xl:hidden">
      <img
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
      />
      <img
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block py-4 px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        账号登录
      </h3>
      <!-- 登录表单 -->
      <VeeForm @submit="onLoginHandler">
        <VeeField
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-0 w-full border-b outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:default:bg-zinc-900"
          name="username"
          placeholder="请输入用户名"
          autocomplete="on"
          :rules="validateUserName"
        />
        <error-message
          class="text-sm text-red-600 block text-left"
          name="username"
        />
        <VeeField
          type="password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-0 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:default:bg-zinc-900"
          name="password"
          placeholder="请输入密码"
          autocomplete="on"
          :rules="validatePassword"
        />
        <error-message
          class="text-sm text-red-600 block text-left"
          name="password"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            href=""
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >去注册</a
          >
        </div>
        <!-- 登录 -->
        <i-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">
          登录
        </i-button>
        <!-- 第三方登录按钮 -->
        <div class="flex justify-around mt-4">
          <!-- QQ -->
          <svg-icon name="qq" class="w-4 cursor-pointer"></svg-icon>
          <!-- wechat -->
          <svg-icon name="wexin" class="w-4 cursor-pointer"></svg-icon>
        </div>
      </VeeForm>
    </div>
    <SliderCaptcha @onSuccess="onSuccess" @onClose="onClose" v-if="isShow" />
  </div>
</template>

<script setup>
import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate'
import { validateUserName, validatePassword } from './utils/valid'
import SliderCaptcha from './components/slider-captcha/index.vue'
import { message } from '@/libs/i-message/index'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isShow = ref(false)
// 登录
const onLoginHandler = () => {
  isShow.value = true
}
const onSuccess = () => {
  isShow.value = false
  router.push('/')
  message('success', '登录成功')
}
const onClose = () => {
  isShow.value = false
}
</script>
<style scoped></style>
