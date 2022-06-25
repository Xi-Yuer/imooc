<!--  -->
<template>
  <div v-if="isMobileTerminal">
    <i-navbar
      title="个人资料"
      @leftClick="leftClick"
      @rightClick="onChangeCick"
      class="text-base dark:text-zinc-300 font-bold"
    >
      <template #right>提交</template>
    </i-navbar>
  </div>
  <div
    class="relative w-full h-full xl:bg-gray-200 pt-1 px-1 xl:dark:bg-zinc-700 dark:text-zinc-200"
  >
    <div
      class="xl:w-2/3 bg-white dark:bg-zinc-800 rounded m-auto xl:p-2 xl:py-6"
    >
      <!-- title -->
      <div class="flex items-center justify-center" v-if="!isMobileTerminal">
        <span class="text-lg font-bold">个人资料</span>
      </div>
      <!-- info -->
      <div class="xl:flex">
        <!-- detail -->
        <div class="x:flex xl:flex-1 xl:flex-col xl:w-2/3 xl:justify-center">
          <template v-for="item in FormData" :key="item.model">
            <div class="xl:flex text-sm xl:mt-4 mt-2 items-center">
              <span class="text-right xl:w-[100px] mr-1">{{ item.name }}:</span>
              <i-input
                class="w-full"
                :type="item.type"
                :maxlength="item.maxlength"
                v-model="userStore.userInfo[item.model]"
              ></i-input>
            </div>
          </template>
          <div
            class="xl:flex text-sm xl:mt-4 mt-2 xl:ml-[50px]"
            v-if="!isMobileTerminal"
          >
            <i-button class="w-[150px]" @click="onChangeCick"
              >修改资料</i-button
            >
          </div>
          <div
            class="xl:flex text-sm xl:mt-4 mt-2 xl:ml-[50px]"
            v-if="isMobileTerminal"
          >
            <i-button class="w-full" @click="onLogout">退出登录</i-button>
          </div>
        </div>
        <!-- avatar -->
        <div
          class="xl:w-[400px] xl:flex xl:items-center xl:justify-center"
          v-if="!isMobileTerminal"
        >
          <div
            class="flex xl:flex-col items-center justify-center xl:w-[100px]"
          >
            <span class="text-sm font-bold">我的头像</span>
            <div class="group relative flex w-8 h-8 mt-1 mb-1">
              <img
                v-lazy
                src="https://picsum.photos/300/300?random=1"
                class="rounded-full"
                alt=""
              />
              <div
                class="absolute top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block duration-300 cursor-pointer"
                @click="uploadAvatar"
              >
                <svg-icon
                  name="change-header-image"
                  class="w-2 h-2 m-auto mt-3"
                ></svg-icon>
              </div>
              <input
                class="absolute z-10"
                v-show="false"
                type="file"
                ref="inputFileRef"
                accept=".png,.jpeg,.jpg,.gif"
                @change="onSelectImgHandler"
              />
            </div>
            <p class="text-sm text-center">
              支持 jpg jpeg png gif 1M 以内的图片
            </p>
          </div>
        </div>
      </div>
    </div>
    <i-dialog title="头像裁剪" v-model="isVisibel" :isShowBtn="false">
      <cut-off-img :blob="imgURL" @close="isVisibel = false"></cut-off-img>
    </i-dialog>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/isMobileTerminal'
import CutOffImg from './components/cut-off-img/index.vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/store'
import { confirm } from '@/libs/i-confirm'
import { message } from '@/libs/i-message'
const userStore = useUserStore()
const router = useRouter()
const inputFileRef = ref(null)
const isVisibel = ref(false)
const imgURL = ref('')

const FormData = ref([
  {
    name: '用户名',
    type: 'text',
    model: 'nickname',
    maxlength: 20,
  },
  {
    name: '职位',
    type: 'text',
    model: 'title',
  },
  {
    name: '公司',
    type: 'text',
    model: 'company',
  },
  {
    name: '个人主页',
    type: 'text',
    model: 'homePage',
  },
  {
    name: '个人介绍',
    type: 'textarea',
    model: 'introduction',
    maxlength: 50,
  },
])

// 移动端下左侧按钮点击事件
const leftClick = () => {
  router.back()
}
// 选中文件
const onSelectImgHandler = () => {
  const imgFile = inputFileRef.value.files[0]
  // 生成 blob 对象
  const blob = URL.createObjectURL(imgFile)
  imgURL.value = blob
  isVisibel.value = true
}

// 当多次选择同一张图片时，
// inputFileRef.value.value 不会发生变化，
// 也就不会再次触发 onSelectImgHandler 函数，
// 所以需要在点击上传按钮时，清空 inputFileRef.value.value
watch(isVisibel, val => {
  if (!val) {
    inputFileRef.value.value = null
  }
})

const uploadAvatar = () => {
  inputFileRef.value.click()
}

const onChangeCick = () => {
  message('success', '修改成功')
}

// 退出登录
const onLogout = () => {
  confirm('确定退出登录吗？').then(() => {
    userStore.logout()
  })
}
</script>
<style scoped></style>
