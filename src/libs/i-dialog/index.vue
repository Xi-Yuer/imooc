<!--  -->
<template>
  <div v-if="isVisibel">
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容区 -->
    <transition name="up">
      <div
        class="max-w-[80%]  overflow-auto fixed top-[10%] left-[50%] z-50 translate-x-[-50%] py-1.5 px-2 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%] scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div
          class="text-base text-zinc-900 dark:text-zinc-200 mb-2 flex items-center justify-center overscroll-none"
        >
          <slot />
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="onCancel || onConfirm" v-show="isShowBtn">
          <i-button type="info" class="mr-2" @click="onCancel">{{
            cancelText
          }}</i-button>
          <i-button type="primary" @click="onConfirm">{{
            confirmText
          }}</i-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
const emit = defineEmits(['update:modelValue', 'close', 'confirm', 'cancel'])
const isVisibel = useVModel(props)
const props = defineProps({
  // 控制开关
  modelValue: {
    type: Boolean,
    default: true,
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 取消按钮的文本
  cancelText: {
    type: String,
    default: '取消',
  },
  // 确定按钮的文本
  confirmText: {
    type: String,
    default: '确定',
  },
  // 关闭按钮的回调
  onClose: {
    type: Function,
    default: () => {},
  },
  isShowBtn:{
    type: Boolean,
    default: true,
  }
})
// 取消按钮的点击事件
const onCancel = () => {
  close()
  emit('cancel')
}
// 确定按钮的点击事件
const onConfirm = () => {
  emit('confirm')
}
const close = () => {
  isVisibel.value = false
  if (props.onClose) {
    props.onClose()
  }
}
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
.up-enter-active,
.up-leave-active {
  transition: all 0.5s ease-in-out;
}
/* 准备进入，离开完成 */
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
