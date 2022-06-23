<!--  -->
<template>
  <div class="guide-theme">
    <Popover placement="bottom-right">
      <!-- 具名插槽 -->
      <template #reference>
        <div>
          <!-- 触发弹出层的内容 -->
          <SvgIcon
            :name="svgIconName"
            class="w-3 h-3 cursor-pointer rounded-sm outline-none hover:bg-zinc-100/60 duration-200"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></SvgIcon>
        </div>
      </template>
      <!-- 匿名插槽：弹出层内容 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded-lg hover:bg-zinc-100/60 dark:hover:bg-zinc-600"
          v-for="(item, index) in themeArr"
          :key="item.id"
          @click="onThemeClick(item)"
        >
          <SvgIcon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></SvgIcon>
          <span class="text-zinc-900 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/store";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "@/constants";
import Popover from "@/libs/popover/index.vue";
import SvgIcon from "@/libs/svg-icon/index.vue";
import { computed } from "vue";

const themeStore = useThemeStore();

const themeArr = [
  {
    id: "0",
    type: THEME_LIGHT,
    icon: "theme-light",
    name: "极简白",
  },
  {
    id: "1",
    type: THEME_DARK,
    icon: "theme-dark",
    name: "极简黑",
  },
  {
    id: "2",
    type: THEME_SYSTEM,
    icon: "theme-system",
    name: "跟随系统",
  },
];
// 主题切换
const onThemeClick = (item) => {
  themeStore.setTheme(item.type);
};

const svgIconName = computed(() => {
  const findTheme = themeArr.find((item) => {
    return item.type === themeStore.getTheme;
  });
  return findTheme ? findTheme.icon : "theme-light";
});
</script>
<style scoped></style>
