<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { ref, onMounted, defineEmits } from 'vue'
import { Sticky } from '@/components/Sticky'
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-detail-wrap')

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def('')
})
const emit = defineEmits(['back'])
const offset = ref(85)
const contentDetailWrap = ref()
onMounted(() => {
  offset.value = contentDetailWrap.value.getBoundingClientRect().top
})
</script>

<template>
  <div :class="[`${prefixCls}-container`, 'relative bg-[#fff]']" ref="contentDetailWrap">
    <Sticky :offset="offset">
      <div
        :class="[
          `${prefixCls}-header`,
          'flex border-bottom-1 h-50px items-center text-center bg-white pr-10px'
        ]"
      >
        <div :class="[`${prefixCls}-header__back`, 'flex pl-10px pr-10px ']">
          <el-button @click="emit('back')">
            <Icon icon="ep:arrow-left" class="mr-5px" />
            返回
          </el-button>
        </div>
        <div :class="[`${prefixCls}-header__title`, 'flex flex-1  justify-center']">
          <slot name="title">
            <label class="text-16px font-700">{{ title }}</label>
          </slot>
        </div>
        <div :class="[`${prefixCls}-header__right`, 'flex  pl-10px pr-10px']">
          <slot name="right"></slot>
        </div>
      </div>
    </Sticky>
    <div style="padding: var(--app-content-padding)">
      <ElCard :class="[`${prefixCls}-body`, 'mb-20px']" shadow="never">
        <div>
          <slot></slot>
        </div>
      </ElCard>
    </div>
  </div>
</template>
