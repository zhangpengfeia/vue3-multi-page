/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-13 16:00:38
 * @LastEditTime: 2023-02-26 10:13:19
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { App } from 'vue'
// import { Layout, getParentLayout } from '@/utils/routerHelper'

export const constantRouterMap: AppRouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashoard/analysis',
  //   name: 'dashoard',
  //   meta: {
  //     hidden: true
  //   }
  // },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import('../views/Login/login.vue'),
    meta: {
    }
  },
  {
    path: "/del",
    name: "del",
    component: () => import('../views/del/del.vue'),
    meta: {
    }
  },
  // 首页

]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  
 ]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[],
  strict: true,
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router