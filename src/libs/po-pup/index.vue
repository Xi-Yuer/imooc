<!--  -->
<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          v-if="isVisable"
          @click="isVisable = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
          v-if="isVisable"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
defineEmits(['update:modelValue'])
// 返回一个响应式数据，当他的值发生修改时，会自动触发 emits 修改 modelValue
const isVisable = useVModel(props)

// 锁定滚动条
const isLocked = useScrollLock(document.body)
// 当显示弹窗时，锁定滚动条
watch(
  isVisable,
  val => {
    isLocked.value = val
  },
  { immediate: true }
)
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
/* 准备进入，离开完成 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s ease-in-out;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
