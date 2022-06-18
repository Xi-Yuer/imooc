import request from '@/utils/request'

// 请求分类列表
export const getCategory = async () => {
  return await request({
    url: 'http://127.0.0.1:4523/mock/1144766/category',
  })
}
