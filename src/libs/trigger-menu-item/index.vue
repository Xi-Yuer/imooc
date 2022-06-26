<!--  -->
<template>
  <div
    class="w-5 flex flex-col items-center justify-center col mx-0.5"
    @click="onItemClick"
  >
    <svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"></svg-icon>
    <p class="text-sm mt-0.5" :class="textClass">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const appStore = useAppStore()
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200',
  },
  path: {
    type: String,
  },
  text: {
    type: String,
  },
})

const onItemClick = () => {
  if (props.path) {
    router.push(props.path)
  }
}
</script>
<style scoped></style>
