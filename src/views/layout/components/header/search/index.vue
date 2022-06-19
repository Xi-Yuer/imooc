<!--  -->
<template>
  <div class="w-full">
    <Search v-model="inputValue">
      <template #dropdown> </template>
    </Search>
  </div>
</template>

<script setup>
import Search from '@/libs/search/index.vue'
import { ref, watch } from 'vue'

const inputValue = ref('')
</script>
<style scoped></style>
