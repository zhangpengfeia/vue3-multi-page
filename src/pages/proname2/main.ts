/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 15:09:58
 * @LastEditTime: 2023-02-25 20:50:58
 */
import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入状态管理
import { setupStore } from '../../store'

// 路由
import { setupRouter } from './router'

// 引入windi css
import '@/plugins/windi.css'

// 引入动画
import '@/plugins/animate.css'

// 引入全局样式
import '@/styles/index.less'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  // app.use(router)
  setupStore(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()
