<!--  -->
<template>
  <template v-if="isMobileTerminal">
    <MobileNav :category="category" />
  </template>
  <template v-else>
    <PcNav :category="category" />
  </template>
</template>

<script setup>
// 方法
import { isMobileTerminal } from '@/utils/isMobileTerminal'
// 组件
import MobileNav from './mobile/index.vue'
import PcNav from './pc/index.vue'
// 数据
import { category } from '@/mock'
</script>
<style scoped></style>
