<!--  -->
<template>
  <!-- 一级路由出口 -->
  <div
    class="scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <router-view />
  </div>
</template>

<script setup>
import TransitionRouterView from '@/libs/transition-router-view/index.vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>
<style scoped></style>
