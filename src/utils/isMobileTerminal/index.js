// 判断是否为移动设备
// 判断依据：当前屏幕宽度是否大于指定宽度（1280）

import { computed } from "vue";
// 获取屏幕宽度
import { useWindowSize } from "@vueuse/core";
import { PC_DEVICE_WIDTH } from "@/constants";

// 屏幕宽度
const { width } = useWindowSize();

export const isMobileTerminal = computed(() => {
  // 当返回 true 时为移动设备宽度
  return width.value < PC_DEVICE_WIDTH;
});

// 动态指定rem基准值
// 根据用户屏幕的宽度进行计算，值作为根标签html的font-size大小
export const useRem = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40;
  // 监听 html 文档被解析完成事件
  document.addEventListener("DOMContentLoaded", () => {
    // 拿到html标签
    const html = document.querySelector("html");
    // 计算font-size
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 设置根标签的 font-size
    html.style.fontSize = fontSize + "px";
  });
};
