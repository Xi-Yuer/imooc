<template>
  <div>
    <!-- 特惠提示 -->
    <discounts-vue></discounts-vue>
    <div
      class="flex flex-col items-center justify-evenly border-zinc-200 dark:border-zinc-600 border-[1px] py-3 rounded-md mt-1"
    >
      <p class="text-[32px] text-orange-600 font-sans">
        <span class="text-base text-zinc-900 dark:text-zinc-200">
          支付金额：
        </span>
        <span class="text-lg mr-[-12px]">￥</span>
        {{payData.price}}
      </p>

      <div class="flex mt-3">
        <!-- 支付宝支付 -->
        <div
          class="border border-zinc-200 dark:border-zinc-600 rounded-sm w-[220px] h-[60px] flex items-center pl-2 cursor-pointer duration-200 hover:bg-zinc-50 hover:dark:bg-zinc-800"
          @click="onAliPayClick"
        >
          <img class="w-4 h-4" src="@/assets/imgs/alipay.jpg" alt="" />
          <p class="text-lg ml-1 text-zinc-800 dark:text-zinc-200">支付宝</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from '@/libs/i-message';
import discountsVue from '../components/count-down/index.vue'
// import { alipay } from '@/utils/pay'

const props = defineProps({
  payData: {
    required: true,
    type: Object
  }
})

const onAliPayClick = () => {
  message('success', '个人学习项目，暂不支持支付宝支付')
  // alipay(props.payData.title, props.payData.desc)
}
</script>

<style lang="scss" scoped></style>
