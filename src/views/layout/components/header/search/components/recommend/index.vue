<!--  -->
<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="recommendData.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomColor(),
        }"
      >
        <img
          :src="recommendData.big.photo"
          alt=""
          class="h-full w-full object-cover rounded"
          v-lazy
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          #{{ recommendData.big.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in recommendData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
        >
          <img
            v-lazy
            :src="item.photo"
            alt=""
            class="w-full h-full object-cover rounded"
          />
          <p
            class="backdrop-blur absolute top-0 bottom-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { recommend } from '@/mock'
import { ref } from 'vue'
import { randomColor } from '@/utils/randomColor'

const recommendData = ref({
  big: {},
  list: {},
})
recommendData.value.big = recommend[0]
recommendData.value.list = recommend.slice(1)
</script>
<style scoped></style>
