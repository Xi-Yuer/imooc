import { defineStore } from 'pinia'

// 数据
import { category } from '@/mock'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      category: [],
    }
  },
  getters: {
    getCategory: state => state.category,
  },
  actions: {
    setCategory(payload) {
      this.category = category
    },
  },
})
