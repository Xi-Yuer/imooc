const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹爱
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 sylmbolId 格式
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   proxy: {
  //     // 代理所有 /api 的请求，该求情将被代理到 target 中
  //     '/demo': {
  //       // 代理请求之后的请求地址
  //       target: 'https://api.imooc-front.lgdsunday.club',
  //       // 跨域
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/demo/, '')
  //     }
  //   }
  // }
})
