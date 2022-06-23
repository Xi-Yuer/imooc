<!--  -->
<template>
  <div>
    <div
      v-for="item in HintData"
      class="py-1 px-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="hightlight(item, searchText)"
    ></div>
  </div>
</template>

<script setup>
import { watchDebounced } from '@vueuse/shared'
import { ref } from 'vue'
const emit = defineEmits(['onItemClick'])
const props = defineProps({
  searchText: {
    type: String,
    default: '',
  },
})
const HintData = ref([])
const getHintData = () => {
  const arr = []
  arr.length = 4
  if (!props.searchText) return
  //   为数组填充随机中文字符串
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.random().toString(36).substr(2, 2) + props.searchText + Math.random().toString(36).substr(2, 1)
  }
  HintData.value = arr
}
// watchDebounced 具有防抖功能的watch
watchDebounced(() => props.searchText, getHintData, {
  debounce: 500,
})

// 处理搜索关键字高亮
const hightlight = (str, keyword) => {
  if (!keyword) return str
  const reg = new RegExp(keyword, 'g')
  return str.replace(reg, `<span class="text-red-500">${keyword}</span>`)
}
const onItemClick = item => {
  emit('onItemClick', item)
}
</script>
<style scoped></style>
