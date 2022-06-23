import { ALL_CATEGORY_ITEM } from '@/constants'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore',{
  state: () => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      currentCategoryIndex: 0,
      list:[]
    }
  },
  getters: {
    getCurrentCategory: state => state.currentCategory,
    getCurrentCategoryIndex: state => state.currentCategoryIndex,
    getList: state => state.list
  },
  actions: {
    setCurrentCategory(payload) {
      this.currentCategory = payload
    },
    setCurrentCategoryIndex(payload) {
      this.currentCategoryIndex = payload
    },
    setList(payload){
      this.list = payload
    }
  },
})
