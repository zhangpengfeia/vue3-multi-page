// /*
//  * @Description: 
//  * @Version: 2.0
//  * @Author: zhangpf1
//  * @Date: 2023-02-13 16:00:38
//  * @LastEditTime: 2023-02-26 10:13:19
//  */
// import { createRouter, createWebHashHistory,createWebHistory, RouteRecordRaw } from "vue-router";
// import type { App } from 'vue'
// import { Layout, getParentLayout } from '@/utils/routerHelper'

// export const constantRouterMap: AppRouteRecordRaw[] = [
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashoard/analysis',
//     name: 'dashoard',
//     meta: {
//       hidden: true
//     }
//   },
//   // 登录
//   {
//     path: "/login",
//     name: "Login",
//     component: () => import('@/views/Login/login.vue'),
//     meta: {
//     }
//   },
//   // 首页
//   {
//     path: '/dashboard',
//     component: Layout,
//     redirect: '/dashboard/analysis',
//     name: 'Dashboard',
//     meta: {
//       title: "首页",
//       icon: 'ant-design:dashboard-filled',
//       alwaysShow: true
//     },
//     children: [
//       {
//         path: 'analysis',
//         component: () => import('@/views/Dashboard/Analysis.vue'),
//         name: 'Analysis',
//         meta: {
//           title: "分析页",
//           noCache: true,
//           affix: true
//         }
//       },
//       {
//         path: 'workplace',
//         component: () => import('@/views/Dashboard/Workplace.vue'),
//         name: 'Workplace',
//         meta: {
//           title:"工作台",
//           noCache: true
//         }
//       }
//     ]
//   }
// ]

// export const asyncRouterMap: AppRouteRecordRaw[] = [
  
//  ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes: constantRouterMap as RouteRecordRaw[],
//   strict: true,
// })

// export const setupRouter = (app: App<Element>) => {
//   app.use(router)
// }

// export default router