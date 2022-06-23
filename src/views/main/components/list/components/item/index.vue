<!--  -->
<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group">
      <!-- 图片 -->
      <img
        v-lazy
        :src="data.photo"
        ref="imgRef"
        alt=""
        class="w-full rounded bg-transparent"
        :style="{
          height: data.photoHeight / 2 + 'px',
          background: randomColor(),
        }"
        @click="onToPickClick"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 right-0 rounded duration-300 group-hover:opacity-100 xl:block"
        @click="onToPickClick"
      >
        <!-- 分享 -->
        <i-button class="absolute top-1.5 left-1.5">分享</i-button>
        <!-- 点赞 -->
        <i-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass=" fill-zinc-900 dark:fill-zinc-200"
        ></i-button>
        <!-- 下载 -->
        <i-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass=" fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></i-button>
        <!-- 全屏 -->
        <i-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass=" fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></i-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ data.title }}
    </p>
    <!-- 作者信息 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy :src="data.avatar" alt="" class="h-2 w-2 rounded-full" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>
<script setup>
import { message } from '@/libs/i-message'
import { randomColor } from '@/utils/randomColor'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { saveAs } from 'file-saver'
import { ref, computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: Number,
    default: 0,
  },
})
// 下载按钮点击事件
const onDownload = () => {
  message('success', '正在下载...')
  // 延迟一段时间再下载
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 200)
}
// 全屏
const imgRef = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgRef)

const { x, y, width, height } = useElementBounding(imgRef)
// 跳转记录，记录跳转时图片的中心点位置信息（X | Y 的位置 + 宽 | 高 的一半）
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(x.value + width.value / 2),
    translateY: parseInt(y.value + height.value / 2),
  }
})

// 进入图片详情
const onToPickClick = () => {
  emit('click', {
    item:props.data,
    location: imgContainerCenter.value,
  })
}
</script>
<style scoped></style>
