<!--  -->
<template>
  <div class="overflow-auto flex flex-col items-center">
    <svg-icon
      v-if="isMobileTerminal"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      name="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></svg-icon>
    <img :src="blob" ref="imgRef" alt="" class="w-[450px]" />
    <div class="flex justify-center items-center w-full mt-4">
      <i-button type="info" @click="emit('close')">取消</i-button>
      <i-button type="primary" class="ml-3" @click="onConfirmClick"
        >确定</i-button
      >
    </div>
  </div>
</template>

<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import { onMounted, ref } from 'vue'
import { message } from '@/libs/i-message'
const props = defineProps({
  blob: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['close'])
const imgRef = ref(null)
let cropper
onMounted(() => {
  cropper = new Cropper(imgRef.value, {
    // 裁剪纵横比 1:1
    aspectRatio: 1,
    // 将裁剪框限制为画布大小
    viewMode: 1,
    zoomable: false,
    scalable: false,
    // cropBoxMovable: false,
    // cropBoxResizable: false,
  })
})
const onConfirmClick = () => {
  if (cropper) {
    // 拿到裁剪后的图片
    cropper.getCroppedCanvas().toBlob(blob => {
      message('success', '头像上传成功,请在控制台F12查看打印')
      console.log(blob)
      emit('close')
    })
  }
}

// 关闭按钮事件
const close = () => {
  emit('close')
}
</script>
<style scoped></style>
