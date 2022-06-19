<!--  -->
<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-200">
    <ul
      class="w-[800px] relative flex flex-wrap  overflow-x-auto px-[10px] py-1 text-xs to-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isFolded ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- 展示箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="trigerFold"
      >
        <svg-icon
          :name="isFolded ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass=" fill-zinc-900 dark:fill-zinc-300"
        >
        </svg-icon>
      </div>
      <!-- item -->
      <li
        v-for="(item, index) in category"
        :key="item.id"
        @click="onItemClick(index)"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 dark:text-zinc-500 font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="[curruntCateegoryIndex === index ? 'text-zinc-900 bg-zinc-200 dark:text-zinc-900 dark:bg-zinc-800' : '']"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/store'
const categoryStore = useCategoryStore()
const category = ref(categoryStore.getCategory)

const isFolded = ref(false)
// 展开/收起
const trigerFold = () => {
  isFolded.value = !isFolded.value
}
// 选中状态
const curruntCateegoryIndex = ref(0)

const onItemClick = index => {
  curruntCateegoryIndex.value = index
}
</script>
<style scoped></style>
