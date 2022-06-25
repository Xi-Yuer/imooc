<!--  -->
<template>
  <div class="relative leading-[0]">
    <!-- 单行文本 -->
    <input
      type="text"
      v-if="type === TYPE_TEXT"
      v-model="text"
      :maxlength="maxlength"
      class="border-grar-200 dark:border-zinc-600 dark:bg-zinc-800 duration-400 dark:text-zinc-400 border outline-none py-0.5 px-1 text-sm rounded focus:border-blue-400 w-full"
    />
    <!-- 多行文本 -->
    <textarea
      class="border-grar-200 dark:border-zinc-600 dark:bg-zinc-800 duration-400 dark:text-zinc-400 border outline-none py-0.5 px-1 text-sm rounded focus:border-blue-400 w-full"
      v-if="type === TYPE_TEXTAREA"
      rows="5"
      v-model="text"
      :maxlength="maxlength"
    ></textarea>
    <!-- 错误提示 -->
    <span
      v-if="maxlength"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': textCount === parseInt(maxlength) }"
    >
      {{ textCount }}/{{ maxlength }}
    </span>
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  // 数据双向绑定
  modelValue: {
    type: String,
    default: '',
  },
  // input类型
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const result = [TYPE_TEXT, TYPE_TEXTAREA].includes(value)
      if (!result) {
        console.error(`i-input: type只能是${TYPE_TEXT}或${TYPE_TEXTAREA}`)
      }
      return result
    },
  },
  // 最大输入长度
  maxlength: {
    type: [Number, String],
  },
})

// 输入的字符
const text = useVModel(props)
// 输入的字符数
const textCount = computed(() => text.value.length)
</script>
<style scoped></style>
