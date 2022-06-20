<!--  -->
<template>
  <IInfinite v-model="loading" :isFinished="isFinished" @onLoad="getMoreData">
    <i-waterfall
      class="px-1 w-full"
      :data="someData"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <Item :data="item" :width="width" />
      </template>
    </i-waterfall>
  </IInfinite>
</template>

<script setup>
import { ref } from 'vue'
import { list } from '@/mock'
import Item from './components/item/index.vue'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import IInfinite from '@/libs/i-infinite/index.vue'
import { computed } from '@vue/reactivity'

const loading = ref(false) // 加载中标记
const isFinished = ref(false) // 数据是否全部加载完成

const offset = ref(0) // 偏移量
const limit = ref(10) // 每次加载数据条数
const someData = computed(() => list.slice(offset.value, limit.value))

const getMoreData = () => {
  // 数据加载完毕
  if (isFinished.value) return
  if(list.length < limit.value) {
    isFinished.value = true
    loading.value = false
    return
  }
  // 加载更多
  limit.value += 10
  loading.value = false
}
</script>
<style scoped></style>
