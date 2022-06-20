<template>
  <div class="h-screen">
    <Header class="h-header" />
      <Main class="h-min" />
    <Float />
  </div>
</template>
<script setup>
import Header from './components/header/index.vue'
import Main from './components/main/index.vue'
import Float from './components/float/index.vue'
</script>
<style scoped></style>
