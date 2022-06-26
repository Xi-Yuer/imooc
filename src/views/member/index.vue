<!--  -->
<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto xl:py-4 bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <i-navbar
        v-if="isMobileTerminal"
        sticky
        @leftClick="onNavbarLeftClick"
        title="精选会员"
      >
        精选会员
      </i-navbar>

      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item-vue
            v-for="item in vipPayListData"
            :key="item.id"
            :hot="item.isHot"
            :select="item.id === currentPayData.id"
            :data="item"
            @click="onChangeCurrentPay"
          ></pay-menu-item-vue>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
      </div>
      <MobilePay v-if="isMobileTerminal" :payData="currentPayData" />
      <PcPay v-if="!isMobileTerminal" :payData="currentPayData" />
    </div>
  </div>
</template>
<script setup>
import PayMenuItemVue from './components/pay-menu-item/index.vue'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import { vipData as vipPayListData } from '@/mock'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MobilePay from './mobile-pay/index.vue'
import PcPay from './pc-pay/index.vue'
// 当前选中的会员等级数据
const router = useRouter()
const currentPayData = ref(vipPayListData[0])

const onNavbarLeftClick = () => {
  router.back()
}
// 选中支付向
const onChangeCurrentPay = item => {
  currentPayData.value = item
}
</script>
<style scoped></style>
