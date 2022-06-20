import { useIntersectionObserver } from '@vueuse/core'
export default {
  // 图片懒加载（当用户无法看见图片时不加载图片）
  mounted(el) {
    // 拿到当前的src
    const imgSrc = el.src
    // 先将src变为空
    el.src = ''
    const { stop } =  useIntersectionObserver(el, ([isIntersecting]) => {
      if (isIntersecting) {
        //   当图片可见时赋值图片的src
        el.src = imgSrc
        // 停止监听
        stop()
      }
    })
  },
}
