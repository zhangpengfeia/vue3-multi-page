<script setup lang="ts">
import { ElDrawer, ElDivider, ElButton } from 'element-plus'
import { ref, unref, computed, watch } from 'vue'
// import { ThemeSwitch } from '@/components/ThemeSwitch'
import { colorIsDark, lighten, hexToRGB } from '@/utils/color'
import { useCssVar } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { trim, setCssVar } from '@/utils'
import ColorRadioPicker from './components/ColorRadioPicker.vue'
import InterfaceDisplay from './components/InterfaceDisplay.vue'
import LayoutRadioPicker from './components/LayoutRadioPicker.vue'
import { useCache } from '@/hooks/web/useCache'
import { Icon } from '@/components/Icon'
// import { useClipboard } from '@vueuse/core'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('setting')

const appStore = useAppStore()

const layout = computed(() => appStore.getLayout)

const drawer = ref(false)

// 主题色相关
const systemTheme = ref(appStore.getTheme.elColorPrimary)

const setSystemTheme = (color: string) => {
  setCssVar('--el-color-primary', color)
  appStore.setTheme({ elColorPrimary: color })
  const leftMenuBgColor = useCssVar('--left-menu-bg-color', document.documentElement)
  setMenuTheme(trim(unref(leftMenuBgColor)))
}

// 头部主题相关
const headerTheme = ref(appStore.getTheme.topHeaderBgColor || '')

const setHeaderTheme = (color: string) => {
  const isDarkColor = colorIsDark(color)
  const textColor = isDarkColor ? '#fff' : 'inherit'
  const textHoverColor = isDarkColor ? lighten(color!, 6) : '#f6f6f6'
  const topToolBorderColor = isDarkColor ? color : '#eee'
  setCssVar('--top-header-bg-color', color)
  setCssVar('--top-header-text-color', textColor)
  setCssVar('--top-header-hover-color', textHoverColor)
  setCssVar('--top-tool-border-color', topToolBorderColor)
  appStore.setTheme({
    topHeaderBgColor: color,
    topHeaderTextColor: textColor,
    topHeaderHoverColor: textHoverColor,
    topToolBorderColor
  })
  if (unref(layout) === 'top') {
    setMenuTheme(color)
  }
}

// 菜单主题相关
const menuTheme = ref(appStore.getTheme.leftMenuBgColor || '')

const setMenuTheme = (color: string) => {
  const primaryColor = useCssVar('--el-color-primary', document.documentElement)
  const isDarkColor = colorIsDark(color)
  console.log(color)

  const theme: Recordable = {
    // 左侧菜单边框颜色
    leftMenuBorderColor: isDarkColor ? 'inherit' : '#eee',
    // 左侧菜单背景颜色
    leftMenuBgColor: color,
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: isDarkColor ? lighten(color!, 6) : color,
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    // 左侧菜单字体颜色
    leftMenuTextColor: isDarkColor ? '#bfcbd9' : '#333',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: isDarkColor ? '#fff' : 'var(--el-color-primary)',
    // logo字体颜色
    logoTitleTextColor: isDarkColor ? '#fff' : 'inherit',
    // logo边框颜色
    logoBorderColor: isDarkColor ? color : '#eee'
  }
  appStore.setTheme(theme)
  appStore.setCssVarTheme()
}
if (layout.value === 'top' && !appStore.getIsDark) {
  headerTheme.value = '#fff'
  setHeaderTheme('#fff')
}

// 监听layout变化，重置一些主题色
watch(
  () => layout.value,
  (n) => {
    if (n === 'top' && !appStore.getIsDark) {
      headerTheme.value = '#fff'
      setHeaderTheme('#fff')
    } else {
      setMenuTheme(unref(menuTheme))
    }
  }
)

const clear = () => {
  const { wsCache } = useCache()
  wsCache.delete('layout')
  wsCache.delete('theme')
  wsCache.delete('isDark')
  window.location.reload()
}
</script>

<template>
  <span
    :class="`${prefixCls}__tool`"
    class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
    @click="drawer = true"
  >
    <Icon
      icon="ant-design:setting-outlined"
      :color="appStore.getIsDark ? 'var(--el-text-color-regular)' : '#333'"
    />
  </span>

  <ElDrawer v-model="drawer" direction="rtl" size="350px" :z-index="4000">
    <template #header>
      <span class="text-16px font-700">项目配置</span>
    </template>

    <div class="text-center">
      <!-- 主题 -->
      <!-- <ElDivider>主题</ElDivider>
      <ThemeSwitch /> -->

      <!-- 布局 -->
      <ElDivider>布局</ElDivider>
      <LayoutRadioPicker />

      <!-- 系统主题 -->
      <ElDivider>系统主题</ElDivider>
      <ColorRadioPicker
        v-model="systemTheme"
        :schema="[
          '#d70110',
          '#409eff',
          '#009688',
          '#536dfe',
          '#ff5c93',
          '#0096c7',
          '#9c27b0',
          '#ff9800'
        ]"
        @change="setSystemTheme"
      />

      <!-- 头部主题 -->
      <!-- <ElDivider>头部主题</ElDivider>
      <ColorRadioPicker
        v-model="headerTheme"
        :schema="[
          '#fff',
          '#151515',
          '#5172dc',
          '#e74c3c',
          '#24292e',
          '#394664',
          '#009688',
          '#383f45'
        ]"
        @change="setHeaderTheme"
      /> -->

      <!-- 菜单主题 -->
      <template v-if="layout !== 'top'">
        <ElDivider>菜单主题</ElDivider>
        <ColorRadioPicker
          v-model="menuTheme"
          :schema="[
            '#fff',
            '#001529',
            '#212121',
            '#273352',
            '#191b24',
            '#383f45',
            '#001628',
            '#344058'
          ]"
          @change="setMenuTheme"
        />
      </template>
    </div>

    <!-- 界面显示 -->
    <ElDivider>界面显示</ElDivider>
    <InterfaceDisplay />

    <ElDivider />
    <!-- <div>
      <ElButton type="primary" class="w-full" @click="copyConfig">{{ t('setting.copy') }}</ElButton>
    </div> -->
    <div class="mt-5px">
      <ElButton type="danger" class="w-full" @click="clear"> 重置 </ElButton>
    </div>
  </ElDrawer>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting';

.@{prefix-cls} {
  border-radius: 6px 0 0 6px;
}
</style>
