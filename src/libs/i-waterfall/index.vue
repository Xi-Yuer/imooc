<!--  -->
<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px',
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="colunmWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: colunmWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
        }"
      >
        <slot :item="item" :width="containerWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <template>
      <span>加载中....</span>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgElement,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight,
} from './utils'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    default: () => [],
  },
  // 唯一标识
  nodeKey: {
    type: String,
    default: 'id',
  },
  // 列数
  column: {
    type: Number,
    default: 2,
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20,
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20,
  },
  // 是否需要图片预读
  picturePreReading: {
    type: Boolean,
    default: true,
  },
})
// 总容器高度 = 最高的一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器 key 所在列 value:列高
const columnHeightObj = ref({})
// 构建每列高度的对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 容器的宽度(不包含 padding margin border)
const containerTarget = ref(null)
const containerWidth = ref(0)
// 容器的左边距 计算 item 的 left
const containerLeft = ref(0)

// 计算容器宽度
const useContainerWidth = () => {
  // window对象身上的一个方法，返回容器的属性样式
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // console.log(paddingLeft, paddingRight) // 0px 0px
  // 容器的左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器的宽度
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
// 列宽 = 容器宽度 - 所有列间距宽度 / 列数
const colunmWidth = ref(0)
// 列间距的合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
// 计算列宽
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth()
  // 计算列宽
  colunmWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
  // 计算列宽
  useColumnWidth()
})

// 图片预加载
let itemHeights = []
// 监听图片加载完毕
const waitImgComplate = () => {
  itemHeights = []
  // 获取所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取到元素的 img 标签
  const imgElements = getImgElement(itemElements)
  // 获取所有 img 标签的图片
  const allImgs = getAllImg(imgElements)
  // 等待图片加载完毕
  onComplateImgs(allImgs).then(() => {
    console.log('first')
    // 图片加载完成
    itemElements.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

// 不需要图片预加载
const useItemHeight = () => {
  itemHeights = []
  // 获取所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 计算 item 的高度
  itemElements.forEach(el => {
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
// 渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成 style 属性
    item._style = {
      left: getItemLeft(),
      top: getItemTop(),
    }
    // 指定高度自增
    increasingHeight(index)
  })
  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// 在组件销毁时清除所有的 style
onUnmounted(() => {
  props.data.forEach(item => {
    delete item._style
  })
})

// 返回下一个 item 的 left
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (colunmWidth.value + props.columnSpacing) + containerLeft.value
  )
}
// 返回下一个 item 的 top
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

// 指定高度自增
const increasingHeight = index => {
  // 拿到最小高度所在的列
  const miniHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 使该列自增
  columnHeightObj.value[miniHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

// 触发计算
watch(
  () => props.data,
  newValue => {
    nextTick(() => {
      // 第一次获取数据时构建高度记录容器
      const resetColumnHeight = newValue.every(item => !item._style)
      if(resetColumnHeight){
        // 重新构建高度
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>
<style scoped></style>
