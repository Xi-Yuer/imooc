<!--  -->
<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最新搜索</span>
      <svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click.stop="onDeleteAllClick"
      ></svg-icon>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in searchStore.getHistorySearch"
        :key="index"
        class="flex mr-1 mb-1 items-center cursor-pointer bg-zinc-100 dark:bg-zinc-500 px-1 py-1 text-zinc-900  font-bold rounded-sm duration-300 hover:bg-zinc-200 text-xs"
        @click.stop="onItemClick(item)"
      >
        <span class="">{{ item }}</span>
        <svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100 dark:bg-zinc-400"
          @click.stop="onDeleteClick(index)"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from '@/store'
import { confirm } from '@/libs/i-confirm/index.js'
import IButtom from '@/libs/i-button/index.vue'
import SvgIcon from '@/libs/svg-icon/index.vue'

const emit = defineEmits(['onItemClick'])
const searchStore = useSearchStore()

// 单个删除
const onDeleteClick = index => {
  searchStore.deleteHistorySearch(index)
}
// 删除全部
const onDeleteAllClick = () => {
  confirm('删除', '确定删除全部搜索记录吗？', '取消', '删除').then(() => {
    searchStore.deleteAllHistorySearch()
  }).catch(()=>{
    console.log('取消')
  })
}

// 点击触发搜索
const onItemClick = item => {
  emit('onItemClick', item)
}
</script>
<style scoped></style>
