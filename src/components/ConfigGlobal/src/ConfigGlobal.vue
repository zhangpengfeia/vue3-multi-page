<script setup lang="ts">
import { provide, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElConfigProvider } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { setCssVar } from '@/utils'
import { useDesign } from '@/hooks/web/useDesign'
import { ElementPlusSize } from '@/types/elementPlus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { variables } = useDesign()

const appStore = useAppStore()

const props = defineProps({
  size: propTypes.oneOf<ElementPlusSize>(['default', 'small', 'large']).def('default')
})

provide('configGlobal', props)

// 初始化所有主题色
onMounted(() => {
  appStore.setCssVarTheme()
})

const { width } = useWindowSize()

// 监听窗口变化
watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      !appStore.getMobile ? appStore.setMobile(true) : undefined
      setCssVar('--left-menu-min-width', '0')
      appStore.setCollapse(true)
      appStore.getLayout !== 'classic' ? appStore.setLayout('classic') : undefined
    } else {
      appStore.getMobile ? appStore.setMobile(false) : undefined
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <ElConfigProvider
    :namespace="variables.elNamespace"
    :message="{ max: 1 }"
    :size="size"
    :locale="zhCn"
  >
    <slot></slot>
  </ElConfigProvider>
</template>
