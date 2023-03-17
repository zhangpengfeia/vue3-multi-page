/*
 * @Description:权限相关
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-26 09:34:52
 * @LastEditTime: 2023-02-26 09:39:43
 */
import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useUserStoreWithOut } from '@/store/modules/user'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const userStore = useUserStoreWithOut()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

// const whiteList = ['/login'] // 不重定向白名单

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

    // 如果获取用户信息时间为0，则重新获取信息和权限
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    // 权限
    const roles = userStore.getRoles || []

    // 是否使用动态路由
    if (appStore.getDynamicRouter) {
      await permissionStore.generateRoutes('test', roles as string[])
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
