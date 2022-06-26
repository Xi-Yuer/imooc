<!--  -->
<template>
  <div>
    <popover class="flex items-center" placement="bottom-right">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
          v-if="userStore.userInfo"
        >
          <!-- 头像 -->
          <!-- 随机头像图片地址 -->
          <img
            v-lazy
            class="w-3 h-3 rounded-sm guide-account"
            src="https://picsum.photos/300/300?random=1"
            alt=""
          />
          <SvgIcon
            class="h-1.5 w-1.5 ml-0.5"
            name="down-arrow"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></SvgIcon>
          <SvgIcon
            class="h-1.5 w-1.5 ml-0.5 absolute right-[16px] bottom-0"
            name="vip"
            fillClass="fill-zinc-900"
          ></SvgIcon>
        </div>
        <div v-else>
          <i-button
            class="guide-account"
            icon="profile"
            iconColor="#ffffff"
            @click="onToLogin"
          ></i-button>
        </div>
      </template>
      <!-- 气泡 -->
      <div class="w-[140px] overflow-hidden" v-if="userStore.userInfo">
        <div
          class="flex items-center p-1 cursor-pointer rounded-lg hover:bg-zinc-100/60 dark:hover:bg-zinc-600"
          v-for="item in menuArr"
          :key="item.id"
          @click="onItemClick(item)"
        >
          <svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></svg-icon>
          <span class="text-zinc-900 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </popover>
  </div>
</template>

<script setup>
import { confirm } from '@/libs/i-confirm'
import { message } from '@/libs/i-message'
import Popover from '@/libs/popover/index.vue'
import SvgIcon from '@/libs/svg-icon/index.vue'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
const appStore = useAppStore()
const router = useRouter()
const userStore = useUserStore()

const menuArr = [
  {
    id: 0,
    name: '我的资料',
    icon: 'profile',
    path: '/profile',
  },
  {
    id: 1,
    name: '升级 VIP',
    icon: 'vip-profile',
    path: '/member',
  },
  {
    id: 2,
    name: '退出登录',
    icon: 'logout',
    path: '',
  },
]

// 登录按钮事件
const onToLogin = () => {
  router.push('/login')
}
// 退出登录
const onItemClick = item => {
  if (item.id === 2) {
    confirm('确定退出登录吗？').then(() => {
      userStore.logout()
    })
    return
  }
  if (item.id === 0) {
    router.push(item.path)
    return
  }
  if(item.id === 1) {
    router.push(item.path)
    return
  }
}
</script>
<style scoped></style>
