<!--  -->
<template>
  <div class="relative" @mouseenter="onMounseEnter" @mouseleave="onMounseLeave">
    <div>
      <div ref="btnRef">
        <!-- 具名插槽：触发弹层的视图 -->
        <slot name="reference"></slot>
      </div>
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="popoverRef"
        v-show="isVisble"
        :style="popoverStyle"
        class="absolute z-20 p-1 bg-white dark:bg-zinc-800 border dark:border-zinc-500 rounded-md empty:hidden"
      >
        <!-- 匿名插槽：弹层的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT,
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 弹出层的位置
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(value) {
      const result = placementEnum.includes(value)
      if (!result) {
        console.error(
          `[Popover] placement 属性只能是 ${placementEnum.join(', ')} 中的一个`
        )
      }
      return result
    },
  },
})

const btnRef = ref(null) // 触发弹层的视图
const popoverRef = ref(null) // 弹层的视图
const isVisble = ref(false)
const popoverStyle = ref({
  top: '0',
  left: '0',
}) // 生成气泡样式

// 计算，期望气泡展示的时候再进行计算
watch(isVisble, val => {
  if (!val) return
  // 等待元素渲染
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        popoverStyle.value = {
          top: `${btnRef.value.offsetTop - popoverRef.value.offsetHeight}px`,
          left: `${btnRef.value.offsetLeft}px`,
        }
        break
      case PROP_TOP_RIGHT:
        popoverStyle.value = {
          top: `${btnRef.value.offsetTop - popoverRef.value.offsetHeight}px`,
          left: `${
            btnRef.value.offsetLeft +
            btnRef.value.offsetWidth -
            popoverRef.value.offsetWidth
          }px`,
        }
        break
      case PROP_BOTTOM_LEFT:
        popoverStyle.value = {
          top: `${btnRef.value.offsetTop + btnRef.value.offsetHeight}px`,
          left: `${btnRef.value.offsetLeft}px`,
        }
        break
      case PROP_BOTTOM_RIGHT:
        popoverStyle.value = {
          top: `${btnRef.value.offsetTop + btnRef.value.offsetHeight}px`,
          left: `${
            btnRef.value.offsetLeft +
            btnRef.value.offsetWidth -
            popoverRef.value.offsetWidth
          }px`,
        }
        break
    }
  })
})

// 计算元素的尺寸
// const getElementSize = element => {
//   if (!element)
//     return {
//       width: 0,
//       height: 0,
//     }
//   const { offsetWidth, offsetHeight } = element
//   return {
//     width: offsetWidth,
//     height: offsetHeight,
//   }
// }

//鼠标移入
let timer
const onMounseEnter = () => {
  isVisble.value = true
  if (timer) {
    clearTimeout(timer)
  }
}
// 鼠标移出
const onMounseLeave = () => {
  timer = setTimeout(() => {
    isVisble.value = false
    timer = null
  }, 100)
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
