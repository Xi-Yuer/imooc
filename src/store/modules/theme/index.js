import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      theme: window.localStorage.getItem("theme") || "light",
    };
  },
  getters: {
    getTheme: (state) => state.theme,
  },
  actions: {
    setTheme(payload) {
      this.theme = payload;
    },
  },
});
