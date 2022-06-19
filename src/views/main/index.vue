<!--  -->
<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-200">
    <Nav />
    <div class="max-w-xl mx-auto relative m-1 xl:mt-4">
      <List />
    </div>
  </div>
</template>

<script setup>
import Nav from './components/nav/index.vue'
import List from './components/list/index.vue'
</script>
<style scoped></style>
