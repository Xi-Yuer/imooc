import { defineAsyncComponent } from "vue";
export default {
  // 注册组件
  install(app) {
    // 获取当前文件夹下所有的 index.vue 文件
    const Comps = import.meta.glob("./*/index.vue");
    // 遍历组件模块并注册
    for (const [filePath, fn] of Object.entries(Comps)) {
      // 动态注册组件
      app.component(filePath.split("/")[1], defineAsyncComponent(fn));
    }
  },
};
