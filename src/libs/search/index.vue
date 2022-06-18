<!--  -->
<template>
  <div
    class="group relative w-full p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40 group"
    ref="containerRef"
  >
    <div>
      <!-- 搜索图标 -->
      <svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></svg-icon>
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 focus:border-red-300 text-sm duration-500 group-hover:bg-white group-hover:border-zinc-200"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <svg-icon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500 focus:border-red-300"
        @click="onClickClear"
      ></svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮 -->
      <i-button
        icon="search"
        class="opacity-0 absolute duration-500 translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100"
        @click="onSearchHandler"
      ></i-button>
    </div>
    <!-- 下拉框 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-lg"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
// 输入内容实现双向绑定
// 搜索按钮在 hover 时 展示
// 一键清空文本
// 触发搜索
// 控制下拉展示区域的展示
// 事件处理
import { useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core' // 判断指定 DOM 之外的点击事件

const emits = defineEmits([
  'update:modelValue',
  'search',
  'clear',
  'input',
  'focus',
  'blur',
])
const props = defineProps({
  // 双向绑定
  modelValue: {
    type: String,
    required: true,
  },
})

const inputValue = useVModel(props)
const containerRef = ref(null)
const isFocus = ref(false) // input 是否获取到了焦点

// 点击区域外隐藏 dropdown
onClickOutside(containerRef, () => {
  // 当触发了DOM 节点之外的点击事件之后，执行的回调
  isFocus.value = false
})

// 监听用户输入行为
watch(inputValue, val => {
  emits('input', val)
})

// 清空
const onClickClear = () => {
  inputValue.value = ''
  emits('clear')
}
// 搜索
const onSearchHandler = () => {
  emits('search', inputValue.value)
}
// 获取焦点
const onFocusHandler = () => {
  isFocus.value = true
  emits('focus')
}
// 失去焦点
const onBlurHandler = () => {
  isFocus.value = false
  emits('blur')
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slder-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
