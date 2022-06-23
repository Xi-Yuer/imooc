<!--  -->
<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="statusStyle[type].containerClass"
    >
      <svg-icon
        :name="statusStyle[type].icon"
        :fillClass="statusStyle[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></svg-icon>
      <span class="text-sm" :class="statusStyle[type].textClass">{{
        message
      }}</span>
    </div>
  </transition>
</template>

<script>
const typeEnum = ['success', 'warning', 'error']
</script>
<script setup>
import SvgIcon from '@/libs/svg-icon/index.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  // message 的消息类型
  type: {
    type: String,
    default: 'success',
    validator(value) {
      const result = typeEnum.includes(value)
      if (!result) {
        throw new Error(`type 只能是 ${typeEnum.join(',')} 中的一个`)
      }
      return result
    },
  },
  // message 的消息内容
  message: {
    type: String,
    default: '提示',
  },
  // 消息展示时长
  duration: {
    type: Number,
    default: 3000,
  },
  // 关闭回调
  onClose: {
    type: Function,
    default: () => {},
  },
})
// 三种状态的样式
const statusStyle = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100',
  },
  // 警告
  warning: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100',
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100',
  },
}
// 控制展示
const isVisible = ref(true)
onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
    if (props.onClose) {
      setTimeout(() => {
        props.onClose()
      }, 500)
    }
  }, props.duration)
})
</script>
<style scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
