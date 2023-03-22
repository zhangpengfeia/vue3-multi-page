/*
 * @Description: 路由
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 16:00:38
 * @LastEditTime: 2023-02-26 10:13:19
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'

// 公共路由
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
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/components/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  // 404
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

// tab路由
export const asyncRouterMap: AppRouteRecordRaw[] = [
  // 首页
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'Home',
    meta: {
      roles: ['admin']
    },
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
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: 'Permission',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('../views/Permission/permission.vue'),
        name: 'Permission',
        meta: {
          title: '权限',
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  // 权限测试
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: 'Test',
    meta: {
      roles: ['admin']
    },
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
      title: '菜单',
      icon: 'ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: () => import('../views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '菜单2'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[],
  strict: true
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
