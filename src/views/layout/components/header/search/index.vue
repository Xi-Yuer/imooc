<!--  -->
<template>
  <div class="w-full">
    <Search v-model="inputValue">
    <template #dropdown>
      <div>嘿嘿</div>
    </template>
    </Search>
  </div>
</template>

<script setup>
import Search from '@/libs/search/index.vue'
import { ref } from 'vue'

const inputValue = ref('')
</script>
<style scoped></style>
