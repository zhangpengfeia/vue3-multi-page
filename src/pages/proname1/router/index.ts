/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 16:00:38
 * @LastEditTime: 2023-02-26 10:13:19
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/del/index',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue'),
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
    }
  },
  {
    path: '/del',
    component: Layout,
    redirect: '/del/index',
    name: 'del',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('../views/del/del.vue'),
        name: 'delDemo',
        meta: {
          title: 'del测试',
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  // 报错404
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: '404',
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: () => import('../views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '/404',
        component: () => import('../views/Error/404.vue'),
        name: 'NoFind',
        meta: {
          hidden: true,
          title: '404',
          noTagsView: true
        }
      }
    ]
  }
  // 首页
]

export const asyncRouterMap: AppRouteRecordRaw[] = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[],
  strict: true
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
