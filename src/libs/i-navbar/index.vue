<!--  -->
<template>
  <div
    class="w-full h-5 border-b flex justify-around px-3 z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[isTicky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="h-full left-0 flex items-center justify-center"
      @click="onLeftClick"
    >
      <slot name="left">
        <svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex justify-center items-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
      @click="onCenterClick"
    >
      <slot name="center">
        <span>{{ title }}</span>
      </slot>
    </div>
    <!-- 右 -->
    <div
      class="h-full right-0 flex items-center justify-center"
      @click="onRightClick"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['leftClick', 'centerClick', 'rightClick'])
defineProps({
  isTicky: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
})
const onLeftClick = () => {
  emit('leftClick')
}
const onCenterClick = () => {
  emit('centerClick')
}
const onRightClick = () => {
  emit('rightClick')
}
</script>
<style scoped></style>
