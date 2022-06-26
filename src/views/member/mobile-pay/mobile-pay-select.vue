<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-lg text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      选择支付方式
    </h2>
    <!-- 支付宝 -->
    <div
      class="flex items-center px-2 py-2 border-b border-b-zinc-200 dark:border-b-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-900"
      @click="onAlipay"
    >
      <img class="w-4 h-4" src="@/assets/imgs/alipay.jpg" alt="" />
      <p class="text-lg ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
    </div>
  </div>
</template>

<script setup>
// import { alipay } from '@/utils/pay'

const props = defineProps({
  payData: {
    required: true,
    type: Object
  }
})

const onAlipay = () => {
  message('success', '个人学习项目，暂不支持支付宝支付')
  // alipay(props.payData.title, props.payData.desc)
}
</script>
