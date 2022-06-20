<!--  -->
<template>
  <div>
    <i-waterfall
      :data="list"
      nodeKey="id"
      :column="5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width }">
        <Item :data="item" />
      </template>
    </i-waterfall>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { list } from "@/mock";
import Item from "./components/item/index.vue";
</script>
<style scoped></style>
