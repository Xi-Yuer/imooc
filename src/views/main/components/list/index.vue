<!--  -->
<template>
  <i-infinite v-model="loading" :isFinished="isFinished" @onLoad="getMoreData">
    <i-waterfall
      class="px-1 w-full"
      :data="someData"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width" @click="onToPickClick" />
      </template>
    </i-waterfall>
  </i-infinite>
  <!-- 详情内容展示 -->
  <transition
    :css="false"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <ItemDetail v-if="isVisiblePins" :data="currentPins" @close="close" />
  </transition>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import gsap from 'gsap'
import { list } from '@/mock'
import Item from './components/item/index.vue'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import { computed } from '@vue/reactivity'
import { useAppStore } from '@/store'
import ItemDetail from './components/item-detail/index.vue'
import { useEventListener } from '@vueuse/core'
const appStore = useAppStore()

const loading = ref(false) // 加载中标记
const isFinished = ref(false) // 数据是否全部加载完成

const offset = ref(0) // 偏移量
const limit = ref(10) // 每次加载数据条数
const someData = computed(() => [
  ...list
    .slice(offset.value, limit.value)
    .filter(item => item.tags.includes(appStore.getCurrentCategory.id)),
])

const getMoreData = () => {
  // 数据加载完毕
  if (isFinished.value) return
  if (list.length < limit.value) {
    isFinished.value = true
    loading.value = false
    return
  }
  // 加载更多
  limit.value += 10
  loading.value = false
}

// 控制值pins展示
const isVisiblePins = ref(false)
// 当前选中的图片信息
const currentPins = ref({})
const currentLocation = ref({})

const onToPickClick = data => {
  isVisiblePins.value = true
  currentPins.value = data.item
  currentLocation.value = data.location
}
const close = () => {
  isVisiblePins.value = false
}
const beforeEnter = el => {
  gsap.set(el, {
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentLocation.value ? currentLocation.value.translateX : 0,
    translateY: currentLocation.value ? currentLocation.value.translateY : 0,
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.3,
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done,
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    translateX: currentLocation.value ? currentLocation.value.translateX : 0,
    translateY: currentLocation.value ? currentLocation.value.translateY : 0,
  })
}
</script>
<style scoped></style>
