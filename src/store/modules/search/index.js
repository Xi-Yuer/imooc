import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      historySearch: [],
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['historySearch'],
      },
    ],
  },
  getters: {
    getHistorySearch: state => state.historySearch,
  },
  actions: {
    //新增
    addHistorySearch(searchText) {
      // 新增的历史记录不能重复，新增的位置是最前面
      const hasSearchText = this.historySearch.includes(searchText)
      console.log(hasSearchText)
      if (hasSearchText) {
        //   剔除旧数据
        this.historySearch.splice(
          this.historySearch.indexOf(searchText),
          1
        )
      }
      // 新增的数据放到最前面
      this.historySearch.unshift(searchText)
    },
    // 单个删除
    deleteHistorySearch(index) {
      this.historySearch.splice(index, 1)
    },
    // 全部删除
    deleteAllHistorySearch() {
      this.historySearch = []
    },
  },
})
