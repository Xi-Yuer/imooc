<!--  -->
<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <span class="text-base text-zinc-900 font-bold mb-2 px-1 dark:text-zinc-200"
      >所有分类</span
    >
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in category"
        :key="item.id"
        class="text-sm text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineEmits(["onItemClick"]);
defineProps({
  category: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped></style>
