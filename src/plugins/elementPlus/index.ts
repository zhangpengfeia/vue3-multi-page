/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 15:37:21
 * @LastEditTime: 2023-02-13 17:55:22
 */
import type { App } from 'vue'

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import { ElLoading, ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const plugins = [ElLoading]

const components = [ElScrollbar]

export const setupElementPlus = (app: App<Element>) => {
  app.use(ElementPlus)
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
