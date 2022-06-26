<!--  -->
<template>
  <div
    class="overflow-auto bg-white dark:bg-zinc-800 duration-200"
    ref="containerRef"
  >
    <Nav />
    <div class="max-w-xl mx-auto relative m-1 xl:mt-4">
      <List />
    </div>
    <!-- 移动端下的Tabbar -->
    <TriggerMenu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <template v-for="(item, index) in TabBar" :key="item.icon">
        <trigger-menu-item
          :icon="item.icon"
          :iconClass="item.iconClass"
          :textClass="item.textClass"
          :path="item.path"
          :text="item.name"
        >
        </trigger-menu-item>
      </template>
      {{scrollY}}
    </TriggerMenu>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>
<script setup>
import Nav from './components/nav/index.vue'
import List from './components/list/index.vue'
import TriggerMenu from '@/libs/trigger-menu/index.vue'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
const router = useRouter()

const containerRef = ref(null)
const scrollY = ref()
// 记录滚动位置
// onMounted(()=>{
//   const { y } = useScroll(containerRef.value)
//   console.log(y.value)
// })
const TabBar = ref([
  {
    name: '首页',
    icon: 'home',
    path: '/',
    iconClass: 'fil-zinc-900 dark:fil-zinc-200',
    textClass: '',
  },
  {
    name: 'VIP',
    icon: 'vip',
    path: '/member',
    iconClass: 'fil-zinc-900 dark:fil-zinc-200',
    textClass: 'fil-zinc-400 dark:fil-zinc-500',
  },
  {
    name: '我的',
    icon: 'profile',
    path: '/profile',
    iconClass: 'fil-zinc-900 dark:fil-zinc-200',
    textClass: 'fil-zinc-400 dark:fil-zinc-500',
  },
])
</script>
<style scoped></style>
