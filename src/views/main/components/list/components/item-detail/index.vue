<!--  -->
<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-3xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端下 -->
    <i-navbar @leftClick="close" :title="data.title" v-if="isMobileTerminal">
      <template #right>
        <svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </template>
    </i-navbar>
    <svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm absolute right-2 top-2"
      @click="close"
    ></svg-icon>
    <!-- 内容区 -->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex overflow-hidden">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="data.photo"
        alt=""
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-tb-lg xl:p-3"
      >
        <!-- 收藏 分享 -->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <svg-icon
            name="share"
            class="w-4 h-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
          ></svg-icon>
          <i-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></i-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-lg xl:mb-5"
        >
          {{ data.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="w-3 h-3 rounded-full" :src="data.avatar" alt="" />
          <span class="text-sm text-zinc-900 dark:text-zinc-200">{{
            data.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/isMobileTerminal'
const emit = defineEmits(['close'])

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const close = () => {
  emit('close')
}
</script>
<style scoped></style>
