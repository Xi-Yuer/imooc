/**
 * 
 * @param {*} title 标题（如果用户没有传入内容，那么标题将作为内容）
 * @param {*} desc 内容（如果没有title，那么desc将作为第一个参数）
 * @param {*} cancelText 取消按钮文本   
 * @param {*} confirmText 确定按钮文本
 */

import { h, render } from 'vue'
import IConfirm from './index.vue'
import IButtom from '@/libs/i-button/index.vue'
import SvgIcon from '@/libs/svg-icon/index.vue'

export const confirm = (title, desc, cancelText, confirmText) => {
    return new Promise((resolve, reject) => {
        if(title && !desc) {
            desc = title;
            title = '';
        }
        // 关闭的回调
        const close = () => {
            // 把渲染的 vnode 删除
            render(null, document.body)
        }
        // 取消的回调
        const cancel = () => {
            reject('取消按钮')
        }
        // 确定的回调
        const confirm = () => {
            resolve()
        }
        // 生成vnode
        const vnode = h(IConfirm,{
            title,
            desc,
            cancelText,
            confirmText,
            cancel,
            confirm,
            close
        })
        // render函数渲染vnode
        render(vnode, document.body)
    })
}
