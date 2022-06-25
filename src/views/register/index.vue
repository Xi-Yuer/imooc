<!--  -->
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
        账号注册
      </h3>
      <!-- 登录表单 -->
      <VeeForm @submit="onRegisterHandler">
        <VeeField
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-0 w-full border-b outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:default:bg-zinc-900"
          name="username"
          placeholder="请输入用户名"
          autocomplete="on"
          :rules="validateUserName"
          v-model="username"
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
          v-model="password"
        />
        <VeeField
          type="password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-0 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-zinc-200 xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:default:bg-zinc-900"
          name="confirmPassword"
          placeholder="确定密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="confirmPassword"
        />
        <error-message
          class="text-sm text-red-600 block text-left"
          name="confirmPassword"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <span
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            @click="onToLoginHandler"
          >
            去登录
          </span>
        </div>
        <!-- 注册协议 -->
        <div class="text-center">
          <a
            href="https://m.imooc.com/newfaq?id=89"
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
            target="_blank"
            >注册即同意《慕课网注册协议》</a
          >
        </div>
        <!-- 登录 -->
        <i-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">
          立即注册
        </i-button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
} from 'vee-validate'
import {
  validateUserName,
  validatePassword,
  validateConfirmPassword,
} from '../login/utils/valid'

import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from '@/libs/i-message'
const userStore = useUserStore()
const router = useRouter()

// 注册规则
defineRule('validateConfirmPassword', validateConfirmPassword)

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const onToLoginHandler = () => {
  router.push('/login')
}
const onRegisterHandler = () => {
  userStore.register(username.value, password.value)
}
</script>
<style scoped></style>
