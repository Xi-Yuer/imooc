<!--  -->
<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisable"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="close"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold to-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ desc }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <i-button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </i-button>
          <i-button type="primary" @click="onConfirmClick">
            {{ confirmText }}
          </i-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 将来confir组件会议方法调用的形式展示
import IButton from '../i-button/index.vue'
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '标题',
  },
  // 描述
  desc: {
    type: String,
    default: '描述',
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消',
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定',
  },
  // 取消回调
  cancel: {
    type: Function,
    default: () => {},
  },
  // 确定回调
  confirm: {
    type: Function,
    default: () => {},
  },
  // 关闭 confirm 回调
  close: {
    type: Function,
    default: () => {},
  },
})

const isVisable = ref(false)
const show = () => {
  isVisable.value = true
}
// 处理动画（ render 函数的渲染，会直接进行）
onMounted(() => {
  show()
})
// 关闭事件
const close = () => {
  isVisable.value = false
  // 延迟一段时间关闭(等待动画完全关闭之后再出发 props.close)
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, 500)
}
// 取消事件
const onCancelClick = () => {
  if (props.cancel) {
    props.cancel()
  }
  close()
}
// 确定事件
const onConfirmClick = () => {
  if (props.confirm) {
    props.confirm()
  }
  close()
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
