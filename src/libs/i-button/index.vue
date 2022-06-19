<!--  -->
<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'avtive:scale-105': isAnimation,
      },
    ]"
    @click.stop="onBtnClick"
  >
    <template v-if="loading">
      <svg-icon name="loading" class="w-2 h-2 animate-spin mr-1"> </svg-icon>
    </template>
    <!-- icon按钮 -->
    <svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></svg-icon>
    <!-- 文字按钮 -->
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script>
import { computed } from 'vue'

//type 可选项：表示按钮风格
const typeEnum = {
  primary: 'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-hover-main active:bg-main dark:active:bg-hover-main',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 active:bg-zinc-200 dark:hover:bg-zinc-600 dark:active:bg-zinc-700',
}
const sizeEnum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: '',
  },
  //icon按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5',
  },
  //   文字按钮
  small: {
    button: 'w-7 h-3 text-base',
    icon: '',
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5',
  },
}
</script>
<script setup>
// 构建 type size 风格选项
// 通过 props 让开发中控制按钮
// 区分 icon button 和 text button
// 依据当前数据，实现视图
// 处理点击事件

const props = defineProps({
  // icon 图标
  // icon颜色
  // icon图标类名
  // 按钮风格
  // 大小风格
  icon: String,
  iconColor: String,
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    // validator(value) {
    //   // 当开发者指定的风格不在枚举中时，提示开发者
    //   const result = Object.keys(typeEnum).includes(value)
    //   if (!result) {
    //     throw new Error(`type 参数不在枚举中`)
    //   }
    // },
  },
  // 按钮大小风格
  size: {
    type: String,
    default: 'default',
    // validator(value) {
    //   const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
    //   const result = keys.includes(value)
    //   if (!result) {
    //     throw new Error(`size 参数不在枚举中`)
    //   }
    // },
  },
  // 按钮点击时，是否需要动画
  isAnimation: {
    type: Boolean,
    default: true,
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
})
// props.size
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

// 事件传递
const emits = defineEmits(['click'])
const onBtnClick = () => {
  if(props.loading) return
  emits('click')
}
</script>
<style scoped></style>
