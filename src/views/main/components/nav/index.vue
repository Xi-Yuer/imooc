<!--  -->
<template>
  <template v-if="isMobileTerminal">
    <MobileNav />
  </template>
  <template v-else>
    <PcNav />
  </template>
</template>

<script setup>
import { useCategoryStore } from "@/store";
// 方法
import { isMobileTerminal } from "@/utils/isMobileTerminal";
// 组件
import MobileNav from "./mobile/index.vue";
import PcNav from "./pc/index.vue";
const categoryStore = useCategoryStore();
categoryStore.setCategory("初始化分类数据");
</script>
<style scoped></style>
