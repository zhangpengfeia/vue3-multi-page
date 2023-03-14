/*
 * @Description:权限相关
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-26 09:34:52
 * @LastEditTime: 2023-02-26 09:39:43
 */
import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
// import { useDictStoreWithOut } from '@/store/modules/dict'
import { usePageLoading } from '@/hooks/web/usePageLoading'
// import { getDictApi } from '@/api/common'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

// const dictStore = useDictStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  // 暂未做登录
  if (to.path === '/login') {
    next({ path: '/' })
  } else {
    if (permissionStore.getIsAddRouters) {
      next()
      return
    }
    // 开发者可根据实际情况进行修改
    const roleRouters = wsCache.get('roleRouters') || []
    const userInfo = wsCache.get(appStore.getUserInfo)

    // 是否使用动态路由
    if (appStore.getDynamicRouter) {
      userInfo.role === 'admin'
        ? await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])
        : await permissionStore.generateRoutes('test', roleRouters as string[])
    } else {
      await permissionStore.generateRoutes('none')
    }

    permissionStore.getAddRouters.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
    })
    const redirectPath = from.query.redirect || to.path
    const redirect = decodeURIComponent(redirectPath as string)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    permissionStore.setIsAddRouters(true)
    next(nextData)
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})