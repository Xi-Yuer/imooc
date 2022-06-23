<!--  -->
<template>
  <div
    class="absolute top-[25%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-2xl"
  >
    <!-- 头部 -->
    <div
      class="w-full flex items-center justify-between h-5 text-left px-1 mb-1"
    >
      <span class="flex-grow dark:text-zinc-200">请完成完全验证</span>
      <SvgIcon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></SvgIcon>
      <SvgIcon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></SvgIcon>
    </div>
    <!-- 验证模块 -->
    <div id="captcha"></div>
  </div>
</template>

<script setup>
import SvgIcon from '@/libs/svg-icon/index.vue'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { onMounted } from 'vue'
import { message } from '../../../../libs/i-message'

const emit = defineEmits(['onSuccess', 'onClose', 'onReset'])

// 使用人类行为验证
// 1. 创建 captch 实例
let captcha = null

onMounted(() => {
  captcha = sliderCaptcha({
    //  渲染位置
    id: 'captcha',
    // 用户拼图成功后的回调函数
    onSuccess: function (validate) {
      emit('onSuccess')
    },
    // 用户拼图失败后的回调函数
    onFail: function () {
      message('error', '验证失败')
    },
    // 默认的验证方法
    verify: function () {
      return true
    },
  })
})
const onReset = () => {
  captcha.reset()
  emit('onReset')
}
const onClose = () => {
  emit('onClose')
}
</script>
<style scoped></style>
