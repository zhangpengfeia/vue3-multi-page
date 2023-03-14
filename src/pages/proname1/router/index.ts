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
    redirect: '/home/index',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('../views/Home/home.vue'),
        name: 'home',
        meta: {
          title: '主页',
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  // 测试
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'Test',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('../views/Test/test.vue'),
        name: 'Test',
        meta: {
          title: '测试',
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
