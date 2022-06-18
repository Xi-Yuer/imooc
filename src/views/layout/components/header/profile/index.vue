<!--  -->
<template>
  <div>
    <popover class="flex items-center" placement="bottom-right">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
        >
          <!-- 头像 -->
          <!-- 随机头像图片地址 -->
          <img
            class="w-3 h-3 rounded-sm"
            src="https://picsum.photos/300/300?random=1"
            alt=""
          />
          <SvgIcon
            class="h-1.5 w-1.5 ml-0.5"
            name="down-arrow"
            fillClass="fill-zinc-900"
          ></SvgIcon>
          <SvgIcon
            class="h-1.5 w-1.5 ml-0.5 absolute right-[16px] bottom-0"
            name="vip"
            fillClass="fill-zinc-900"
          ></SvgIcon>
        </div>
      </template>
      <!-- 气泡 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded-lg hover:bg-zinc-100/60"
          v-for="item in menuArr"
          :key="item.id"
        >
          <svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900"
          ></svg-icon>
          <span class="text-zinc-900 text-sm">{{ item.name }}</span>
        </div>
      </div>
    </popover>
  </div>
</template>

<script setup>
import Popover from '@/libs/popover/index.vue'
import SvgIcon from '@/libs/svg-icon/index.vue'

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
    path: '/memeber',
  },
  {
    id: 2,
    name: '退出登录',
    icon: 'logout',
    path: '',
  },
]
</script>
<style scoped></style>
