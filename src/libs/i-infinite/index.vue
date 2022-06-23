<!--  -->
<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <svg-icon
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
        v-show="loading"
      >
      </svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useVModel, useIntersectionObserver } from '@vueuse/core'

const emit = defineEmits(['onLoad', 'update:modelValue'])
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true,
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false,
  },
})
// 处理loading的状态
const loading = useVModel(props)


const targetIsInterscting = ref(false)
// 滚动元素
const loadingTarget = ref(null)
useIntersectionObserver(loadingTarget, ([isIntersecting]) => {
  targetIsInterscting.value = isIntersecting
  emitLoad()
})

const emitLoad = () => {
  // 当isIntersecting为true时，表示元素已经出现在可视区域。同时 loading 为 true 并且数据尚未加载完毕，
  if (loadingTarget && !loading.value && !props.isFinished) {
    // 修改加载数据标记
    loading.value = true
    // 触发加载数据事件
    emit('onLoad')
  }
}
// 监听loading变化
watch(loading,emitLoad)
</script>
<style scoped></style>
