<!--  -->
<template>
  <div class="w-full">
    <Search v-model="inputValue" @search="onItemClick" class="guide-search">
      <template #dropdown>
        <!-- 搜索提示 -->
        <Hint
          :searchText="inputValue"
          v-show="inputValue"
          @onItemClick="onItemClick"
        />
        <HistorySearch @onItemClick="onItemClick" v-show="!inputValue" />
        <Recommend v-show="!inputValue" />
      </template>
    </Search>
  </div>
</template>

<script setup>
import Search from '@/libs/search/index.vue'
import Hint from './components/hint/index.vue'
import HistorySearch from './components/history/index.vue'
import Recommend from './components/recommend/index.vue'
import { ref, watch } from 'vue'
import { useSearchStore } from '@/store'
const searchStore = useSearchStore()

const inputValue = ref('')
const onItemClick = item => {
  inputValue.value = item
  searchStore.addHistorySearch(item)
}
</script>
<style scoped></style>
