<!--  -->
<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-200"
  >
    <div class="flex items-center">
      <img
        v-lazy
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        class="guide-home h-4 cursor-pointer mr-2"
        @click="onToHome"
      />
      <Search class="mr-1" />
      <Theme class="mr-1" />
      <Profile />
    </div>
  </div>
</template>

<script setup>
import Search from "./search/index.vue";
import Theme from "./theme/index.vue";
import Profile from "./profile/index.vue";
import { useRouter } from "vue-router";
import { useAppStore } from '@/store'
const appStore = useAppStore()
const router = useRouter();

const onToHome = () => {
  appStore.changeRouterType('push')
  router.push("/"); 
};
</script>
<style scoped></style>
