<!--  -->
<template>
  <div class="fixed bottom-10 right-2 flex-col flex justify-between h-10">
    <!-- 引导页 -->
    <div
      class="guide-driver w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg"
      @click="onDriver"
    >
      <svg-icon
        name="guide"
        class="w-2 h-2 driver-fix-stacking"
        fillClass="fill-zine-900 dark:fill-zinc-200 group-hover:fill-main"
      ></svg-icon>
    </div>
    <!-- 反馈 -->
    <popover class="flex items-center" placement="bottom-right">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
        >
          <svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zine-900 dark:fill-zinc-200 group-hover:fill-main"
          ></svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </popover>
  </div>
</template>

<script setup>
// 导入
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import steps from './step'
// 初始化
let driver = null
onMounted(() => {
  driver = new Driver({
    // 引导页
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
  })
})
const onDriver = () => {
  // 指定步骤
  driver.defineSteps(steps)
  // 开始
  driver.start()
}
</script>
<style scoped>
</style>
