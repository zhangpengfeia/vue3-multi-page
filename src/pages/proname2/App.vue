<!--
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 15:09:58
 * @LastEditTime: 2023-02-26 10:14:56
-->
<template>
  <ConfigGlobal :size="currentSize">
    不使用layout布局
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { useDesign } from '@/hooks/web/useDesign'
import { useRouterMapS } from '@/store/modules/routes'
import { constantRouterMap, asyncRouterMap } from './router'

const appStore = useAppStore()
const greyMode = computed(() => appStore.getGreyMode)
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('app')
// 插入
const routesStore = useRouterMapS()
routesStore.setConstantRouterMapS(constantRouterMap)
routesStore.setAsyncRouterMapS(asyncRouterMap)

const currentSize = computed(() => appStore.getCurrentSize)
</script>
<style lang="less" scoped></style>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
