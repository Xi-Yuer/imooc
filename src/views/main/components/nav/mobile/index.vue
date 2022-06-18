<!--  -->
<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulRef"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
        @click="onShowPopup"
      >
        <SvgIcon name="hamburger" class="w-1.5 h-1.5" />
      </li>
      <li
        v-for="(item, index) in category"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': index === currentIndex }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- 弹窗组件 -->
    <po-pup v-model="isVisable">
      <Menu :category="category" @onItemClick="onItemClick" />
    </po-pup>
    <div>{{ ulScrollLeft }}</div>
  </div>
</template>

<script setup>
import SvgIcon from '@/libs/svg-icon/index.vue'
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
import Menu from '../../menu/index.vue'
undefined
undefined
defineProps({
  category: {
    type: Array,
    required: true,
  },
})
// 获取所有的 item 元素
let itemRefs = []
const setItemRef = el => {
  if (el) {
    itemRefs.push(el)
  }
}
// 获取 ul 元素
const ulRef = ref(null)
// 通过 vueuse 提供的 useScroll 获取响应式的滚动距离
const { x: ulScrollLeft } = useScroll(ulRef, {
  horizontal: true,
  debounce: 100,
})
// 获取选中 item 的 index
const currentIndex = ref(0)
// 滑块样式
const sliderStyle = ref({
  transform: `translateX(${currentIndex.value}px)`,
  width: '52px',
})
watch(currentIndex, value => {
  const { left, width } = itemRefs[value].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`,
  }
})

onBeforeUpdate(() => {
  // 当数据变化时，重置 itemRefs
  itemRefs = []
})

// 点击事件
const onItemClick = index => {
  currentIndex.value = index
  isVisable.value = false
}

// 弹窗组件是否显示
const isVisable = ref(false)
const onShowPopup = () => {
  isVisable.value = true
}
</script>
<style scoped></style>
