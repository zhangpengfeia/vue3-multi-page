<!--
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-25 09:20:00
 * @LastEditTime: 2023-02-25 09:29:54
-->
<script setup lang="ts">
import {  onMounted } from 'vue'
// import { propTypes } from '@/utils/propTypes'
import { ElConfigProvider } from 'element-plus'
// import { useLocaleStore } from '@/store/modules/locale'
// import { useWindowSize } from '@vueuse/core'
// import { useAppStore } from '@/store/modules/app'
// import { setCssVar } from '@/utils'
import { useDesign } from '@/hooks/web/useDesign'
// import { ElementPlusSize } from '@/types/elementPlus'

const { variables } = useDesign()

// const appStore = useAppStore()

// const props = defineProps({
//   size: propTypes.oneOf<ElementPlusSize>(['default', 'small', 'large']).def('default')
// })

// provide('configGlobal', props)

// 初始化所有主题色
onMounted(() => {
  // appStore.setCssVarTheme()
})

// const { width } = useWindowSize()

// 监听窗口变化
/*
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
*/

// 多语言相关
// const localeStore = useLocaleStore()

// const currentLocale = computed(() => localeStore.currentLocale)
</script>

<template>
  <!-- <ElConfigProvider
            
              :locale="currentLocale.elLocale"
              :message="{ max: 1 }"
              :size="size"
            > -->
  <ElConfigProvider :message="{ max: 1 }" :namespace="variables.elNamespace">
    <slot></slot>
  </ElConfigProvider>
</template>
