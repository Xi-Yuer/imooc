/**
 *
 * @param {*} type 消息类型
 * @param {*} message 消息内容
 * @param {*} duration 延时时间
 */
import Message from './index.vue'
import { h, render } from 'vue'
export const message = (type, message, duration = 3000) => {
  //动画结束，删除DOM
  const onClose = () => {
    render(null, document.body)
  }

  const vnode = h(Message, {
    type,
    message,
    duration,
    onClose,
  })

  render(vnode, document.body)
}
